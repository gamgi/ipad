/* FLOX js new version for ipad
28.3.2014
*/
//----- namespace ----//
if (typeof flox == 'undefined')
	flox = {};
if (typeof flox.namespace == 'undefined')
	flox.namespace = {};

(function() { //starts namepsace
//----- private ------//
	//----- variables ----//
	var updateFunction = undefined;
	var screen = {
		canvas: null,
		ctx: null,
		width: 0,
		height: 0,
		inited: false,
		helloWorld:function(){
			try{
				screen.ctx.rect(0,0,screen.width,screen.height);
				screen.ctx.fillStyle = 'black';
				screen.ctx.fill();
			}catch (e){
				console.error(e.message);
			}
				
		},
		init: function( canvasId, width, height){
			screen.canvas = document.getElementById('screen');
			if (screen.canvas == null)
				return false;
			screen.ctx = screen.canvas.getContext('2d');
			screen.canvas.width = width; // this sets pixel amount to correct
			screen.canvas.height = height; // no blurring
			screen.width = screen.canvas.width;
			screen.height = screen.canvas.height;
			screen.inited = true;
			screen.helloWorld();

		}
	}
	var requestHandler = function( timestamp) {
		
		requestAnimationFrame( requestHandler);
		updateFunction.call();
	}

	
	//----- classes ------//
//----- public -------//
	//----- variables ----//
	//----- functions ----//
	this.init = function( canvasId, width, height){
		screen.init( canvasId, width, height);
		return true;
	}
	//----- classes ------//
	this.timer = function( timePerFrame, newUpdateFunction){
		//PUBLIC
		this.updateFrames = 0;
		this.runTimer = 0;
		this.intervalId = null;
		this.requestId = null;
		this.intervallId = null;
		this.fps = 0;
		//PRIVATE
		updateFunction = newUpdateFunction;
		var timeNow = 0;
		var timeLast = 0;//performance.navigationStart;
		var timeSinceUpdate = 0;
		var runStart = new Date().getTime();
		var leftover = 0;
		var timeFps = 0;
		var fpsFrames = 0;
		//METHODS
		this.update = function() {
			timeNow = performance.now();
			if (typeof(leftover) == 'object')
				leftover = 0;
			timeSinceUpdate = timeNow - timeLast + leftover;
			if (timeSinceUpdate > 1000)
				timeSinceUpdate = 1000;
			this.updateFrames = Math.floor(timeSinceUpdate / timePerFrame);
			//FPS
			fpsFrames += this.updateFrames;
			if (timeNow > timeFps){
				//this.fps = Math.floor(this.updateFrames / (timeSinceUpdate * 1000);
				this.fps = fpsFrames;// / (timeNow-timeFps);
				fpsFrames = 0;
				timeFps = performance.now()+1000;
			}
			//LEFTOVER
			leftover = timeSinceUpdate - this.updateFrames*timePerFrame;
			//console.log(this.updateFrames);
			timeLast = performance.now();
		}
		
		this.start = function() {
			timeLast = performance.now();
			this.requestId = requestAnimationFrame( requestHandler);
		}
	}
	this.visuals = function() {
		this.update = function(){

		};
		this.clear = function() {
			screen.ctx.clearRect( 0, 0, screen.width, screen.height);
		};
		this.circle = function( x, y, radius, centered) {
			if (centered == undefined || centered == false){
				x -= radius;
				y -= radius;
			}
			screen.ctx.beginPath();
			screen.ctx.arc( x, y, radius, 0, 2 * Math.PI);
			screen.ctx.fillStyle = 'red';
			screen.ctx.fill();
		};
		this.screenWidth = function(){return screen.width;};
		this.screenHeight = function(){return screen.height;};
	}
	this.input = function(){
		
		this.listenDEM = function(){ // listen devide motion
			window.ondevicemotion = handleDEM;		
		};
		function handleDEM( event){
			this.accX = event.accelerationIncludingGravity.x;
			this.accY = event.accelerationIncludingGravity.y;
			this.accZ = event.accelerationIncludingGravity.z;
		}
	}

}).call(flox.namespace); // bind this to flx.namespace
