var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

//Connect to database
mongoose.connect( 'mongodb://localhost/peopleDB' );
var db = mongoose.connection;

//initialize auto increment plugin
autoIncrement.initialize(db);


//Schemas
var personSchema = new Schema({
	sn : {type: Schema.Types.Number, require: true, unique: true},
	fname: String,
	lname: String,
	email: String,
	phone: Number,
	dateAdded: { type: Date, default: Date.now }
});

personSchema.plugin( autoIncrement.plugin, { model: 'Person', field: 'sn' });

//Models
var PersonModel = db.model( 'Person', PersonSchema );

//Get a list of all books
app.get( '/api/books', function( request, response ) {
	return BookModel.find( function( err, books ) {
	if( !err ) {
		return response.send( books );
	} else {
		return console.log( err );
	}
	});
});

