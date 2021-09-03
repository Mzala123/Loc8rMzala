(function () {
  
    angular
      .module('loc8rApp')
      .filter('addHtmlLineBreaks', addHtmlLineBreaks);
  
    function addHtmlLineBreaks () {
      return function (text) {
        var output = text.replace(/\n/g, '<br/>');
        //return text.replace(new RegExp('/\n/g', 'g'), '<br/>');
        return output;
      };
    }
  
  })();