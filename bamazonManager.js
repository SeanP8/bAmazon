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

function options() {
    inquirer.prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Re-Stock Inventory",
            "Add New Product",
            "Exit"
        ]
    }).then((a) => {
        determined(a);
    });
}

function determined(a) {
    switch (a.action) {
        case "View Products for Sale":
            products();
            break;

        case "View Low Inventory":
            lowInventory();
            break;

        case "Re-Stock Inventory":
            reStock();
            break;

        case "Add New Product":
            newProduct();
            break;

        case "Exit":
            process.exit();
    }
}

function products() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Id: " + res[i].item_id + " |/| IN:" + res[i].department_name + " || " + res[i].product_name + " |#| Units: " + res[i].stock_quantity + " |$$ Price: " + res[i].price);
        }
        options();
    });
}

function lowInventory() {
    inquirer.prompt({
        name: "number",
        input: "input",
        message: "Choose a low number inventory count?"
    }).then(function (answer) {
        q = ' select product_name, stock_quantity from products group by stock_quantity having sum(stock_quantity) < ' + answer.number;
        connection.query(q, function (err, res) {
            for (var i = 0; i < res.length; i++) {
                console.log("\n " + res[i].product_name + " || Quantity: " + res[i].stock_quantity + "\n");
            }
            options();
        })

    })

};

function reStock() {
    connection.query("SELECT * FROM products", function (err, results) {

        for (var i = 0; i < results.length; i++) {
            console.log(" " + results[i].product_name + "  || Units: " + results[i].stock_quantity);
        }
        {
            inquirer.prompt([
                {
                    name: "choice",
                    input: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].product_name);
                        }
                        return choiceArray;
                    },
                    message: "What item would you like to re-stock?"
                },
                {
                    name: "inventory",
                    type: "input",
                    message: "How many items of the product would you like to re-stock?",
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
                if (a.inventory) {
                    connection.query(`UPDATE products SET stock_quantity = stock_quantity + ${a.inventory} WHERE item_id = ${chosenItem.item_id}`,
                        function (err, res) {
                            console.log(`                     +++---=======-----======---=== +++
                    ++ The inventory has been updated! ++
                    +++=====-------=======-----======+++`);
                            connection.query(" SELECT stock_quantity * ? FROM products where item_id = ? ",
                                [a.inventory, chosenItem.item_id],
                                function (err, res) {
                                    console.log(res);
                                    options();
                                });
                        })
                } else {
                    console.log(`         =====-------=======-----======---===
                 enter a larger amount!
                 =====-------=======-----======---===`);
                    options();
                }
            });
        }
    });

};


// function newProduct(){
//     options();
// };

