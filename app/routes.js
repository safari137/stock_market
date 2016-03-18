function routes(app) {
    
    app.route("/") 
        .get(function(req, res) {
            res.render("index");
        });
}

module.exports = routes;