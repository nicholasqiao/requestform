<?php
	$data = $_POST['payload'];
	$length = $_POST['length'];
	
	$product = "";
	$platform = "";
	$sn = "";
	$key = "";
	$users = "";
	$comment = "";

	if ($length == 1) {
		$filename = trim($data[1][0]);
		$file = fopen("request-$filename.json", "w");
		list($platform, $product) = explode("-", $data[0]);
		$sn = trim($data[1][0]);
		$key = $data[2];
		$users = trim($data[3]);
		$comment = $data[4];

		$entries = array("product" => $product, "platform" => $platform, "sn" => $sn, "key" => $key, "users" => $users, "comment" => $comment);

		fwrite($file, json_encode($entries, JSON_PRETTY_PRINT));
		fwrite($file, PHP_EOL);
		fclose($file);
	} else {
		for ($x = 0; $x < $length; $x++) {
			$filename = trim($data[1][$x]);
			$file = fopen("request-$filename.json", "w");
			list($platform, $product) = explode("-", $data[0][$x]);
			
			$sn = trim($data[1][$x]);
			$key = $data[2][$x];
			$users = trim($data[3]);
			$comment = $data[4];

			$entries = array("product" => $product, "platform" => $platform, "sn" => $sn, "key" => $key, "users" => $users, "comment" => $comment);
			fwrite($file, json_encode($entries, JSON_PRETTY_PRINT));
			fwrite($file, PHP_EOL);
			fclose($file);
			unset($entries);
		}
		
	}

	
?>
