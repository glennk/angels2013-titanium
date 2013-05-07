var arg = arguments[0] || {};
console.log('playerinfo.arguments: ' + JSON.stringify(arg));

var p = arg.player;

$.name.text = '#' + p.get('number') + ' ' + p.fullname();
$.bats.text = p.get('bats');
$.throws.text = p.get('throws1');
$.parent1.text = p.get('parents').parent1;
$.cell1.text = p.get('parents').phone1;
$.email1.text = p.get('parents').email1;


function showOptions(){
    $.dialog.show();
}
