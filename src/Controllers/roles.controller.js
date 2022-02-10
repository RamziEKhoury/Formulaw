const db = require('../models');
const Role = db.role;
const apiResponses = require('../Components/apiresponse');

module.exports.addRole = async (req, res) => {
	try {
		// #swagger.tags = ['Role']
		/*  #swagger.parameters['obj'] = {
                    in: 'body',
                    description: "Role details - title, ",
                    schema: { $title: "", $isDeleted: 0, $isActive: 0}
            } */
		Role.create(req.body).then((role) => {
			/* #swagger.responses[200] = {
                            description: "successfully!",
                            schema: { $statusCode : 200 ,$status: true, $message: "successfully!", $data : {}}
                        } */
			const RoleInfo = {
				id: role.id,
				title: role.title,
				isDeleted: role.isDeleted,
				isActive: role.isActive,
			};
			// return res.status(200).send({ status:'200', message: "successfully!" , data: RoleInfo });
			return apiResponses.successResponseWithData(
				res,
				'successfully!',
				RoleInfo,
			);
		});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.roleById = (req, res) => {
	// #swagger.tags = ['Role']
	// Get User from Database
	Role.findOne({
		where: {
			id: req.params.roleId,
		},
	})
		.then((role) => {
			if (!role) {
				// return res.status(404).send({ message: "Data Not found." });
				return apiResponses.notFoundResponse(res, 'Data Not found.', null);
			}
			// res.status(200).send({
			//   status: "200",
			//   user: role,
			// });
			return apiResponses.successResponseWithData(
				res,
				'successfully found!',
				role,
			);
		})
		.catch((err) => {
			// res.status(500).send({ message: err.message });
			return apiResponses.errorResponse(res, err.message, err);
		});
};

module.exports.role_All = (req, res) => {
	// #swagger.tags = ['Role']
	// Get User from Database
	Role.findAll({order: [['createdAt', 'DESC']]})
		.then((roles) => {
			if (!roles) {
				// return res.status(404).send({ message: "Data Not found." });
				return apiResponses.notFoundResponse(res, 'Data Not found.', null);
			}
			// res.status(200).send({
			//   status: "200",
			//   user: role,
			// });
			return apiResponses.successResponseWithData(
				res,
				'successfully found!',
				roles,
			);
		})
		.catch((err) => {
			// res.status(500).send({ message: err.message });
			return apiResponses.errorResponse(res, err.message, err);
		});
};

module.exports.deleteRole = async (req, res) => {
	// #swagger.tags = ['Role']
	try {
		await Role.update(
			{
				isDeleted: 1,
			},
			{where: {id: req.params.id}},
		)
			.then((role) => {
				if (!role) {
					/* #swagger.responses[404] = {
                               description: "Not found.",
                               schema: { $statusCode: "404",  $status: false, $message: "Not found.",  $data: {}}
                           } */
					// return res.status(404).send({ message: "Not found." });
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}
				/* #swagger.responses[200] = {
                            description: "success!",
                        } */
				// return res.status(200).send({ status:'200', message: "success!" , data: industrial });
				return apiResponses.successResponseWithData(res, 'Success', role);
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
