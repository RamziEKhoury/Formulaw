const DataTypes = require('sequelize');
module.exports = (sequelize, Sequelize) => {
	return sequelize.define('blogs', {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
        blogCategoryId: {
            type: Sequelize.UUID,
        },
        userId: {
            type: Sequelize.UUID,
        },
		title: {
			type: Sequelize.STRING,
		},
        description: {
			type: DataTypes.STRING(2048),
		},
		imagesUrls: {
			type: DataTypes.JSONB,
		},
        type: {
            type: Sequelize.STRING,
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
