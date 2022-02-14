const DataTypes = require('sequelize');
module.exports = (sequelize, Sequelize) => {
	return sequelize.define('faq_answers', {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		faq_heading_id: {
			type: Sequelize.UUID,
		},
		question: {
			type: DataTypes.STRING(1024),
		},
		answer: {
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
