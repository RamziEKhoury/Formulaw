const {body, sanitizeBody, validationResult} = require('express-validator');
const apiResponses = require('../Components/apiresponse');


const RoleAddValidator = [
	body('title').isLength({min: 1})
		.trim().withMessage('title name must be specified.'),
	sanitizeBody('title').escape(),
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

const RoleUpdateValidator= [
	body('title').isLength({min: 1})
		.trim().withMessage('title must be specified.'),
	body('isDeleted').isLength({min: 1})
		.trim().withMessage('isDeleted must be specified.'),
	body('isActive').isLength({min: 1})
		.trim().withMessage('isActive must be specified.'),
	sanitizeBody('title').escape(),
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


const rolesValidator = {
	RoleAddValidator: RoleAddValidator,
	RoleUpdateValidator: RoleUpdateValidator,
};

module.exports = rolesValidator;
