const {DisputeStatus} = require('../enum');
module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
      "dispute",
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        userId: {
          type: Sequelize.UUID,
        },
        orderId: {
          type: Sequelize.STRING,
        },
        serviceName: {
          type: Sequelize.STRING,
        },
        dispute: {
          type: Sequelize.STRING,
        },
        status: {
          defaultValue: DisputeStatus.PENDING,
				 type: Sequelize.ENUM(
					DisputeStatus.PENDING,
					DisputeStatus.RESOLVED,
         )
        },
        img: {
          type: Sequelize.STRING,
        },
      },
      {
        timestamps: true,
      }
    );
  };
  