(function () { // define funcionalidad
  var app = angular.module('proyectoganador', ["ui.router"]);


  app.directive('proyectoGana',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/verProyectoGanador.html',
      controller: ['$scope','$http',function ($scope,$http) {
        $scope.ganador = [];
        $scope.proyectosElegidos2=[];
        $scope.mayor =0;
        $scope.id=0;
          $http.get('php/votacionActiva.php')
          .success(function (data) {
            $scope.votacionActiva = data;
            $http.post("php/proyectosEnVotacion.php", { "data" : $scope.votacionActiva[0].IdVotacion})
              .success(function(data) {
                $scope.proyectosElegidos = data;
                console.log( $scope.proyectosElegidos);
                for (var i = $scope.proyectosElegidos.length - 1; i >= 0; i--) {
                  $scope.proyectosElegidos[i].IdEquipo;
                    $scope.puntero = $scope.proyectosElegidos[i];
                     $http.post('php/estudiantesPorEquipo.php', { "data" : $scope.proyectosElegidos[i].IdEquipo})
                     .success(function (data){
                     $scope.puntero.Integrantes = data;
                     })
                  //llamada al pa de estudiante por equipo yo ya lo tengo hecho
               
                };
                   $scope.ElegirGanador();
            })
          })


        $scope.ElegirGanador =function(){

          
                for (var i = $scope.proyectosElegidos.length - 1; i >= 0; i--) {
                  
                       $scope.mayor =$scope.proyectosElegidos[0].Votos;
                        $scope.id=0;
                       if($scope.proyectosElegidos[i].Votos> $scope.mayor){
                        alert("es mayor");
                        $scope.mayor = $scope.proyectosElegidos[i].Votos;
                        $scope.proyectosElegidos2 =$scope.proyectosElegidos;
                        console.log( $scope.proyectosElegidos2);
                         $scope.id = i;
                       }
                }
                console.log($scope.proyectosElegidos[$scope.id]);
                $scope.proyectosElegidos2 =$scope.proyectosElegidos[$scope.id];


        }

      }],
      controllerAs: 'modalCntrl'
      }
    });

})();