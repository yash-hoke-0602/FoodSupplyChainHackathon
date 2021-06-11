module.exports = (req, res, next) => {
    if (req.session.mobileNum == 'undefined') {
        // if user is not logged in send him to login page
        return res.redirect('/user/login');
    }
    next();
}