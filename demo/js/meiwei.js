(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( ["jquery", "../jquery.validate"], factory );
	} else {
		factory( jQuery );
	}
}(function( $ ) {


$.validator.addMethod("timeLessThan", function(value, element, params) {
	var target = $( params );
	if(target.length == 0){
		//去掉开头#
		var params = params.substr(1);
		var target = $( "[name='" + params + "']" );
		if(target.length == 0){
			//找不到目标
			return true;
		}
	}
	
	// bind to the blur event of the target in order to revalidate whenever the target field is updated
	// TODO find a way to bind the event just once, avoiding the unbind-rebind overhead
	target.unbind( ".validate-timeLessThan" ).bind( "blur.validate-timeLessThan", function() {
		$( element ).valid();
	});
	
	var time1 = value;
	var time2 = $.trim(target.val());
	if(time1.length > 0 && time2.length > 0){
		time1 = new Date(time1).getTime();
		time2 = new Date(time2).getTime();
		return time1 <= time2;
	}
	return true;
}, "起始时间不能大于截止时间");


$.validator.addMethod("timeGreaterThan", function(value, element, params) {
	var target = $( params );
	if(target.length == 0){
		//去掉开头#
		var params = params.substr(1);
		var target = $( "[name='" + params + "']" );
		if(target.length == 0){
			//找不到目标
			return true;
		}
	}
	
	// bind to the blur event of the target in order to revalidate whenever the target field is updated
	// TODO find a way to bind the event just once, avoiding the unbind-rebind overhead
	target.unbind( ".validate-timeLessThan" ).bind( "blur.validate-timeLessThan", function() {
		$( element ).valid();
	});
	
	var time1 = value;
	var time2 = $.trim(target.val());
	if(time1.length > 0 && time2.length > 0){
		time1 = new Date(time1).getTime();
		time2 = new Date(time2).getTime();
		return time1 >= time2;
	}
	return true;
}, "截止时间不能小于起始时间");


$.validator.addMethod("mobile", function(value, element) {   
    var pattern = /^0?(13|14|15|17|18)[0-9]{9}$/;
    return this.optional(element) || (pattern.test(value));
}, "请输入有效的手机号");

$.validator.addMethod("employe_no", function(value, element) {   
    var pattern = /^0?[0-9]{1,18}$/;
    return this.optional(element) || (pattern.test(value));
}, "请输入有效的工号");

$.validator.addMethod("phone", function(value, element) {   
    var pattern = /^[0-9-()\+]{7,18}$/;
    return this.optional(element) || (pattern.test(value));
}, "请输入有效的电话");


$.validator.addMethod("zh", function(value, element) {   
    var pattern = /^[\u4E00-\u9FA5\s]+$/;
    return this.optional(element) || (pattern.test(value));
}, "请输入中文");


$.validator.addMethod("username", function(value, element) {   
    var pattern = /^[A-Za-z0-9_]+$/;
    return this.optional(element) || (pattern.test(value));
}, "用户名只能由字母、数字和下划线组成");


$.validator.addMethod("realname", function(value, element) {   
    var pattern = /^[A-Za-z\u4E00-\u9FA5\s]+$/;
    return this.optional(element) || (pattern.test(value));
}, "请输入真实姓名");


$.validator.addMethod("strongPassword", function(value, element) {   
    var pattern = /(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}/;
    return this.optional(element) || (pattern.test(value));
}, "密码至少包含一个字母和一个数字");


$.validator.addMethod("zipcode", function(value, element) {   
    var pattern = /^[1-9]\d{5}$/;
    return this.optional(element) || (pattern.test(value));
}, "请输入6位邮政编码");


$.validator.addMethod("idcard", function(value, element) {   
    var pattern = /(^\d{17}[\d|x|X]$)|(^\d{15}$)/;
    return this.optional(element) || (pattern.test(value));
}, "请输入有效的身份证号");


$.validator.addMethod("creditcardZh", function(value, element) {   
    var pattern = /^\d{16}$|^\d{19}$/;
    return this.optional(element) || (pattern.test(value));
}, "请输入有效的银行卡号");


$.validator.addMethod("ip", function(value, element) {   
    var pattern = /^((?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d))$/;
    return this.optional(element) || (pattern.test(value));
}, "请输入有效的IP地址");


$.validator.addMethod("alipayAccount", function(value, element) {   
	var email = /^\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
	var mobile = /^0?(13|14|15|18)[0-9]{9}$/;
    return this.optional(element) || (email.test(value)) || (mobile.test(value));
}, "支付宝账户必须为邮箱地址或手机号码");


}));