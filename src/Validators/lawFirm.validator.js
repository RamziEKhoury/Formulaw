const {body, sanitizeBody, validationResult, param} = require('express-validator');
const apiResponses = require('../Components/apiresponse');

const addLawFirmValidator = [
	body('en_name')
		.isLength({min: 1})
		.trim()
		.withMessage('en_name must be specified.'),
	body('ar_name')
		.isLength({min: 1})
		.trim()
		.withMessage('ar_name must be specified.'),

	body('licenseNumber')
		.isLength({min: 1})
		.trim()
		.withMessage('licenseNumber must be specified.'),

	body('countryId.*')
		.isLength({min: 1})
		.trim()
		.withMessage('country Id must be specified.'),
	body('countryTitle.*')
		.isLength({min: 1})
		.trim()
		.withMessage('country title must be specified.'),

	body('experience')
		.isLength({min: 1})
		.trim()
		.withMessage('experience must be specified.'),

	body('numOfLawyer')
		.isLength({min: 1})
		.trim()
		.withMessage('numOfLawyer must be specified.'),
		
	body('jurisdictionid.*')
		.isLength({min: 1})
		.trim()
		.withMessage('jurisdictionid must be specified.'),

	body('jurisdiction.*')
		.isLength({min: 1})
		.trim()
		.withMessage('jurisdiction must be specified.'),

	body('languageId.*')
		.isLength({min: 1})
		.trim()
		.withMessage('language Id must be specified.'),

	body('languageTitle.*')
		.isLength({min: 1})
		.trim()
		.withMessage('language title must be specified.'),
	body('logo')
		.isLength({min: 1})
		.trim()
		.withMessage('logo  must be specified.'),
	body('images.*')
		.isLength({min: 1})
		.trim()
		.withMessage('images must be specified.'),
	body('isActive')
		.isLength({min: 1})
		.trim()
		.withMessage('isActive must be specified.'),
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

const updateLawFirmValidator = [
	body('id')
		.isLength({min: 1})
		.trim()
		.withMessage('Lawfirm id must be specified.'),

	body('en_name')
		.isLength({min: 1})
		.trim()
		.withMessage('en_name must be specified.'),
	body('ar_name')
		.isLength({min: 1})
		.trim()
		.withMessage('ar_name must be specified.'),
	body('licenseNumber')
		.isLength({min: 1})
		.trim()
		.withMessage('licenseNumber must be specified.'),
	// body('countryId.*')
	// 	.isLength({min: 1})
	// 	.trim()
	// 	.withMessage('country Id must be specified.'),
	body('countryTitle.*')
		.isLength({min: 1})
		.trim()
		.withMessage('country title must be specified.'),

	body('experience')
		.isLength({min: 1})
		.trim()
		.withMessage('experience must be specified.'),

	body('numOfLawyer')
		.isLength({min: 1})
		.trim()
		.withMessage('numOfLawyer must be specified.'),
	
	body('jurisdictionid.*')
		.isLength({min: 1})
		.trim()
		.withMessage('jurisdictionid must be specified.'),

	body('jurisdiction.*')
		.isLength({min: 1})
		.trim()
		.withMessage('jurisdiction must be specified.'),

	body('languageId.*')
		.isLength({min: 1})
		.trim()
		.withMessage('language Id must be specified.'),

	body('languageTitle.*')
		.isLength({min: 1})
		.trim()
		.withMessage('language title must be specified.'),
	body('logo')
		.isLength({min: 1})
		.trim()
		.withMessage('logo  must be specified.'),
	body('images.*')
		.isLength({min: 1})
		.trim()
		.withMessage('images must be specified.'),
	body('isActive')
		.isLength({min: 1})
		.trim()
		.withMessage('isActive must be specified.'),

	sanitizeBody('countryId').escape(),

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

const updateLawFirmWorkflowStatusValidator = [
	param('lawFirmId')
		.isLength({min: 10})
		.trim()
		.withMessage('lawFirmId must be valid.'),
	param('workflow')
		.isLength({min: 3})
		.trim()
		.withMessage('workflow value is not valid.'),

	sanitizeBody('lawFirmId').escape(),
	sanitizeBody('workflow').escape(),
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
const lawFirmValidator = {
	addLawFirmValidator: addLawFirmValidator,
	updateLawFirmValidator: updateLawFirmValidator,
	updateLawFirmWorkflowStatusValidator: updateLawFirmWorkflowStatusValidator,
};

module.exports = lawFirmValidator;
