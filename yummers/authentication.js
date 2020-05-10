//If page needs a user to be logged in
exports.isPrivate = (req, res, next) => {
    if(req.session.user) {
        return next();
    }
    else {
        res.redirect('/login');
    }
}

//If page is public
exports.isPublic = (req, res, next) => {
    if(req.session.user) {
        res.redirect('/');
    }
    else {
        return next();
    }
}