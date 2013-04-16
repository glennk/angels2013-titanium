function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.playerdetails = Ti.UI.createWindow({
        title: "Player Details",
        backgroundColor: "#fff",
        id: "playerdetails"
    });
    $.addTopLevelView($.__views.playerdetails);
    $.__views.team_banner = Ti.UI.createImageView({
        left: 0,
        top: 0,
        id: "team_banner"
    });
    $.__views.playerdetails.add($.__views.team_banner);
    $.__views.name = Ti.UI.createLabel({
        font: {
            fontSize: "18dp",
            fontWeight: "normal"
        },
        textAlign: "left",
        id: "name"
    });
    $.__views.playerdetails.add($.__views.name);
    $.__views.height = Ti.UI.createLabel({
        font: {
            fontSize: "18dp",
            fontWeight: "normal"
        },
        textAlign: "left",
        left: 15,
        top: 40,
        id: "height"
    });
    $.__views.playerdetails.add($.__views.height);
    $.__views.weight = Ti.UI.createLabel({
        font: {
            fontSize: "18dp",
            fontWeight: "normal"
        },
        textAlign: "left",
        left: 15,
        top: 60,
        id: "weight"
    });
    $.__views.playerdetails.add($.__views.weight);
    $.__views.age = Ti.UI.createLabel({
        font: {
            fontSize: "18dp",
            fontWeight: "normal"
        },
        textAlign: "left",
        left: 15,
        top: 80,
        id: "age"
    });
    $.__views.playerdetails.add($.__views.age);
    $.__views.record = Ti.UI.createLabel({
        font: {
            fontSize: "18dp",
            fontWeight: "normal"
        },
        textAlign: "left",
        left: 15,
        top: 180,
        id: "record"
    });
    $.__views.playerdetails.add($.__views.record);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.setPlayer = function(player) {
        console.log("playerdetails.js//setPlayer()");
        $.weight.text = "set in function";
        console.log("here" + JSON.stringify(player));
        var obj = player.get("teamsId");
        Ti.API.info(JSON.stringify(obj, null, 2));
        $.name.text = player.get("lastname");
        $.age.text = "Team: " + obj.level;
        $.weight.text = "Weight: " + player.get("lastname");
        $.record.text = "Record";
        var image = "/" + obj.level + ".png";
        $.height.text = "Image: " + image;
        $.team_banner.image = image;
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;