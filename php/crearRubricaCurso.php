<?php
include "conexion.php";
$data = file_get_contents("php://input");

$objData = json_decode($data);
$data = $objData->data;
// $data->rubricaFactor;
// var_dump($data->rubricaFactor);

$query = "CALL rubricaCursoCrear()";
$result = mysqli_query($conexion,$query);


if($result){
	$Insert_Id = $result->fetch_array(MYSQLI_ASSOC);
	echo json_encode($Insert_Id);
	
	
}else{
	echo false;
}

mysqli_free_result($result);


mysqli_close($conexion);

?>

