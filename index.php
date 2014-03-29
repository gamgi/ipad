<!DOCTYPE html>
<html>
	<head>
		<title>iPad test</title>
		<meta charset="utf-8" />
		<script src="performance.now-polyfill.js"></script>
		<script src="flox.js"></script>
		<script src="functions.js"></script>
		<link rel="stylesheet" href="style.css" />
	</head>
	<body>
		<canvas id="screen">Loading...</canvas>
		<textarea id="debug">Loading..</textarea>
		<script>window.onload = GAME.init();
		
		
		var canvas = document.getElementById("screen");
		function toggleFullScreen() {
		    if (!document.mozFullScreen && !document.webkitFullScreen) {
			 if (canvas.mozRequestFullScreen) {
			   canvas.mozRequestFullScreen();
			 } else {
			   canvas.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
			 }
		    } else {
			 if (document.mozCancelFullScreen) {
			   document.mozCancelFullScreen();
			 } else {
			   document.webkitCancelFullScreen();
			 }
		    }
		  }
				
		</script><br />
		<input type="button" onClick="toggleFullScreen()" value="fullscrn" />
	</body>
</html>
