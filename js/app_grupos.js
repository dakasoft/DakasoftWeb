(function () { // define funcionalidad
  var app = angular.module('grupos', ["ui.router"]);

  app.directive('gruposTabla',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/grupos/tabla.html',
      controller: ['$scope','$http','ngTableParams','funciones',function ($scope,$http,ngTableParams,funciones) {
        $scope.grupos = [];
        $scope.cursos = [];
        $scope.areasAcademicas = [];
        $scope.profesores = [];
        $scope.estudiantes = [];

        $scope.modalGroup = funciones.grupo();
        $scope.modalStudents = {};
        $scope.modalTeachers = {};
        $scope.originalStudents = [];
        $scope.originalTeachers = [];

        $scope.deletePointer = {};
        $scope.targetUsers = {};

        $http.get('php/listarProfesores.php').success(function (data) {
          $scope.profesores = data;
        });
        $http.get('php/listarEstudiantes.php').success(function (data) {
          $scope.estudiantes = data;
        });

        $http.get('php/listarGrupos.php').success(function (data) {
          $scope.grupos = data;
          angular.forEach($scope.grupos, function (value, key) {
            $http.post('php/solicitarUsuarioGrupo.php', {"data":value.EncargadoId}).success(function (data) {
              value.Encargado = data;
            });
            $http.post('php/solicitarCursoGrupo.php', {"data":value.IdCurso}).success(function (data) {
              value.Curso = data;
            });
            $http.post('php/solicitarEstudiantesGrupo.php', {"data":value.id}).success(function (data) {
              value.estudiantes = data;
            });
            $http.post('php/solicitarProfesoresGrupo.php', {"data":value.id}).success(function (data) {
              value.profesores = data;
              angular.forEach(value.profesores, function (pValue, pKey) {
                $http.post('php/solicitarAreaProfesor.php', {"data":pValue.IdArea}).success(function (data) {
                  pValue.area = data;
                });
              });
            });
          });
        });


        $http.post('php/listarAreas.php').success(function (data) {
          $scope.areasAcademicas = data;
        });
        
        $http.get('php/listarCursos.php').success(function (data) {
          $scope.cursos = data;
        });

        $scope.nuevo = function(){
          funciones.closeC();
          $scope.accion = "Nuevo";
          
          $scope.targetUsers = {
            toAdd: [],
            toDelete: []
          };
          $scope.modalStudents = angular.copy($scope.estudiantes);
          $scope.modalTeachers = angular.copy($scope.profesores);
          $scope.modalGroup = funciones.grupo();
        };

        $scope.editar = function(grupo){
          funciones.closeC();
          $scope.accion = "Editar";

          $scope.targetUsers = {
            toAdd: [],
            toDelete: []
          };
          $scope.modalStudents = angular.copy($scope.estudiantes);
          $scope.modalTeachers = angular.copy($scope.profesores);
          $scope.originalStudents = angular.copy(grupo.estudiantes);
          $scope.originalTeachers = angular.copy(grupo.profesores);
          $scope.modalGroup =  angular.copy(grupo);

          angular.forEach($scope.originalStudents, function (value, key) {
            funciones.borrarDeLista($scope.modalStudents, value);
          });
          angular.forEach($scope.originalTeachers, function (value, key) {
            funciones.borrarDeLista($scope.modalTeachers, value);
          });
        };

        $scope.guardar = function(grupo){
          if($scope.gruposForm.$valid){
            if(grupo.id==""){
              grupo.EncargadoId = grupo.Encargado.id;
              grupo.IdCurso = grupo.Curso.id;
              $http.post('php/crearGrupo.php', {"data":grupo}).success(function (data) {

                grupo.id = data;

                $scope.grupos = funciones.agregarALista($scope.grupos, grupo);
                $scope.guardarProfesor(grupo);

                funciones.alert("contentbody","success",'<strong>'+"Bien!.."+'</strong> guardado con exito',3500);
                setTimeout(function(){$("#modalGrupo").modal('hide')},1000);   
              });
            }else{ //editar usuario
              $http.post("php/modificarGrupo.php", { "data" : $scope.grupo})
              .success(function(data) {
                
                $scope.grupos = funciones.editarDeLista($scope.grupos, grupo);
                $scope.guardarProfesor(grupo);
                funciones.alert("contentbody","success",'<strong>'+"Bien!.."+'</strong> guardado con exito',3500);
                setTimeout(function(){$("#modalGrupo").modal('hide')},1000);  
                })
              .error(function(data, status) {
                  return false;
              }); 
            }
          }else{
            funciones.alert("contentbody","danger",'<strong>'+"Ops!.."+'</strong>  Debes llenar todos los campos',3500);
          }  
        };

        $scope.borrarObjeto= function(grupo){
          $scope.deletePointer = grupo;
        }

        $scope.borrar = function(){
          $scope.clearGroup($scope.deletePointer);
          $http.post("php/borrarGrupo.php", { "data" : $scope.deletePointer}) 
            .success(function(data) {
              $scope.grupos = funciones.borrarDeLista($scope.grupos, $scope.deletePointer);
            })
            .error(function(data, status) {
              return false;
            });
          $("#modalConfirm").modal('hide');
        };

        $scope.clearGroup = function (grupo) {
          angular.forEach(grupo.estudiantes, function (value, key) {
            $http.post("php/eliminarEstudianteGrupo.php", {"IdGrupo": grupo.id, "IdEstudiante": value.id})
              .success(function (data) {});
          });
          angular.forEach(grupo.profesores, function (value, key) {
            $http.post("php/eliminarProfesorGrupo.php", {"IdGrupo": grupo.id, "IdProfesor": value.id})
              .success(function (data) {});
          });
        }


        $scope.agregarProfesor = function(pTeacher){
          var onOriginal = funciones.repeatCheck($scope.originalTeachers, pTeacher, 'id'),
              onGroup = funciones.repeatCheck($scope.modalGroup.profesores, pTeacher, 'id'),
              onTargetList = funciones.repeatCheck($scope.targetUsers.toDelete, pTeacher, 'id');

          if (!onGroup) {
            funciones.agregarAListaNoRepetido($scope.modalGroup.profesores, pTeacher);
            funciones.borrarDeLista($scope.modalTeachers, pTeacher);

            if (!onOriginal) {
              if (!onTargetList) {
                funciones.agregarAListaNoRepetido($scope.targetUsers.toAdd, pTeacher);              
              }
            } else {
              funciones.borrarDeLista($scope.targetUsers.toDelete, pTeacher);
            }
          }
        };

        $scope.cambiarArea = function(profe,selectedArea){
          profe.area = selectedArea; 

          angular.forEach($scope.grupos.profesores,function(value,key){
            if(value.id == profe.id){
              value.area = profe.area;
            }
          });

        };

        $scope.quitarProfesor = function(pTeacher){
          var onOriginal = funciones.repeatCheck($scope.originalTeachers, pTeacher, 'id'),
              onGroup = funciones.repeatCheck($scope.modalGroup.profesores, pTeacher, 'id'),
              onTargetList = funciones.repeatCheck($scope.targetUsers.toAdd, pTeacher, 'id');

          if (onGroup) {
            funciones.borrarDeLista($scope.modalGroup.profesores, pTeacher);
            funciones.agregarAListaNoRepetido($scope.modalTeachers, pTeacher);

            if (!onOriginal) {
              if (onTargetList) {
                funciones.borrarDeLista($scope.targetUsers.toAdd, pTeacher);
              }
            } else {
              funciones.agregarAListaNoRepetido($scope.targetUsers.toDelete, pTeacher);
            }
          }
        };


        $scope.agregarEstudiante = function(pStudent){
          var onOriginal = funciones.repeatCheck($scope.originalStudents, pStudent, 'id'),
              onGroup = funciones.repeatCheck($scope.modalGroup.estudiantes, pStudent, 'id'),
              onTargetList = funciones.repeatCheck($scope.targetUsers.toDelete, pStudent, 'id');

          if (!onGroup) {
            funciones.agregarAListaNoRepetido($scope.modalGroup.estudiantes, pStudent);
            funciones.borrarDeLista($scope.modalStudents, pStudent);

            if (!onOriginal) {
              if (!onTargetList) {
                funciones.agregarAListaNoRepetido($scope.targetUsers.toAdd, pStudent);              
              }
            } else {
              funciones.borrarDeLista($scope.targetUsers.toDelete, pStudent);
            }
          }
        };

        $scope.quitarEstudiante = function(pStudent){
          var onOriginal = funciones.repeatCheck($scope.originalStudents, pStudent, 'id'),
              onGroup = funciones.repeatCheck($scope.modalGroup.estudiantes, pStudent, 'id'),
              onTargetList = funciones.repeatCheck($scope.targetUsers.toAdd, pStudent, 'id');

          if (onGroup) {
            funciones.borrarDeLista($scope.modalGroup.estudiantes, pStudent);
            funciones.agregarAListaNoRepetido($scope.modalStudents, pStudent);

            if (!onOriginal) {
              if (onTargetList) {
                funciones.borrarDeLista($scope.targetUsers.toAdd, pStudent);
              }
            } else {
              funciones.agregarAListaNoRepetido($scope.targetUsers.toDelete, pStudent);
            }
          }
        };


        $scope.guardarEstudiante = function(grupo){
          $scope.grupos = funciones.editarDeLista($scope.grupos, grupo);

          angular.forEach($scope.targetUsers.toDelete, function (value, key) {
            $http.post("php/eliminarEstudianteGrupo.php", {"IdGrupo": grupo.id, "IdEstudiante": value.id})
              .success(function (data) {});
          });
          angular.forEach($scope.targetUsers.toAdd, function (value, key) {
            $http.post("php/crearEstudianteGrupo.php", {"IdGrupo": grupo.id, "IdEstudiante": value.id})
              .success(function (data) {});
          });

          funciones.alert("contentbody2","success",'<strong>'+"Bien!.."+'</strong> guardado con exito',3500);
          setTimeout(function(){$("#modalEstudiantes").modal('hide')},1000);  
        };

        $scope.guardarProfesor = function(grupo){
          angular.forEach($scope.targetUsers.toDelete, function (value, key) {
            $http.post("php/eliminarProfesorGrupo.php", {"IdGrupo": grupo.id, "IdProfesor": value.id})
              .success(function (data) {});
          });
          angular.forEach($scope.targetUsers.toAdd, function (value, key) {
            $http.post("php/crearProfesorGrupo.php", {"IdGrupo": grupo.id, "IdProfesor": value.id, "IdArea": value.area.id})
              .success(function (data) {});
          });
        };

      }]
    };
  });

  app.directive('modalGrupo',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/grupos/modalGrupo.html',
      controller: ['$scope','$http',function ($scope,$http) {

      }],
      controllerAs: 'modalGrupoCntrl'
    };
  });

  app.directive('modalEstudiantes',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/grupos/modalEstudiantes.html',
      controller: ['$scope','$http',function ($scope,$http) {
      }],
      controllerAs: 'modalEstudianteGrupoCntrl'
    };
  });


})();