const blogsController = require('../Controllers/blogs.controller');

const BlogsValidator = require('../Validators/blogs.validator');


module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept',
		);
		next();
	});

	app.post(
		'/api/v1/blogs/add-blogs',
		[BlogsValidator.addBlogsValidator],
		blogsController.addBlog,
	);

	app.post(
		'/api/v1/blogs/update-blogs',
		[BlogsValidator.updateBlogsValidator],
		blogsController.updateBlog,
	);

	app.get(
		'/api/v1/blogs/get-blogs/:limit',
		blogsController.getBlogs);

	app.get(
		'/api/v1/blogs/get-blog/:id',
		blogsController.getOneBlog);
    
    app.get(
        '/api/v1/blogs/get-blogbycategory/:blogCategoryId',
        blogsController.getBlogByCategory);

	// app.delete(
	// 	'/api/v1/blogsCaterogy/delete-blogsCaterogy/:id',
	// 	blogsController.deleteBlogCategory);
};
