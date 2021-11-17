//Stew Towle and Matthew Roberts
//Server for Database website, uses express and node

const express = require('express');
const mysql = require('./dbcon.js');
const cors = require('cors');

const app = express();

const port = 3333;
app.set('port', port);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());


app.get('/', function (req, res) {
    console.log("get called");
    res.send('/index.html');
});

app.post('/zones', (req, res) => {
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
