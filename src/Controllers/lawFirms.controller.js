const db = require('../models');
const LawFirm = db.lawFirm;
const apiResponses = require('../Components/apiresponse');
const Op = db.Sequelize.Op;

module.exports.addLawFirm = async (req, res) => {
  try {
    console.log(req.body.en_name);
    // #swagger.tags = ['LawFirm']
    /*  #swagger.parameters['obj'] = {
                    in: 'body',
                    description: "LawFirm details for add - en_name, ar_name,licenseNumber,country,langauge,logo,experience,price,currency,numOfLawyer,jurisdiction,legalField,service,expertise,rating, isActive",
                    schema: { $en_name: "", $ar_name: "" ,  $isActive: "", $licenseNumber: "" , $country: "" , $langauge: "" ,$logo: "" ,$price: "" ,$currency: "" , $rating: "" , $experience: "", $numOfLawyer: "", $jurisdiction: "", $legalField: "" , $service: "", $expertise: ""}
            } */
    LawFirm.findOrCreate({
      where: {
        [Op.or]: [
          { en_name: { [Op.iLike]: '%' + req.body.en_name + '%' } },
          { ar_name: { [Op.iLike]: '%' + req.body.ar_name + '%' } },
        ],
      },
      defaults: {
        en_name: req.body.en_name,
        ar_name: req.body.ar_name,
        licenseNumber: req.body.flag,
        country: req.body.country,
        language: req.body.language,
        logo: req.body.logo,
        price: req.body.price,
        currency: req.body.currency,
        expertise: req.body.expertise,
        numOfLawyer: req.body.numOfLawyer,
        jurisdiction: req.body.jurisdiction,
        legalField: req.body.legalField,
        service: req.body.service,
        rating: req.body.rating,
        expertise: req.body.expertise,
        isActive: req.body.isActive,
      },
    }).then((lawFirm) => {
      const isAlready = lawFirm[1];
      const inserted = lawFirm[0];

      if (!isAlready) {
        /* #swagger.responses[409] = {
                            description: "Already!",
                            schema: { $statusCode : 409 ,$status: true, $message: "Lawfirm already exist!", $data : {}}
                        } */
        res.send({
          status: 409,
          msg: 'Lawfirm already exist',
        });
      } else {
        const lawFirmData = {
          id: inserted.id,
          en_name: inserted.en_name,
          ar_name: inserted.ar_name,
          licenseNumber: inserted.flag,
          country: inserted.country,
          language: inserted.language,
          logo: inserted.logo,
          price: inserted.price,
          currency: inserted.currency,
          experience: inserted.experience,
          jurisdiction: inserted.jurisdiction,
          legalField: inserted.legalField,
          service: inserted.service,
          expertise: inserted.expertise,
          rating: inserted.rating,
          isActive: inserted.isActive,
          isDeleted: inserted.isDeleted,
        };
        // return res.status(200).send({ status:'200', message: "success!" , $data: lawfirmdata });
        return apiResponses.successResponseWithData(
          res,
          'success!',
          lawFirmData
        );
      }
    });
  } catch (err) {
    return apiResponses.errorResponse(res, err);
  }
};

module.exports.lawFirmUpdate = async (req, res) => {
  // #swagger.tags = ['LawFirm]
  /*  #swagger.parameters['obj'] = {
                    in: 'body',
                     description: "LawFirm details for add - en_name, ar_name,licenseNumber,country,langauge,logo,experience,price,currency,numOfLawyer,jurisdiction,legalField,service,expertise,rating, isActive",
                    schema: { $en_name: "", $ar_name: "" ,  $isActive: "", $licenseNumber: "" , $country: "" , $langauge: "" ,$logo: "" ,$price: "" ,$currency: "" , $rating: "" , $experience: "", $numOfLawyer: "", $jurisdiction: "", $legalField: "" , $service: "", $expertise: ""}
            } */

  try {
    await LawFirm.update(
      {
        en_name: req.body.en_name,
        ar_name: req.body.ar_name,
        licenseNumber: req.body.flag,
        country: req.body.country,
        language: req.body.language,
        logo: req.body.logo,
        price: req.body.price,
        currency: req.body.currency,
        expertise: req.body.expertise,
        numOfLawyer: req.body.numOfLawyer,
        jurisdiction: req.body.jurisdiction,
        legalField: req.body.legalField,
        service: req.body.service,
        rating: req.body.rating,
        expertise: req.body.expertise,
        isActive: req.body.isActive,
      },
      { where: { id: req.body.id } }
    )
      .then((lawFirm) => {
        if (!lawFirm) {
          /* #swagger.responses[404] = {
                               description: "Lawfirm Not found.",
                               schema: { $statusCode: "404",  $status: false, $message: "Not found.",  $data: {}}
                           } */
          // return res.status(404).send({ message: "Not found." });
          return apiResponses.notFoundResponse(res, 'Not found.', {});
        }
        /* #swagger.responses[200] = {
                            description: "success!",
                            schema: { $en_name: "en_name", $ar_name: "ar_name", $licenseNumber: "licenseNumber",$country: "country",$language: "language",$logo: "logo",$price: "price",$currency: "currency",$rating: "rating", $isActive: 0, $isDeleted: 1, $experience: "experience", $numOfLawyer: "numOfLawyer",$jurisdiction: "jurisdiction", $expertise: "expertise", $legalField: "legalField", $service: "service"}
                            
                        } */
        // return res.status(200).send({ status:'200', message: "success!" , data: lawFirm });
        return apiResponses.successResponseWithData(res, 'Success', lawFirm);
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

module.exports.getLawFirms = (req, res) => {
  //Get Lawfirm data from Database
  //#swagger.tags = ['LawFirm']

  const limit = req.params.limit;
  const search = req.params.searchText;

  if (!!search) {
    LawFirm.findAndCountAll({
      where: {
        [Op.or]: [
          {
            en_name: { [Op.like]: `%${search}%` },
          },
          {
            ar_name: { [Op.like]: `%${search}%` },
          },
          {
            licenseNumber: { [Op.like]: `%${search}%` },
          },
        ],
        isDeleted: 0,
        isActive: 1,
      },
      limit: limit,
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
            err.message || 'Some error occurred while retrieving Lawfirm.',
        });
      });
  } else {
    LawFirm.findAndCountAll({
      where: { isDeleted: 0, isActive: 1 },
      limit: limit,
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
  }
};

module.exports.getLawFirm = (req, res) => {
  // Get Country from Database
  // #swagger.tags = ['LawFirm']
  LawFirm.findOne({
    where: { id: req.params.id, isDeleted: 0 },
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
module.exports.deleteLawFirm = async (req, res) => {
  // #swagger.tags = ['LawFirm']
  try {
    await LawFirm.update(
      {
        isDeleted: 1,
      },
      { where: { id: req.params.id } }
    )
      .then((lawFirm) => {
        if (!lawFirm) {
          /* #swagger.responses[404] = {
                               description: "Not found.",
                               schema: { $statusCode: "404",  $status: false, $message: "Not found.",  $data: {}}
                           } */
          // return res.status(404).send({ message: "Not found." });
          return apiResponses.notFoundResponse(res, 'Not found.', {});
        }
        /* #swagger.responses[200] = {
                            description: "success!",
                        } */
        // return res.status(200).send({ status:'200', message: "success!" , data: lawfirm });
        return apiResponses.successResponseWithData(res, 'Success', lawfirm);
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
