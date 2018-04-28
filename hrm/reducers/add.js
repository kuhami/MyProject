import * as types from '../constants/ActionTypes'

let initialState = {
	title: "新建人员",
	loading: false
};

export default function add(state = initialState, action) {
	switch(action.type) {
		case types.ADD_LOADING:
			return {...state, loading: action.loading};
		default:
			return state
	}
}