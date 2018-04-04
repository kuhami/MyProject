import * as types from '../constants/ActionTypes';
import {WeaTable} from 'comsRedux';
const WeaTableAction = WeaTable.action;
import {WeaTools} from 'ecCom';
import {Modal} from 'antd';
import * as Directory from '../apis/directory';

export const doLoading = loading => {
	return (dispatch, getState) => {
		dispatch({
			type: types.DIRECTORY_LOADING,
			loading
		});
	}
}

//高级搜索显隐
export const setShowSearchAd = showSearchAd => {
	return {
		type: types.DIRECTORY_SETSHOWSEARCHAD,
		showSearchAd
	}
}

//同步表单
export const saveFields = (fields = {}) => {
	return {
		type: types.DIRECTORY_SAVEFIELDS,
		fields
	}
}
//同步树--选中
export const setSelectedTreeKeys = (value = []) => {
	return (dispatch, getState) => {
		dispatch({type: types.DIRECTORY_SET_SELECTED_TREEKEYS,value:value})
	}
}

//异步树--获取一级树
export const initTree = (params = {}) => {
    return (dispatch, getState) => {
        Directory.queryFieldsTree(params).then((data)=>{
            dispatch({
                type: types.DIRECTORY_SEARCH_INIT_TREE, 
                firstClassTree:data.datas.rootCompany||{},
                defaultExpandedKeys:`directory0-${data.datas.rootCompany.id}`,
            })
        })
    }
}
export const treeSearch = (params = {}) => {
    return (dispatch, getState) => {
        Directory.treeSearch(params).then((data)=>{
            dispatch({
                type: types.DIRECTORY_SEARCH_INIT_TREE, 
                firstClassTree:data.datas.rootCompany||{},
                defaultExpandedKeys:`directory0-${data.datas.rootCompany.id}`,
            })
        })
    }
}

