const faqHeadingController = require('../Controllers/faq_heading.controller');

const FaqHeadingValidator = require('../Validators/faq_heading.validator');


module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept',
		);
		next();
	});

	app.post(
		'/api/v1/faq_heading/add-faq_heading',
		[FaqHeadingValidator.addFaqHeadingValidator],
		faqHeadingController.addFaqHeading,
	);

	app.post(
		'/api/v1/faq_heading/update-faq_heading',
		[FaqHeadingValidator.updateFaqHeadingValidator],
		faqHeadingController.updateFaqHeading,
	);

	app.get(
		'/api/v1/faq_heading/get-faq_headings/:limit',
		faqHeadingController.getFaqHeadings);

	app.get(
		'/api/v1/faq_heading/get-faq_heading/:id',
		faqHeadingController.getFaqHeading);
	
	app.get(
		'/api/v1/faq_heading/get-allfaqs',
		faqHeadingController.getAllFaqs);

	app.delete(
		'/api/v1/faq_heading/delete-faq_heading/:id',
		faqHeadingController.deleteFaqHeading);
};
