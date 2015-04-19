<?php

include "conexion.php";
$data = file_get_contents("php://input");

$objData = json_decode($data);
$data = $objData->data;

 $query = "CALL agregarProyectos('$data->id')";
 $result = mysqli_query($conexion,$query);
var_dump($data);
if($result){
// 	$Insert_Id = $result->fetch_array(MYSQLI_ASSOC);
// 	echo json_encode($Insert_Id);
// 	mysqli_free_result($result);
	return true;
 }else{
	echo false;
}

mysqli_close($conexion);

?>