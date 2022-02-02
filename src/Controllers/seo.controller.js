const db = require('../models');
const Seo = db.seo;
const apiResponses = require('../Components/apiresponse');
const Op = db.Sequelize.Op;

module.exports.addSeo = async (req, res) => {
	try {
		Seo.create({
            pageTitle: req.body.pageTitle,
			title: req.body.title,
			description: req.body.description,
			canonicalUrl: req.body.canonicalUrl,
			keywords: req.body.keywords,
		}).then((seo) => {
			return apiResponses.successResponseWithData(res, 'success!', seo);
		});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.updateSeo = async (req, res) => {
	try {
		await Seo.update(
			{
                pageTitle: req.body.pageTitle,
                title: req.body.title,
                description: req.body.description,
                canonicalUrl: req.body.canonicalUrl,
                keywords: req.body.keywords,
			},
			{where: {id: req.body.id}},
		)
			.then((seo) => {
				if (!seo) {
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}
				return apiResponses.successResponseWithData(res, 'Success', seo);
			})
			.catch((err) => {
				return apiResponses.errorResponse(res, err.message, {});
			});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.getSeos = (req, res) => {
	Seo.findAll({
        where: {isDeleted: 0},
        order: [['createdAt', 'DESC']]})
		.then((data) => {
			return apiResponses.successResponseWithData(res, 'success', data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving data.',
			});
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Something Went Wrong',
			});
		});
};

module.exports.getSeo = (req, res) => {
	Seo.findOne({
		where: {id: req.params.id,isDeleted: 0},
	})
		.then((data) => {
			return apiResponses.successResponseWithData(res, 'success', data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving data.',
			});
		});
};

module.exports.getSeoByPageTitle = (req, res) => {
	Seo.findOne({
		where: {
            pageTitle: {[Op.iLike]: '%' + req.params.pageTitle + '%'},
            isDeleted: 0,
        },
	})
		.then((data) => {
			return apiResponses.successResponseWithData(res, 'success', data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving data.',
			});
		});
};

module.exports.deleteSeo = async (req, res) => {
	try {
		await Seo.update(
			{
				isDeleted: 1,
			},
			{where: {id: req.params.id}},
		)
			.then((blogCategory) => {
				if (!blogCategory) {
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}
				return apiResponses.successResponseWithData(res, 'Success', blogCategory);
			})
			.catch((err) => {
				return apiResponses.errorResponse(res, err.message, {});
			});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};
