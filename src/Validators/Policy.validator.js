const {body, sanitizeBody, validationResult} = require('express-validator');
const apiResponses = require('../Components/apiresponse');

const addPolicyValidator = [
	body('privacyandPolicy')
		.isLength({min: 1})
		.trim()
		.withMessage('privacy and Policy must be specified.'),
	body('collect')
		.isLength({min: 1})
		.trim()
		.withMessage('collect must be specified.'),
	body('rights')
		.isLength({min: 1})
		.trim()
		.withMessage('rights must be specified.'),
	body('retention')
		.isLength({min: 1})
		.trim()
		.withMessage('retention must be specified.'),
	body('cookies')
		.isLength({min: 1})
		.trim()
		.withMessage('cookies must be specified.'),
	body('amendments')
		.isLength({min: 1})
		.trim()
		.withMessage('amendments must be specified.'),
	sanitizeBody('privacyandPolicy').escape(),
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

const updatePolicyValidator = [
	body('id').isLength({min: 1}).trim().withMessage('id must be specified.'),
	body('privacyandPolicy')
		.isLength({min: 1})
		.trim()
		.withMessage('privacyandPolicy must be specified.'),
	body('collect')
		.isLength({min: 1})
		.trim()
		.withMessage('collect must be specified.'),
	body('rights')
		.isLength({min: 1})
		.trim()
		.withMessage('rights must be specified.'),
	body('retention')
		.isLength({min: 1})
		.trim()
		.withMessage('retention must be specified.'),
	body('cookies')
		.isLength({min: 1})
		.trim()
		.withMessage('cookies must be specified.'),
	body('amendments')
		.isLength({min: 1})
		.trim()
		.withMessage('amendments must be specified.'),
	sanitizeBody('privacyandPolicy').escape(),
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

const policyValidator = {
	addPolicyValidator: addPolicyValidator,
	updatePolicyValidator: updatePolicyValidator,
};

module.exports = policyValidator;
