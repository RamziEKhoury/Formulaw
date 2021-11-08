module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "community_type",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      communityId: {
        type: Sequelize.UUID,
      },

      title: {
        type: Sequelize.STRING,
      },
      instruction: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: true,
    }
  );
};
