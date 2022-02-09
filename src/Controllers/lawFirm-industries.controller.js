const db = require('../models');
const LawFirmIndustry = db.lawFirm_industry;
const apiResponses = require('../Components/apiresponse');

module.exports.addLawFirmIndustry = async (req, res) => {
	// get input values from reqeust.
	const industryData = req.body.values;
	const lawFirmId = req.body.lawFirmId;

	try {
		if (industryData === undefined || industryData === '') {
			res.send({status: 409, msg: 'Industry Data should not be empty.'});
		}
		industryData.map((industry, i) => {
			const industries = {
				title: industry.label,
				industryId: industry.value,
				lawFirmId: lawFirmId,
				discription: '',
				isActive: 1,
			};

			// #swagger.tags = ['LawFirmIndustry']
			/*  #swagger.parameters['obj'] = {
						  in: 'body',
						  description: "LawFirmIndustry details for add -lawFirmId,title,discription,isActive",
						  schema: {$lawFirmId:"",$title:"",$isActive:""}
			} */

			LawFirmIndustry.create(industries).then((lawFirmIndustry) => {});
		});
		return apiResponses.successResponseWithData(res, 'success!');
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.lawFirmIndustryUpdate = async (req, res) => {
	// #swagger.tags = ['LawFirmIndustry']
	/*  #swagger.parameters['obj'] = {
		in: 'body',
		description: "LawFirmIndustry details for add -lawFirmId,title,discription,isActive",
			          schema: {$lawFirmId:"",$title:"",$isActive:""}
            } */

	try {
		await LawFirmIndustry.update(
			{
				id: req.body.id,
				lawFirmId: req.body.lawFirmId,
				title: req.body.title,
				industryId: req.body.industryId,
				discription: req.body.discription,
				isActive: req.body.isActive,
			},
			{where: {id: req.body.id}},
		)
			.then((lawFirmIndustry) => {
				if (!lawFirmIndustry) {
					/* #swagger.responses[404] = {
                               description: "LawFirmIndustry Not found.",
                               schema: { $statusCode: "404",  $status: false, $message: "Not found.",  $data: {}}
                           } */
					// return res.status(404).send({ message: "Not found." });
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}
				/* #swagger.responses[200] = {
                            description: "success!",
                           schema: { $lawFirmId:"lawFirmId",$title:"title",$discription:"discription"  $isActive: "0"}

                        } */
				// return res.status(200).send({ status:'200', message: "success!" , data: lawFirm });
				return apiResponses.successResponseWithData(
					res,
					'Success',
					lawFirmIndustry,
				);
			})
			.catch((err) => {
				/* #swagger.responses[500] = {
                            description: "Error message",
                            schema: { $statusCode: "500",  $status: false, $message: "Error Message", $data: {}}
                        } */
				// return res.status(500).send({ message: err.message });
				return apiResponses.errorResponse(res, err.message, {});
			});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.getLawFirmIndustries = (req, res) => {
	// Get Lawfirm data from Database
	// #swagger.tags = ['LawFirmIndustry']

	LawFirmIndustry.findAll({
		where: {lawFirmId: req.params.lawFirmId},
		isDeleted: 0,
		isActive: 1,
		order: [['createdAt', 'DESC']],
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
				message: err.message || 'Some error occurred while retrieving Lawfirm.',
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

module.exports.getLawFirmIndustry = (req, res) => {
	// Get Country from Database
	// #swagger.tags = ['LawFirmIndustry']
	LawFirmIndustry.findOne({
		where: {id: req.params.id, isDeleted: 0},
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
				message:
          err.message || 'Some error occurred while retrieving LawFirmIdustry.',
			});
		});
};
