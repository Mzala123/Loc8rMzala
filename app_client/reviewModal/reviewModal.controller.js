(function () {

    angular
        .module('loc8rApp')
        .controller('reviewModalCtrl', reviewModalCtrl);

    reviewModalCtrl.$inject = ['$uibModalInstance', 'locationData'];
    function reviewModalCtrl($uibModalInstance, locationData) {
        var vm = this;
        vm.locationData = locationData;
        vm.formData = {};
        vm.onSubmit = function () {
            vm.formError = "";
            if (!vm.formData.name || !vm.formData.rating || !vm.formData.reviewText) {
                vm.formError = "All field required, Please fill in";
                return false;
            }
            else {
                vm.doAddReview(vm.locationData.locationid, vm.formData);
            }
        };
        vm.doAddReview = function(locationid, formData){
            loc8rData.addReviewById(locationid,{
                author : formData.name,
                rating : formData.rating,
                reviewText : formData.reviewText
            })
            .then(function successCallback(response){
              //  var data = response.data;
                console.log('success');
               
            }
            ,function errorCallback(response){
                vm.formError = "your review has not been submitted";
             //console.log(response);
          });
          return false;
        }
        vm.modal = {
            cancel: function () {
                $uibModalInstance.dismiss('cancel');
            }
        };

    }
})();