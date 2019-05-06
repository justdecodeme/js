<?php
	session_start();
	if (empty($_SESSION['uid']) || empty($_SESSION['role'])) {
		$url = './../login.php?redirect=./modules/combase/archive.php';
		header("Location: {$url}");
		exit;
	} else {
		session_on();
	}

	function session_on() {
		$tmp = $_SESSION;
		$_SESSION = array();
		session_destroy();
		session_id(md5(uniqid(rand(), 1)));
		session_start();
		$_SESSION = $tmp;
	}
?>
<!DOCTYPE html>
<html lang="ja">
	<head>
		<meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta http-equiv=”Cache-Control” content=”no-cache”>
       	<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0">
        <title>FFlearning - 本だな</title>
		<meta name="description" content="Framework for Future learning">
		<meta name="author" content="FUJI SOFT INCORPORATED">
		<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
		<link rel="apple-touch-icon" href="apple-touch-icon.png" />
		<link rel="apple-touch-icon" sizes="57x57" href="apple-touch-icon-57x57.png" />
		<link rel="apple-touch-icon" sizes="72x72" href="apple-touch-icon-72x72.png" />
		<link rel="apple-touch-icon" sizes="76x76" href="apple-touch-icon-76x76.png" />
		<link rel="apple-touch-icon" sizes="114x114" href="apple-touch-icon-114x114.png" />
		<link rel="apple-touch-icon" sizes="120x120" href="apple-touch-icon-120x120.png" />
		<link rel="apple-touch-icon" sizes="144x144" href="apple-touch-icon-144x144.png" />
		<link rel="apple-touch-icon" sizes="152x152" href="apple-touch-icon-152x152.png" />
		<link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon-180x180.png" />
<!--
		<link rel="stylesheet" href="css/normalize.css">
		<link rel="stylesheet" href="css/fs_combase.css">
