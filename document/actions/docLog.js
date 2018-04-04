import * as types from '../constants/ActionTypes'
import {WeaTable} from 'comsRedux'
const WeaTableAction = WeaTable.action;
import {WeaTools} from 'ecCom'
import {Modal} from 'antd'
import * as DocLog from '../apis/DocLog'

export const doLoading = loading => {
	return (dispatch, getState) => {
		dispatch({
			type: types.DOCLOG_LOADING,
			loading
		});
	}
}

//高级搜索显隐
export const setShowSearchAd = showSearchAd => {
	return {
		type: types.DOCLOG_SETSHOWSEARCHAD,
		showSearchAd
	}
}

//同步表单
export const saveFields = (fields = {}) => {
	return {
		type: types.DOCLOG_SAVEFIELDS,
		fields
	}
}
//topTab
export const topTab = (params={}) => {
	return (dispatch, getState) => {
		DocLog.getTopTab().then(datas=>{
			dispatch({
				type: types.DOCLOG_GET_TOP_TAB,
				value:datas.groupinfo
			})
		})
	}
}
