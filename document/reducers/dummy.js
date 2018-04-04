import * as types from '../constants/ActionTypes'

let initialState = {
	title: "虚拟目录",
	loading: false,
	showSearchAd: false,
	fields: {},
	searchParams: {},
	searchParamsAd: {},
	dataKey: '',
	conditioninfo: [],
	treeDatas: [],
	treeTypes: {},
	treeCounts: [],
	selectedTreeKeys: [],
	rightMenu:{},
};
import Immutable from 'immutable'
let initState = Immutable.fromJS(initialState);
export default function dummy(state = initState, action) {
	switch(action.type) {
		case types.DUMMY_LOADING:
			return state.merge({loading: action.loading});
		case types.DUMMY_SETSHOWSEARCHAD:
			return state.merge({showSearchAd: action.showSearchAd});
		case types.DUMMY_SETDATAKEY:
			return state.merge({dataKey: action.dataKey});
		case types.DUMMY_SAVEFIELDS:
			return state.merge({ fields: action.fields,
				searchParamsAd: function(){
	            	let params = {};
	                if(action.fields){
				    	for (let key in action.fields) {
					    	params[action.fields[key].name] = action.fields[key].value
				    	}
			    	}
                	return params
				}()
			});
		case types.DUMMY_SETCONDITIONINFO:
			return state.merge({ conditioninfo: action.conditioninfo });
		case types.DUMMY_SETTREEDATAS:
			return state.merge({ treeDatas: action.treeDatas, treeTypes: action.treeTypes, treeCounts: action.treeCounts });
		case types.DUMMY_SET_SELECTED_TREEKEYS:
      		return state.merge({selectedTreeKeys: action.value});
      	case types.DUMMY_GET_RIGHT_MENU:
			return state.merge({ rightMenu: action.value });
		default:
			return state
	}
}
