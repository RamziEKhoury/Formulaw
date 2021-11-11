const multer = require('multer');
const path = require('path')
const apiResponses = require('./apiresponse')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/images'))
    },
    filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const multi_upload = multer({
    storage,
    limits: { fileSize: 1 * 1024 * 1024 * 1024},
    // fileFilter: (req, file, cb) => {
    //     if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"|| file.mimetype == "image/pdf") {
    //         cb(null, true);
    //     } else {
    //         cb(null, false);
    //         const err = new Error('Only .png, .jpg,.pdf and .jpeg format allowed!')
    //         err.name = 'ExtensionError'
    //         return cb(err);
    //     }
    // },
}).array('myfile')

module.exports = function(app) {
  app.post('/api/uploads', (req, res) => {
    multi_upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            console.log(err);
            res.status(500).send({ error: { message: `Multer uploading error: ${err.message}` } }).end();
            return;
        } else if (err) {
            // An unknown error occurred when uploading.
            if (err.name == 'ExtensionError') {
                res.status(413).send({ error: { message: err.message } }).end();
            } else {
                res.status(500).send({ error: { message: `unknown uploading error: ${err.message}` } }).end();
            }
            return;
        } 
let uploadedFiles = [];
if(!!req.files){
req.files.map((file,i)=>{
    uploadedFiles.push(file.filename)
})
}
        return apiResponses.successResponseWithData(
            res, 'Files uploaded successfully!', uploadedFiles,
        );
    })
})
}

// for single upload

// const single_upload = multer({
//     storage,
//     limits: { fileSize: 1 * 1024 * 1024 * 1024},
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//             cb(null, true);
//         } else {
//             cb(null, false);
//             const err = new Error('Only .png, .jpg and .jpeg format allowed!')
//             err.name = 'ExtensionError'
//             return cb(err);
//         }
//     },
// }).single('myfile')

// module.exports = function(app) {
//   app.post('/api/upload', (req, res) => {
//     single_upload(req, res, function (err) {
//         if (err instanceof multer.MulterError) {
//             // A Multer error occurred when uploading.
//             console.log(err);
//             res.status(500).send({ error: { message: `Multer uploading error: ${err.message}` } }).end();
//             return;
//         } else if (err) {
//             // An unknown error occurred when uploading.
//             if (err.name == 'ExtensionError') {
//                 res.status(413).send({ error: { message: err.message } }).end();
//             } else {
//                 res.status(500).send({ error: { message: `unknown uploading error: ${err.message}` } }).end();
//             }
//             return;
//         } 
// let uploadedFile = [];
// if(!!req.files){
//     uploadedFile.push(file.filename)
// }
//         return apiResponses.successResponseWithData(
//             res, 'Files uploaded successfully!', uploadedFile,
//         );
//     })
// })
// }