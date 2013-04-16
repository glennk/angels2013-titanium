function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.trow = Ti.UI.createTableViewRow({
        height: "60dp",
        backgroundColor: "#fff",
        className: "itemRow",
        hasChild: !0,
        id: "trow"
    });
    $.addTopLevelView($.__views.trow);
    $.__views.name = Ti.UI.createLabel({
        top: "7dp",
        left: "5dp",
        font: {
            fontSize: "24dp",
            fontWeight: "bold"
        },
        id: "name",
        text: typeof $model.__transform.name != "undefined" ? $model.__transform.name : $model.get("name")
    });
    $.__views.trow.add($.__views.name);
    $.__views.level = Ti.UI.createLabel({
        bottom: "7dp",
        left: "70dp",
        font: {
            fontSize: "16dp",
            fonWeight: "normal"
        },
        id: "level",
        text: typeof $model.__transform.level != "undefined" ? $model.__transform.level : $model.get("level")
    });
    $.__views.trow.add($.__views.level);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;