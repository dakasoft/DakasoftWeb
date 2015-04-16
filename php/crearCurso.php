<?php

include "conexion.php";
$data = file_get_contents("php://input");

$objData = json_decode($data);
$data = $objData->data;
$query = "CALL cursoCrear('$data->Nombre','$data->Codigo')";

$result = mysqli_query($conexion,$query);

	
if($result){
	$Insert_Id = $result->fetch_array(MYSQLI_ASSOC);
	foreach ($data->Areas as &$areas) {
		$idArea = $areas->id;
		var_dump($idArea);
		$qry = "CALL areascursoCrear('$idArea','$Insert_Id')";//
		mysqli_query($conexion,$qry);
	}
	mysqli_free_result($result);
	echo json_encode($Insert_Id);
	
}else{
	echo false;
}

mysqli_close($conexion);

?>


