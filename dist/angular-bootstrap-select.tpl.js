angular.module('angular-bootstrap-select').run(['$templateCache', function($templateCache) {
  $templateCache.put('angular-bootstrap-select/select.html',
    '<select class=\"angular-select\">\n    <option style=\"display:none\" value=\"\">Select</option>\n<select>\n'
  );
}]);