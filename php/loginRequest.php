<?php

	include "conexion.php";
	$data = file_get_contents("php://input");

	$objData = json_decode($data);
	$pEmail = $objData->email;
	$pPassword = $objData->password;

	$query = "CALL loginRequest('$pEmail')";
	$result = mysqli_query($conexion,$query);

	// var_dump($pEmail);
	// var_dump($pPassword);
	// var_dump($result);

	if($result){
		$user = $result->fetch_array(MYSQLI_ASSOC);
		$Password = $user['Password'];
		if ($Password == $pPassword) {
			session_start();
			$_SESSION['CurrentUser'] = $user;
			mysqli_free_result($result);
			echo json_encode($user);
		} else {
			$Error = array();
			$Error['Error'] = 'La contraseña ingresada es incorrecta';
			echo json_encode($Error);
		}
	}else{
		$Error = array();
		$Error['Error'] = 'El correo electronico ingresado no es valido';
		echo json_encode($Error);
	}
	mysqli_close($conexion);
?>