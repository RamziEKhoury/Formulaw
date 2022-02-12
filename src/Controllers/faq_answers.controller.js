const db = require('../models');
const FaqAnswer = db.faq_answer;
const apiResponses = require('../Components/apiresponse');

module.exports.addFaqAnswer = async (req, res) => {
	try {
		FaqAnswer.create({
			faq_heading_id: req.body.faq_heading_id,
			question: req.body.question,
			answer: req.body.answer,
			images: req.body.images,
			isActive: req.body.isActive,
		}).then((FaqAnswer) => {
			// return res.status(200).send({ status:'200', message: "success!" , $data: lawfirmdata });
			return apiResponses.successResponseWithData(res, 'success!', FaqAnswer);
		});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.updateFaqAnswer = async (req, res) => {
	try {
		FaqAnswer.update(
			{
				faq_heading_id: req.body.faq_heading_id,
				question: req.body.question,
				answer: req.body.answer,
				images: req.body.images,
				isActive: req.body.isActive,
			},
			{where: {id: req.body.id}})
			.then((FaqAnswer) => {
				if (!FaqAnswer) {
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}
				return apiResponses.successResponseWithData(res, 'success!', FaqAnswer);
			});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.getFaqAnswers = (req, res) => {
	FaqAnswer.findAll({
		where: {
			isDeleted: 0,
			isActive: 1,
		},
		limit: req.params.limit,
		order: [['createdAt', 'DESC']]})
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

module.exports.getFaqAnswer = (req, res) => {
	FaqAnswer.findOne({
		where: {id: req.params.id,
			isDeleted: 0,
			isActive: 1,
		},
	})
		.then((data) => {
			return apiResponses.successResponseWithData(res, 'success', data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving faq_heading.',
			});
		});
};

module.exports.deleteFaqAnswer = async (req, res) => {
	try {
		await FaqAnswer.update(
			{isDeleted: 1},
			{where: {id: req.params.id},
			})
			.then((FaqAnswer) => {
				if (!FaqAnswer) {
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}
				return apiResponses.successResponseWithData(res, 'Success', FaqAnswer);
			})
			.catch((err) => {
				return apiResponses.errorResponse(res, err.message, {});
			});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};
