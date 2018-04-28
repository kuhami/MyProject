import * as types from '../constants/ActionTypes';
import * as MyCard from '../apis/myCard';
import isEmpty from 'lodash/isEmpty'
import { WeaTools } from 'ecCom';

export const getTabsRouter = (params={}) => {
	return (dispatch,getState) => {
		MyCard.getTabsRouter(params).then((data) => {
            WeaTools.ls.set("hrmMyCardTabs", data);
            dispatch({type:types.HRM_MYCARD_TABS,value:data});
		})
	}
}
export const setActiveKey = (key='') => {
	return (dispatch,getState) => {
        dispatch({type:types.HRM_MYCARD_ACTIVEKEY,value:key});
	}
}
export const getResourceCard = (params={}) => {
	return (dispatch,getState) => {
		MyCard.getResourceCard(params).then(data => {
			const result = data.result;
        	dispatch({type:types.HRM_MYCARD_DATAS,value:result});
		})
	}
}
export const getQRCode = (params={}) => {
	return (dispatch,getState) => {
		return MyCard.getQRCode(params).then(data => {
        	return data;
		})
	}
}
export const getHrmResourceItem = (params={}) => {
	return (dispatch,getState) => {
		MyCard.getHrmResourceItem(params).then(data => {
        	dispatch({type:types.HRM_MYCARD_ITEM,value:data});
		})
	}
}
export const showSQR = (bool) => {
	return (dispatch,getState) => {
        dispatch({type:types.HRM_MYCARD_SHOWSQR,value:bool});
	}
}
export const showBigImg = (bool) => {
	return (dispatch,getState) => {
        dispatch({type:types.HRM_MYCARD_SHOWBIGIMG,value:bool});
	}
}

export const showAccountInfo = (bool) => {
	return (dispatch,getState) => {
        dispatch({type:types.HRM_MYCARD_SHOWACCINFO,value:bool});
	}
}

export const editCard = (bool) => {
	return (dispatch,getState) => {
        dispatch({type:types.HRM_MYCARD_TOPBUTTON_SWITCH,value:bool});
	}
}