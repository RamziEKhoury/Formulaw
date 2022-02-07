const db = require('../models');
const Journey = db.journey;
const apiResponses = require('../Components/apiresponse');

module.exports.addJourney = async (req, res) => {
	try {
		Journey.findAll({order: [['createdAt', 'DESC']]}).then((data) => {
			const jLength = data.length;
			if (jLength <= 2) {
				return Journey.create({
					title: req.body.title,
					description: req.body.description,
					sortNumber: req.body.sortNumber,
					icon: req.body.icon,
				}).then((journey) => {
					// console.log('journey--->', journey);

					// return res.status(200).send({ status:'200', message: "success!" , $data: lawfirmdata });
					return apiResponses.successResponseWithData(res, 'success!', journey);
				});
			}
			res.status(209).json('your can not add more than 3!');
		});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.updateJourney = async (req, res) => {
	try {
		await Journey.update(
			{
				title: req.body.title,
				description: req.body.description,
				sortNumber: req.body.sortNumber,
				icon: req.body.icon,
			},
			{where: {id: req.body.id}},
		)
			.then((journey) => {
				if (!journey) {
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}
				return apiResponses.successResponseWithData(res, 'Success', journey);
			})
			.catch((err) => {
				return apiResponses.errorResponse(res, err.message, {});
			});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.getJourneys = (req, res) => {
	Journey.findAll({order: [['createdAt', 'DESC']]})
		.then((data) => {
			return apiResponses.successResponseWithData(res, 'success', data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving data.',
			});
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Something Went Wrong',
			});
		});
};

module.exports.getJourney = (req, res) => {
	Journey.findOne({
		where: {id: req.params.id},
	})
		.then((data) => {
			return apiResponses.successResponseWithData(res, 'success', data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving data.',
			});
		});
};

module.exports.deleteJourney = async (req, res) => {
	// #swagger.tags = ['Country']
	try {
		await Journey.destroy({where: {id: req.params.id}})
			.then((journey) => {
				if (!journey) {
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}
				return apiResponses.successResponseWithData(res, 'Success', journey);
			})
			.catch((err) => {
				return apiResponses.errorResponse(res, err.message, {});
			});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};
