module.exports = (sequelize, Sequelize) => {
	return sequelize.define('subscribeUser', {
		sno:{
            type: Sequelize.INTEGER,
            autoIncrement:true,
			primaryKey: true,
        },
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
    },
        {
            timestamps: true,
        },
    );
    };