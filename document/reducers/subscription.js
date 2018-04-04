import * as types from '../constants/ActionTypes'

let initialState = {
	title: "文档订阅",
	loading: false
};

export default function subscription(state = initialState, action) {
	switch(action.type) {
		case types.SUBSCRIPTION_LOADING:
			return {...state, loading: action.loading};
		default:
			return state
	}
}