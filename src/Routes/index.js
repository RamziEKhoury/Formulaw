module.exports=(app)=> {
	require('./user.route')(app);
	require('./role.route')(app);
	require('./language.route')(app);
	require('./country.route')(app);
	require('./industrial.route')(app);
	require('./service.route')(app);
	require('./service-subcategory.route')(app);
	require('./lawFirm.route')(app);
	require('./request.route')(app);
	require('./appointment.route')(app);
};
