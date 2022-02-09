module.exports = (sequelize, Sequelize) => {
	return sequelize.define('blogs_category', {
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
		imagesUrl: {
			type: Sequelize.STRING,
		},
		iconsUrl: {
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
