module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
      'lawfirm-services',
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        lawFirmId: {
            type: Sequelize.UUID,
          allowNull: false,
        },

        title: {
            type:Sequelize.STRING
        },

        discription:{
            type:Sequelize.STRING
        },

        price:{
            type:Sequelize.INTEGER

        },

        currency:{
          type:Sequelize.STRING
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
  