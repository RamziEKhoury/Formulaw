const {body, sanitizeBody, validationResult} = require('express-validator');
const apiResponses = require('../Components/apiresponse');

const addsubUserValidator = [
	body('userId').isLength({min: 1})
		.trim().withMessage('userId must be specified.'),
	body('subscriptionId').isLength({min: 1})
		.trim().withMessage('subscriptionId must be specified.'),
	body('durationType').isLength({min: 1})
		.trim().withMessage('durationType must be specified.'),
	body('subscriptionPlan').isLength({min: 1})
		.trim().withMessage('subscription Plan must be specified.'),
	body('startingDate').isLength({min: 1})
		.trim().withMessage('startingDate must be specified.'),
	body('endDate').isLength({min: 1})
		.trim().withMessage('endDate must be specified.'),
	body('numberOfMeeting')
		.isLength({min: 1})
		.trim()
		.withMessage('numberOfMeeting must be specified.'),
	body('meetingPlan')
		.isLength({min: 1})
		.trim()
		.withMessage('meetingPlan must be specified.'),

	sanitizeBody('userId').escape(),
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

const UpdatesubUserValidator = [
	body('userId').isLength({min: 1})
		.trim().withMessage('userId must be specified.'),
        body('durationType').isLength({min: 1})
		.trim().withMessage('durationType must be specified.'),
	body('subscriptionPlan').isLength({min: 1})
		.trim().withMessage('subscription Plan must be specified.'),
	body('startingDate').isLength({min: 1})
		.trim().withMessage('startingDate must be specified.'),
	body('endDate').isLength({min: 1})
		.trim().withMessage('endDate must be specified.'),
	body('numberOfMeeting')
		.isLength({min: 1})
		.trim()
		.withMessage('numberOfMeeting must be specified.'),
	body('meetingPlan')
		.isLength({min: 1})
		.trim()
		.withMessage('meetingPlan must be specified.'),
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

const subUserValidator = {
	addsubUserValidator: addsubUserValidator,
	UpdatesubUserValidator: UpdatesubUserValidator,
};

module.exports = subUserValidator;
