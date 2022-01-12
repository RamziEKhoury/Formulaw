const DataTypes = require('sequelize');
module.exports = (sequelize, Sequelize) => {
	return sequelize.define('Company_kyc', {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		userId: {
			type: Sequelize.UUID,
		},
		companyName: {
			type: Sequelize.STRING,
		},
        
        crNumber: {
			type: Sequelize.STRING,
		},
		passport: {
			type: Sequelize.STRING,
		},
        photo: {
			type: Sequelize.STRING,
		},
        officeaddressone: {
			type: Sequelize.STRING,
		},
		officeaddresstwo: {
			type: Sequelize.STRING,
		},
		officecountry: {
			type: Sequelize.STRING,
		},
		officecity: {
			type: Sequelize.STRING,
		},
		officepostalcode: {
			type: Sequelize.STRING,
		},
		addressone: {
			type: Sequelize.STRING,
		},
		addresstwo: {
			type: Sequelize.STRING,
		},
		country: {
			type: Sequelize.STRING,
		},
		city: {
			type: Sequelize.STRING,
		},
		postalcode: {
			type: Sequelize.STRING,
		},
        PhnNumber: {
			type: Sequelize.STRING,
		},
		status: {
            defaultValue: 'Pending',
            type: Sequelize.ENUM('Pending', 'Approved','Rejected'),
        },
        
	}, {
		timestamps: true,
	},
	);
};
