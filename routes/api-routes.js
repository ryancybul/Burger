// Grabs the orm from the config
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the burgers from the db. 
  app.get("/api/burgers", function(req, res) {
    // Retrieves all of the burgers from the database and res.json
    db.Burger.findAll({}).then((dbBurger) => {
      res.json(dbBurger);
    })
  });

  // POST route for adding a new burger to the db. 
  app.post("/api/newBurger", function(req, res) {
    // Adds a new burger and saves it to the database
    db.Burger.create({
      text: req.body.text,
      devoured: req.body.devoured
    }).then((dbBurger) => {
      //We have access to the new burger as an argument in the callback function.
      res.json(dbBurger);
    });
  });

  // PUT route for updating todos. We can access the updated todo in req.body
  app.put("/api/burgers/update", function(req, res) {
    console.log("ohhai");
    db.Burger.update({
      text: req.body.text,
      devoured: req.body.devoured
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(dbBurger) {
      res.redirect("/");
    });
  });
};
