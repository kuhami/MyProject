import React from 'react'
import { render } from 'react-dom'

import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk/lib/index'
import configureStore from '../main/store/configureStore'

import { Route, IndexRedirect, Router, hashHistory } from 'react-router';
import { createHashHistory } from 'history'
import { routerReducer } from 'react-router-redux/lib/reducer'
import useRouterHistory from 'react-router/lib/useRouterHistory'
import syncHistoryWithStore from 'react-router-redux/lib/sync'

import { WeaErrorPage } from 'ecCom';
import { comsReducer } from 'comsRedux'

import Home from "./components/Home.js"

import Doc from 'weaDoc'
const DocRoute = Doc.Route;
const docReducer = Doc.reducer;
const DocAction = Doc.action;

const reducer = combineReducers({
	routing: routerReducer,
	...comsReducer,
	...docReducer,
});

const debug = true;

let store = configureStore(
	reducer,
	applyMiddleware(
		thunkMiddleware
	)
);

if(debug && !(window.attachEvent && navigator.userAgent.indexOf('Opera') === -1) && window.__REDUX_DEVTOOLS_EXTENSION__) { //非IE才有debug
	store = configureStore(
		reducer,
		compose(
			applyMiddleware(
				thunkMiddleware
			), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
	)
}


const browserHistory  = useRouterHistory(createHashHistory)({
    queryKey: '_key',
	basename: '/'
});

const history = syncHistoryWithStore(browserHistory, store);

class Error extends React.Component {
	render() {
		return(
			<WeaErrorPage msg="对不起，无法找到该页面！" />
		)
	}
}

class Root extends React.Component {
	render() {
		return(
			<Provider store={store}>
		        <Router history={history}>
		            <Route path="/">
		                <IndexRedirect to="error"/>
		                <Route path="/main" component={Home}>
		                    { DocRoute }
		                </Route>
		                <Route path="*" component={Error}/>
		            </Route>
		        </Router>
		    </Provider>
		)
	}
}
render(<Root />, document.getElementById('container'), () => {

});