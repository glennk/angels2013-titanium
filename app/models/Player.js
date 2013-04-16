exports.definition = {
	config : {

		"adapter" : {
			"type" : "angels_rest",
			 // Passed parameter processed when beforeModelCreate is called
            //'base_url': 'http://angelsprod-gkrondev.rhcloud.com/rest/player'
            "url" : '/player'
		}
	},
	
	extendModel : function(Model) {
		_.extend(Model.prototype, {
			// Extend, override or implement Backbone.Model
			fullname: function() {
				console.log('fullname' + this.get("lastname"));
				return this.get('firstname') + this.get('lastname');
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