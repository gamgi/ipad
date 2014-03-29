function html(id) {
	return document.getElementById(id).innerHTML;
}
function htmlAppend(id, add){
	document.getElementById(id).innerHTML += add;
}
function debvar( key,value) { htmlAppend( 'debug',key+": "+value+"\n")};
var accX,accY,accZ;
window.ondevicemotion = function(event) {
	accX = event.accelerationIncludingGravity.x;
	accY = event.accelerationIncludingGravity.y;
	accZ = event.accelerationIncludingGravity.z;
}




var flx = flox.namespace;
var GAME = (function(){
	//--- private of game---//	
	
	var tiH = new flx.timer( 1000/40, run); // time Handler
	var viH = new flx.visuals(); // visual handler
	var iH = new flx.input();
	iH.listenDEM();
	var x = 0.0;
	var xs = 1.0;

	function run(){
		document.getElementById('debug').innerHTML = '';
		viH.clear();
		tiH.update();
		render();
		debvar("accX",iH.accX);
		debvar('fps',tiH.fps);
		for (var f = 0;f<tiH.updateFrames;f++){
			//game logic
			x += xs;
			if (x > viH.screenWidth){
				x = viH.screenWidth;
				xs = - xs;
			}
		}
		viH.update();
		//requestAnimationFrame(render);
		//laststamp = timestamp - leftover;	
		//requestAnimationFrame(run);
	};


	function render() {
		for (var i = 0; i<1; i++){
			viH.circle( x, 90, 40,true);	
		}
	};
	
		

	//--- public of game---//	
	return {
		init: function(){
			if (!flx.init('screen', window.innerWidth, window.innerHeight))
				console.error('failed init');
			else
				console.log('inited');
			tiH.start();
			
		}
	}
}());

//window.onload = console.log(document.getElementById('screen'));
//GAME.init();
