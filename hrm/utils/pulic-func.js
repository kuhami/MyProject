//发消息、发起群聊
function sendEmessage(emessageId){
	var isGroup = false;
	if(!emessageId){
		var emessageId = _xtable_CheckedCheckboxId();
		isGroup = true;
	}
	if(!emessageId){
		window.top.Dialog.alert(SystemEnv.getHtmlNoteName(4780, readCookie("languageidweaver")));
		return;
	}
	if(emessageId.match(/,$/)){
		emessageId = emessageId.substring(0,emessageId.length-1);
	}
	var openType = isGroup?"2":"0";
	if(isGroup){
		window.top.Dialog.confirm(SystemEnv.getHtmlNoteName(4781, readCookie("languageidweaver")),function(){
			sendMsgToPCorWeb(emessageId,openType,'','');
		},function(){
		  	return false;
		})
	}else{
		sendMsgToPCorWeb(emessageId,openType,'','');
	}
}

//发送邮件
function sendMail(id){
	openFullWindowForXtable("/email/new/MailInBox.jsp?opNewEmail=1&amp;isInternal=1&amp;internalto&id="+id);
}

//发送短信
function sendSmsMessage(id){
	openFullWindowForXtable("/sms/SmsMessageEdit.jsp?hrmid="+id);
}

//新建日程
function addCoWork(id){
	openFullWindowForXtable("/cowork/AddCoWork.jsp?hrmid="+id);
}

//新建协作
function doAddWorkPlanByHrm(id) {
	openFullWindowForXtable("/workplan/data/WorkPlan.jsp?resourceid="+id+"&add=1")	
}

//系统信息
function jsHrmResourceSystemView(id){
	openFullWindowForXtable('/hrm/HrmTab.jsp?_fromURL=HrmResourceSystemView&id='+id);
}

function openFullWindowForXtable(url){
  var redirectUrl = url ;
  var width = screen.availWidth-10 ;
  var height = screen.availHeight-60 ;
  //if (height == 768 ) height -= 75 ;
  //if (height == 600 ) height -= 60 ;
  var szFeatures = "top=0," ; 
  szFeatures +="left=0," ;
  szFeatures +="width="+width+"," ;
  szFeatures +="height="+height+"," ; 
  szFeatures +="directories=no," ;
  szFeatures +="status=yes," ;
  szFeatures +="menubar=no," ;
  szFeatures +="scrollbars=yes," ;
  szFeatures +="resizable=yes" ; //channelmode
  window.open(redirectUrl,"",szFeatures) ;
}

export {
	sendEmessage,
	sendMail,
	sendSmsMessage,
	addCoWork,
	doAddWorkPlanByHrm,
	jsHrmResourceSystemView,
	openFullWindowForXtable,
}