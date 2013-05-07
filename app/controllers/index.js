
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
			var key = item.level.substring(0, 3);
			if (sections[key] == undefined) {
				console.log('item.level == undefined: ' + key);
				s = Titanium.UI.createTableViewSection({
					headerTitle : key
				});
				sections[key] = s;
			} else {
				console.log('item.level already exists! ' + key);
				s = sections[key];
			}
			s.add(row.getView());
		});
		var data = [];
		for (key in sections) {
			console.log('sections[' + key + '] = ' + sections[key].headerTitle);
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

function loadPlayerTable(collection) {
	var sections = [];
	var rows = [];
	var letters = [];
	var inds = [];
	for (var i = 0; i < collection.length; i++) {
		var p = collection.at(i);
		var l = p.get('lastname').charAt(0);
		// console.log('player.lastname.charAt(0): ' + l);
		var row = Alloy.createController('row', {
			name : p.fullname(),
			number : p.get('number'),
			nickname : p.get('nickname')
		});
		rows.push(row.getView());
		if (letters.indexOf(l) == -1) {
			// console.log('letter ' + l + ' not present');
			letters.push(l);
			var sect = Titanium.UI.createTableViewSection({
				headerTitle : l
			});
			sect.add(row.getView());
			sections[l] = sect;
			inds.push({
				index : i,
				title : l
			});
		} else {
			// console.log('letter ' + l + ' already in collection');
			var sect = sections[l];
			sect.add(row.getView());
		}
	};

	var data = [];
	for (key in sections) {
		data.push(sections[key]);
	}
	if (OS_IOS) {
		$.playerlist.setIndex(inds);
	}
	$.playerlist.setData(data);
}

function loadPlayers(e) {
	console.log('Players tab was selected; players.length = ' + players.length);
	if (players.length == 0) {
		console.log('Players.length() == 0');
		$.busy.show();
		players.fetch({
			success : function(_model, _response) {
				console.log('players.fetch//success callback');
				//Ti.API.info(JSON.stringify(_response, null, 2));
				loadPlayerTable(_model);
				$.busy.hide();
			},
			error : function(_model, _response) {
				//Ti.API.info(JSON.stringify(_response, null, 2));
				alert("error retrieving Player data");
			}
		});
	} else {
		console.log('players data is cached');
		loadPlayerTable(players);
	}
}

function openTeamPlayers(e) {
	console.log('index.js//openTeamPlayers() called, e.index: ' + e.index);

	//var teams = Alloy.Collections.team;
	var team = teams.at(e.index);

	// make sure you call .destoy() for this win!
	var controller = Alloy.createController('teamplayers', {
		team : team
	});
	var win = controller.getView();

	$.tab1.open(win);
}

function openPlayerDetails2(e) {
	console.log('index.js//openPlayerDetails2() called, e.index: ' + e.index);

	var player = players.at(e.index);

	var controller = Alloy.createController('playerdetails', {
		player : player
	});
	var win = controller.getView();

	$.tab2.open(win);
}