-->
		<link rel="stylesheet" href="css/archive.css" rel="stylesheet">
	</head>
	<body>

		<div class="wrapper">
		  <header class="header">
			<div class="header__left">
			  <div class="header__icon-block icon-people">
				<div class="header__icon-block-inner">
				  <p id="user_id"></p>
				</div>
			  </div>
			  <div class="header__icon-block icon-school">
				<div class="header__icon-block-inner">
				  <p id="school_name"></p>
				</div>
			  </div>
			</div>
			<div class="header__right">
			  <div class="header__icon-block icon-clock">
				<div class="header__icon-block-inner">
				  <p id="today"></p>
				</div>
			  </div>
			  <div class="header__exit-button"><a href="#"><img src="./img/archive/icon-exit.png"></a></div>
			</div>
		  </header>
		  <main class="main-contents">
			<div class="container">
	<!--
			  <section class="c-book-list c-list-favorite">
				<div class="c-book-list__top">
				  <h2 class="label-favorite">おすすめ</h2>
				</div>
				<ul>
				  <li class="list-item">
					<div class="list-item__wrapper">
					  <div class="list-item__image">
						<figure><img src="./img/book001.png"></figure>
					  </div>
					  <div class="list-item__text">
						<p class="title">CROWN</p>
						<p class="text">中学英語2年<br>(株)三省堂
						</p>
						<p class="time mark">2018年7月18日<br>午後2時45分
						</p>
					  </div>
					</div>
				  </li>
				  <li class="list-item">
					<div class="list-item__wrapper">
					  <div class="list-item__image">
						<figure><img src="./img/book002.png"></figure>
					  </div>
					  <div class="list-item__text">
						<p class="title">ONE WORLD</p>
						<p class="text">中学英語2年<br>教育出版
						</p>
					  </div>
					</div>
				  </li>
				  <li class="list-item">
					<div class="list-item__wrapper">
					  <div class="list-item__image">
						<figure><img src="./img/book003.png"></figure>
					  </div>
					  <div class="list-item__text">
						<p class="title">せいかつ上</p>
						<p class="text">中学2年<br>学校図書株式会社
						</p>
						<p class="time">2018年7月18日<br>午後2時45分
						</p>
					  </div>
					</div>
				  </li>
				  <li class="list-item">
					<div class="list-item__wrapper">
					  <div class="list-item__image">
						<figure><img src="./img/book004.png"></figure>
					  </div>
					  <div class="list-item__text">
						<p class="title">現代保健体育</p>
						<p class="text">中学2年<br>学校図書株式会社
						</p>
						<p class="time">2018年7月18日<br>午後2時45分
						</p>
					  </div>
					</div>
				  </li>
				</ul>
			  </section>
	-->
			  <section class="c-book-list c-list-common">
				<form action="">
				  <div class="c-book-list__top">
					<h2 class="label-book">本だな</h2>
					<p class="select-style">
					  <input id="sort-lately" type="radio" name="sort" value="lately" checked>
					  <label for="sort-lately">最近使用した順</label>
					</p>
					<p class="select-style">
					  <input id="sort-title" type="radio" name="sort" value="title">
					  <label for="sort-title">タイトル順</label>
					</p>
				  </div>
				</form>
				<ul id="ul-book">
	<!--
				  <li class="list-item">
					<div class="list-item__wrapper">
					  <div class="list-item__image">
						<img src="./img/archive/book001.png">
					  </div>
					  <div class="list-item__text">
						<p class="title">CROWN</p>
						<p class="text">中学英語2年<br>(株)三省堂
						</p>
						<p class="time">2018年7月18日<br>午後2時45分
						</p>
					  </div>
					</div>
				  </li>
				  <li class="list-item">
					<div class="list-item__wrapper">
					  <div class="list-item__image">
						<figure><img src="./img/archive/book002.png"></figure>
					  </div>
					  <div class="list-item__text">
						<p class="title">ONE WORLD</p>
						<p class="text">中学英語2年<br>教育出版
						</p>
						<p class="time">2018年7月18日<br>午後2時45分
						</p>
					  </div>
					</div>
				  </li>
				  <li class="list-item">
					<div class="list-item__wrapper">
					  <div class="list-item__image">
						<figure><img src="./img/archive/book003.png"></figure>
					  </div>
					  <div class="list-item__text">
						<p class="title">せいかつ上</p>
						<p class="text">中学2年<br>学校図書株式会社
						</p>
						<p class="time">2018年7月18日<br>午後2時45分
						</p>
					  </div>
					</div>
				  </li>
				  <li class="list-item">
					<div class="list-item__wrapper">
					  <div class="list-item__image">
						<figure><img src="./img/archive/book004.png"></figure>
					  </div>
					  <div class="list-item__text">
						<p class="title">現代保健体育</p>
						<p class="text">中学2年<br>学校図書株式会社
						</p>
						<p class="time">2018年7月18日<br>午後2時45分
						</p>
					  </div>
					</div>
				  </li>
				  <li class="list-item">
					<div class="list-item__wrapper">
					  <div class="list-item__image">
						<figure><img src="./img/archive/book001.png"></figure>
					  </div>
					  <div class="list-item__text">
						<p class="title">CROWN</p>
						<p class="text">中学英語2年<br>(株)三省堂
						</p>
						<p class="time">2018年7月18日<br>午後2時45分
						</p>
					  </div>
					</div>
				  </li>
				  <li class="list-item">
					<div class="list-item__wrapper">
					  <div class="list-item__image">
						<figure><img src="./img/archive/book002.png"></figure>
					  </div>
					  <div class="list-item__text">
						<p class="title">ONE WORLD</p>
						<p class="text">中学英語2年<br>教育出版
						</p>
						<p class="time">2018年7月18日<br>午後2時45分
						</p>
					  </div>
					</div>
				  </li>
				  <li class="list-item">
					<div class="list-item__wrapper">
					  <div class="list-item__image">
						<figure><img src="./img/archive/book003.png"></figure>
					  </div>
					  <div class="list-item__text">
						<p class="title">せいかつ上</p>
						<p class="text">中学2年<br>学校図書株式会社
						</p>
						<p class="time">2018年7月18日<br>午後2時45分
						</p>
					  </div>
					</div>
				  </li>
				  <li class="list-item">
					<div class="list-item__wrapper">
					  <div class="list-item__image">
						<figure><img src="./img/archive/book004.png"></figure>
					  </div>
					  <div class="list-item__text">
						<p class="title">現代保健体育</p>
						<p class="text">中学2年<br>学校図書株式会社
						</p>
						<p class="time">2018年7月18日<br>午後2時45分
						</p>
					  </div>
					</div>
				  </li>
