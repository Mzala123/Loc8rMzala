(function(){
    angular
      .module('loc8rApp')
      .controller('locationDetailCtrl', locationDetailCtrl);

      locationDetailCtrl.$inject = ['$routeParams', '$uibModal', 'loc8rData'];
      function locationDetailCtrl($routeParams, $uibModal, loc8rData){
          var vm=this;
          vm.locationid = $routeParams.locationid;
          loc8rData.locationById(vm.locationid)
           .then(function successCallback(response){
               var data = response.data;
               vm.data = { location: data};
               vm.pageHeader= {
                title: vm.data.location.name
               }
              
           }
           ,function errorCallback(response){
            $scope.message = "Sorry, Something has gone wrong";
            console.log(response);
         });

         vm.popupReviewForm = function (){
              var instanceModal = $uibModal.open({
                 templateUrl: '/reviewModal/reviewModal.view.html',
                 controller: 'reviewModalCtrl as vm',
             resolve:{
                 locationData: function(){
                     return{
                         locationid : vm.locationid,
                         locationName : vm.data.location.name
                     }
                 }
             }});
             // alert("Lets show review form");
             instanceModal.result.then(function (data){
             vm.data.location.reviews.push(data);
             });
         };
          
      }

})();