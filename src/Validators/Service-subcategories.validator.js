const { body, sanitizeBody, validationResult } = require("express-validator");
const apiResponses = require("../Components/apiresponse");

const addServiceSubcategoryValidator = [
  body("en_name")
    .isLength({ min: 1 })
    .trim()
    .withMessage("en_name must be specified."),
  body("serviceId")
    .isLength({ min: 1 })
    .trim()
    .withMessage("serviceId must be specified."),
  body("ar_name")
    .isLength({ min: 1 })
    .trim()
    .withMessage("ar_name must be specified."),
  body("description")
    .isLength({ min: 1 })
    .trim()
    .withMessage("description must be specified."),

  body("isActive")
    .isLength({ min: 1 })
    .trim()
    .withMessage("isActive must be specified."),
  sanitizeBody("isActive").escape(),
  sanitizeBody("serviceId").escape(),
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

const updateServiceSubcategoryValidator = [
  body("id")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Country id must be specified."),
  body("en_name")
    .isLength({ min: 1 })
    .trim()
    .withMessage("en_name must be specified."),
  body("serviceId")
    .isLength({ min: 1 })
    .trim()
    .withMessage("serviceId must be specified."),
  body("ar_name")
    .isLength({ min: 1 })
    .trim()
    .withMessage("ar_name must be specified."),
  body("description")
    .isLength({ min: 1 })
    .trim()
    .withMessage("description must be specified."),
  body("isActive")
    .isLength({ min: 1 })
    .trim()
    .withMessage("isActive must be specified."),
  sanitizeBody("isActive").escape(),
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

const serviceSubcategoryValidator = {
  addServiceSubcategoryValidator: addServiceSubcategoryValidator,
  updateServiceSubcategoryValidator: updateServiceSubcategoryValidator,
};

module.exports = serviceSubcategoryValidator;
