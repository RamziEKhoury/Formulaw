const DataTypes = require('sequelize');
module.exports = (sequelize, Sequelize) => {
	return sequelize.define('banner', {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		titleOne: {
			type: Sequelize.STRING,
		},
		titleTwo: {
			type: Sequelize.STRING,
		},
        
        description: {
			type: Sequelize.STRING,
		},
        features: {
			type: DataTypes.JSONB,
		},
		images: {
			type: DataTypes.JSONB,
		},
		logo: {
			type: DataTypes.JSONB,
		},
	}, {
		timestamps: true,
	},
	);
};
