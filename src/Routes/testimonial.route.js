const testimoinalController = require("../Controllers/testimonial.controller");
const TestimonialValidator = require("../Validators/Testimonial.validator");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/v1/testimonial/add-testimonial",
    [TestimonialValidator.addTestimonial],
    testimoinalController.addtestimonial
  );
  app.get(
    "/api/v1/testimonial/view-testimonials",
    testimoinalController.viewtestimonials
  );
  app.get(
    "/api/v1/testimonial/view-testimonial/:id",
    testimoinalController.viewtestimonial
  );
};
