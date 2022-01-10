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
		}).then(async(subscribeUser) => {
			if(subscribeUser){
				 User.update({
					isSubscribed:1
				},{where:{id:req.body.userId}})
				.then((user)=>{
					if (!user) {
						return apiResponses.notFoundResponse(res, 'Unable to Subscribe.', {});
					  }
				})
			}
			return apiResponses.successResponseWithData(res,'Subscribed successfully!',subscribeUser);
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
		}, {where: {id: req.body.id}})
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
		},
	})
		.then((subscribeUser) => {
			if (!subscribeUser) {
				return apiResponses.notFoundResponse(res, 'Data Not found.', null);
			}

			return apiResponses.successResponseWithData(
				res,
				'successfully found!',
				subscribeUser,
			);
		})
		.catch((err) => {
			return apiResponses.errorResponse(res, err.message, err);
		});
};


module.exports.getallsubscribeUsers = (req, res) => {
	SubscribeUser.findAll({
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
		await SubscribeUser.destroy({where: {id: req.params.id}})
			.then((subscribeUser) => {
				if (!subscribeUser) {
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}

				return apiResponses.successResponseWithData(
					res,
					'Success',
					subscribeUser,
				);
			})
			.catch((err) => {});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};