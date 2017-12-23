ab = window.ab || {};
ab.GUI = function() {
	let newG=1;
	var canvas = document.getElementById('canvas');
	canvas.width = window.innerWidth - 30;
	canvas.height = window.innerHeight - 30;
	///////////////////////////// NEW GAME on the canvas
	//-----------------------------------------------------------------------------------------------------
	var linkText="New Game";
	var linkX=canvas.width/2;
	var linkY= canvas.height/10;
	var linkWidth;
	var linkHeight=30;
//-----------------------------------------------------------------------------------------------------
    let w, h;
//-----------------------------------------------------------------------------------------------------
    let initModule = function() {
        w = canvas.width;
        h = canvas.height;      
        ab.Logic.initModule();
        drawBoard();
       window.addEventListener( "keydown", clickBoard, false);
    };
//-----------------------------------------------------------------------------------------------------
	// ensure that code does not run before page has loaded
	window.onload = initModule; 
    let clickBoard = function(e) {
		 var keyCode = e.keyCode;
        if(keyCode ==37||keyCode ==38||keyCode ==39||keyCode ==40)
		{
			
			ab.Logic.move(keyCode);
		}
       
    };
//-----------------------------------------------------------------------------------------------------
    let drawBoard = function() {
        let ctx = canvas.getContext('2d');
        const TILE_W = ( h/2) / ab.Logic.getCols();
        const TILE_H = ( h/2) / ab.Logic.getRows();
        const start_x=w/2-TILE_W*(ab.Logic.getCols()/2);
		const start_y=h/2-TILE_H*(ab.Logic.getRows()/2);
		let tile = ab.Logic.getTile();
		for(let i = 0; i < ab.Logic.getRows(); i++)
            for(let j = 0; j < ab.Logic.getCols(); j++) {
                ctx.fillStyle = "grey";
                ctx.fillRect(start_x + j * TILE_W, start_y+ i * TILE_H, TILE_W - 2, TILE_H - 2);
				if(tile[i][j]!=null) {
                    ctx.fillStyle = "#E0E0E0";
					ctx.font = 'bold 30px Arial';
					if(tile[i][j]==ab.Logic.getNumber2())
					{
						ctx.font = 'bold 30px Arial';
						ctx.fillStyle = "#C0C0C0";
					}
					if(tile[i][j]==ab.Logic.getNumber2()*2)
					{
						ctx.font = 'bold 30px Arial';
						ctx.fillStyle = "#FFCC99";
					}
					if(tile[i][j]==ab.Logic.getNumber2()*4)
					{
						ctx.font = ' bold 26px Arial';
						ctx.fillStyle = "#FF8000";
					}
						if(tile[i][j]==ab.Logic.getNumber2()*8)
					{
						ctx.font = 'bold 26px Arial';
						ctx.fillStyle = "#FF6666";
					}
					if(tile[i][j]==ab.Logic.getNumber2()*16)
					{
						ctx.font = 'bold 26px Arial';
						ctx.fillStyle = "#FF0000";
					}
					if(tile[i][j]==ab.Logic.getNumber2()*32)
					{
						ctx.font = 'bold 23px Arial';
						ctx.fillStyle = "#FFFF99";
					}
					if(tile[i][j]==ab.Logic.getNumber2()*64)
					{
						ctx.font = 'bold 23px Arial';
						ctx.fillStyle = "#109B81";
					}
						if(tile[i][j]==ab.Logic.getNumber2()*128)
					{
						ctx.font = 'bold 23px Arial';
						ctx.fillStyle = "#9999FF";
					}
					if(tile[i][j]==ab.Logic.getNumber2()*256)
					{
						ctx.font = 'bold 19px Arial';
						ctx.fillStyle = "#00CC66";
					}
					if(tile[i][j]==ab.Logic.getNumber2()*512)
					{
						ctx.font = 'bold 19px Arial';
						ctx.fillStyle = "#994C00";
					}
					var txtWidth=ctx.measureText(tile[i][j]).width;
					ctx.fillRect(start_x + j * TILE_W, start_y+ i * TILE_H, TILE_W - 2, TILE_H - 2);
					ctx.fillStyle = "black";
					ctx.fillText("" + tile[i][j], start_x+ j * TILE_W + TILE_W / 2-txtWidth/2 , start_y+ i * TILE_H + TILE_H / 2+5);		
                }					
            }
			if(newG==1)
			{
			ctx.font="30px Verdana";
			var gradient=ctx.createLinearGradient(0,0,canvas.width,0);
			gradient.addColorStop("0","magenta");
			gradient.addColorStop("0.5","blue");
			gradient.addColorStop("1.0","red");
			// Fill with gradient
			ctx.strokeStyle=gradient;
			linkWidth=ctx.measureText(linkText).width;
			ctx.strokeText(linkText,linkX-linkWidth/2,linkY);
			ctx.font="bold 20px Ariel";
			ctx.fillStyle = "black";
			
			ctx.fillText("Elchai Bentov",40,40);
			//add mouse listeners
			canvas.addEventListener("mousemove", on_mousemove, false);
			canvas.addEventListener("click", on_click, false);
			newG=2; //only once.
			}
	};		
//this function for new game mouseListener
//------------------------------------------------------------------------------------------------------------------------------------------
	function on_mousemove (ev) {
		// Get the mouse position relative to the canvas element.
		if (ev.layerX || ev.layerX == 0) { //for firefox
			x = ev.layerX;
			y = ev.layerY;
		}
		var x = event.x;
		var y = event.y;
		x -= canvas.offsetLeft;
		y -= canvas.offsetTop;
		//is the mouse over the link
		if(x>=linkX-linkWidth/2 && x <= (linkX + linkWidth)-linkWidth/2 && y<=linkY && y>= (linkY-linkHeight)){
			document.body.style.cursor = "pointer";
			inLink=true;
		}
		else{
			document.body.style.cursor = "";
			inLink=false;
		}
	}
//------------------------------------------------------------------------------------------------------------------------------------------
		//if the link  (NEW GAME) has been clicked, than new game
	function on_click(e) {
		if (inLink)  {
			initModule();
		}
	}
//------------------------------------------------------------------------------------------------------------------------------------------
	function getMousePos(canvas, evt) {
		var rect = canvas.getBoundingClientRect();
		return {
			x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
			y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
		};
	}
//------------------------------------------------------------------------------------------------------------------------------------------
    return {initModule,drawBoard};
//------------------------------------------------------------------------------------------------------------------------------------------
}();

