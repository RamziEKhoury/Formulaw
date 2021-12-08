module.exports = (sequelize, Sequelize) => {
	return sequelize.define('userSubScription', {
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
			type: Sequelize.STRING,
		},
		startingDate: {
			type: Sequelize.STRING,
		},
		endDate: {
			type: Sequelize.STRING,
		},
		numberOfMeating: {
			type: Sequelize.INTEGER,
		},
		meatingPlan: {
			type: Sequelize.STRING,
		},
		ipAudit: {
			type: Sequelize.BOOLEAN,
		},
		contractTemplates: {
			type: Sequelize.BOOLEAN,
		},
		discount: {
			type: Sequelize.INTEGER,
		},


	}, {
		timestamps: true,
	},
	);
};
