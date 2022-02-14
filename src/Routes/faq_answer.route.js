const faqAnswerController = require('../Controllers/faq_answers.controller');
const faqAnswerValidator = require('../Validators/faq_answers.validator');


module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept',
		);
		next();
	});

	app.post(
		'/api/v1/faq_answer/add-faq_answer',
		[faqAnswerValidator.addFaqAnswerValidator],
		faqAnswerController.addFaqAnswer,
	);

	app.post(
		'/api/v1/faq_answer/update-faq_answer',
		[faqAnswerValidator.updateFaqAnswerValidator],
		faqAnswerController.updateFaqAnswer,
	);

	app.get(
		'/api/v1/faq_answer/get-faq_answers/:limit',
		faqAnswerController.getFaqAnswers);

	app.get(
		'/api/v1/faq_answer/get-faq_answer/:id',
		faqAnswerController.getFaqAnswer);
		
	app.get(
		'/api/v1/faq_answer/get-faq_answerbyheading/:faqHeadingId',
		faqAnswerController.getFaqAnswersByHeading);

	app.delete(
		'/api/v1/faq_answer/delete-faq_answer/:id',
		faqAnswerController.deleteFaqAnswer);
};
