//Stew Towle and Matthew Roberts
//Server for Database website, uses express and node

const express = require('express');
const mysql = require('./dbcon.js');
const cors = require('cors');

const app = express();

const port = 3333;
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
	let insertVars = [req.body.name, req.body.description];
	mysql.pool.query(sqlQuery, insertVars, (err, rows, fields) => {
	    if (err){
		console.log("in outer", err);
		next(err);
		return
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
		return
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
});

app.post('/items', (req, res, next) => {
    console.log("got a post request");
    //console.log(req.body);
    let resultArray = [];
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
		    return
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
		    return
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
});

app.post('/customers', (req, res, next) => {
    console.log("got a post request");
    console.log(req.body);
    let resultArray = [];
    if (req.body.type == "displayAll"){
	console.log("we got request for data");
	mysql.pool.query("SELECT C.first_name, C.last_name, C.phone_number, C.email, \
					C.customer_id, A.street_address, A.city, A.state, A.zip_code, \
					A.unit, A.address_id, Z.zone_id \
					FROM Customers C \
					JOIN CustomerAddresses CA ON C.customer_id = CA.customer_id \
					JOIN Addresses A ON CA.address_id = A.address_id \
					LEFT JOIN Zones Z ON A.zone_id = Z.zone_id", (err, rows, fields) => {
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


app.listen(port, () => console.log('listening on port 3333'));
