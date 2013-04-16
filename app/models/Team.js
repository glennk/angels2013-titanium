exports.definition = {
	config : {
		"columns" : {
			"id" : "int",
			"name" : "String",
			"level" : "String"
		},
		"adapter" : {
			"type" : "angels_rest",
			// Passed parameter processed when beforeModelCreate is called
			//'base_url' : 'http://angelsprod-gkrondev.rhcloud.com/rest/team',
			'url' : '/team'
		}
	},

	extendModel : function(Model) {
		_.extend(Model.prototype, {
			// Extend, override or implement Backbone.Model
			// url: function() {
				// return '/team';
			// }
		});

		return Model;
	},

	extendCollection : function(Collection) {
		_.extend(Collection.prototype, {
			// Extend, override or implement Backbone.Collection
			// url: function() {
				// return '/teams';
			// }
		});

		return Collection;
	}
}