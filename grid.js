var n=4;
var total_score=0;
var stack=[];
for(var i=0;i<n;i++){
	var temp=[];
	for(var j=0;j<n;j++){
		temp.push(0);
	}
	stack.push(temp);
}

function randomly_populate(grid){
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
	
	for(var i=0;i<grid.length;i++){
		for(var j=0;j<grid[i].length;j++){
			stack[i][j]=grid[i][j];
		}
	}  
	return grid;

}
grid=create_Grid(4);

function undo(){
	var rows=document.getElementsByClassName('row');
	for(var i=0;i<grid.length;i++){
		for(var j=0;j<grid[i].length;j++){
			grid[i][j]=stack[i][j];
			rows[i].childNodes[j].innerHTML=grid[i][j];
		}
	}
	color(grid);
}








