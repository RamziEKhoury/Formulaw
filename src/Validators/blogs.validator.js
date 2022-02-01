const {body, sanitizeBody, validationResult,param} = require('express-validator');
const {isNumber} = require('underscore');
const apiResponses = require('../Components/apiresponse');

const addBlogsValidator = [
    body('userId')
		.isLength({min: 1})
		.trim()
		.withMessage('user id  must be specified.'),
    body('blogCategoryId')
		.isLength({min: 1})
		.trim()
		.withMessage('blogCategory Id  must be specified.'),
	body('title')
		.isLength({min: 1})
		.trim()
		.withMessage('title  must be specified.'),
    body('description')
		.isLength({min: 1})
		.trim()
		.withMessage('description must be specified.'),
	body('imagesUrls.*')
		.isLength({min: 1})
		.trim()
		.withMessage('images must be uploaded.'),
    
	

	sanitizeBody('blogCategoryId').escape(),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return apiResponses.validationErrorWithData(
				res,
				'Validation Error.',
				errors.array(),
			);
		} else {
			next();
		}
	},
];

const updateBlogsValidator = [
    body('id')
		.isLength({min: 1})
		.trim()
		.withMessage('id  must be specified.'),
    body('userId')
		.isLength({min: 1})
		.trim()
		.withMessage('user id  must be specified.'),
    body('blogCategoryId')
		.isLength({min: 1})
		.trim()
		.withMessage('blogCategory Id  must be specified.'),
	body('title')
		.isLength({min: 1})
		.trim()
		.withMessage('title  must be specified.'),
    body('description')
		.isLength({min: 1})
		.trim()
		.withMessage('description must be specified.'),
	body('imagesUrls.*')
		.isLength({min: 1})
		.trim()
		.withMessage('images must be uploaded.'),
	

	sanitizeBody('blogCategoryId').escape(),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return apiResponses.validationErrorWithData(
				res,
				'Validation Error.',
				errors.array(),
			);
		} else {
			next();
		}
	},
];



const blogsValidator = {
	addBlogsValidator: addBlogsValidator,
    updateBlogsValidator: updateBlogsValidator,
	
};

module.exports = blogsValidator;
