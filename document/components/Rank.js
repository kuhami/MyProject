import PropTypes from 'react-router/lib/PropTypes'
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
    WeaDialog,
    WeaTools
} from 'ecCom'

import * as RankAction from '../actions/rank'
import * as ComsAction from '../actions/coms'
import * as Operate from '../util/Operate'
import DocLogTable from './DocLog'


let quickSearchPara = '';
class Rank extends React.Component {
	static contextTypes = {
		router: PropTypes.routerShape
	}
	constructor(props) {
		super(props);
		this.onRightMenuClick = this.onRightMenuClick.bind(this);
		this.closeDialog = this.closeDialog.bind(this);
	}
	componentDidMount() {
		//一些初始化请求
		const { actions } = this.props;
		actions.getConditionInfo('Rank');
		actions.doSearch('Rank');
		actions.topTab();
		actions.getRightMenu('Rank');
	}
	componentWillReceiveProps(nextProps) {
		const { actions } = this.props;
		const keyOld = this.props.location.key;
		const keyNew = nextProps.location.key;
		//点击菜单路由刷新组件
		if(keyOld !== keyNew) {
			actions.getConditionInfo('Rank');
			actions.doSearch('Rank');
		}
		//设置页标题
		
	}
	shouldComponentUpdate(nextProps,nextState) {
		return !is(this.props.loading,nextProps.loading)||
			!is(this.props.title,nextProps.title)||
			!is(this.props.comsWeaTable,nextProps.comsWeaTable)||
			!is(this.props.dataKey,nextProps.dataKey)||
			!is(this.props.showSearchAd,nextProps.showSearchAd)||
			!is(this.props.conditioninfo,nextProps.conditioninfo)||
			!is(this.props.fields,nextProps.fields)||
			!is(this.props.searchParams,nextProps.searchParams)||
			!is(this.props.topTab,nextProps.topTab)||
			!is(this.props.topTabKey,nextProps.topTabKey)||
			!is(this.props.showLog,nextProps.showLog) ||
			!is(this.props.rightMenu,nextProps.rightMenu)

	}
	componentWillUnmount() {
		//组件卸载时一般清理一些状态
		const { actions } = this.props;
		actions.saveFields();
	}
	render() {
		const { dataKey, loading, title, actions, comsWeaTable, showSearchAd,topTab,fields,topTabKey} = this.props;
		// console.log('render-----------','fields',fields);
		const tablekey = dataKey ? dataKey.split('_')[0] : 'init';
		const tableNow = comsWeaTable.get(tablekey);
		const loadingTable = tableNow.get('loading');
		return (
			<div>
				<WeaRightMenu datas={this.getRightMenu()} onClick={this.onRightMenuClick}>
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
		             	<WeaTab
	                        buttonsAd={this.getTabButtonsAd()}
	                    	searchType={['base','advanced']}
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
    							actions.doSearch('Rank');
							}}
	                        onSearch={v=>actions.doSearch('Rank')}
							onSearchChange={v => {
                        		actions.saveFields({
                        			...fields.toJS(),
                        			[quickSearchPara]:{name:`${quickSearchPara}`,value:v},
                        		});
                        	}}
	                    />
	                    <WeaTable
	                    	sessionkey={dataKey}
	                    	hasOrder={true}
	                    	needScroll={true}
	                    	onOperatesClick={this.onOperatesClick}
	                    />
	                </WeaTop>
                </WeaRightMenu>

                <WeaDialog title={"文档日志"} visible={this.props.showLog} style={{width: 900, height: 600}} onCancel={this.closeDialog}>	
					{
						this.props.showLog && this.props.docid && 
						<DocLogTable docid={this.props.docid}></DocLogTable>	
					}
				</WeaDialog>

