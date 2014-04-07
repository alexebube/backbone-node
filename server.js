"use strict";

var application_root = __dirname,
	express = require('express'),
	path = require('path'),
	mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');


//Create server
var app = express();

// Configure server
app.configure(function () {
	//parses request body and populates request.body
	app.use(express.bodyParser());
	//checks request.body for HTTP method overrides
	app.use(express.methodOverride());
	//perform route lookup based on URL and HTTP method
	app.use(app.router);
	//Where to serve static content
	app.use(express.static(path.join(application_root, 'site')));
	//Show all errors in development
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

//Connect to database
mongoose.connect( 'mongodb://localhost/peopleDB' );
var db = mongoose.connection;

//initialize auto increment plugin
autoIncrement.initialize(db);

//Schemas
var personSchema = new Schema({
	sn : { type: Number, unique: true},
	fname: String,
	lname: String,
	email: String,
	phone: String,
	dateAdded: { type: Date, default: Date.now }
});

personSchema.plugin( autoIncrement.plugin, { model: 'Person', field: 'sn' });

//Models
var PersonModel = db.model( 'Person', personSchema );

app.get('/api', function(rep, res){
	res.send('Its working');
});

app.get('/api/people', function(rep, res){
	return PersonModel.find(function(err, people){
		if(!err){
			return res.send(people);
		} else {
			return console.log(err);
		}
	});
});

app.post('/api/people', function(req, res){
	var people = new PersonModel({
		fname: req.body.fname,
		lname: req.body.lname,
		email: req.body.email,
		phone: req.body.phone
	});
	people.save(function(err){
		if(!err) {
			return console.log('created');
		} else {
			return console.log(err);
		}
	});
	return res.send( people );
});

app.get('/api/people/:id', function(req, res){
	return PersonModel.findById(req.params.id, function(err, person){
		if(!err){
			return res.send(person);
		} else {
			return console.log(err);
		}
	});
});

app.put('/api/people/:id', function(req, res){
	return PersonModel.findById(req.params.id, function(err, person){
		person.fname = req.body.fname;
		person.lname = req.body.lname;
		person.email = req.body.email;
		person.phone = req.body.phone;

		return person.save(function(err){
			if(!err){
				console.log('Updated');
			} else {
				console.log(err);
			}
			return res.send(person);
		});
	});
});

app.delete( '/api/people/:id', function( req, res ) {
	return PersonModel.findById( req.params.id, function( err, person ) {
		return person.remove( function( err ) {
			if( !err ) {
				console.log( 'removed' );
				return response.send( '' );
			} else {
				console.log( err );
			}
		});
	});
});

//Start server
var port = 5000;
app.listen(port, function () {
	console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});