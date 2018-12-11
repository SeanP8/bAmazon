var mysql = require("mysql");
var inquirer = require("inquirer");
require('dotenv').config();

//import as queries from ('./manQueries.js');

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

function options(){
    inquirer.prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product",
            "Exit"
        ]
    }).then((a)=>{
        determined(a);
    });
}

function determined(a){
    switch (a.action){
        case "View Products for Sale":
        products();
        break;

        case "View Low Inventory":
        lowInventory();
        break;

        case "Add to Inventory":
        addToI();
        break;

        case "Add New Product":
        newProduct();
        break;

        case "Exit":
        process.exit();
    }
}

function products(){
    connection.query("SELECT * FROM products", function(err, res){
        if(err) throw err;
        for(var i = 0; i<res.length; i++){
             console.log("Id: " + res[i].item_id + " |/| IN:" + res[i].department_name +" || " + res[i].product_name + " |#| Units: " + res[i].stock_quantity + " |$$ Price: " + res[i].price);
        }
options();
});
}

function lowInventory(){
    options();
};
function addToI(){
    options();
};
function newProduct(){
    options();
};