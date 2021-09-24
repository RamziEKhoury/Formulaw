const {Status} = require('../enum');
module.exports = (sequelize, Sequelize) => {
	return sequelize.define('users', {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		username: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		firstname: {
			type: Sequelize.STRING,
		},
		lastname: {
			type: Sequelize.STRING,
		},
		password: {
			type: Sequelize.STRING,
		},
		email: {
			type: Sequelize.STRING,
		},
		status: {
			type: Sequelize.ENUM(
				Status.NEW,
				Status.ONLINE,
				Status.OFFLINE,
				Status.DEACTIVATE,
			),
			defaultValue: Status.NEW,
		},
		roleId: {
			type: Sequelize.UUID,
		},
		roleName: {
			type: Sequelize.STRING,
		},
		isDeleted: {
			defaultValue: 0,
			type: Sequelize.INTEGER,
		},
		isActive: {
			defaultValue: 0,
			type: Sequelize.INTEGER,
		},
		activeDateAndTime: {
			type: Sequelize.STRING,
		},
		deActiveDateAndTime: {
			type: Sequelize.STRING,
		},
	});
};
