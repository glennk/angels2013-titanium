var arg = arguments[0] || {};
console.log('playerdetails.arguments: ' + JSON.stringify(arg));

var Xplayer;
        var button = Ti.UI.createButton({ title: 'More Info' });
        button.addEventListener('click', function(e) {
        	console.log("more info button clicked, Xlplayer = " + JSON.stringify(Xplayer));
        	var win = Alloy.createController('playerinfo', {player: Xplayer} ).getView();
        	
        	var doneButton = Ti.UI.createButton({title: 'Done'});
        	
        	doneButton.addEventListener('click', function(e) {
        		console.log('done button clicked');
        		
        		win.close();
        	})
        	win.rightNavButton = doneButton;
			win.open({modal: true, modalTransitionStyle: Titanium.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL});
        });
        $.pd1.rightNavButton = button;

exports.setPlayer = function(player) {
	console.log('playerdetails.js//setPlayer()');
	Xplayer = player;

		//Alloy.Globals.tabgrp.tabBarVisible = false;
	// var p = Alloy.createModel('playerPhoto', {id: 1});
	// p.fetch({
		// success : function(_model, _response) {
			// console.log('player.photo.fetch//success callback');
// 			
			// //$.team_banner.image = new _response;
		// },
		// error : function(_model, _response) {
			// //Ti.API.info(JSON.stringify(_response, null, 2));
			// alert("error retrieving Player photo data");
		// }
	// });

	console.log('here' + JSON.stringify(player));
	//console.log('here2' + JSON.stringify(player.get('teamsId')));
	var obj = player.get('teamsId');
	//Ti.API.info(JSON.stringify(obj, null, 2));

	$.number.text = player.get('number');
	$.name.text = player.get('firstname') + ' ' + player.get('lastname');
	$.nickname.text = 'Nickname: ' + player.get('nickname');

	// //"13UR.png"
	var image = '/' + obj.level + '.png';
	$.team_banner.image = image;
	
	var pic = 'http://angelsbeta-gkrondev.rhcloud.com/rest/player/'+  player.get('idplayers') + '/photo';
	console.log('player pic: ' + pic);
	$.player_photo.image = pic; //image;
}
