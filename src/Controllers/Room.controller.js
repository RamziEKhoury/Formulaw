const db = require('../models');
const RoomController = db.room;
const Request = db.request;
const Admin = db.adminUser;
const User = db.user;
const apiResponses = require('../Components/apiresponse');

module.exports.getRooms = async (req, res) => {
  try {
    RoomController.findAll({
      include: [
        {
          model: Admin,
          required: false,
          attributes: ['firstname', 'lastname', 'id'],
        },
        {
          model: Request,
          required: false,
          attributes: ['getstarted'],
        },
        {
          model: User,
          required: false,
          attributes: ['fullname', 'email', 'id'],
        },
      ],
      isActive: 1,
      order: [['createdAt', 'DESC']],
    }).then(async (rooms) => {
      return apiResponses.successResponseWithData(res, 'Success!', rooms);
    });
  } catch (err) {
    return apiResponses.errorResponse(res, err);
  }
};

module.exports.getRoomById = (req, res) => {
  // Get RoomController from Database
  // #swagger.tags = ['RoomController']
  RoomController.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Admin,
        required: false,
        attributes: ['firstname', 'lastname', 'id'],
      },
      {
        model: Request,
        required: false,
        attributes: ['getstarted'],
      },
      {
        model: User,
        required: false,
        attributes: ['fullname', 'email', 'id'],
      },
    ],
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
          err.message || 'Some error occurred while retrieving RoomController.',
      });
    });
};

module.exports.getRoomByAppointmentId = (req, res) => {
  // Get RoomController from Database
  // #swagger.tags = ['RoomController']
  RoomController.findOne({
    where: { appointmentId: req.params.appointmentId },
    include: [
      {
        model: Admin,
        required: false,
        attributes: ['firstname', 'lastname', 'id'],
      },
      {
        model: Request,
        required: false,
        attributes: ['getstarted'],
      },
      {
        model: User,
        required: false,
        attributes: ['fullname', 'email', 'id'],
      },
    ],
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
          err.message || 'Some error occurred while retrieving RoomController.',
      });
    });
};
