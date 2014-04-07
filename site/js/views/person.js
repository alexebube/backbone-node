//site/js/views/person.js

var app = app || {};

app.PersonView = Backbone.View.extend({
	
	tagName: 'tr',
	
	template: Handlebars.compile( $('#entry-template').html() ),
	
	render: function(){
		
		this.$el.html(this.template(this.model.toJSON()));

		return this;
	},

	events: {
		'click .delete': 'deletePerson'
	},
	
	deletePerson: function() {
		// Delete model
		this.model.destroy();
		// Delete view
		this.remove();
	}
})