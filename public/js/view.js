$(document).ready(function() {
    //Variables
    let burgerInput = $("input.userInput");
    let burgerCont = $(".burger-container");
    let burgerDev = $(".burger-devoured");

    //Event listeners
    $(document).on("submit", ".form", insertBurger);
    $(document).on("click", ".devour", updateDevoured)

    //Array
    let burgers = [];

    //Runs the list on page load
    getBurgers();

      // This function constructs a burger-item row
      function createNewRow(burger) {
        var newBurger = $(
          [
            "<li class='list-group-item burger'>",
            "<span>",
            burger.text,
            "</span>",
            "<input type='text' class='edit' style='display: none;'>",
            "<button class='delete btn btn-danger devour'>Devour</button>",
            "</li>"
          ].join("")
        );
    
        newBurger.find("button.delete").data("id", burger.id);
        newBurger.find("input.edit").css("display", "none");
        newBurger.data("burger", burger);
        return newBurger;
      }

      function createNewDevoured(burger) {
        var devouredBurger = $(
          [
            "<li class='list-group-item burger'>",
            "<span>",
            burger.text,
            "</span>",
            "<input type='text' class='edit' style='display: none;'>",
            "</li>"
          ].join("")
        );

        devouredBurger.find("input.edit").css("display", "none");
        devouredBurger.data("burger", devouredBurger);
        return devouredBurger;
      }

      //This function resets the list of burgers
      function initializeRows() {
        burgerCont.empty();
        burgerDev.empty();
        var rowsToAdd = [];
        var rowsToAddDev = [];
        for (var i=0; i < burgers.length; i++){
          if (burgers[i].devoured === false) {
            rowsToAdd.push(createNewRow(burgers[i]));
          } else {
            rowsToAddDev.push(createNewDevoured(burgers[i]));
          }
        }
        burgerCont.prepend(rowsToAdd);
        burgerDev.prepend(rowsToAddDev);
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

  //This function updates the burger as devoured
  function updateDevoured() {
    var burger = $(this).parent().data("burger");
    console.log("This is a burger: ", burger);
    burger.devoured = true;
    $.ajax({
      method: "PUT",
      url: "/api/update",
      data: burger
    })
    window.location.reload();
  }
})