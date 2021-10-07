const {body, sanitizeBody, validationResult} = require('express-validator');
const apiResponses = require('../Components/apiresponse');

const addIndustrialValidator = [
	body('en_name')
		.isLength({min: 1})
		.trim()
		.withMessage('en_name must be specified.'),
	body('ar_name')
		.isLength({min: 1})
		.trim()
		.withMessage('ar_name must be specified.'),
	body('description')
		.isLength({min: 1})
		.trim()
		.withMessage('description must be specified.'),
	// body('isBillable')
	//   .isLength({ min: 1 })
	//   .trim()
	//   .withMessage('isBillable must be specified.'),
	body('isActive')
		.isLength({min: 1})
		.trim()
		.withMessage('isActive must be specified.'),
	sanitizeBody('en_name').escape(),
	sanitizeBody('ar_name').escape(),
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

const updateIndustrialValidator = [
	body('id')
		.isLength({min: 1})
		.trim()
		.withMessage('Country id must be specified.'),
	body('en_name')
		.isLength({min: 1})
		.trim()
		.withMessage('en_name must be specified.'),
	body('ar_name')
		.isLength({min: 1})
		.trim()
		.withMessage('ar_name must be specified.'),
	body('description')
		.isLength({min: 1})
		.trim()
		.withMessage('description must be specified.'),
	body('isActive')
		.isLength({min: 1})
		.trim()
		.withMessage('isActive must be specified.'),
	sanitizeBody('en_name').escape(),
	sanitizeBody('ar_name').escape(),
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

const industrialValidator = {
	addIndustrialValidator: addIndustrialValidator,
	updateIndustrialValidator: updateIndustrialValidator,
};

module.exports = industrialValidator;
