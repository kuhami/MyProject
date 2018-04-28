import * as types from '../../constants/ActionTypes';
import Immutable from 'immutable';
import isEmpty from 'lodash/isEmpty';
import { WeaTools } from 'ecCom';

let initState = {
	tabs:[],//WeaTools.ls.getJSONObj("hrmMyCardTabs") 
	activeKey:'HrmResourceBase',
	modelItems:[],
	datas:[],
	infoGroup:[],
	imgSrc:null,
	hrmInfo:[],
	sendButtons:{},
	accountInfo:[],
	showSQR:false,
	showBigImg:false,
	showAccountInfo:true,
	isEditor:false,
};
/*datas前端分块处理处理*/
let infoGroup=[];//信息组
let imgSrc=null;//人员照片
let hrmInfo=[];//我的卡片顶部信息
let sendButtons={};
let accountInfo=[];

function getDatas(datas){
    datas && datas.forEach(d=>{
    	if(d.id=='item1'){
            hrmInfo = d.items;
        }
        if(d.id=='item2'){
            d.items.forEach(d2=>{
                d2.name == 'resourceimageid' && (imgSrc = d2.value)
                d2.hasSendButton && (sendButtons = d2.options);
                d2.accountinfo && (accountInfo = d2.accountinfo)
            })
        } 
        if(d.id=='item4' || d.id=='item5') infoGroup.push(d);
    })
}
let initialState = Immutable.fromJS(initState);
export default function myCard(state = initialState, action) {
	switch(action.type) {
        /*Tabs*/
		case types.HRM_MYCARD_TABS:
			return state.merge({tabs:action.value});
		/*activeKey*/
		case types.HRM_MYCARD_ACTIVEKEY:
			return state.merge({activeKey:action.value});
		/*datas*/
		case types.HRM_MYCARD_DATAS:
			getDatas(action.value);
			return state.merge({
				datas:action.value,
				infoGroup:infoGroup,
				imgSrc:imgSrc,
				hrmInfo:hrmInfo,
				sendButtons:sendButtons,
				accountInfo:accountInfo,
			});
		/*各模块数据*/
		case types.HRM_MYCARD_ITEM:
			return state.merge({modelItems:action.value});
		/*二维码*/
		case types.HRM_MYCARD_SHOWSQR:
			return state.merge({showSQR:action.value});
		/*放大照片*/
		case types.HRM_MYCARD_SHOWBIGIMG:
			return state.merge({showBigImg:action.value});
		case types.HRM_MYCARD_SHOWACCINFO:
			return state.merge({showAccountInfo:action.value})
		case types.HRM_MYCARD_TOPBUTTON_SWITCH:
			return state.merge({isEditor:action.value})
		default:
			return state
	}
}
