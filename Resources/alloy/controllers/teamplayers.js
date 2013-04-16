function Controller() {
    function filterByTeam(collection) {
        console.log("filterByTeam: " + teamId + ", collection.length: " + collection.length);
        filteredplayers = collection.filter(function(player) {
            return player.get("teamsId").idteams === teamId;
        });
        console.log("filteredplayers: " + filteredplayers.length);
        return filteredplayers;
    }
    function openPlayerDetails(e) {
        console.log("openPlayerDetails() called, e.index: " + e.index);
        var controller = Alloy.createController("playerdetails"), win = controller.getView();
        console.log("filteredplayers: " + filteredplayers.length);
        var players = filteredplayers, player = players[e.index];
        console.log("player(e.index): " + JSON.stringify(player));
        console.log("player lastname:" + player.get("lastname"));
        controller.setPlayer(player);
        var nav = Alloy.Globals.nav1;
        nav.open(win, {
            animated: !0
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    Alloy.Collections.instance("player");
    $.__views.win4 = Ti.UI.createWindow({
        id: "win4",
        title: "All Players"
    });
    $.addTopLevelView($.__views.win4);
    $.__views.mypv = Ti.UI.createTableView({
        id: "mypv"
    });
    $.__views.win4.add($.__views.mypv);
    var __alloyId21 = function(e) {
        var models = filterByTeam(Alloy.Collections.player), len = models.length, rows = [];
        for (var i = 0; i < len; i++) {
            var __alloyId16 = models[i];
            __alloyId16.__transform = {};
            var __alloyId17 = Ti.UI.createTableViewRow({
                height: "60dp",
                backgroundColor: "#fff",
                hasChild: !0,
                id: "row"
            });
            rows.push(__alloyId17);
            var __alloyId18 = Ti.UI.createLabel({
                bottom: "7dp",
                left: "70dp",
                font: {
                    fontSize: "16dp",
                    fonWeight: "normal"
                },
                id: "lastname",
                text: typeof __alloyId16.__transform.lastname != "undefined" ? __alloyId16.__transform.lastname : __alloyId16.get("lastname")
            });
            __alloyId17.add(__alloyId18);
            var __alloyId19 = Ti.UI.createLabel({
                top: "7dp",
                left: "50dp",
                font: {
                    fontSize: "24dp",
                    fontWeight: "bold"
                },
                id: "firstname",
                text: typeof __alloyId16.__transform.firstname != "undefined" ? __alloyId16.__transform.firstname : __alloyId16.get("firstname")
            });
            __alloyId17.add(__alloyId19);
            var __alloyId20 = Ti.UI.createLabel({
                top: "7dp",
                left: "7dp",
                font: {
                    fontSize: "24dp",
                    fonWeight: "normal"
                },
                id: "number",
                text: typeof __alloyId16.__transform.number != "undefined" ? __alloyId16.__transform.number : __alloyId16.get("number")
            });
            __alloyId17.add(__alloyId20);
        }
        $.__views.mypv.setData(rows);
    };
    Alloy.Collections.player.on("fetch destroy change add remove reset", __alloyId21);
    openPlayerDetails ? $.__views.mypv.addEventListener("click", openPlayerDetails) : __defers["$.__views.mypv!click!openPlayerDetails"] = !0;
    exports.destroy = function() {
        Alloy.Collections.player.off("fetch destroy change add remove reset", __alloyId21);
    };
    _.extend($, $.__views);
    var players = Alloy.Collections.player;
    exports.setTeam = function(team) {
        console.log("setTeam: " + JSON.stringify(team));
        $.win4.title = team.get("name");
        teamId = team.get("idteams");
        console.log("idteams:" + teamId);
        players.trigger("fetch");
    };
    $.win4.addEventListener("close", function() {
        console.log("close called");
        $.destroy();
    });
    var filteredplayers;
    __defers["$.__views.mypv!click!openPlayerDetails"] && $.__views.mypv.addEventListener("click", openPlayerDetails);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;