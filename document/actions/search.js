import * as types from '../constants/ActionTypes'

//loading
export const doLoading = loading => {
	return (dispatch, getState) => {
		dispatch({
			type: types.SEARCH_LOADING,
			loading
		});
	}
}

//搜索页面 和列表页面切换
export const setShowTable= showTable => {
	return {
		type: types.SEARCH_SETSHOWTABLE,
		showTable
	}
}

//高级搜索显隐
export const setShowSearchAd = showSearchAd => {
	return {
		type: types.SEARCH_SETSHOWSEARCHAD,
		showSearchAd
	}
}

//同步表单
export const saveFields = (fields = {}) => {
	return {
		type: types.SEARCH_SAVEFIELDS,
		fields
	}
}
//树选中
export const setSelectedTreeKeys = (value = []) => {
	return (dispatch, getState) => {
		dispatch({type: types.SEARCH_SET_SELECTED_TREEKEYS,value:value})
	}
}

//导入到虚拟目录
export const showDummyImport = (params = {}) => {
    return (dispatch,getState) => {
        dispatch({
            type: types.SEARCH_IMPORT,
            dummyImport : params.dummyImport,
			importType : params.importType,
			importParam : params.importParam
        });
    }
}