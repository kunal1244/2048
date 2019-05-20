var countDownDate = Date.now();

var x = setInterval(function() {

  var now = new Date().getTime();
  var distance = now-countDownDate;
    
  var days = Math.floor(distance / (1000 * 60 * 60 * 24)); 
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  document.getElementById("display_time").innerHTML = hours + "h "
  + minutes + "m " + seconds + "s ";
    
}, 1000);
