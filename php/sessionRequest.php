<?php
	include "conexion.php";

	echo json_decode($_SESSION['CurrentUser']);
	mysqli_close($conexion);
?>