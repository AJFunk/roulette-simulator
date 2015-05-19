
var numSpins = 10;

$('.start').click(function(){
  for (var i = 1; i <= numSpins; i++) {
    var result = Math.floor( Math.random() * (39) );
    $('.winners').prepend(result + "<br>");
  };
})
