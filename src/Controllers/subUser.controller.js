const db = require('../models');
const SubUser = db.subUser;
const User = db.user;
const apiResponses = require('../Components/apiresponse');

module.exports.addSubUser = async (req, res) => {
	try {
		SubUser.create({
			userId: req.body.userId,
			subscriptionId: req.body.subscriptionId,
			durationType: req.body.durationType,
			subscriptionPlan: req.body.subscriptionPlan,
			startingDate: req.body.startingDate,
			endDate: req.body.endDate,
			numberOfMeeting:req.body.numberOfMeeting,
			meetingPlan:req.body.meetingPlan,
		}).then((SubUser) => {
			if(SubUser){
				 User.update({
					isSubscribed:1
				},{where:{id:req.body.userId}})
				.then((user)=>{
					if (!user) {
						return apiResponses.notFoundResponse(res, 'Not found.', {});
					  }
				})
			}
			return apiResponses.successResponseWithData(res,'success!',SubUser);
		},
		);
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
}

module.exports.updateSubUser = async (req, res) => {
	try {
		await SubUser.update({
			durationType: req.body.durationType,
			subscriptionPlan: req.body.subscriptionPlan,
			startingDate: req.body.startingDate,
			endDate: req.body.endDate,
            numberOfMeeting:req.body.numberOfMeeting,
			meetingPlan:req.body.meetingPlan,
		}, {where: {userId: req.body.userId}})
           .then((SubUser) => {
            if (!SubUser) {
                return apiResponses.notFoundResponse(
                    res, 'Not found.', {},
                );
            }
            return apiResponses.successResponseWithData(
                res, 'Success', SubUser,
            );
		},
		);
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
}


module.exports.getSubUser = (req, res) => {
	SubUser.findOne({
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

module.exports.getAllSubUsers = (req, res) => {
	const limit = req.params.limit;
	SubUser.findAll({
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