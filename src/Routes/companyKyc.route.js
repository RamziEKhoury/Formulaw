const companyKycController = require('../Controllers/CompanyKyc.controller');

const CompanykycValidator = require('../Validators/CompanyKyc.validator');

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept',
		);
		next();
	});

	app.post(
		'/api/v1/Companykyc/add-CompanykycDetails',
		CompanykycValidator.addCompanyKycDetailsValidator,
		companyKycController.addCompanyKycDetails,
	);

    app.post(
		'/api/v1/Companykyc/update-CompanykycDetails',
		[CompanykycValidator.updateCompanyKycDetailsValidator],
		companyKycController.updateCompanyKycDetails,
	);

    app.post(
		'/api/v1/Companykyc/update-CompanykycStatus/:userId/:status',
		companyKycController.CompanykycStatus,
	);

	app.get('/api/v1/Companykyc/get-oneUserCompanykycDetails/:userId',
     companyKycController.getOneUserCompanyKycDetails
     );

	app.get('/api/v1/Companykyc/get-allUserCompanykycDetails/:limit',
    companyKycController.getallUserCompanyKycDetails
     );

};
