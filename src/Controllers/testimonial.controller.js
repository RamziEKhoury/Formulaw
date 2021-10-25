const db = require("../models");
const Testimonial = db.testimonial;
const apiResponses = require("../Components/apiresponse");

module.exports.addtestimonial = async (req, res) => {
  try {
    console.log(req.body);
    Testimonial.create({
      id: req.body.id,
      userId: req.body.userId,
      orderId: req.body.orderId,
      lawFirmId: req.body.lawFirmId,
      testimonialdata: req.body.testimonialdata,
      rating: req.body.rating,
    }).then((testimonial) => {
      const testimonialData = {
        id: testimonial.id,
        userId: testimonial.userId,
        orderId: testimonial.orderId,
        lawFirmId: testimonial.lawFirmId,
        testimonialdata: testimonial.testimonialdata,
        rating: testimonial.rating,
      };
      return apiResponses.successResponseWithData(
        res,
        "Testimonial Created successfully!",
        testimonialData
      );
    });
  } catch (err) {
    return apiResponses.errorResponse(res, err);
  }
};
