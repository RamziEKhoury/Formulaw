const multer = require('multer');
const path = require('path');
const apiResponses = require('./apiresponse');

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, path.join(__dirname, '../Public/Images'));
	},
	filename: function(req, file, cb) {
		const stamp = Math.floor(Math.random() * (999 - 100 + 1) + 100)
		cb(
			null,
			path.parse(file.originalname).name +"-"+Date.now() + path.extname(file.originalname),
		);
	},
});

const multi_upload = multer({
	storage,
	limits: {fileSize: 1 * 1024 * 1024 * 1024},
}).array('myfile');

module.exports.fileUpload = async (req, res) => {
	multi_upload(req, res, function(err) {
		if (err instanceof multer.MulterError) {
			console.log(err);
			res
				.status(500)
				.send({error: {message: `Multer uploading error: ${err.message}`}})
				.end();
			return;
		} else if (err) {
			// An unknown error occurred when uploading.
			if (err.name == 'ExtensionError') {
				res
					.status(413)
					.send({error: {message: err.message}})
					.end();
			} else {
				res
					.status(500)
					.send({
						error: {message: `unknown uploading error: ${err.message}`},
					})
					.end();
			}
			return;
		}
		const uploadedFiles = [];
		if (!!req.files) {
			req.files.map((file, i) => {
				uploadedFiles.push(file.filename);
			});
		}
		return apiResponses.successResponseWithData(
			res,
			'Files uploaded successfully!',
			uploadedFiles,
		);
	});
};
