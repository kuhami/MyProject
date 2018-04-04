import {message,Modal} from 'antd';
import {WeaTools,WeaDialog} from 'ecCom';
import * as ComsAction from '../actions/coms';

const confirm = Modal.confirm;


export const fnJoinPara = (fn,para)=>{
	if(!fn || !para || typeof(fn) != "string") 
		return fn;
	let _st = fn.indexOf("(");
	let _ed = fn.lastIndexOf(")");
	if(_st == -1 || _ed == -1)
		return fn;
	let _stStr = fn.substring(0,_st);
	let _edStr = fn.substring(_ed);
	let _para = fn.substring(_st,_ed);
	_para += (_para == "(" ? "" : ",") + "'" + para + "'";
	return _stStr + _para + _edStr;
}


//删除
export const doMuliDelete = (module,params)=>{
	let ids = params.split(",");

	let success = [];
	let error = [];

	doDeleteWarm({}).then(data=>{
 		confirm({
 			title : data.title,
 			content : data.subTitle == "" ? "" : (<span style={{'color' : 'red'}}>({data.subTitle})</span>),
 			onOk(){
 				for(var i = 0;i < ids.length;i++){
					let rdata = doDelete({docid : ids[i]}).then(rdata=>{
						if(rdata.status == 1){
							success.push(rdata);
						}else{
							error.push(rdata);
						}

						if(success.length + error.length == ids.length){
							if(error.length > 0){
								for(var j = 0; i < error.length;j++){
									message.error(error[j].msg);
								}
							}else{
								message.success(success[0].msg);
								window.store_e9_element.dispatch(ComsAction.doSearch(module));
							}
						}
					});

				}
 			},
 			onCancel() {}
 		})
			
		
	})
	
}


//获取删除提示信息
const doDeleteWarm = (params)=>{
	return WeaTools.callApi('/api/doc/operate/deleteWarm', 'GET', params);
}


//删除操作
const doDelete = (params)=>{
	return WeaTools.callApi('/api/doc/operate/delete', 'GET', params);
}

const openWindow = (url)=>{
	  let width = screen.availWidth-10 ;
	  let height = screen.availHeight-50 ;
	  let szFeatures = "top=0," ;
	  szFeatures +="left=0," ;
	  szFeatures +="width="+width+"," ;
	  szFeatures +="height="+height+"," ;
	  szFeatures +="directories=no," ;
	  szFeatures +="status=yes,toolbar=no,location=no," ;
	  szFeatures +="menubar=no," ;
	  szFeatures +="scrollbars=yes," ;
	  szFeatures +="resizable=yes" ; 
	  window.open(url,"",szFeatures) ;
}

window.openFullWindowHaveBar = function(params){
	openFullWindowHaveBar(params);
}
window.openFullWindowForXtable = function(params){
	openFullWindowHaveBar(params);
}
//查看
const openFullWindowHaveBar = (params)=>{
	openWindow(params);
}



//编辑
export const doEdit = (module,params)=>{
	openWindow("/docs/docs/DocEdit.jsp?id=" + params);
}
//共享
let dialog = null;
export const doDocShare = (module,params)=>{
	dialog = new window.top.Dialog();
	dialog.currentWindow = window;
	dialog.Title = " 文档共享";
	dialog.Width = 800;
	dialog.Height = 510;
	dialog.checkDataChange = false;
	dialog.URL = "/docs/tabs/DocCommonTab.jsp?_fromURL=46&isdialog=1&id="+params;
	dialog.maxiumnable = true;
	//dialog.DefaultMax = true;
	dialog.show();
}
//日志 
export const doDocViewLog = (module,params)=>{
	window.store_e9_element.dispatch(ComsAction.showDocLog(module,{docid : params,show : true}));
}

//标记为已读
export const signReaded = (module,params)=>{
	return WeaTools.callApi('/api/doc/operate/markReaded', 'GET', {docids : params}).then(data => {
			if(data && data.status == 1){
				if(data.msg && data.msg != ""){
					message.success(data.msg);
				}
				window.store_e9_element.dispatch(ComsAction.doSearch(module));
			}else {
				if(data && data.msg){
					message.error(data.msg);
				}
			}
		})
}

//订阅无权查看的文档
export const doSubscribe = (module,params)=>{
	console.info(params)
}

//导入文档到虚拟目录
export const importSelectedToDummy = (module,params)=>{
	window.store_e9_element.dispatch(ComsAction.showDummyImport(module,{
		dummyImport : true,
		importType : "select",
		importParam : params
	}));
}

//导入选中文档到虚拟目录
export const importAllToDummy = (module,params)=>{
	window.store_e9_element.dispatch(ComsAction.showDummyImport(module,{
		dummyImport : true,
		importType : "all",
		importParam : params
	}));
}

//附件批量下载
export const bacthDownloadImageFile = (module,params)=>{
	
}

//添加共享
export const openAddShare = (module,params)=>{
	
}

//删除共享
export const onDeleteShare = (module,params)=>{
	
}

//(虚拟目录)复制
export const doCopy = (module,dummyId,params)=>{
	
}

//(虚拟目录)移动
export const doMove = (module,dummyId,params)=>{

}

//(虚拟目录)删除(移除)
export const doRemove = (module,dummyId,params)=>{
	confirm({
		title : "确定要删除吗?",
		onOk(){
			return WeaTools.callApi('/api/doc/operate/removeOfDummy', 'GET', {dummyId : dummyId,selectIds : params}).then(data => {
				if(data && data.status == 1){
					if(data.msg && data.msg != ""){
						message.success(data.msg);
					}
					window.store_e9_element.dispatch(ComsAction.doSearch(module));
				}else {
					if(data && data.msg){
						message.error(data.msg);
					}
				}
			})
		},
		onCancel(){}
 	});
}

//导入到虚拟目录
export const doImport = (module,dummyIds,importType,importParam)=>{
	console.info(module)
	console.info(importType)
	console.info(importParam)
	return WeaTools.callApi('/api/doc/operate/import2Dummy', 'GET', 
			{dummyIds : dummyIds,importType : importType,selectIds : importParam}
		).then(data => {
			if(data && data.status == 1){
				if(data.msg && data.msg != ""){
					message.success(data.msg);
				}
				window.store_e9_element.dispatch(ComsAction.showDummyImport(module,{dummyImport : false}));
			}else {
				if(data && data.msg){
					message.error(data.msg);
				}
			}
	})
}

//批准
export const onAgree = (module,params)=>{
	
}

//退回
export const onReject = (module,params)=>{

}

//收回
export const onGetBack = (module,params)=>{

}

