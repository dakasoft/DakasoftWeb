
<?php
include "conexion.php";
$data = file_get_contents("php://input");

$objData = json_decode($data);
$data = $objData->data;

var_dump($data);
//La rubrica se guarda en orden
$qry = "CALL rubricadeGrupo('$data->id','$data->Rubrica')";
$result = mysqli_query($conexion,$qry);

mysqli_close($conexion);
?>