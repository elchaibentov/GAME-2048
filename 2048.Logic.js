ab = window.ab || {};
ab.Logic = function() {
	let synch = [];//To synchronize moves
    let tiles = [];
	let ismoved=false;
    const ROWS = 4, COLS = 4, START_TILE=2 , NUMBER1=2 ,NUMBER2=4; //For it to work well, number1 must be less than number2 and number1*2=number2.
    let remain=COLS*ROWS;
//-----------------------------------------------------------------------------------------------------
    let initModule = function() {
		 remain=COLS*ROWS;
		for(let i = 0; i < ab.Logic.getRows(); i++)
		{
			tiles[i]=[];
		}
		for(let i=0; i<START_TILE;i++)
		{
			newCell();
		}
    };
 //-----------------------------------------------------------------------------------------------------   
    let move = async function(num) {
        if(num==37) 
		{
			let new_cell=false;
			for(let i=0; i<getCols(); i++)
			{		
		
				moveLeft(i);							
			}         
        }
		if(num==38) 
		{
			for(let i=0; i<getCols(); i++)
			{		
						moveUp(i);									
			}
        }
		 if(num==39) 
		{
			for(let i=0; i<getCols(); i++)
			{		
				moveRight(i);
			} 
        }
		if(num==40) 
		{
			for(let i=0; i<getCols(); i++)
			{				
				moveDown(i);						
			}   
		}			
			while (true)
			{
				await sleep(50); //A new cell only after everyone has movedץ
				if(ismoved==true&&synch[0]==1&&synch[1]==1&&synch[2]==1&&synch[3]==1)
				{
					
					newCell();
					ab.GUI.drawBoard();
					for(let i=0;i<getRows();i++)
					{
					synch[i]=0;
					}
					ismoved=false;
					break;
				}
			}
    };
//--------------------------------------------------------------------------------------
	let moveLeft=async function(row,obj) {
		for(let i=0;i<getCols();i++)
		{
			let temp = i;
			while(temp>0&&tiles[row][temp]!=null&&tiles[row][temp-1]==null)
			{

				tiles[row][temp-1]=tiles[row][temp];
				tiles[row][temp]=null;
				ismoved=true;
				await sleep(1);
			ab.GUI.drawBoard();
				temp--;
			}
		}
		for( i=0;i<getCols();i++)
		{
			if(i<getRows()-1&&tiles[row][i]==tiles[row][i+1]&&tiles[row][i]!=null)
			{
				tiles[row][i]+=tiles[row][i+1];
				remain++;
				ismoved=true;
				tiles[row][i+1]=null;
				checkWin(row,i);
				ab.GUI.drawBoard();
				
			}
		}
		for( i=0;i<getCols();i++)
		{
			 temp = i;
			while(temp>0&&tiles[row][temp]!=null&&tiles[row][temp-1]==null)
			{
				tiles[row][temp-1]=tiles[row][temp];
				tiles[row][temp]=null;
				ismoved=true;
				ab.GUI.drawBoard();
				temp--;
			}
		}
		synch[row]=1;
	}
//-----------------------------------------------------------------------------------------------------
	let moveRight= async function(row) {
		for(let i=getCols()-2;i>-1;i--)
		{
			let temp=i;
			while(temp<getCols()-1&&tiles[row][temp]!=null&&tiles[row][temp+1]==null)
			{
				tiles[row][temp+1]=tiles[row][temp];
				tiles[row][temp]=null;
				ismoved=true;
				await sleep(10);
				ab.GUI.drawBoard();
				temp++;
			}
		}
		for( i=getCols()-1;i>0;i--)
		{
			if(tiles[row][i]==tiles[row][i-1]&&tiles[row][i]!=null)
			{
				tiles[row][i]+=tiles[row][i-1];
				remain++;
				ismoved=true;
				tiles[row][i-1]=null;
				checkWin(row,i);
				ab.GUI.drawBoard();
				
			}
		}
			for(let i=getCols()-2;i>-1;i--)
		{
			let temp=i;
			while(temp<getCols()-1&&tiles[row][temp]!=null&&tiles[row][temp+1]==null)
			{
				tiles[row][temp+1]=tiles[row][temp];
				tiles[row][temp]=null;
				ismoved=true;
				ab.GUI.drawBoard();
				temp++;
			}
		}
		synch[row]=1;
	}
//-----------------------------------------------------------------------------------------------------
	let moveUp= async function(col) {
		for(let i=1;i<getRows();i++)
		{
			let temp = i;
			while(temp>0&&tiles[temp][col]!=null&&tiles[temp-1][col]==null)
			{
				tiles[temp-1][col]=tiles[temp][col];
				tiles[temp][col]=null;
				ismoved=true;
				await sleep(10);
				ab.GUI.drawBoard();
				temp--;
			}
		}
		for( i=0;i<getRows()-1;i++)
		{
			if(tiles[i][col]==tiles[i+1][col]&&tiles[i][col]!=null)
			{
				tiles[i][col]+=tiles[i][col];
				remain++;
				ismoved=true;
				tiles[i+1][col]=null;
				checkWin(i,col);
				ab.GUI.drawBoard();
			}
		}
		for(let i=1;i<getRows();i++)
		{
			let temp = i;
			while(temp>0&&tiles[temp][col]!=null&&tiles[temp-1][col]==null)
			{
				tiles[temp-1][col]=tiles[temp][col];
				tiles[temp][col]=null;
				ismoved=true;
				ab.GUI.drawBoard();
				temp--;
			}
		}
		synch[col]=1;
	}
//-----------------------------------------------------------------------------------------------------
	let moveDown= async  function(col) {
		for(let i=getRows()-2;i>-1;i--)
		{
			let temp = i;
			while(temp<getRows()-1&&tiles[temp][col]!=null&&tiles[temp+1][col]==null)
			{
				tiles[temp+1][col]=tiles[temp][col];
				tiles[temp][col]=null;
				ismoved=true;
				await sleep(10);
				ab.GUI.drawBoard();
				temp++;
			}
		}
		for( i=getRows()-1;i>0;i--)
		{
			if(tiles[i][col]==tiles[i-1][col]&&tiles[i][col]!=null)
			{
				tiles[i][col]+=tiles[i][col];
				remain++;
				ismoved=true;
				tiles[i-1][col]=null;
				checkWin(i,col);
				ab.GUI.drawBoard();
			}
		}
		for( i=getRows()-2;i>-1;i--)
		{
			temp = i;
			while(temp<getRows()-1&&tiles[temp][col]!=null&&tiles[temp+1][col]==null)
			{
				tiles[temp+1][col]=tiles[temp][col];
				tiles[temp][col]=null;
				ismoved=true;
				ab.GUI.drawBoard();
				temp++;
			}
		}
		synch[col]=1;
	}
//-----------------------------------------------------------------------------------------------------
	    let isFree = function(i,j) {
		if(tiles[i][j]==null)
			return true;
		return false;		
	}
//-----------------------------------------------------------------------------------------------------
	let newCell= async function() {
		let num1 = Math.floor((Math.random()*100)%(remain));	
		let count=0;
		for(i=0;i<getRows();i++)
			for(let j=0;j<getCols();j++)
			{
				
				if(isFree(i,j))
				{
					if(num1==count)
					{
						let value = Math.random()<0.9? NUMBER1:NUMBER2;
						tiles[i][j]=value;
						remain--;
						if(remain==0&&noMove())
						{
							ab.GUI.drawBoard();
							await sleep(20);
							alert("GAME OVER");
						}
					}
					count++;
				}
			}
	}
//-----------------------------------------------------------------------------------------------------
    let getRows = () => ROWS;
//-----------------------------------------------------------------------------------------------------
    let getCols = () => COLS;
//-----------------------------------------------------------------------------------------------------
	let getNumber1 = () => NUMBER1;
//-----------------------------------------------------------------------------------------------------
	let getNumber2 = () => NUMBER2;
//-----------------------------------------------------------------------------------------------------
    let getCell = (row, col) => tiles[toInd(row, col)];
//-----------------------------------------------------------------------------------------------------
    let getTile = () => tiles;
//-----------------------------------------------------------------------------------------------------
    let noMove = function() {
        for(let i=0; i<getRows();i++)
			for(let j=0;j<getCols();j++)
			{
				if(j-1>-1)
				{
					if(tiles[i][j-1]==tiles[i][j])
					{
						return false;
					}
				}
				if(i+1<getRows())
				{
					if(tiles[i+1][j]==tiles[i][j])
					{
						return false;
					}
				}
			}
			return true;
    };
//-----------------------------------------------------------------------------------------------------
    let checkWin = async function  (i,j)
	{
		if(tiles[i][j]==Math.pow(2,11))
			{
				ab.GUI.drawBoard();
				await sleep(10);
				alert ("Congratulations you win")
			}
	}
//-----------------------------------------------------------------------------------------------------
	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	};
//-----------------------------------------------------------------------------------------------------
	return { initModule,  move, getRows, getCols, getCell,getTile,getNumber1,getNumber2};
//-----------------------------------------------------------------------------------------------------                          
}();

