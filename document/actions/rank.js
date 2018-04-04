import * as types from '../constants/ActionTypes'
import {WeaTable} from 'comsRedux'
import * as Rank from '../apis/Rank'
const WeaTableAction = WeaTable.action;
import {WeaTools} from 'ecCom'
import {Modal} from 'antd'

export const doLoading = loading => {
	return (dispatch, getState) => {
		dispatch({
			type: types.RANK_LOADING,
			loading
		});
	}
}

//高级搜索显隐
export const setShowSearchAd = showSearchAd => {
	return {
		type: types.RANK_SETSHOWSEARCHAD,
		showSearchAd
	}
}

//同步表单
export const saveFields = (fields = {}) => {
	return {
		type: types.RANK_SAVEFIELDS,
		fields
	}
}
//topTab
export const topTab = (params={}) => {
	return (dispatch, getState) => {
		Rank.getTopTab().then(datas=>{
			dispatch({
				type: types.RANK_GET_TOP_TAB,
				value:datas.groupinfo
			})
		})
	}
}
