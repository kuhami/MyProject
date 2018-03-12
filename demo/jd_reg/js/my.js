function $(id) {
	return document.getElementById(id);
}
// 中文、字母、数字、_ - 4-20

var regs = {
	userNameReg: /^(([\u4e00-\u9fa5])|[a-zA-Z0-9-_]){4,20}$/,
	pwdReg: /^.{6,20}$/,
	numReg: /\d/,
	strReg: /[a-zA-Z]/,
	tsReg: /[^\u4e00-\u9fa5a-zA-Z0-9]/
}
window.onload = function() {
	// 用户名字母、数字、_、-、中文  \u4e00-\u9fa5  4-20
	// boxSign   常规 boxSign  出错的时候  boxSign errorSign  正确的时候  boxSign rightSign
	// tipSign   常规 tipSign hideSign  出错的时候  tipSign errorSign  默认的时候  tipSign defaultSign
	var userName = $("userName");
	var pwd = $("pwd");
	var pwd2 = $("pwd2");
	var email = $("email");
	var mobile = $("mobile");
	var ck = $("ck");
	var btn = $("btn");

	userName.onkeyup=userName.onfocus=userName.onblur=function(evt) {
		var e = evt || window.event;
		checkUserName(e);
	}
	function checkUserName(_e) {
		var type;
		if(_e) {
			type = _e.type;
		}
		var value = userName.value;
		var boxSign = userName.parentNode;
		var tipSign = boxSign.nextElementSibling;
		var span = tipSign.lastElementChild;
		if(type=="focus") {
			if(value=="") {
				boxSign.className = "boxSign";
				tipSign.className = "tipSign defaultSign";
				span.innerHTML = "支持汉字、字母、数字、“-”“_”的组合，4-20个字符";
				return false;
			}
		}
		if(type=="blur") {
			if(value=="") {
				boxSign.className = "boxSign";
				tipSign.className = "tipSign hideSign";
				return false;//不继续往下走
			}
		}

		if(value=="") {
			boxSign.className = "boxSign errorSign";
			tipSign.className = "tipSign errorSign";
			span.innerHTML = "用户名不能为空";
			return false;
		} else if(regs.userNameReg.test(value)) {
			boxSign.className = "boxSign rightSign";
			tipSign.className = "tipSign hideSign";
			return true;
		} else {
			boxSign.className = "boxSign errorSign";
			tipSign.className = "tipSign errorSign";
			span.innerHTML = "格式错误，仅支持汉字、字母、数字、“-”“_”的组合";
			return false;
		}
	}
	pwd.onkeyup=pwd.onfocus=pwd.onblur=function(evt) {
		var e = evt || window.event;
		checkPwd(e);
	}
	function checkPwd(_e) {
		var type;
		if(_e) {
			type = _e.type;
		}
		var value = pwd.value;
		var boxSign = pwd.parentNode;
		var tipSign = boxSign.nextElementSibling;
		var span = tipSign.lastElementChild;
		if(type=="focus") {
			if(value=="") {
				boxSign.className = "boxSign";
				tipSign.className = "tipSign defaultSign";
				span.innerHTML = "建议使用字母、数字和符号两种以上的组合,6-20个字符";
				return false;
			}
		}
		if(type=="blur") {
			if(value=="") {
				boxSign.className = "boxSign";
				tipSign.className = "tipSign hideSign";
				return false;
			}
		}

		if(value=="") {
			boxSign.className = "boxSign errorSign";
			tipSign.className = "tipSign errorSign";
			span.innerHTML = "密码不能为空";
			return false;
		} else if(regs.pwdReg.test(value)) {
			boxSign.className = "boxSign rightSign";
			var level = getPwdLevel(value);
			switch(level) {
				case 1:
					tipSign.className = "tipSign ruo";
					break;
				case 2:
					tipSign.className = "tipSign zhong";
					break;
				case 3:
					tipSign.className = "tipSign qiang";
					break;
			}
			return true;
			// 弱  中  强
			// 字母、数字、特殊字符
			// level 1弱 2中  3强
			// tipSign ruo zhong qiang
			// jkj343?
			// tipSign.className = ""
		} else {
			boxSign.className = "boxSign errorSign";
			tipSign.className = "tipSign errorSign";
			span.innerHTML = "密码长度应在6-20个字符之间";
			return false;
		}
	}
	pwd2.onkeyup=pwd2.onfocus=pwd2.onblur=function(evt) {
		var e = evt || window.event;
		checkPwd2(e);
	}
	function checkPwd2(_e) {
		var type;
		if(_e) {
			type = _e.type;
		}
		var value1 = pwd.value;
		var value = pwd2.value;
		var boxSign = pwd2.parentNode;
		var tipSign = boxSign.nextElementSibling;
		var span = tipSign.lastElementChild;
		if(type=="focus") {
			if(value=="") {
				boxSign.className = "boxSign";
				tipSign.className = "tipSign defaultSign";
				span.innerHTML = "请再次输入密码";
				return false;
			}
		}
		if(value == "") {
			boxSign.className = "boxSign errorSign";
			tipSign.className = "tipSign errorSign";
			span.innerHTML = "请再次输入密码";
			return false;
		} else if(value1 == value) {
			boxSign.className = "boxSign rightSign";
			tipSign.className = "tipSign hideSign";
			return true;
		} else {
			boxSign.className = "boxSign errorSign";
			tipSign.className = "tipSign errorSign";
			span.innerHTML = "两次密码不一致";
			return false;
		}
	}
	btn.onclick = function() {
		var boxSign = ck.parentNode;
		var tipSign = boxSign.nextElementSibling;
		var span = tipSign.lastElementChild;
		if(ck.checked) {
			if(checkUserName()&&checkPwd()&&checkPwd2()) {
				alert("可以注册");
			} else {
				return false;
			}
		} else {
			tipSign.className = "tipSign errorSign";
			span.innerHTML = "请同意协议";
			return false;
		}
	}
	ck.onclick = function() {
		var boxSign = ck.parentNode;
		var tipSign = boxSign.nextElementSibling;
		var span = tipSign.lastElementChild;
		if(ck.checked) {
			tipSign.className = "tipSign hideSign";
		}
	}
}
function getPwdLevel(pwd) {
	var level = 0;
	var numReg=true, strReg=true, tsReg=true;
	for(var i=0; i<pwd.length; i++) {
		if(numReg&&regs.numReg.test(pwd[i])) {
			level++;
			numReg = false;
			continue;
		}
		if(strReg&&regs.strReg.test(pwd[i])) {
			level++;
			strReg = false;
			continue;
		}
		if(tsReg&&regs.tsReg.test(pwd[i])) {
			level++;
			tsReg = false;
		}
	}
	return level;
}