(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.menu = "";
  $scope.checkResult = "";

  $scope.checkMenu = function () {
    var menu_array = [];
    menu_array = $scope.menu.trim().split(',');
    if (menu_array.length == 1 && menu_array[0] === "") {
      $scope.checkResult = "Please enter data first";
    } else if (menu_array.length <= 3) {
      $scope.checkResult = "Enjoy!";
    } else if (menu_array.length > 3) {
      $scope.checkResult = "Too much!";
    };
  };
}
})();
