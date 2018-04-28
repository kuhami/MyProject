import * as types from '../../constants/ActionTypes';
import Immutable from 'immutable';
import isEmpty from 'lodash/isEmpty';
import { WeaTools } from 'ecCom';

let initState = {

};

let initialState = Immutable.fromJS(initState);
export default function myCard(state = initialState, action) {
	switch(action.type) {

		default:
			return state
	}
}
