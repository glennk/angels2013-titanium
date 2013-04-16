exports.setPlayer = function(player) {
	console.log('playerdetails.js//setPlayer()');

	$.weight.text = 'set in function';
	console.log('here' + JSON.stringify(player));
	//console.log('here2' + JSON.stringify(player.get('teamsId')));
	var obj = player.get('teamsId');
	Ti.API.info(JSON.stringify(obj, null, 2));
	//Ti.API.info(JSON.stringify(obj.idteams, null, 2));
	//var obj2 = obj.get('idteams');
	
	$.name.text = player.get('lastname');

	$.age.text = "Team: " + obj.level;
	$.weight.text = "Weight: " + player.get('lastname');
	$.record.text = "Record";
	
	var image = '/' + obj.level + '.png'; //"13UR.png"
	$.height.text = "Image: " + image;
	$.team_banner.image = image;
}
