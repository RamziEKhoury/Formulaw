const { body, sanitizeBody, validationResult } = require('express-validator');
const apiResponses = require('../Components/apiresponse');

const addLawFirmValidator = [
  body('en_name')
    .isLength({ min: 1 })
    .trim()
    .withMessage('en_name must be specified.'),
  body('ar_name')
    .isLength({ min: 1 })
    .trim()
    .withMessage('ar_name must be specified.'),
  //   body('username')
  //     .isLength({ min: 1 })
  //     .trim()
  //     .withMessage('username must be specified.'),
  body('licenseNumber')
    .isLength({ min: 1 })
    .trim()
    .withMessage('licenseNumber must be specified.'),

  body('country')
    .isLength({ min: 1 })
    .trim()
    .withMessage('country must be specified.'),

  body('experience')
    .isLength({ min: 1 })
    .trim()
    .withMessage('experience must be specified.'),

  body('numOfLawyer')
    .isLength({ min: 1 })
    .trim()
    .withMessage('numOfLawyer must be specified.'),

  body('jurisdiction')
    .isLength({ min: 1 })
    .trim()
    .withMessage('jurisdiction must be specified.'),

  body('language')
    .isLength({ min: 1 })
    .trim()
    .withMessage('language must be specified.'),

  body('price')
    .isLength({ min: 1 })
    .trim()
    .withMessage('price must be specified.'),

  body('isActive')
    .isLength({ min: 1 })
    .trim()
    .withMessage('isActive must be specified.'),

  sanitizeBody('en_name').escape(),
  sanitizeBody('ar_name').escape(),
  //   sanitizeBody('username').escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return apiResponses.validationErrorWithData(
        res,
        'Validation Error.',
        errors.array()
      );
    } else {
      next();
    }
  },
];

const updateLawFirmValidator = [
  body('id')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Lawfirm id must be specified.'),

  body('en_name')
    .isLength({ min: 1 })
    .trim()
    .withMessage('en_name must be specified.'),

  body('ar_name')
    .isLength({ min: 1 })
    .trim()
    .withMessage('ar_name must be specified.'),

  body('licenseNumber')
    .isLength({ min: 1 })
    .trim()
    .withMessage('licenseNumber must be specified.'),

  body('country')
    .isLength({ min: 1 })
    .trim()
    .withMessage('country must be specified.'),

  body('experience')
    .isLength({ min: 1 })
    .trim()
    .withMessage('experience must be specified.'),

  body('language')
    .isLength({ min: 1 })
    .trim()
    .withMessage('language must be specified.'),

  body('price')
    .isLength({ min: 1 })
    .trim()
    .withMessage('price must be specified.'),

  body('numOfLawyer')
    .isLength({ min: 1 })
    .trim()
    .withMessage('numOfLawyer must be specified.'),

  body('jurisdiction')
    .isLength({ min: 1 })
    .trim()
    .withMessage('jurisdiction must be specified.'),

  body('isActive')
    .isLength({ min: 1 })
    .trim()
    .withMessage('isActive must be specified.'),

  sanitizeBody('en_name').escape(),
  sanitizeBody('ar_name').escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return apiResponses.validationErrorWithData(
        res,
        'Validation Error.',
        errors.array()
      );
    } else {
      next();
    }
  },
];

const lawFirmValidator = {
  addLawFirmValidator: addLawFirmValidator,
  updateLawFirmValidator: updateLawFirmValidator,
};

module.exports = lawFirmValidator;
