(function(){
  
 angular
    .module('loc8rApp')
    .controller('registerCtrl', registerCtrl);

     registerCtrl.$inject = ['$location', 'authentication'];
     function registerCtrl($location, authentication){
         var vm = this;

         vm.pageHeader = {
             title : 'Create a new Loc8r account'
         };

         vm.credentials = {
             name : "",
             email : "",
             password : ""
         };
         vm.returnPage = $location.search().page || '/';

         vm.onSubmit = function(){
          vm.formError = "";
          if(!vm.credentials.name || !vm.credentials.email || !vm.credentials.password){
              vm.formError = "All fields required, please try again";
              return false;
          }
          else{
              console.log("Tafikamo muno tionetu");
              vm.doRegister();
          }
         };

         vm.doRegister = function(){
            
             vm.formError = "";
             
             authentication
               .register(vm.credentials)
               .then(function successCallback(){
                $location.search('page', null);
                $location.path(vm.returnPage);
             }
              ,function errorCallback(err){
                vm.formError= err;           
             });       
         }
     }

})();