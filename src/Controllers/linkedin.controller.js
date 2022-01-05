const axios = require('axios');
const qs = require('query-string');
const apiResponses = require('../Components/apiresponse');
const urlToGetLinkedInAccessToken = 'https://www.linkedin.com/oauth/v2/accessToken';
const urlToGetUserProfile ='https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~digitalmediaAsset:playableStreams))';
const urlToGetUserEmail = 'https://api.linkedin.com/v2/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))';

module.exports.getUserCredentialsForCredentials = async (req, res) => {
	try {
		const code = req.query.code;
		console.log('code---->', code);
		await getAccessToken(code, res);
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};


// eslint-disable-next-line require-jsdoc
function getAccessToken(code, res) {
	let accessToken = null;
	const config = {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	};
	const parameters = {
		'grant_type': 'authorization_code',
		'code': code,
		'redirect_uri': 'http://localhost:8000/linkedin',
		'client_id': '7859exqpovqiy5',
		'client_secret': 'YJ5pLJxt2SN1wPVc',
	};
	axios
		.post(
			urlToGetLinkedInAccessToken,
			qs.stringify(parameters),
			config)
		.then(async (response) => {
			accessToken = response.data.access_token;
			if (!!accessToken) {
				await getUserProfile(accessToken, res);
			}
		})
		.catch((err) => {
			console.log('Error getting LinkedIn access token', err);
		});
	return accessToken;
}


// eslint-disable-next-line require-jsdoc
function getUserProfile(accessToken, res) {
	const userProfile = null;
	const config = {
		headers: {
			'Authorization': `Bearer ${accessToken}`,
		},
	};
	axios
		.get(urlToGetUserProfile, config)
		.then(async (response) => {
			const firstName = response.data.localizedFirstName;
			const lastName = response.data.localizedLastName;
			const linkedinId = response.data.id;
			const user = {
				firstName,
				lastName,
				linkedinId,
			};
			if (!!user) {
				await getUserEmail(accessToken, user, res);
			}
		})
		.catch((error) => console.log('Error grabbing user profile', error));
	return userProfile;
}


// eslint-disable-next-line require-jsdoc
function getUserEmail(accessToken, userProfile, res) {
	let email = null;
	const config = {
		headers: {
			'Authorization': `Bearer ${accessToken}`,
		},
	};
	axios
		.get(urlToGetUserEmail, config)
		.then((response) => {
			email = response.data.elements[0]['handle~'].emailAddress;
			if (!!email) {
				userBuilder(userProfile, email, res);
			}
		})
		.catch((error) => console.log('Error getting user email', error));
	return email;
}


// eslint-disable-next-line require-jsdoc
function userBuilder(userProfile, userEmail, res) {
	const final = {
		firstName: userProfile.firstName,
		lastName: userProfile.lastName,
		linkedinId: userProfile.linkedinId,
		profileImageURL: userProfile.profileImageURL,
		email: userEmail,
	};
	apiResponses.successResponseWithData(res, 'success', final);
}
