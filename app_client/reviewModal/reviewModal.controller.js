(function () {

    angular
        .module('loc8rApp')
        .controller('reviewModalCtrl', reviewModalCtrl);

    reviewModalCtrl.$inject = ['$uibModalInstance','loc8rData', 'locationData'];
    function reviewModalCtrl($uibModalInstance, loc8rData, locationData) {
        var vm = this;
        vm.locationData = locationData;
        vm.formData = {};
        vm.onSubmit = function () {
            vm.formError = "";
            if (!vm.formData.rating || !vm.formData.reviewText) {
                vm.formError = "All field required, Please fill in";
                return false;
            }
            else {
                vm.doAddReview(vm.locationData.locationid, vm.formData);
            }
        };
        vm.doAddReview = function(locationid, formData){
            loc8rData.addReviewById(locationid,{
                //author : formData.name,
                rating : formData.rating,
                reviewText : formData.reviewText
            })
            .then(function successCallback(data){
              //  var data = response.data;
                console.log('success');
                vm.modal.close(data);
               
            }
            ,function errorCallback(data){
                vm.formError = "your review has not been submitted";
             //console.log(response);
          });
          return false;
        }
        vm.modal = {
            close : function(result){
              $uibModalInstance.close(result);
            },
            cancel : function () {
                $uibModalInstance.dismiss('cancel');
            }
        };

    }
})();