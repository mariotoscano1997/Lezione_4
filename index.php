<?php 
include 'inc/conf/functions.php';
$page= getPage();
include 'inc\template-vars\\'.$page.'.php';
include 'inc\template-parts\header.php';
include 'inc\template-parts\navbar.php';
include 'inc\\'.$page.'.php';
include 'inc\template-parts\footer.php';
include 'inc\template-parts\before_body_close.php';