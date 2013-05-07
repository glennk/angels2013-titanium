var args = arguments[0] || {};
console.log('teamplayers.js//args.team: ' + JSON.stringify(args.team));

var team = args.team;
var teamId = team.get('idteams');

// exports.setTeam = function(team) {
	// console.log('setTeam: ' + JSON.stringify(team))
	// $.win4.title = team ? team.get('name') : '';
	// if (team) {
		// teamId = team.get('idteams');
		// console.log('idteams:' + teamId);
	// }
// }

	$.win4.title = team ? team.get('name') : '';

var players = Alloy.Collections.instance('player');

// used by openPlayerDetails to de-reference index from list
var teamPlayers;

if (players.length == 0) {
	console.log('need to fetch players');
	$.busy2.show();
	players.fetch({
		success : function(_model, _response) {
			console.log('players.fetch//success callback');
			//Ti.API.info(JSON.stringify(_response, null, 2));
			loadTable(_model);
			$.busy2.hide();
		},
		error : function(_model, _response) {
			//Ti.API.info(JSON.stringify(_response, null, 2));
			alert("error retrieving Player data");
		}
	});
} else {
	console.log("players data is cached");
	loadTable(players);
}

$.win4.addEventListener("close", function() {
	console.log('close called');
	$.destroy();
});

function loadTable(collection) {
	console.log('loadTable()');
	teamPlayers = filterByTeam(collection);
	console.log('filterByTeam: ' + teamPlayers.length);

	var rows = [];
	for (var i = 0, j = teamPlayers.length; i < j; i++) {
		var p = teamPlayers[i];
		// console.log('players[i] = ' + p.get('lastname'));
		rows.push(Alloy.createController('row', {
			name : p.fullname(),
			number : p.get('number'),
			nickname : p.get('nickname')
		}).getView());
	};
	console.log('loadTable()//rows done');

	$.team_banner.image = '/' + team.get('level') + '.png';
	$.playerlist.setData(rows);

	console.log('loadTable() done');
}

function filterByTeam(collection) {
	console.log('filterByTeam: collection.length: ' + collection.length);
	//var publishedBooks = Alloy.Collections.player.filter(function(player) {
	if (teamId)
		console.log('teamId = ' + teamId);
	else
		console.log('teamId is null');

	var filteredplayers = collection.filter(function(player) {
		return player.get("teamsId").idteams === teamId;
	});
	console.log('filteredplayers: ' + filteredplayers.length);
	// for (var i = 0; i < collection.length; i++) {
	// var mod = collection[i];
	// console.log('mod : ' + mod.lastname);
	// }
	// _.each(collection, function(item, index) {
	// console.log('bob' + JSON.stringify(item.get(index)));
	// });
	//Ti.API.info(JSON.stringify(collection), null, 2);
	//return collection.where({ 'lastname': 'Acosta'});
	return filteredplayers;
}

function openPlayerDetails(e) {
	console.log('teamplayers.js//openPlayerDetails() called, e.index: ' + e.index);

	var player = teamPlayers[e.index];
	console.log('player(e.index): ' + JSON.stringify(player));
	
	var controller = Alloy.createController('playerdetails', {
		player : player
	});
	var win = controller.getView();

	var tab = Alloy.Globals.tab1;
	tab.open(win);
}
