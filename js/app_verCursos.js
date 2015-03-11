(function () { // define funcionalidad
  var app = angular.module('verCursos', ["ui.router"]);


app.controller('verCursos', ['$rootScope','$scope','$http', function ($rootScope, $scope,$http) {
  var verCursos = this;

  verCursos.bCourseDisplay = false;
  $rootScope.courses = {};

  $http.get('json/vercursos.json').success(function (data) {
    console.log(data);
    $rootScope.courses = data;
  });

}]);

app.directive('navVerCursos',function ($http) {
  return {
    restrict: 'E',
    templateUrl: 'templates/partials/navVerCursos.html',
    controller: ['$scope','$http',function ($scope,$http) {

    }],
    controllerAs: 'modalCntrl'
  };
});

})();