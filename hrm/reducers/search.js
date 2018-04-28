import * as types from '../constants/ActionTypes';
import Immutable from 'immutable';
import isEmpty from 'lodash/isEmpty';
import { WeaTools } from 'ecCom';
import * as Utils from '../utils';
let initState = {
	title: "查询人员",
	loading: false,
	condition: WeaTools.ls.getJSONObj('hrmSearchConditions')||[],
    templateSelect:[],
	fields: {},
	dataKey:'',
	showTable: false,
	showSearchAd:false,
	searchParamsAd: {},
	leftTree: WeaTools.ls.getJSONObj('hrmSearchLeftTree')||[],
	responseId:'',
	templateSelectedKey:'',
	queryCondition:[],
	queryConditionFields:{},
};

let initialState = Immutable.fromJS(initState);
export default function search(state = initialState, action) {
	switch(action.type) {
		case types.HRM_SEARCH_LOADING:
			return state.merge({loading:action.loading});
		/*搜索条件浏览框*/
		case types.HRM_SEARCH_Conditions:
			return state.merge({condition:action.condition});
        /*模板下拉选择框*/
        case types.HRM_SEARCH_TEMPLATE_SELECT:
            return state.merge({templateSelect:action.value})
		/*是否展示Table*/
		case types.HRM_SEARCH_UPDATE_DISPLAY_TABLE:
            return state.merge({showTable: action.value});
        /*保存表单域*/
		case types.HRM_SEARCH_SAVE_FIELDS:
			// console.log('action.fields',action.fields);
			return state.merge({
				fields:action.fields,
				searchParamsAd:Utils.translateFormFields(action.fields)
			});
        /*Table数据*/
        case types.HRM_SEARCH_SEARCH_RESULT:
            return state.merge({dataKey: action.value});
        /*高级搜索显隐*/
        case types.HRM_SEARCH_SET_SHOW_SEARCHAD:
            return state.merge({showSearchAd: action.value});
        /*存为模板 response id*/
        case types.HRM_SEARCH_TEMPLATE_ID:
        	return state.merge({responseId:action.value})
        /*模板选中key*/
        case types.HRM_SEARCH_TEMPLATE_SELECTEDKEY:
        	return state.merge({templateSelectedKey:action.value})
        /*查询条件定制*/
        case types.HRM_SEARCH_CUSTOM_QUERYCONDITION:
        	return state.merge({queryCondition:action.value})
        /*查询条件定制保存表单域*/
		case types.HRM_SEARCH_SAVE_CUSTOM_QUERYCONDITION_FIELDS:
			return state.merge({
				queryConditionFields:action.fields,
				
			});
		default:
			return state
	}
}
/*customQueryConditionParam:translateFormFields(action.fields)*/
