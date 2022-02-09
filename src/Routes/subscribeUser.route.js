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
		'/api/v1/subscribeUser/create-SubscribeUser',
		subscribeUserController.addSubscribeUser
	);
	app.post(
		'/api/v1/subscribeUser/update-SubscribeUser', 
		subscribeUserController.updateSubscribeUser
	);
	app.get(
		'/api/v1/subscribeUser/get-SubscribeUser/:id',
		subscribeUserController.getSubscribeUser
        );
	
	app.get(
			'/api/v1/subscribeUser/get-allSubscribeUsers',
			subscribeUserController.getallSubscribeUsers,
	);
	app.delete(
			'/api/v1/subscribeUser/delete-SubscribeUser/:id',
			subscribeUserController.deleteSubscribeUser
            );
};
