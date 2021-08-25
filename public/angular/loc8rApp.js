angular.module('loc8rApp', []);
var _isNumeric = function(n){
 return !isNaN(parseFloat(n)) && isFinite(n);
};

var formatDistance = function(){
  return function(distance){
    var numDistance, unit ;
    if(distance && _isNumeric(distance)){
      if(distance > 1){
        numDistance = parseFloat(distance).toFixed(2);
        unit = "km";
      }
      else{
        numDistance = parseInt(distance * 1000,10);
        unit = "m";
      }
      return numDistance + unit;
    }
    else{
      return "?";
    }
  };
};

var ratingStars = function(){
return{
  scope: {
    thisRating : '=rating'
  },
  templateUrl : '/angular/rating-stars.html'
};
};

var geolocation = function(){
  var getPosition = function (cbSuccess, cbError, cbNoGeo){
   if(navigator.geolocation){
     navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
   }
   else{
     cbNoGeo();
   }
  };
  return {
     getPosition: getPosition
  };
};

var locationListCtrl = function ($scope, loc8rData, geolocation){
   $scope.message = "Checking your location";
   var getData = function(position){
     var lat = position.coords.latitude,
     lng = position.coords.longitude;
     console.log(lng, lat);
     $scope.message = "Searching for neary places";
   loc8rData.locationByCoords(lat, lng)
     .then(function successCallback(response){
        var data = response.data;
        console.log(response.data);
        $scope.message = data.length > 0 ? "" : "No locations Found";
        $scope.data = { locations: data };
        console.log(" $scope.data "+$scope.data);
     }
      ,function errorCallback(response){
        $scope.message = "Sorry, Something has gone wrong";
        console.log(response);
     });
   };

   var showError = function(error){
     $scope.$apply(function(){
        $scope.message = error.message;
     });
   };

   var noGeo = function(){
     $scope.$apply(function(){
       $scope.message = "Geolocation not supported by this browser.";
     });
   }

   geolocation.getPosition(getData, showError, noGeo);
   
};

var loc8rData = function ($http){
  var locationByCoords = function(lat, lng){
    console.log(lng, lat);
    return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=20');
  };
  return{
    locationByCoords : locationByCoords
  };
  

 /* return $http({
   method: 'GET',
   url: '/api/locations?lng=33.7741195&lat=-13.9626121&maxDistance=20',
   headers: { 'Content-Type' : 'application/json' }
  })*/

  /*return [{
      name: 'Burger Queen',
      address: '125 High Street, Reading, RG6 1PS',
      rating: 3,
      facilities: ['Hot drinks', 'Food', 'Premium wifi'],
      distance: '0.296456',
      _id: '5370a35f2536f6785f8dfb6a'
    },{
      name: 'Costy',
      address: '125 High Street, Reading, RG6 1PS',
      rating: 5,
      facilities: ['Hot drinks', 'Food', 'Alcoholic drinks'],
      distance: '0.7865456',
      _id: '5370a35f2536f6785f8dfb6a'
    },{
      name: 'Cafe Hero',
      address: '125 High Street, Reading, RG6 1PS',
      rating: 0,
      facilities: ['Hot drinks', 'Food', 'Premium wifi'],
      distance: '0.94561236',
      _id: '5370a35f2536f6785f8dfb6a'
    }];*/
};



angular
  .module('loc8rApp')
  .controller('locationListCtrl', locationListCtrl)
  .filter('formatDistance', formatDistance)
  .directive('ratingStars', ratingStars)
  .service('loc8rData', loc8rData)
  .service('geolocation', geolocation);
