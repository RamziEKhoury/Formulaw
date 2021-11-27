const { body, sanitizeBody, validationResult } = require('express-validator');
const apiResponses = require('../Components/apiresponse');

const addNotificationValidator = [
  body('title')
    .isLength({ min: 1 })
    .trim()
    .withMessage('title must be specified.'),
  body('message')
    .isLength({ min: 1 })
    .trim()
    .withMessage('message must be specified.'),
  body('senderName')
    .isLength({ min: 1 })
    .trim()
    .withMessage('senderName must be specified.'),
  body('senderId')
    .isLength({ min: 1 })
    .trim()
    .withMessage('senderId must be specified.'),
  body('receiverid')
    .isLength({ min: 1 })
    .trim()
    .withMessage('receiverid must be specified.'),

  sanitizeBody('message').escape(),

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

const updateNotificationValidator = [
  body('id').isLength({ min: 1 }).trim().withMessage('id must be specified.'),
  body('title')
    .isLength({ min: 1 })
    .trim()
    .withMessage('title must be specified.'),
  body('message')
    .isLength({ min: 1 })
    .trim()
    .withMessage('message must be specified.'),
  body('senderName')
    .isLength({ min: 1 })
    .trim()
    .withMessage('senderName must be specified.'),
  body('senderId')
    .isLength({ min: 1 })
    .trim()
    .withMessage('senderId must be specified.'),
  body('receiverid')
    .isLength({ min: 1 })
    .trim()
    .withMessage('receiverid must be specified.'),

  sanitizeBody('message').escape(),
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

const notificationValidator = {
  addNotificationValidator: addNotificationValidator,
  updateNotificationValidator: updateNotificationValidator,
};

module.exports = notificationValidator;
