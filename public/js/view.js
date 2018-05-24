import { NOTINITIALIZED } from "dns";

$(document).ready(function() {
  //Variables
  let burgerInput = $("input.new-burger");
  let burgerCont = $(".burger-container");
  let burgerDev = $(".burger-devoured");

  //Event listeners
  $(document).on("click")

  //Array
  let burgers = [];

  //Runs the list on page load
  getBurgers();

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

    // This function constructs a todo-item row
    function createNewRow(todo) {
      var $newInputRow = $(
        [
          "<li class='list-group-item todo-item'>",
          "<span>",
          todo.text,
          "</span>",
          "<input type='text' class='edit' style='display: none;'>",
          "<button class='delete btn btn-danger'>x</button>",
          "<button class='complete btn btn-primary'>✓</button>",
          "</li>"
        ].join("")
      );
  
  });
  