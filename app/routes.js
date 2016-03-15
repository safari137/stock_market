var express         = require('express'),
    User            = require('./models/user'),
    userController  = require('./controllers/userController');

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/login");
    }
}
    
function routes(app, passport) {
    userController = new userController(passport);
    
    app.route("/") 
        .get(function(req, res) {
            res.render("index", {isAuthenticated: req.isAuthenticated()});
        });
    
    app.route("/login")
        .get(userController.startLogin)
        .post(userController.login);
        
    app.route("/signup")
        .get(userController.startSignup)
        .post(userController.signup);
}

module.exports = routes;