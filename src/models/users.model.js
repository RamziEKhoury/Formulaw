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
		lawyer_id: {
			type: Sequelize.UUID,
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
			type: Sequelize.ENUM('normal', 'google', 'facebook', 'linkedin'),
			defaultValue: 'normal',
		},
		role: {
			type: Sequelize.ENUM(UserRole.USER, UserRole.LAWYER, UserRole.LAWFIRM_ADMIN, UserRole.OTHERS),
			defaultValue: UserRole.USER,
		},
		facebooktoken: {
			type: Sequelize.STRING,
		},
		linkedin: {
			type: Sequelize.STRING,
		},
		isDeleted: {
			defaultValue: 0,
			type: Sequelize.INTEGER,
		},
		isSubscribed: {
			defaultValue: 0,
			type: Sequelize.INTEGER,
		},
		subscriptionEndAt: {
			type: Sequelize.STRING,
		},
		deviceToken: {
			type: Sequelize.STRING,
		},
		policy: {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
		},
		resetToken: {
			type: Sequelize.STRING,
		},
		expireToken: {
		    type: Sequelize.DATE,
	    },
		isActive: {
			defaultValue: 0,
			type: Sequelize.INTEGER,
		},
	});
};
