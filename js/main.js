var app = angular.module('roulette', [
  'ngRoute'
]);


app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when("/", {templateUrl: "partials/home.html", controller: "RouletteCtrl"})
}]);



app.controller('RouletteCtrl', function ($scope) {
  $scope.totalMoney = 1000;
  $scope.numSpins = 1000;
  var reds = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
  var blacks = [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35];
  $scope.bet = [{'type':'red','value':10}];

  $scope.start = function(){
    for ($scope.remainingSpins = $scope.numSpins; $scope.remainingSpins > 0; $scope.remainingSpins--) {
      if( !verifyBets() ) {
        alert('you do not have enough money');
        return false;
      }
      var results = getWinner();
      $scope.winner = results[0];
      $scope.color = results[1]
      // handle 0 and 00
      if($scope.winner==37) $scope.winner = 0;
      if($scope.winner==38) $scope.winner = '00';
      $('.winners').prepend('<div class="' + $scope.color + '">' + $scope.winner + '</div>');

      var payout = checkBets($scope.bet);
      $scope.totalMoney+=payout;
    };
  }

  function verifyBets() {
    //verify bets and subtract from total money before spin
    var totalBet = 0;
    for(var i = 0; i < $scope.bet.length; i++){
      totalBet+=$scope.bet[i].value;
    }
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


      payout += result;
    }
    return payout;
  }

  function checkColor(bet){
    if(bet.type == $scope.color) return bet.value*2;
    else return 0;
  }


});
