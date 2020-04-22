//file upload middleware
const multer = require('multer');

//storage settings (Location and filename)
const storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, 'public/img/profiles/');
	},
	filename: function(req, file, callback) {
        var extension = file.mimetype.substring(6, file.mimetype.length);
		callback(null, req.params.userId + '.' + extension);
	}
});

//file size limit set to 5mb
const limits = {
    fileSize: 1024 * 1024 * 5
}

//Accept jpeg and png types only
const fileFilter = (req, file, callback) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callback(null, true);
    }
    else {
        callback(null, false);
    }
};

const upload = multer({
    storage: storage, 
    limits: limits, 
    fileFilter: fileFilter
});

module.exports = upload;
