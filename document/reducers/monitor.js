import * as types from '../constants/ActionTypes'

let initialState = {
	title: "文档监控",
	loading: false
};

export default function monitor(state = initialState, action) {
	switch(action.type) {
		case types.MONITOR_LOADING:
			return {...state, loading: action.loading};
		default:
			return state
	}
}