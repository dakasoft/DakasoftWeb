(function () { // define funcionalidad
  var app = angular.module('votacionesPrivadas', ["ui.router"]);


  app.directive('proyectosVotacion',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/proyectosVotacionPrivada.html',
      controller: ['$scope','$http',function ($scope,$http) {
        $scope.proyectosElegidos = [];

        $http.get('json/proyectosVotacion.json').success(function (data) {
          $scope.proyectosElegidos = data;
             $("#owl-demo").owlCarousel({
              autoPlay : 5000,
              stopOnHover : true,
              navigation:true,
              paginationSpeed : 1000,
              goToFirstSpeed : 2000,
              singleItem : true,
              autoHeight : true,
              transitionStyle:"fade"
            });
        }); 




      }],
      controllerAs: 'modalCntrl'
      }
    });

})();