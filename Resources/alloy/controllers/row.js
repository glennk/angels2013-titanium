function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.row = Ti.UI.createTableViewRow({
        height: "60dp",
        backgroundColor: "#fff",
        className: "itemRow",
        hasChild: !0,
        hasDetail: !1,
        id: "row"
    });
    $.addTopLevelView($.__views.row);
    $.__views.fullname = Ti.UI.createLabel({
        top: "7dp",
        left: "50dp",
        font: {
            fontSize: "24dp",
            fontWeight: "bold"
        },
        id: "fullname",
        text: typeof $model.__transform.fullname != "undefined" ? $model.__transform.fullname : $model.get("fullname")
    });
    $.__views.row.add($.__views.fullname);
    $.__views.number = Ti.UI.createLabel({
        top: "7dp",
        left: "7dp",
        font: {
            fontSize: "24dp",
            fonWeight: "normal"
        },
        id: "number",
        text: typeof $model.__transform.number != "undefined" ? $model.__transform.number : $model.get("number")
    });
    $.__views.row.add($.__views.number);
    $.__views.nickname = Ti.UI.createLabel({
        bottom: "7dp",
        left: "70dp",
        font: {
            fontSize: "16dp",
            fonWeight: "normal"
        },
        id: "nickname",
        text: typeof $model.__transform.nickname != "undefined" ? $model.__transform.nickname : $model.get("nickname")
    });
    $.__views.row.add($.__views.nickname);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;