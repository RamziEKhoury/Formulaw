const db = require('../models');
const User = db.user;
const apiResponses = require('../Components/apiresponse');
const {createToken} = require('../Middlewares/userAuthentications');
const bcrypt = require('bcryptjs');
const Mail = require('../Config/Mails');


module.exports.registration = (async (req, res) => {
	try {
		// #swagger.tags = ['UserAuth']
		/*  #swagger.parameters['obj'] = {
                    in: 'body',
                    description: "User details for registration - fullname, email, password andisActive",
                    schema: { $fullname: "", $email: "", $password: "",}
            } */
		User.create({
			fullname: req.body.fullname,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 8),
			userType: 'normal',
			isActive: req.body.isActive,
		})
			.then(async (user) => {
				/* #swagger.responses[200] = {
                            description: "User registered successfully!",
                            schema: { $statusCode : 200 ,$status: true, $message: "User registered successfully!", $data : {}}
                        } */
				const token = createToken(
					user.id,
					user.email,
				);
				const userData = {
					id: user.id,
					fullname: user.fullname,
					email: user.email,
					userType: user.userType,
					isActive: user.isActive,
					token: token,

				};
				await Mail.userRegistration(user.email);
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
	// #swagger.tags = ['UserAuth']
	/*  #swagger.parameters['obj'] = {
            in: 'body',
            description: "User details for login - email, userType and password",
            schema: { $email: "", $userType:"", $password: ""}
    } */
	if (req.body.userType === 'normal') {
		User.findOne({
			where: {
				email: req.body.email,
				userType: req.body.userType,
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

				const token = createToken(
					user.id,
					user.email,
				);
				/* #swagger.responses[500] = {
                        description: "User logged in!",
                        schema: { $id: "user id", $email: "user email",  $accessToken: "user token"}
                    } */
				// return res.status(200).send({
				//   id: user.id,
				//   email: user.email,
				//   accessToken: token
				// });
				const obj = {
					id: user.id,
					email: user.email,
					fullname: user.fullname,
					userType: user.userType,
					isActive: user.isActive,
					token: token,
				};
				return apiResponses.successResponseWithData(
					res, 'Successfully login', obj,
				);
			});
	} else if (req.body.userType === 'google') {
		User.findOne({
			where: {
				email: req.body.email,
				userType: req.body.userType,
			},
		})
			.then(async (user) => {
				if (!user) {
					User.create({
						fullname: req.body.fullname,
						email: req.body.email,
						userType: req.body.userType,
						isActive: req.body.isActive,
					})
						.then(async (user) => {
							const token = createToken(
								user.id,
								user.email,
							);
							const userData = {
								id: user.id,
								fullname: user.fullname,
								email: user.email,
								userType: user.userType,
								isActive: user.isActive,
								token: token,

							};
							await Mail.userRegistration(user.email);
							// return res.status(200).send({ status:'200', message: "User registered successfully!" , data: userData });
							return apiResponses.successResponseWithData(
								res,
								'Success!',
								userData,
							);
						});
				} else {
					const token = createToken(
						user.id,
						user.email,
					);
					const obj = {
						id: user.id,
						email: user.email,
						fullname: user.fullname,
						userType: user.userType,
						isActive: user.isActive,
						token: token,
					};
					return apiResponses.successResponseWithData(
						res, 'Successfully login', obj,
					);
				}
			});
	} else {
		User.findOne({
			where: {
				facebooktoken: req.body.facebooktoken,
				userType: req.body.userType,
			},
		})
			.then(async (user) => {
				if (!user) {
					User.create({
						fullname: req.body.fullname,
						facebooktoken: req.body.facebooktoken,
						email: req.body.email,
						userType: req.body.userType,
						isActive: req.body.isActive,
					})
						.then(async (user) => {
							const token = createToken(
								user.id,
								user.email,
							);
							const userData = {
								id: user.id,
								fullname: user.fullname,
								email: user.email,
								userType: user.userType,
								isActive: user.isActive,
								token: token,

							};
							await Mail.userRegistration(user.email);
							// return res.status(200).send({ status:'200', message: "User registered successfully!" , data: userData });
							return apiResponses.successResponseWithData(
								res,
								'Success!',
								userData,
							);
						});
				} else {
					const token = createToken(
						user.id,
						user.email,
					);
					const obj = {
						id: user.id,
						email: user.email,
						fullname: user.fullname,
						userType: user.userType,
						isActive: user.isActive,
						token: token,
					};
					return apiResponses.successResponseWithData(
						res, 'Successfully login', obj,
					);
				}
			})
			.catch((err) => {
				/* #swagger.responses[500] = {
                    description: "Error message",
                    schema: { $statusCode: "500",  $status: false, $message: "Error Message", $data: {}}
                } */
				// return res.status(500).send({ message: err.message });
				return apiResponses.errorResponse(res, err.message, {});
			});
	}
};

module.exports.emailVarify = async (req, res) => {
	try {
		User.findOne({
			where: {
				email: req.body.email,
			},
		})
			.then(async (result) =>{
				console.log('result---->', result);
				/* #swagger.responses[404] = {
                   description: "Email Not found.",
                   schema: { $statusCode: "404",  $status: false, $message: "User Not found.",  $data: {}}
               } */
				// return res.status(404).send({ message: "Email Not found." });

				return apiResponses.successResponseWithData(
					res, 'Email is Already in use!', result,
				);
			},


			);
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};


module.exports.users = async (req, res) => {
	try {
		const limit = req.params.limit;
		User.findAll({limit: limit})
			.then(async (result) =>{
				/* #swagger.responses[404] = {
                       description: "Email Not found.",
                       schema: { $statusCode: "404",  $status: false, $message: "User Not found.",  $data: {}}
                   } */
				// return res.status(404).send({ message: "User Not found." });

				return apiResponses.successResponseWithData(
					res, 'success!', result,
				);
			});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};
