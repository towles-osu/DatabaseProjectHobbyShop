//Stew Towle and Matthew Roberts
//Server for Database website, uses express and node

const express = require('express');
const mysql = require('./dbcon.js');
const cors = require('cors');

const app = express();

const port = 4003;
app.set('port', port);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());


app.get('/', function (req, res) {
    console.log("get called");
    res.send('/index.html');
});

app.post('/zones', (req, res, next) => {
    console.log("got a post request");
    console.log(req.body);
    let resultArray = [];
    if (req.body.type == "displayAll"){
	console.log("we got request for data");
	mysql.pool.query("SELECT * FROM Zones", (err, rows, fields) => {
	    if (err){
		next(err);
		return;
	    }
	    console.log(rows[0].zone_id);
	    for (i in rows){
		resultArray.push(rows[i]);
	    }
	    console.log(resultArray);
	    res.send(JSON.stringify(resultArray));
	});
    }
    else if (req.body.type == "add"){
	console.log("we got a request to add zone");
	let sqlQuery = "INSERT INTO Zones(`zone_name`, `zone_description`) VALUES (?, ?)";
	let insertVars = [(req.body.name) ? req.body.name : null, (req.body.description) ? req.body.description : null];
	mysql.pool.query(sqlQuery, insertVars, (err, rows, fields) => {
	    if (err){
		console.log("in outer", err);
		next(err);
		return;
	    }
	    mysql.pool.query("SELECT * FROM Zones", (err, rows, fields) => {
		if (err){
		    console.log("in inner", err);
		    next(err);
		    return;
		}
		console.log(rows[0].zone_id);
		for (i in rows){
		    resultArray.push(rows[i]);
		}
		console.log(resultArray);
		res.send(JSON.stringify(resultArray));
	    });
	});
			 
    }
    else if (req.body.type == "delete"){
	console.log("we got a request to delete zone");
	let sqlQuery = "DELETE FROM Zones WHERE zone_id = ?";
	console.log(req.body.zone_id);
	let insertVars = [req.body.zone_id];
	mysql.pool.query(sqlQuery, insertVars, (err, rows, fields) => {
	    if (err){
		console.log("in outer", err);
		next(err);
		return;
	    }
	    mysql.pool.query("SELECT * FROM Zones", (err, rows, fields) => {
		if (err){
		    console.log("in inner", err);
		    next(err);
		    return;
		}
//		console.log(rows[0].zone_id);
		for (i in rows){
		    resultArray.push(rows[i]);
		}
//		console.log(resultArray);
		res.send(JSON.stringify(resultArray));
	    });
	});
			 
    }
});

