const {body, sanitizeBody, validationResult} = require('express-validator');
const apiResponses = require('../Components/apiresponse');

const addFaqAnswerValidator = [
	body('faq_heading_id').isLength({min: 1})
		.trim().withMessage('faq_heading_id must be specified.'),
	body('question').isLength({min: 1})
		.trim().withMessage('question must be specified.'),
	body('answer').isLength({min: 1})
		.trim().withMessage('answer must be specified.'),
	body('images.*').isLength({min: 1})
		.trim().withMessage('images must be specified.'),
	body('isActive').isLength({min: 1})
		.trim().withMessage('isActive must be specified.'),
	sanitizeBody('question').escape(),
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

const updateFaqAnswerValidator = [
	body('id').isLength({min: 1})
		.trim().withMessage('faq_heading id must be specified.'),
	body('faq_heading_id').isLength({min: 1})
		.trim().withMessage('faq_heading_id must be specified.'),
	body('question').isLength({min: 1})
		.trim().withMessage('question must be specified.'),
	body('answer').isLength({min: 1})
		.trim().withMessage('answer must be specified.'),
	body('isActive').isLength({min: 1})
		.trim().withMessage('isActive must be specified.'),
	body('images.*').isLength({min: 1})
		.trim().withMessage('images must be specified.'),

	sanitizeBody('question').escape(),
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

const FaqAnswerValidator = {
	addFaqAnswerValidator: addFaqAnswerValidator,
	updateFaqAnswerValidator: updateFaqAnswerValidator,
};

module.exports = FaqAnswerValidator;
