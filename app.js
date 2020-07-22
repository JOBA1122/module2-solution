(function () {

  'use strict'
  angular.module('ShoppingListCheckOff',[]) // create angular module: food
  .controller('ToBuyController', ToBuyController) // create controller that's called ToBuyController
  .controller('AlreadyBoughtController', AlreadyBoughtController) // create controller that's called AlreadyBoughtController
  .provider('ToBuyControllerService', ToBuyControllerServiceProvider)
  .provider('AlreadyBoughtControllerService',AlreadyBoughtControllerServiceProvider) //AlreadyBoughtControllerServiceProvider)
  .config(Config);
  
  Config.$inject = ['ToBuyControllerServiceProvider'];
function Config(ToBuyControllerServiceProvider) {
  //no used
}
//==================== buy controller ==============================================
ToBuyController.$inject = ['$scope','ToBuyControllerService','AlreadyBoughtControllerService'];
function ToBuyController($scope,ToBuyControllerService, AlreadyBoughtControllerService) {
  var buyList = this;
  buyList.items = ToBuyControllerService.getItems();
  try{
    if(1 == 3) throw "empty";
    $scope.valor = buyList.items[4];

  }
  catch (err)
  {      $scope.valor = "entro";

    buyList.errorMessage = "" + err;
  }
  buyList.moveToBought = function (item,itemIndex) {
    var item = ToBuyControllerService.removeItem(item,itemIndex);
    AlreadyBoughtControllerService.addItemToBuy(item.name, item.quantity);
  };
}
//==================== bought controller ==============================================
AlreadyBoughtController.$inject = ['AlreadyBoughtControllerService'];
function AlreadyBoughtController(AlreadyBoughtControllerService) {
  var boughtList = this;
  boughtList.items = AlreadyBoughtControllerService.getItems();
 }
//==================================================================================
//================= service to buycontroller =======================================
function ToBuyControllerService(defaultList) {
  var service = this;
  // List of shopping items
  var toBuyItems = defaultList;
 
  service.removeItem = function (item,itemIndex) {
    toBuyItems.splice(itemIndex, 1);
    return item;
  };
  service.getItems = function () {
    return toBuyItems;
  };
}
//=============== PROVIDER DE EL CONTROLADOR ToBuyControllerProvider ===============
  function ToBuyControllerServiceProvider() {
    var provider = this;
    provider.defaults = {
      defaultList : [
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
      ]
    };
    provider.$get = function () {
      var ToBuy = new ToBuyControllerService(provider.defaults.defaultList);
  
      return ToBuy;
    };
  }
//================= service to buycontroller =======================================
function AlreadyBoughtControllerService() {
  var service = this;
  var boughtItems = [];

  service.addItemToBuy = function (itemName, quantity) {
    var item = {
     name: itemName,
     quantity: quantity
   };
   boughtItems.push(item);
  }
   service.getItems = function () {
      return boughtItems;
  };
}
// // PROVIDER DE EL CONTROLADOR AlreadyBoughtControllerProvider

  function AlreadyBoughtControllerServiceProvider() {
    var provider = this;
    provider.defaults = {
    //no default values
    };
  
    provider.$get = function () {
       var shoppingList = new AlreadyBoughtControllerService();
  
       return shoppingList;
    };
  }
})();
