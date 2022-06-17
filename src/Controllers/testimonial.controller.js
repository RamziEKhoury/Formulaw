const db = require('../models');
const Testimonial = db.testimonial;
const LawFirm = db.lawFirm;
const User = db.user;
const apiResponses = require('../Components/apiresponse');

module.exports.addtestimonial = async (req, res) => {
	try {
		Testimonial.create({
			id: req.body.id,
			userId: req.body.userId,
			orderId: req.body.orderId,
			lawFirmId: req.body.lawFirmId,
			lawyerid: req.body.lawyerid,
			appointmentid: req.body.appointmentid,
			testimonialdata: req.body.testimonialdata,
			rating: req.body.rating,
		}).then(async (testimonial) => {
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
			{model: User, required: false, attributes: ['firstname', 'lastname', 'email', 'profilePic']},
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
		where: {
			status: 'APPROVED',
		},
		include: [
			{model: User, required: false, attributes: ['firstname', 'lastname', 'email', 'profilePic']},
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
				testimonialdata: req.body.testimonialdata,
				rating: req.body.rating,
				ratingstatus: 'PENDING',
			},
			{where: {id: req.params.id}},
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
			.then(async (testimonial) => {
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

module.exports.ApprovedUserRating = async (req, res) => {
	try {
		await Testimonial.update(
			{
				ratingstatus: req.params.status,
			},
			{where: {id: req.params.id}},
		)
			.then(async (testimonial) => {
				if (!testimonial) {
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}
				const testimonialData = await Testimonial.findOne({where: {id: req.params.id}});
				const testimonials = await Testimonial.count({where: {lawFirmId: testimonialData.lawFirmId}});
				const lawFirm = await LawFirm.findOne({where: {id: testimonialData.lawFirmId}});
				const totalRate = ((lawFirm.userrating + (testimonialData.rating/20))/2).toFixed(1);
				let rating = lawFirm.rating;
				if (totalRate < 3.7) {
					rating = 'avarage';
				}
				if (totalRate > 3.7 && totalRate <= 4.5) {
					rating = 'good';
				}
				if (totalRate > 4.5) {
					rating = 'excellent';
				}
				await LawFirm.update({userrating: ((lawFirm.userrating + (testimonialData.rating/20))/2).toFixed(1), rating: rating}, {where: {id: testimonialData.lawFirmId}});

				return apiResponses.successResponseWithData(res, 'Success', testimonial);
			})
			.catch((err) => {
				return apiResponses.errorResponse(res, err.message, {});
			});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};
