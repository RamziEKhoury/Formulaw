const testimoinalController = require('../Controllers/testimonial.controller');
const TestimonialValidator = require('../Validators/Testimonial.validator');

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept',
		);
		next();
	});

	app.post(
		'/api/v1/testimonial/add-testimonial',
		[TestimonialValidator.addTestimonial],
		testimoinalController.addtestimonial,
	);
	app.post(
		'/api/v1/testimonial/status/:id/:status',
		testimoinalController.TestimonialStatus,
	);
	app.get(
		'/api/v1/testimonial/view-testimonials',
		testimoinalController.viewtestimonials,
	);
	app.get(
		'/api/v1/testimonial/view-testimonial/:id',
		testimoinalController.viewtestimonial,
	);

	app.get(
		'/api/v1/testimonial/getOneLawyer-testimonial/:lawyerid',
		testimoinalController.viewOneLawyertestimonials,
	);

	app.get(
		'/api/v1/testimonial/getOneLawfirm-testimonial/:lawFirmId',
		testimoinalController.viewOneLawfirmtestimonials,
	);

	app.put(
		'/api/v1/testimonial/update-testimonial/:id',
		[TestimonialValidator.updateTestimonial],
		testimoinalController.updatetestimonial,
	);
	app.delete(
		'/api/v1/testimonial/delete-testimonial/:id',
		testimoinalController.deletetestimonial,
	);
};
