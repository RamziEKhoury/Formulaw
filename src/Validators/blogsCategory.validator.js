const {body, sanitizeBody, validationResult,param} = require('express-validator');
const {isNumber} = require('underscore');
const apiResponses = require('../Components/apiresponse');

const addBlogsCategoryValidator = [
	body('title')
		.isLength({min: 1})
		.trim()
		.withMessage('title  must be specified.'),
    body('description')
		.isLength({min: 1})
		.trim()
		.withMessage('description must be specified.'),
	// body('imagesUrl')
	// 	.isLength({min: 1})
	// 	.trim()
	// 	.withMessage('images must be uploaded.'),
    body('iconsUrl')
		.isLength({min: 1})
		.trim()
		.withMessage('icons must be uploaded.'),
	

	sanitizeBody('title').escape(),
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

const updateBlogsCategoryValidator = [
    body('id')
		.isLength({min: 1})
		.trim()
		.withMessage('id  must be specified.'),
	body('title')
		.isLength({min: 1})
		.trim()
		.withMessage('title  must be specified.'),
    body('description')
		.isLength({min: 1})
		.trim()
		.withMessage('description must be specified.'),
	// body('imagesUrl')
	// 	.isLength({min: 1})
	// 	.trim()
	// 	.withMessage('images must be uploaded.'),
    body('iconsUrl')
		.isLength({min: 1})
		.trim()
		.withMessage('icons must be uploaded.'),
	

	sanitizeBody('title').escape(),
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



const blogsCategoryValidator = {
	addBlogsCategoryValidator: addBlogsCategoryValidator,
    updateBlogsCategoryValidator: updateBlogsCategoryValidator,
	
};

module.exports = blogsCategoryValidator;
