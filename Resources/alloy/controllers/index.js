function Controller() {
    function transformData(model) {
        var attrs = model.toJSON();
        attrs.fullname = attrs.firstname + " " + attrs.lastname;
        attrs.nickname = "Nickname: " + attrs.nickname;
        return attrs;
    }
    function openTeamPlayers(e) {
        console.log("openTeamPlayers() called, e.index: " + e.index);
        var controller = Alloy.createController("teamplayers", {
            teamdId: 4
        }), win = controller.getView(), teams = Alloy.Collections.team, team = teams.at(e.index);
        console.log("team(e.index:" + e.index + "): " + JSON.stringify(team));
        controller.setTeam(team);
        Alloy.isHandheld ? $.nav1.open(win, {
            animated: !0
        }) : $.tab1.open(win);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    Alloy.Collections.instance("team");
    $.__views.index = Ti.UI.createTabGroup({
        id: "index"
    });
    $.__views.tab1_win1 = Ti.UI.createWindow({
        backgroundColor: "#fff",
        navBarHidden: !0,
        id: "tab1_win1"
    });
    $.__views.nav1_win1 = Ti.UI.createWindow({
        id: "nav1_win1",
        title: "Teams"
    });
    $.__views.__alloyId9 = Ti.UI.createTableView({
        id: "__alloyId9"
    });
    $.__views.nav1_win1.add($.__views.__alloyId9);
    var __alloyId13 = function(e) {
        var models = Alloy.Collections.team.models, len = models.length, rows = [];
        for (var i = 0; i < len; i++) {
            var __alloyId11 = models[i];
            __alloyId11.__transform = {};
            var __alloyId12 = Alloy.createController("trow", {
                id: "__alloyId10",
                $model: __alloyId11
            });
            rows.push(__alloyId12.getViewEx({
                recurse: !0
            }));
        }
        $.__views.__alloyId9.setData(rows);
    };
    Alloy.Collections.team.on("fetch destroy change add remove reset", __alloyId13);
    openTeamPlayers ? $.__views.__alloyId9.addEventListener("click", openTeamPlayers) : __defers["$.__views.__alloyId9!click!openTeamPlayers"] = !0;
    $.__views.nav1 = Ti.UI.iPhone.createNavigationGroup({
        window: $.__views.nav1_win1,
        id: "nav1"
    });
    $.__views.tab1_win1.add($.__views.nav1);
    $.__views.tab1 = Ti.UI.createTab({
        window: $.__views.tab1_win1,
        id: "tab1",
        title: "Teams",
        icon: "KS_nav_views.png"
    });
    $.__views.index.addTab($.__views.tab1);
    $.addTopLevelView($.__views.index);
    exports.destroy = function() {
        Alloy.Collections.team.off("fetch destroy change add remove reset", __alloyId8);
        Alloy.Collections.team.off("fetch destroy change add remove reset", __alloyId13);
    };
    _.extend($, $.__views);
    $.tab1_win1.setNavBarHidden(!0);
    var teams = Alloy.Collections.team;
    teams.trigger("fetch");
    $.index.open();
    Alloy.Globals.nav1 = $.nav1;
    __defers["$.__views.__alloyId4!click!openTeamPlayers"] && $.__views.__alloyId4.addEventListener("click", openTeamPlayers);
    __defers["$.__views.__alloyId9!click!openTeamPlayers"] && $.__views.__alloyId9.addEventListener("click", openTeamPlayers);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;