const {body, sanitizeBody, validationResult} = require('express-validator');
const apiResponses = require('../Components/apiresponse');
const {query} = require('express-validator/check');

const signUpValidator = [
	body('firstname').isLength({min: 1})
		.trim().withMessage('First name must be specified.'),
	body('username').isLength({min: 1})
		.trim().withMessage('username must be specified.'),
	body('lastname').isLength({min: 1})
		.trim().withMessage('Last name must be specified.')
		.isAlphanumeric().withMessage('Last name has non-alphanumeric.'),
	body('email').isLength({min: 1})
		.trim().withMessage('Email must be specified.')
		.isEmail().withMessage('Email must be a valid email address.'),
	sanitizeBody('firstname').escape(),
	sanitizeBody('lastname').escape(),
	sanitizeBody('email').escape(),
	sanitizeBody('username').escape(),
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

const signInValidate = [
	body('username').isLength({min: 1})
		.trim().withMessage('username must be specified.'),
	body('password').isLength({min: 1})
		.trim().withMessage('password must be specified.'),
	sanitizeBody('username').escape(),
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


const userProfile = [
	query('userId').isLength({min: 1})
		.trim().withMessage('userId must be specified.'),
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

const adminUserValidator = {
	signUpValidator: signUpValidator,
	signInValidate: signInValidate,
	userProfile: userProfile,
};

module.exports = adminUserValidator;
