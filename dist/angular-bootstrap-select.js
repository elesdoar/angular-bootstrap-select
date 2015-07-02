angular.module('angular-bootstrap-select', []).directive('abSelect',
  function ($log) {
    return {
      restrict: 'EA',
      replace: true,
      scope: {

      },
      transclude: true,
      templateUrl: 'angular-bootstrap-select/select.html',
      link: function(scope, element, attrs, ctrl) {
        $log.debug('Angular Select Bootstrap', ctrl);
      }
    };
  }
);

angular.module('angular-bootstrap-select').factory('selectHelpers', function() {
  return {

  };
});

angular.module('angular-bootstrap-select').run(['$templateCache', function($templateCache) {
  $templateCache.put('angular-bootstrap-select/select.html',
    '<select class=\"angular-select\">\n</select>\n'
  );
}]);