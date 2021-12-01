const db = require('../models');
const UserSubscription = db.userSubscription;
const User = db.user;
const apiResponses = require('../Components/apiresponse');

module.exports.addUserSubscription = async (req, res) => {
	try {
		UserSubscription.create({
			userId: req.body.userId,
			subscriptionId: req.body.subscriptionId,
			durationType: req.body.durationType,
			subscriptionPlan: req.body.subscriptionPlan,
			checkSubscription: req.body.checkSubscription,
			startingDate: req.body.startingDate,
			endDate: req.body.endDate,
			numberOfMeating:req.body.numberOfMeating,
			ipAudit:req.body.ipAudit,
			meatingPlan:req.body.meatingPlan,
			contractTemplates:req.body.contractTemplates,
			discount:req.body.discount,
		}).then((userSubscription) => {
			if(userSubscription){
				 User.update({
					isSubscribed:1
				},{where:{id:req.body.userId}})
				.then((user)=>{
					if (!user) {
						return apiResponses.notFoundResponse(res, 'Not found.', {});
					  }
				})
			}
			return apiResponses.successResponseWithData(res,'success!',userSubscription);
		},
		);
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
}

module.exports.updateUserSubscription = async (req, res) => {
	try {
		await UserSubscription.update({
			durationType: req.body.durationType,
			subscriptionPlan: req.body.subscriptionPlan,
			checkSubscription: req.body.checkSubscription,
			startingDate: req.body.startingDate,
			endDate: req.body.endDate,
			numberOfMeating:req.body.numberOfMeating,
			ipAudit:req.body.ipAudit,
			meatingPlan:req.body.meatingPlan,
			contractTemplates:req.body.contractTemplates,
			discount:req.body.discount,
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
}


module.exports.getUserSubscription = (req, res) => {
	UserSubscription.findOne({
		include: [
			{model: User, required: false, attributes: ['fullname', 'email','isSubscribed']},
		],
		where: {userId: req.params.userId},
	})
		.then((data) => {
			
			return apiResponses.successResponseWithData(res, 'success', data);
		})
		.catch((err) => {
			
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving User Subscription Plan.',
			});
		});
};

module.exports.getAllUsersSubscription = (req, res) => {
	const limit = req.params.limit;
	UserSubscription.findAll({
		include: [
			{model: User, required: false, attributes: ['fullname', 'email','isSubscribed']},
		],
	},{limit: limit})
		.then((data) => {
			
			return apiResponses.successResponseWithData(res, 'success', data);
		})
		.catch((err) => {
			
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving Users Subscription Plans.',
			});
		});
};

module.exports.checkSubscription = (req, res) => {
	UserSubscription.findOne({
		where: {userId: req.params.userId},
	})
		.then((data) => {
            if(data){
                return apiResponses.successResponseWithData(res, 'success', true);
            }
			return apiResponses.successResponseWithData(res, 'success', false);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving User Subscription Plan.',
			});
		});
};

