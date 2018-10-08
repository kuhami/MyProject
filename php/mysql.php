<?php
$servername = "10.88.200.113";
$username = "root";
$password = "123456";
$prot = "3307";

// 创建连接
$conn = new mysqli($servername, $username, $password,$prot);

// 检测连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}
echo "连接成功";
?>
