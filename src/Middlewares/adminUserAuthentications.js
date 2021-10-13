const jwt = require('jsonwebtoken');
const apiResponse = require('../Components/apiresponse');
require('dotenv').config();

function detailsByJwt(req) {
	const {secret} = process.env;
	if (req.headers && req.headers.authorization) {
		const {authorization} = req.headers;
		let decoded;
		decoded = jwt.verify(authorization, secret);
		return {
			_id: decoded._id,
			userName: decoded.userName,
			role: decoded.role,
		};
	}
	return 'something went wrong';
}

module.exports = {
	createToken: (_id, userName, role) => {
		const {secret} = process.env;
		return jwt.sign({userName, role, _id}, secret);
	},

	userAuth: (req, res, next) => {
		const {secret} = process.env;
		const token = req.headers['x-access-token'] || req.headers.authorization; // Express headers are auto converted to lowercase
		if (token) {
			jwt.verify(token, secret, (err, decoded) => {
				if (err) {
					return apiResponse.authenticationToken(res, 'Authentication Token Is Not Valid');
				}
				const userData = detailsByJwt(req);
				if (userData.role === 'admin' || userData.role === 'superAdmin') {
					req.decoded = decoded;
					next();
				} else {
					return apiResponse.authenticationToken(res, 'Forbidden for your role');
				}
			});
		} else {
			return apiResponse.authenticationToken(res, 'Authentication Token Is Not Supplied');
		}
	},
};
