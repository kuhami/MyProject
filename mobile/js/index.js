$(function () {
    inv.init();
    inv1.init1();
    window.history.forward(1);
});
var sex = "";
var inv = {
//	codeBtn   : $("#code-btn"),
    codeBtn   : $("#mq_code"),
    CodeNum   : 60,
    errorCode : null,
    flowId : null,
    firstFlowId:null,
    codeTimer : null,
    inputName : $("#name"),
    inputTel:$('#tel'),
//    inputSmsCode:$('#smsCode'),
    inputSmsCode:$('.mq_inp'),
    inputImgCode:$('#code'),
    init: function () {
        inv.bind();
        setCookie("source", "weixin", "/");
        var checkSwitch=inv.getUrlParams("checkSwitch");
        if(checkSwitch==1){
            inv.inputName.val(this.getCookie("name"));
            inv.inputTel.val(this.getCookie("tel"));
        }
        $("#name").focus();
        if (inv.getUrlParams("ActivityCode")) {
            $('#netCampaignCode').val(inv.getUrlParams("ActivityCode"));
        }
        if (inv.getUrlParams("openid")) {
            var openId = inv.getUrlParams("openid");
            var subscribe = inv.getUrlParams("subscribe");
            setCookie("subscribe", subscribe, "/");
            setCookie("clentNo", openId, "/");

            $.ajax({
                type: 'POST',
                url: '/do/rsploan/getMediaSouceByOpenIdnew',
                data: {
                    "openId": openId
                },
                dataType: 'json',
                success: function (data) {
                    if (data != null && data != "" && data.mediaSourceId != null && data.mediaSourceId != "") {
                        $('#mediaSource').val(data.mediaSourceId);
                        $('#campaignCode').val("XX_CAMP_WXWX");
                        $('#sourceType').val("1");
                        if(data.idMediaSourceSence){
                            $('#idMediaSourceSence').val(data.idMediaSourceSence);
                        }
                        setCookie("openid", openId, "/");
                    }
                    else {
                        if (inv.getUrlParams("idMedia")) {
                            var mediaSource = inv.getUrlParams("idMedia");
                            mediaSource = base64_decode(mediaSource);
                            var mediaSourceList = mediaSource.split("&");
                            if(mediaSourceList.length>1){
                                $('#idMediaSourceSence').val(mediaSourceList[0]);
                                $('#mediaSource').val(mediaSourceList[1]);
                                $('#sourceType').val("2");
                                if(mediaSourceList[2]){
                                    $('#sourceType').val("3");
                                }
                            }
                        }else  if (inv.getUrlParams("WT.mc_id")) {
                            $('#mediaSource').val(inv.getUrlParams("WT.mc_id"));
                        }
                    }
                }
            });
        } else {
            if (inv.getUrlParams("idMedia")) {
                var mediaSource = inv.getUrlParams("idMedia");
                mediaSource = base64_decode(mediaSource);
                var mediaSourceList = mediaSource.split("&");
                if(mediaSourceList.length>1){
                    $('#idMediaSourceSence').val(mediaSourceList[0]);
                    $('#mediaSource').val(mediaSourceList[1]);
                    $('#sourceType').val("2");
                    if(mediaSourceList[2]){
                        $('#sourceType').val("3");
                    }
                }
            }else  if (inv.getUrlParams("WT.mc_id")) {
                $('#mediaSource').val(inv.getUrlParams("WT.mc_id"));
            }
        }
        var mediaSource = $('#mediaSource').val();
        if(mediaSource && /^ZTXYD-IVR-/.test(mediaSource)){
            setCookie("mediaSourceStr", mediaSource, "/");
            $(".fr").attr("href","tel:4000314965");
            $(".gw_phone").html("鐐瑰嚮鎷ㄦ墦&nbsp;400-031-4965");
            $(".erweicode").attr("src","app_img/10948.jpg");
        }
        var formCode = inv.getUrlParams("formCode");
        if(formCode){
            $('#formCode').val(formCode);
        }

        if (inv.getUrlParams("idMediaKey")) {
            $.ajax({
                type: 'POST',
                url: '/do/rsploan/findQRCodeImgeLink',
                data: {
                    "idMediaKey": base64_decode(inv.getUrlParams("idMediaKey"))
                },
                dataType: 'json',
                success: function (data) {
                    if (data != null && data != "" && data.qrCodeOuterLink != null && data.qrCodeOuterLink != "") {
                        $(".erweicode").attr("src",data.qrCodeOuterLink);
                    }
                }
            });
        }

        common.getLpPage();
        common.getInnerMedia();
    },
    bind: function () {
        $('#sumbitBtn').click(function () {
            if ($(this).hasClass('lodging') || $(this).hasClass('disable')) {
                return;
            }
            inv.submitForm();
        });

        $(".to_but").click(function(){
            inv._codeConfirm();
        });

        $(".mq_close").click(function(){
            $(".dm").css("display","none");
            window.location.href = "step3-success.html";
        });

        $('.tan_back').click(function(){
            $('.tan_tag').css('display',"none");
//    		if(inv.errorCode){
//    			window.location.href = "fail.html?type="+ inv.errorCode;
//    		}else if(inv.flowId){
//    			window.location.href = "step2-edit.html?flowId="+inv.flowId;
//    		}
        });

        $('.mq_bg2').click(function(){
            $('.dp').css('display',"none");
            if(inv.errorCode){
                window.location.href = "fail.html?type="+ inv.errorCode;
            }else if(inv.flowId){
                window.location.href = "step2-edit.html?flowId="+inv.flowId;
            }
        });

//        $("#code-btn").click(function () {
//        	if (!$(this).data('obtaining') && inv._inputTelValidator()) {
//        		inv._obtainCode();
//            }
//        });
        $("#mq_code").click(function () {
            if (!$(this).data('obtaining') && inv._inputTelValidator()) {
                inv._obtainCode();
            }
        });

    },
    getCookie : function(name) {
        var strCookie = unescape(document.cookie);
        var arrCookie = strCookie.split(";");
        for ( var i = 0; i < arrCookie.length; i++) {
            var arr = arrCookie[i].split("=");
            if ($.trim(arr[0]) == name)
                return $.trim(arr[1]);
        }
        return "";
    },
    submitForm: function () {
        if (!inv.checkFormBase()) {
            $("#sumbitBtn").removeClass('lodging');
            return false;
        } else {
            $("#sumbitBtn").addClass('lodging');
            var openId = inv.getUrlParams("openid");
            var params = {
                name: inv.trim(inv.inputName.val(), "g"),
                mobile: inv.inputTel.val(),
                verifyCode:inv.inputSmsCode.val(),
                campaignName: $('#campaignName').val(),
                campaignCode: $('#campaignCode').val(),
                pageType: $('#pageType').val(),
                isDirectForm: $('#isDirectForm').val(),
                formCode: $('#formCode').val(),
                sex: sex,
                smsAuthor: $('#smsAuthor').val(),
                lpPage: $('#lpPage').val(),
                innerMedia: $('#innerMedia').val(),
                mediaSourceId: $('#mediaSource').val(),
                sourceType: $('#sourceType').val(),
                custSrc: $('#custSrc').val(),
                openId: openId,
                idMediaSourceSence: $('#idMediaSourceSence').val(),
                netCampaignCode: $('#netCampaignCode').val()
            };

            $.ajax({
                type: 'POST',
                url: '/do/rsploan/newYdsModifyFirstStep',
                data: params,
                dataType: 'json',
                success: function (response) {
//	            	$('#sendpic').css('display',"block");
//	            	$('#sendsms').css('display',"block");
                    var isOldCust = response.isOldCust;
                    var firstFlowId = response.flowId;
                    inv.firstFlowId=firstFlowId;
                    if(response != null || response.error == null){
                        $('.dm').css('display',"block");
                        $("#mq_inp").focus();
                        $('body').scrollTop(0);
                        inv._obtainCode();
                        setCookie("mediaSourceId", params.mediaSourceId, "/");
                    }
                }
            });
        }
    },
    _codeConfirmCanSign: function () {
        var _this = this;
        if (inv._inputSmsCodeValidator()) {
            if (!inv.checkForm()) {
//              _this.getImgCode('imgCode');
                return false;
            } else {
                inv1.load();

                var openId = inv.getUrlParams("openid");
                var params = {
                    mobile: inv.inputTel.val(),
                    verifyCode:inv.inputSmsCode.val(),
                    flowId:inv.firstFlowId,
                };

                $.ajax({
                    type: 'POST',
                    url: '/do/rsploan/wechatH5Verification',
                    data: params,
                    dataType: 'json',
                    success: function (response) {
                        $.unblockUI();
                        var isOldCust = response.isOldCust;
                        var flowId = response.flowId;
                        var isCanSign = response.isCanSign;
                        if(response != null && response.error != null){
                            var errorCode = response.error.errorCode;
                            if("noModify"==errorCode||"noFollowUp" == errorCode || "systemError" == errorCode){
                                if(isOldCust){
                                    inv.errorCode = errorCode;
                                    $(".dm").css("display","none");
                                    inv.welcomToast("骞冲畨濂借捶娆㈣繋鎮ㄥ啀娆″洖鏉ワ紝璇锋牳瀵规偍鐨勫巻鍙蹭俊鎭紒濡傛湁鍙樻洿锛岃繕璇峰強鏃舵洿姝ｅ摝~锛�");
                                }else{
                                    window.location.href = "fail.html?type="+ response.error.errorCode;
                                }
                            }else{
                                inv.errToast(response.error.message);
                                $("#sumbitBtn").removeClass('lodging');
                            }
                        }else{
                            if(isCanSign){
                                //鍙互鐢靛瓙绛惧悕
                                var idSubTask = response.f5;
                                if(idSubTask){
                                    window.location.href = "../wxEsign/uploadID.html?subTaskid=" + idSubTask
                                        + "&timestamp=" + response.f6 + "&encodeString=" + response.f7;
                                }else{
                                    inv.errToast("鍙數瀛愮鍚嶏紝瀛愪换鍔″彿杩斿洖鍊煎嵈涓虹┖锛�");
                                    $("#sumbitBtn").removeClass('lodging');
                                }
                            }else{
                                inv.flowId = flowId;
                                if(isOldCust){
                                    $(".dm").css("display","none");
                                    inv.welcomToast("骞冲畨濂借捶娆㈣繋鎮ㄥ啀娆″洖鏉ワ紝璇锋牳瀵规偍鐨勫巻鍙蹭俊鎭紒濡傛湁鍙樻洿锛岃繕璇峰強鏃舵洿姝ｅ摝~锛�");
                                }else{
                                    window.location.href = "step2-edit.html?flowId="+flowId;
                                }
                            }
                        }
                    }
                });
            }
        }
    },
    _codeConfirm: function () {
        var _this = this;
        if (inv._inputSmsCodeValidator()) {
            if (!inv.checkForm()) {
//              _this.getImgCode('imgCode');
                return false;
            } else {
                var openId = inv.getUrlParams("openid");
                var params = {
                    mobile: inv.inputTel.val(),
                    verifyCode:inv.inputSmsCode.val(),
                    flowId:inv.firstFlowId,
                };

                $.ajax({
                    type: 'POST',
                    url: '/do/rsploan/smsVerification',
                    data: params,
                    dataType: 'json',
                    success: function (response) {
                        var isOldCust = response.isOldCust;
                        var flowId = response.flowId;
                        if(response != null && response.error != null){
                            var errorCode = response.error.errorCode;
                            if("noModify"==errorCode||"noFollowUp" == errorCode || "systemError" == errorCode){
                                if(isOldCust){
                                    inv.errorCode = errorCode;
                                    $(".dm").css("display","none");
                                    inv.welcomToast("骞冲畨濂借捶娆㈣繋鎮ㄥ啀娆″洖鏉ワ紝璇锋牳瀵规偍鐨勫巻鍙蹭俊鎭紒濡傛湁鍙樻洿锛岃繕璇峰強鏃舵洿姝ｅ摝~锛�");
                                }else{
                                    window.location.href = "fail.html?type="+ response.error.errorCode;
                                }
                            }else{
                                inv.errToast(response.error.message);
                                $("#sumbitBtn").removeClass('lodging');
                            }
                        }else{
                            inv.flowId = flowId;
                            if(isOldCust){
                                $(".dm").css("display","none");
                                inv.welcomToast("骞冲畨濂借捶娆㈣繋鎮ㄥ啀娆″洖鏉ワ紝璇锋牳瀵规偍鐨勫巻鍙蹭俊鎭紒濡傛湁鍙樻洿锛岃繕璇峰強鏃舵洿姝ｅ摝~锛�");
                            }else{
                                window.location.href = "step2-edit.html?flowId="+flowId;
                            }
                        }
                    }
                });
            }
        }
    },
    _inputSmsCodeValidator: function () {
        var smsCode = $("#code").val();
        if (!smsCode) {
//        	inv.toast("璇疯緭鍏ョ煭淇￠獙璇佺爜");
            inv.errToast("璇疯緭鍏ョ煭淇￠獙璇佺爜");
            return false;
        } else if (smsCode.length != 6) {
//        	inv.toast("杈撳叆楠岃瘉鐮佷笉绗﹀悎瑙勮寖");
            inv.errToast("杈撳叆楠岃瘉鐮佷笉绗﹀悎瑙勮寖");
            return false;
        } else if (!/^\d{6}$/.test(smsCode)) {
//        	inv.toast("杈撳叆楠岃瘉鐮佷笉绗﹀悎瑙勮寖");
            inv.errToast("杈撳叆楠岃瘉鐮佷笉绗﹀悎瑙勮寖");
            return false;
        }
        return true;
    },
    checkForm: function () {
        if (!inv._inputNameValidator()) {
            return false;
        }
        if (!inv._inputTelValidator()) {
            return false;
        }
//        if (!inv._inputImgCodeValidator()) {
//        	return false;
//        }
        if (!inv._inputSmsCodeValidator()) {
            return false;
        }
        return true;
    },

    checkFormBase:function(){
        if (!inv._inputNameValidator()) {
            return false;
        }
        if (!inv._inputTelValidator()) {
            return false;
        }
        return true;
    },
    //鑾峰彇URL鍙傛暟
    getUrlParams: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
    //鍙戦€侀獙璇佺爜
    _obtainCode: function () {
        var _this = this;
        _this.codeBtn.data('obtaining', true);
        _this.codeBtn.val('60s鍚庨噸鍙�');
        _this.codeTimer = setInterval(function () {
            _this.CodeNum -= 1;
            if (_this.CodeNum === 0) {
                clearInterval(_this.codeTimer);
                _this.codeBtn.val('鑾峰彇楠岃瘉鐮�');
                _this.codeBtn.data('obtaining', false);
                _this.CodeNum = 60;
                return;
            }
            _this.codeBtn.val(_this.CodeNum + 's鍚庨噸鍙�');
        }, 1000);
        var params = {
            mobile: _this.inputTel.val(),
            randCode:_this.inputImgCode.val()
        };
        $.ajax({
            type: 'POST',
            data: params,
            url: '/do/rsploan/sendNewYdsCode',
            dataType: 'json',
            success: function (response) {
                if (response != null && response.error != null) {
                    if (response.error.errorCode == '101') {
                        inv.errToast(response.error.message);
                        clearInterval(_this.codeTimer);
                        _this.codeBtn.val('鑾峰彇楠岃瘉鐮�');
                        _this.codeBtn.data('obtaining', false);
                        _this.CodeNum = 60;
                    } else {
                        // 绯荤粺寮傚父
                        inv.errToast(response.error.message);
                        clearInterval(_this.codeTimer);
                        _this.codeBtn.val('鑾峰彇楠岃瘉鐮�');
                        _this.codeBtn.data('obtaining', false);
                        _this.CodeNum = 60;
                    }
                }else{
//                	_this.getImgCode('imgCode');
                }
            }
        });
    },
    //鎵嬫満鍙风爜楠岃瘉
    _inputTelValidator: function () {
        var phoneVal = inv.inputTel.val();
        if (!phoneVal) {
            inv.toast('璇疯緭鍏ユ偍鐨勬墜鏈哄彿');
            this.inputTel.focus();
            return false;
        } else if (!/^(13|14|15|16|17|18|19)[0-9]{1}[0-9]{4}[0-9]{4}$/.test(phoneVal)) {
            inv.toast('璇疯緭鍏ユ纭殑鎵嬫満鍙�');
            this.inputTel.focus();
            return false;
        } else {
            var repeat = 1;
            var seque = 1;
            for (var i = 1; i < phoneVal.length; i++) {
                if (phoneVal.charAt(i) == phoneVal.charAt(i - 1)) {
                    repeat++;
                    if (repeat >= 5) {
                        inv.toast('璇疯緭鍏ユ纭殑鎵嬫満鍙�');
                        inv.inputTel.focus();
                        return false;
                    }
                } else {
                    repeat = 1;
                }
                if (phoneVal.charAt(i) - phoneVal.charAt(i - 1) == '1') {
                    seque++;
                    if (seque >= 6) {
                        inv.toast('璇疯緭鍏ユ纭殑鎵嬫満鍙�');
                        inv.inputTel.focus();
                        return false;
                    }
                } else if (phoneVal.charAt(i) - phoneVal.charAt(i - 1) == '-1') {
                    seque2++;
                    if (seque2 >= 6) {
                        inv.toast('璇疯緭鍏ユ纭殑鎵嬫満鍙�');
                        inv.inputTel.focus();
                        return false;
                    }
                } else {
                    seque = 1;
                    seque2 = 1;
                }
            }
            return true;
        }
    },
    _inputNameValidator: function () {
        var nameVal = inv.inputName.val();
        if (!nameVal) {
            inv.toast("濮撳悕鍙兘涓轰腑鏂囷紝涓斾笉鑳芥湁绌烘牸銆�");
            inv.inputName.focus();
            return false;
        } else if (nameVal && !(/^([\u4e00-\u9fa5\s]{2})([\u4e00-\u9fa5\s]{0,18}|[. ]{0,36}|[? ]{0,36})?$/.test(nameVal))) {
            inv.toast("濮撳悕鍙兘涓轰腑鏂囷紝涓斾笉鑳芥湁绌烘牸銆�");
            inv.inputName.focus();
            return false;
        } else if (nameVal == '涓嶈' || nameVal == '涓嶇ゥ' || nameVal == '鏈煡' || nameVal == '涓嶇煡閬�' || nameVal == '濮撳悕' || nameVal.indexOf('娴嬭瘯') > -1 || nameVal.indexOf('test') > -1) {
            inv.toast("璇疯緭鍏ユ纭殑濮撳悕銆�");
            inv.inputName.focus();
            return false;
        } else {
            return true;
        }
    },
    _inputSmsCodeValidator: function () {
        var smsCode = inv.inputSmsCode.val();
        if (!smsCode) {
//        	inv.toast('璇疯緭鍏ョ煭淇￠獙璇佺爜');
            inv.errToast('璇疯緭鍏ョ煭淇￠獙璇佺爜');
            inv.inputSmsCode.focus();
            return false;
        } else if (smsCode.length != 6) {
//        	inv.toast('杈撳叆楠岃瘉鐮佷笉绗﹀悎瑙勮寖');
            inv.errToast('杈撳叆楠岃瘉鐮佷笉绗﹀悎瑙勮寖');
            inv.inputSmsCode.focus();
            return false;
        } else if (!/^\d{6}$/.test(smsCode)) {
//        	inv.toast('杈撳叆楠岃瘉鐮佷笉绗﹀悎瑙勮寖');
            inv.errToast('杈撳叆楠岃瘉鐮佷笉绗﹀悎瑙勮寖');
            inv.inputSmsCode.focus();
            return false;
        }
        return true;
    },
    _inputImgCodeValidator: function () {
        var imgCode = inv.inputImgCode.val();
        if (!imgCode) {
            inv.toast('璇疯緭鍏ュ浘鐗囬獙璇佺爜');
            inv.inputSmsCode.focus();
            return false;
        } else if (imgCode.length != 4) {
            inv.toast('杈撳叆楠岃瘉鐮佷笉绗﹀悎瑙勮寖');
            inv.inputSmsCode.focus();
            return false;
        }
        return true;
    },
    getImgCode: function (elementId) {
        $("#"+elementId).attr("src","/paic/common/vcode.do?t="+Date());
    },
    toast : function (message) {
        $("#showError").html(message);
        $('.tan_tag').css('display',"block");
        $('body').scrollTop(0);
    },
    errToast : function (message) {
        $("#showSmsError").html(message);
        $('.mq_error').css('display',"block");
    },
    welcomToast : function (message) {
        $("#showWelCome").html(message);
        $('.dp').css('display',"block");
    },
    trim : function(str,is_global){
        var result;
        result = str.replace(/(^\s+)|(\s+$)/g,"");
        if(is_global.toLowerCase()=="g") {
            result = result.replace(/\s/g,"");
        }
        return result;

    }
}