app.post('/solditems', (req, res, next) => {
    console.log("got a post request");
    console.log(req.body);
    let resultArray = [];
    if (req.body.type == "displayAll"){
	console.log("we got request for data");
	mysql.pool.query("SELECT * FROM SoldItems", (err, rows, fields) => {
	    if (err){
		next(err);
		return;
	    }
	    console.log(rows[0].zone_id);
	    for (i in rows){
		resultArray.push(rows[i]);
	    }
	    console.log(resultArray);
	    res.send(JSON.stringify(resultArray));
	});
    }
    else if (req.body.type == "add"){
	//console.log("we got a request to add zone");
	for (element in req.body) {

	    req.body[element] = (req.body[element] === "") ? null : req.body[element];
	    //the next three lines should be uncommented to block quantities of 0 in solditems
//	    if (element == "quant" && req.body[element] == 0){
//		req.body[element] = null;
//	    }
	}
	let sqlQuery = "INSERT INTO SoldItems(`purchase_number`, `sku`, `date_sold`, `quantity_ordered`, `customer_id`, `address_id`, `item_sent`, `item_delivered`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
	let insertVars = [req.body.purch_num, req.body.sku, req.body.date, req.body.quant, req.body.cust_id, req.body.add_id, req.body.sent, req.body.deliv]; 
	mysql.pool.query(sqlQuery, insertVars, (err, rows, fields) => {
	            if (err){
			    console.log("in outer", err);
			    next(err);
			    return;
			        }
	            mysql.pool.query("SELECT * FROM SoldItems", (err, rows, fields) => {
			    if (err){
				    console.log("in inner", err);
				    next(err);
				    return;
				}
			    //console.log(rows[0].zone_id);
			    for (i in rows){
				    resultArray.push(rows[i]);
				}
			    //console.log(resultArray);
			    res.send(JSON.stringify(resultArray));
			        });
	        });
	 
    }
    else if (req.body.type == "delete"){
	//console.log("we got a request to delete zone");
	let sqlQuery = "DELETE FROM SoldItems WHERE sku = ? AND purchase_number = ?";
	//console.log(req.body.sku);
	let insertVars = [req.body.sku, req.body.purch_num];
	mysql.pool.query(sqlQuery, insertVars, (err, rows, fields) => {
	            if (err){
			    console.log("in outer", err);
			    next(err);
			    return;
			        }
	            mysql.pool.query("SELECT * FROM SoldItems", (err, rows, fields) => {
			    if (err){
				    console.log("in inner", err);
				    next(err);
				    return;
				}
			    //console.log(rows[0].zone_id);
			    for (i in rows){
				    resultArray.push(rows[i]);
				}
			    //console.log(resultArray);
			    res.send(JSON.stringify(resultArray));
			        });
	        });
	 
    }
    else if (req.body.type == "filter"){
	let sqlQuery;
	if (req.body.filter == 'sku'){
	    sqlQuery = "SELECT * FROM SoldItems WHERE sku = ?";
	} else if (req.body.filter == 'date'){
	    sqlQuery = "SELECT * FROM SoldItems WHERE date_sold = ?";
	} else if (req.body.filter == 'purch_num'){
	    sqlQuery = "SELECT * FROM SoldItems WHERE purchase_number = ?";
	} else {
	    return;
	}
	let insertVars = [req.body.condition];
	mysql.pool.query(sqlQuery, insertVars, (err, rows, fields) => {
	    if (err){
		next(err);
		return;
	    }
	    console.log(rows);
	    for (i in rows){
		resultArray.push(rows[i]);
	    }
	    console.log(resultArray);
	    res.send(JSON.stringify(resultArray));
	});

    }
	else if (req.body.type == "update"){
		let sqlQuery = "UPDATE Items SET purchase_number = ?, sku = ?, date_sold = ?, quantity_ordered = ?, item_sent = ?, item_delivered = ? WHERE customer_id = ? AND address_id = ?;";
		let insertVars = [req.body.purch_num, req.body.sku, req.body.date, req.body.quant, req.body.sent, req.body.deliv, req.body.cust_id, req.body.add_id];
		mysql.pool.query(sqlQuery, insertVars, (err, rows, fields) => {
			if (err){
			next(err);
			return;
			}
			res.send("updated " + req.body.sku_origin);
		});
		}
});

app.post('/items', (req, res, next) => {
    console.log("got a post request");
    //console.log(req.body);
    let resultArray = [];
    for (element in req.body){
	req.body[element] = (req.body[element] === "") ? null : req.body[element];
    }
    if (req.body.type == "displayAll"){
	//console.log("we got request for data");
	mysql.pool.query("SELECT * FROM Items", (err, rows, fields) => {
	    if (err){
		next(err);
		return;
	    }
	    //console.log(rows[0].zone_id);
	    for (i in rows){
		resultArray.push(rows[i]);
	    }
	    //console.log(resultArray);
	    res.send(JSON.stringify(resultArray));
	});
    }
    else if (req.body.type == "add"){
	//console.log("we got a request to add zone");
	let sqlQuery = "INSERT INTO Items(`sku`, `item_name`, `quantity_available`, `price`) VALUES (?, ?, ?, ?)";
	let insertVars = [req.body.sku, req.body.name, req.body.quantity, req.body.price];
	mysql.pool.query(sqlQuery, insertVars, (err, rows, fields) => {
	        if (err){
		    console.log("in outer", err);
		    next(err);
		    return;
		        }
	        mysql.pool.query("SELECT * FROM Items", (err, rows, fields) => {
		    if (err){
			    console.log("in inner", err);
			    next(err);
			    return;
			}
		    //console.log(rows[0].zone_id);
		    for (i in rows){
			    resultArray.push(rows[i]);
			}
		    //console.log(resultArray);
		    res.send(JSON.stringify(resultArray));
		        });
	    });
	 
    }
    else if (req.body.type == "delete"){
	//console.log("we got a request to delete zone");
	let sqlQuery = "DELETE FROM Items WHERE sku = ?";
	//console.log(req.body.sku);
	let insertVars = [req.body.sku];
	mysql.pool.query(sqlQuery, insertVars, (err, rows, fields) => {
	        if (err){
		    console.log("in outer", err);
		    next(err);
		    return;
		        }
	        mysql.pool.query("SELECT * FROM Items", (err, rows, fields) => {
		    if (err){
			    console.log("in inner", err);
			    next(err);
			    return;
			}
		    //console.log(rows[0].zone_id);
		    for (i in rows){
			    resultArray.push(rows[i]);
			}
		    //console.log(resultArray);
		    res.send(JSON.stringify(resultArray));
		        });
	    });
	 
    }
    else if (req.body.type == "update"){
	let sqlQuery = "UPDATE Items SET sku = ?, item_name = ?, quantity_available = ?, price = ? WHERE sku = ?;";
	let insertVars = [req.body.sku, req.body.name, req.body.quantity, req.body.price, req.body.sku_origin];
	mysql.pool.query(sqlQuery, insertVars, (err, rows, fields) => {
	    if (err){
		next(err);
		return;
	    }
	    res.send("updated " + req.body.sku_origin);
	});
    }
});

