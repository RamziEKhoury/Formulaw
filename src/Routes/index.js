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
};
