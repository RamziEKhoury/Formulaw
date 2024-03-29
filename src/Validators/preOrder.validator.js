const {body, sanitizeBody, validationResult} = require('express-validator');
const apiResponses = require('../Components/apiresponse');

const addPreOrderValidator = [
	body('appointmentId')
		.isLength({min: 1})
		.trim()
		.withMessage('appointmentId must be specified.'),
	body('queryId')
		.isLength({min: 1})
		.trim()
		.withMessage('queryId must be specified.'),
	body('topic')
		.isLength({min: 1})
		.trim()
		.withMessage('topic  must be specified.'),
	body('furtherInformation')
		.isLength({min: 1})
		.trim()
		.withMessage('furtherInformation  must be specified.'),
	sanitizeBody('userId').escape(),
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

const updatePreOrderValidator = [
	body('id')
		.isLength({min: 1})
		.trim()
		.withMessage('kycId must be specified.'),
	body('topic')
		.isLength({min: 1})
		.trim()
		.withMessage('topic  must be specified.'),
	body('furtherInformation')
		.isLength({min: 1})
		.trim()
		.withMessage('furtherInformation  must be specified.'),
	body('document')
		.isLength({min: 1})
		.trim()
		.withMessage('document  must be specified.'),

	sanitizeBody('userId').escape(),
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


const preOrderValidator = {
	addPreOrderValidator: addPreOrderValidator,
	updatePreOrderValidator: updatePreOrderValidator,
};

module.exports = preOrderValidator;
