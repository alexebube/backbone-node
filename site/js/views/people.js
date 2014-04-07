//site/js/views/library.js

var app = app || {};

app.PeopleView = Backbone.View.extend({
	
	el: '#peopleTable',

	initialize: function(initialPeople){
		this.collection = new app.People( initialPeople );
		this.render();

		this.listenTo(this.collection, 'add', this.renderPerson);
	},

	render: function(){
		this.collection.each(function(person) {
		this.renderPerson(person);
		}, this);

		return this;
	},

	renderPerson: function(person){

		var personView = new app.PersonView({ model:person });
		this.$el.append(personView.render().el);
	},

	events: {
		'click #add':'addPerson'
	},

	addPerson: function( e ){
		
		e.preventDefault();

		var formData = {};

		$('#addPerson').children('input').each(function(i, el){
			if( $( el ).val() != '' ){
				formData[ el.id ] = $( el ).val();
			}
		});
		this.collection.add(new app.Person( formData ));
	}
});