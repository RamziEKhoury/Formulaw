module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "policy",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      privacyandPolicy: {
        type: Sequelize.TEXT,
      },
      collect: {
        type: Sequelize.TEXT,
      },
      rights: {
        type: Sequelize.TEXT,
      },
      retention: {
        type: Sequelize.TEXT,
      },
      cookies: {
        type: Sequelize.TEXT,
      },
      amendments: {
        type: Sequelize.TEXT,
      },
    },
    {
      timestamps: true,
    }
  );
};
