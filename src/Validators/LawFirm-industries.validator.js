const {body, sanitizeBody, validationResult} = require('express-validator');
const {isNumber} = require('underscore');
const apiResponses = require('../Components/apiresponse');

const addLawFirmIndustryValidator = [
	body('lawFirmId')
		.isLength({min: 1})
		.trim()
		.withMessage('lawFirmId must be specified.'),
	// body('title')
	// 	.isLength({min: 1})
	// 	.trim()
	// 	.withMessage('title must be specified.'),

	
	// body('isActive')
	// 	.isLength({min: 1})
	// 	.trim()
	// 	.withMessage('isActive must be specified.'),

	sanitizeBody('lawFirmId').escape(),
	
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

const updateLawFirmIndustryValidator = [
	body('lawFirmId')
		.isLength({min: 1})
		.trim()
		.withMessage('lawFirmId must be specified.'),
	// body('title')
	// 	.isLength({min: 1})
	// 	.trim()
	// 	.withMessage('title must be specified.'),

	
	// body('isActive')
	// 	.isLength({min: 1})
	// 	.trim()
	// 	.withMessage('isActive must be specified.'),

	sanitizeBody('lawFirmId').escape(),
	
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

const lawFirmIndustryValidator = {
	addLawFirmIndustryValidator: addLawFirmIndustryValidator,
	updateLawFirmIndustryValidator: updateLawFirmIndustryValidator,
};

module.exports = lawFirmIndustryValidator;
