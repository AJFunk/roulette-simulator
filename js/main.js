var app = angular.module('roulette', [
  'ngRoute'
]);


app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when("/", {templateUrl: "partials/home.html", controller: "RouletteCtrl"})
}]);



app.controller('RouletteCtrl', function ($scope) {
  $scope.startMoney = 1000;
  $scope.totalMoney = $scope.startMoney;
  $scope.numSpins = 10;
  var reds = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
  var blacks = [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35];
  $scope.bet;



  $scope.start = function(){
    for ($scope.remainingSpins = $scope.numSpins; $scope.remainingSpins > 0; $scope.remainingSpins--) {

      setBets();
      if( !verifyBets() ) {
        alert('you do not have enough money');
        return false;
      }
      var results = getWinner();
      $scope.winner = results[0];
      $scope.color = results[1];

      var payout = checkBets($scope.bet);
      $scope.totalMoney+=payout;

      // handle 0 and 00
      if($scope.winner==37) $scope.winner = 0;
      if($scope.winner==38) $scope.winner = '00';
      // display winning number
      $('.winners').prepend('<div class="' + $scope.color + '">' + $scope.winner + '</div>');
    };
  }



  function setBets() {
    $scope.bet = [{'type':'odd','value':10}];
  }




  function verifyBets() {
    //verify bets and subtract from total money before spin
    var totalBet = 0;
    for(var i = 0; i < $scope.bet.length; i++){
      totalBet+=$scope.bet[i].value;
    }
    // return false if user doesn't have enough money
    if(totalBet > $scope.totalMoney) return false;
    $scope.totalMoney-=totalBet;
    return true;
  }



  function getWinner(){
    var result = Math.floor(Math.random() * (38)) + 1;
    if(reds.indexOf(result) > -1) color = 'red';
    else if(blacks.indexOf(result) > -1) color = 'black';
    else color = 'green';
    return [result, color];
  }



  function checkBets(bets){
    var payout = 0;
    var result;
    for(var i = 0; i < bets.length; i++){
      // check bet types
      if(bets[i].type == 'red' || bets[i].type == 'black') result = checkColor(bets[i]);
      if(bets[i].type == 'odd' || bets[i].type == 'even') result = checkOddEven(bets[i]);

      payout += result;
    }
    return payout;
  }



  function checkColor(bet){
    if(bet.type == $scope.color) return bet.value*2;
    else return 0;
  }



  function checkOddEven(bet){
    if($scope.winner == 37 || $scope.winner == 38) return 0;
    if(bet.type == 'odd' && $scope.winner%2 == 1) return bet.value*2;
    else if(bet.type == 'even' && $scope.winner%2 == 0) return bet.value*2;
    else return 0;
  }


});
