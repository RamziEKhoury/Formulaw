const db = require('../models');
const FaqHeading = db.faq_heading;
const FaqAnswer = db.faq_answer;
const apiResponses = require('../Components/apiresponse');

module.exports.addFaqHeading = async (req, res) => {
	try {
		FaqHeading.create({
			title: req.body.title,
			description: req.body.description,
			images: req.body.images,
			isActive: req.body.isActive,
		}).then((faqHeading) => {
			// return res.status(200).send({ status:'200', message: "success!" , $data: lawfirmdata });
			return apiResponses.successResponseWithData(res, 'success!', faqHeading);
		});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.updateFaqHeading = async (req, res) => {
	try {
		FaqHeading.update(
			{
				title: req.body.title,
				description: req.body.description,
				images: req.body.images,
				isActive: req.body.isActive,
			},
			{where: {id: req.body.id}})
			.then((faqHeading) => {
				if (!faqHeading) {
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}
				return apiResponses.successResponseWithData(res, 'success!', faqHeading);
			});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.getFaqHeadings = (req, res) => {
	FaqHeading.findAll({
		where: {
			isDeleted: 0,
			isActive: 1,
		},
		include: [
			{model: FaqAnswer, required: false},
		],
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

module.exports.getFaqHeading = (req, res) => {
	FaqHeading.findOne({
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

module.exports.deleteFaqHeading = async (req, res) => {
	try {
		await FaqHeading.update(
			{isDeleted: 1},
		   {where: {id: req.params.id},
			})
			.then((faqHeading) => {
				if (!faqHeading) {
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}
				return apiResponses.successResponseWithData(res, 'Success', faqHeading);
			})
			.catch((err) => {
				return apiResponses.errorResponse(res, err.message, {});
			});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.getAllFaqs = (req, res) => {
	FaqHeading.findAll({
		where: {
			isDeleted: 0,
			isActive: 1,
		},
		include: [
			{model: FaqAnswer, required: false},
		],
		limit: req.params.limit,
		order: [['createdAt', 'DESC']]})
		.then(async(data) => {
			const faqs = [];
			for (let i = 0; i < data.length; i++) {
				const allFaqs = await FaqAnswer.findAll({
					where: {
						faq_heading_id: data[i].id,
					},
				});
				const obj = {
					faq_heading: data[i],
					allFaqs,
				};
				faqs.push(obj);
				
			}
			return apiResponses.successResponseWithData(res, 'success', faqs);
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
