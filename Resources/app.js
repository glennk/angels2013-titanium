var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone, teams = Alloy.Collections.instance("team");

teams.fetch({
    success: function(_model, _response) {},
    error: function(_model, _response) {
        alert("error retrieving Team data");
    }
});

var players = Alloy.Collections.instance("player");

players.fetch({
    success: function(_model, _response) {},
    error: function(_model, _response) {
        alert("error retrieving Player data");
    }
});

Alloy.createController("index");