const DataTypes = require('sequelize');
module.exports = (sequelize, Sequelize) => {
	return sequelize.define('subscription', {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		title: {
			type: Sequelize.STRING,
		},
		description: {
			type: Sequelize.STRING,
		},
		durationType: {
			type: Sequelize.ENUM('Monthly', 'Yearly' ),
		},
		discountPercent: {
			type: Sequelize.STRING,
		},
		subscriptionType: {
			type: Sequelize.ENUM('Startup', 'Enterprise', 'Enterprise+' ),
		},
		price: {
			type: Sequelize.INTEGER,
		},
		currency: {
			type: Sequelize.STRING,
		},
		features: {
			type: DataTypes.JSONB,
		},
		numberOfMeeting: {
			type: Sequelize.INTEGER,
		},
		meetingPlan: {
			type: Sequelize.ENUM('Monthly', 'Yearly' ),
		},
		ipAudit: {
			type: Sequelize.BOOLEAN,
		},
		contractTemplates: {
			type: Sequelize.BOOLEAN,
		},
		contract_templates: {
			type: DataTypes.JSONB,
		},
		discount: {
			type: Sequelize.INTEGER,
		},
		images: {
			type: DataTypes.JSONB,
		},
		logo: {
			type: Sequelize.STRING,
		},
		sortnumber: {
			type: Sequelize.INTEGER,
		}
	}, {
		timestamps: true,
	},
	);
};
