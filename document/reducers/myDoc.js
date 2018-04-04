import * as types from '../constants/ActionTypes'

let initialState = {
	title: "我的文档",
	loading: false,
	showSearchAd: false,
	fields: {},
	dataKey: '',
	conditioninfo: [],
	treeDatas: [],
	treeTypes: {},
	treeCounts: [],
	selectedTreeKeys: [],
	rightMenu:{},
	showLog : false,
	docid : 0
};
import Immutable from 'immutable'
let initState = Immutable.fromJS(initialState);
export default function myDoc(state = initState, action) {
	switch(action.type) {
		case types.MYDOC_LOADING:
			return state.merge({loading: action.loading});
		case types.MYDOC_SETSHOWSEARCHAD:
			return state.merge({showSearchAd: action.showSearchAd});
		case types.MYDOC_SETDATAKEY:
			return state.merge({dataKey: action.dataKey});
		case types.MYDOC_SAVEFIELDS:
			return state.merge({ fields: action.fields});
		case types.MYDOC_SETCONDITIONINFO:
			return state.merge({ conditioninfo: action.conditioninfo });
		case types.MYDOC_SETTREEDATAS:
			return state.merge({ treeDatas: action.treeDatas, treeTypes: action.treeTypes, treeCounts: action.treeCounts });
		case types.MYDOC_SET_SELECTED_TREEKEYS:
      		return state.merge({selectedTreeKeys: action.value});
      	case types.MYDOC_GET_RIGHT_MENU:
			return state.merge({ rightMenu: action.value });
		case types.MYDOC_LOG : 
			return state.merge({showLog : action.showLog,docid : action.docid});	
		default:
			return state
	}
}
