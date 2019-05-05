<?php
	session_start();
	if (isset($_COOKIE[session_name()])) {
		setcookie(session_name(), '', time()-42000, '/');
	}
	session_destroy();
?>
<!DOCTYPE html>
<html lang="ja">
	<head>
		<meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta http-equiv=”Cache-Control” content=”no-cache”>
       	<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0">
        <title>FFlearning - ログアウト</title>
		<meta name="description" content="Framework for Future learning">
		<meta name="author" content="FUJI SOFT INCORPORATED">
		<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
	</head>
	<body>
		<h2>ログアウトしました。</h2>
		<a href="./login.php">ログイン画面に戻る</a>
  	</body>
</html>