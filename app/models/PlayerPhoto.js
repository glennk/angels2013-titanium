exports.definition = {
	config : {
		"columns" : {
			"id" : "int",
			"name" : "String",
		},
		"adapter" : {
			"type" : "angels_rest",
			 // Passed parameter processed when beforeModelCreate is called
            //'base_url': 'http://angelsprod-gkrondev.rhcloud.com/rest/player'
            //"url" : '/player/{id}/photo'
		}
	},
	
	extendModel : function(Model) {
		_.extend(Model.prototype, {
			// Extend, override or implement Backbone.Model
			
			url: function() {
				return '/player/' + this.get('id') + '/photo';
			}
			
		});

		return Model;
	},

	extendCollection : function(Collection) {
		_.extend(Collection.prototype, {
			// Extend, override or implement Backbone.Collection
		});

		return Collection;
	}
}