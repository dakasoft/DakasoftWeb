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

         /* Listar cursos*/
          $http.get('php/listarCursos.php')
          .success(function (data) {
            $scope.cursos = data;
          })
          .error(function(data,status){
            result = data || "jiji"
          });

          // FUNCIONES 
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

          //GUARDAR rubros en la bd
          $scope.guardarRubrica = function(curso){
            if(curso.Rubrica!=""){
              $scope.curso = curso;
              $scope.rubros = [];
              $scope.rubricaId = 0;

              //1)--Primero se crea la rubrica
              $http.post('php/crearRubricaCurso.php',{"data" : curso})
              .success(function (data) {
                if (data.Insert_Id!="") {
                  $scope.curso.Rubrica = data.Insert_Id;
                  
                  //2)--Guardar Rubrica
                  $http.post('php/guardarRubricaCurso.php',{"data" : $scope.curso})
                  .success(function (data) {
                  // $scope.curso = data;
                  // console.log(data)
                  }) 
                  .error(function(data, status) {
                  result = data || "Request failed";//hacer algo con esto.
                  });

                  //3)--for que recorre los rubros. Esta parte se meteran lo rubro pue
                  $scope.rubricaId = data.Insert_Id;

                  for (var i = curso.cursoRubrica.length - 1; i >= 0; i--) { 
                    console.log(curso.cursoRubrica)
                    $http.post('php/crearRubrosCurso.php',{"data" : curso.cursoRubrica[i].nombre})
                    .success(function (rubro) { 
                      
                      $http.post('php/guardarRubrosRubricaC.php',{"data" : {rubrica:$scope.rubricaId,id:rubro.Insert_Id} })
                      .success(function (data) {
                        funciones.alert("contentbody","success",'<strong>'+"Bien!.."+'</strong> guardado con exito',3500);
                        setTimeout(function(){$("#modalRubrica").modal('hide')},1000); 
                      })//success rubrica x rubro

                    })//success for
                  };//fin for

                


                };//fin if2 Insert_Id entre success e if va todo
              })//primer post success
            }//fin if1
        };//Guardar
              



              
                     
              

            
         
                  
      
              

               




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