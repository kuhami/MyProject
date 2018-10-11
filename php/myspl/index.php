<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "myDB";
$port = "8889";
// 创建连接
$conn = new mysqli($servername, $username, $password, $dbname, $port);

// 检测连接
if (!$conn) {
    die("连接失败: " . mysqli_connect_error());
}


//$sql = "CREATE TABLE websites (
//`id` int(11) NOT NULL AUTO_INCREMENT,
//  `name` char(20) NOT NULL DEFAULT '' COMMENT '站点名称',
//  `url` varchar(255) NOT NULL DEFAULT '',
//  `alexa` int(11) NOT NULL DEFAULT '0' COMMENT 'Alexa 排名',
//  `country` char(10) NOT NULL DEFAULT '' COMMENT '国家',
//  PRIMARY KEY (`id`)
//)";

// 使用 sql 创建数据表

// 使用 sql 创建数据表
//$sql = "CREATE TABLE Forms (
//id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
//userName VARCHAR(30) NOT NULL,
//passWord VARCHAR(30) NOT NULL
//)";
////
//if ($conn->query($sql) === TRUE) {
//    echo "Table Forms created successfully";
//} else {
//    echo "创建数据表错误: " . $conn->error;
//}
//

//$sql = "INSERT INTO websites VALUES ('1', 'Google', 'https://www.google.cm/', '1', 'USA'), ('2', '淘宝', 'https://www.taobao.com/', '13', 'CN'), ('3', '菜鸟教程', 'http://www.runoob.com/', '4689', 'CN'), ('4', '微博', 'http://weibo.com/', '20', 'CN'), ('5', 'Facebook', 'https://www.facebook.com/', '3', 'USA')";
//
//if ($conn->query($sql) === TRUE) {
//    echo "新记录插入成功";
//} else {
//    echo "Error: " . $sql . "<br>" . $conn->error;
//}

/*$sql = "INSERT INTO MyGuests (firstname, lastname, email)
VALUES ('John', 'Doe', 'john@example.com')";


echo $conn->query($sql) === TRUE;

if ($conn->query($sql) === TRUE) {
    echo "新记录插入成功";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}*/
//$conn->close();

//$sql = "INSERT INTO MyGuests (firstname, lastname, email)
//VALUES ('John', 'Doe', 'john@example.com');";
//$sql .= "INSERT INTO MyGuests (firstname, lastname, email)
//VALUES ('Mary', 'Moe', 'mary@example.com');";
//$sql .= "INSERT INTO MyGuests (firstname, lastname, email)
//VALUES ('Julie', 'Dooley', 'julie@example.com')";
//
//
//if ($conn->multi_query($sql) === TRUE) {
//    echo "新记录插入成功";
//} else {
//    echo "Error: " . $sql . "<br>" . $conn->error;
//}

//$sql = mysqli_query($conn,"DELETE FROM MyGuests WHERE LastName='Dooley'");
//
//
//if ($sql) {
//    echo "删除成功";
//} else {
//    echo "Error: " . $sql . "<br>" . $conn->error;
//}

$conn->close();


?>