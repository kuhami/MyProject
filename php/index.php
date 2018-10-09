<!DOCTYPE html>
<html>

	<body>
        <div>我是index.php</div>

		<?php

		$arr = array('name' => "小明", 'age' => 23);
//				echo json_encode($arr);
		//json格式exit();

		//打断点
		////var_dump($arr);
		////print_r($arr);

		//		$x = 5;
		//		$y = 10;

		//		function myTest() {
		//			global $x, $y;
		//			//global局部变量变全局变量
		//			$y = $x + $y;
		//		}
		//
		//		myTest();
		//		echo $y;
		// 输出 15

		//2
		//		function myTest() {
		//			static $x = 0;
		//			//static当一个函数完成时，它的所有变量通常都会被删除。然而，有时候您希望某个局部变量不要被删除。要做到这一点，请在您第一次声明变量时使用 static 关键字:
		//			echo $x;
		//			$x++;
		//		}
		//
		//		myTest();
		//		myTest();
		//		myTest();

		//3
//		function myTest($x) {
//			echo $x;
//		}

		//		myTest(5);

		//		$txt1 = "学习 PHP";
		//		$txt2 = "*****西米工作室*****";
		//		$cars = array("Volvo", "BMW", "Toyota");
		//
		//		echo "<h2>PHP 很有趣!</h2>";
		//		echo "<br>";
		//		echo "在 $txt2 学习 PHP ";
		//		echo "<br>";
		//		echo "我车的品牌是 {$cars[0]}";

		//String（字符串）, Integer（整型）, Float（浮点型）, Boolean（布尔型）, Array（数组）, Object（对象）, NULL（空值）
//		$x = 5985;
//		echo $x;
//		echo "<br>";
//		var_dump($x);
//		echo "<br>";
//		$x = -345;
//		// 负数
//		var_dump($x);
//		echo "<br>";
//		$x = 0x8C;
//		// 十六进制数
//		var_dump($x);
//		echo "<br>";
//		$x = 047;
//		// 八进制数
//		var_dump($x);
		$cars=array("Volvo","BMW","Toyota");
//		var_dump($cars);
		echo json_encode($cars);
		?>
	</body>
</html>