module.exports = (sequelize, Sequelize) => {
	return sequelize.define('subscription_payment', {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		subscriptionId: {
			type: Sequelize.UUID,
		},
		userId: {
			type: Sequelize.UUID,
		},
		subscriptionStripeId: {
			type: Sequelize.STRING,
		},
		status: {
			type: Sequelize.ENUM('active', 'cancelled' ),
			defaultValue: 'active',
		},
	}, {
		timestamps: true,
	},
	);
};
