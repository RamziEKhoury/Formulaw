module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "community",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      titleOne: {
        type: Sequelize.STRING,
      },
      titleTwo: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: true,
    }
  );
};
