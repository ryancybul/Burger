// Grabs the orm from the config
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the burgers from the db. 
  app.get("/api/burgers", function(req, res) {
    // Retrieves all of the burgers from the database and res.json
    db.Burger.findAll({}).then((results) => {
      res.json(results);
    })
  });

  // POST route for adding a new burger to the db. 
  app.post("/api/burgers", function(req, res) {
    console.log('it works');
    // Adds a new burger and saves it to the database
    db.Burger.create({
      text: req.body.userInput,
      devoured: false
    }).then((response) => {
      res.json(response);
    });
  });

  // PUT route for updating todos. We can access the updated todo in req.body
  app.put("/api/burgers", function(req, res) {
    db.Todo.update({
      devoured: req.body.complete
    }, {
      where: {
        id: req.body.id
      }
    }).then((results) => {
      res.json(results);
    });
  });

};
