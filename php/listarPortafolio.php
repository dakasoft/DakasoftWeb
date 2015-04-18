<?php

include "conexion.php";



$query = "CALL portafolioListar()";
$result = mysqli_query($conexion,$query);
var_dump($result);


$rows = array();

while($r = mysqli_fetch_assoc($result)){
	$rows[] = $r;
}


	
mysqli_free_result($result);
mysqli_close($conexion);

echo json_encode($rows);

?>