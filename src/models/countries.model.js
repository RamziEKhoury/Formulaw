module.exports = (sequelize, Sequelize) => {
	return sequelize.define('country', {
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
		description: {
			type: Sequelize.STRING,
		},
		isActive: {
			type: Sequelize.INTEGER,
		},
		isDeleted: {
			defaultValue: 0,
			type: Sequelize.INTEGER,
		},
		countryCode: {
			type: Sequelize.STRING,
		},
		taxType:{
			type: Sequelize.STRING,
		  },
		  tax:{
			type: Sequelize.STRING,
		  },
		flag: {
			type: Sequelize.STRING,
		},
	}, {
		timestamps: true,
	},
	);
};
