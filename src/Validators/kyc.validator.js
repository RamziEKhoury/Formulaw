const {body, sanitizeBody, validationResult,param} = require('express-validator');
const apiResponses = require('../Components/apiresponse');

const addKycDetailsValidator = [
	body('userId')
		.isLength({min: 1})
		.trim()
		.withMessage('userId must be specified.'),
	// body('passport.*')
	// 	.isLength({min: 1})
	// 	.trim()
	// 	.withMessage('passport must be specified.'),
    body('photo')
		.isLength({min: 1})
		.trim()
		.withMessage('photo must be specified.'),
	body('addressone')
		.isLength({min: 1})
		.trim()
		.withMessage('address one must be specified.'),
	body('addresstwo')
		.isLength({min: 1})
		.trim()
		.withMessage('address two must be specified.'),
	body('country')
		.isLength({min: 1})
		.trim()
		.withMessage('country  must be specified.'),
	body('city')
		.isLength({min: 1})
		.trim()
		.withMessage('city must be specified.'),
	body('postalcode')
		.isLength({min: 1})
		.trim()
		.withMessage('postalcode must be specified.'),

	body('PhnNumber')
		.isLength({min: 1})
		.trim()
		.withMessage('PhnNumber  must be specified.'),

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
	// body('passport.*')
	// 	.isLength({min: 1})
	// 	.trim()
	// 	.withMessage('passport must be specified.'),
    body('photo')
		.isLength({min: 1})
		.trim()
		.withMessage('photo must be specified.'),
		body('addressone')
		.isLength({min: 1})
		.trim()
		.withMessage('address one must be specified.'),
	body('addresstwo')
		.isLength({min: 1})
		.trim()
		.withMessage('address two must be specified.'),
	body('country')
		.isLength({min: 1})
		.trim()
		.withMessage('country  must be specified.'),
	body('city')
		.isLength({min: 1})
		.trim()
		.withMessage('city must be specified.'),
	body('postalcode')
		.isLength({min: 1})
		.trim()
		.withMessage('postalcode must be specified.'),
	body('PhnNumber')
		.isLength({min: 1})
		.trim()
		.withMessage('PhnNumber  must be specified.'),

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
