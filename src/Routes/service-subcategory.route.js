const serviceSubCategoryController = require('../Controllers/service-subcategory.controller');

const serviceSubcategoryValidator = require('../Validators/Service-subcategories.validator');


module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept',
		);
		next();
	});

	app.post(
		'/api/v1/service/add-subcategory',
		[serviceSubcategoryValidator.addServiceSubcategoryValidator],
		serviceSubCategoryController.addServiceSubCategory,
	);

	app.post(
		'/api/v1/service/update-subcategory',
		[serviceSubcategoryValidator.updateServiceSubcategoryValidator],
		serviceSubCategoryController.subCategoryUpdate,
	);

	app.get(
		'/api/v1/service/get-subcategories/:serviceId/:page/:offset',
		serviceSubCategoryController.getServiceSubcategories);

	app.get(
		'/api/v1/service/get-subcategory/:id',
		serviceSubCategoryController.getSubCategory);
};