-->
				</ul>
			  </section>
			</div>
		  </main>
		</div>
  	</body>
    <!-- javascript-->
    <script src="./js/jquery-3.2.1.min.js"></script>
    <script src="../../contents/fflcom_contents.js"></script>
	<script>
		window.onload = setContentsList;
		
		var userInfo = {
			userId: "MSD10000563220",
			schoolName: "横浜市立富士第2小学校- 265706020183",
		};
        
		var sampleInfo = [
			{
				title:"サンプル",
				text:"",
				time:""
			}
        ];

		var booksInfo = [
			{
				title:"国語",
				text:"中学２年<br>富士ソフト(株)",
				time:"2018年10月18日<br>午後2時45分"
			},
			{
				title:"算数",
				text:"小学５年<br>富士ソフト(株)",
				time:"2018年11月5日<br>午前10時58分"
			},
			{
				title:"上下綴じサンプル１",
				text:"小学１年<br>富士ソフト(株)",
				time:"2018年11月1日<br>午後1時11分"
			},
			{
				title:"上下綴じサンプル２",
				text:"小学２年<br>富士ソフト(株)",
				time:"2018年2月2日<br>午後2時22分"
			}
		];

		for(var i=0;i<fflcom_contents.length;i++){
			var element = new Image();
			element.src = '../../contents/'+fflcom_contents[i]+'/front.png';
		}
		
        function setContentsList(_ul){

			var now = new Date();
			
			var year = now.getFullYear();
			var month = now.getMonth()+1;
			var week = now.getDay();
			var day = now.getDate();
			
			var p1 = document.getElementById("today");
			var p2 = document.getElementById("user_id");
			var p3 = document.getElementById("school_name");
			
			p1.innerText = year+"年"+month+"月"+day+"日";
			p2.innerText = userInfo.userId;
			p3.innerText = userInfo.schoolName;
			
			var ul = document.getElementById("ul-book");
			for(var i=0;i<fflcom_contents.length;i++){
			
				var li = document.createElement('li');
			
				li.className = "list-item";
				
				var index = '../../contents/'+fflcom_contents[i]+'/index.php';
				var path = '../../contents/'+fflcom_contents[i]+'/front.png';
				var element = new Image();
				
				element.src = '../../contents/'+fflcom_contents[i]+'/front.png';
                
                var title = "サンプル";
                var text = "";
                var time = "";
                
                if(fflcom_contents[i] == "FSI_KOKUGO_3_1"){
                    title = booksInfo[0].title;
                    text = booksInfo[0].text;
                    time = booksInfo[0].time;
                }else if(fflcom_contents[i] == "FSI_SANSUU_5_1"){
                    title = booksInfo[1].title;
                    text = booksInfo[1].text;
                    time = booksInfo[1].time;
                }else if(fflcom_contents[i] == "FSI_TEST_UPDOWN"){
                    title = booksInfo[2].title;
                    text = booksInfo[2].text;
                    time = booksInfo[2].time;
                }else if(fflcom_contents[i] == "FSI_TEST_UPDOWN2"){
                    title = booksInfo[3].title;
                    text = booksInfo[3].text;
                    time = booksInfo[3].time;
                }
				
				if(element.width > element.height){
					li.innerHTML = '<div class="list-item__wrapper"><div class="list-item__image"><figure><a href='+ index +'><img class="imgContentsUD" src='+ path +'></a></figure></div><div class="list-item__text"><p class="title">'+title+'</p><p class="text">'+text+'</p><p class="time">'+time+'</p></div></div>';
				}else{
					li.innerHTML = '<div class="list-item__wrapper"><div class="list-item__image"><figure><a href='+ index +'><img class="imgContents" src='+ path +'></a></figure></div><div class="list-item__text"><p class="title">'+title+'</p><p class="text">'+text+'</p><p class="time">'+time+'</p></div></div>';
				}
				
				ul.appendChild(li);
			}
		}
	</script>
</html>