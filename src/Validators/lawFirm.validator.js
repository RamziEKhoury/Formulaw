const {body, sanitizeBody, validationResult} = require('express-validator');
const {isNumber} = require('underscore');
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

	body('countryId')
		.isLength({min: 1})
		.trim()
		.withMessage('country Id must be specified.'),
	body('countryTitle')
		.isLength({min: 1})
		.trim()
		.withMessage('country title must be specified.'),

	body('experience')
		.isLength({min: 1})
		.trim()
		.withMessage('experience must be specified.'),
	// body('logo')
	//   .isLength({ min: 1 })
	//   .trim()
	//   .withMessage('logo must be specified.'),

	body('numOfLawyer')
		.isLength({min: 1})
		.trim()
		.withMessage('numOfLawyer must be specified.'),

	body('jurisdiction')
		.isLength({min: 1})
		.trim()
		.withMessage('jurisdiction must be specified.'),

	body('industryId')
		.isLength({min: 1})
		.trim()
		.withMessage('industry must be specified.'),

	body('industryTitle')
		.isLength({min: 1})
		.trim()
		.withMessage('industry Title must be specified.'),

	body('subCategoryId')
		.isLength({min: 1})
		.trim()
		.withMessage('subCategory Id must be specified.'),

	body('subCategoryTitle')
		.isLength({min: 1})
		.trim()
		.withMessage('subCategory title must be specified.'),

	body('serviceId')
		.isLength({min: 1})
		.trim()
		.withMessage('service Id must be specified.'),

	body('serviceTitle')
		.isLength({min: 1})
		.trim()
		.withMessage('service title must be specified.'),

	body('languageId')
		.isLength({min: 1})
		.trim()
		.withMessage('lanuage Id must be specified.'),

	body('languageTitle')
		.isLength({min: 1})
		.trim()
		.withMessage('lanuage title must be specified.'),

	body('price')
		.isLength({min: 1})
		.trim()
		.withMessage('price must be specified.'),

	body('isActive')
		.isLength({min: 1})
		.trim()
		.withMessage('isActive must be specified.'),

	sanitizeBody('languageId').escape(),
	sanitizeBody('subCategoryId').escape(),
	//   sanitizeBody('username').escape(),
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

	body('countryId')
		.isLength({min: 1})
		.trim()
		.withMessage('country Id must be specified.'),
	body('countryTitle')
		.isLength({min: 1})
		.trim()
		.withMessage('country title must be specified.'),

	body('experience')
		.isLength({min: 1})
		.trim()
		.withMessage('experience must be specified.'),
	body('logo')
		.isLength({min: 1})
		.trim()
		.withMessage('logo must be specified.'),

	body('numOfLawyer')
		.isLength({min: 1})
		.trim()
		.withMessage('numOfLawyer must be specified.'),

	body('jurisdiction')
		.isLength({min: 1})
		.trim()
		.withMessage('jurisdiction must be specified.'),

	body('industryId')
		.isLength({min: 1})
		.trim()
		.withMessage('industry must be specified.'),

	body('industryTitle')
		.isLength({min: 1})
		.trim()
		.withMessage('industry Title must be specified.'),

	body('subCategoryId')
		.isLength({min: 1})
		.trim()
		.withMessage('subCategory Id must be specified.'),

	body('subCategoryTitle')
		.isLength({min: 1})
		.trim()
		.withMessage('subCategory title must be specified.'),

	body('serviceId')
		.isLength({min: 1})
		.trim()
		.withMessage('service Id must be specified.'),

	body('serviceTitle')
		.isLength({min: 1})
		.trim()
		.withMessage('service title must be specified.'),

	body('languageId')
		.isLength({min: 1})
		.trim()
		.withMessage('lanuage Id must be specified.'),

	body('languageTitle')
		.isLength({min: 1})
		.trim()
		.withMessage('lanuage title must be specified.'),

	body('price')
		.isLength({min: 1})
		.trim()
		.withMessage('price must be specified.'),

	body('isActive')
		.isLength({min: 1})
		.trim()
		.withMessage('isActive must be specified.'),

	sanitizeBody('countryId').escape(),
	sanitizeBody('languageId').escape(),
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
};

module.exports = lawFirmValidator;
