import * as types from '../constants/ActionTypes'
import {WeaTable} from 'comsRedux'
import * as Latest from '../apis/Latest'
const WeaTableAction = WeaTable.action;
import {WeaTools} from 'ecCom'
import {Modal} from 'antd'

export const doLoading = loading => {
	return (dispatch, getState) => {
		dispatch({
			type: types.LATEST_LOADING,
			loading
		});
	}
}

//高级搜索显隐
export const setShowSearchAd = showSearchAd => {
	return {
		type: types.LATEST_SETSHOWSEARCHAD,
		showSearchAd
	}
}

//同步表单
export const saveFields = (fields = {}) => {
	return {
		type: types.LATEST_SAVEFIELDS,
		fields
	}
}
//树选中
export const setSelectedTreeKeys = (value = []) => {
	return (dispatch, getState) => {
		dispatch({
			type: types.LATEST_SET_SELECTED_TREEKEYS,
			value:value
		})
	}
}
//topTab
export const topTab = (params={}) => {
	return (dispatch, getState) => {
		Latest.getTopTab().then(datas=>{
			dispatch({
				type: types.LATEST_GET_TOP_TAB,
				value:datas.groupinfo
			})
		})
	}
}
