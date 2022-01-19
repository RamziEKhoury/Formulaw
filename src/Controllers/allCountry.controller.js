const db = require('../models');
const AllCountry = db.allcountry;
const apiResponses = require('../Components/apiresponse');
const Op = db.Sequelize.Op;

module.exports.addallCountry = async (req, res) => {
	try {
		AllCountry.bulkCreate(req.body)
        
        .then((country) => {
				return apiResponses.successResponseWithData(
					res,
					'success!',
					country,
				);
		});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

 

module.exports.getAllCountries = (req, res) => {
	const limit = req.params.limit;
		AllCountry.findAll({
			limit: limit,
			order: [['createdAt', 'DESC']],
		})
			.then((result) => {
			
				return apiResponses.successResponseWithData(res, 'success', result);
			})
			.catch((err) => {
				res.status(500).send({
					message: 'Something Went Wrong',
				});
			});
};

// module.exports.getCountry = (req, res) => {
// 	// Get Country from Database
// 	// #swagger.tags = ['Country']
// 	Country.findOne({
// 		where: {id: req.params.id, isDeleted: 0},
// 	})
// 		.then((data) => {
// 			// res.status(200).send({
// 			//   status: "200",
// 			//   user: data,
// 			// });

// 			return apiResponses.successResponseWithData(res, 'success', data);
// 		})
// 		.catch((err) => {
// 			/* #swagger.responses[500] = {
//                                 description: "Error message",
//                                 schema: { $statusCode: "500",  $status: false, $message: "Error Message", $data: {}}
//                             } */
// 			// return res.status(500).send({ message: err.message });
// 			res.status(500).send({
// 				message: err.message || 'Some error occurred while retrieving Country.',
// 			});
// 		});
// };


