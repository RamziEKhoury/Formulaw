const {body, sanitizeBody, validationResult} = require('express-validator');
const apiResponses = require('../Components/apiresponse');

const addUserSubscriptionValidator = [
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
		body('discount')
		.isLength({min: 1})
		.trim()
		.withMessage('discount must be specified.'),
	body('numberOfMeeting')
		.isLength({min: 1})
		.trim()
		.withMessage('numberOfMeeting must be specified.'),
	body('meetingPlan')
		.isLength({min: 1})
		.trim()
		.withMessage('meetingPlan must be specified.'),
	body('ipAudit')
		.isLength({min: 1})
		.trim()
		.withMessage('ipAudit must be specified.'),
	body('contractTemplates')
		.isLength({min: 1})
		.trim()
		.withMessage('contractTemplates must be specified.'),
	body('contract_templates.*')
		.isLength({min: 1})
		.trim()
		.withMessage('contract_templates must be specified.'),

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

const UpdateUserSubscriptionValidator = [
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
		body('discount')
		.isLength({min: 1})
		.trim()
		.withMessage('discount must be specified.'),
	body('numberOfMeeting')
		.isLength({min: 1})
		.trim()
		.withMessage('numberOfMeeting must be specified.'),
	body('meetingPlan')
		.isLength({min: 1})
		.trim()
		.withMessage('meetingPlan must be specified.'),
	body('ipAudit')
		.isLength({min: 1})
		.trim()
		.withMessage('ipAudit must be specified.'),
	body('contractTemplates')
		.isLength({min: 1})
		.trim()
		.withMessage('contractTemplates must be specified.'),
	body('contract_templates.*')
		.isLength({min: 1})
		.trim()
		.withMessage('contract_templates must be specified.'),
		
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

const userSubscriptionValidator = {
	addUserSubscriptionValidator: addUserSubscriptionValidator,
	UpdateUserSubscriptionValidator: UpdateUserSubscriptionValidator,
};

module.exports = userSubscriptionValidator;
