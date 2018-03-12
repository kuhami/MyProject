
		<?php

		/*
		 * 对象数据类型也可以用于存储数据。
		 在 PHP 中，对象必须声明。
		 首先，你必须使用class关键字声明类对象。类是可以包含属性和方法的结构。
		 然后我们在类中定义数据类型，然后在实例化的类中使用数据类型：
		 */
		class Car {
			var $color;
			function Car($color = "green") {
				$this -> color = $color;
			}

			function what_color() {
				return $this -> color;
			}

		}

		function print_vars($obj) {
			foreach (get_object_vars($obj) as $prop => $val) {
				echo "\t$prop = $val\n";
			}
		}

		// instantiate one object
		$herbie = new Car("white");

		// show herbie properties
		//		echo "\herbie: Properties\n <br/>";
		//		print_vars($herbie);

		// 区分大小写的常量名
		define("GREETING", "欢迎访问 Runoob.com", false);
		//不写默认false，则区分大小写，true：不区分大小写；
		echo GREETING;
		// 输出 "欢迎访问 Runoob.com"
		echo '<br>';
		echo greeting;
		// 输出 "greeting"
		//		define("GREETING", "欢迎访问 Runoob.com");

		echo '<hr/>';
		function myTest() {
			echo GREETING;
		}

		myTest();
		// 输出 "欢迎访问 Runoob.com"

		echo '<hr/>';
		$txt1 = "Hello，";
		$txt2 = "刘亚磊!";
		echo $txt1  .''. $txt2;
		echo '<hr/>';
		
		$arr = [];
		$arr1 = [['name'=>"liu",'age'=>'18'],['name'=>"liu1",'age'=>'19']];
		
		foreach($arr1 as $k => $val)
		{
			$arr[] = $val['age'];
		}
		print_r($arr);
		
		echo json_encode($arr);
		echo '<hr/>';
		echo strlen("Hello"."world!");//字符串拼接 "Hello"."world!"
		
		echo "<hr>";
		$x=100; 
		$y="100";
		
		var_dump($x == $y); // returns true because values are equal
		echo "<br>";
		var_dump($x === $y); // returns false because types are not equal
		echo "<br>";
		var_dump($x != $y); // returns false because values are equal
		echo "<br>";
		var_dump($x !== $y); // returns true because types are not equal
		echo "<br>";
		
		$a=50;
		$b=90;
		
		var_dump($a > $b);
		echo "<br>";
		var_dump($a <  $b);
		/*输出结果
		 *  bool(true) 
			bool(false) 
			bool(false) 
			bool(true) 
			bool(false) 
			bool(true)
		 */
        ?>