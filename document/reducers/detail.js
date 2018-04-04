import * as types from '../constants/ActionTypes'

let initialState = {
	loading: false,
	basicInfo: {},
	tabKey: '0',
	dataKeys: {},
};

import Immutable from 'immutable'
let initState = Immutable.fromJS(initialState);

export default function directory(state = initState, action) {
	switch(action.type) {
		case types.DETAIL_LOADING:
			return state.merge({loading: action.loading});
		case types.DETAIL_SETTABKEY:
			return state.merge({tabKey: action.tabKey});
		case types.DETAIL_SETDATAKEY:
			return state.merge({dataKeys: state.get('dataKeys').merge({[action.params.type]: action.dataKey})});
		case types.DETAIL_SETBADIC:
			return state.merge({basicInfo: action.basicInfo});
		default:
			return state
	}
}
