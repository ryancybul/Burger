// Grabs the orm from the config
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  //on page load or on redirects
  // app.get("/", (req, res) => {
  //   res.redirect("/burgers");
  // });

  // GET route for getting all of the burgers from the db. 
  app.get("/api/burgers", function(req, res) {
    // Retrieves all of the burgers from the database and res.json
    db.Burger.findAll({}).then((results) => {
      res.json(results);
    })
  });

  // POST route for adding a new burger to the db. 
  app.post("/api/newBurger", function(req, res) {
    // Adds a new burger and saves it to the database
    db.Burger.create({
      text: req.body.userInput,
      devoured: false
    }).then((response) => {
      res.redirect("/");
    });
  });

  // PUT route for updating todos. We can access the updated todo in req.body
  app.put("/api/burgers", function(req, res) {
    db.Burger.update({
      devoured: true
    }, {
      where: {
        id: req.body.id
      }
    }).then((results) => {
      res.redirect("/");
    });
  });
};
