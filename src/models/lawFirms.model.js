module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    'lawfirm',
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      en_name: {
        type: Sequelize.STRING,
      },
      ar_name: {
        type: Sequelize.STRING,
      },
      // username: {
      //   type: Sequelize.STRING,
      //   allowNull: false,
      // },
      // password: {
      //   type: Sequelize.STRING,
      // },
      licenseNumber: {
        type: Sequelize.STRING,
      },
      country: {
        type: sequelize.STRING,
      },
      language: {
        type: Sequelize.ARRAY,
      },
      logo: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.NUMBER,
      },
      currency: {
        type: Sequelize.STRING,
      },
      experience: {
        type: Sequelize.INTEGER,
      },
      numOfLawyer: {
        type: Sequelize.INTEGER,
      },
      jurisdiction: {
        type: Sequelize.STRING,
      },
      legalField: {
        type: Sequelize.STRING,
      },
      service: {
        type: Sequelize.INTEGER,
      },
      expertise: {
        type: Sequelize.STRING,
      },
      rating: {
        type: Sequelize.NUMBER,
      },
      isActive: {
        type: Sequelize.INTEGER,
      },
      isDeleted: {
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
    },
    {
      timestamps: true,
    }
  );
};
