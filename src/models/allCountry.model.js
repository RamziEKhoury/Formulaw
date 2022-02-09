module.exports = (sequelize, Sequelize) => {
	return sequelize.define('allcountry', {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		objectId: {
			type: Sequelize.STRING,
		},
		code: {
			type: Sequelize.STRING,
		},
		name: {
			type: Sequelize.STRING,
		},
		phone: {
			type: Sequelize.STRING,
		},
		currency: {
			type: Sequelize.STRING,
		},
		emoji:{
			type: Sequelize.STRING,
		  },
	}, {
		timestamps: true,
	},
	);
};