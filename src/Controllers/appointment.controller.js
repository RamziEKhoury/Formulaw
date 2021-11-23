const db = require("../models");
const Appointment = db.appointment;
const Request = db.request;
const Room = db.room;
const LawFirm = db.lawFirm;
const Admin = db.adminUser;
const User = db.user;
const apiResponses = require("../Components/apiresponse");
const Mail = require("../Config/Mails");
const Op = db.Sequelize.Op;

module.exports.addAppointment = async (req, res) => {
  try {
    // #swagger.tags = ['Appointment']
    /*  #swagger.parameters['obj'] = {
                    in: 'body',
                    description: "Appointment details for add - queryId, adminId, customerId, shift, date, time",
                    schema: { $queryId: "", $adminId: "", $customerId: "", $shift: "", $date: "", $time: ""}
            } */
    const orderId = Math.floor(Math.random() * (999 - 100 + 1) + 100);
    Appointment.create({
      queryId: req.body.queryId,
      lawFirmId: req.body.lawFirmId,
      adminId: req.body.adminId,
      customerId: req.body.customerId,
      shift: req.body.shifts,
      date: req.body.date,
      time: req.body.time,
      orderId: orderId,
    }).then(async (appointment) => {
      await Room.create({
        appointmentId: appointment.id,
        roomName: appointment.id,
        adminId: appointment.adminId,
        customerId: appointment.customerId,
        queryId: appointment.queryId,
      });
      const appointmentData = {
        id: appointment.id,
        queryId: appointment.queryId,
        adminId: appointment.adminId,
        customerId: appointment.customerId,
        shifts: appointment.shifts,
        date: appointment.date,
        time: appointment.time,
      };

      const userMail = await User.findOne({
        where: {
          id: appointment.customerId,
        },
      });
      await Mail.userAppointment(
        userMail.email,
        appointment.time,
        appointment.date
      );

      const adminMail = await Admin.findOne({
        where: {
          id: appointment.adminId,
        },
      });
      await Mail.adminAppointment(
        adminMail.email,
        appointment.time,
        appointment.date
      );
      return apiResponses.successResponseWithData(
        res,
        "appointment registered successfully!",
        appointmentData
      );
    });
  } catch (err) {
    return apiResponses.errorResponse(res, err);
  }
};

