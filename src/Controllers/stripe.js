const db = require('../models');
const apiResponses = require('../Components/apiresponse');
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST);

module.exports.createCharge = (async (req, res) => {
	try {
		let customerIn = null;
		stripe.customers.create({
			email: req.body.email,
			source: req.body.id,
			name: req.body.card.name,
			address: {
				line1: req.body.card.address_line1,
				postal_code: req.body.card.address_zip,
				city: req.body.card.address_city,
				state: req.body.card.address_state,
				country: req.body.card.address_country,
			},
		})
			.then((customer) => {
				customerIn = customer;
				return stripe.charges.create({
					amount: parseInt(req.body.appointment.query.cost, 10) * 100, // Charing Rs 25
					description: req.body.appointment.query.getstarted,
					currency: 'AED',
					customer: customer.id,
				});
			})
			.then((charge) => {
				console.log('charge--->', charge);
				const data = {
					customerIn,
					charge,
				};
				return apiResponses.successResponseWithData(res, 'Success', data);
			})
			.catch( (e) => {
				return apiResponses.errorResponse(res, e.raw.message);
			});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
});
