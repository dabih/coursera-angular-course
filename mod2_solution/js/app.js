(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingController(ShoppingListCheckOffService) {
  var toBuy = this;
  toBuy.buyItems = ShoppingListCheckOffService.getBuyItems();
  toBuy.moveItem = function (itemIndex) {
    ShoppingListCheckOffService.moveItem(itemIndex);
  };
}

AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
  var bought = this;
  bought.boughtItems = ShoppingListCheckOffService.getBoughtItems();
}

function ShoppingListCheckOffService() {
  var service = this;

  var buyItems = [
    {name: 'cookie', quantity: 10},
    {name: 'sugar', quantity: 12},
    {name: 'fish', quantity: 1},
    {name: 'meat', quantity: 110},
    {name: 'corn', quantity: 14},
    {name: 'eggs', quantity: 16},
    {name: 'chiken', quantity: 12},
    {name: 'tea', quantity: 19},
  ];

  var boughtItems = [];

  service.moveItem = function (itemIdex) {
    boughtItems.push(buyItems[itemIdex])
    buyItems.splice(itemIdex, 1);
  };

  service.getBuyItems = function () {
    return buyItems;
  };

  service.getBoughtItems = function () {
    return boughtItems
  }
}

})();
