var express = require('express');
var router = express.Router();
const { initTracer }  = require("../lib/tracer");

const tracer = initTracer("express-app");

/* GET home page. */
router.get('/', function(req, res, next) {
	var span = tracer.startSpan("Express Span");

	span.setTag("index", "node");
	span.log({ title: "express" });

  	res.render('index', { title: 'Express' });

	span.finish();

});

router.get('/jaeger/first', function (req, res, next) {
	var span = tracer.startSpan("Jaeger Span");
	span.setTag("jaeger", "first");
	console.log('the response will be sent by the next function ...')
	next()
}, function (req, res) {
	const span = tracer.startSpan("Jaeger Second Span");
	span.setTag("jaeger", "second");
	res.send('Hello from B!');
	span.finish();
})

router.get('/jaeger/mysql', function(req, res, next){
	var span = tracer.startSpan("MySQL Connection");
	span.setTag("jaeger", "mysql", "database");
	var mysql = require('mysql')
	var connection = mysql.createConnection({
	  host     : '',
	  user     : '',
	  password : '',
	  database : ''
	});
	connection.connect()
	connection.query('SELECT * FROM testtable', function (err, result, fields) {
	  if (err) throw err;
	  console.log(result);
	})
	connection.end()
	res.send('MySQL connection checked!');
	span.finish();
})
module.exports = router;
