import * as types from '../constants/ActionTypes'

let initialState = {
	title: "文档日志",
	loading: false,
	showSearchAd: false,
	fields: {},
	dataKey: '',
	conditioninfo: [],
	topTab: [],
	topTabKey: '',
	rightMenu:{}
};
import Immutable from 'immutable'
let initState = Immutable.fromJS(initialState);
export default function docLog(state = initState, action) {
	switch(action.type) {
		case types.DOCLOG_LOADING:
			return state.merge({loading: action.loading});
		case types.DOCLOG_SETSHOWSEARCHAD:
			return state.merge({showSearchAd: action.showSearchAd});
		case types.DOCLOG_SETDATAKEY:
			return state.merge({dataKey: action.dataKey});
		case types.DOCLOG_SAVEFIELDS:
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
		case types.DOCLOG_SETCONDITIONINFO:
			return state.merge({ conditioninfo: action.conditioninfo });
      	case types.DOCLOG_GET_TOP_TAB:
      		return state.merge({topTab: action.value});
      	case types.DOCLOG_GET_RIGHT_MENU:
			return state.merge({ rightMenu: action.value });
		case types.DOCLOG_DOCID:
			return state.merge({ docid: action.docid });	
		default:
			return state
	}
}
