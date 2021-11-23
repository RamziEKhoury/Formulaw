const policyController = require("../Controllers/policy.controller");
const PolicyValidator = require("../Validators/Policy.validator");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/v1/policy/addpolicy",
    [PolicyValidator.addPolicyValidator],
    policyController.addpolicy
  );
  app.get("/api/v1/policy/view-policys", policyController.viewPolicys);
  app.get("/api/v1/policy/viewpolicy/:id", policyController.viewpolicy);

  app.put(
    "/api/v1/policy/updatepolicy/:id",
    [PolicyValidator.updatePolicyValidator],
    policyController.updatepolicy
  );
};
