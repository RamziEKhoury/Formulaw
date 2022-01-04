module.exports = (sequelize, Sequelize) => {
	return sequelize.define('subUser', {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			allowNull: false,
			primaryKey: true,

		},
        userId: {
            type: Sequelize.UUID,
        },
        subscriptionId: {
            type: Sequelize.UUID,
        },
		durationType: {
            type: Sequelize.STRING,
		},
		subscriptionPlan: {
            type: Sequelize.STRING ,
		},  
        startingDate: {
            type: Sequelize.STRING,
        },
        endDate: {
            type: Sequelize.STRING,
        },
		numberOfMeeting: {
			type: Sequelize.INTEGER,
		},
		meetingPlan:{
			type: Sequelize.STRING,
		},
		

	}, {
		timestamps: true,
	},
	);
};
