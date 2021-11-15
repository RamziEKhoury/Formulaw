const {body, sanitizeBody, validationResult,param} = require('express-validator');
const apiResponses = require('../Components/apiresponse');

const addKycDetailsValidator = [
	body('userId')
		.isLength({min: 1})
		.trim()
		.withMessage('userId must be specified.'),
	body('passport')
		.isLength({min: 1})
		.trim()
		.withMessage('passport must be specified.'),
    body('cr')
		.isLength({min: 1})
		.trim()
		.withMessage('cr must be specified.'),
	body('idProof')
		.isLength({min: 1})
		.trim()
		.withMessage('idProof must be specified.'),
	body('addressProof')
		.isLength({min: 1})
		.trim()
		.withMessage('addressProof  must be specified.'),

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

const updateKycDetailsValidator = [
	body('id')
		.isLength({min: 1})
		.trim()
		.withMessage('kycId must be specified.'),
		body('userId')
		.isLength({min: 1})
		.trim()
		.withMessage('userId must be specified.'),
	body('passport')
		.isLength({min: 1})
		.trim()
		.withMessage('passport must be specified.'),
    body('cr')
		.isLength({min: 1})
		.trim()
		.withMessage('cr must be specified.'),
	body('idProof')
		.isLength({min: 1})
		.trim()
		.withMessage('idProof must be specified.'),
	body('addressProof')
		.isLength({min: 1})
		.trim()
		.withMessage('addressProof  must be specified.'),

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




const kycValidator = {
	addKycDetailsValidator: addKycDetailsValidator,
    updateKycDetailsValidator:updateKycDetailsValidator,
};

module.exports = kycValidator;
