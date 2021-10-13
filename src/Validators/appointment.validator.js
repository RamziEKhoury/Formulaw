const {body, sanitizeBody, validationResult} = require('express-validator');
const apiResponses = require('../Components/apiresponse');

const addAppointmentValidator = [
	body('queryId')
		.isLength({min: 1})
		.trim()
		.withMessage('queryId must be specified.'),
	body('adminId')
		.isLength({min: 1})
		.trim()
		.withMessage('adminId must be specified.'),
	body('customerId')
		.isLength({min: 1})
		.trim()
		.withMessage('customerId must be specified.'),
	body('shifts')
		.isLength({min: 1})
		.trim()
		.withMessage('shifts must be specified.'),
    body('date')
		.isLength({min: 1})
		.trim()
		.withMessage('date must be specified.'),
    body('time')
		.isLength({min: 1})
		.trim()
		.withMessage('time must be specified.'),

	sanitizeBody('queryId').escape(),
    sanitizeBody('adminId').escape(),
    sanitizeBody('customerId').escape(),
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



const appointmentValidator = {
	addAppointmentValidator: addAppointmentValidator,
	
};

module.exports = appointmentValidator;
