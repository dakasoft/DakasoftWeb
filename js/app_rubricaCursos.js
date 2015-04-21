(function () { // define funcionalidad
  var app = angular.module('rubricaCursos', ["ui.router"]);
  
  app.directive('rubricaCursosTabla',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/evaluacion/tabla.html',
      controller: ['$scope','$http','ngTableParams','funciones',function ($scope,$http,ngTableParams,funciones) {
        // $scope.rubricaCursos = [];
        $scope.cursos = [];
        $scope.rubrosSeleccionados = [];
        
        // $scope.rubro = funciones.rubro();

         /* Listar cursos*/
          $http.get('php/listarCursos.php')
          .success(function (data) {
            $scope.cursos = data;
          })
          .error(function(data,status){
            result = data || "jiji"
          });
          //editar
          $scope.editar = function(curso){
            funciones.closeC();
            $scope.rubro = funciones.rubro();//Nombre id valor
            $scope.curso =  angular.copy(curso);
            $scope.curso.cursoRubrica = [];
            $scope.accion = "Editar";
            console.log(curso)
          };
          //agregar rubro
          $scope.agregarRubro = function(rubro){
            if($scope.rubricaCursoForm.$valid){
              // $scope.rubro = funciones.rubro();
              var newRubro = angular.copy(rubro);
              funciones.agregarAListaNoRepetidoPorNombre($scope.curso.cursoRubrica,newRubro);
              funciones.closeC();
            }else{
              funciones.alert("contentbody","danger",'<strong>'+"Ops!.."+'</strong> Debes llenar todos los campos',3500);
            }
          };
          //eliminar rubro
          $scope.eliminarRubro = function(rubro){
            funciones.borrarDeListaPorNombre($scope.curso.cursoRubrica,rubro);
          };

          //Guardar rubros en la bd
          $scope.guardar = function(curso){
            if(curso.Rubrica!=""){
              $scope.curso = curso;
              $scope.rubros = [];
              $scope.rubricaId = 0;

              $http.post('php/crearRubricaCurso.php',{"data" : $scope.curso})
                    .success(function (data) {
                    // $scope.curso = data;
                      console.log(data)
                    }) 
                    .error(function(data, status) {
                        result = data || "Request failed";//hacer algo con esto.
                    }); 

            }//fin if
          };


      }],
      controllerAs: 'factorH'
    };
  });
// ModalDialog
  app.directive('modalRubricaCursos',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/evaluacion/modalRubrica.html',
      controller: ['$scope','$http',function ($scope,$http) {     
      }],
        controllerAs: 'modalRubriCursos'
    };
});
   
       
  



})();