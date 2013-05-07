var arg = arguments[0] || {};
console.log('playerdetails.arguments: ' + JSON.stringify(arg.player));

var player = arg.player;

var button = Ti.UI.createButton({
	title : 'More Info'
});
button.addEventListener('click', function(e) {
	console.log("more info button clicked, player = " + JSON.stringify(player));
	var win = Alloy.createController('playerinfo', {
		player : player
	}).getView();

	var doneButton = Ti.UI.createButton({
		title : 'Done'
	});

	doneButton.addEventListener('click', function(e) {
		console.log('done button clicked');

		win.close();
	})
	win.rightNavButton = doneButton;
	win.open({
		modal : true,
		modalTransitionStyle : Titanium.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL
	});
});
$.pd1.rightNavButton = button;

$.number.text = player.get('number');
$.name.text = player.get('firstname') + ' ' + player.get('lastname');
$.nickname.text = 'Nickname: ' + player.get('nickname');

// //"13UR.png"
var obj = player.get('teamsId');
//Ti.API.info(JSON.stringify(obj, null, 2));
var image = '/' + obj.level + '.png';
$.team_banner.image = image;

var pic = 'http://angelsbeta-gkrondev.rhcloud.com/rest/player/' + player.get('idplayers') + '/photo';
console.log('player pic: ' + pic);
$.player_photo.image = pic;
//image;
