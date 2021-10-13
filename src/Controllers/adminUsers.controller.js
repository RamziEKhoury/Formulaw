const db = require('../models');
const Admin = db.adminUser;
const apiResponses = require('../Components/apiresponse');
const {createToken} = require('../Middlewares/adminUserAuthentications');
const bcrypt = require('bcryptjs');
const {Status} = require('../enum');
const moment = require('moment');


module.exports.registration = (async (req, res) => {
	try {
		console.log(req.body.firstname + req.body.lastname);
		// #swagger.tags = ['Auth']
		/*  #swagger.parameters['obj'] = {
                    in: 'body',
                    description: "User details for registration - firstname, lastname, username, email, password and roles",
                    schema: { $username: "", $email: "", $firstname: "", $lastname: "", $roleName: "", $roleId: "", $password: ""}
            } */
		Admin.create({
			username: req.body.username,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 8),
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			roleName: req.body.roleName,
			roleId: req.body.roleId,
		})
			.then((user) => {
				/* #swagger.responses[200] = {
                            description: "User registered successfully!",
                            schema: { $statusCode : 200 ,$status: true, $message: "User registered successfully!", $data : {}}
                        } */
				const token = createToken(
					user.id,
					user.username,
					user.roleName,
				);
				const userData = {
					id: user.id,
					username: user.username,
					email: user.email,
					firstname: user.firstname,
					lastname: user.lastname,
					roleName: user.roleName,
					roleId: user.roleId,
					status: user.status,
					token: token,

				};
					// return res.status(200).send({ status:'200', message: "User registered successfully!" , data: userData });
				return apiResponses.successResponseWithData(
					res,
					'User registered successfully!',
					userData,
				);
			});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
});


module.exports.userLogin = (req, res) => {
	// #swagger.tags = ['Auth']
	/*  #swagger.parameters['obj'] = {
            in: 'body',
            description: "User details for login - username and password",
            schema: { $username: "", $password: "", $roleId: ""}
    } */
	Admin.findOne({
		where: {
			username: req.body.username,
			roleId: req.body.roleId,
		},
	})
		.then(async (user) => {
			if (!user) {
				/* #swagger.responses[404] = {
                   description: "User Not found.",
                   schema: { $statusCode: "404",  $status: false, $message: "User Not found.",  $data: {}}
               } */
				// return res.status(404).send({ message: "User Not found." });
				return apiResponses.notFoundResponse(
					res, 'User Not found.', {},
				);
			}

			const passwordIsValid = bcrypt.compareSync(
				req.body.password,
				user.password,
			);

			if (!passwordIsValid) {
				/* #swagger.responses[401] = {
                    description: "Invalid Password!",
                    schema: { $accessToken: "", $message: "Invalid Password!" }
                } */
				// return res.status(401).send({
				//   accessToken: null,
				//   message: "Invalid Password!"
				// });
				return apiResponses.unauthorizedResponse(
					res, 'Invalid Password!', null,
				);
			}
			if (user.isDeleted) {
				/* #swagger.responses[401] = {
                    description: "Your email is not verified, please verify before logging in.",
                    schema: { $accessToken: "", $message: "Your email is not verified, please verify before logging in." }
                } */
				// return res.status(401).send({
				//   accessToken: null,
				//   message: "User not available."
				// });
				return apiResponses.unauthorizedResponse(
					res, 'User not available', null,
				);
			}
			if (user.status === 'deactivate') {
				/* #swagger.responses[401] = {
                    description: "User is not activated, please contact to super admin.",
                    schema: { $accessToken: "", $message: "User is not activated, please contact to super admin." }
                } */
				// return res.status(401).send({
				//   accessToken: null,
				//   message: "User is not activated, please contact to super admin."
				// });
				return apiResponses.unauthorizedResponse(
					res,
					'User is not activated, please contact to super admin.',
					null,
				);
			}
			const token = createToken(
				user.id,
				user.username,
				user.roleName,
			);
			/* #swagger.responses[500] = {
                    description: "User logged in!",
                    schema: { $id: "user id", $username: "username", $email: "user email", $status: "user status", $roles: "user roles", $accessToken: "user token"}
                } */
			// return res.status(200).send({
			//   id: user.id,
			//   username: user.username,
			//   email: user.email,
			//   status: user.status,
			//   accessToken: token
			// });
			const dateAndTime = moment().format()
			await Admin.update({
				status: Status.ONLINE,
				activeDateAndTime: dateAndTime,
				isActive: 1,
			}, {where: {id: user.id}});
			const obj = {
				id: user.id,
				username: user.username,
				firstName: user.firstname,
				lastName: user.lastname,
				email: user.email,
				status: user.status,
				token: token,
			};
			return apiResponses.successResponseWithData(
				res, 'Successfully login', obj,
			);
		})
		.catch((err) => {
			/* #swagger.responses[500] = {
                description: "Error message",
                schema: { $statusCode: "500",  $status: false, $message: "Error Message", $data: {}}
            } */
			// return res.status(500).send({ message: err.message });
			return apiResponses.errorResponse(res, err.message, {});
		});
};


