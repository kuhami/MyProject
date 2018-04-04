import PropTypes from 'react-router/lib/PropTypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Form } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
import Immutable from 'immutable';
const is = Immutable.is;
import { WeaTable } from 'comsRedux';
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
	WeaBrowser,
	WeaTools
} from 'ecCom';
import * as SearchAction from '../../actions/search';
import * as ComsAction from '../../actions/coms';
import * as Operate from '../../util/Operate';
import DocLogTable from '../DocLog';

let quickSearchPara = '';

let selectDummyId = "";

class SearchResult extends React.Component {
	static contextTypes = {
		router: PropTypes.routerShape
	}
	constructor(props) {
		super(props);
		this.closeDialog = this.closeDialog.bind(this);
		this.closeImport = this.closeImport.bind(this);
		this.doImport = this.doImport.bind(this);
	}
	componentDidMount() {
		//一些初始化请求
		const { actions,location} = this.props;
		actions.getTreeDatas('Search');
		actions.getRightMenu('Search');
		actions.getConditionInfo('Search');
		actions.doSearch('Search');
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
			!is(this.props.searchParamsAd,nextProps.searchParamsAd)||
			!is(this.props.dataKey,nextProps.dataKey)||
			!is(this.props.showSearchAd,nextProps.showSearchAd)||
			!is(this.props.conditioninfo,nextProps.conditioninfo)||
			!is(this.props.fields,nextProps.fields)||
			!is(this.props.searchParams,nextProps.searchParams)||
			!is(this.props.showLog,nextProps.showLog) ||
			!is(this.props.dummyImport,nextProps.dummyImport) ||
			!is(this.props.rightMenu,nextProps.rightMenu)

	}
	componentWillUnmount() {
		const { actions } = this.props;
		actions.setShowTable(false);
		actions.setShowSearchAd(false);
		actions.saveFields();
	}
	render() {
		// console.log('render-----------',this.props.location);
		const { dataKey, loading, title, actions, comsWeaTable, showSearchAd,fields } = this.props;
		const tablekey = dataKey ? dataKey.split('_')[0] : 'init';
		const tableNow = comsWeaTable.get(tablekey);
		const loadingTable = tableNow.get('loading');
		let that = this;
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
								onSearch={v=>actions.doSearch('Search')}
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

				<WeaDialog title={"文档日志"} visible={this.props.showLog} style={{width: 900, height: 600}} onCancel={this.closeDialog}>	
					{
						this.props.showLog && this.props.docid && 
						<DocLogTable docid={this.props.docid}></DocLogTable>	
					}
				</WeaDialog>

				<WeaDialog title={"导入到虚拟目录"} 
					buttons = {[
						        (<Button type="primary" onClick={this.doImport}>导入</Button>),
						        (<Button type="ghost" onClick={this.closeImport}>取消</Button>)
							]}
					visible={this.props.dummyImport} 
					style={{width: 600, height: 200}} 
					onCancel={this.closeImport}>	
					{
						this.props.dummyImport && this.props.importType && this.props.importParam &&
						<div>
							<WeaBrowser 
								type={"docdummy"}
								isSingle={false}
								fieldName={"dummyId"}
								viewAttr={2}
								title={"虚拟目录"}
								isMultCheckbox={true}
								onChange={this.selectDummy}
							/>
						</div>
					}
				</WeaDialog>
			</div>
		)
	}
	closeDialog(){
		const { actions} = this.props;
		actions.showDocLog('Search',{show : false});
	}
	closeImport(){
		const {actions} = this.props;
		actions.showDummyImport('Search',{dummyImport : false});
	}
	selectDummy(ids,names,datas){
		selectDummyId = ids;
	}
	doImport(){
		const {actions,importType,importParam} = this.props;
		let dummyIds = selectDummyId;
		Operate.doImport('Search',dummyIds,importType,importParam);
	}
	onOperatesClick=(record,index,operate,flag,argumentString)=>{
		let _href = operate && operate.href ? operate.href : "";
		let fn = _href.replace("javascript:","");
		if(fn != ""){
			fn = Operate.fnJoinPara(fn,'Search');
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
	onRightMenuClick = (key)=>{
   		const { dataKey, actions, comsWeaTable,rightMenu,loading} = this.props;
		const tablekey = dataKey ? dataKey.split('_')[0] : 'init';
		const tableNow = comsWeaTable.get(tablekey);
    	const selectedRowKeys = tableNow.get('selectedRowKeys');
        rightMenu && !is(rightMenu,Immutable.fromJS({})) && rightMenu.get('rightMenus').map((m,i)=>{
        	if(Number(key) == i){
        		let fn = m.get('menuFun').indexOf('this') >= 0 ? `${m.get('menuFun').split('this')[0]})` : m.get('menuFun');
        		if(fn == ""){
        			if(m.get('type') == "BTN_SEARCH"){ //搜索
        				actions.doSearch('Search');
        			}else if(m.get('type') == "BTN_MINIATURE_DISPLAY"){ // 缩略图

        			}else if(m.get('type') == "BTN_COLUMN"){ //定制列

        			}else if(m.get('type') == "BTN_STORE"){ //搜藏

        			}else if(m.get('type') == "BTN_HELP"){ //帮助

        			}
        		}else{
        			fn = Operate.fnJoinPara(fn,'Search');
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
            			fn = Operate.fnJoinPara(fn,'Search');
            			if(selectedRowKeys){
		        			var ids = "";
		        			selectedRowKeys.toJS().map((id)=>{
		        				ids += "," + id;
		        			});
		        			ids = ids.length > 0 ? ids.substring(1) : ids;

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
		const { treeDatas,treeTypes,treeCounts,selectedTreeKeys,actions,searchParamsAd,fields} = this.props;
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
					actions.doSearch('Search');
				}}
				onSelect={(treeKey,topTabCount,treeNode)=>{
                	// console.log('treeKey',treeKey,'topTabCount',topTabCount,'treeNode',treeNode);
                	actions.setShowSearchAd(false);
					actions.setSelectedTreeKeys([treeKey]);
					let searchObj = new Object();
                	if(treeNode.node){
                		const {hasRight,id,name} =  treeNode.node.props;
						// console.log('onSelect----treeNode.node.props',treeNode.node.props);
						//if(hasRight){
							searchObj = {
								seccategory:{name:'seccategory',value:id,valueSpan:name},
							}
						//}
                	}
					if(treeNode.name){
						const id = treeKey.indexOf("sec_")===0 ? treeKey.substring(4) : '';
						let showName = '';
						treeDatas && treeDatas.forEach(t=>{
							if(t.get('domid') == treeKey) {
								showName= t.get('name');
							}
							t.get('childs') && t.get('childs').forEach(c=>{
								if(c.get('domid') == treeKey) showName = c.get('name');
							})
						})
						if(treeNode.name=='allNum'){
							searchObj = {
								seccategory:{name:'seccategory',value:id,valueSpan:showName},
							}
						}
						if(treeNode.name=='newNum'){
							searchObj = {
								seccategory:{name:'seccategory',value:id,valueSpan:showName},
								seccategoryIsNew:{name:'isNew',value:'yes'},
							}
						}
					}
					actions.saveFields(searchObj);
					actions.doSearch('Search');
                }}
			/>
		)
	}
	getTabButtonsAd(){
		const { actions } = this.props;
		return [
			(<Button type="primary" onClick={()=>{actions.setShowSearchAd(false);actions.doSearch('Search');}}>搜索</Button>),
			(<Button type="ghost" onClick={()=>actions.saveFields()}>重置</Button>),
			(<Button type="ghost" onClick={()=>actions.setShowSearchAd(false)}>取消</Button>)
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

SearchResult = WeaTools.tryCatch( React, MyErrorHandler, { error: "" })(SearchResult);

//form 表单与 redux 双向绑定
SearchResult = createForm({
	onFieldsChange(props, fields) {
		// console.log('onFieldsChange',fields)
		props.actions.saveFields({ ...props.fields.toJS(), ...fields });
	},
	mapPropsToFields(props) {
		return props.fields.toJS();
	}
})(SearchResult);


// 把 state map 到组件的 props 上
const mapStateToProps = state => {
	const { documentSearch, comsWeaTable } = state;
	return {
		comsWeaTable: comsWeaTable, 
		title:documentSearch.get('title'), 
		loading:documentSearch.get('loading'), 
		treeDatas:documentSearch.get('treeDatas'), 
		treeTypes:documentSearch.get('treeTypes'), 
		treeCounts:documentSearch.get('treeCounts'), 
		selectedTreeKeys:documentSearch.get('selectedTreeKeys'), 
		searchParamsAd:documentSearch.get('searchParamsAd'), 
		dataKey:documentSearch.get('dataKey'),
		showSearchAd:documentSearch.get('showSearchAd'),
		conditioninfo:documentSearch.get('conditioninfo'),
		fields:documentSearch.get('fields'),
		rightMenu:documentSearch.get('rightMenu'),
		showLog:documentSearch.get('showLog'),
		docid:documentSearch.get('docid'),
		dummyImport:documentSearch.get('dummyImport'),
		importType:documentSearch.get('importType'),
		importParam:documentSearch.get('importParam')
	}
}

// 把 dispatch map 到组件的 props 上
const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators({...SearchAction,...ComsAction,...WeaTableAction}, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);