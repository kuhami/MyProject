import * as types from '../constants/ActionTypes'

let initialState = {
	title: "查询文档",
	loading: false,
	showTable: false,
	showSearchAd: false,
	fields: {},
	dataKey: '',
	conditioninfo: [],
	treeDatas: [],
	treeTypes: {},
	treeCounts: [],
	selectedTreeKeys:[],
	rightMenu:{},
	showLog : false,
	docid : 0,
	dummyImport : false,
	importType : '',
	importParam : ''
};
import Immutable from 'immutable';
let initState = Immutable.fromJS(initialState);
export default function search(state = initState, action) {
	switch(action.type) {
		case types.SEARCH_LOADING:
			return state.merge({ loading: action.loading});
		case types.SEARCH_SETSHOWTABLE:
			return state.merge({showTable: action.showTable});
		case types.SEARCH_SETDATAKEY:
			return state.merge({dataKey: action.dataKey});
		case types.SEARCH_SETSHOWSEARCHAD:
			return state.merge({ showSearchAd: action.showSearchAd});
		case types.SEARCH_SAVEFIELDS:
			return state.merge({ fields: action.fields});
		case types.SEARCH_SETCONDITIONINFO:
			return state.merge({ conditioninfo: action.conditioninfo });
		case types.SEARCH_SETTREEDATAS:
			return state.merge({ treeDatas: action.treeDatas, treeTypes: action.treeTypes, treeCounts: action.treeCounts });
		case types.SEARCH_SET_SELECTED_TREEKEYS:
      		return state.merge({selectedTreeKeys: action.value});
      	case types.SEARCH_GET_RIGHT_MENU:
			return state.merge({ rightMenu: action.value });
		case types.SEARCH_LOG : 
			return state.merge({showLog : action.showLog,docid : action.docid});
		case types.SEARCH_IMPORT : 
			return state.merge({dummyImport : action.dummyImport,importType : action.importType,importParam : action.importParam});			
		default:
			return state
	}
}