const subscribeUserController = require('../Controllers/subscribeUser.controller');

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept',
		);
		next();
	});

	app.post(
		'/api/v1/subscribeUser/create-subscribeUser',
		subscribeUserController.addsubscribeUser,
	);
	app.post(
		'/api/v1/subscribeUser/update-subscribeUser', 
		subscribeUserController.updatesubscribeUser,
	);
	app.get(
		'/api/v1/subscribeUser/get-subscribeUser/:id',
		subscribeUserController.getsubscribeUser,
        );
	
	app.get(
			'/api/v1/subscribeUser/get-allsubscribeUsers/',
			subscribeUserController.getallsubscribeUsers,
	);
	app.delete(
			'/api/v1/subscribeUser/delete-subscribeUser/:id',
			subscribeUserController.deletesubscribeUser,
            );
};
