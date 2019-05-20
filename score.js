
function score(val){
    total_score+=val;
    if(total_score>localStorage.getItem('high_score')){
        localStorage.setItem('high_score',total_score);
    }
    document.getElementById('display_max_score').innerHTML=localStorage.getItem('high_score');
	document.getElementById('display_score').innerHTML=total_score;
}

function winning(){
	for(var i=0;i<n;i++){
		for(var j=0;j<n;j++){
			grid[i][j]==32;
		}
	}
}

function is_full(grid){
	var flag=1;
	for(var i=0;i<n-1;i++){
		for(var j=0;j<n-1;j++){
			if(grid[i][j]==0){	
				flag=0;
				break;		
			}
		}
	}
	return Boolean(flag);
}

function losing(grid){
	var flag=0;
	if(is_full(grid)){
		flag=1;
	}
	if(flag==1){
		for(var i=0;i<n-1;i++){
			for(var j=0;j<n-1;j++){
				if(grid[i][j]==grid[i+1][j] || grid[i][j]==grid[i][j+1] ){
					flag=2;
					break;
				}
			}
		}
	}
	if(flag==2){
		document.getElementsByClassName('container')[1].innerHTML="Game Over";
		return false;
	}
	else if(flag==0){
		document.getElementsByClassName('container')[1].innerHTML="";
		return true;
	}
	else{
		document.getElementsByClassName('container')[1].innerHTML="";
		return true;
	}
}

function new_game(){
	document.getElementsByClassName('container')[0].innerHTML="";
	total_score=0;
	score(total_score);
	return create_Grid(n);
}