import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Button, Form } from 'antd'
const createForm = Form.create;
const FormItem = Form.Item;

import Immutable from 'immutable'
const is = Immutable.is;
import { WeaTable } from 'comsRedux'
const WeaTableAction = WeaTable.action;

import {
	WeaRightMenu,
	WeaLeftRightLayout,
	WeaTop,
	WeaTab,
	WeaSearchGroup,
	WeaLeftTree,
	WeaErrorPage, 
	WeaTools
} from 'ecCom'

import * as DocLogAction from '../actions/docLog'
import * as ComsAction from '../actions/coms'

import * as Operate from '../util/Operate'

let quickSearchPara = '';

let MODULE = "DocLog";

let DOCID = 0;

class DocLogTable extends React.Component {
	constructor(props) {
		super(props);
		this.onRightMenuClick = this.onRightMenuClick.bind(this);
	}
	componentDidMount() {
		//一些初始化请求
		const { actions } = this.props;
		let docid = this.props.docid;
		DOCID = docid;
		actions.getConditionInfo(MODULE);
		actions.doSearch(MODULE,{docid : docid});
		actions.topTab();
		actions.getRightMenu(MODULE);
	}
	componentWillReceiveProps(nextProps) {
		const { actions,docid} = this.props;
		if(docid && DOCID != docid){
			DOCID = docid;
			actions.doSearch(MODULE,{docid : docid});
		}
	}
	shouldComponentUpdate(nextProps,nextState) {
		return !is(this.props.loading,nextProps.loading)||
			!is(this.props.title,nextProps.title)||
			!is(this.props.comsWeaTable,nextProps.comsWeaTable)||
			!is(this.props.selectedTreeKeys,nextProps.selectedTreeKeys)||
			!is(this.props.dataKey,nextProps.dataKey)||
			!is(this.props.showSearchAd,nextProps.showSearchAd)||
			!is(this.props.conditioninfo,nextProps.conditioninfo)||
			!is(this.props.fields,nextProps.fields)||
			!is(this.props.searchParams,nextProps.searchParams)||
			!is(this.props.rightMenu,nextProps.rightMenu) ||
			!is(this.props.topTab,nextProps.topTab) ||
			!is(this.props.topTabKey,nextProps.topTabKey) ||
			this.props.docid !== nextProps.docid

	}
	componentWillUnmount() {
		//组件卸载时一般清理一些状态
	}
	render() {
		// console.log('render-----------');
		const { dataKey, loading, title, actions, comsWeaTable, showSearchAd,fields,topTab,docid, tabType = 'line', searchType = ['base','advanced'],hasOrder = true, needScroll = true} = this.props;
		const tablekey = dataKey ? dataKey.split('_')[0] : 'init';
		const tableNow = comsWeaTable.get(tablekey);
		const loadingTable = tableNow.get('loading');
		return (
			<div style={{'height' : '100%'}}>
				<WeaRightMenu datas={this.getRightMenu()} onClick={this.onRightMenuClick}>
					
						
							<WeaTab
							tabType={tabType}
	                        buttonsAd={this.getTabButtonsAd()}
	                    	searchType={searchType}
	                    	searchsBaseValue={fields.toJS()[quickSearchPara]&&fields.toJS()[quickSearchPara].value}
	                    	searchsAd={this.getSearchs()}
	                    	showSearchAd={showSearchAd}
	                        setShowSearchAd={bool=>actions.setShowSearchAd(bool)}
	                        hideSearchAd={()=>actions.setShowSearchAd(false)}
	                        datas={topTab && topTab.toJS()}
	                        selectedKey={this.getSelectedKey()}
							keyParam="viewcondition"  //主键
							onChange={(key)=>{
								actions.setShowSearchAd(false);
								actions.saveFields({...fields.toJS(),topTabKey:{name:'viewcondition',value:key}});
    							actions.doSearch(MODULE,{docid : docid});
							}}
	                        onSearch={v=>actions.doSearch(MODULE,{docid : docid})}
							onSearchChange={v => {
                        		actions.saveFields({
                        			...fields.toJS(),
                        			[quickSearchPara]:{name:`${quickSearchPara}`,value:v},
                        		});
                        	}}
	                    />
							<WeaTable 
								sessionkey={dataKey}
								hasOrder={hasOrder}
								needScroll={needScroll}
							/>
						
				</WeaRightMenu>
			</div>

		)
	}
	getRightMenu(){
       const { dataKey, actions, comsWeaTable,rightMenu,loading} = this.props;
		const tablekey = dataKey ? dataKey.split('_')[0] : 'init';
		const tableNow = comsWeaTable.get(tablekey);
    	const selectedRowKeys = tableNow.get('selectedRowKeys');
    	let _disabled = !(selectedRowKeys && `${selectedRowKeys.toJS()}`)
        let btnArr = [];
        rightMenu && !is(rightMenu,Immutable.fromJS({})) && rightMenu.get('rightMenus').map(m=>{
            let fn = m.get('menuFun').indexOf('this') >= 0 ? `${m.get('menuFun').split('this')[0]})` : m.get('menuFun');
            btnArr.push({
                icon: <i className={m.get('menuIcon')} />,
                content: m.get('menuName'),
                disabled : m.get("isControl") == "1" && _disabled
            })
        });
        return btnArr
	}
	getSelectedKey = ()=>{
		const {topTab,topTabKey}=this.props;
		let selectedTab = '';
		topTab && topTab.toJS().forEach(t=>{
			if(t.selected){
				selectedTab = t.viewcondition;
			}
		})
		topTabKey && (selectedTab = topTabKey);
		return selectedTab;
	}
	onRightMenuClick(key){
   		const { dataKey, actions, comsWeaTable,rightMenu,loading,docid} = this.props;
		const tablekey = dataKey ? dataKey.split('_')[0] : 'init';
		const tableNow = comsWeaTable.get(tablekey);
    	const selectedRowKeys = tableNow.get('selectedRowKeys');

        rightMenu && !is(rightMenu,Immutable.fromJS({})) && rightMenu.get('rightMenus').map((m,i)=>{
        	if(Number(key) == i){
        		let fn = m.get('menuFun').indexOf('this') >= 0 ? `${m.get('menuFun').split('this')[0]})` : m.get('menuFun');
        		if(fn == ""){
        			if(m.get('type') == "BTN_SEARCH"){ //搜索
        				actions.doSearch(MODULE,{docid : docid});
        			}else if(m.get('type') == "BTN_MINIATURE_DISPLAY"){ // 缩略图

        			}else if(m.get('type') == "BTN_COLUMN"){ //定制列

        			}else if(m.get('type') == "BTN_STORE"){ //搜藏

        			}else if(m.get('type') == "BTN_HELP"){ //帮助

        			}
        		}else{
	        		if(selectedRowKeys){
	        			var ids = "";
	        			selectedRowKeys.toJS().map((id)=>{
	        				ids += "," + id;
	        			});
	        			ids = ids.length > 0 ? ids.substring(1) : ids;

	        			fn = Operate.fnJoinPara(fn,ids);
	        			fn = Operate.fnJoinPara(fn,MODULE);
	        		}
	        		eval("Operate." + fn);
        		}
        	}
        });
	}
	getButtons(){
		const { dataKey, actions, comsWeaTable,rightMenu,loading} = this.props;
		const tablekey = dataKey ? dataKey.split('_')[0] : 'init';
		const tableNow = comsWeaTable.get(tablekey);
    	const selectedRowKeys = tableNow.get('selectedRowKeys');
        let btnArr = [];
        rightMenu && !is(rightMenu,Immutable.fromJS({})) && rightMenu.get('rightMenus').map(m=>{
            let fn = m.get('menuFun').indexOf('this') >= 0 ? `${m.get('menuFun').split('this')[0]})` : m.get('menuFun');
            m.get('isTop') == '1' && btnArr.length < 4 && btnArr.push(
            	<Button type="primary" 
            		disabled={!(selectedRowKeys && `${selectedRowKeys.toJS()}`)}
            		onClick={()=>{eval(fn)}}>
            		{m.get('menuName')}
            	</Button>
            );
        });
        return btnArr;
	}
	getSearchs(){
		const { conditioninfo } = this.props;
		let group = [];
		conditioninfo&&conditioninfo.toJS().forEach((c, i) =>{
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
			group.push(<WeaSearchGroup key={i} needTigger={true} title={c.title} showGroup={c.defaultshow} items={items}/>)
		});
		return <Form horizontal>{group}</Form>
	}
	