var inv1 = {
    init1: function () {
        //鎬у埆閫夋嫨
        sex = "1";
        $(".people img:eq(0)")[0].src = "img/draw3_zxp.png";
        $(".people img:eq(1)")[0].src = "img/ykong3.png";
        $(".people img")[0].addEventListener("touchend", function () {
            $(".people img:eq(0)")[0].src = "img/draw3_zxp.png";
            $(".people img:eq(1)")[0].src = "img/ykong3.png";
            sex = "1"
        })
        $(".people img")[1].addEventListener("touchend", function () {
            $(".people img:eq(1)")[0].src = "img/draw3_zxp.png";
            $(".people img:eq(0)")[0].src = "img/ykong3.png";
            sex = "2";
        });
    },
    load : function(){
        $.blockUI({
            message:"<img src='img/load.gif'/>",
            css:{
                top:($(window).height()-50)/2+'px',
                left:($(window).width()-50)/2+'px',
                width:'50px',
                heigth:'50px',
                border:'none',
                background:'none'
            },
            overlayCSS:{
                backgroundColor:'#fff'
            }
        });
    }
}


function setCookie(name, value, path) {
    var d = new Date();
    d.setTime(d.getTime() + (3*24*60 * 60 * 1000));
    expires = d.toGMTString();
    value = escape(value);
    document.cookie = name + "=" + value + ";"
        + (expires != -1 ? " expires=" + expires + ";" : "")
        + (path ? "path=" + path : "");
}


/*涓嬮潰鏄敊璇彁绀鸿js鍜屽嚱鏁�*/
$(function () {
    var NewLine = '\n';
    var T50 = '';
    T50 += '<div id="tip_div" style="position:absolute;top:-1.3rem;width:100%;">' + NewLine;
    T50 += '<div style="text-align:center;">' + NewLine;
    T50 += '<img src="app_img/20151116register-warn.png" style="width:0.5625rem;height:0.5625rem;display:none;"/>' + NewLine;
    T50 += '<span style="vertical-align:middle;text-align:center;line-height:0.9rem;font-size:0.65rem;color:red;"></span>' + NewLine;
    T50 += '</div>' + NewLine;
    T50 += '</div>' + NewLine;
    $(".rili").append(T50);
    $("#tip_div").hide();
});