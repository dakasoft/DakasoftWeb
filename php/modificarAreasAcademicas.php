<?php

include "conexion.php";
$data = file_get_contents("php://input");

$objData = json_decode($data);
$data = $objData->data;
$rolid = $data->rol->id;

$query = "CALL areasAcademicasModificar('$data->id','$data->Nombre','$data->Codigo')";
$result = mysqli_query($conexion,$query);

if($result){
	echo true;
}else{
	echo false;
}

mysqli_close($conexion);

?>