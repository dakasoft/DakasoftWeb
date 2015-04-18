<?php

include "conexion.php";
$data = file_get_contents("php://input");

$objData = json_decode($data);
$data = $objData->data;

var_dump($data->id);
$query = "CALL carreraModificar('$data->id','$data->Nombre','$data->Codigo')";
$result = mysqli_query($conexion,$query);
$Cursos= $data->Cursos;

$query = "CALL cursocarreraEliminar('$data->id')"; // aqui los borro
$result = mysqli_query($conexion,$query);


if($result){
	echo "entrando";
	foreach ($data->Cursos as &$cursos) { 
    	$idCurso = $cursos->id;
      $qry = "CALL cursoporcarreraCrear('$idCurso','$data->id')"; //
	    mysqli_query($conexion,$qry);
      }
 	echo true;
}else{
 	echo false;
 }

mysqli_close($conexion);

?>