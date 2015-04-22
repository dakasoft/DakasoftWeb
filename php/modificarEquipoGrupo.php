<?php

include "conexion.php";
$data = file_get_contents("php://input");

$objData = json_decode($data);
$data = $objData->data;

$query = "CALL equipoGrupoModificar('$data->id','$data->Nombre')";
$result = mysqli_query($conexion,$query);

$query = "CALL estudiantesEquipoEliminar('$data->id')"; // aqui los borro
$result = mysqli_query($conexion,$query);
var_dump($result);

if($result){
	foreach ($data->Integrantes as &$estudiante) { 
    	$idEstudiante = $estudiante->id;
    	$idrol = $estudiante->Role->id;
       $qry = "CALL estudianteEquipoAgregar('$idEstudiante','$data->id','$idrol')"; //
	    mysqli_query($conexion,$qry);
      }
   }else{
 	echo false;
   }

mysqli_close($conexion);

?>