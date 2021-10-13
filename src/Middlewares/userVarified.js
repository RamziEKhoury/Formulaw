const db = require('../models');
const apiResponses = require('../Components/apiresponse');
const User = db.user;


module.exports = {
	checkDuplicateEmail: (req, res, next) => {
		User.findOne({
			where: {
				email: req.body.email,
			},
		}).then((user) => {
			if (user) {
				return apiResponses.validationErrorWithData(
					res, 'Failed! email is already in use!',
					user,
				);
			}
			next();
		});
	},

	validateEmail: (req, res, next) => {
		User.findOne({
			where: {
				email: req.body.email,
			},
		}).then((user) => {
			if (!user) {
				return apiResponses.validationErrorWithData(
					res, 'Failed! Email does not exists!',
					user,
				);
			}
			next();
		});
	},
};
