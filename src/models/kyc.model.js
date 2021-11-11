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
        
        cr: {
			type: Sequelize.STRING,
		},
        idProof: {
			type: Sequelize.STRING,
		},
		addressProof: {
			type: Sequelize.STRING,
		},
		status: {
            defaultValue: 'pending',
            type: Sequelize.ENUM('pending', 'approved','rejected'),
        },
        reason:{
            type: Sequelize.STRING,
        },
	}, {
		timestamps: true,
	},
	);
};
