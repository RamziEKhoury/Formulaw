const apiResponses = require('../Components/apiresponse');
const {videoToken} = require('../utils/TwilioToken');
const config = require('../Config/Twilio.config');


module.exports.getToken = async (req, res) => {
	try {
		const identity = req.query.identity;
		const room = req.query.room;
		const token = videoToken(identity, room, config);
		return apiResponses.successResponseWithData(
			res,
			'success!',
			token.toJwt(),
		);
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};


module.exports.createStreamToken = async (req, res) => {
	console.log('body-->', req.body);
	try {
		const identity = req.body.username;
		const room = req.body.room;
		const token = videoToken(identity, room, config);
		return apiResponses.successResponseWithData(
			res,
			'success!',
			token.toJwt(),
		);
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};
