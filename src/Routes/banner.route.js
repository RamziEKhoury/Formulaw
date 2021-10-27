const bannerController = require('../Controllers/banner.controller');

const BannerValidator = require('../Validators/banner.validator');

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept',
		);
		next();
	});

	app.post(
		'/api/v1/banner/add-banner',
		[BannerValidator.addBannerValidator],
		bannerController.addBanner,
	);
	app.get('/api/v1/banner/get-banners/:limit', bannerController.getBanners);
	app.get('/api/v1/banner/get-banner/:id', bannerController.getBanner);

};