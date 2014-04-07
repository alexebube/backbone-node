//site/js/app.js

var app = app || {};

$(function(){

	var people = [
		{sn:'1',fname:'Alex',lname:'Obi',email:'alexobi@gmail.com',phone:'301-442-7620',dateAdded:'04/04/2014'},
		{sn:'2', fname:'John',lname:'Michael',email:'johnmichael@gmail.com', phone:'301-464-7680',dateAdded:'05/04/2014'},
	];

	new app.PeopleView(people);
});