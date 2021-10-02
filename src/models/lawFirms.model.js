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
        type: Sequelize.STRING,
      },
      language: {
        type: Sequelize.ARRAY(Sequelize.ENUM({
          values: ['english', 'arabic']
      })),
        allowNull: false
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
      industryExperience: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      experience:{
        type:Sequelize.INTEGER,
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
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      expertise: {
        type: Sequelize.STRING,
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 10
        }
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
