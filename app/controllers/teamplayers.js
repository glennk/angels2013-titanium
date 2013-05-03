// var teamId = arguments[0] || {};
// console.log('teamId.arguments: ' + JSON.stringify(teamId));

console.log('teamplayers.js');
//	players.trigger('fetch');

exports.setTeam = function(team) {
	console.log('setTeam: ' + JSON.stringify(team))
	$.win4.title = team ? team.get('name') : '';
	if (team) {
		teamId = team.get('idteams');
		console.log('idteams:' + teamId);
	}
	//	$.mypv.dataFilter = 'filterByTeam';

	//players.trigger('fetch');

	// var players = Alloy.Collections.Player;
	// console.log('players.length = ' + players.length);
	// console.log('teamplayers.js//setTeam()');
	//
	var players = filterByTeam(Alloy.Collections.instance('player'));
	var rows = [];

	for (var i = 0, j = players.length; i < j; i++) {
		var p = players[i];
		console.log('players[i] = ' + p.get('lastname'));
		rows.push(Alloy.createController('row', {
			name : p.get('firstname') + ' ' + p.get('lastname'),
			number : p.get('number'),
			nickname : p.get('nickname')
		}).getView());
	};

	$.team_banner.image = '/' + team.get('level') + '.png';
	$.playerlist.setData(rows);
}
// x = Alloy.Globals.teams;

// Team.fetch({
// success : function(_model, _response) {
// //Ti.API.info(JSON.stringify(_response, null, 2));
// // var rows = [];
// // _.each(_response, function(item) {
// // console.log('angels_rest.js//item: ' + JSON.stringify(item));
// // rows.push(Alloy.createController('trow', {
// // name : item.name,
// // level : item.level
// // }).getView());
// // });
// // $.table9.setData(rows);
// },
// error : function(_model, _response) {
// //Ti.API.info(JSON.stringify(_response, null, 2));
// alert("error retrieving Team data");
// }
// });

// var tableData = [ {title: 'Apples'}, {title: 'Bananas'}, {title: 'Carrots'}, {title: 'Potatoes'} ];
//$.mytv.setData(tableData);

$.win4.addEventListener("close", function() {
	console.log('close called');
	$.destroy();
});

// function transformPData(model) {
// console.log('transformPData');
// var attrs = model.toJSON();
// attrs.fullname = attrs.firstname + ' ' + attrs.lastname;
// attrs.nickname = 'Nickname: ' + attrs.nickname;
// return attrs;
// }

var filteredplayers;

function filterByTeam(collection) {
	console.log('filterByTeam: collection.length: ' + collection.length);
	//var publishedBooks = Alloy.Collections.player.filter(function(player) {
	if (teamId)
		console.log('teamId = ' + teamId);
	else
		console.log('teamId is null');

	filteredplayers = collection.filter(function(player) {
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
	console.log('openPlayerDetails() called, e.index: ' + e.index);

	var controller = Alloy.createController('playerdetails', {
		from : 'teamplayers.js'
	});
	var win = controller.getView();

	console.log('filteredplayers: ' + filteredplayers.length);
	var players = filteredplayers;
	//Alloy.Collections.player;
	var player = players[e.index];
	console.log('player(e.index): ' + JSON.stringify(player));
	console.log('player lastname:' + player.get('lastname'));
	controller.setPlayer(player);

	// if (OS_IOS) {
		// var nav = Alloy.Globals.nav1;
// 
	// //$.tab1_win1.setTabBarHidden('true');
		// win.hideTabBar();
// 
		// nav.open(win, {
			// animated : true
		// });
	// } else {

		var tab = Alloy.Globals.tab1;

		tab.open(win);
//	}
}
