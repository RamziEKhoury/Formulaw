module.exports = (sequelize, Sequelize) => {
	return sequelize.define('charge', {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		customer: {
			type: Sequelize.STRING,
		},
		chargeId: {
			type: Sequelize.STRING,
		},
		customerid: {
			type: Sequelize.UUID,
		},
		appointmentId: {
			type: Sequelize.UUID,
		},
		queryId: {
			type: Sequelize.UUID,
		},
		object: {
			type: Sequelize.STRING,
		},
		amount: {
			type: Sequelize.INTEGER,
		},
		amount_captured: {
			type: Sequelize.INTEGER,
		},
		amount_refunded: {
			type: Sequelize.INTEGER,
		},
		application: {
			type: Sequelize.STRING,
		},
		application_fee: {
			type: Sequelize.INTEGER,
		},
		application_fee_amount: {
			type: Sequelize.INTEGER,
		},
		balance_transaction: {
			type: Sequelize.STRING,
		},
		billing_details: {
			type: Sequelize.JSON,
			get() {
				return JSON.parse(this.getDataValue('billing_details'));
			},
			set(value) {
				return this.setDataValue('billing_details', JSON.stringify(value));
			},
		},
		calculated_statement_descriptor: {
			type: Sequelize.STRING,
		},
		captured: {
			type: Sequelize.BOOLEAN,
		},
		currency: {
			type: Sequelize.STRING,
		},
		description: {
			type: Sequelize.STRING,
		  },
		destination: {
			type: Sequelize.STRING,
		  },
		dispute: {
			type: Sequelize.STRING,
		},
		disputed: {
			type: Sequelize.BOOLEAN,
		},
		failure_code: {
			type: Sequelize.STRING,
		},
		failure_message: {
			type: Sequelize.STRING,
		},
		fraud_details: {
			type: Sequelize.JSON,
			get() {
				return JSON.parse(this.getDataValue('fraud_details'));
			},
			set(value) {
				return this.setDataValue('fraud_details', JSON.stringify(value));
			},
		},
		invoice: {
			type: Sequelize.STRING,
		},
		livemode: {
			type: Sequelize.BOOLEAN,
		},
		metadata: {
			type: Sequelize.JSON,
			get() {
				return JSON.parse(this.getDataValue('metadata'));
			},
			set(value) {
				return this.setDataValue('metadata', JSON.stringify(value));
			},
		},
		on_behalf_of: {
			type: Sequelize.STRING,
		},
		order: {
			type: Sequelize.STRING,
		},
		outcome: {
			type: Sequelize.JSON,
			get() {
				return JSON.parse(this.getDataValue('outcome'));
			},
			set(value) {
				return this.setDataValue('outcome', JSON.stringify(value));
			},
		},
		paid: {
			type: Sequelize.BOOLEAN,
		},
		payment_intent: {
			type: Sequelize.STRING,
		},
		payment_method: {
			type: Sequelize.STRING,
		},
		payment_method_details: {
			type: Sequelize.JSON,
			get() {
				return JSON.parse(this.getDataValue('payment_method_details'));
			},
			set(value) {
				return this.setDataValue('payment_method_details', JSON.stringify(value));
			},
		},
		receipt_email: {
			type: Sequelize.STRING,
		},
		receipt_number: {
			type: Sequelize.INTEGER,
		},
		receipt_url: {
			type: Sequelize.STRING,
		},
		refunded: {
			type: Sequelize.BOOLEAN,
		},
		refunds: {
			type: Sequelize.JSON,
			get() {
				return JSON.parse(this.getDataValue('refunds'));
			},
			set(value) {
				return this.setDataValue('refunds', JSON.stringify(value));
			},
		},
		review: {
			type: Sequelize.STRING,
		},
		shipping: {
			type: Sequelize.STRING,
		},
		source: {
			type: Sequelize.JSON,
			get() {
				return JSON.parse(this.getDataValue('source'));
			},
			set(value) {
				return this.setDataValue('source', JSON.stringify(value));
			},
		},
		source_transfer: {
			type: Sequelize.STRING,
		},
		statement_descriptor: {
			type: Sequelize.STRING,
		},
		statement_descriptor_suffix: {
			type: Sequelize.STRING,
		},
		status: {
			type: Sequelize.STRING,
		},
		transfer_data: {
			type: Sequelize.STRING,
		},
		transfer_group: {
			type: Sequelize.STRING,
		},
		type: {
			type: Sequelize.ENUM('Lead', 'Subscription'),
			defaultValue: 'Lead',
		},
	}, {
		timestamps: true,
	},
	);
};
