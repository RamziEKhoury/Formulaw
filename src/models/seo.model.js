const DataTypes = require('sequelize');
module.exports = (sequelize, Sequelize) => {
	return sequelize.define('seo', {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		pageTitle: {
			type: Sequelize.STRING,
		},
        title: {
			type: Sequelize.STRING,
		},
        description: {
			type: DataTypes.STRING(2048),
		},
		canonicalUrl: {
			type: Sequelize.STRING,
		},
		keywords: {
			type: DataTypes.STRING(3048),
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