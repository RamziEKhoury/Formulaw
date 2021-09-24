module.exports = (sequelize, Sequelize) => {
	return sequelize.define('roles', {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		title: {
			type: Sequelize.STRING,
			allowNull: false,
			primaryKey: true,
			unique: true,

		},
		isDeleted: {
			defaultValue: 0,
			type: Sequelize.INTEGER,
		},
		isActive: {
			defaultValue: 1,
			type: Sequelize.INTEGER,
		},
	});
};
