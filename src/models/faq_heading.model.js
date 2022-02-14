const DataTypes = require('sequelize');
module.exports = (sequelize, Sequelize) => {
	return sequelize.define('faq_heading', {
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
			type: DataTypes.STRING(2048),
		},
		images: {
			type: DataTypes.JSONB,
		},
		isActive: {
			type: Sequelize.INTEGER,
		},
		isDeleted: {
			defaultValue: 0,
			type: Sequelize.INTEGER,
		},
	}, {
		timestamps: true,
	},
	);
};
