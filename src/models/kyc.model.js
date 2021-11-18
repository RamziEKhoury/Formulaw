const DataTypes = require('sequelize');
module.exports = (sequelize, Sequelize) => {
	return sequelize.define('kyc', {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		userId: {
			type: Sequelize.UUID,
		},
		passport: {
			type: Sequelize.STRING,
		},
        photo: {
			type: Sequelize.STRING,
		},
        ParmanentAddress: {
			type: Sequelize.STRING,
		},
        PhnNumber: {
			type: Sequelize.STRING,
		},
		status: {
            defaultValue: 'Pending',
            type: Sequelize.ENUM('Pending', 'Approved','Rejected'),
        },
        reason:{
            type: Sequelize.STRING,
        },
	}, {
		timestamps: true,
	},
	);
};
