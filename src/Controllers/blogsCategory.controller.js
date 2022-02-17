const db = require('../models');
const BlogCategory = db.blogscategory;
const apiResponses = require('../Components/apiresponse');

module.exports.addBlogCategory = async (req, res) => {
	try {
		BlogCategory.create({
			title: req.body.title,
			description: req.body.description,
			imagesUrl: req.body.imagesUrl,
			iconsUrl: req.body.iconsUrl,
		}).then((blogCategory) => {
			return apiResponses.successResponseWithData(res, 'success!', blogCategory);
		});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.updateBlogCategory = async (req, res) => {
	try {
		await BlogCategory.update(
			{
				title: req.body.title,
				description: req.body.description,
				imagesUrl: req.body.imagesUrl,
				iconsUrl: req.body.iconsUrl,
			},
			{where: {id: req.body.id}},
		)
			.then((blogCategory) => {
				if (!blogCategory) {
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}
				return apiResponses.successResponseWithData(res, 'Success', blogCategory);
			})
			.catch((err) => {
				return apiResponses.errorResponse(res, err.message, {});
			});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.getBlogCategories = (req, res) => {
	BlogCategory.findAll({
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

module.exports.getBlogCategory = (req, res) => {
	BlogCategory.findOne({
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

module.exports.deleteBlogCategory = async (req, res) => {
	try {
		await BlogCategory.update(
			{
				isDeleted: 1,
			},
			{where: {id: req.params.id}},
		)
			.then((blogCategory) => {
				if (!blogCategory) {
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}
				return apiResponses.successResponseWithData(res, 'Success', blogCategory);
			})
			.catch((err) => {
				return apiResponses.errorResponse(res, err.message, {});
			});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};