	getTabButtonsAd(){
		const { actions,docid } = this.props;
		return [
			(<Button type="primary" onClick={()=>{actions.doSearch(MODULE,{docid : docid});actions.setShowSearchAd(false)}}>搜索</Button>),
			(<Button type="ghost" onClick={()=>{actions.saveFields({})}}>重置</Button>),
			(<Button type="ghost" onClick={()=>{actions.setShowSearchAd(false)}}>取消</Button>)
		]
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

DocLogTable = WeaTools.tryCatch( React, MyErrorHandler, { error: "" })(DocLogTable);

//form 表单与 redux 双向绑定
DocLogTable = createForm({
	onFieldsChange(props, fields) {
		// console.log('onFieldsChange',fields)
		props.actions.saveFields({ ...props.fields.toJS(), ...fields });
	},
	mapPropsToFields(props) {
		return props.fields.toJS();
	}
})(DocLogTable);


// 把 state map 到组件的 props 上
const mapStateToProps = state => {
	const { documentDocLog, comsWeaTable } = state;
	return {
		comsWeaTable: comsWeaTable, 
		title:documentDocLog.get('title'), 
		loading:documentDocLog.get('loading'),  
		dataKey:documentDocLog.get('dataKey'),
		showSearchAd:documentDocLog.get('showSearchAd'),
		conditioninfo:documentDocLog.get('conditioninfo'),
		fields:documentDocLog.get('fields'),
		rightMenu:documentDocLog.get('rightMenu'),
		topTab:documentDocLog.get('topTab'),
		topTabKey:documentDocLog.get('topTabKey'),
		//docid : documentDocLog.get('docid')
	}
}

// 把 dispatch map 到组件的 props 上
const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators({...DocLogAction,...ComsAction,...WeaTableAction}, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DocLogTable);