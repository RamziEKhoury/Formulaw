const { body, sanitizeBody, validationResult } = require("express-validator");
const apiResponses = require("../Components/apiresponse");

const addTestimonial = [
  body("testimonialdata")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Testimonialdata must be specified."),
  body("rating")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Rating must be specified."),

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

const TestimonialValidator = {
  addTestimonial: addTestimonial,
};

module.exports = TestimonialValidator;
