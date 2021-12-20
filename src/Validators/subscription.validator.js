const {body, sanitizeBody, validationResult,param} = require('express-validator');
const {isNumber} = require('underscore');
const apiResponses = require('../Components/apiresponse');

const addSubscriptionValidator = [
	body('title')
		.isLength({min: 1})
		.trim()
		.withMessage('title must be specified.'),
	body('description')
		.isLength({min: 1})
		.trim()
		.withMessage('description must be specified.'),
    body('durationType')
		.isLength({min: 1})
		.trim()
		.withMessage('durationType must be specified.'),
	body('discountPercent')
		.isLength({min: 1})
		.trim()
		.withMessage('discountPercent must be specified.'),
	body('subscriptionType')
		.isLength({min: 1})
		.trim()
		.withMessage('subscription Type must be specified.'),
	body('price')
		.isLength({min: 1})
		.trim()
		.withMessage('price must be specified.'),
	body('currency')
		.isLength({min: 1})
		.trim()
		.withMessage('currency must be specified.'),
	body('features.*')
		.isLength({min: 1})
		.trim()
		.withMessage('features must be specified.'),
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
	

	sanitizeBody('title').escape(),
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




const subscriptionValidator = {
	addSubscriptionValidator: addSubscriptionValidator,
	
};

module.exports = subscriptionValidator;
