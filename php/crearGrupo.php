<?php

include "conexion.php";
$data = file_get_contents("php://input");


$objData = json_decode($data);
$data = $objData->data;

$Encargado = $data->Encargado;
$Curso = $data->Curso;

$query = "CALL grupoCrear('$data->Nombre', '$Encargado->id', '$Curso->id')";
$result = mysqli_query($conexion,$query);

if($result){
	$Insert_Id = $result->fetch_array(MYSQLI_ASSOC);
	mysqli_free_result($result);
	echo json_encode($Insert_Id);
	
}else{
	echo false;
}

mysqli_close($conexion);

?>


