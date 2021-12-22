module.exports = (sequelize, Sequelize) => {
	return sequelize.define('PreOrder', {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},

		queryId: {
			type: Sequelize.UUID,
		},
		appointmentId: {
			type: Sequelize.UUID,
		},
		topic: {
			type: Sequelize.STRING,
		},
		furtherInformation: {
			type: Sequelize.STRING,
		},
		document: {
			type: Sequelize.STRING,
		},

	}, {
		timestamps: true,
	},
	);
};
