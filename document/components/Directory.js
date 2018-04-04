import PropTypes from 'react-router/lib/PropTypes'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button,Form,Row,Col,Menu,Dropdown,Icon} from 'antd'
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
	WeaOrgTree,
	WeaDropMenu,
	WeaErrorPage, 
	WeaDialog,
	WeaTools
} from 'ecCom'

import * as DirectoryAction from '../actions/directory';
import * as ComsAction from '../actions/coms';
import * as Operate from '../util/Operate';
import DocLogTable from './DocLog';

let quickSearchPara = '';
class Directory extends React.Component {
	static contextTypes = {
		router: PropTypes.routerShape
	}
	static defaultProps={
		dataUrl : '/api/hrm/base/getHrmSearchTree?',//异步树的异步url
		companyDropMenu : [{
	    	companyid: "1",
	        name: "文档目录",
	        isvirtual: "0"},{
	        companyid: "2",
	        name: "组织结构",
	        isvirtual: "0"}
	    ],//左侧默认下拉菜单
	}
	constructor(props) {
		super(props);
		this.closeDialog = this.closeDialog.bind(this);
		this.state={
			companysDefault:{
		    	companyid: "1",
		        name: "文档目录",
		    },
		    showThumbnails:false,
		    checkedThumbnailes:[],
		}
	}
	componentDidMount() {
		//一些初始化请求
		const { actions } = this.props;
		actions.doSearch('Directory');
		actions.getTreeDatas('Directory');//同步树
		actions.initTree({isLoadSubDepartment : 1});//fetch firstclassTree异步树
		actions.getRightMenu('Directory');
		actions.getConditionInfo('Directory');
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
			!is(this.props.rightMenu,nextProps.rightMenu)||
			!is(this.props.firstClassTree,nextProps.firstClassTree)||
            !is(this.props.defaultExpandedKeys,nextProps.defaultExpandedKeys)||
            this.state.companysDefault!==nextState.companysDefault||
            this.state.showThumbnails !== nextState.showThumbnails||
            !is(this.props.showLog,nextProps.showLog) ||
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
						<WeaLeftRightLayout defaultShowLeft={true} leftCom={this.getLeft()} leftWidth={25}>
							<WeaTab
								buttonsAd={this.getTabButtonsAd()}
								searchType={['base','advanced']}
								searchsBaseValue={fields.toJS()[quickSearchPara]&&fields.toJS()[quickSearchPara].value}
								searchsAd={this.getSearchs()}
								showSearchAd={showSearchAd}
								setShowSearchAd={bool=>actions.setShowSearchAd(bool)}
								hideSearchAd={()=>actions.setShowSearchAd(false)}
								onSearch={v=>actions.doSearch('Directory')}
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
								showThumbnails={this.state.showThumbnails}
								onOperatesClick={this.onOperatesClick.bind(this)}
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
		actions.showDocLog('Directory',{show : false});
	}
	onOperatesClick=(record,index,operate,flag,argumentString)=>{
		let _href = operate && operate.href ? operate.href : "";
		let fn = _href.replace("javascript:","");
		if(fn != ""){
			fn = Operate.fnJoinPara(fn,'Directory');
			fn = Operate.fnJoinPara(fn,record.id);
		}
		eval("Operate." + fn);

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
	onRightMenuClick=(key)=>{
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
        				actions.doSearch('Directory');
        			}else if(m.get('type') == "BTN_MINIATURE_DISPLAY"){ // 缩略图
						that.setState({showThumbnails:!this.state.showThumbnails})
        			}else if(m.get('type') == "BTN_COLUMN"){ //定制列

        			}else if(m.get('type') == "BTN_STORE"){ //搜藏

        			}else if(m.get('type') == "BTN_HELP"){ //帮助

        			}
        		}else{
        			fn = Operate.fnJoinPara(fn,'Directory');
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
	thumbnailsOnChange = (ids=[])=>{
		// console.log('thumbnailsOnChange',ids)
		this.setState({checkedThumbnailes:ids})
	}
	getButtons(){
		const { dataKey, actions, comsWeaTable,rightMenu,loading} = this.props;
		const {showThumbnails,checkedThumbnailes} = this.state;
		const tablekey = dataKey ? dataKey.split('_')[0] : 'init';
		const tableNow = comsWeaTable.get(tablekey);
    	const selectedRowKeys = tableNow.get('selectedRowKeys');
    	const isDisabled = showThumbnails ? (checkedThumbnailes.length==0) : !(selectedRowKeys && `${selectedRowKeys.toJS()}`);
        let btnArr = [];
        rightMenu && !is(rightMenu,Immutable.fromJS({})) && rightMenu.get('rightMenus').map(m=>{
            let fn = m.get('menuFun').indexOf('this') >= 0 ? `${m.get('menuFun').split('this')[0]})` : m.get('menuFun');
            m.get('isTop') == '1' && btnArr.length < 4 && btnArr.push(
            	<Button type="primary" 
            		disabled={m.get('isControl') == '1' && isDisabled}
            		onClick={()=>{
            			if(selectedRowKeys){
		        			var ids = "";
		        			selectedRowKeys.toJS().map((id)=>{
		        				ids += "," + id;
		        			});
		        			ids = ids.length > 0 ? ids.substring(1) : ids;
							fn = Operate.fnJoinPara(fn,'Directory');
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
	getLeft(){
		const {actions,defaultExpandedKeys,firstClassTree,loading,companyDropMenu} = this.props;
		const { treeDatas,treeTypes,treeCounts,selectedTreeKeys,fields,} = this.props;
		const {companysDefault}=this.state;

		console.info(companysDefault.companyid)

		// console.log('getTree----','firstClassTree',firstClassTree.toJS(),'defaultExpandedKeys',defaultExpandedKeys);
	    return (
	    	<div className='wea-new-tree wea-org-tree'>
                {companysDefault.companyid=='2' &&
	        		<WeaOrgTree
		                topPrefix={'directory'}
		                inputLeftDom = {'<b>全部类型</b>'}
		                dataUrl={this.props.dataUrl}
		                needDropMenu
		                needSearch
		                isLoadSubDepartment
			        	companyDropMenu={companyDropMenu}
			        	companysDefault={{name : companysDefault.name}}
			            onSelect={this.menuSelect}
			        	defaultExpandedKeys={defaultExpandedKeys}
			            firstClassTree={firstClassTree&&firstClassTree.toJS()}
			            treeNodeClick={this.treeNodeClick} 
			            onSearchChange={v => actions.treeSearch({keyword:v})}
			            onFliterAll={()=>{
			            	actions.setShowSearchAd(false);
			            	actions.saveFields();
			                actions.doSearch('Directory');
			            }}
			        />
			    }
			    {companysDefault.companyid=='1' &&
				    <div>
				    	<WeaDropMenu defaultMenu={companysDefault.name} dropMenu={companyDropMenu} onSelect={this.menuSelect}/>
				       	<WeaLeftTree
							datas={treeDatas.toJS()}
							counts={treeCounts.toJS()}
							countsType={treeTypes.toJS()}
							selectedKeys={selectedTreeKeys.toJS()}
							onFliterAll={()=>{
								actions.setShowSearchAd(false);
								actions.setSelectedTreeKeys([]);
								actions.saveFields();
								actions.doSearch('Directory');
							}}
							onSelect={(treeKey,topTabCount,treeNode)=>{
								// console.log('key',key,'topTabCount',topTabCount,'treeNode',treeNode)

								actions.setShowSearchAd(false);
								actions.setSelectedTreeKeys([treeKey]);
								let searchObj = new Object();

			                	if(treeNode.node){
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
								actions.doSearch('Directory');
							}} 
						/>
					</div>
				}
	    	</div>
	    )
	}
	menuSelect=(e)=>{
        // console.log("onSelect",e);
        const {companysDefault} = this.state;
        this.props.companyDropMenu.forEach((item)=>{
            if(e.key == item.companyid){
                this.setState({
                    companysDefault:{companyid:e.key,name:item.name},
                    // value:'',//清空树搜索条件
                });
            }
        })
    }
    treeNodeClick = (nodeObj) => {
    	console.log('onSelect-t',nodeObj);
		const type = nodeObj.node.props.type || '0';
        const id = nodeObj.node.props.id || '';
		const name = nodeObj.node.props.name || '';
    	const {actions,fields}=this.props;
    	actions.setShowSearchAd(false);
		let paras = {};
		if(type=='1'){
			paras['subcompanyid1']={name:'subcompanyid1',value:id,valueSpan:name}
		}
		if(type=='2'){
			paras['departmentid']={name:'departmentid',value:id,valueSpan:name}
		}
    	actions.saveFields(paras);
    	actions.doSearch('Directory');
    }
	getTabButtonsAd(){
		const { actions } = this.props;
		return [
			(<Button type="primary" onClick={()=>{actions.doSearch('Directory');actions.setShowSearchAd(false)}}>搜索</Button>),
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

Directory = WeaTools.tryCatch( React, MyErrorHandler, { error: "" })(Directory);

//form 表单与 redux 双向绑定
Directory = createForm({
	onFieldsChange(props, fields) {
		// console.log('onFieldsChange',fields)
		props.actions.saveFields({ ...props.fields.toJS(), ...fields });
	},
	mapPropsToFields(props) {
		return props.fields.toJS();
	}
})(Directory);


// 把 state map 到组件的 props 上
const mapStateToProps = state => {
	const { documentDirectory, comsWeaTable } = state;
	return {
		comsWeaTable: comsWeaTable, 
		title:documentDirectory.get('title'), 
		loading:documentDirectory.get('loading'), 
		treeDatas:documentDirectory.get('treeDatas'), 
		treeTypes:documentDirectory.get('treeTypes'), 
		treeCounts:documentDirectory.get('treeCounts'), 
		selectedTreeKeys:documentDirectory.get('selectedTreeKeys'), 
		dataKey:documentDirectory.get('dataKey'),
		showSearchAd:documentDirectory.get('showSearchAd'),
		conditioninfo:documentDirectory.get('conditioninfo'),
		fields:documentDirectory.get('fields'),
		rightMenu:documentDirectory.get('rightMenu'),
		firstClassTree:documentDirectory.get('firstClassTree'),
        defaultExpandedKeys:documentDirectory.get('defaultExpandedKeys'),
        showLog:documentDirectory.get('showLog'),
		docid:documentDirectory.get('docid')
	}
}

// 把 dispatch map 到组件的 props 上
const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators({...DirectoryAction,...ComsAction,...WeaTableAction}, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Directory);

/*
         //       <DirectoryLeft
			        // 	type={4}
		         //        topPrefix={'directory'}
		         //        dataUrl={this.props.dataUrl}
			        // 	defaultExpandedKeys={defaultExpandedKeys}
			        // 	defaultComponey={companyDropMenu[0].name}
			        //     firstClassTree={firstClassTree&&firstClassTree.toJS()}
			        //     loading={loading}
			        //     onFliterAll={()=>{
			        //     	actions.setShowSearchAd(false);
			        //     	actions.saveFields();
			        //         actions.doSearch('Directory');
			        //     }}
			        //     treeNodeClick={this.treeNodeClick} 
			        //     onSearchChange={v => actions.treeSearch({keyword:v})}
			        // />

*/