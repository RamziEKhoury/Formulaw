const {UserRole} = require('../enum');
module.exports = (sequelize, Sequelize) => {
	return sequelize.define('user', {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		lawfirmid: {
			type: Sequelize.UUID,
		},
		fullname: {
			type: Sequelize.STRING,
		},
		password: {
			type: Sequelize.STRING,
		},
		email: {
			type: Sequelize.STRING,
		},
		phoneNumber: {
			type: Sequelize.STRING,
		},
		profilePic: {
			type: Sequelize.STRING,
		},
		country: {
			type: Sequelize.STRING,
		},
		city: {
			type: Sequelize.STRING,
		},
		userType: {
			type: Sequelize.ENUM('normal', 'google', 'facebook'),
			defaultValue: 'normal',
		},
		role: {
			type: Sequelize.ENUM(UserRole.USER, UserRole.LAWYER, UserRole.OTHERS),
			defaultValue: UserRole.USER,
		},
		facebooktoken: {
			type: Sequelize.STRING,
		},
		deviceToken: {
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
	});
};
