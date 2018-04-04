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
	WeaTools
} from 'ecCom'

import * as DummyAction from '../actions/dummy'
import * as ComsAction from '../actions/coms'
import * as Operate from '../util/Operate';

;
//import { } from 'comsRedux'
let quickSearchPara = '';
class Dummy extends React.Component {
	static contextTypes = {
		router: PropTypes.routerShape
	}
	constructor(props) {
		super(props);
		this.onRightMenuClick = this.onRightMenuClick.bind(this);
	}
	componentDidMount() {
		//一些初始化请求
		const { actions } = this.props;
		actions.getConditionInfo('Dummy');
		actions.doSearch('Dummy');
		actions.getTreeDatas('Dummy');
		actions.getRightMenu('Dummy');
	}
	componentWillReceiveProps(nextProps) {
		const { actions } = this.props;
		const keyOld = this.props.location.key;
		const keyNew = nextProps.location.key;
		//点击菜单路由刷新组件
		if(keyOld !== keyNew) {
			
		}
		//设置页标题
		
	}
	shouldComponentUpdate(nextProps,nextState) {
		return !is(this.props.loading,nextProps.loading)||
			!is(this.props.title,nextProps.title)||
			!is(this.props.comsWeaTable,nextProps.comsWeaTable)||
			!is(this.props.treeDatas,nextProps.treeDatas)||
			!is(this.props.treeCounts,nextProps.treeCounts)||
			!is(this.props.selectedTreeKeys,nextProps.selectedTreeKeys)||
			!is(this.props.dataKey,nextProps.dataKey)||
			!is(this.props.showSearchAd,nextProps.showSearchAd)||
			!is(this.props.conditioninfo,nextProps.conditioninfo)||
			!is(this.props.fields,nextProps.fields)||
			!is(this.props.searchParams,nextProps.searchParams)||
			!is(this.props.rightMenu,nextProps.rightMenu)

	}
	componentWillUnmount() {
		//组件卸载时一般清理一些状态
		const { actions } = this.props;
		actions.saveFields();
	}
	render() {
		// console.log('render-----------');
		const { dataKey, loading, title, actions, comsWeaTable, showSearchAd,fields } = this.props;
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
						<WeaLeftRightLayout defaultShowLeft={true} leftCom={this.getTree()} leftWidth={25}>
							<WeaTab
								buttonsAd={this.getTabButtonsAd()}
								searchType={['base','advanced']}
	                    		searchsBaseValue={fields.toJS()[quickSearchPara]&&fields.toJS()[quickSearchPara].value}
								searchsAd={this.getSearchs()}
								showSearchAd={showSearchAd}
								setShowSearchAd={bool=>actions.setShowSearchAd(bool)}
								hideSearchAd={()=>actions.setShowSearchAd(false)}
								datas={[]}
								selectedKey={''}
								onSearch={v=>actions.doSearch('Dummy')}
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
						</WeaLeftRightLayout>
					</WeaTop>
				</WeaRightMenu>
			</div>
		)
	}
	onOperatesClick=(record,index,operate,flag,argumentString)=>{
		const { fields} = this.props;

		let _fields = fields.toJS();
    	let dummyId = 1;
    	if(_fields && _fields.seccategory){
    		dummyId = _fields.seccategory.value;
    	}
		
		let _href = operate && operate.href ? operate.href : "";
		let fn = _href.replace("javascript:","");
		if(fn != ""){
			fn = Operate.fnJoinPara(fn,'Dummy');
			fn = Operate.fnJoinPara(fn,dummyId);
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
        return btnArr
	}
	onRightMenuClick(key){
   		const { dataKey, actions, comsWeaTable,rightMenu,loading,fields} = this.props;
		const tablekey = dataKey ? dataKey.split('_')[0] : 'init';
		const tableNow = comsWeaTable.get(tablekey);
    	const selectedRowKeys = tableNow.get('selectedRowKeys');
    	let _fields = fields.toJS();
    	let dummyId = 1;
    	if(_fields && _fields.seccategory){
    		dummyId = _fields.seccategory.value;
    	}


        rightMenu && !is(rightMenu,Immutable.fromJS({})) && rightMenu.get('rightMenus').map((m,i)=>{
        	if(Number(key) == i){
        		let fn = m.get('menuFun').indexOf('this') >= 0 ? `${m.get('menuFun').split('this')[0]})` : m.get('menuFun');
        		if(fn == ""){
        			if(m.get('type') == "BTN_SEARCH"){ //搜索
        				actions.doSearch('Dummy');
        				actions.setShowSearchAd(false);
        			}else if(m.get('type') == "BTN_MINIATURE_DISPLAY"){ // 缩略图

        			}else if(m.get('type') == "BTN_COLUMN"){ //定制列

        			}else if(m.get('type') == "BTN_STORE"){ //搜藏

        			}else if(m.get('type') == "BTN_HELP"){ //帮助

        			}
        		}else{
        			fn = Operate.fnJoinPara(fn,'Dummy');
        			fn = Operate.fnJoinPara(fn,dummyId);
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
		const { dataKey, actions, comsWeaTable,rightMenu,loading,fields} = this.props;
		const tablekey = dataKey ? dataKey.split('_')[0] : 'init';
		const tableNow = comsWeaTable.get(tablekey);
    	const selectedRowKeys = tableNow.get('selectedRowKeys');

    	let _fields = fields.toJS();
    	let dummyId = 1;
    	if(_fields && _fields.seccategory){
    		dummyId = _fields.seccategory.value;
    	}

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

		        			fn = Operate.fnJoinPara(fn,'Dummy');
		        			fn = Operate.fnJoinPara(fn,dummyId);
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
	getTree(){
		const { treeDatas,treeTypes,treeCounts,selectedTreeKeys,actions,fields} = this.props;
		return (
			<WeaLeftTree
				datas={treeDatas.toJS()}
				counts={treeCounts.toJS()}
				countsType={treeTypes.toJS()}
				selectedKeys={selectedTreeKeys.toJS()}
				onFliterAll={()=>{
					actions.setShowSearchAd(false);
					actions.setSelectedTreeKeys([]);
					actions.saveFields();
					actions.doSearch('Dummy');
				}}
				onSelect={(key,topTabCount,treeNode)=>{
					// console.log('key',key,'topTabCount',topTabCount,'treeNode',treeNode)
					const {hasRight,id,name} = treeNode.node.props;
					// console.log('onSelect----treeNode.node.props',treeNode.node.props);
					if(hasRight){
						actions.setShowSearchAd(false);
						actions.setSelectedTreeKeys([key]);
						const searchObj = {
							seccategory:{name:'dummyId',value:String(id),valueSpan:name},
						}
						actions.saveFields(searchObj);
						actions.doSearch('Dummy');
					}
				}} 
			/>
		)
	}
	getTabButtonsAd(){
		const { actions } = this.props;
		return [
			(<Button type="primary" onClick={()=>{actions.doSearch('Dummy');actions.setShowSearchAd(false)}}>搜索</Button>),
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

Dummy = WeaTools.tryCatch( React, MyErrorHandler, { error: "" })(Dummy);

//form 表单与 redux 双向绑定
Dummy = createForm({
	onFieldsChange(props, fields) {
		// console.log('onFieldsChange',fields)
		props.actions.saveFields({ ...props.fields.toJS(), ...fields });
	},
	mapPropsToFields(props) {
		return props.fields.toJS();
	}
})(Dummy);


// 把 state map 到组件的 props 上
const mapStateToProps = state => {
	const { documentDummy, comsWeaTable } = state;
	return {
		comsWeaTable: comsWeaTable, 
		title:documentDummy.get('title'), 
		loading:documentDummy.get('loading'), 
		treeDatas:documentDummy.get('treeDatas'), 
		treeTypes:documentDummy.get('treeTypes'), 
		treeCounts:documentDummy.get('treeCounts'), 
		selectedTreeKeys:documentDummy.get('selectedTreeKeys'), 
		dataKey:documentDummy.get('dataKey'),
		showSearchAd:documentDummy.get('showSearchAd'),
		conditioninfo:documentDummy.get('conditioninfo'),
		fields:documentDummy.get('fields'),
		rightMenu:documentDummy.get('rightMenu'),
	}
}

// 把 dispatch map 到组件的 props 上
const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators({...DummyAction,...ComsAction,...WeaTableAction}, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dummy);