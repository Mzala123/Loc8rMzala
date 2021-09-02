(function (){

angular
  .module('loc8rApp')
  .controller('homeCtrl', homeCtrl);

homeCtrl.$inject = ['$scope', 'loc8rData', 'geolocation'];
function homeCtrl ($scope, loc8rData, geolocation) {
  // Nasty IE9 redirect hack (not recommended)
  /*if(window.location.pathname !== '/'){
    window.location.href = '#/' +window.location.pathname;
  }*/
   var vm = this;
   vm.pageHeader = {
      title: 'Loc8r',
      strapline: 'Find places to work with wifi near your !'
  };
   vm.sidebar = {
      content: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for."
  };
  vm.message = "Checking your location";
  //Trial
  var getData = function(position){
    var lat = position.coords.latitude,
    lng = position.coords.longitude;
    console.log(lng, lat);
    vm.message = "Searching for neary places";
  loc8rData.locationByCoords(lat, lng)
    .then(function successCallback(response){
       var data = response.data;
       console.log(response.data);
       vm.message = data.length > 0 ? "" : "No locations Found";
       vm.data = { locations: data };
       console.log(" Whats wrong here "+vm.data);
    }
     ,function errorCallback(response){
       vm.message = "Sorry, Something has gone wrong";
       console.log(response);
    });
  };

  var showError = function(error){
    $scope.$apply(function(){
       vm.message = error.message;
    });
  };

  var noGeo = function(){
    $scope.$apply(function(){
      vm.message = "Geolocation not supported by this browser.";
    });
  }

  geolocation.getPosition(getData, showError, noGeo);
  //end trial
}
}());