            </div>
		)
	}
	closeDialog(){
		const { actions} = this.props;
		actions.showDocLog('Rank',{show : false});
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
	onOperatesClick=(record,index,operate,flag,argumentString)=>{
		let _href = operate && operate.href ? operate.href : "";
		let fn = _href.replace("javascript:","");
		if(fn != ""){
			fn = Operate.fnJoinPara(fn,'Rank');
			fn = Operate.fnJoinPara(fn,record.id);
		}
		eval("Operate." + fn);

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
        // console.log('btnArr',btnArr)
        return btnArr
	}
	onRightMenuClick(key){
   		const { dataKey, actions, comsWeaTable,rightMenu,loading} = this.props;
		const tablekey = dataKey ? dataKey.split('_')[0] : 'init';
		const tableNow = comsWeaTable.get(tablekey);
    	const selectedRowKeys = tableNow.get('selectedRowKeys');
        rightMenu && !is(rightMenu,Immutable.fromJS({})) && rightMenu.get('rightMenus').map((m,i)=>{
        	if(Number(key) == i){
        		let fn = m.get('menuFun').indexOf('this') >= 0 ? `${m.get('menuFun').split('this')[0]})` : m.get('menuFun');
        		if(fn == ""){
        			if(m.get('type') == "BTN_SEARCH"){ //搜索
        				actions.doSearch('Rank');
        			}else if(m.get('type') == "BTN_MINIATURE_DISPLAY"){ // 缩略图

        			}else if(m.get('type') == "BTN_COLUMN"){ //定制列

        			}else if(m.get('type') == "BTN_STORE"){ //搜藏

        			}else if(m.get('type') == "BTN_HELP"){ //帮助

        			}
        		}else{
        			fn = Operate.fnJoinPara(fn,'Rank');
	        		if(selectedRowKeys){
	        			var ids = "";
	        			selectedRowKeys.toJS().map((id)=>{
	        				ids += "," + id;
	        			});
	        			ids = ids.length > 0 ? ids.substring(1) : ids;

	        			fn = Operate.fnJoinPara(fn,ids);
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
            		disabled={m.get('isControl') == '1' && !(selectedRowKeys && `${selectedRowKeys.toJS()}`)}
            		onClick={()=>{
            			if(selectedRowKeys){
		        			var ids = "";
		        			selectedRowKeys.toJS().map((id)=>{
		        				ids += "," + id;
		        			});
		        			ids = ids.length > 0 ? ids.substring(1) : ids;

		        			fn = Operate.fnJoinPara(fn,'Rank');
		        			fn = Operate.fnJoinPara(fn,ids);
		        		}
		        		eval("Operate." + fn);	
            		}}>
            		{m.get('menuName')}
            	</Button>
            );
        });
        return btnArr;
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
			group.push(<WeaSearchGroup needTigger={true} title={c.title} showGroup={c.defaultshow} items={items}/>)
		});
		return <Form horizontal>{group}</Form>
	}
	getTabButtonsAd(){
		const { actions } = this.props;
        return [
            (<Button type="primary" onClick={()=>{actions.doSearch('Rank');actions.setShowSearchAd(false)}}>搜索</Button>),
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

Rank = WeaTools.tryCatch( React, MyErrorHandler, { error: "" })(Rank);

//form 表单与 redux 双向绑定
Rank = createForm({
	onFieldsChange(props, fields) {
		// console.log('onFieldsChange',fields)
		props.actions.saveFields({ ...props.fields.toJS(), ...fields });
	},
	mapPropsToFields(props) {
		return props.fields.toJS();
	}
})(Rank);


// 把 state map 到组件的 props 上
const mapStateToProps = state => {
	const { documentRank, comsWeaTable } = state;
	return {
		comsWeaTable: comsWeaTable,
		title:documentRank.get('title'),
		loading:documentRank.get('loading'),
		dataKey:documentRank.get('dataKey'),
		showSearchAd:documentRank.get('showSearchAd'),
		conditioninfo:documentRank.get('conditioninfo'),
		fields:documentRank.get('fields'),
		topTab:documentRank.get('topTab'),
		topTabKey:documentRank.get('topTabKey'),
		rightMenu:documentRank.get('rightMenu'),
		showLog:documentRank.get('showLog'),
		docid:documentRank.get('docid')
	}
}

// 把 dispatch map 到组件的 props 上
const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators({...RankAction,...ComsAction,...WeaTableAction}, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Rank);
