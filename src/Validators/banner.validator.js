const {body, sanitizeBody, validationResult,param} = require('express-validator');
const {isNumber} = require('underscore');
const apiResponses = require('../Components/apiresponse');

const addBannerValidator = [
	body('titleOne')
		.isLength({min: 1})
		.trim()
		.withMessage('title one must be specified.'),
	body('titleTwo')
		.isLength({min: 1})
		.trim()
		.withMessage('title two must be specified.'),
    body('description')
		.isLength({min: 1})
		.trim()
		.withMessage('description must be specified.'),
	body('features.*')
		.isLength({min: 1})
		.trim()
		.withMessage('features must be specified.'),
	

	sanitizeBody('titleOne').escape(),
    sanitizeBody('titleTwo').escape(),
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



const bannerValidator = {
	addBannerValidator: addBannerValidator,
	
};

module.exports = bannerValidator;
