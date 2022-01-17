const { body, sanitizeBody, validationResult ,param} = require("express-validator");
const apiResponses = require("../Components/apiresponse");

const addDispute = [
  body("userId")
    .isLength({ min: 1 })
    .trim()
    .withMessage("user id must be specified."),
  body("orderId")
    .isLength({ min: 1 })
    .trim()
    .withMessage("orderId must be specified."),
  body("dispute")
    .isLength({ min: 1 })
    .trim()
    .withMessage("dispute must be specified."),

  sanitizeBody("orderId").escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return apiResponses.validationErrorWithData(
        res,
        "Validation Error.",
        errors.array()
      );
    } else {
      next();
    }
  },
];
const updateDisputeStatusValidator = [
	param('id')
		.isLength({min: 10})
		.trim()
		.withMessage('id must be valid.'),
	param('status')
		.isLength({min: 3})
		.trim()
		.withMessage('status value is not valid.'),

	sanitizeBody('lawFirmId').escape(),
	sanitizeBody('workflow').escape(),
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


const DisputeValidator = {
    addDispute: addDispute,
    updateDisputeStatusValidator:updateDisputeStatusValidator
};

module.exports = DisputeValidator;
