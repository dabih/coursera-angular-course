(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItems);

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrowItDown = this;

  narrowItDown.searchMenuItems = function (term) {
    if (term == undefined || term == '') {
      narrowItDown.found = []
    } else {
      MenuSearchService.getMatchedMenuAtems(term)
        .then(function(matchingItems) {
          narrowItDown.found = matchingItems;
        });
    }
  };

  narrowItDown.remove = function(index) {
    narrowItDown.foundItems.splice(index, 1);
};
}

function FoundItems() {
  var ddo = {
    restrict: 'E',
    scope: {
      foundItems: '<',
      onRemove: '&'
    },
    templateUrl: 'found_list.html',
    controller: NarrowItDownController,
    controllerAs: 'narrowItDown',
    bindToController: true
  };
  return ddo;
}

MenuSearchService.$inject = ['$http']
function MenuSearchService($http) {
  var service = this;

  service.getMatchedMenuAtems = function (searchTerm){
    return $http({
      method: "GET",
      url: "https://davids-restaurant.herokuapp.com/menu_items.json"
    }).then(function (result) {
    // process result and only keep items that match
    searchTerm = searchTerm.toLowerCase();

    var foundItems = result.data.menu_items.filter(function(item) {
        return item.description.toLowerCase().indexOf(searchTerm) !== -1;
    });
    // return processed items
      return foundItems;
    });
  };
}

})();
