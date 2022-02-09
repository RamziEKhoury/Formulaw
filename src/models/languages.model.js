module.exports = (sequelize, Sequelize) => {
	return sequelize.define('language', {
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
		sortnumber: {
			type: Sequelize.INTEGER,
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
