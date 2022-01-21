const db = require('../models');
const Charge = db.charge;
const Customer = db.customer;
const Request = db.request;
const Appointment = db.appointment;
const apiResponses = require('../Components/apiresponse');
const Op = db.Sequelize.Op;

module.exports.addCharge = async (req, res) => {
	try {
		Charge.create({
			appointmentId: req.body.appointmentId,
			customerid: req.body.customerid,
			queryId: req.body.queryId,
			customer: req.body.customer,
			chargeId: req.body.id,
			object: req.body.object,
			amount: req.body.amount,
			amount_captured: req.body.amount_captured,
			amount_refunded: req.body.amount_refunded,
			application: req.body.application,
			application_fee: req.body.application_fee,
			application_fee_amount: req.body.application_fee_amount,
			balance_transaction: req.body.balance_transaction,
			billing_details: req.body.billing_details,
			calculated_statement_descriptor: req.body.calculated_statement_descriptor,
			captured: req.body.captured,
			currency: req.body.currency,
			description: req.body.description,
			destination: req.body.destination,
			dispute: req.body.dispute,
			disputed: req.body.disputed,
			failure_code: req.body.failure_code,
			failure_message: req.body.failure_message,
			fraud_details: req.body.fraud_details,
			invoice: req.body.invoice,
			livemode: req.body.livemode,
			metadata: req.body.metadata,
			on_behalf_of: req.body.on_behalf_of,
			order: req.body.order,
			outcome: req.body.outcome,
			paid: req.body.paid,
			payment_intent: req.body.payment_intent,
			payment_method: req.body.payment_method,
			payment_method_details: req.body.payment_method_details,
			receipt_email: req.body.receipt_email,
			receipt_number: req.body.receipt_number,
			receipt_url: req.body.receipt_url,
			refunded: req.body.refunded,
			refunds: req.body.refunds,
			review: req.body.review,
			shipping: req.body.shipping,
			source: req.body.source,
			source_transfer: req.body.source_transfer,
			statement_descriptor: req.body.statement_descriptor,
			statement_descriptor_suffix: req.body.statement_descriptor_suffix,
			status: req.body.status,
			transfer_data: req.body.transfer_data,
			transfer_group: req.body.transfer_group,
		}).then((charge) => {
			return apiResponses.successResponseWithData(
				res,
				'success!',
				charge,
			);
		});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};
module.exports.getCharges = (req, res) => {
	const limit = req.params.limit || 1000;
	Charge.findAll({
		include: [
			{
				model: Customer,
				required: false,
			},
			{
				model: Request,
				required: false,
			}],
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
				message: 'Something Went Wrong', err,
			});
		});
};

module.exports.getCharge = (req, res) => {
	Charge.findOne({
		include: [
			{
				model: Customer,
				required: false,
			},
			{
				model: Request,
				required: false,
			}],
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

module.exports.getUserAllCharges = (req, res) => {
	const limit = req.params.limit;
	Charge.findAll({
		where: {customer_id: req.params.customerid},
		include: [
			{
				model: Customer,
				required: false,
			},
			{
				model: Request,
				required: false,
			},
			{
				model: Appointment,
				required: false,
			},
		],
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