module.exports.changeStatus = async (req, res) => {
  // #swagger.tags = ['Appointment']
  /*  #swagger.parameters['obj'] = {
                            in: 'body',
                            description: "Country details for add - status",
                            schema: { $status: ""}
                    } */
  try {
    await Appointment.update(
      {
        status: req.body.status,
      },
      { where: { id: req.params.id } }
    )
      .then(async (appointment) => {
        /* #swagger.responses[200] = {
                            description: "success!",
                            schema: { $en_name: "en_name", $ar_name: "en_name", $description: "description", $isActive: 0, $isDeleted: 1, $countryCode: "countryCode",$taxType:"taxType",$tax:"tax", $flag: "flag"}
                        } */
        // return res.status(200).send({ status:'200', message: "success!" , data: appointment });
        if (req.body.status === "free consultation") {
          const user = await Appointment.findOne({
            where: { id: req.params.id },
            include: [
              {
                model: User,
                required: false,
                attributes: ["fullname", "email"],
              },
              {
                model: Admin,
                required: false,
                attributes: ["firstname", "lastname", "email"],
              },
            ],
          });

          await Mail.adminAppointmentSchedule(
            user.adminuser.email,
            user.time,
            user.date,
            user.user.fullname
          );

          await Mail.userAppointmentSchedule(
            user.user.email,
            user.time,
            user.date
          );

          await Appointment.update(
            {
              status: req.body.status,
              workflow: req.body.status,
            },
            { where: { id: req.params.id } }
          );
          return apiResponses.successResponseWithData(
            res,
            "Success",
            appointment
          );
        } else if (req.body.status === "approved") {
          const user = await Appointment.findOne({
            where: { id: req.params.id },
            include: [
              {
                model: User,
                required: false,
                attributes: ["fullname", "email"],
              },
              {
                model: Admin,
                required: false,
                attributes: ["firstname", "lastname", "email"],
              },
            ],
          });

          await Mail.adminAppointmentApproved(
            user.adminuser.email,
            user.time,
            user.date,
            user.user.fullname
          );

          await Mail.userAppointmentApproved(
            user.user.email,
            user.time,
            user.date
          );

          await Appointment.update(
            {
              status: req.body.status,
              workflow: req.body.status,
            },
            { where: { id: req.params.id } }
          );

          return apiResponses.successResponseWithData(
            res,
            "Success",
            appointment
          );
        } else if (req.body.status === "payment") {
          const user = await Appointment.findOne({
            where: { id: req.params.id },
            include: [
              {
                model: User,
                required: false,
                attributes: ["fullname", "email"],
              },
              {
                model: Admin,
                required: false,
                attributes: ["firstname", "lastname", "email"],
              },
            ],
          });

          await Mail.adminAppointmentPayment(
            user.adminuser.email,
            user.time,
            user.date,
            user.user.fullname
          );

          await Mail.userAppointmentPayment(
            user.user.email,
            user.time,
            user.date
          );

          await Appointment.update(
            {
              status: req.body.status,
              workflow: req.body.status,
            },
            { where: { id: req.params.id } }
          );

          return apiResponses.successResponseWithData(
            res,
            "Success",
            appointment
          );
        } else if (req.body.status === "consultation") {
          const user = await Appointment.findOne({
            where: { id: req.params.id },
            include: [
              {
                model: User,
                required: false,
                attributes: ["fullname", "email"],
              },
              {
                model: Admin,
                required: false,
                attributes: ["firstname", "lastname", "email"],
              },
            ],
          });

          await Mail.adminAppointmentConsult(
            user.adminuser.email,
            user.time,
            user.date,
            user.user.fullname
          );

          await Mail.userAppointmentConsult(
            user.user.email,
            user.time,
            user.date
          );

          await Appointment.update(
            {
              status: req.body.status,
              workflow: req.body.status,
            },
            { where: { id: req.params.id } }
          );

          return apiResponses.successResponseWithData(
            res,
            "Success",
            appointment
          );
        } else if (req.body.status === "completed") {
          const user = await Appointment.findOne({
            where: { id: req.params.id },
            include: [
              {
                model: User,
                required: false,
                attributes: ["fullname", "email"],
              },
              {
                model: Admin,
                required: false,
                attributes: ["firstname", "lastname", "email"],
              },
            ],
          });

          await Mail.adminAppointmentComplete(
            user.adminuser.email,
            user.time,
            user.date,
            user.user.fullname
          );

          await Mail.userAppointmentComplete(
            user.user.email,
            user.time,
            user.date
          );

          await Appointment.update(
            {
              status: req.body.status,
              workflow: req.body.status,
            },
            { where: { id: req.params.id } }
          );

          return apiResponses.successResponseWithData(
            res,
            "Success",
            appointment
          );
        } else {
          return apiResponses.successResponseWithData(
            res,
            "Success",
            appointment
          );
        }
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

module.exports.getAppointments = (req, res) => {
  // Get Appointment from Database
  // #swagger.tags = ['Appointment']
  const limit = req.params.limit;
  const search = req.query.searchText;

  if (!!search) {
    Appointment.findAll({
      where: {
        [Op.or]: [
          {
            adminId: { [Op.like]: `%${search}%` },
          },
          {
            customerId: { [Op.like]: `%${search}%` },
          },
        ],
      },
      limit: limit,
    })
      .then((data) => {
        return apiResponses.successResponseWithData(res, "success", data);
      })
      .catch((err) => {
        /* #swagger.responses[500] = {
                                description: "Error message",
                                schema: { $statusCode: "500",  $status: false, $message: "Error Message", $data: {}}
                            } */
        // return res.status(500).send({ message: err.message });
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Appointment.",
        });
      });
  } else {
    Appointment.findAll({
      include: [
        { model: Request, required: false },
        { model: LawFirm, required: false, attributes: ["en_name"] },
        {
          model: Admin,
          required: false,
          attributes: ["firstname", "lastname"],
        },
        { model: User, required: false, attributes: ["fullname", "email"] },
      ],
    })
      .then((result) => {
        // res.status(200).send({
        //   status: "200",
        //   user: result,
        // });
        return apiResponses.successResponseWithData(res, "success", result);
      })
      .catch((err) => {
        /* #swagger.responses[500] = {
                    description: "Error message",
                    schema: { $statusCode: "500",  $status: false, $message: "Error Message", $data: {}}
                } */
        // return res.status(500).send({ message: err.message });
        res.status(500).send({
          message: "Something Went Wrong",
        });
      });
  }
};

module.exports.getAppointment = (req, res) => {
  // Get Appointment from Database
  // #swagger.tags = ['Appointment']
  Appointment.findOne({
    where: { id: req.params.id },
    include: [
      { model: Request, required: false },
      { model: LawFirm, required: false, attributes: ["en_name"] },
      { model: Admin, required: false, attributes: ["firstname", "lastname"] },
      { model: User, required: false, attributes: ["fullname", "email"] },
    ],
  })
    .then((data) => {
      // res.status(200).send({
      //   status: "200",
      //   user: data,
      // });

      return apiResponses.successResponseWithData(res, "success", data);
    })
    .catch((err) => {
      /* #swagger.responses[500] = {
                                description: "Error message",
                                schema: { $statusCode: "500",  $status: false, $message: "Error Message", $data: {}}
                            } */
      // return res.status(500).send({ message: err.message });
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Appointment.",
      });
    });
};

