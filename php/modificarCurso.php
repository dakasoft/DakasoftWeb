<?php

include "conexion.php";
$data = file_get_contents("php://input");

$objData = json_decode($data);
$data = $objData->data;
var_dump($data);

$query = "CALL cursoModificar('$data->id','$data->Nombre','$data->Codigo')";
$result = mysqli_query($conexion,$query);
var_dump($data);
$query = "CALL areasporcursoEliminar('$data->id')"; // aqui los borro
$result = mysqli_query($conexion,$query);


if($result){
	$Insert_Id = $result->fetch_array(MYSQLI_ASSOC);
	foreach ($data->Areas as &$areas) { 
		$idAreas = $areas->id;// $idAreas = $areas->id;
		$qry = "CALL areasporcursoCrear('$idAreas','$Insert_Id')"; //
	}
	mysqli_free_result($result);
	echo json_encode($Insert_Id);
}else{
	echo false;
}

mysqli_close($conexion);

?>