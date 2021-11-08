const communityController = require("../Controllers/community.controller");
const CommunityValidator = require("../Validators/Community.validator");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //community routes
  app.post(
    "/api/v1/community/add-community",
    [CommunityValidator.addCommunity],
    communityController.addcommunity
  );

  app.get(
    "/api/v1/community/view-communities",
    communityController.viewcommunities
  );

  app.get(
    "/api/v1/community/view-community/:id",
    communityController.viewcommunity
  );

  app.put(
    "/api/v1/community/update-community/:id",

    [CommunityValidator.updateCommunity],
    communityController.updatecommunity
  );
  app.delete(
    "/api/v1/community/delete-community/:id",
    communityController.deletecommunity
  );

  //community type routes

  app.post(
    "/api/v1/community/add-communitytype",
    [CommunityValidator.addCommunity_type],
    communityController.addcommunity_type
  );

  app.get(
    "/api/v1/community/view-allcommunitytype/:communityId",
    communityController.viewallcommunity_type
  );

  app.get(
    "/api/v1/community/view-communitytype/:id",
    communityController.viewcommunity_type
  );

  app.put(
    "/api/v1/community/update-communitytype/:id",
    [CommunityValidator.updateCommunity_type],
    communityController.updatecommunity_type
  );
  app.delete(
    "/api/v1/community/delete-communitytype/:id",
    communityController.deletecommunity_type
  );
};
