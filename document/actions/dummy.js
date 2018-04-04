import * as types from '../constants/ActionTypes'
import {WeaTable} from 'comsRedux'
const WeaTableAction = WeaTable.action;
import {WeaTools} from 'ecCom'
import {Modal} from 'antd'

export const doLoading = loading => {
	return (dispatch, getState) => {
		dispatch({
			type: types.DUMMY_LOADING,
			loading
		});
	}
}

//高级搜索显隐
export const setShowSearchAd = showSearchAd => {
	return {
		type: types.DUMMY_SETSHOWSEARCHAD,
		showSearchAd
	}
}

//同步表单
export const saveFields = (fields = {}) => {
	return {
		type: types.DUMMY_SAVEFIELDS,
		fields
	}
}
//树选中
export const setSelectedTreeKeys = (value = []) => {
	return (dispatch, getState) => {
		dispatch({type: types.DUMMY_SET_SELECTED_TREEKEYS,value:value})
	}
}


