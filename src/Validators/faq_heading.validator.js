const {body, sanitizeBody, validationResult} = require('express-validator');
const apiResponses = require('../Components/apiresponse');

const addFaqHeadingValidator = [
	body('title').isLength({min: 1})
		.trim().withMessage('title must be specified.'),
	body('description').isLength({min: 1})
		.trim().withMessage('description must be specified.'),
	body('images.*').isLength({min: 1})
		.trim().withMessage('images must be specified.'),
    body('isActive').isLength({min: 1})
		.trim().withMessage('isActive must be specified.'),
	
	sanitizeBody('title').escape(),
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

const updateFaqHeadingValidator = [
	body('id').isLength({min: 1})
		.trim().withMessage('faq_heading id must be specified.'),
    body('title').isLength({min: 1})
		.trim().withMessage('title must be specified.'),
	body('description').isLength({min: 1})
		.trim().withMessage('description must be specified.'),
    body('isActive').isLength({min: 1})
		.trim().withMessage('isActive must be specified.'),
	body('images.*').isLength({min: 1})
		.trim().withMessage('images must be specified.'),
	
	sanitizeBody('title').escape(),
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

const faqHeadingValidator = {
	addFaqHeadingValidator: addFaqHeadingValidator,
	updateFaqHeadingValidator: updateFaqHeadingValidator,
};

module.exports = faqHeadingValidator;
