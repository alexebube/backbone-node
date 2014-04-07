// site/js/models/person.js

var app = app || {};

app.Person = Backbone.Model.extend({
 	defaults: {
 		sn:'',
 		fname: '',
 		lname: '',
 		email: '',
 		phone: '',
 		dateAdded: ''
 	}
 });