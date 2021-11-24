const preOrderController = require('../Controllers/preOrder.controller');

const PreOrderValidator = require('../Validators/preOrder.validator');

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept',
		);
		next();
	});

	app.post(
		'/api/v1/preOrder/add-preOrderDetails',
		PreOrderValidator.addPreOrderValidator,
		preOrderController.addPreOrder,
	);

    app.post(
		'/api/v1/preOrder/update-preOrderDetails',
		PreOrderValidator.updatePreOrderValidator,
		preOrderController.updatePreOrder,
	);

	app.get('/api/v1/preOrder/get-onePreOrderDetails/:queryId',
     preOrderController.getPreOrder
     );

	app.get('/api/v1/preOrder/get-allPreOrdersDetails',
     preOrderController.getPreOrders
     );

};
