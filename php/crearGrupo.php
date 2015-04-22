<?php

include "conexion.php";
$data = file_get_contents("php://input");


$objData = json_decode($data);
$data = $objData->data;

$Encargado = $data->Encargado;
$Curso = $data->Curso;

var_dump($Id);
$query = "CALL grupoCrear('$data->Nombre', '$Encargado->id', '$Curso->id')";

$result = mysqli_query($conexion,$query);

if($result){
	$Insert_Id = $result->fetch_array(MYSQLI_ASSOC);
	mysqli_free_result($result);
	echo json_encode($result);
	
}else{
	echo false;
}

mysqli_close($conexion);

?>


