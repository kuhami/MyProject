import * as types from '../constants/ActionTypes'
import * as Detail from '../apis/Detail'

export const doLoading = ( loading = false ) => {
	return {
		type: types.DETAIL_LOADING,
		loading
	}
}

export const setTabKey = ( tabKey = 0 ) => {
	return {
		type: types.DETAIL_SETTABKEY,
		tabKey
	}
}

//文档详情 基本信息
export const getBasic = ( params = {} ) => {
	return (dispatch, getState) => {
		Detail.getBasic(params).then(data => {
			dispatch({
				type: types.DETAIL_SETBADIC,
				basicInfo: data.data 
			});
		})
	}
}
