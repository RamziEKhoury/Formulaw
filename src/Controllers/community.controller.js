const db = require('../models');
const Community = db.community;
const CommunityType = db.communityType;
const apiResponses = require('../Components/apiresponse');

// community controller

module.exports.addcommunity = async (req, res) => {
	try {
		console.log(req.body);
		Community.create({
			id: req.body.id,
			titleOne: req.body.titleOne,
			titleTwo: req.body.titleTwo,
			description: req.body.description,
		}).then((community) => {
			const communityData = {
				id: community.id,
				titleOne: community.titleOne,
				titleTwo: community.titleTwo,
				description: community.description,
			};
			return apiResponses.successResponseWithData(
				res,
				'Community Created successfully!',
				communityData,
			);
		});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.viewcommunities = (req, res) => {
	Community.findAll()
		.then((communities) => {
			if (!communities) {
				return apiResponses.notFoundResponse(res, 'Data Not found.', null);
			}

			return apiResponses.successResponseWithData(
				res,
				'successfully found!',
				communities,
			);
		})
		.catch((err) => {
			return apiResponses.errorResponse(res, err.message, err);
		});
};

module.exports.viewcommunity = (req, res) => {
	Community.findOne({
		where: {
			id: req.params.id,
		},
	})
		.then((community) => {
			if (!community) {
				return apiResponses.notFoundResponse(res, 'Data Not found.', null);
			}

			return apiResponses.successResponseWithData(
				res,
				'successfully found!',
				community,
			);
		})
		.catch((err) => {
			return apiResponses.errorResponse(res, err.message, err);
		});
};

module.exports.updatecommunity = async (req, res) => {
	console.log(req.body);
	try {
		await Community.update(
			{
				titleOne: req.body.titleOne,
				titleTwo: req.body.titleTwo,
				description: req.body.description,
			},
			{where: {id: req.body.id}},
		)
			.then((community) => {
				if (!community) {
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}

				return apiResponses.successResponseWithData(res, 'Success', community);
			})
			.catch((err) => {
				return apiResponses.errorResponse(res, err.message, {});
			});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.deletecommunity = async (req, res) => {
	try {
		await Community.destroy({where: {id: req.params.id}});
		await CommunityType.destroy({where: {communityId: req.params.id}})
			.then((community) => {
				if (!community) {
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}

				return apiResponses.successResponseWithData(res, 'Success', community);
			})
			.catch((err) => {});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

// community type controllers

module.exports.addcommunity_type = async (req, res) => {
	try {
		console.log(req.body);
		CommunityType.create({
			id: req.body.id,
			communityId: req.body.communityId,
			title: req.body.title,
			instruction: req.body.instruction,
		}).then((communitytype) => {
			const communitytypeData = {
				id: communitytype.id,
				communityId: communitytype.communityId,
				title: communitytype.title,
				instruction: communitytype.instruction,
			};
			return apiResponses.successResponseWithData(
				res,
				'Community Created successfully!',
				communitytypeData,
			);
		});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.viewallcommunity_type = (req, res) => {
	CommunityType.findAll({
		where: {
			communityId: req.params.communityId,
		},
	})
		.then((community_type) => {
			if (!community_type) {
				return apiResponses.notFoundResponse(res, 'Data Not found.', null);
			}

			return apiResponses.successResponseWithData(
				res,
				'successfully found!',
				community_type,
			);
		})
		.catch((err) => {
			return apiResponses.errorResponse(res, err.message, err);
		});
};

module.exports.viewcommunity_type = (req, res) => {
	CommunityType.findOne({
		where: {
			id: req.params.id,
		},
	})
		.then((community_type) => {
			if (!community_type) {
				return apiResponses.notFoundResponse(res, 'Data Not found.', null);
			}

			return apiResponses.successResponseWithData(
				res,
				'successfully found!',
				community_type,
			);
		})
		.catch((err) => {
			return apiResponses.errorResponse(res, err.message, err);
		});
};

module.exports.updatecommunity_type = async (req, res) => {
	console.log(req.body);
	try {
		await CommunityType.update(
			{
				comunityId: req.body.communityId,
				title: req.body.title,
				instruction: req.body.instruction,
			},
			{where: {id: req.body.id}},
		)
			.then((community_type) => {
				if (!community_type) {
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}

				return apiResponses.successResponseWithData(
					res,
					'Success',
					community_type,
				);
			})
			.catch((err) => {
				return apiResponses.errorResponse(res, err.message, {});
			});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.deletecommunity_type = async (req, res) => {
	try {
		await CommunityType.destroy({where: {id: req.params.id}})
			.then((community_type) => {
				if (!community_type) {
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}

				return apiResponses.successResponseWithData(
					res,
					'Success',
					community_type,
				);
			})
			.catch((err) => {});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};
