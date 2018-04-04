import * as types from '../constants/ActionTypes'

let initialState = {
	title: "知识排名",
	loading: false,
	showSearchAd: false,
	fields: {},
	dataKey: '',
	conditioninfo: [],
	topTab: [],
	topTabKey: '',
	rightMenu: {},
	showLog : false,
	docid : 0
};
import Immutable from 'immutable'
let initState = Immutable.fromJS(initialState);
export default function rank(state = initState, action) {
	switch(action.type) {
		case types.RANK_LOADING:
			return state.merge({loading: action.loading});
		case types.RANK_SETSHOWSEARCHAD:
			return state.merge({showSearchAd: action.showSearchAd});
		case types.RANK_SETDATAKEY:
			return state.merge({dataKey: action.dataKey});
		case types.RANK_SAVEFIELDS:
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
		case types.RANK_SETCONDITIONINFO:
			return state.merge({ conditioninfo: action.conditioninfo });
      	case types.RANK_GET_TOP_TAB:
      		return state.merge({topTab: action.value});
      	case types.RANK_GET_RIGHT_MENU:
			return state.merge({ rightMenu: action.value });
		case types.RANK_LOG : 
			return state.merge({showLog : action.showLog,docid : action.docid});		
		default:
			return state
	}
}
