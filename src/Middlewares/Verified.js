const db = require('../models');
const User = db.user;


module.exports = {
	checkDuplicateUsernameOrEmail: (req, res, next) => {
		User.findOne({
			where: {
				username: req.body.username,
			},
		}).then((user) => {
			if (user) {
				res.status(400).send({
					message: 'Failed! Username is already in use!',
				});
				return;
			}
			User.findOne({
				where: {
					email: req.body.email,
				},
			}).then((user) => {
				if (user) {
					res.status(400).send({
						message: 'Failed! Email is already in use!',
					});
					return;
				}

				next();
			});
		});
	},

	validateUsername: (req, res, next) => {
		User.findOne({
			where: {
				username: req.body.username,
			},
		}).then((user) => {
			if (!user) {
				res.status(400).send({
					message: 'Failed! Email does not exists!',
				});
				return;
			}
			next();
		});
	},
};
