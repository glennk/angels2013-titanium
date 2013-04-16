$.tab1_win1.setNavBarHidden(true);
//$.tab_win2.setNavBarHidden(true);

// //var team = Alloy.Models.instance('Team');
// var team = Alloy.createModel('Team', {id: 1});
// //console.log('team url = ' + team.url());
// team.fetch();

var teams = Alloy.Collections.team;
teams.trigger('fetch');

//teams = Alloy.Collections.Team;
// Alloy.Collections.team.fetch({
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
// 
// players = Alloy.Collections.Player;
// players.fetch({
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
		// alert("error retrieving Player data");
	// }
// });
// 

function transformData(model) {
	//console.log('transformData');
	var attrs = model.toJSON();
	attrs.fullname = attrs.firstname + ' ' + attrs.lastname;
	attrs.nickname = 'Nickname: ' + attrs.nickname;
	return attrs;
}

// players.fetch({success: function(collection, response) {
// console.log("Players collection loaded.");
// var tableData = [ {title: 'Apples'}, {title: 'Bananas'}, {title: 'Carrots'}, {title: 'Potatoes'} ];
//
// $.table2.setData(collection);
//
// }
// });

// Backbone.sync = function(method, model) {
// alert(method + ": " + model.url);
// };

// var Accounts = new Backbone.Collection;
// Accounts.url = 'http://angelsbeta-gkrondev.rhcloud.com/rest/team';
//
// Accounts.fetch();
//
// console.log(Accounts.get(1));
//
$.index.open();

//$.table2.setData(teams);

//
// var XTeam = Backbone.Model.extend({
// play: function() {
// console.log("Playing with XTeam");
// }
// })
//
// var XTeamList = new Backbone.Collection;
//
// XTeamList.url = 'http://angelsbeta-gkrondev.rhcloud.com/rest/team';
//
// XTeamList.fetch();
// console.log('XTeamList = ' + JSON.stringify(XTeamList));
//
// var angel2 = new XTeam({'name': 'Angels 14U'});
// angel2.play();

// var teamlist = new XTeamList();
// // console.log("teamlist.url : " + teamlist.url());
// // teamlist.fetch();
// teamlist.add({'name': 'Angels 12U White'});
// teamlist.add({'name': 'Angels 13 White'});
//
// console.log(JSON.stringify(teamlist));

//var tableData = [ {title: 'Apples'}, {title: 'Bananas'}, {title: 'Carrots'}, {title: 'Potatoes'} ];

// var table = Ti.UI.createTableView({
// data: tableData
// });

//$.table2.setData(tableData);

// var angel = Alloy.createModel('Team');
// angel.fetch();
// $.mytable.setData(angel);
//
// console.log(JSON.stringify('angel = ' + angel));

//$.myLabel.text = 'Tab1';

//$.index.on('detail', function(e) {
//		console.log('detail');
// get the detail controller and window references
// var controller = OS_IOS && Alloy.isTablet ? $.detail : Alloy.createController('detail');
// var win = controller.getView();
//
// // get boxer stats by name
// controller.setBoxerStats(e.row.fighterName);
//
// // open the detail windows
// if (OS_IOS && Alloy.isHandheld) {
// Alloy.Globals.navgroup.open(win);
// } else if (OS_ANDROID) {
// win.open();
// }
//});

if (OS_IOS) {
	Alloy.Globals.nav1 = $.nav1;
}

if (OS_ANDROID) {
	Alloy.Globals.tab1 = $.tab1;
}

function openTeamPlayers(e) {
	console.log('openTeamPlayers() called, e.index: ' + e.index);
	
	// make sure you call .destoy() for this win!
	var controller = Alloy.createController('teamplayers', {teamdId: 4});
	var win = controller.getView();
	
	var teams = Alloy.Collections.team;
	var team = teams.at(e.index);
	console.log('team(e.index:' + e.index + '): ' + JSON.stringify(team));
	//console.log('team name:' + team.get('name'));
	
	//
	controller.setTeam(team);

	if (OS_IOS && Alloy.isHandheld) {	
		$.nav1.open(win, {
			animated : true
		});
	}
	else {
		$.tab1.open(win);
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