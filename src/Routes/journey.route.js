const journeyController = require('../Controllers/journey.controller');

const JourneyValidator = require('../Validators/journey.validator');

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept',
		);
		next();
	});

	app.post(
		'/api/v1/journey/add-journey',
		[JourneyValidator.addJourneyValidator],
		journeyController.addJourney,
	);
    app.post(
		'/api/v1/journey/update-journey',
		[JourneyValidator.updateJourneyValidator],
		journeyController.updateJourney,
	);
	app.get('/api/v1/journey/get-Journeys', journeyController.getJourneys);
	app.get('/api/v1/journey/get-journey/:id', journeyController.getJourney);
    app.delete('/api/v1/journey/delete-journey/:id', journeyController.deleteJourney);
};
