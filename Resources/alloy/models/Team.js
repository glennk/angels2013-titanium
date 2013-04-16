exports.definition = {
    config: {
        columns: {
            id: "int",
            name: "String",
            level: "String"
        },
        adapter: {
            type: "angels_rest",
            url: "/team"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("Team", exports.definition, []);

collection = Alloy.C("Team", exports.definition, model);

exports.Model = model;

exports.Collection = collection;