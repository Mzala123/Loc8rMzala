(function(){
  
    angular
       .module('loc8rApp')
       .controller('loginCtrl', loginCtrl);
   
       loginCtrl.$inject = ['$location', 'authentication'];
        function loginCtrl($location, authentication){
            var vm = this;
   
            vm.pageHeader = {
                title : 'Sign in to Loc8r'
            };
   
            vm.credentials = {
                email : "",
                password : ""
            };
            vm.returnPage = $location.search().page || '/';
   
            vm.onSubmit = function(){
             vm.formError = "";
             if(!vm.credentials.email || !vm.credentials.password){
                 vm.formError = "All fields required, please try again";
                 return false;
             }
             else{
                 console.log("Tafikamo muno tionetu");
                 vm.doLogin();
             }
            };
   
            vm.doLogin = function(){
               
                vm.formError = "";
                
                authentication
                  .login(vm.credentials)
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