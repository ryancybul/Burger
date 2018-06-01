$(document).ready(function() {
  //Variables
  let burgerInput = $("input.userInput");
  let burgerCont = $(".burger-container");
  let burgerDev = $(".burger-devoured");

  //Event listeners
  $(document).on("submit", ".form", insertBurger);

  //Array
  let burgers = [];

  //Runs the list on page load
  getBurgers();

    // This function constructs a burger-item row
    function createNewRow(burger) {
      var newBurger = $(
        [
          "<li class='list-group-item todo-item'>",
          "<span>",
          burger.text,
          "</span>",
          "<input type='text' class='edit' style='display: none;'>",
          "<button class='delete btn btn-danger'>Devour</button>",
          "</li>"
        ].join("")
      );
  
      newBurger.find("button.delete").data("id", burger.id);
      newBurger.find("input.edit").css("display", "none");
      newBurger.data("burger", burger);
      return newBurger;
    }

    //This function resets the list of burgers
    function initializeRows() {
      burgerCont.empty();
      var rowsToAdd = [];
      for (var i=0; i < burgers.length; i++){
        rowsToAdd.push(createNewRow(burgers[i]));
      }
      burgerCont.prepend(rowsToAdd);
    }

  //Gets the burgers from the database and updates the view
  function getBurgers(){
    $.get("/api/burgers", function(data){
      burgers = data;
      initializeRows();
    });
  }

  //This function inserts a new burger into the database.
  function insertBurger(event){
    event.preventDefault();
    let newBurger = {
      text: burgerInput.val().trim(),
      devoured: false
    };
  $.post("api/newBurger", newBurger, getBurgers);
  burgerInput.val("");
}
})