const db = require("../models");
const Policy = db.policy;

const apiResponses = require("../Components/apiresponse");
module.exports.addpolicy = async (req, res) => {
  try {
    console.log(req.body);
    Policy.create({
      id: req.body.id,
      privacyandPolicy: req.body.privacyandPolicy,
      collect: req.body.collect,
      rights: req.body.rights,
      retention: req.body.retention,
      cookies: req.body.cookies,
      amendments: req.body.amendments,
    }).then((policy) => {
      const policyData = {
        id: policy.id,
        privacyandPolicy: policy.privacyandPolicy,
        collect: policy.collect,
        rights: policy.rights,
        retention: policy.retention,
        cookies: policy.cookies,
        amendments: policy.amendments,
      };
      return apiResponses.successResponseWithData(
        res,
        "Policy Created successfully!",
        policyData
      );
    });
  } catch (err) {
    return apiResponses.errorResponse(res, err);
  }
};

module.exports.viewPolicys = (req, res) => {
  Policy.findAll({})
    .then((policys) => {
      if (!policys) {
        return apiResponses.notFoundResponse(res, "Data Not found.", null);
      }

      return apiResponses.successResponseWithData(
        res,
        "successfully found!",
        policys
      );
    })
    .catch((err) => {
      return apiResponses.errorResponse(res, err.message, err);
    });
};

module.exports.viewpolicy = (req, res) => {
  console.log(req.params);

  Policy.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((policy) => {
      if (!policy) {
        return apiResponses.notFoundResponse(res, "Data Not found.", null);
      }

      return apiResponses.successResponseWithData(
        res,
        "successfully found!",
        policy
      );
    })
    .catch((err) => {
      return apiResponses.errorResponse(res, err.message, err);
    });
};

module.exports.updatepolicy = async (req, res) => {
  try {
    await Policy.update(
      {
        privacyandPolicy: req.body.privacyandPolicy,
        collect: req.body.collect,
        rights: req.body.rights,
        retention: req.body.retention,
        cookies: req.body.cookies,
        amendments: req.body.amendments,
      },
      { where: { id: req.body.id } }
    )
      .then((policy) => {
        if (!policy) {
          return apiResponses.notFoundResponse(res, "Not found.", {});
        }

        return apiResponses.successResponseWithData(res, "Success", policy);
      })
      .catch((err) => {
        return apiResponses.errorResponse(res, err.message, {});
      });
  } catch (err) {
    return apiResponses.errorResponse(res, err);
  }
};

// module.exports.deletetestimonial = async (req, res) => {
//   try {
//     await Testimonial.destroy({ where: { id: req.params.id } })
//       .then((testimonial) => {
//         if (!testimonial) {
//           return apiResponses.notFoundResponse(res, "Not found.", {});
//         }

//         return apiResponses.successResponseWithData(
//           res,
//           "Success",
//           testimonial
//         );
//       })
//       .catch((err) => {});
//   } catch (err) {
//     return apiResponses.errorResponse(res, err);
//   }
// };
