<?php

$sInputUserEmail = $_GET['email'];
// $sInputUserPassword = $_GET['password'];


$sUsers = file_get_contents("users_credentials.json");
$ajUsers = json_decode( $sUsers );
$foundUser = false;

for( $i=0; $i < count($ajUsers); $i++ ){
	$userEmailFromJson = $ajUsers[$i]->userEmail;
	$userPasswordFromJson = $ajUsers[$i]->userPassword;	
	$userIdFromJson = $ajUsers[$i]->userId;
	echo $userEmailFromJson;
	echo $userPasswordFromJson;

	// if( $sInputUserEmail ==  $userEmailFromJson && $sInputUserPassword == $userPasswordFromJson ){
	// 	session_start();

	// 	$_SESSION['user_id']=$userIdFromJson;
	// 	$_SESSION['user_email']=$userEmailFromJson;
	// 	$_SESSION['user_address']=$userAddressFromJson;

	// 	$foundUser = true;	
	// }	
}

// if($foundUser){ 
// 	echo '{"status":"ok","user":"' . $_SESSION['user_email'] . '"}';	
// }
// else{
// 	echo '{"status":"error"}';
// }
	
	?>