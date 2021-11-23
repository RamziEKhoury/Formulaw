const client = require('twilio')(
	process.env.ACCOUNT_SID,
	process.env.AUTH_TOKEN,
);

module.exports.getCode = async (req, res) => {
	try {
		client.verify
			.services(process.env.VERIFY_SERVICE_SID)
			.verifications.create({
				to: `+${req.query.PhnNumber}`,
				channel: req.query.channel,
			})
			.then((data) => {
				res.status(200).send(data);
			});
	} catch (error) {
		res.status(500).send(error);
	}
};

module.exports.verifyCode = async (req, res) => {
	try {
		client.verify
			.services(process.env.VERIFY_SERVICE_SID)
			.verificationChecks.create({
				to: `+${req.query.PhnNumber}`,
				code: req.query.code,
			})
			.then((data) => {
				res.status(200).send(data);
			});
	} catch (error) {
		res.status(500).send(error);
	}
};
