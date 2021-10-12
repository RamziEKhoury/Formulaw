const {body, sanitizeBody, validationResult} = require('express-validator');
const apiResponses = require('../Components/apiresponse');

const createRequestValidator = [
	body('getstarted')
		.isLength({min: 1})
		.trim()
		.withMessage('getStarted text must be specified.'),

	body('firstName')
		.isLength({min: 1})
		.trim()
		.withMessage('firstName must be specified.'),
	body('lastName')
		.isLength({min: 1})
		.trim()
		.withMessage('lastName must be specified.'),
	  body('email')
	    .isLength({min: 1})
	    .trim()
	    .withMessage('email must be specified.'),
	body('jurisdictionId')
		.isLength({min: 1})
		.trim()
		.withMessage('jurisdictionId must be specified.'),

	body('languageId')
		.isLength({min: 1})
		.trim()
		.withMessage('languageId must be specified.'),

	body('legalFieldId')
		.isLength({min: 1})
		.trim()
		.withMessage('legalFieldId must be specified.'),

	body('legalFieldName')
		.isLength({min: 1})
		.trim()
		.withMessage('legalFieldName must be specified.'),

	body('serviceSubcategoryId.*')
		.isLength({min: 1})
		.trim()
		.withMessage('serviceSubcategoryId must be specified.'),

	body('serviceSubcategoryName.*')
		.isLength({min: 1})
		.trim()
		.withMessage('serviceSubcategoryName must be specified.'),

	body('budgetMin')
		.isLength({min: 1})
		.trim()
		.withMessage('budgetMin must be specified.'),

	body('budgetMax')
		.isLength({min: 1})
		.trim()
		.withMessage('budgetMax must be specified.'),

	body('rating')
		.isLength({min: 1})
		.trim()
		.withMessage('rating must be specified.'),

	body('experience')
		.isLength({min: 1})
		.trim()
		.withMessage('experience must be specified.'),

	body('isActive')
		.isLength({min: 1})
		.trim()
		.withMessage('isActive must be specified.'),

	sanitizeBody('firstName').escape(),
	sanitizeBody('lastName').escape(),
	sanitizeBody('email').escape(),
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

const updateRequestValidator = [
	body('id')
		.isLength({min: 1})
		.trim()
		.withMessage('request id must be specified.'),
	body('getstarted')
		.isLength({min: 1})
		.trim()
		.withMessage('getstarted text must be specified.'),
	body('firstName')
		.isLength({min: 1})
		.trim()
		.withMessage('firstName must be specified.'),
	body('lastName')
		.isLength({min: 1})
		.trim()
		.withMessage('lastName must be specified.'),
	body('email')
		.isLength({min: 1})
		.trim()
		.withMessage('email must be specified.'),
	body('jurisdictionId')
		.isLength({min: 1})
		.trim()
		.withMessage('jurisdictionId must be specified.'),

	body('languageId')
		.isLength({min: 1})
		.trim()
		.withMessage('languageId must be specified.'),

	body('legalFieldId')
		.isLength({min: 1})
		.trim()
		.withMessage('legalFieldId must be specified.'),

	body('legalFieldName')
		.isLength({min: 1})
		.trim()
		.withMessage('legalFieldName must be specified.'),

	body('serviceSubcategoryId')
		.isLength({min: 1})
		.trim()
		.withMessage('serviceSubcategoryId must be specified.'),

	body('serviceSubcategoryName')
		.isLength({min: 1})
		.trim()
		.withMessage('serviceSubcategoryName must be specified.'),

	body('budgetMin')
		.isLength({min: 1})
		.trim()
		.withMessage('budgetMin must be specified.'),

	body('budgetMax')
		.isLength({min: 1})
		.trim()
		.withMessage('budgetMax must be specified.'),

	body('rating')
		.isLength({min: 1})
		.trim()
		.withMessage('rating must be specified.'),

	body('experience')
		.isLength({min: 1})
		.trim()
		.withMessage('experience must be specified.'),

	body('isActive')
		.isLength({min: 1})
		.trim()
		.withMessage('isActive must be specified.'),

	sanitizeBody('firstName').escape(),
	sanitizeBody('lastName').escape(),
	sanitizeBody('email').escape(),
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

const requestValidator = {
	createRequestValidator: createRequestValidator,
	updateRequestValidator: updateRequestValidator,
};

module.exports = requestValidator;
