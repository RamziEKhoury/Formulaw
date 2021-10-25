module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "testimonial",
    {
      id: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.STRING,
      },
      orderId: {
        type: Sequelize.STRING,
      },
      lawFirmId: {
        type: Sequelize.STRING,
      },
      testimonialdata: {
        type: Sequelize.STRING,
      },
      rating: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: true,
    }
  );
};
