<?php

$servername = "localhost";
$username = "root";
$password = "root";


// 创建连接
$con = new mysqli($servername, $username, $password);
//$con = mysqli_connect('localhost', 'username', 'password');
if(! $con )
{
    die('连接失败: ' . mysqli_error($con));
}
mysqli_select_db($con,'bdm256727651_db');
$username = "select userName FROM Forms where userName = '$_POST[name]' ";
$result = mysqli_query($con,$username );
$rows=mysqli_num_rows($result);
if($rows){
    echo "手机号已注册";
    exit;
}else{
    echo " ";
    exit;
}

mysqli_close($con)
?>
