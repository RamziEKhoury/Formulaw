module.exports=(app)=> {
	require('./role.route')(app);
	require('./language.route')(app);
	require('./country.route')(app);
	require('./industrial.route')(app);
	require('./service.route')(app);
	require('./service-subcategory.route')(app);
	require('./lawFirm.route')(app);
	require('./request.route')(app);
	require('./lawFirm-industry.route')(app);
	require('./lawFirm-service.route')(app);
	require('./adminUser.route')(app);
	require('./user.route')(app);
	require('./appointment.route')(app);
	require('./lawFirm-tax.route')(app);
	require('./lawyer.route')(app);
	require('./testimonial.route')(app);
	require('./banner.route')(app);
	require('./subscription.route')(app);
	require('./Rooms.route')(app);
	require('./Streams.route')(app);
	require('./community.route')(app);
	require('./journey.route')(app);
	require('./kyc.route')(app);
	require('./multer.route')(app);
	require('./companyKyc.route')(app);
	require('./multer.route')(app);
	require('./chats.route')(app);
	require('./mobileVerify.route')(app);
	require('./preOrder.route')(app);
	require('./policy.route')(app);
	require('./userSubscription.route')(app);
	require('./notification.route')(app);
	require('./subscribeUser.route')(app);
	require('./message.router')(app);
	require('./dispute.route')(app);
	require('./customer.route')(app);
	require('./charge.route')(app);
	require('./allCountry.route')(app);
	require('./blogsCategory.route')(app);
	require('./blogs.route')(app);
	require('./seo.route')(app);
};
