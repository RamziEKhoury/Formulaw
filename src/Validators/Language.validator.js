const {body, sanitizeBody, validationResult} = require('express-validator');
const apiResponses = require('../Components/apiresponse');

const addLanguageValidator = [
	body('en_name').isLength({min: 1})
		.trim().withMessage('en_name must be specified.'),
	body('ar_name').isLength({min: 1})
		.trim().withMessage('ar_name must be specified.'),
	body('isActive').isLength({min: 1})
		.trim().withMessage('isActive must be specified.'),
	sanitizeBody('en_name').escape(),
	sanitizeBody('ar_name').escape(),
	sanitizeBody('isActive').escape(),
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

const updateLanguageValidator = [
	body('id').isLength({min: 1})
		.trim().withMessage('Country id must be specified.'),
	body('en_name').isLength({min: 1})
		.trim().withMessage('en_name must be specified.'),
	body('ar_name').isLength({min: 1})
		.trim().withMessage('ar_name must be specified.'),
	body('isActive').isLength({min: 1})
		.trim().withMessage('isActive must be specified.'),
	sanitizeBody('en_name').escape(),
	sanitizeBody('ar_name').escape(),
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

const languageValidator = {
	addLanguageValidator: addLanguageValidator,
	updateLanguageValidator: updateLanguageValidator,
};

module.exports = languageValidator;
