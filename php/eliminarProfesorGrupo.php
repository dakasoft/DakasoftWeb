<?php

include "conexion.php";
$data = file_get_contents("php://input");

$objData = json_decode($data);

$IdGrupo = $objData->IdGrupo;
$IdProfesor = $objData->IdProfesor;

var_dump($objData);

$query = "CALL profesorPorGrupoEliminar('$IdGrupo', '$IdProfesor')";

$result = mysqli_query($conexion,$query);

if($result){
	echo true;
}else{
	echo false;
}

mysqli_close($conexion);

?>