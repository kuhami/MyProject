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

// 使用 sql 创建数据表

// 使用 sql 创建数据表
//$sql = "CREATE TABLE MyGuests (
//id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
//firstname VARCHAR(30) NOT NULL,
//lastname VARCHAR(30) NOT NULL,
//email VARCHAR(50),
//reg_date TIMESTAMP
//)";
//
//if ($conn->query($sql) === TRUE) {
//    echo "Table MyGuests created successfully";
//} else {
//    echo "创建数据表错误: " . $conn->error;
//}
//

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

$sql = mysqli_query($conn,"DELETE FROM MyGuests WHERE LastName='Dooley'");


if ($sql) {
    echo "删除成功";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();


?>