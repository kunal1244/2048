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