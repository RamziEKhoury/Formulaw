const db = require('../models');
const Country = db.country;
const apiResponses = require('../Components/apiresponse');
const Op = db.Sequelize.Op;

module.exports.addCountry = async (req, res) => {
  try {
    // #swagger.tags = ['Country']
    /*  #swagger.parameters['obj'] = {
                    in: 'body',
                    description: "Country details for add - en_name, ar_name, isActive, countryCode,taxType,tax, description, flag",
                    schema: { $en_name: "", $ar_name: "", $flag: "", $isActive: "", $countryCode: "",$taxType:"",$tax:"", $description: ""}
            } */
    Country.findOrCreate({
      where: {
        [Op.or]: [
          { en_name: { [Op.iLike]: '%' + req.body.en_name + '%' } },
          { ar_name: { [Op.iLike]: '%' + req.body.ar_name + '%' } },
        ],
      },

      defaults: {
        en_name: req.body.en_name,
        ar_name: req.body.ar_name,
        flag: req.body.flag,
        countryCode: req.body.countryCode,
        description: req.body.description,
        taxType: req.body.taxType,
        tax: req.body.tax,
        isActive: req.body.isActive,
      },
    }).then((country) => {
      const isAlready = country[1];
      const inserted = country[0];

      if (!isAlready) {
        /* #swagger.responses[409] = {
                            description: "Already!",
                            schema: { $statusCode : 409 ,$status: true, $message: "Country already exist!", $data : {}}
                        } */
        res.send({
          status: 409,
          msg: 'Country already exist',
        });
      } else {
        const countryData = {
          id: inserted.id,
          en_name: inserted.en_name,
          ar_name: inserted.ar_name,
          flag: inserted.flag,
          countryCode: inserted.countryCode,
          description: inserted.description,
          taxType: inserted.taxType,
          tax: inserted.tax,
          isActive: inserted.isActive,
          isDeleted: inserted.isDeleted,
        };
        // return res.status(200).send({ status:'200', message: "success!" , $data: countryData });
        return apiResponses.successResponseWithData(
          res,
          'success!',
          countryData
        );
      }
    });
  } catch (err) {
    return apiResponses.errorResponse(res, err);
  }
};

module.exports.countryUpdate = async (req, res) => {
  // #swagger.tags = ['Country']
  /*  #swagger.parameters['obj'] = {
                            in: 'body',
                            description: "Country details for add - en_name, ar_name, isActive, countryCode, description, flag",
                            schema: { $en_name: "", $ar_name: "", $flag: "", $isActive: "", $countryCode: "", $description: ""}
                    } */
  try {
    await Country.update(
      {
        en_name: req.body.en_name,
        ar_name: req.body.ar_name,
        flag: req.body.flag,
        description: req.body.description,
        taxType: req.body.taxType,
        tax: req.body.tax,
        isActive: req.body.isActive,
        countryCode: req.body.countryCode,
      },
      { where: { id: req.body.id } }
    )
      .then((country) => {
        if (!country) {
          /* #swagger.responses[404] = {
                               description: "User Not found.",
                               schema: { $statusCode: "404",  $status: false, $message: "Not found.",  $data: {}}
                           } */
          // return res.status(404).send({ message: "Not found." });
          return apiResponses.notFoundResponse(res, 'Not found.', {});
        }
        /* #swagger.responses[200] = {
                            description: "success!",
                            schema: { $en_name: "en_name", $ar_name: "en_name", $description: "description", $isActive: 0, $isDeleted: 1, $countryCode: "countryCode",$taxType:"taxType",$tax:"tax", $flag: "flag"}
                        } */
        // return res.status(200).send({ status:'200', message: "success!" , data: country });
        return apiResponses.successResponseWithData(res, 'Success', country);
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

module.exports.getCountries = (req, res) => {
  // Get Country from Database
  // #swagger.tags = ['Country']
  const limit = req.params.limit;
  const search = req.query.searchText;

  if (!!search) {
    Country.findAndCountAll({
      where: {
        [Op.or]: [
          {
            en_name: { [Op.like]: `%${search}%` },
          },
          {
            ar_name: { [Op.like]: `%${search}%` },
          },
          {
            countryCode: { [Op.like]: `%${search}%` },
          },
        ],
        isDeleted: 0,
        isActive: 1,
      },
      limit: limit,
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
          message:
            err.message || 'Some error occurred while retrieving Country.',
        });
      });
  } else {
    Country.findAndCountAll({
      where: { isDeleted: 0, isActive: 1 },
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
  }
};

module.exports.getCountry = (req, res) => {
  // Get Country from Database
  // #swagger.tags = ['Country']
  Country.findOne({
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
        message: err.message || 'Some error occurred while retrieving Country.',
      });
    });
};

module.exports.deleteCountry = async (req, res) => {
  // #swagger.tags = ['Country']
  try {
    await Country.update(
      {
        isDeleted: 1,
      },
      { where: { id: req.params.id } }
    )
      .then((country) => {
        if (!country) {
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
        // return res.status(200).send({ status:'200', message: "success!" , data: country });
        return apiResponses.successResponseWithData(res, 'Success', country);
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
