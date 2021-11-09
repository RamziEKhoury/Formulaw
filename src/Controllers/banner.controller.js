const db = require('../models');
const Banner = db.banner;
const apiResponses = require('../Components/apiresponse');

module.exports.addBanner = async (req, res) => {
	try {
		// #swagger.tags = ['Banner']
		console.log(req.body.title);
		/*  #swagger.parameters['obj'] = {
			          in: 'body',
			          description: "Banner details for add - en_name, ar_name,licenseNumber,countryId,countryTitle,langaugeId,langaugeTitle,experience,jurisdiction,expertise,rating,isActive",
			          schema: { $en_name: "", $ar_name: "" ,  $isActive: "", $licenseNumber: "" , $countryId: "" ,$countryTitle:"", $langaugeId: "",$langaugeTitle:"",$serviceId:"", $rating: "" , $experience:"",$numOfLawyer: "", $taxType:"",$tax:"", $expertise: "",$jurisdiction:""}
        } */
		Banner.create({
			titleOne: req.body.titleOne,
			titleTwo: req.body.titleTwo,
			description: req.body.description,
			features: req.body.features,
			images: req.body.images,
			logo: req.body.logo,
		}).then((banner) => {
			// console.log('banner--->', banner);
			// return res.status(200).send({ status:'200', message: "success!" , $data: lawfirmdata });
			return apiResponses.successResponseWithData(
				res,
				'success!',
				banner,
			);
		},
		);
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};


module.exports.getBanners = (req, res) => {
	Banner.findAll()
		.then((data) => {
			// res.status(200).send({
			//   status: "200",
			//   user: data,
			// });
			return apiResponses.successResponseWithData(res, 'success', data);
		})
		.catch((err) => {
			/* #swagger.responses[500] = {
                                description: "Error message",
                                schema: { $statusCode: "500",  $status: false, $message: "Error Message", $data: {}}
                            } */
			// return res.status(500).send({ message: err.message });
			res.status(500).send({
				message:
            err.message || 'Some error occurred while retrieving data.',
			});
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

module.exports.getBanner = (req, res) => {
	// Get Country from Database
	// #swagger.tags = ['Banner']
	Banner.findOne({
		where: {id: req.params.id},

	})
		.then((data) => {
			// res.status(200).send({
			//   status: "200",
			//   user: data,
			// });

			return apiResponses.successResponseWithData(res, 'success', data);
		})
		.catch((err) => {
			/* #swagger.responses[500] = {
                                  description: "Error message",
                                  schema: { $statusCode: "500",  $status: false, $message: "Error Message", $data: {}}
                              } */
			// return res.status(500).send({ message: err.message });
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving LawFirm.',
			});
		});
};

