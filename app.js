(function () {

  'use strict'
  angular.module('ShoppingListCheckOff',[]) // create angular module: food
  .controller('ToBuyController', ToBuyController) // create controller that's called ToBuyController
  .controller('AlreadyBoughtController', AlreadyBoughtController) // create controller that's called AlreadyBoughtController
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService)


//==================== buy controller ==============================================
ToBuyController.$inject = ['$scope','ShoppingListCheckOffService'];
function ToBuyController($scope,ShoppingListCheckOffService) {
  var toBuyList = this;
  toBuyList.items = ShoppingListCheckOffService.getItemsToBuy();
  
  toBuyList.moveToBought = function (item,itemIndex) {
    var itemDelete = ShoppingListCheckOffService.removeItem(item,itemIndex);
    ShoppingListCheckOffService.addItem(itemDelete.name, itemDelete.quantity);
  }  
};
//==================== AlreadyBoughtController controller ==============================================
AlreadyBoughtController.$inject = ['$scope','ShoppingListCheckOffService'];
function AlreadyBoughtController($scope,ShoppingListCheckOffService) {
  var bougthList = this;
     bougthList.items = ShoppingListCheckOffService.getItemsBought();
}
//================= service =======================================
function ShoppingListCheckOffService() {
  var service = this;
  // List of shopping items
  var toBuy = [
    {
      name: "Milk",
      quantity: "2"
    },
    {
      name: "Donuts",
      quantity: "200"
    },
    {
      name: "Cookies",
      quantity: "300"
    },
    {
      name: "bread",
      quantity: "30"
    },
    {
      name: "Chocolate",
      quantity: "5"
    }
  ];
  var bougth =  [];

  service.addItem = function (itemname,itemquantity){
    var item = {
      name: itemname,
      quantity: itemquantity
    }
    bougth.push(item);
  };
  service.removeItem = function (item,itemIndex) {
    toBuy.splice(itemIndex, 1);
    return item;
  };
  service.getItemsToBuy = function () {
      return toBuy;
  };
  service.getItemsBought = function () {
      return bougth;
  };
 
}
})();
