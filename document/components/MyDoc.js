import PropTypes from 'react-router/lib/PropTypes'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Button, Form,Modal } from 'antd'
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
import DocLogTable from './DocLog'

import * as MyDocAction from '../actions/myDoc'
import * as ComsAction from '../actions/coms'

import * as Operate from '../util/Operate'

let quickSearchPara = '';
class MyDoc extends React.Component {
	static contextTypes = {
		router: PropTypes.routerShape
	}
	constructor(props) {
		super(props);
		this.state={
			showThumbnails:false,
			checkedThumbnailes:[],
		}
		this.onRightMenuClick = this.onRightMenuClick.bind(this)
		this.closeDialog = this.closeDialog.bind(this);
	}
	componentDidMount() {
		//一些初始化请求
		const { actions } = this.props;
		actions.getConditionInfo('MyDoc');
		actions.doSearch('MyDoc');
		actions.getTreeDatas('MyDoc');
		actions.getRightMenu('MyDoc');
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
			!is(this.props.showLog,nextProps.showLog) ||
			!is(this.props.rightMenu,nextProps.rightMenu)||
			this.state.showThumbnails !== nextState.showThumbnails ||
			!is(this.state.checkedThumbnailes ,nextState.checkedThumbnailes)

	}
	componentWillUnmount() {
		//组件卸载时一般清理一些状态
		const { actions } = this.props;
		actions.saveFields();
	}
	render() {
		// console.log('render-----------');
		const { dataKey, loading, title, actions, comsWeaTable, showSearchAd,fields} = this.props;
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
								onSearch={v=>actions.doSearch('MyDoc')}
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
								showThumbnails={this.state.showThumbnails}
								thumbnailsOnChange={this.thumbnailsOnChange.bind(this)}
							/>
						</WeaLeftRightLayout>
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
		actions.showDocLog('MyDoc',{show : false});
	}
	onOperatesClick=(record,index,operate,flag,argumentString)=>{
		let _href = operate && operate.href ? operate.href : "";
		let fn = _href.replace("javascript:","");
		if(fn != ""){
			fn = Operate.fnJoinPara(fn,'MyDoc');
			fn = Operate.fnJoinPara(fn,record.id);
		}
		eval("Operate." + fn);

	}
	thumbnailsOnChange = (ids=[])=>{
		// console.log('thumbnailsOnChange',ids)
		this.setState({checkedThumbnailes:ids})
	}
	getRightMenu(){
       const { dataKey, actions, comsWeaTable,rightMenu,loading} = this.props;
       const {showThumbnails,checkedThumbnailes} = this.state;
		const tablekey = dataKey ? dataKey.split('_')[0] : 'init';
		const tableNow = comsWeaTable.get(tablekey);
    	const selectedRowKeys = tableNow.get('selectedRowKeys');
    	let _disabled = showThumbnails ? (checkedThumbnailes.length==0) : !(selectedRowKeys && `${selectedRowKeys.toJS()}`);
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
   		const { dataKey, actions, comsWeaTable,rightMenu,loading} = this.props;
		const tablekey = dataKey ? dataKey.split('_')[0] : 'init';
		const tableNow = comsWeaTable.get(tablekey);
    	const selectedRowKeys = tableNow.get('selectedRowKeys');
		let that = this;
        rightMenu && !is(rightMenu,Immutable.fromJS({})) && rightMenu.get('rightMenus').map((m,i)=>{
        	if(Number(key) == i){
        		let fn = m.get('menuFun').indexOf('this') >= 0 ? `${m.get('menuFun').split('this')[0]})` : m.get('menuFun');
        		if(fn == ""){
        			if(m.get('type') == "BTN_SEARCH"){ //搜索
        				actions.doSearch('MyDoc');
        				actions.setShowSearchAd(false);
        			}else if(m.get('type') == "BTN_MINIATURE_DISPLAY"){ // 缩略图
						that.setState({showThumbnails:!this.state.showThumbnails})
        			}else if(m.get('type') == "BTN_COLUMN"){ //定制列

        			}else if(m.get('type') == "BTN_STORE"){ //搜藏

        			}else if(m.get('type') == "BTN_HELP"){ //帮助

        			}
        		}else{
        			fn = Operate.fnJoinPara(fn,'MyDoc');
	        		if(selectedRowKeys && !that.state.showThumbnails){
	        			var ids = "";
	        			selectedRowKeys.toJS().map((id)=>{
	        				ids += "," + id;
	        			});
	        			ids = ids.length > 0 ? ids.substring(1) : ids;

	        			fn = Operate.fnJoinPara(fn,ids);
	        		}else if(that.state.showThumbnails){
	        			var ids = "";
	        			for(let i = 0 ;i < that.state.checkedThumbnailes.length;i++){
							ids += "," + that.state.checkedThumbnailes[i];
	        			}
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
		const {showThumbnails,checkedThumbnailes} = this.state;
		const tablekey = dataKey ? dataKey.split('_')[0] : 'init';
		const tableNow = comsWeaTable.get(tablekey);
    	const selectedRowKeys = tableNow.get('selectedRowKeys');
        let btnArr = [];
        const isDisabled = this.state.showThumbnails ? (checkedThumbnailes.length==0) : !(selectedRowKeys && `${selectedRowKeys.toJS()}`);
        rightMenu && !is(rightMenu,Immutable.fromJS({})) && rightMenu.get('rightMenus').map(m=>{
            let fn = m.get('menuFun').indexOf('this') >= 0 ? `${m.get('menuFun').split('this')[0]})` : m.get('menuFun');
            m.get('isTop') == '1' && btnArr.length < 4 && btnArr.push(
            	<Button type="primary" 
            		disabled={isDisabled}
            		onClick={()=>{
            			if(selectedRowKeys){
		        			var ids = "";
		        			selectedRowKeys.toJS().map((id)=>{
		        				ids += "," + id;
		        			});
		        			ids = ids.length > 0 ? ids.substring(1) : ids;

		        			fn = Operate.fnJoinPara(fn,'MyDoc');
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
					actions.doSearch('MyDoc');
				}}
				onSelect={(key,topTabCount,treeNode)=>{
					// console.log('key',key,'topTabCount',topTabCount,'treeNode',treeNode)
					const {hasRight,id,name} = treeNode.node.props;
					// console.log('onSelect----treeNode.node.props',treeNode.node.props);
					actions.setShowSearchAd(false);
					actions.setSelectedTreeKeys([key]);
					console.info(name)
					const searchObj = {
						seccategory:{name:'seccategory',value:String(id),valueSpan:name},
					}
					actions.saveFields(searchObj);
					actions.doSearch('MyDoc');
				}} 
			/>
		)
	}
	getTabButtonsAd(){
		const { actions } = this.props;
		return [
			(<Button type="primary" onClick={()=>{actions.doSearch('MyDoc');actions.setShowSearchAd(false)}}>搜索</Button>),
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

MyDoc = WeaTools.tryCatch( React, MyErrorHandler, { error: "" })(MyDoc);

//form 表单与 redux 双向绑定
MyDoc = createForm({
	onFieldsChange(props, fields) {
		// console.log('onFieldsChange',fields)
		props.actions.saveFields({ ...props.fields.toJS(), ...fields });
	},
	mapPropsToFields(props) {
		return props.fields.toJS();
	}
})(MyDoc);


// 把 state map 到组件的 props 上
const mapStateToProps = state => {
	const { documentMyDoc, comsWeaTable } = state;
	return {
		comsWeaTable: comsWeaTable, 
		title:documentMyDoc.get('title'), 
		loading:documentMyDoc.get('loading'), 
		treeDatas:documentMyDoc.get('treeDatas'), 
		treeTypes:documentMyDoc.get('treeTypes'), 
		treeCounts:documentMyDoc.get('treeCounts'), 
		selectedTreeKeys:documentMyDoc.get('selectedTreeKeys'), 
		dataKey:documentMyDoc.get('dataKey'),
		showSearchAd:documentMyDoc.get('showSearchAd'),
		conditioninfo:documentMyDoc.get('conditioninfo'),
		fields:documentMyDoc.get('fields'),
		rightMenu:documentMyDoc.get('rightMenu'),
		showLog:documentMyDoc.get('showLog'),
		docid:documentMyDoc.get('docid')
	}
}

// 把 dispatch map 到组件的 props 上
const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators({...MyDocAction,...ComsAction,...WeaTableAction}, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MyDoc);