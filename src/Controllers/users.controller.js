const db = require('../models');
const User = db.user;
const Admin = db.adminUser;
const Lawyer = db.lawyer;
const apiResponses = require('../Components/apiresponse');
const {createToken} = require('../Middlewares/userAuthentications');
const bcrypt = require('bcryptjs');
const Mail = require('../Config/Mails');
const crypto = require('crypto');
const Op = db.Sequelize.Op;

module.exports.registration = async (req, res) => {
	try {
		// #swagger.tags = ['UserAuth']
		/*  #swagger.parameters['obj'] = {
                    in: 'body',
                    description: "User details for registration - firstname,,lastname email, password andisActive",
                    schema: { $firstname: "", $lastname: "", $email: "", $password: "",}
            } */
		User.create({
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			email: req.body.email,
			gender: req.body.gender,
			password: bcrypt.hashSync(req.body.password, 8),
			userType: req.body.userType,
			country: req.body.country,
			city: req.body.city,
			phoneNumber: req.body.phoneNumber,
			policy: req.body.policy,
			isActive: req.body.isActive,
			isSubscribed: req.body.isSubscribed,
		}).then(async (user) => {
			/* #swagger.responses[200] = {
                            description: "User registered successfully!",
                            schema: { $statusCode : 200 ,$status: true, $message: "User registered successfully!", $data : {}}
                        } */
			const token = createToken(user.id, user.email, user.role);
			const userData = {
				id: user.id,
				firstname: user.firstname,
				lastname: user.lastname,
				email: user.email,
				gender: user.gender,
				userType: user.userType,
				country: user.country,
				city: user.city,
				role: user.role,
				policy: user.policy,
				phoneNumber: user.phoneNumber,
				isActive: user.isActive,
				token: token,
			};

			await Mail.userRegistration(user.email, user.firstname + ' ' + user.lastname);
			const adminMail = await Admin.findAll();
			for (let i = 0; i < adminMail.length; i++) {
				await Mail.userRegistrationAdminMail(adminMail[i].email, user.firstname + ' ' + user.lastname);
			}

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
};

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
		}).then(async (user) => {
			if (!user) {
				/* #swagger.responses[404] = {
                       description: "User Not found.",
                       schema: { $statusCode: "404",  $status: false, $message: "User Not found.",  $data: {}}
                   } */
				// return res.status(404).send({ message: "User Not found." });
				return apiResponses.notFoundResponse(res, 'User Not found.', {});
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
					res,
					'Invalid Password!',
					null,
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
					res,
					'User not available',
					null,
				);
			}

			const token = createToken(user.id, user.email, user.role);
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
				country: user.country,
				city: user.city,
				phoneNumber: user.phoneNumber,
				firstname: user.firstname,
				lastname: user.lastname,
				userType: user.userType,
				isActive: user.isActive,
				role: user.role,
				lawfirmid: user.lawfirmid,
				token: token,
			};
			return apiResponses.successResponseWithData(
				res,
				'Successfully login',
				obj,
			);
		});
	} else if (req.body.userType === 'google') {
		User.findOne({
			where: {
				email: req.body.email,
				userType: req.body.userType,
			},
		}).then(async (user) => {
			if (!user) {
				User.create({
					firstname: req.body.firstname,
					lastname: req.body.lastname,
					email: req.body.email,
					userType: req.body.userType,
					country: req.body.country,
					city: req.body.city,
					phoneNumber: req.body.phoneNumber,
					isActive: req.body.isActive,
				}).then(async (user) => {
					const token = createToken(user.id, user.email, user.role);
					const userData = {
						id: user.id,
						firstname: user.firstname,
						lastname: user.lastname,
						email: user.email,
						country: user.country,
						city: user.city,
						phoneNumber: user.phoneNumber,
						userType: user.userType,
						isActive: user.isActive,
						role: user.role,
						lawfirmid: user.lawfirmid,
						token: token,
					};
					await Mail.userRegistration(user.email, user.firstname + ' ' + user.lastname);
					const adminMail = await Admin.findAll();
					for (let i = 0; i < adminMail.length; i++) {
						await Mail.userRegistrationAdminMail(adminMail[i].email, user.firstname + ' ' + user.lastname);
					}

					// return res.status(200).send({ status:'200', message: "User registered successfully!" , data: userData });
					return apiResponses.successResponseWithData(
						res,
						'Success!',
						userData,
					);
				});
			} else {
				const token = createToken(user.id, user.email, user.role);
				const obj = {
					id: user.id,
					email: user.email,
					lastname: user.lastname,
					country: user.country,
					city: user.city,
					phoneNumber: user.phoneNumber,
					firstname: user.firstname,
					userType: user.userType,
					isActive: user.isActive,
					role: user.role,
					lawfirmid: user.lawfirmid,
					token: token,
				};
				return apiResponses.successResponseWithData(
					res,
					'Successfully login',
					obj,
				);
			}
		});
	} else {
		User.findOne({
			where: {
				linkedin: req.body.linkedin,
				userType: req.body.userType,
			},
		})
			.then(async (user) => {
				if (!user) {
					User.create({
						firstname: req.body.firstname,
						lastname: req.body.lastname,
						linkedin: req.body.linkedin,
						email: req.body.email,
						country: req.body.country,
						city: req.body.city,
						phoneNumber: req.body.phoneNumber,
						userType: req.body.userType,
						isActive: req.body.isActive,
					}).then(async (user) => {
						const token = createToken(user.id, user.email, user.role);
						const userData = {
							id: user.id,
							firstname: user.firstname,
							email: user.email,
							lastname: user.lastname,
							country: user.country,
							city: user.city,
							phoneNumber: user.phoneNumber,
							userType: user.userType,
							isActive: user.isActive,
							role: user.role,
							lawfirmid: user.lawfirmid,
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
					const token = createToken(user.id, user.email, user.role);
					const obj = {
						id: user.id,
						email: user.email,
						lastname: user.lastname,
						country: user.country,
						city: user.city,
						phoneNumber: user.phoneNumber,
						firstname: user.firstname,
						userType: user.userType,
						isActive: user.isActive,
						role: user.role,
						lawfirmid: user.lawfirmid,
						token: token,
					};
					return apiResponses.successResponseWithData(
						res,
						'Successfully login',
						obj,
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
		}).then(async (result) => {
			/* #swagger.responses[404] = {
                   description: "Email Not found.",
                   schema: { $statusCode: "404",  $status: false, $message: "User Not found.",  $data: {}}
               } */
			// return res.status(404).send({ message: "Email Not found." });

			return apiResponses.successResponseWithData(res, 'success!', result);
		});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.userUpdate = async (req, res) => {
	try {
		User.update(
			{
				firstname: req.body.firstname,
				lastname: req.body.lastname,
				email: req.body.email,
				gender: req.body.gender,
				profilePic: req.body.profilePic,
				country: req.body.country,
				city: req.body.city,
				phoneNumber: req.body.phoneNumber,
			},
			{where: {id: req.body.id}},
		)
			.then(async (user) => {
				if (!user) {
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}
				return apiResponses.successResponseWithData(res, 'Success', user);
			})
			.catch((err) => {
				return apiResponses.errorResponse(res, err.message, {});
			});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.users = async (req, res) => {
	try {
		const limit = req.params.limit;
		User.findAll({limit: limit, order: [['createdAt', 'DESC']]}).then(
			async (result) => {
				/* #swagger.responses[404] = {
                       description: "Email Not found.",
                       schema: { $statusCode: "404",  $status: false, $message: "User Not found.",  $data: {}}
                   } */
				// return res.status(404).send({ message: "User Not found." });

				return apiResponses.successResponseWithData(res, 'success!', result);
			},
		);
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};
module.exports.getUser = async (req, res) => {
	try {
		User.findOne({where: {id: req.params.id}}).then(async (result) => {
			/* #swagger.responses[404] = {
                       description: "Email Not found.",
                       schema: { $statusCode: "404",  $status: false, $message: "User Not found.",  $data: {}}
                   } */
			// return res.status(404).send({ message: "User Not found." });

			return apiResponses.successResponseWithData(res, 'success!', result);
		});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};


module.exports.userDeviceTokenUpdate = async (req, res) => {
	try {
		User.update(
			{
				deviceToken: req.body.deviceToken,
			},
			{where: {id: req.params.id}},
		)
			.then(async (user) => {
				if (!user) {
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}
				return apiResponses.successResponseWithData(res, 'Success', user);
			})
			.catch((err) => {
				return apiResponses.errorResponse(res, err.message, {});
			});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.userPasswordReset = async (req, res) => {
	try {
	 User.findOne(
		 {where: {email: req.body.email, userType: 'normal'},
			})
			.then((user) => {
				if (!user) {
					return apiResponses.successResponseWithData(res, ' User with this email doesn\'t exists.');
				}
				crypto.randomBytes(32, async (err, buffer)=>{
					if (err) {
						console.log(err);
					}
					const token = buffer.toString('hex');
					User.update(
						{
							resetToken: token,
							expireToken: Date.now() + 3600000,
						},
						{
							where: {email: req.body.email},
						},
					).then((user) => {
						if (!user) {
							return apiResponses.notFoundResponse(res, 'Not found.', {});
						}
					});

					await Mail.userPasswordReset(user.email, token);
				});
				return apiResponses.successResponseWithData(res, 'Link send to your email ');
			});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.updateNewPassword = async (req, res) => {
	const sentToken = req.params.token;
	try {
		User.update({
			password: await bcrypt.hashSync(req.body.password, 8),
			resetToken: null,
			expireToken: null,
		},
		{where: {resetToken: sentToken, expireToken: {[Op.gt]: Date.now()}},
		})
			.then(async (user) => {
				if (!user) {
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}
				return apiResponses.successResponseWithData(res, 'Success', user);
			})
			.catch((error) => {
				return apiResponses.errorResponse(res, error.message, {});
			});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.updateLawFirmPassword = async (req, res) => {
 	try {
     const lawyer = await Lawyer.findOne({where: {lawFirmId: req.body.lawFirmId,email: req.body.email}})
		if(!lawyer){
			return apiResponses.notFoundResponse(res, 'Not found.', {});
		}
		User.update({
			password: await bcrypt.hashSync(req.body.password, 8),
		},
		{where: {id: lawyer.user_id},
		})
			.then(async (user) => {
				if (!user) {
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}
				return apiResponses.successResponseWithData(res, 'Success', user);
			})
			.catch((error) => {
				return apiResponses.errorResponse(res, error.message, {});
			});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.lawyerLogin = (req, res) => {
		User.findOne({
			where: {
				email: req.body.email,
				isActive : 1,
				isDeleted : 0,
			},
		}).then(async (user) => {
			if (!user) {
				return apiResponses.notFoundResponse(res, 'User Not found.', {});
			}

			if(user.role === "LAWFIRM_ADMIN" || user.role === "LAWYER" ){

			const passwordIsValid = bcrypt.compareSync(
				req.body.password,
				user.password,
			);

			if (!passwordIsValid) {
				return apiResponses.unauthorizedResponse(
					res,
					'Invalid Password!',
					null,
				);
			}
			if (user.isDeleted) {
				
				return apiResponses.unauthorizedResponse(
					res,
					'User not available',
					null,
				);
			}

			const token = createToken(user.id, user.email, user.role);
		
			const obj = {
				id: user.id,
				email: user.email,
				country: user.country,
				city: user.city,
				phoneNumber: user.phoneNumber,
				firstname: user.firstname,
				lastname: user.lastname,
				userType: user.userType,
				isActive: user.isActive,
				role: user.role,
				lawfirmid: user.lawfirmid,
				token: token,
			};
			return apiResponses.successResponseWithData(
				res,
				'Successfully login',
				obj,
			);
		}else {
		return apiResponses.unauthorizedResponse(
			res,
			'You are not authorized to login here!',
			null,
		).catch((err) => {
				return apiResponses.errorResponse(res, err.message, {});
			});
		}
	})

}
