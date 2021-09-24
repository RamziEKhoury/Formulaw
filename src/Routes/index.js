module.exports=(app)=> {
	require('./user.route')(app);
	require('./role.route')(app);
};
