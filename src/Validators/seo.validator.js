const {body, sanitizeBody, validationResult,param} = require('express-validator');
const {isNumber} = require('underscore');
const apiResponses = require('../Components/apiresponse');

const addSeoValidator = [
    body('pageTitle')
		.isLength({min: 1})
		.trim()
		.withMessage('pageTitle must be specified.'),
	body('title')
		.isLength({min: 1})
		.trim()
		.withMessage('title  must be specified.'),
    body('description')
		.isLength({min: 1})
		.trim()
		.withMessage('description must be specified.'),
    body('canonicalUrl')
		.isLength({min: 1})
		.trim()
		.withMessage('icons must be uploaded.'),
	

	sanitizeBody('pageTitle').escape(),
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

const updateSeoValidator = [
    body('id')
		.isLength({min: 1})
		.trim()
		.withMessage('id  must be specified.'),
    body('pageTitle')
		.isLength({min: 1})
		.trim()
		.withMessage('pageTitle must be specified.'),
	body('title')
		.isLength({min: 1})
		.trim()
		.withMessage('title  must be specified.'),
    body('description')
		.isLength({min: 1})
		.trim()
		.withMessage('description must be specified.'),
    body('canonicalUrl')
		.isLength({min: 1})
		.trim()
		.withMessage('icons must be uploaded.'),
	

	sanitizeBody('pageTitle').escape(),
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



const seoValidator = {
	addSeoValidator: addSeoValidator,
    updateSeoValidator: updateSeoValidator,
	
};

module.exports = seoValidator;
