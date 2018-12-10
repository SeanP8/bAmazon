var mysql = require("mysql");
var inquirer = require("inquirer");
require('dotenv').config();

var connection = mysql.createConnection({
  host: process.env.db_host,

  // Your port; if not 3306
  port: process.env.db_port,

  // Your username
  user: process.env.db_user,

  // Your password
  password: process.env.db_pass,
  database: process.env.db_name
});

connection.connect(function (err) {
  if (err) throw err;
  options();
});


function options() {
  inquirer.prompt({
    name: "action",
    type: "rawlist",
    message: "Do you want to make a purchase or exit?",
    choices: [
      "I would like to purchase something.",
      "I would like to exit"
    ]
  }).then(function (a) {
    determind(a);
  });
}

function determind(a) {
  switch (a.action) {
    case "I would like to purchase something.":
      purchase();
      break;

    case "I would like to exit":
      process.exit();
  }
}

function purchase() {
  // display items available for sale
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    for( var i = 0; i<results.length; i++){
      console.log("Id: " + results[i].item_id + " |/| IN:" + results[i].department_name +" || " + results[i].product_name + " |#| Units: " + results[i].stock_quantity + " |$$ Price: " + results[i].price);
    }
    {
    inquirer.prompt([
      {
        name: "choice",
        type: "rawlist",
        choices: function () {
          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
            choiceArray.push(results[i].product_name);

          }
          return choiceArray;
        },
        message: "What item would you like to purchase?"
      },
      {
        name: "units",
        type: "input",
        message: "How many units of the product would you like to buy?",
        validate: function (v) {
          if (isNaN(v) == false) {
            return true;
          } else {
            return false;
          }
        }
      }
    ]).then(function (a) {
      var chosenItem;
      for (var i = 0; i < results.length; i++) {
        if (results[i].product_name === a.choice) {
          chosenItem = results[i];
          console.log(chosenItem);
        }
      }
      if (chosenItem.stock_quantity > parseInt(a.units)) {
        connection.query(`UPDATE products SET stock_quantity = stock_quantity - ${a.units} WHERE item_id = ${chosenItem.item_id}`,
          // [
          //   ,

          // ],
          function (err, res) {
            if (err) throw err;
            console.log(`           =====-------=======-----======---===
            Your order was placed successfully!
            =====-------=======-----======---===`);
            connection.query(" SELECT price * ? FROM products where item_id = ? ",
              [a.units, chosenItem.item_id],
              function (err, res) {
                if (err) throw err;
                console.log(res);
                options();
              });
          })
      } else {
        console.log(`         =====-------=======-----======---===
        Insufficent quantity!
        =====-------=======-----======---===`);
        options();
      }

    });
    }
  });

}


//  
// out of the items displayed which ones do they want to buy

// after they choose the item_id, prompt how many they would like
// to buy out of stock_quantity

// if they choose a higher number from stock_quantity tell them
// Insufficient quantity

// if they choose a lower number from stock_quantity 
// update the database

// when order goes through display the cost of purchase