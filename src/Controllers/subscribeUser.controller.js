const db = require('../models');
const SubscribeUser = db.subscribeUser;
const User = db.user;
const apiResponses = require('../Components/apiresponse');
const Mail = require('../Config/Mails');
const Admin = db.adminUser;

module.exports.addsubscribeUser = async (req, res) => {
	try {
		SubscribeUser.create({
			userName: req.body.userName,  
            email: req.body.email,
		},
			{where:{id:req.body.userId}})
		.then(async(subscribeUser) => {
			if(subscribeUser){
				return apiResponses.successResponseWithData(res, 'Subscribed successfully!',subscribeUser
				);
			}
			return apiResponses.notFoundResponse(res,'Unable to Subscribe.', {},
			);
		},
		);
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
}

module.exports.updatesubscribeUser = async (req, res) => {
	try {
		await SubscribeUser.update({
			userName: req.body.userName,
            email: req.body.email,
		}, 
			{where: {id: req.body.id}})
           .then(async (subscribeUser) => {
            if (!subscribeUser) {
                return apiResponses.notFoundResponse(
                    res, 'User Not found.', {},
                );
            }
            return apiResponses.successResponseWithData(
                res, 'Successfully Updated Changes', subscribeUser,
            );
		},
		);
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
}

module.exports.getsubscribeUser = (req, res) => {
	SubscribeUser.findOne({
		where: {
			id: req.params.id,
			isDeleted: 0,
		},
	})
		.then((subscribeUser) => {
			if (!subscribeUser) {
				return apiResponses.notFoundResponse(res, 'Data Not found.', null);
			}

			return apiResponses.successResponseWithData(
				res,
				'USer found Successfully!',
				subscribeUser,
			);
		})
		.catch((err) => {
			return apiResponses.errorResponse(res, err.message, err);
		});
};


module.exports.getallsubscribeUsers = (req, res) => {
	SubscribeUser.findAll({
		where: {
			isDeleted: 0,
		},
		order: [['createdAt', 'ASC']],
	})
		.then((subscribeUser) => {
			if (!subscribeUser) {
				return apiResponses.notFoundResponse(res, 'Not Found.', null);
			}
			return apiResponses.successResponseWithData(
				res,
				'Successfully found Users!',
				subscribeUser,
			);
		})
		.catch((err) => {
			return apiResponses.errorResponse(res, err.message, err);
		});
};

module.exports.deletesubscribeUser = async (req, res) => {
	try {
		await SubscribeUser.update(
			{
				isDeleted: 1,
			},
			{where: {id: req.params.id}},
		)
			.then((subscribeUser) => {
				if (!subscribeUser) {
				return apiResponses.notFoundResponse(res, 'User Not found.', {});				
				}
				return apiResponses.successResponseWithData(res, 'Successfully deleated ', subscribeUser);
			})
			.catch((err) => {
				return apiResponses.errorResponse(res, err.message, {});
			});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

