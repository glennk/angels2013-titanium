// Global URL variable
var BASE_URL = 'http://angelsprod-gkrondev.rhcloud.com/rest';
// var BASE_URL = 'http://localhost:8080/myproj/rest';

// Override the Backbone.sync method with the following
module.exports.sync = function(method, model, options) {

	console.log('model.config.adapter.url: ' + model.config.adapter.url);
	if (model.url != undefined) {
		console.log('model.url() ' + model.url());
	}
    var payload = model.toJSON();
    		Ti.API.info(JSON.stringify(model, null, 2));

    console.log('payload[model] = ' + JSON.stringify(payload));
    var error;

    switch(method) {

        // This case is called by the Model.fetch and Collection.fetch methods to retrieve data.
        case 'read':
            // Use the idAttribute property in case the model ID is set to something else besides 'id'
            if (payload[model.idAttribute]) {
                // If we have an ID, fetch only one tweet
                var url = (model.url != undefined ? model.url() : model.config.adapter.url);
                console.log('url : ' + url);
                http_request('GET', BASE_URL + url, {id:payload[model.idAttribute]}, binary_callback);
            }
            else {
                // if not, fetch as many as twitter will allow us
                http_request('GET', BASE_URL + model.config.adapter.url, null, callback);
            }    
            break;

        // This case is called by the Model.save and Collection.create methods
        // to a initialize model if the IDs are not set.
        // For example, Model.save({text: 'Hola, Mundo'}) 
        // or Collection.create({text: 'Hola, Mundo'}) executes this code.
        case 'create':
            if (payload.text) {
                http_request('POST', BASE_URL + 'update.json', {status: payload.text}, callback);
            }    
            else {
                error = 'ERROR: Cannot create tweet without a status!';
            }
            break;

        // This case is called by the Model.destroy method to delete the model from storage.
        case 'delete':
            if (payload[model.idAttribute]) {
                // Twitter uses a POST method to remove a tweet rather than the DELETE method.
                http_request('POST', BASE_URL + 'destroy/' + payload[model.idAttribute] + '.json', null, callback);
            }
            else {
                error = 'ERROR: Model does not have an ID!';
            }
            break;

        // This case is called by the Model.save and Collection.create methods
        // to update a model if they have IDs set.
        case 'update':
            // Twitter does not have a call to change a tweet.
            error = 'ERROR: Update method is not implemented!';         
            break;
        default :
            error = 'ERROR: Sync method not recognized!';
    };

    if (error) {
        options.error(model, error, options);
        Ti.API.error(error);
        model.trigger('error');
    }
 
    // Simple default callback function for HTTP request operations.
    function callback(success, response, error) {	
    	console.log('angels_rest.js//callback//response: ' + response);
        res = JSON.parse(response);
        if (success) {
        	console.log('angels_rest.js//success!' + res.length);
        	
        	// _.each(res, function(item) {
				// console.log('angels_rest.js//item: ' + JSON.stringify(item));
			// });
        	
            // Calls the default Backbone success callback
            // and invokes a custom callback if options.success was defined.
            options.success(res);
            //options.success(res, JSON.stringify(res), options);
        }
        else {
            // res.errors is an object returned by the Twitter server
            var err = res.errors[0].message || error;
            Ti.API.error('ERROR: ' + err);
            // Calls the default Backbone error callback
            // and invokes a custom callback if options.error was defined.
            options.error(model, err, options);
            model.trigger('error');
        }
    };
 
    // Simple default callback function for HTTP request operations.
    function binary_callback(success, response, error) {	
    	console.log('angels_rest.js//binary_callback//response: ' + response.length);
        if (success) {
        	console.log('angels_rest.js//success!' + res.length);
        	
        	// _.each(res, function(item) {
				// console.log('angels_rest.js//item: ' + JSON.stringify(item));
			// });
        	
            // Calls the default Backbone success callback
            // and invokes a custom callback if options.success was defined.
            options.success(res);
            //options.success(res, JSON.stringify(res), options);
        }
        else {
            // res.errors is an object returned by the Twitter server
            var err = res.errors[0].message || error;
            Ti.API.error('ERROR: ' + err);
            // Calls the default Backbone error callback
            // and invokes a custom callback if options.error was defined.
            options.error(model, err, options);
            model.trigger('error');
        }
    };
 
};

// Helper function for creating an HTTP request
function http_request(method, url, payload, callback) {

    // Generates the OAuth header - code not included
    //var header = generate_header(method, url, payload);

    var client = Ti.Network.createHTTPClient({
        onload: function(e) {
        	if (callback) callback(true, this.responseText, null);
        },
        onerror: function(e) {
            if (callback) callback(false, this.responseText, e.error);
        },
        timeout : 60000
    });


    // Payload data needs to be included for the OAuth header generation,
    // but for GET methods, the payload data is sent as a query string
    // and needs to be appended to the base URL
    if (method == 'GET' && payload) {
        var values = [];        
        for (var key in payload) {
            values.push(key + '=' + payload[key]); 
        }            
        url = url + '?' + values.join('&');
        payload = null;
    }

	console.log('client.open(' + method + ', url: ' + url + ')');
    client.open(method, url);
    //client.setRequestHeader('Authorization', header);
    client.send(payload);    
};

// Perform some actions before creating the Model class
module.exports.beforeModelCreate = function(config, name) {
	//console.log('config for: ' + name);
    config = config || {};
    // If there is a base_url defined in the model file, use it
    if (config.adapter.base_url) {
        BASE_URL = config.adapter.base_url;
    }	
    return config;
};

// Perform some actions after creating the Model class 
module.exports.afterModelCreate = function(Model, name) {
    // Nothing to do
};
