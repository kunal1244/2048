var n=4;
var total_score=0;
function color(grid){
	var colors=['#eee4da','#ede0c8','#f2b179','#f59563','#f67354','#f65e3b','#edcf72']
	var rows=document.getElementsByClassName('row');
	for(var i=0;i<grid.length;i++){
		for(var j=0;j<grid[i].length;j++){
			if(grid[i][j]==0){
				rows[i].childNodes[j].innerHTML="";	
				rows[i].childNodes[j].style.backgroundColor="#cdc0bf";
			}
			else{
				rows[i].childNodes[j].style.backgroundColor=colors[find_exponent(grid[i][j])-1];
			}
		}
	}
}


function randomly_populate(grid){
	var linear_grid=[];
	var empty_indices=[]
	for(var i=0;i<grid.length;i++){
		for(var j=0;j<grid[i].length;j++){
			if(grid[i][j]==0){
				empty_indices.push(i*grid.length+j);
			}
		}
	}
	var grid_index=Math.floor(Math.random()*empty_indices.length);
	var value_index=Math.floor(Math.random()*2);
	var grid_value=empty_indices[grid_index];
	if(value_index==0){
		grid[parseInt(grid_value/grid.length)][grid_value%grid.length]=2;
	}
	else{
		grid[parseInt(grid_value/grid.length)][grid_value%grid.length]=4;	
	}


}

function score(val){
	total_score+=val;
	document.getElementById('display_score').innerHTML=total_score;
}

function winning(){
	for(var i=0;i<n;i++){
		for(var j=0;j<n;j++){
			grid[i][j]==32;
		}
	}
}

function losing(){
	var flag=0;
	for(var i=0;i<n;i++){
		for(var j=0;j<n;j++){
			if(grid[i][j]!=0){
				flag=1;
			}
		}
	}
	document.getElementsByClassName('container')[0]
}

function new_game(){
	document.getElementsByClassName('container')[0].innerHTML='';
	total_score=0;
	return create_Grid(n);
}

function create_Grid(n){
	var parent=document.getElementsByClassName('container')[0];
	parent.style.width=n*110+10+"px";
	var temp_row,temp_col;
	for(var i=0;i<n;i++){
		temp_row=document.createElement('div');
		temp_row.className="row";
		temp_row.style.height="100px";
		for(var j=0;j<n;j++){
			temp_col=document.createElement('div');
			temp_col.className="col-xs-"+parseInt(12/n);
			temp_col.style.height="100px";
			temp_col.style.width="100px";
			temp_col.style.backgroundColor="#cdc0bf";
			temp_col.style.borderRadius="10px";
			temp_col.style.marginLeft="10px";
			temp_col.style.padding="20px";
			temp_col.style.fontSize="30px";
			temp_col.style.marginTop="10px";
			temp_col.style.textAlign="center";
			temp_row.appendChild(temp_col);
		}
		temp_col.marginBottom="10px";
		parent.appendChild(temp_row);
	}	
	var rows=document.getElementsByClassName('row');
	var grid=[],temp=[];
	for(var i=0;i<n;i++){
		temp=[]
		for(var j=0;j<n;j++){
			temp.push(0);
		}
		grid.push(temp);
	}
	randomly_populate(grid);
	randomly_populate(grid);
	for(var i=0;i<n;i++){
		for(var j=0;j<n;j++){
			rows[i].childNodes[j].innerHTML=grid[i][j];
		}
	}
	color(grid);
	return grid;

}
grid=create_Grid(4);

function rotate(original_grid){
    var temp = [];
    for(var i=0;i<original_grid.length;i++){
        temp.push([]);
    };

    for(var i=0;i<original_grid.length;i++){
        for(var j=0;j<original_grid.length;j++){
            temp[j].push(original_grid[i][j]);
        };
    };

    return temp;
}

function shift_nulls_left(grid){
	var i=0;
	var temp=[];
	for(var j=0;j<grid.length;j++){
		temp=grid[j];
		i=0;
		while(i!=temp.length){
			if(temp[i]==0){
				temp.splice(i,1);
				temp.reverse();
				temp.push(0);
				temp.reverse();
				i++;
			}
			else{
				i++;
			}
		}
		grid[j]=temp;
	}
	return grid;
}

function shift_nulls_right(grid){
	var i=0;
	var temp=[];
	for(var j=0;j<grid.length;j++){
		temp=grid[j];
		i=temp.length-1;
		while(i!=-1){
			if(temp[i]==0){
				temp.splice(i,1);
				temp.push(0);
				i--;
			}
			else{
				i--;
			}
		}
		grid[j]=temp;
	}
	return grid;
}

function shift_nulls_down(grid){
	var sort_right=shift_nulls_right(rotate(grid));
	grid=rotate(sort_right);
	return grid;
}

