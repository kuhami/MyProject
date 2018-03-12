/*
 * @author liuyalei
 * @creation time 2017-08-17
 * @project xmebank注册
 * 
 */

function $(id) {
	return document.getElementById(id);
}
function $_(cl) {
	return document.getElementsByClassName(cl)[0];
}
//正则表达式
var regs = {
	userNameReg: /^(([\u4e00-\u9fa5])|[a-zA-Z0-9-_]){4,20}$/,
	mobileReg:/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
	pwdReg: /^.{6,20}$/,
	numReg: /\d/,
	strReg: /[a-zA-Z]/,
	tsReg: /[^\u4e00-\u9fa5a-zA-Z0-9]/,
	numberReg:/^\d{6}$/
}
window.onload = function() {
	// 用户名字母、数字、_、-、中文  \u4e00-\u9fa5  4-20
	// boxSign   常规 boxSign  出错的时候  boxSign errorSign  正确的时候  boxSign rightSign
	// tipSign   常规 tipSign hideSign  出错的时候  tipSign errorSign  默认的时候  tipSign defaultSign
	var mobile = $("mobile");
	var Messagecode = $("Messagecode");
	var getPhoneCode = $("getPhoneCode");
	var pwd = $("pwd");
	var pwd2 = $("pwd2");
	var ck = $("ck");
	var btn = $("btn");
	var containerSign = $_("containerSign");
	var successedReg = $_("successedReg");
	var countDown = $_("countDown");
	
	mobile.onkeyup=mobile.onfocus=mobile.onblur=function(evt) {
		var e = evt || window.event;
		checkMobile(e);
	}
	function checkMobile(_e) {
		
		var type;
		if(_e) {
			type = _e.type;
		}
		var value = mobile.value;
		var boxSign = mobile.parentNode;
		var tipSign = boxSign.nextElementSibling;
		var span = tipSign.lastElementChild;
		
		if(type=="focus") {
			if(value=="") {
				boxSign.className = "boxSign";
				tipSign.className = "tipSign defaultSign";
				span.innerHTML = "完成验证后，你可以用该手机登录和找回密码";
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
			span.innerHTML = "请输入手机号";
			return false;
		} else if(regs.mobileReg.test(value)) {
			boxSign.className = "boxSign rightSign";
			tipSign.className = "tipSign hideSign";
			return true;
		} else {
			boxSign.className = "boxSign errorSign";
			tipSign.className = "tipSign errorSign";
			span.innerHTML = "格式有误";
			return false;
		}
	}
	//手机验证码验证
	Messagecode.onkeyup=Messagecode.onfocus=Messagecode.onblur=function(evt) {
		var e = evt || window.event;
		checkMessagecode(e);
	}
	
	function checkMessagecode(_e){
		var type;
		if(_e) {
			type = _e.type;
		}
		
		var value = Messagecode.value;
		var boxSign = Messagecode.parentNode;
		var tipSign = boxSign.nextElementSibling;
		var span = tipSign.lastElementChild;
		
		if(type=="focus") {
			if(value=="") {
				boxSign.className = "boxSign";
				tipSign.className = "tipSign defaultSign";
				span.innerHTML = "获取了3次短信验证码后，必须过半个小时才能再次获取";
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
		if(value == ''){
			boxSign.className = "boxSign errorSign";
			tipSign.className = "tipSign errorSign";
			span.innerHTML = "请输入验证码";
			return false;
		}else if(regs.numberReg.test(value)) {
			boxSign.className = "boxSign rightSign";
			tipSign.className = "tipSign hideSign";
			return true;
		}else {
			boxSign.className = "boxSign errorSign";
			tipSign.className = "tipSign errorSign";
			span.innerHTML = "请输入6位数字验证码";
			return false;
		}
	}
	
	//点击获取手机验证码
	getPhoneCode.onkeyup=getPhoneCode.onclick=function(evt) {
		var e = evt || window.event;
		checkGetPhoneCode(e);
	}
	
	function checkGetPhoneCode(_e){
		var type;
		if(_e) {
			type = _e.type;
		}

		var value = mobile.value;
		var boxSign = mobile.parentNode;
		var tipSign = boxSign.nextElementSibling;
		var span = tipSign.lastElementChild;
		
		if(value == ''){
			boxSign.className = "boxSign errorSign";
			tipSign.className = "tipSign errorSign";
			span.innerHTML = "请输入手机号";
			return false;
		}else{
			alert("获取验证码成功，请注意查收！");
		}
		
		var value1 = Messagecode.value;
		var boxSign1 = Messagecode.parentNode;
		var tipSign1 = boxSign1.nextElementSibling;
		var span1 = tipSign1.lastElementChild;
		
		boxSign1.className = "boxSign";
		tipSign1.className = "tipSign defaultSign";
		span1.innerHTML = "短信验证码已发送至您的"+value+"手机号，请注意查收！";
		
		var countDownTime = 60;
		getPhoneCode.style.cursor = "not-allowed";
		getPhoneCode.setAttribute("disabled","disabled");
		var timer = setInterval(function(){
			if(countDownTime == 0){
				clearInterval(timer);
				getPhoneCode.innerHTML = "重新获取";
				getPhoneCode.removeAttribute("disabled","disabled");
				getPhoneCode.style.cursor = "pointer";
			}else{
				countDownTime--;
				getPhoneCode.innerHTML = countDownTime+'秒';
			}
		},1000);
		
	}
	//密码验证
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
					span.innerHTML = "有被盗风险,建议使用字母、数字和符号两种及以上组合";
					break;
				case 2:
					tipSign.className = "tipSign zhong";
					span.innerHTML = "安全强度适中，可以使用三种以上的组合来提高安全强度";
					break;
				case 3:
					tipSign.className = "tipSign qiang";
					span.innerHTML = "你的密码很安全";
					break;
			}
			return true;
			// 弱  中  强
			// 字母、数字、特殊字符
			// level 1弱 2中  3强
			// tipSign ruo zhong qiang
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
		if(type=="blur") {
			if(value=="") {
				boxSign.className = "boxSign";
				tipSign.className = "tipSign hideSign";
				return false;//不继续往下走
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
	//立即注册
	btn.onclick = function() {
		var boxSign = ck.parentNode;
		var tipSign = boxSign.nextElementSibling;
		var span = tipSign.lastElementChild;
		if(ck.checked) {
			if(checkMobile()&&checkMessagecode()&&checkPwd()&&checkPwd2()) {
				alert("注册成功！");
				successedReg.style.display = "block";
				containerSign.style.display = "none";
				
				var countDownTime = 6;
				var timer = setInterval(function(){
					if(countDownTime == 0){
						clearInterval(timer);
						countDown.innerHTML = '';
						alert("跳转成功");
					}else{
						countDownTime--;
						countDown.innerHTML = '（'+countDownTime+'）';
					}
				},1000);
				
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