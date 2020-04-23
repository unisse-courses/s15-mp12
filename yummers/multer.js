//file upload middleware
const multer = require('multer');

//storage settings (Location and filename) for user file upload
const storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, 'public/img/profiles/');
	},
	filename: function(req, file, callback) {
        var extension = file.mimetype.substring(6, file.mimetype.length);
		callback(null, req.params.userId + '.' + extension);
	}
});

//storage settings (Location and filename) for recipe upload
const storageRecipe = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, 'public/img/');
	},
	filename: function(req, file, callback) {
        var extension = file.mimetype.substring(6, file.mimetype.length);
		callback(null, 'recipe_' + req.body.recipeId + '.' + extension);
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

//uploader for recipe
const uploadRecipe = multer({
    storage: storageRecipe, 
    limits: limits, 
    fileFilter: fileFilter
});

module.exports = {upload, uploadRecipe};
