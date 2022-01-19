module.exports = (sequelize, Sequelize) => {
	return sequelize.define('customer', {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		customerId: {
			type: Sequelize.STRING,
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
		address: {
			type: Sequelize.JSON,
			allowNull: false,
			get() {
				return JSON.parse(this.getDataValue('address'));
			},
			set(value) {
				return this.setDataValue('address', JSON.stringify(value));
			},
		},
		balance: {
			type: Sequelize.INTEGER,
		},
		currency: {
			type: Sequelize.STRING,
		},
		default_source: {
			type: Sequelize.STRING,
		},
		delinquent: {
			type: Sequelize.BOOLEAN,
		},
		description: {
			type: Sequelize.STRING,
		},
		discount: {
			type: Sequelize.INTEGER,
		  },
		email: {
			type: Sequelize.STRING,
		  },
		invoice_prefix: {
			type: Sequelize.STRING,
		},
		invoice_setting: {
			type: Sequelize.JSON,
			get() {
				return JSON.parse(this.getDataValue('invoice_setting'));
			},
			set(value) {
				return this.setDataValue('invoice_setting', JSON.stringify(value));
			},
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
		name: {
			type: Sequelize.STRING,
		},
		phone: {
			type: Sequelize.INTEGER,
		},
		preferred_locales: {
			type: Sequelize.JSONB,
		},
		shipping: {
			type: Sequelize.STRING,
		},
		tax_exempt: {
			type: Sequelize.STRING,
		},
	}, {
		timestamps: true,
	},
	);
};