module.exports.userProfile = (req, res) => {
	// Get User from Database
	// #swagger.tags = ['Auth']
	Admin.findOne({
		where: {
			userId: req.params.userId,
		},
	})
		.then(async (user) => {
			if (!user) {
				/* #swagger.responses[404] = {
                   description: "User Not found.",
                   schema: { $statusCode: "404",  $status: false, $message: "User Not found.",  $data: {}}
               } */
				// return res.status(404).send({ message: "User Not found." });
				return apiResponses.notFoundResponse(
					res, 'User Not found.', {},
				);
			}
			// res.status(200).send({
			//   status: "200",
			//   user: user,
			// });
			return apiResponses.successResponseWithData(
				res, 'success', user,
			);
		})
		.catch((err) => {
			/* #swagger.responses[500] = {
                description: "Error message",
                schema: { $statusCode: "500",  $status: false, $message: "Error Message", $data: {}}
            } */
			// return res.status(500).send({ message: err.message });
			return apiResponses.errorResponse(res, err.message, {});
		});
};


module.exports.admins = (req, res) => {
	// Get User from Database
	// #swagger.tags = ['Auth']
	Admin.findAll()
		.then(async (users) => {
			if (users.length === 0) {
				/* #swagger.responses[404] = {
                   description: "User Not found.",
                   schema: { $statusCode: "404",  $status: false, $message: "User Not found.",  $data: {}}
               } */
				// return res.status(404).send({ message: "User Not found." });
				return apiResponses.notFoundResponse(
					res, 'User Not found.', {},
				);
			}
			// res.status(200).send({
			//   status: "200",
			//   user: user,
			// });
			return apiResponses.successResponseWithData(
				res, 'success', users,
			);
		})
		.catch((err) => {
			/* #swagger.responses[500] = {
                description: "Error message",
                schema: { $statusCode: "500",  $status: false, $message: "Error Message", $data: {}}
            } */
			// return res.status(500).send({ message: err.message });
			return apiResponses.errorResponse(res, err.message, {});
		});
};


module.exports.deleteUser = async (req, res) => {
	// #swagger.tags = ['Auth']
	try {
		await Admin.update({
			isDeleted: 1,
		}, {where: {id: req.params.id}})
			.then((user) => {
				if (!user) {
					/* #swagger.responses[404] = {
                               description: "User Not found.",
                               schema: { $statusCode: "404",  $status: false, $message: "Not found.",  $data: {}}
                           } */
					// return res.status(404).send({ message: "Not found." });
					return apiResponses.notFoundResponse(
						res, 'Not found.', {},
					);
				}
				/* #swagger.responses[200] = {
                            description: "success!",
                        } */
				// return res.status(200).send({ status:'200', message: "success!" , data: industrial });
				return apiResponses.successResponseWithData(
					res, 'Success', user,
				);
			})
			.catch((err) => {
				/* #swagger.responses[500] = {
                            description: "Error message",
                            schema: { $statusCode: "500",  $status: false, $message: "Error Message", $data: {}}
                        } */
				// return res.status(500).send({ message: err.message });
				return apiResponses.errorResponse(res, err.message, {});
			});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};