module.exports = (sequelize, Sequelize) => {
	return sequelize.define('subscribeUser', {
		
        id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			allowNull: false,
			primaryKey: true,

		},
        userName: {
            type: Sequelize.STRING,
        }, 
        email: {
			type: Sequelize.STRING,
		},

        isDeleted:{
            type: Sequelize.INTEGER,
            defaultValue : 0,
        }
    },
        {
            timestamps: true,
        },
    );
    };