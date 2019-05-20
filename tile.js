function color(grid){
	var colors=['#eee4da','#ede0c8','#f2b179','#f59563','#f67354','#f65e3b','#edcf72','#edcc61','#edcc61','#edcc61']
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
	var max=0;
	for(var i=0;i<n;i++){
		for(var j=0;j<n;j++){
			if(grid[i][j]>max){
				max=grid[i][j];
			}
		}
	}
	document.getElementById('display_max').innerHTML=max;
}


function find_exponent(n){
	exp=0;
	while(n!=1){
		n/=2;
		exp++;
	}
	return exp;
}
