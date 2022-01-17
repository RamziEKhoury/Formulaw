const db = require('../models');
const apiResponses = require('../Components/apiresponse');
const stripe = require('stripe')('sk_test_51KGKjyIk4lgqI6LMspW5DrqW60FgrgXwwvP8FC6191MuUSHvUku6wtXK0tuP4N3w8vjo8SX5dPCe2WoHaLPXnptb00h4RQIXsT');

module.exports.createCharge = async (req, res) => {
	try {
		let customerIn = null;
		stripe.customers.create({
			email: req.body.stripeEmail,
			source: req.body.stripeToken,
			name: 'Gourav Hammad',
			address: {
				line1: 'TC 9/4 Old MES colony',
				postal_code: '452331',
				city: 'Indore',
				state: 'Madhya Pradesh',
				country: 'India',
			},
		})
			.then((customer) => {
				console.log('charer--->', customer);
				customerIn = customer;
				return stripe.charges.create({
					amount: 2 * 100, // Charing Rs 25
					description: 'Web Development Product',
					currency: 'AED',
					customer: customer.id,
				});
			})
			.then((charge) => {
				const data = {
					customerIn,
					charge,
				};
				res.send('Success').body(data); // If no error occurs
			});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};
