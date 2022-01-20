const db = require('../models');
const Customer = db.customer;
const apiResponses = require('../Components/apiresponse');
const Op = db.Sequelize.Op;

module.exports.addCustomer = async (req, res) => {
	try {
		Customer.create({
			appointmentId: req.body.appointmentId,
			customerid: req.body.customerid,
			queryId: req.body.queryId,
			customerId: req.body.id,
			object: req.body.object,
			address: req.body.address,
			balance: req.body.balance,
			currency: req.body.currency,
			default_source: req.body.default_source,
			delinquent: req.body.delinquent,
			description: req.body.description,
			email: req.body.email,
			invoice_prefix: req.body.invoice_prefix,
			invoice_setting: req.body.invoice_setting,
			livemode: req.body.livemode,
			name: req.body.name,
			phone: req.body.phone,
			preferred_locales: req.body.preferred_locales,
			shipping: req.body.shipping,
			tax_exempt: req.body.tax_exempt,
		}).then((cutomer) => {
			return apiResponses.successResponseWithData(
				res,
				'success!',
				cutomer,
			);
		});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.getCustomers = (req, res) => {
	const limit = req.params.limit;
	Customer.findAll({
		limit: limit,
		order: [['createdAt', 'DESC']],
	})
		.then((result) => {
			// res.status(200).send({
			//   status: "200",
			//   user: result,
			// });
			return apiResponses.successResponseWithData(res, 'success', result);
		})
		.catch((err) => {
			/* #swagger.responses[500] = {
                    description: "Error message",
                    schema: { $statusCode: "500",  $status: false, $message: "Error Message", $data: {}}
                } */
			// return res.status(500).send({ message: err.message });
			res.status(500).send({
				message: 'Something Went Wrong',
			});
		});
};

module.exports.getCustomer = (req, res) => {
	// Get Country from Database
	// #swagger.tags = ['Country']
	Customer.findOne({
		where: {id: req.params.id},
	})
		.then((data) => {
			return apiResponses.successResponseWithData(res, 'success', data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving Country.',
			});
		});
};
