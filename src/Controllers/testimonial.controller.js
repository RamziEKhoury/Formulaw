const db = require('../models');
const Testimonial = db.testimonial;
const User = db.user;
const apiResponses = require('../Components/apiresponse');

module.exports.addtestimonial = async (req, res) => {
	try {
		console.log(req.body);
		Testimonial.create({
			id: req.body.id,
			userId: req.body.userId,
			orderId: req.body.orderId,
			lawFirmId: req.body.lawFirmId,
			lawyerid: req.body.lawyerid,
			appointmentid: req.body.appointmentid,
			testimonialdata: req.body.testimonialdata,
			rating: req.body.rating,
		}).then((testimonial) => {
			const testimonialData = {
				id: testimonial.id,
				userId: testimonial.userId,
				orderId: testimonial.orderId,
				lawFirmId: testimonial.lawFirmId,
				lawyerid: testimonial.lawyerid,
				appointmentid: testimonial.appointmentid,
				testimonialdata: testimonial.testimonialdata,
				rating: testimonial.rating,
			};
			return apiResponses.successResponseWithData(
				res,
				'Testimonial Created successfully!',
				testimonialData,
			);
		});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.viewtestimonials = (req, res) => {
	Testimonial.findAll({
		include: [
			{model: User, required: false, attributes: ['firstname', 'lastname', 'email','profilePic']},
		],
		order: [['createdAt', 'DESC']],
	})
		.then((testimonials) => {
			if (!testimonials) {
				return apiResponses.notFoundResponse(res, 'Data Not found.', null);
			}

			return apiResponses.successResponseWithData(
				res,
				'successfully found!',
				testimonials,
			);
		})
		.catch((err) => {
			return apiResponses.errorResponse(res, err.message, err);
		});
};
module.exports.getApprovedtestimonials = (req, res) => {
	Testimonial.findAll({
		where : {
			status: "APPROVED",
		},
		include: [
			{model: User, required: false, attributes: ['firstname', 'lastname', 'email','profilePic']},
		],
		order: [['createdAt', 'DESC']],
	})
		.then((testimonials) => {
			if (!testimonials) {
				return apiResponses.notFoundResponse(res, 'Data Not found.', null);
			}

			return apiResponses.successResponseWithData(
				res,
				'successfully found!',
				testimonials,
			);
		})
		.catch((err) => {
			return apiResponses.errorResponse(res, err.message, err);
		});
};

module.exports.viewtestimonial = (req, res) => {
	Testimonial.findOne({
		where: {
			id: req.params.id,
		},
	})
		.then((testimonial) => {
			if (!testimonial) {
				return apiResponses.notFoundResponse(res, 'Data Not found.', null);
			}

			return apiResponses.successResponseWithData(
				res,
				'successfully found!',
				testimonial,
			);
		})
		.catch((err) => {
			return apiResponses.errorResponse(res, err.message, err);
		});
};

module.exports.updatetestimonial = async (req, res) => {
	try {
		await Testimonial.update(
			{
				id: req.body.id,
				userId: req.body.userId,
				orderId: req.body.orderId,
				lawFirmId: req.body.lawFirmId,
				testimonialdata: req.body.testimonialdata,
				rating: req.body.rating,
			},
			{where: {id: req.body.id}},
		)
			.then((testimonial) => {
				if (!testimonial) {
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}

				return apiResponses.successResponseWithData(
					res,
					'Success',
					testimonial,
				);
			})
			.catch((err) => {
				return apiResponses.errorResponse(res, err.message, {});
			});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.deletetestimonial = async (req, res) => {
	try {
		await Testimonial.destroy({where: {id: req.params.id}})
			.then((testimonial) => {
				if (!testimonial) {
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}

				return apiResponses.successResponseWithData(
					res,
					'Success',
					testimonial,
				);
			})
			.catch((err) => {});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.viewOneLawyertestimonials = (req, res) => {
	Testimonial.findAll({
		where: {
			lawyerid: req.params.lawyerid,
		},
		order: [['createdAt', 'DESC']],
	})
		.then((testimonials) => {
			if (!testimonials) {
				return apiResponses.notFoundResponse(res, 'Data Not found.', null);
			}

			return apiResponses.successResponseWithData(
				res,
				'successfully found!',
				testimonials,
			);
		})
		.catch((err) => {
			return apiResponses.errorResponse(res, err.message, err);
		});
};

module.exports.viewOneLawfirmtestimonials = (req, res) => {
	Testimonial.findAll({
		where: {
			lawFirmId: req.params.lawFirmId,
		},
		order: [['createdAt', 'DESC']],
	})
		.then((testimonials) => {
			if (!testimonials) {
				return apiResponses.notFoundResponse(res, 'Data Not found.', null);
			}

			return apiResponses.successResponseWithData(
				res,
				'successfully found!',
				testimonials,
			);
		})
		.catch((err) => {
			return apiResponses.errorResponse(res, err.message, err);
		});
};

module.exports.TestimonialStatus = async (req, res) => {
	try {
		await Testimonial.update(
			{
				status: req.params.status,
			},
			{where: {id: req.params.id}},
		)
			.then((testimonial) => {
				if (!testimonial) {
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}
				return apiResponses.successResponseWithData(res, 'Success', testimonial);
			})
			.catch((err) => {
				return apiResponses.errorResponse(res, err.message, {});
			});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};