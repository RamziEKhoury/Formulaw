const DataTypes = require('sequelize');
module.exports = (sequelize, Sequelize) => {
	return sequelize.define('journey', {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		title: {
			type: Sequelize.STRING,
		},
		description: {
			type: Sequelize.STRING,
		},
		sortNumber: {
			type: Sequelize.INTEGER,
		},
		icon: {
			type: DataTypes.JSONB,
		},
	}, {
		timestamps: true,
	},
	);
};
