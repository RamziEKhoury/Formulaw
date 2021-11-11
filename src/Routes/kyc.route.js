const kycController = require('../Controllers/kyc.controller');

const KycValidator = require('../Validators/kyc.validator');

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept',
		);
		next();
	});

	app.post(
		'/api/v1/kyc/add-kycDetails',
		[KycValidator.addKycDetailsValidator],
		kycController.addKycDetails,
	);

    app.post(
		'/api/v1/kyc/update-kycDetails',
		[KycValidator.updateKycDetailsValidator],
		kycController.updateKycDetails,
	);

    app.post(
		'/api/v1/kyc/update-kycStatus/:userId/:status',
		kycController.kycStatus,
	);

	app.get('/api/v1/kyc/get-oneUserKycDetails/:userId',
     kycController.getOneUserKycDetails
     );

	app.get('/api/v1/kyc/get-allUserKycDetails/:limit',
     kycController.getallUserKycDetails
     );

};