app.post('/customers', (req, res, next) => {
    console.log("got a post request");
    console.log(req.body);
    for (element in req.body){
	req.body[element] = (req.body[element] === "") ? null : req.body[element];
    }
    let resultArray = [];
    if (req.body.type == "displayAll"){
	console.log("got request for diaplaying customers");
	mysql.pool.query("SELECT C.first_name, C.last_name, C.phone_number, C.email, C.customer_id, A.street_address, A.city, A.state, A.zip_code, A.unit, A.address_id, Z.zone_id FROM Customers C LEFT JOIN CustomerAddresses CA ON C.customer_id = CA.customer_id LEFT JOIN Addresses A ON CA.address_id = A.address_id LEFT JOIN Zones Z ON A.zone_id = Z.zone_id UNION SELECT C.first_name, C.last_name, C.phone_number, C.email, C.customer_id, A.street_address, A.city, A.state, A.zip_code, A.unit, A.address_id, Z.zone_id FROM Customers C LEFT JOIN CustomerAddresses CA ON C.customer_id = CA.customer_id RIGHT JOIN Addresses A ON CA.address_id = A.address_id LEFT JOIN Zones Z ON A.zone_id = Z.zone_id;", (err, rows, fields) => {
	    if (err){
		next(err);
		return;
	    }
	    console.log(rows[0].zone_id);
	    for (i in rows){
		resultArray.push(rows[i]);
	    }
	    console.log(resultArray);
	    res.send(JSON.stringify(resultArray));
	});
    }
    else if (req.body.type == "addCustAdd"){
	//special note: For customers page we do not return the display table on addition/deletion
	//and instead expect the customers.js page to make a second request to display all after requesting
	//insertion/deletion
	console.log("got request for adding customer and address");
	let sqlQuery = (req.body.zone_id) ? "INSERT INTO Addresses (street_address, unit, city, state, zip_code, zone_id) VALUES (?, ?, ?, ?, ?, ?);" : "INSERT INTO Addresses (street_address, unit, city, state, zip_code) VALUES (?, ?, ?, ?, ?);" ;
	let insertVars = (req.body.zone_id) ? [req.body.street_address, req.body.unit, req.body.city, req.body.state, req.body.zip_code, req.body.zone_id] : [req.body.street_address, req.body.unit, req.body.city, req.body.state, req.body.zip_code];
	mysql.pool.query(sqlQuery, insertVars, (err, rows, fields) => {
	    if (err) {
		next(err);
		return;
	    }
	    sqlQuery = "INSERT INTO Customers (first_name, last_name, phone_number, email) VALUES (?, ?, ?, ?)";
	    insertVars = [req.body.first_name, req.body.last_name, req.body.phone_number, req.body.email];
	    mysql.pool.query(sqlQuery, insertVars, (the_err, the_rows, the_fields) => {
		if (the_err) {
		    next(the_err);
		    return;
		}
		sqlQuery = "INSERT INTO CustomerAddresses (customer_id, address_id) VALUES ((SELECT customer_id FROM Customers ORDER BY customer_id DESC LIMIT 1), (SELECT address_id FROM Addresses ORDER BY address_id DESC LIMIT 1));";
		mysql.pool.query(sqlQuery, (last_err, last_rows, last_fields) => {
		    if (last_err){
			next(last_err);
			return;
		    }
		    res.send("no result");
		});
	    });

	});
    }
    else if (req.body.type == "addCust"){
	//adding a new customer, address_id will be empty or an id depending on if we shoudl connect it to an address
	let sqlQuery = "INSERT INTO Customers (first_name, last_name, phone_number, email) VALUES (?, ?, ?, ?);";
	let insertVars = [req.body.first_name, req.body.last_name, req.body.phone_number, req.body.email];
	mysql.pool.query(sqlQuery, insertVars, (err, rows, fields) => {
	    if (err) {
		next(err);
		return;
	    }
	    if (req.body.address_id){
		sqlQuery =  "INSERT INTO CustomerAddresses (customer_id, address_id) VALUES ((SELECT customer_id FROM Customers ORDER BY customer_id DESC LIMIT 1), ?)";
		insertVars = [req.body.address_id];
		mysql.pool.query(sqlQuery, insertVars, (err2, rows2, fields2) => {
		    if (err2) {
			next(err2);
			return;
		    }
		});
	    }
	    res.send("no result");
	});
    }
    else if (req.body.type == "addAdd"){
	let sqlQuery = (req.body.zone_id) ? "INSERT INTO Addresses (street_address, unit, city, state, zip_code, zone_id) VALUES (?, ?, ?, ?, ?, ?)" : "INSERT INTO Addresses (street_address, unit, city, state, zip_code) VALUES (?, ?, ?, ?, ?)";
	let insertVars = (req.body.zone_id) ? [req.body.street_address, req.body.unit, req.body.city, req.body.state, req.body.zip_code, req.body.zone_id] : [req.body.street_address, req.body.unit, req.body.city, req.body.state, req.body.zip_code]; 
	mysql.pool.query(sqlQuery, insertVars, (err, rows, fields) => {
	    if (err) {
		next(err);
		return;
	    }
	    if (req.body.customer_id){
		sqlQuery =  "INSERT INTO CustomerAddresses (customer_id, address_id) VALUES (?, (SELECT address_id FROM Addresses ORDER BY address_id DESC LIMIT 1))"
		insertVars = [req.body.customer_id];
		mysql.pool.query(sqlQuery, insertVars, (err2, rows2, fields2) => {
		    if (err2) {
			next(err2);
			return;
		    }
		});
	    }
	    res.send("no result");
	});
    }
    else if (req.body.type == "addRelationship"){
	let sqlQuery = "INSERT INTO CustomerAddresses (customer_id, address_id) VALUES (?, ?)";
	let insertVars = [req.body.customer_id, req.body.address_id];
	mysql.pool.query(sqlQuery, insertVars, (err, rows, fields) => {
	    if (err) {
		next(err);
		return;
	    }
	    res.send("no result");
	});
    }
    else if (req.body.type == "delete"){
	if (req.body.addId && req.body.custId){
	    //Deleting customer/address relationship
	    let sqlQuery = "DELETE FROM CustomerAddresses WHERE customer_id=? AND address_id=?;";
	    let insertVars = [req.body.custId, req.body.addId];
	    mysql.pool.query(sqlQuery, insertVars, (err, rows, fields) => {
		if (err) {
		    next(err);
		    return;
		}
		res.send("relationship deleted");
	    });
	} else if (req.body.addId){
	    let sqlQuery = "DELETE FROM Addresses WHERE address_id = ?;";
	    let insertVars = [req.body.addId];
	    mysql.pool.query(sqlQuery, insertVars, (err, rows, fields) => {
		if (err) {
		    next(err);
		    return;
		}
		res.send("address deleted");
	    });
	} else if (req.body.custId){
	    let sqlQuery = "DELETE FROM Customers WHERE customer_id = ?;";
	    let insertVars = [req.body.custId];
	    mysql.pool.query(sqlQuery, insertVars, (err, rows, fields) => {
		if (err) {
		    next(err);
		    return;
		}
		res.send("customer deleted");
	    });
	}
    }
});


app.use(function (req, res) {
    res.status(404);
    res.send('404');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.send('Error 500: Something went wrong in the code');
});


app.listen(port, () => console.log('listening on port', port));
