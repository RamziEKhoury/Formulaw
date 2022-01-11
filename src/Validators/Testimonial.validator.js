const { body, sanitizeBody, validationResult } = require("express-validator");
const apiResponses = require("../Components/apiresponse");

const addTestimonial = [
  body("testimonialdata")
    .isLength({ min: 1 })
    .trim()
    .withMessage("testimonialdata must be specified."),
  body("rating")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Rating must be specified."),
  body("userId")
    .isLength({ min: 1 })
    .trim()
    .withMessage("user id must be specified."),
  body("lawFirmId")
    .isLength({ min: 1 })
    .trim()
    .withMessage("lawFirm id must be specified."),
  body("orderId")
    .isLength({ min: 1 })
    .trim()
    .withMessage("orderId must be specified."),
  // body("lawyerid")
  //   .isLength({ min: 1 })
  //   .trim()
  //   .withMessage("lawyerid must be specified."),
  body("appointmentid")
    .isLength({ min: 1 })
    .trim()
    .withMessage("appointmentid must be specified."),

  sanitizeBody("testimonialdata").escape(),
  sanitizeBody("rating").escape(),
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

const updateTestimonial = [
  body("testimonialdata")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Teatimonial must be specified."),

  sanitizeBody("testimonialdata").escape(),
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

const TestimonialValidator = {
  addTestimonial: addTestimonial,
  updateTestimonial: updateTestimonial,
};

module.exports = TestimonialValidator;