function shift_nulls_up(grid){
	var sort_left=shift_nulls_left(rotate(grid));
	grid=rotate(sort_left);
	return grid;
}



function move_left(grid){
	color(grid);
	shift_nulls_right(grid);
	for(var i=0;i<grid.length;i++){
		var j=0;
		var count=0;
		while(j<grid[i].length){
			if(grid[i][j]==grid[i][j+1]){
				grid[i][j]+=grid[i][j+1];
				score(grid[i][j]*2);
				grid[i][j+1]=0;
				j+=2;
				if(grid[i][j]==0){
					count++;
				}
			}
			else{
				j++;
			}
		}
	}
	shift_nulls_right(grid);
	if(count>0){
		randomly_populate(grid);
	}
	
	var rows=document.getElementsByClassName('row');
	for(var i=0;i<grid.length;i++){
		for(var j=0;j<grid[i].length;j++){
			rows[i].childNodes[j].innerHTML=grid[i][j];
		}
	}
	color(grid);

}

function move_up(grid){
	var null_adjusted=shift_nulls_down(grid);
	for(var i=0;i<null_adjusted.length;i++){
        for(var j=0;j<null_adjusted.length;j++){
            grid[i][j]=null_adjusted[i][j];
        };
    };
	for(var i=0;i<grid.length;i++){
		var j=0;
		var count=0;
		j=0;
		while(j<grid.length-1){
			if(grid[j][i]==grid[j+1][i]){
				grid[j][i]+=grid[j+1][i];
				score(grid[i][j]*2);
				grid[j+1][i]=0;
				j+=2;
				if(grid[i][j]==0){
					count++;
				}
			}
			else{
				j++;
			}
		}
	}
	null_adjusted=shift_nulls_down(grid);
	for(var i=0;i<null_adjusted.length;i++){
        for(var j=0;j<null_adjusted.length;j++){
            grid[i][j]=null_adjusted[i][j];
        };
    };

	if(count>0){
		randomly_populate(grid);
	}
	
	var rows=document.getElementsByClassName('row');
	for(var i=0;i<grid.length;i++){
		for(var j=0;j<grid[i].length;j++){
			rows[i].childNodes[j].innerHTML=grid[i][j];
		}
	}
	color(grid);

}

function move_down(grid){
	var null_adjusted=shift_nulls_up(grid);
	for(var i=0;i<null_adjusted.length;i++){
        for(var j=0;j<null_adjusted.length;j++){
            grid[i][j]=null_adjusted[i][j];
        };
    };
    var j=0;
	var count=0;
	for(var i=0;i<grid.length;i++){
		j=grid.length-1;
		while(j>0){
			if(grid[j][i]==grid[j-1][i]){
				grid[j][i]+=grid[j-1][i];
				score(grid[i][j]*2);
				grid[j-1][i]=0;
				j-=2;
				if(grid[i][j]==0){
					count++;
				}
			}
			else{
				j--;
			}
		}
	}
	null_adjusted=shift_nulls_up(grid);
	for(var i=0;i<null_adjusted.length;i++){
        for(var j=0;j<null_adjusted.length;j++){
            grid[i][j]=null_adjusted[i][j];
        };
    };

	if(count>0){
		randomly_populate(grid);
	}
	
	var rows=document.getElementsByClassName('row');
	for(var i=0;i<grid.length;i++){
		for(var j=0;j<grid[i].length;j++){
			rows[i].childNodes[j].innerHTML=grid[i][j];
		}
	}
	color(grid);

}

function move_right(grid){
	shift_nulls_left(grid);
	for(var i=0;i<grid.length;i++){
		var j=0;
		var count=0;
		j=grid.length-1;
		while(j>-1){
			if(grid[i][j]==grid[i][j-1]){
				grid[i][j]+=grid[i][j-1];
				score(grid[i][j]*2);
				grid[i][j-1]=0;
				j-=2;
				if(grid[i][j]==0){
					count++;
				}
			}
			else{
				j--;
			}
		}
	}
	shift_nulls_left(grid);
	if(count>0){
		randomly_populate(grid);
	}
	
	var rows=document.getElementsByClassName('row');
	for(var i=0;i<grid.length;i++){
		for(var j=0;j<grid[i].length;j++){
			rows[i].childNodes[j].innerHTML=grid[i][j];
		}
	}
	color(grid);

}

function find_exponent(n){
	exp=0;
	while(n!=1){
		n/=2;
		exp++;
	}
	return exp;
}




document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
       move_up(grid);
    }
    else if (e.keyCode == '40') {
       move_down(grid);
    }
    else if (e.keyCode == '37') {
       move_left(grid);
    }
    else if (e.keyCode == '39') {
       move_right(grid);
    }

}