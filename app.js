var inquirer = require("inquirer");
var connection = require('./connection');
const viewOptions = [
    "View Departments",
    "View Roles",
    "View Employees",
    "exit"
]

runSearch();

function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: viewOptions
        })
        .then(function (answer) {
            switch (answer.action) {
                case viewOptions[0]:
                    departmentView();
                    break;

                case viewOptions[1]:
                    roleView();
                    break;

                case viewOptions[2]:
                    employeeView();
                    break;
                case viewOptions[3]:
                    connection.end();
                    break
            }
        })
}

function departmentView() {
    var sqlStr = "SELECT * FROM department";
    connection.query(sqlStr, function (err, result) {
        if (err) throw err;

        console.table(result)
        runSearch();
    })
}
function employeeView() {
    var sqlStr = "SELECT * FROM employee ";
    sqlStr += "LEFT JOIN role ";
    sqlStr += "ON employee.role_id = role.id"
    connection.query(sqlStr, function (err, result) {
        if (err) throw err;

        console.table(result)
        runSearch();
    })
}
function roleView() {
    var sqlStr = "SELECT * FROM role";
    connection.query(sqlStr, function (err, result) {
        if (err) throw err;

        console.table(result)
        runSearch();
    })
}


const addFlavor = () => {
    const query = connection.query(
        "INSERT INTO products SET ?",
        {
            flavor: "rocky road",
            price: 3.99,
            quantity: 135
        },
//put this stuff into our products table
//then write call back function to tell us if there's error
        (err, res) => {
            if (err) {
                throw err;
            }
           
            console.table(res);
        }
    );
    console.log(query.sql)
    //tells what query it's running and sending to the sql server
}

connection.connect((err) => {
    if (err) {
        throw err;
    }
    //everything we do has to be in the connection.connect()
     // addFlavor()
     addFlavor();
     
});


const updateFlavor = () => {
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            //correspond to first question mark
            {
                quantity: 50
            },
            //correspond to second
            {
                flavor: "vanilla"
            }
        ],
        (err, res)=> {
            if (err) {
                throw err;
            }
            //updateFlavor();
            updateFlavor();

            console.log(res);
            connection.end();
        }
        
    );
}
const deleteFlavor = (id) => {
    connection.query(
        "DELETE FROM products WHERE ?",
        [
            id: id
        ],
        (err, res)=> {
            if (err) {
                throw err;
        }
        deleteFlavor(5);
        deleteFlavor(6);
    )
}