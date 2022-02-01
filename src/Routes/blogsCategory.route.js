const blogsCategoryController = require('../Controllers/blogsCategory.controller');

const BlogsCategoryValidator = require('../Validators/blogsCategory.validator');


module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept',
		);
		next();
	});

	app.post(
		'/api/v1/blogsCategory/add-blogsCategory',
		[BlogsCategoryValidator.addBlogsCategoryValidator],
		blogsCategoryController.addBlogCategory,
	);

	app.post(
		'/api/v1/blogsCategory/update-blogsCategory',
		[BlogsCategoryValidator.updateBlogsCategoryValidator],
		blogsCategoryController.updateBlogCategory,
	);

	app.get(
		'/api/v1/blogsCategory/get-blogsCategories/:limit',
		blogsCategoryController.getBlogCategories);

	app.get(
		'/api/v1/blogsCategory/get-blogsCategory/:id',
		blogsCategoryController.getBlogCategory);

	app.delete(
		'/api/v1/blogsCategory/delete-blogsCategory/:id',
		blogsCategoryController.deleteBlogCategory);
};
