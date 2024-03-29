const {TestimonialStatus} = require('../enum');
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
				type: Sequelize.STRING,
			},
			lawFirmId: {
				type: Sequelize.UUID,
			},
			lawyerid: {
				type: Sequelize.UUID,
			},
			appointmentid: {
				type: Sequelize.UUID,
			},
			testimonialdata: {
				type: Sequelize.STRING,
			},
			rating: {
				type: Sequelize.INTEGER,
			},
			status: {
				defaultValue: TestimonialStatus.PENDING,
				type: Sequelize.ENUM(
					TestimonialStatus.PENDING,
					TestimonialStatus.APPROVED,
				),
			},

			ratingstatus: {
				defaultValue: TestimonialStatus.PENDING,
				type: Sequelize.ENUM(
					TestimonialStatus.PENDING,
					TestimonialStatus.APPROVED,
				),
			},
		},
		{
			timestamps: true,
		},
	);
};
