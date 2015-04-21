<?php
include "conexion.php";
$data = file_get_contents("php://input");

$objData = json_decode($data);
$data = $objData->data;

$qry = "CALL rubricaPorRubro('$data->rubrica','$data->id')";
$result = mysqli_query($conexion,$qry);

mysqli_close($conexion);

?>