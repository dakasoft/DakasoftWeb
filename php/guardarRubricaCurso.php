
<?php
include "conexion.php";
$data = file_get_contents("php://input");

$objData = json_decode($data);
$data = $objData->data;

$qry = "CALL rubricadeCurso('$data->id','$data->IdRubrica')";
$result = mysqli_query($conexion,$qry);

// // rubricaporGrupo

mysqli_close($conexion);
?>