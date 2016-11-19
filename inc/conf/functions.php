<?php
function getPage(){
	if(isset($_GET['page']))
		$page=$_GET['page'];
	else
		$page='main';
	if(!file_exists('inc/' . $page . '.php')){
		$page='errore';
	}
return $page;
}