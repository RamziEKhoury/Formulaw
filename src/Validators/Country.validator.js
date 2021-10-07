const {body, sanitizeBody, validationResult} = require('express-validator');
const apiResponses = require('../Components/apiresponse');

const addCountryValidator = [
	body('en_name').isLength({min: 1})
		.trim().withMessage('en_name must be specified.'),
	body('ar_name').isLength({min: 1})
		.trim().withMessage('ar_name must be specified.'),
	body('countryCode').isLength({min: 1})
		.trim().withMessage('countryCode must be specified.'),
	body('isActive').isLength({min: 1})
		.trim().withMessage('isActive must be specified.'),
	sanitizeBody('countryCode').escape(),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return apiResponses.validationErrorWithData(
				res, 'Validation Error.', errors.array(),
			);
		} else {
			next();
		}
	}];

const updateCountryValidator = [
	body('id').isLength({min: 1})
		.trim().withMessage('Country id must be specified.'),
	body('en_name').isLength({min: 1})
		.trim().withMessage('en_name must be specified.'),
	body('flag').isLength({min: 1})
		.trim().withMessage('flag must be specified.'),
	body('ar_name').isLength({min: 1})
		.trim().withMessage('ar_name must be specified.'),
	body('countryCode').isLength({min: 1})
		.trim().withMessage('countryCode must be specified.'),
	body('isActive').isLength({min: 1})
		.trim().withMessage('isActive must be specified.'),
	sanitizeBody('countryCode').escape(),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return apiResponses.validationErrorWithData(
				res, 'Validation Error.', errors.array(),
			);
		} else {
			next();
		}
	}];

const countryValidator = {
	addCountryValidator: addCountryValidator,
	updateCountryValidator: updateCountryValidator,
};

module.exports = countryValidator;
