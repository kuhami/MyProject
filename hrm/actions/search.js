import * as types from '../constants/ActionTypes';
import * as Search from '../apis/search';
import {WeaTable} from 'comsRedux'
const WeaTableAction = WeaTable.action;
import {WeaTools} from 'ecCom'
import isEmpty from 'lodash/isEmpty'

const getWfList = (datas)=>{
    // console.log('getWfList',datas);
    let arr = new Array();
    for (let i=0;i<datas.length;i++) {
        const data = datas[i];
            arr.push({
                companyid:data.companyid,
                name: data.name,
                isVirtual:data.isVirtual,
            });
        }
    return arr;
}

export const doLoading = loading => {
	return (dispatch, getState) => {
		dispatch({
			type: types.HRM_SEARCH_LOADING,
			loading
		});
	}

}
/*搜索条件*/
export const getHrmSearchCondition = (params = {}) => {
	return (dispatch,getState) => {
		Search.getHrmSearchCondition(params).then((data) => {
            // WeaTools.ls.set("hrmSearchCondition", data.condition);
			dispatch({type:types.HRM_SEARCH_Conditions,condition:data.condition})
		})
	}
}
/*表单域值*/
export const saveFormFields = (value = {}) => {
    return (dispatch, getState) => {
        dispatch({type: types.HRM_SEARCH_SAVE_FIELDS, fields: value})
    }
}
/*搜索*/
export const doSearch = (params = {}) => {
    return (dispatch, getState) => {
        const {searchParamsAd} = getState()['hrmSearch'].toJS();
        // console.log('searchParamsAd',searchParamsAd,'params',params);
        Search.queryFieldsSearch({...searchParamsAd,...params}).then((data)=>{
        	// console.log('queryFieldsSearch--data',data);
            dispatch(WeaTableAction.getDatas(data.sessionkey, params.current || 1));
            dispatch({type: types.HRM_SEARCH_SEARCH_RESULT, value: data.sessionkey});
        })
    }
}
/*高级搜索显隐*/
export const setShowSearchAd = (value) => {
    return (dispatch, getState) => {
        dispatch({type: types.HRM_SEARCH_SET_SHOW_SEARCHAD, value: value})
    }
}
/*是否展示Table*/
export const showTable = (value) => {
    return (dispatch, getState) => {
        dispatch({type: types.HRM_SEARCH_UPDATE_DISPLAY_TABLE, value: value})
    }
}
/*存为模板*/
export const saveHrmSearchCondition = (params = []) => {
    return (dispatch, getState) => {
        return Search.saveHrmSearchCondition(params).then(data=>{
            // console.log('data',data)
            return data;
        })
    }
}
/*模板的下拉菜单*/
export const getHrmSearchMoudleList = (params = []) => {
    return (dispatch, getState) => {
        Search.getHrmSearchMoudleList(params).then(data=>{
            dispatch({type: types.HRM_SEARCH_TEMPLATE_SELECT,value:data})
        })
    }
}
/*保存模板id*/
export const saveResponseId = (id) => {
    return (dispatch,getState) => {
        dispatch({type:types.HRM_SEARCH_TEMPLATE_ID,value:id});
    }
}
/*保存模板select框key*/
export const saveSelectedKey = (key) => {
    return (dispatch,getState) => {
        dispatch({type:types.HRM_SEARCH_TEMPLATE_SELECTEDKEY,value:key});
    }
}
/*查询条件定制*/
export const customQueryCondition = (params) => {
    return (dispatch,getState) => {
        return Search.customQueryCondition(params).then(data=>{
            const condition = data.condition;
            dispatch({type:types.HRM_SEARCH_CUSTOM_QUERYCONDITION,value:condition});
            return condition;
        })
    }
}
/*查询条件定制--表单域*/
export const saveQueryConditionFiels = (value) => {
    return (dispatch, getState) => {
        dispatch({type:types.HRM_SEARCH_SAVE_CUSTOM_QUERYCONDITION_FIELDS,fields:value});
    }
}
/*POST 查询条件*/
export const saveQueryCondition = (params) => {
    return (dispatch,getState) => {
          Search.saveQueryCondition(params);
    }
}
