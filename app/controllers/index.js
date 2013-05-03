//$.tab1_win1.setNavBarHidden(true);
//$.tab_win2.setNavBarHidden(true);

// //var team = Alloy.Models.instance('Team');
// var team = Alloy.createModel('Team', {id: 1});
// //console.log('team url = ' + team.url());
// team.fetch();

var teams = Alloy.Collections.instance('team');
teams.fetch({
	success : function(_model, _response) {
		console.log('teams.fetch//success callback');
		//Ti.API.info(JSON.stringify(_model, null, 2));
		var sections = [];
		_.each(_response, function(item) {
			console.log('index.js//item: ' + JSON.stringify(item));
			var row = Alloy.createController('trow', {
				name : item.name,
				level : item.level
			});
			var s;
			if (sections[item.level] == undefined) {
				console.log('item.level == undefined: ' + item.level);
				s = Titanium.UI.createTableViewSection({
					headerTitle: item.level
				});
				sections[item.level] = s;
			}
			else {
				console.log('item.level already exists! ' + item.level);
				s = sections[items.level];
			}
			s.add(row.getView());
		});
		var data = [];
		for (key in sections) {
			console.log('sections[' + key + '] = ' + sections[key].headerTitle );
			data.push(sections[key]);
		}
		$.teamlist.setData(data);
	},
	error : function(_model, _response) {
		//Ti.API.info(JSON.stringify(_response, null, 2));
		alert("error retrieving Team data");
	}
});

//To create a global singleton instance, use the Alloy.Collections.instance method.
var players = Alloy.Collections.instance('player');
players.fetch({
	success : function(_model, _response) {
		console.log('players.fetch//success callback');
		//Ti.API.info(JSON.stringify(_response, null, 2));
		var sections = [];
		var names = _model.pluck('lastname');
		var rows = [];
		var letters = [];
		var inds = [];
		for (var i = 0; i < _model.length; i++) {
			var p = _model.at(i);
			var l = p.get('lastname').charAt(0);
			console.log('player.lastname.charAt(0): ' + l);
			var row = Alloy.createController('row', {
				lastname : p.get('lastname') + ' ' + p.get('firstname'),
				number: p.get('number'),
				nickname: p.get('nickname')
			});
			rows.push(row.getView());
			if (letters.indexOf(l) == -1) {
				console.log('letter ' + l + ' not present');
				letters.push(l);
				var sect = Titanium.UI.createTableViewSection({
					headerTitle : l
				});
				sect.add(row.getView());
				sections[l] = sect;
				inds.push({index: i, title: l});
			} else {
				console.log('letter ' + l + ' already in collection');
				var sect = sections[l];
				sect.add(row.getView());
			}
		};

		var data = [];
		for(key in sections) {
			data.push(sections[key]);
		}
		if (OS_IOS) {
			$.playerlist.setIndex(inds);
		}
		$.playerlist.setData(data);

	},
	error : function(_model, _response) {
		//Ti.API.info(JSON.stringify(_response, null, 2));
		alert("error retrieving Player data");
	}
});

// function transformData(model) {
// //console.log('transformData');
// var attrs = model.toJSON();
// attrs.fullname = attrs.firstname + ' ' + attrs.lastname;
// attrs.nickname = 'Nickname: ' + attrs.nickname;
// return attrs;
// }

$.tabgrp.open();

// if (OS_IOS) {
	// Alloy.Globals.tab2_win1 = $.tab2_win1;
	// Alloy.Globals.nav1 = $.nav1;
	// Alloy.Globals.nav2 = $.nav2;
// }
// 
// if (OS_ANDROID) {
	Alloy.Globals.tab1 = $.tab1;
	Alloy.Globals.tab2 = $.tab2;
// }

function openTeamPlayers(e) {
	console.log('openTeamPlayers() called, e.index: ' + e.index);

	// make sure you call .destoy() for this win!
	var controller = Alloy.createController('teamplayers', {
		teamdId : 4
	});
	var win = controller.getView();

	var teams = Alloy.Collections.team;
	var team = teams.at(e.index);
	console.log('team(e.index:' + e.index + '): ' + JSON.stringify(team));
	//console.log('team name:' + team.get('name'));

	//
	controller.setTeam(team);

	$.tab1.open(win);
}

function openPlayerDetails2(e) {
	console.log('openPlayerDetails2() called, e.index: ' + e.index);

	var controller = Alloy.createController('playerdetails', {
		from : 'index.js'
	});
	var win = controller.getView();

	var players = Alloy.Collections.player;
	var player = players.at(e.index);
	console.log('player(e.index): ' + JSON.stringify(player));
	console.log('player lastname:' + player.get('lastname'));
	controller.setPlayer(player);

	if (OS_IOS) {
		var nav = Alloy.Globals.nav2;

		//Alloy.Globals.tab2_win1.tabBarVisible = false;
				
		nav.open(win, {
			animated : true
		});
	} else {

		var tab = Alloy.Globals.tab2;

		tab.open(win);
	}
}

// function openPlayerDetails(e) {
// console.log('openPlayerDetails() called, e.index: ' + e.index);
// var win3 = Alloy.createController('playerdetails');
// var players = Alloy.Collections.Player;
// var player = players.at(e.index);
// console.log('player(e.index): ' + JSON.stringify(player));
// console.log('player lastname:' + player.get('lastname'));
// win3.setPlayer(player);
//
// $.nav2.open(win3.getView(), {
// animated : true
// });
// }