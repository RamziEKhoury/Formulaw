const {body, sanitizeBody, validationResult} = require('express-validator');
const apiResponses = require('../Components/apiresponse');

const signUpValidator = [
	body('firstname').isLength({min: 1})
		.trim().withMessage('First name must be specified.'),
	body('email').isLength({min: 1})
		.trim().withMessage('Email must be specified.')
		.isEmail().withMessage('Email must be a valid email address.'),
	body('password').isLength({min: 1})
		.trim().withMessage('password must be specified.'),

	sanitizeBody('firstname').escape(),
	    sanitizeBody('email').escape(),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return apiResponses.validationErrorWithData(
				res, 'Please enter valid credentials', errors.array(),
			);
		} else {
			next();
		}
	}];
	const updateValidator = [
		body('firstname').isLength({min: 1})
			.trim().withMessage('First name must be specified.'),
		body('email').isLength({min: 1})
			.trim().withMessage('Email must be specified.')
			.isEmail().withMessage('Email must be a valid email address.'),
		body('phoneNumber').isLength({min: 1})
			.trim().withMessage('phoneNumber must be specified.'),
		body('country').isLength({min: 1})
			.trim().withMessage('country must be specified.'),
		body('city').isLength({min: 1})
			.trim().withMessage('city must be specified.'),
			
	
		sanitizeBody('firstname').escape(),
			sanitizeBody('email').escape(),
		(req, res, next) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponses.validationErrorWithData(
					res, 'Please enter valid credentials.', errors.array(),
				);
			} else {
				next();
			}
		}];

const logInValidator = [
	body('email').isLength({min: 1})
		.trim().withMessage('email must be specified.')
		.isEmail().withMessage('Email must be a valid email address.'),
	body('userType').isLength({min: 1})
		.trim().withMessage('userType must be specified.'),
	sanitizeBody('email').escape(),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return apiResponses.validationErrorWithData(
				res, 'Please enter valid credentials', errors.array(),
			);
		} else {
			next();
		}
	}];

const emailValidator = [
	body('email').isLength({min: 1})
		.trim().withMessage('email must be specified.')
		.isEmail().withMessage('Email must be a valid email address.'),

	sanitizeBody('email').escape(),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return apiResponses.validationErrorWithData(
				res, 'Please enter valid credentials.', errors.array(),
			);
		} else {
			next();
		}
	}];


const userValidator = {
	signUpValidator: signUpValidator,
	updateValidator: updateValidator,
	logInValidator: logInValidator,
	emailValidator: emailValidator,
};

module.exports = userValidator;
