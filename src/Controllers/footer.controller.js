const db = require('../models');
const Footer = db.footer;
const apiResponses = require('../Components/apiresponse');
const { footer } = require('../models/footer.model');

module.exports.addFooter = async (req, res) => {
	try {
		Footer.create({
            header: req.body.header,
            description: req.body.description,
            social: req.body.social,
			titleOne: req.body.titleOne,
            titleOneDescription: req.body.titleOneDescription,
			titleTwo: req.body.titleTwo,
            titleTwoDescription: req.body.titleTwoDescription,
			copy_right: req.body.copy_right,
		}).then((footer) => {
			return apiResponses.successResponseWithData(res, 'success!', footer);
		});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.getFooters = (req, res) => {
	Footer.findAll({order: [['createdAt', 'DESC']]})
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

module.exports.getFooter = (req, res) => {
	Footer.findOne({
		where: {id: req.params.id},
	})
		.then((data) => {
			return apiResponses.successResponseWithData(res, 'success', data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving footer data',
			});
		});
};
