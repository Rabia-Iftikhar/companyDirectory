<?php

	// example use from browser
	// http://localhost/companydirectory/libs/php/getAll.php

	// remove next two lines for production
	
	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

	include("config.php");

	header('Content-Type: application/json; charset=UTF-8');

	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

	if (mysqli_connect_errno()) {
		
		$output['status']['code'] = "300";
		$output['status']['name'] = "failure";
		$output['status']['description'] = "database unavailable";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output);

		exit;

	}	

	
$depId = $_POST['departmentId'];
$locId = $_POST['locationId'];
$orderBy = $_POST['orderBySelect'];
$direction = $_POST['directionValue'];


if ($depId === ''){
	$depId = null;
}
if ($locId === ''){	
	$locId = null;
}

if (isset($depId) && isset($locId)){
 $query = "SELECT personnel.id, personnel.lastName, personnel.firstName, personnel.email,  d.name AS department, l.name AS locationName, l.id AS locationId FROM personnel  LEFT JOIN department d ON d.id = personnel.departmentID  LEFT JOIN location l ON l.id = d.locationID WHERE  l.id = '$locId' AND d.id = '$depId' ORDER BY $orderBy $direction, personnel.lastName"; 
} elseif(isset($depId) && !isset($locId)){
	$query = "SELECT personnel.id, personnel.lastName, personnel.firstName, personnel.email,  d.name AS department, l.name AS locationName, l.id AS locationId FROM personnel  LEFT JOIN department d ON d.id = personnel.departmentID  LEFT JOIN location l ON l.id = d.locationID WHERE d.id = '$depId' ORDER BY $orderBy $direction, personnel.lastName";
} elseif (!isset($depId) && isset($locId)){
	$query = "SELECT personnel.id, personnel.lastName, personnel.firstName, personnel.email,  d.name AS department, l.name AS locationName, l.id AS locationId FROM personnel  LEFT JOIN department d ON d.id = personnel.departmentID  LEFT JOIN location l ON l.id = d.locationID WHERE l.id = '$locId' ORDER BY $orderBy $direction, personnel.lastName";
} else{
	$query = "SELECT personnel.id, personnel.lastName, personnel.firstName, personnel.email,  d.name AS department, l.name AS locationName, l.id AS locationId FROM personnel  LEFT JOIN department d ON d.id = personnel.departmentID  LEFT JOIN location l ON l.id = d.locationID ORDER BY $orderBy $direction, personnel.lastName";
}


	$result = $conn->query($query);
	
	if (!$result) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output); 

		exit;

	}
   
   	$data = [];

	while ($row = mysqli_fetch_assoc($result)) {

		array_push($data, $row);

	}


	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = $data;
	
	mysqli_close($conn);

	echo json_encode($output); 

?>