const db = require('../models');
const Kyc = db.kyc;
const User = db.user;
const apiResponses = require('../Components/apiresponse');

module.exports.addKycDetails = async (req, res) => {
  console.log('dfdgsgdfh', req.body);
  try {
    console.log(req.body.userId);
    Kyc.create({
      userId: req.body.userId,
      passport: req.body.passport,
      photo: req.body.photo,
      ParmanentAddress: req.body.ParmanentAddress,
      PhnNumber: req.body.PhnNumber,
      reason: req.body.reason,
    }).then((kycDetail) => {
      return apiResponses.successResponseWithData(res, 'success!', kycDetail);
    });
  } catch (err) {
    return apiResponses.errorResponse(res, err);
  }
};

module.exports.updateKycDetails = async (req, res) => {
  try {
    await kyc
      .update(
        {
          passport: req.body.passport,
          photo: req.body.photo,
          ParmanentAddress: req.body.ParmanentAddress,
          PhnNumber: req.body.PhnNumber,
          reason: req.body.reason,
        },
        { where: { userId: req.body.userId } }
      )
      .then((kycDetail) => {
        if (!kycDetail) {
          return apiResponses.notFoundResponse(res, 'Not found.', {});
        }
        return apiResponses.successResponseWithData(res, 'Success', kycDetail);
      })
      .catch((err) => {
        return apiResponses.errorResponse(res, err.message, {});
      });
  } catch (err) {
    return apiResponses.errorResponse(res, err);
  }
};

module.exports.getallUserKycDetails = (req, res) => {
  const limit = req.params.limit;
  Kyc.findAll({
    include: [
      { model: User, required: false, attributes: ['fullname', 'email'] },
    ],
    order: [['createdAt', 'DESC']],
  })
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

module.exports.getOneUserKycDetails = (req, res) => {
  Kyc.findOne({
    include: [
      { model: User, required: false, attributes: ['fullname', 'email'] },
    ],
    where: { userId: req.params.userId },
  })
    .then((data) => {
      return apiResponses.successResponseWithData(res, 'success', data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving data.',
      });
    });
};

module.exports.kycStatus = async (req, res) => {
  try {
    await Kyc.update(
      {
        status: req.params.status,
      },
      { where: { userId: req.params.userId } }
    )
      .then((kycDetail) => {
        if (!kycDetail) {
          return apiResponses.notFoundResponse(res, 'Not found.', {});
        }
        return apiResponses.successResponseWithData(res, 'Success', kycDetail);
      })
      .catch((err) => {
        return apiResponses.errorResponse(res, err.message, {});
      });
  } catch (err) {
    console.log('errrrrr', err);
    return apiResponses.errorResponse(res, err);
  }
};
