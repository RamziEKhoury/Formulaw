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

      licenseNumber: {
        type: Sequelize.STRING,
      },
      countryId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      countryTitle: {
        type: Sequelize.STRING,
      },
      languageId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      languageTitle: {
        type: Sequelize.STRING,
      },
      logo: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      currency: {
        type: Sequelize.STRING,
      },
      industryId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },

      industryTitle: {
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
      serviceId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      seviceTitle: {
        type: Sequelize.STRING,
      },
      subCategoryId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },

      subCategoryTitle: {
        type: Sequelize.STRING,
      },

      expertise: {
        type: Sequelize.STRING,
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 10,
        },
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
