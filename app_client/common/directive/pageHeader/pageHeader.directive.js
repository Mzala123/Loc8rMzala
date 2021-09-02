(function(){
angular
  .module('loc8rApp')
  .directive('pageHeader', pageHeader);
  
  function pageHeader(){
      return{
          restrict: 'AE',
          scope: {
          content : '=content'
          },
          templateUrl: '/common/directive/pageHeader/pageHeader.template.html'
      };
  }

})();