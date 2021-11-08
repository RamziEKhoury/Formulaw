module.exports = (sequelize, Sequelize) => {
	return sequelize.define('user', {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			allowNull: false,
			primaryKey: true,
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
		phoneNumber:{
			type: Sequelize.INTEGER,
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
		facebooktoken: {
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
