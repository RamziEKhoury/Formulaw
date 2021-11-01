const {body, sanitizeBody, validationResult,param} = require('express-validator');
const {isNumber} = require('underscore');
const apiResponses = require('../Components/apiresponse');

const addJourneyValidator = [
	body('title')
		.isLength({min: 1})
		.trim()
		.withMessage('title must be specified.'),
	body('description')
		.isLength({min: 1})
		.trim()
		.withMessage('description must be specified.'),

	body('sortNumber')
		.isLength({min: 1})
		.trim()
		.withMessage('sortNumber must be specified.'),

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

const updateJourneyValidator = [
	body('id')
		.isLength({min: 1})
		.trim()
		.withMessage('Lawfirm id must be specified.'),

        body('title')
		.isLength({min: 1})
		.trim()
		.withMessage('title must be specified.'),
	body('description')
		.isLength({min: 1})
		.trim()
		.withMessage('description must be specified.'),

	body('sortNumber')
		.isLength({min: 1})
		.trim()
		.withMessage('sortNumber must be specified.'),

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


const journeyValidator = {
	addJourneyValidator: addJourneyValidator,
	updateJourneyValidator: updateJourneyValidator,
};

module.exports = journeyValidator;
