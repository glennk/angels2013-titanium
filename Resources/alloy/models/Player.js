exports.definition = {
    config: {
        adapter: {
            type: "angels_rest",
            url: "/player"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {
            fullname: function() {
                console.log("fullname" + this.get("lastname"));
                return this.get("firstname") + this.get("lastname");
            }
        });
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("Player", exports.definition, []);

collection = Alloy.C("Player", exports.definition, model);

exports.Model = model;

exports.Collection = collection;