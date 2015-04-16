<?php

include "conexion.php";
$data = file_get_contents("php://input");

$objData = json_decode($data);
$data = $objData->data;

$query = "CALL cursoModificar('$data->id','$data->Nombre','$data->Codigo')";
$result = mysqli_query($conexion,$query);
var_dump($data);
$query = "CALL areascursoEliminar('$data->id')"; // aqui los borro
$result = mysqli_query($conexion,$query);


if($result){
	$Insert_Id = $result->fetch_array(MYSQLI_ASSOC);
	foreach ($data->Areas as &$areas) { 
		$idAreas = $areas->id;// $idAreas = $areas->id;
		$qry = "CALL areascursoCrear('$idAreas','$Insert_Id')"; //
		 mysqli_query($conexion,$qry);
	}
	mysqli_free_result($result);
	echo json_encode($Insert_Id);
}else{
	echo false;
}

mysqli_close($conexion);

?>