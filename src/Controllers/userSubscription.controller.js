const db = require('../models');
const UserSubscription = db.userSubscription;
const User = db.user;
const Admin = db.adminUser;
const apiResponses = require('../Components/apiresponse');
const _ = require('lodash');
const Op = db.Sequelize.Op;
const Mail = require('../Config/Mails');

module.exports.addUserSubscription = async (req, res) => {
	try {
		const todayDay = new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString();
		const endOfThirtyDays = new Date(new Date().setUTCHours(719, 59, 59, 999)).toISOString();
		const isSubscription = await UserSubscription.findAll({
			where: {
				userId: req.body.userId,
				startingDate: {
					[Op.between]: [todayDay, endOfThirtyDays],
				},
			},
		});

		if (_.isEmpty(isSubscription)) {
			UserSubscription.create({
				userId: req.body.userId,
				subscriptionId: req.body.subscriptionId,
				durationType: req.body.durationType,
				subscriptionPlan: req.body.subscriptionPlan,
				checkSubscription: req.body.checkSubscription,
				startingDate: req.body.startingDate,
				endDate: req.body.endDate,
				numberOfMeeting: req.body.numberOfMeeting,
				ipAudit: req.body.ipAudit,
				meetingPlan: req.body.meetingPlan,
				contractTemplates: req.body.contractTemplates,
				contract_templates: req.body.contract_templates,
				discount: req.body.discount,
			}).then(async(userSubscription) => {
				if (userSubscription) {
					User.update({
						isSubscribed: 1,
						subscriptionEndAt: req.body.endDate,
					}, {where: {id: req.body.userId}})
						.then((user) => {
							if (!user) {
								return apiResponses.notFoundResponse(
									res, 'Not found.', {});
							}
						});
				}



				return apiResponses.successResponseWithData(
					res, 'success!', userSubscription);
			},
			);
		} else {
			return apiResponses.unauthorizedResponse(
				res, 'Subscription already available!');
		}
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.updateUserSubscription = async (req, res) => {
	try {
		await UserSubscription.update({
			durationType: req.body.durationType,
			subscriptionPlan: req.body.subscriptionPlan,
			checkSubscription: req.body.checkSubscription,
			startingDate: req.body.startingDate,
			endDate: req.body.endDate,
			numberOfMeeting: req.body.numberOfMeeting,
			ipAudit: req.body.ipAudit,
			meetingPlan: req.body.meetingPlan,
			contractTemplates: req.body.contractTemplates,
			contract_templates: req.body.contract_templates,
			discount: req.body.discount,
		}, {where: {userId: req.body.userId}})
			.then((userSubscription) => {
				if (!userSubscription) {
					return apiResponses.notFoundResponse(
						res, 'Not found.', {},
					);
				}
				return apiResponses.successResponseWithData(
					res, 'Success', userSubscription,
				);
			},
			);
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};


module.exports.getUserSubscription = (req, res) => {
	UserSubscription.findOne({
		include: [
			{model: User, required: false,
				attributes: ['fullname', 'email', 'isSubscribed'],
			},
		],
		where: {userId: req.params.userId},
	})
		.then((data) => {
			return apiResponses.successResponseWithData(res, 'success', data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message ||
					'Some error occurred while retrieving.',
			});
		});
};

module.exports.getAllUsersSubscription = (req, res) => {
	const limit = req.params.limit;
	UserSubscription.findAll({
		include: [
			{model: User, required: false,
				attributes: ['fullname', 'email', 'isSubscribed'],
			},
		],
	}, {limit: limit})
		.then((data) => {
			return apiResponses.successResponseWithData(res, 'success', data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message ||
					'Some error occurred while retrieving.',
			});
		});
};

module.exports.checkSubscription = (req, res) => {
	UserSubscription.findOne({
		where: {userId: req.params.userId},
	})
		.then((data) => {
			if (data) {
				return apiResponses.successResponseWithData(
					res, 'success', true);
			}
			return apiResponses.successResponseWithData(res, 'success', false);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message ||
					'Some error occurred while retrieving.',
			});
		});
};

