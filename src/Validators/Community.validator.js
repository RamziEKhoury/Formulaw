const { body, sanitizeBody, validationResult } = require("express-validator");
const apiResponses = require("../Components/apiresponse");

const addCommunity = [
  body("titleOne")
    .isLength({ min: 1 })
    .trim()
    .withMessage("First Title must be specified."),
  body("titleTwo")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Second Title must be specified."),
  body("description")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Description must be specified."),
  sanitizeBody("titleOne").escape(),
  sanitizeBody("titleTwo").escape(),
  sanitizeBody("description").escape(),
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
const updateCommunity = [
  body("titleOne")
    .isLength({ min: 1 })
    .trim()
    .withMessage("First Title must be specified."),
  body("titleTwo")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Second Title must be specified."),
  body("description")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Description must be specified."),

  sanitizeBody("titleOne").escape(),
  sanitizeBody("titleTwo").escape(),
  sanitizeBody("description").escape(),
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
const addCommunity_type = [
  body("title")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Title must be specified."),
  body("instruction")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Instruction must be specified."),

  sanitizeBody("title").escape(),
  sanitizeBody("instruction").escape(),
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

const updateCommunity_type = [
  body("title")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Title must be specified."),
  body("instruction")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Instruction must be specified."),

  sanitizeBody("title").escape(),
  sanitizeBody("instruction").escape(),
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

const CommunityValidator = {
  addCommunity: addCommunity,
  updateCommunity: updateCommunity,
  addCommunity_type: addCommunity_type,
  updateCommunity_type: updateCommunity_type,
};

module.exports = CommunityValidator;
