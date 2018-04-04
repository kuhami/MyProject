import * as types from '../constants/ActionTypes'

let initialState = {
	title: "最新文档",
	loading: false,
	showSearchAd: false,
	fields: {},
	dataKey: '',
	conditioninfo: [],
	treeDatas: [],
	treeTypes: {},
	treeCounts: [],
	selectedTreeKeys: [],
	topTab: [],
	topTabKey: '',
	rightMenu: {},
	showLog : false,
	docid : 0
};
import Immutable from 'immutable'
let initState = Immutable.fromJS(initialState);
export default function latest(state = initState, action) {
	switch(action.type) {
		case types.LATEST_LOADING:
			return state.merge({loading: action.loading});
		case types.LATEST_SETSHOWSEARCHAD:
			return state.merge({showSearchAd: action.showSearchAd});
		case types.LATEST_SETDATAKEY:
			return state.merge({dataKey: action.dataKey});
		case types.LATEST_SAVEFIELDS:
			return state.merge({ 
				fields: action.fields,
				topTabKey: function(){
					let topTabKey = '';//topTabKey
	                if(action.fields){
				    	for (let key in action.fields) {
					    	if(action.fields[key].name == 'viewcondition'){
					    		topTabKey = action.fields[key].value
					    	}
				    	}
			    	}
                	return topTabKey
				}()
			});
		case types.LATEST_SETCONDITIONINFO:
			return state.merge({ conditioninfo: action.conditioninfo });
		case types.LATEST_SETTREEDATAS:
			return state.merge({ treeDatas: action.treeDatas, treeTypes: action.treeTypes, treeCounts: action.treeCounts });
		case types.LATEST_SET_SELECTED_TREEKEYS:
      		return state.merge({selectedTreeKeys: action.value});
      	case types.LATEST_GET_TOP_TAB:
      		return state.merge({topTab: action.value});
      	case types.LATEST_GET_RIGHT_MENU:
			return state.merge({ rightMenu: action.value });
		case types.LATEST_LOG : 
			return state.merge({showLog : action.showLog,docid : action.docid});	
		default:
			return state
	}
}
