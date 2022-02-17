const db = require('../models');
const Blog = db.blog;
const apiResponses = require('../Components/apiresponse');

module.exports.addBlog = async (req, res) => {
	try {
		Blog.create({
			blogCategoryId: req.body.blogCategoryId,
			userId: req.body.userId,
			title: req.body.title,
			description: req.body.description,
			imagesUrls: req.body.imagesUrls,
			type: req.body.type,
		}).then((blog) => {
			return apiResponses.successResponseWithData(res, 'success!', blog);
		});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.updateBlog = async (req, res) => {
	try {
		await Blog.update(
			{
				blogCategoryId: req.body.blogCategoryId,
				userId: req.body.userId,
				title: req.body.title,
				description: req.body.description,
				imagesUrls: req.body.imagesUrls,
				type: req.body.type,
			},
			{where: {id: req.body.id}},
		)
			.then((blog) => {
				if (!blog) {
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}
				return apiResponses.successResponseWithData(res, 'Success', blog);
			})
			.catch((err) => {
				return apiResponses.errorResponse(res, err.message, {});
			});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.getBlogs = (req, res) => {
	Blog.findAll({
		where: {isDeleted: 0},
		order: [['createdAt', 'DESC']]})
		.then((data) => {
			return apiResponses.successResponseWithData(res, 'success', data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving data.',
			});
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Something Went Wrong',
			});
		});
};

module.exports.getOneBlog = (req, res) => {
	Blog.findOne({
		where: {id: req.params.id, isDeleted: 0},
	})
		.then((data) => {
			return apiResponses.successResponseWithData(res, 'success', data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving data.',
			});
		});
};

module.exports.getBlogByCategory = (req, res) => {
	Blog.findAll({
		where: {blogCategoryId: req.params.blogCategoryId, isDeleted: 0},
	})
		.then((data) => {
			return apiResponses.successResponseWithData(res, 'success', data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving data.',
			});
		});
};

// module.exports.deleteBlogCategory = async (req, res) => {
// 	try {
// 		await Blog.update(
// 			{
// 				isDeleted: 1,
// 			},
// 			{where: {id: req.params.id}},
// 		)
// 			.then((blogCategory) => {
// 				if (!blogCategory) {
// 					return apiResponses.notFoundResponse(res, 'Not found.', {});
// 				}
// 				return apiResponses.successResponseWithData(res, 'Success', blogCategory);
// 			})
// 			.catch((err) => {
// 				return apiResponses.errorResponse(res, err.message, {});
// 			});
// 	} catch (err) {
// 		return apiResponses.errorResponse(res, err);
// 	}
// };
