function http_request(method, url, payload, callback) {
    var client = Ti.Network.createHTTPClient({
        onload: function(e) {
            callback && callback(!0, this.responseText, null);
        },
        onerror: function(e) {
            callback && callback(!1, this.responseText, e.error);
        },
        timeout: 6000
    });
    if (method == "GET" && payload) {
        var values = [];
        for (var key in payload) values.push(key + "=" + payload[key]);
        url = url + "?" + values.join("&");
        payload = null;
    }
    console.log("client.open(" + method + ", url: " + url + ")");
    client.open(method, url);
    client.send(payload);
}

var BASE_URL = "http://angelsbeta-gkrondev.rhcloud.com/rest";

module.exports.sync = function(method, model, options) {
    function callback(success, response, error) {
        console.log("angels_rest.js//response: " + response);
        res = JSON.parse(response);
        if (success) {
            console.log("angels_rest.js//success!" + res.length);
            _.each(res, function(item) {
                console.log("angels_rest.js//item: " + JSON.stringify(item));
            });
            options.success(res, JSON.stringify(res), options);
        } else {
            var err = res.errors[0].message || error;
            Ti.API.error("ERROR: " + err);
            options.error(model, err, options);
            model.trigger("error");
        }
    }
    var payload = model.toJSON(), error;
    switch (method) {
      case "read":
        payload[model.idAttribute] ? http_request("GET", BASE_URL + model.config.adapter.url + "/1", {
            id: payload[model.idAttribute]
        }, callback) : http_request("GET", BASE_URL + model.config.adapter.url, null, callback);
        break;
      case "create":
        payload.text ? http_request("POST", BASE_URL + "update.json", {
            status: payload.text
        }, callback) : error = "ERROR: Cannot create tweet without a status!";
        break;
      case "delete":
        payload[model.idAttribute] ? http_request("POST", BASE_URL + "destroy/" + payload[model.idAttribute] + ".json", null, callback) : error = "ERROR: Model does not have an ID!";
        break;
      case "update":
        error = "ERROR: Update method is not implemented!";
        break;
      default:
        error = "ERROR: Sync method not recognized!";
    }
    if (error) {
        options.error(model, error, options);
        Ti.API.error(error);
        model.trigger("error");
    }
};

module.exports.beforeModelCreate = function(config, name) {
    config = config || {};
    config.adapter.base_url && (BASE_URL = config.adapter.base_url);
    return config;
};

module.exports.afterModelCreate = function(Model, name) {};