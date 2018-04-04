import * as types from '../constants/ActionTypes'

let initialState = {
	title: "文档目录",
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
	firstClassTree:{},
    defaultExpandedKeys:'',
    showLog : false,
	docid : 0
};
import Immutable from 'immutable'
let initState = Immutable.fromJS(initialState);
export default function directory(state = initState, action) {
	switch(action.type) {
		case types.DIRECTORY_LOADING:
			return state.merge({loading: action.loading});
		case types.DIRECTORY_SETSHOWSEARCHAD:
			return state.merge({showSearchAd: action.showSearchAd});
		case types.DIRECTORY_SETDATAKEY:
			return state.merge({dataKey: action.dataKey});
		case types.DIRECTORY_SAVEFIELDS:
			return state.merge({ fields: action.fields});
		case types.DIRECTORY_SETCONDITIONINFO:
			return state.merge({ conditioninfo: action.conditioninfo });
		/*同步树*/
		case types.DIRECTORY_SETTREEDATAS:
			return state.merge({ treeDatas: action.treeDatas, treeTypes: action.treeTypes, treeCounts: action.treeCounts });
		case types.DIRECTORY_SET_SELECTED_TREEKEYS:
      		return state.merge({selectedTreeKeys: action.value});
      	case types.DIRECTORY_GET_RIGHT_MENU:
			return state.merge({ rightMenu: action.value });
		/*异步树--初始化*/
        case types.DIRECTORY_SEARCH_INIT_TREE:
        	return state.merge({
        		firstClassTree:action.firstClassTree,
        		defaultExpandedKeys:action.defaultExpandedKeys,
        	});
        case types.DIRECTORY_LOG : 
			return state.merge({showLog : action.showLog,docid : action.docid});		
		default:
			return state
	}
}
