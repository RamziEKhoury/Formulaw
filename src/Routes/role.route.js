const roleController = require('../Controllers/roles.controller');

const RoleValidator = require('../Validators/Role.validator');


module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept',
		);
		next();
	});

	app.post(
		'/api/v1/role/add-role',
		[RoleValidator.RoleAddValidator],
		roleController.addRole,
	);

	app.get('/api/v1/role/getOneRole/:roleId', roleController.roleById);

	app.get('/api/v1/role/getAllRole', roleController.role_All);

	app.delete('/api/v1/role/delete-role/:id', roleController.deleteRole);
};