module.exports.getUserAppointment = (req, res) => {
  // Get Appointment from Database
  // #swagger.tags = ['Appointment']
  Appointment.findAll({
    where: { customerId: req.params.userId },
    include: [
      { model: Request, required: false },
      { model: LawFirm, required: false, attributes: ["en_name"] },
      { model: Admin, required: false, attributes: ["firstname", "lastname"] },
      { model: User, required: false, attributes: ["fullname", "email"] },
    ],
  })
    .then((data) => {
      // res.status(200).send({
      //   status: "200",
      //   user: data,
      // });

      return apiResponses.successResponseWithData(res, "success", data);
    })
    .catch((err) => {
      /* #swagger.responses[500] = {
                                description: "Error message",
                                schema: { $statusCode: "500",  $status: false, $message: "Error Message", $data: {}}
                            } */
      // return res.status(500).send({ message: err.message });
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Appointment.",
      });
    });
};

module.exports.getLawyerAppointment = (req, res) => {
  // Get Appointment from Database
  // #swagger.tags = ['Appointment']
  Appointment.findAll({
    where: { lawFirmId: req.params.lawFirmId },
    include: [
      { model: Request, required: false },
      { model: LawFirm, required: false, attributes: ["en_name"] },
      { model: Admin, required: false, attributes: ["firstname", "lastname"] },
      { model: User, required: false, attributes: ["fullname", "email"] },
    ],
  })
    .then((data) => {
      // res.status(200).send({
      //   status: "200",
      //   user: data,
      // });

      return apiResponses.successResponseWithData(res, "success", data);
    })
    .catch((err) => {
      /* #swagger.responses[500] = {
                                description: "Error message",
                                schema: { $statusCode: "500",  $status: false, $message: "Error Message", $data: {}}
                            } */
      // return res.status(500).send({ message: err.message });
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Appointment.",
      });
    });
};

module.exports.getUserAppointmentMonthly = (req, res) => {
  // Get Appointment from Database
  // #swagger.tags = ['Appointment']
  Appointment.findAll({
    where: {
      customerId: req.params.userId,
      date: {
        [Op.between]: [req.params.startDate, req.params.endDate],
      },
    },
    include: [
      { model: Request, required: false },
      { model: LawFirm, required: false, attributes: ["en_name"] },
      { model: Admin, required: false, attributes: ["firstname", "lastname"] },
      { model: User, required: false, attributes: ["fullname", "email"] },
    ],
  })
    .then((data) => {
      // res.status(200).send({
      //   status: "200",
      //   user: data,
      // });

      return apiResponses.successResponseWithData(res, "success", data);
    })
    .catch((err) => {
      /* #swagger.responses[500] = {
                                description: "Error message",
                                schema: { $statusCode: "500",  $status: false, $message: "Error Message", $data: {}}
                            } */
      // return res.status(500).send({ message: err.message });
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Appointment.",
      });
    });
};

module.exports.getLawyerAppointmentMonthly = (req, res) => {
  // Get Appointment from Database
  // #swagger.tags = ['Appointment']
  Appointment.findAll({
    where: {
      lawFirmId: req.params.lawFirmId,
      date: {
        [Op.between]: [req.params.startDate, req.params.endDate],
      },
    },
    include: [
      { model: Request, required: false },
      { model: LawFirm, required: false, attributes: ["en_name"] },
      { model: Admin, required: false, attributes: ["firstname", "lastname"] },
      { model: User, required: false, attributes: ["fullname", "email"] },
    ],
  })
    .then((data) => {
      // res.status(200).send({
      //   status: "200",
      //   user: data,
      // });

      return apiResponses.successResponseWithData(res, "success", data);
    })
    .catch((err) => {
      /* #swagger.responses[500] = {
                                description: "Error message",
                                schema: { $statusCode: "500",  $status: false, $message: "Error Message", $data: {}}
                            } */
      // return res.status(500).send({ message: err.message });
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Appointment.",
      });
    });
};
