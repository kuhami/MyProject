import PropTypes from 'react-router/lib/PropTypes'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as SubscriptionAction from '../actions/subscription'

import { WeaErrorPage, WeaTools } from 'ecCom'

//import { } from 'comsRedux'

class Subscription extends React.Component {
	static contextTypes = {
		router: PropTypes.routerShape
	}
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		//一些初始化请求
		const { actions } = this.props;
	}
	componentWillReceiveProps(nextProps) {
		const keyOld = this.props.location.key;
		const keyNew = nextProps.location.key;
		//点击菜单路由刷新组件
		if(keyOld !== keyNew) {

		}
		//设置页标题
		//		if(window.location.pathname.indexOf('/') >= 0 && nextProps.title && document.title !== nextProps.title)
		//			document.title = nextProps.title;
	}
	shouldComponentUpdate(nextProps, nextState) {
		//组件渲染控制
		//return this.props.title !== nextProps.title
	}
	componentWillUnmount() {
		//组件卸载时一般清理一些状态

	}
	render() {
		const { loading, title } = this.props;
		return (
			<div>
				{ loading ? '加载中' : title}
            </div>
		)
	}

}

//组件检错机制
class MyErrorHandler extends React.Component {
	render() {
		const hasErrorMsg = this.props.error && this.props.error !== "";
		return(
			<WeaErrorPage msg={ hasErrorMsg ? this.props.error : "对不起，该页面异常，请联系管理员！" } />
		);
	}
}

Subscription = WeaTools.tryCatch( React, MyErrorHandler, { error: "" })(Subscription);

//form 表单与 redux 双向绑定
//Subscription = createForm({
//	onFieldsChange(props, fields) {
//		props.actions.saveFields({ ...props.fields, ...fields });
//	},
//	mapPropsToFields(props) {
//		return props.fields;
//	}
//})(Subscription);


// 把 state map 到组件的 props 上
const mapStateToProps = state => {
	const { loading, title } = state.documentSubscription;
	return { loading, title }
}

// 把 dispatch map 到组件的 props 上
const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators(SubscriptionAction, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Subscription);