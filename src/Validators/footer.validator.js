const {body, sanitizeBody, validationResult,param} = require('express-validator');
const {isNumber} = require('underscore');
const apiResponses = require('../Components/apiresponse');

const addFooterValidator = [
	body('header')
		.isLength({min: 1})
		.trim()
		.withMessage('header must be specified.'),
    body('description')
		.isLength({min: 1})
		.trim()
		.withMessage('description must be specified.'),
    body('social')
		.isLength({min: 1})
		.trim()
		.withMessage('social must be specified.'),       
    body('titleOne')
		.isLength({min: 1})
		.trim()
		.withMessage('title one must be specified.'),
    body('titleOneDescription')
		.isLength({min: 1})
		.trim()
		.withMessage('title one description must be specified.'),
	body('titleTwo')
		.isLength({min: 1})
		.trim()
		.withMessage('title two must be specified.'),
    body('titleTwoDescription')
		.isLength({min: 1})
		.trim()
		.withMessage('title two descriptiom must be specified.'),    
    body('copy_right')
		.isLength({min: 1})
		.trim()
		.withMessage('copyright must be specified.'),
	

	sanitizeBody('titleOne').escape(),
    sanitizeBody('titleTwo').escape(),
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

const footerValidator = {
	addFooterValidator: addFooterValidator,	
};

module.exports = footerValidator;
