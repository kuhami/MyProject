import PropTypes from 'react-router/lib/PropTypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Button, Form } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;

import Immutable from 'immutable';
const is = Immutable.is;
import {WeaTable} from 'comsRedux'
const WeaTableAction = WeaTable.action;

import {
	WeaRightMenu,
    WeaTop,
    WeaTab,
    WeaLeftRightLayout,
    WeaSearchGroup,
    WeaErrorPage, 
    WeaTools
} from 'ecCom'

import * as SearchAction from '../../actions/search'
import * as ComsAction from '../../actions/coms'

import '../../css/search.css'

class Search extends React.Component {
	static contextTypes = {
		router: PropTypes.routerShape
	}
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		//一些初始化请求
		const { actions } = this.props;
		actions.getConditionInfo('Search',{showAll : "1"});
	}
	componentWillReceiveProps(nextProps) {
		const keyOld = this.props.location.key;
		const keyNew = nextProps.location.key;
		const { actions } = this.props;
		//点击菜单路由刷新组件
		if(keyOld !== keyNew) {
			actions.getConditionInfo('Search',{showAll : "1"});
			actions.setShowSearchAd(false);
			actions.saveFields();
		}
		//设置页标题
		
	}
	shouldComponentUpdate(nextProps,nextState) {
		return !is(this.props.loading,nextProps.loading)||
			!is(this.props.title,nextProps.title)||
			!is(this.props.comsWeaTable,nextProps.comsWeaTable)||
			!is(this.props.showSearchAd,nextProps.showSearchAd)||
			!is(this.props.conditioninfo,nextProps.conditioninfo)||
			!is(this.props.fields,nextProps.fields)||
			!is(this.props.searchParams,nextProps.searchParams)||
			!is(this.props.rightMenu,nextProps.rightMenu)
	}
	componentWillUnmount() {
		//组件卸载时一般清理一些状态
		const { actions } = this.props;
		actions.setShowTable(false);
		actions.setShowSearchAd(false);
	}
	render() {
		const { loading, title, comsWeaTable, showTable, showSearchAd, actions } = this.props;
		const loadingTable = comsWeaTable.get('loading');
		return (
			<div className='wea-document-search'>
            	<WeaRightMenu datas={this.getRightMenu()} onClick={this.onRightMenuClick.bind(this)}>
	                <WeaTop
	                	title={title}
	                	loading={loading || loadingTable}
	                	icon={<i className='icon-portal-workflow' />}
	                	iconBgcolor='#55D2D4'
	                	buttons={this.getButtons()}
	                	buttonSpace={10}
	                	showDropIcon={true}
	                	dropMenuDatas={this.getRightMenu()}
	                	onDropMenuClick={this.onRightMenuClick}
	                >
	                    <div className='wea-document-search-ad'>
	                       	<Form horizontal>{this.getSearchs()}</Form>
	                        <div className='wea-document-search-btns'>
	                            {this.getSearchButtons()}
	                        </div>
	                    </div>
	                </WeaTop>
                </WeaRightMenu>
            </div>
		)
	}
	getRightMenu(){
		const { comsWeaTable, actions, showTable} = this.props;
    	const selectedRowKeys = comsWeaTable.get('selectedRowKeys');
    	let btns = [];
    	btns.push({
    		icon: <i className='icon-coms-search'/>,
    		content:'搜索'
    	});
    	if(showTable){
	    	btns.push({
	         	icon: <i className='icon-Right-menu-Batch-sharing'/>,
				content:'导入选中文档',
				disabled: !selectedRowKeys || !`${selectedRowKeys.toJS()}`
	        })
	    	btns.push({
	    		icon: <i className='icon-Right-menu-Batch-sharing'/>,
	    		content:'导入所有文档'
	    	})
	    	btns.push({
	    		icon: <i className='icon-Right-menu-Custom'/>,
	    		content:'显示定制列'
	    	})
    	}
    	return btns
	}
	onRightMenuClick = (key)=>{
		const { actions, comsWeaTable,location } = this.props;
    	const selectedRowKeys = comsWeaTable.get('selectedRowKeys');
    	if(key == '0'){ //搜索
    		actions.setShowSearchAd(false);
        	this.context.router.push({
        		pathname:location.pathname+'Result',
        		// state:fields.toJS(),
        	});
    	}
    	if(key == '1'){ //导入选中文档
    		
    	}
    	if(key == '2'){ //导入所有文档
    		
    	}
    	if(key == '3'){ //显示定制列
      		actions.setColSetVisible(true);
      		actions.tableColSet(true);
    	}
	}
	getSearchs(){
		const { conditioninfo } = this.props;
		let group = [];
		conditioninfo&&conditioninfo.toJS().forEach(c =>{
			let items = [];
			c.items.forEach( field => {
				if(field.isQuickSearch){
					quickSearchPara = field.domkey[0];
				}
				items.push({
					com:(<FormItem
						label={`${field.label}`}
						labelCol={{span: `${field.labelcol}`}}
						wrapperCol={{span: `${field.fieldcol}`}}>
							{WeaTools.getComponent(field.conditionType,field.browserConditionParam,field.domkey,this.props,field)}
						</FormItem>),
					colSpan:field.colSpan || 2
				});
			});
			group.push(<WeaSearchGroup needTigger={true} title={c.title} showGroup={true} items={items}/>)
		});
		return group;
	}
	getSearchButtons(){
		const { actions, searchParams, searchParamsAd, showTable,fields,location} = this.props;
		const goSearch = ()=>{
        	actions.setShowSearchAd(false);
        	this.context.router.push({
        		pathname:location.pathname+'Result',
        		// state:fields.toJS(),
        	});
		}
		let btns = [
			<Button type="primary" onClick={()=>goSearch()}>搜索</Button>,
            <Button type="ghost" onClick={()=>{actions.saveFields()}}>重置</Button>
        ];
		if(showTable) btns.push(<Button type="ghost" onClick={()=>{actions.setShowSearchAd(false)}}>取消</Button>)
        return btns
	}
	getButtons(){
		const { comsWeaTable, actions, showTable } = this.props;
    	const selectedRowKeys = comsWeaTable.get('selectedRowKeys');
    	let btns = [];
    	if(showTable){
    		btns.push(<Button type="primary" disabled={!(selectedRowKeys && `${selectedRowKeys.toJS()}`)}
    		    onClick={()=>console.log('导入选中文档')}>导入选中文档</Button>)
    		btns.push(<Button type="ghost" onClick={()=>console.log('导入所有文档')}>导入所有文档</Button>)
    	}
        return btns;
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

Search = WeaTools.tryCatch( React, MyErrorHandler, { error: "" })(Search);

//form 表单与 redux 双向绑定
Search = createForm({
	onFieldsChange(props, fields) {
		props.actions.saveFields({ ...props.fields.toJS(), ...fields });
	},
	mapPropsToFields(props) {
		return props.fields.toJS();
	}
})(Search);


// 把 state map 到组件的 props 上
const mapStateToProps = state => {
	const { documentSearch, comsWeaTable } = state;
	return {
		comsWeaTable: comsWeaTable, 
		title:documentSearch.get('title'), 
		loading:documentSearch.get('loading'), 
		showSearchAd:documentSearch.get('showSearchAd'),
		conditioninfo:documentSearch.get('conditioninfo'),
		fields:documentSearch.get('fields'),
		rightMenu:documentSearch.get('rightMenu'),
	}
}

// 把 dispatch map 到组件的 props 上
const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators({ ...SearchAction, ...ComsAction, ...WeaTableAction } , dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);