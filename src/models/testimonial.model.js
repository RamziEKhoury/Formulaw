module.exports = (sequelize, Sequelize) => {
	return sequelize.define(
		'testimonial',
		{
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			userId: {
				type: Sequelize.UUID,
			},
			orderId: {
				type: Sequelize.UUID,
			},
			lawFirmId: {
				type: Sequelize.STRING,
			},
			testimonialdata: {
				type: Sequelize.STRING,
			},
			rating: {
				type: Sequelize.STRING,
			},
		},
		{
			timestamps: true,
		},
	);
};
