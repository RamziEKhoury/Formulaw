module.exports = {
	HOST: '15.184.198.65',
	USER: 'postgres',
	PASSWORD: 'newpassword',
	DB: 'formula',
	dialect: 'postgres',
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
};
