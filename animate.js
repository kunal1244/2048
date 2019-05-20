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
    for(var i=0;i<grid.length;i++){
		for(var j=0;j<grid[i].length;j++){
			stack[i][j]=grid[i][j];
		}
	}
	var count=0;
	shift_nulls_right(grid);
	for(var i=0;i<grid.length;i++){
		for(var j=0;j<grid[i].length;j++){
			if(grid[i][j]==shift_nulls_right(grid)[i][j]){
				count=1;
				break;
			}
		}
	}
	var j=0;
	
	for(var i=0;i<grid.length;i++){
		j=0;
		while(j<grid[i].length){
			if(grid[i][j]==grid[i][j+1]){
				grid[i][j]+=grid[i][j+1];
				grid[i][j+1]=0;
				if(grid[i][j]){
					score(grid[i][j]*2);
				}
				j+=2;
			}
			else{
				j++;
			}
		}
	}
	shift_nulls_right(grid);
	if(count>0 && losing(grid)){
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
    for(var i=0;i<grid.length;i++){
		for(var j=0;j<grid[i].length;j++){
			stack[i][j]=grid[i][j];
		}
	}
	var null_adjusted=shift_nulls_down(grid);
	for(var i=0;i<null_adjusted.length;i++){
        for(var j=0;j<null_adjusted.length;j++){
            grid[i][j]=null_adjusted[i][j];
        };
	};
	var j=0;
	var count=0;
	for(var i=0;i<grid.length;i++){
		for(var j=0;j<grid[i].length;j++){
			if(grid[i][j]==shift_nulls_down(grid)[i][j]){
				count=1;
				break;
			}
		}
	}
	for(var i=0;i<grid.length;i++){
		j=0;
		while(j<grid.length-1){
			if(grid[j][i]==grid[j+1][i]){
				grid[j][i]+=grid[j+1][i];
				if(grid[j][i]){
					score(grid[j][i]*2);
				}
				grid[j+1][i]=0;
				j+=2;
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

	if(count>0 && losing(grid)){
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
    for(var i=0;i<grid.length;i++){
		for(var j=0;j<grid[i].length;j++){
			stack[i][j]=grid[i][j];
		}
	}
	var null_adjusted=shift_nulls_up(grid);
	for(var i=0;i<null_adjusted.length;i++){
        for(var j=0;j<null_adjusted.length;j++){
            grid[i][j]=null_adjusted[i][j];
        };
    };
    var j=0;
	var count=0;
	for(var i=0;i<grid.length;i++){
		for(var j=0;j<grid[i].length;j++){
			if(grid[i][j]==shift_nulls_up(grid)[i][j]){
				count=1;
				break;
			}
		}
	}
	for(var i=0;i<grid.length;i++){
		j=grid.length-1;
		while(j>0){
			if(grid[j][i]==grid[j-1][i]){
				grid[j][i]+=grid[j-1][i];
				grid[j-1][i]=0;
				if(grid[j][i]){
					score(grid[j][i]*2);
				}
				grid[j-1][i]=0;
				j-=2;
				
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

	if(count>0 && losing(grid)){
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
    for(var i=0;i<grid.length;i++){
		for(var j=0;j<grid[i].length;j++){
			stack[i][j]=grid[i][j];
		}
	}
	shift_nulls_left(grid);
	var j=0;
	var count=0;
	for(var i=0;i<grid.length;i++){
		for(var j=0;j<grid[i].length;j++){
			if(grid[i][j]==shift_nulls_left(grid)[i][j]){
				count=1;
				break;
			}
		}
	}
	for(var i=0;i<grid.length;i++){
		j=grid.length-1;
		while(j>-1){
			if(grid[i][j]==grid[i][j-1]){
				grid[i][j]+=grid[i][j-1];
				grid[i][j-1]=0;
				if(grid[i][j]){
					score(grid[i][j]*2);
				}
				j-=2;
			}
			else{
				j--;
			}
		}
	}
	shift_nulls_left(grid);
	if(count>0 && losing(grid)){
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