import * as types from '../constants/ActionTypes'

let initialState = {
	title: "批量共享",
	loading: false
};

export default function batchSharing(state = initialState, action) {
	switch(action.type) {
		case types.BATCHSHARING_LOADING:
			return {...state, loading: action.loading};
		default:
			return state
	}
}