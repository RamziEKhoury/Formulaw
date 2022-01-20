const DataTypes = require('sequelize');
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
        paymentId: {
            type: Sequelize.STRING,
        },
        paymentName: {
            type: Sequelize.STRING,
        },
        application_fee_percent: {
            type: Sequelize.STRING,
        },
        billing_cycle_anchor: {
            type: Sequelize.INTEGER,
        },
        billing_thresholds: {
            type: Sequelize.STRING,
        },
        canceled_at: {
            type: Sequelize.STRING,
        },
        cancel_at: {
            type: Sequelize.STRING,
        },
        cancel_at_period_end: {
            type: Sequelize.BOOLEAN,
        },
        collection_method: {
            type: Sequelize.STRING,
        },
        current_period_end: {
            type: Sequelize.INTEGER,
        },
        current_period_start: {
            type: Sequelize.INTEGER,
        },
        customer: {
            type: Sequelize.STRING,
        },
        days_until_due: {
            type: Sequelize.STRING,
        },
        default_payment_method: {
            type: Sequelize.STRING,
        },
        default_source: {
            type: Sequelize.STRING,
        },
        discount: {
            type: Sequelize.STRING,
        },
        ended_at: {
            type: Sequelize.STRING,
        },
        latest_invoice: {
            type: Sequelize.STRING,
        },
        livemode: {
            type: Sequelize.BOOLEAN,
        },
        next_pending_invoice_item_invoice: {
            type: Sequelize.STRING,
        },
		pause_collection: {
            type: Sequelize.STRING,
        },
        pending_invoice_item_interval: {
            type: Sequelize.STRING,
        },
        pending_setup_intent: {
            type: Sequelize.STRING,
        },
        pending_update: {
            type: Sequelize.STRING,
        },
        plan: {
            type: Sequelize.JSON,
			get() {
				return JSON.parse(this.getDataValue('plan'));
			},
			set(value) {
				return this.setDataValue('plan', JSON.stringify(value));
			},
        },
        quantity: {
            type: Sequelize.INTEGER,
        },
        schedule: {
            type: Sequelize.STRING,
        },
        start_date: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.STRING,
        },
        transfer_data: {
            type: Sequelize.STRING,
        },
        trial_end: {
            type: Sequelize.STRING,
        },
        trial_start: {
            type: Sequelize.STRING,
        },

	}, {
		timestamps: true,
	},
	);
};
