import PropTypes from 'react-router/lib/PropTypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Button, Form, Modal,message} from 'antd'
const createForm = Form.create;
const FormItem = Form.Item;
import isEmpty from 'lodash/isEmpty'
import Immutable from 'immutable'
const is = Immutable.is;
import * as SearchAction from '../../actions/search'
import { WeaErrorPage, WeaTools,WeaSearchBrowserBox } from 'ecCom'
import {
    WeaTab,
    WeaTop,
    WeaSearchGroup,
    WeaRightMenu,
    WeaPopoverHrm,
    WeaLeftRightLayout,
    WeaOrgTree,
    WeaSelect,
} from 'ecCom'
import {WeaTable} from 'comsRedux'
const WeaTableAction = WeaTable.action;
import * as PublicFunc from '../../utils/pulic-func';
window.openFullWindowForXtable = PublicFunc.openFullWindowForXtable;

let _this;
class SearchResult extends React.Component {
	static contextTypes = {
		router: PropTypes.routerShape
	}
	constructor(props) {
		super(props);
        this.state={
            companysDefault:'',
            showTemplate:false,
        }
        _this = this;
        const funcs = ['onOperatesClick','jumpToHrmCard'];
        funcs.forEach(f=> this[f] = this[f].bind(this))
        // console.log('props.query',props.location);
        const {lastname} = props.location.query;
        this.init(lastname);
	}
    init(v){
        const { actions } = this.props;
        v && actions.saveFormFields({lastname:{name:'lastname',value:v}})
        actions.doSearch();
    }
	componentDidMount() {
		
	}
	componentWillReceiveProps(nextProps) {
		const { actions } = this.props;
		const keyOld = this.props.location.key;
		const keyNew = nextProps.location.key;
        // if(window.location.pathname.indexOf('/') >= 0 && nextProps.title && document.title !== nextProps.title){
        //     document.title = nextProps.title;
        // }
		//点击菜单路由刷新组件
		if(keyOld !== keyNew) {
			console.log('componentWillReceiveProps--keyold!=keyNew');
            const {lastname} = nextProps.location.query;
            this.init(lastname);
		}
	}
	shouldComponentUpdate(nextProps, nextState) {
		return  !is(this.props.title,nextProps.title) ||
			!is(this.props.loading, nextProps.loading) ||
            !is(this.props.condition, nextProps.condition)||
            !is(this.props.fields, nextProps.fields)||
            !is(this.props.dataKey, nextProps.dataKey)||
            this.props.showSearchAd !== nextProps.showSearchAd ||
            !is(this.props.searchParamsAd, nextProps.searchParamsAd)||
            !is(this.props.comsWeaTable,nextProps.comsWeaTable)||
            this.state.showTemplate !== nextState.showTemplate||
            !is(this.props.templateSelect,nextProps.templateSelect)
			
	}
	componentWillUnmount() {
		const {actions} = this.props;
        actions.saveFormFields();
        actions.setShowSearchAd(false);
	}
	render() {
		// console.log('render----------------------------');
		const {actions,dataKey, title,fields,searchParamsAd,showSearchAd,comsWeaTable} = this.props;
        const {showTemplate} = this.state;
		const tablekey = dataKey ? dataKey.split('_')[0] : 'init';
        const tableNow = comsWeaTable.get(tablekey);
        const loadingTable = tableNow.get('loading');
		return (
			<div className='wea-myhrm-search'>
			<WeaRightMenu datas={this.getRightMenu()} onClick={this.onRightMenuClick.bind(this)}>
				<WeaTop
                	title={title}
                	loading={loadingTable}
                	icon={<i className='icon-coms-hrm' />}
                	iconBgcolor='#217346'
                	buttons={this.getButtons()}
                	buttonSpace={10}
                	showDropIcon={true}
                	dropMenuDatas={this.getRightMenu()}
                	onDropMenuClick={this.onRightMenuClick.bind(this)}
                >
                	<div style={{height: '100%'}}>
                    	<WeaLeftRightLayout leftCom={this.getTree()} leftWidth={25} >
	                        <WeaTab
	                            onlyShowRight={true}
	                            buttonsAd={this.getTabButtonsAd()}
	                            searchType={['base','advanced']}
	                            searchsBaseValue={searchParamsAd.get('lastname')}
	                            setShowSearchAd={bool => {actions.setShowSearchAd(bool)}}
                                hideSearchAd={() => actions.setShowSearchAd(false)}
	                            searchsAd={<Form horizontal>{this.getSearchs(true)}</Form>}
	                            showSearchAd={showSearchAd}
	                            onSearch={v => {actions.doSearch()}}
	                        	onSearchChange={v => {
	                        		actions.saveFormFields({
	                        			...fields.toJS(),
	                        			lastname:{name:'lastname',value:v},
	                        		});
	                        	}}
	                        />
	                        <WeaTable sessionkey={dataKey} 
                                hasOrder={true} 
                                needScroll={true}
                                //getColumns={c=>this.reRenderColumns(c)} 
                                onOperatesClick={this.onOperatesClick}
                                />
	                	</WeaLeftRightLayout>
                    </div>) 
				</WeaTop>
			  </WeaRightMenu>
            </div>
		)
	}
    reRenderColumns(columns){
        columns.forEach(c=>{
            if(c.dataIndex=='lastname'){
                c.render = function(text, record){
                    const name = record.lastnamespan;
                    const hrmId = name.split('id=')[1].split('\')')[0];
                    return  <span style={{cursor:'pointer'}} onClick={_this.jumpToHrmCard.bind(null,hrmId)}>{text}</span>
                }
            } 
        })
        return columns;
    }
    jumpToHrmCard(hrmId,...rest){
        this.context.router.push({pathname:'/main/hrm/resource/HrmResourceBase',state:hrmId})
    }
    onOperatesClick=(record,index,operate,flag,argumentString)=>{
        // console.log('record',record,'index',index,'operate',operate,'flag',flag);
        const fn = operate.href ? operate.href.split(':')[1].split('(')[0] : '';
        const id = record.id ? record.id : '';
        PublicFunc[fn](id);
    }
	getTabButtonsAd() {
        const {actions,searchParamsAd} = this.props;
        return [
            (<Button type="primary" onClick={()=>{actions.doSearch();actions.setShowSearchAd(false)}}>搜索</Button>),
            (<Button type="ghost" onClick={()=>{actions.saveFormFields()}}>重置</Button>),
            (<Button type="ghost" onClick={()=>{actions.setShowSearchAd(false)}}>取消</Button>)
        ]
    }
	getButtons() {
        const {actions,location} = this.props;
        const keys = this.getSelectedRowKeys();
        let btns =[];
        btns.push(
          	<Button type="primary" disabled={keys.length==0} onClick={()=>this.sendEmessage()} >发起群聊</Button>
        );
        return btns
    }
    templateSelectOnChange(v){
        // console.log('templateSelectOnChange',v);
        const {actions,fields}=this.props;
        actions.getHrmSearchCondition({mouldid:v})
    }
    getSearchs(bool) {
    	const {condition} = this.props;
    	let searchGroupArr = [];
		condition && condition.toJS().forEach((item,index)=>{
			searchGroupArr.push(
				<WeaSearchGroup 
				 needTigger={true}
				 title={this.getTitle(index)} 
				 showGroup={this.isShowFields(index)}
				 items={this.getFields(bool,index)}
				 />
			)
		})
        return searchGroupArr;
    }
    getTitle(index=0) {
        const {condition} = this.props;
        return !isEmpty(condition.toJS()) && condition.toJS()[index].title
    }
    isShowFields(index=0) {
        const {condition} = this.props;
        return !isEmpty(condition.toJS()) && condition.toJS()[index].defaultshow
    }
    getFields = (bool=false,index=0) => {
        const {condition,actions} = this.props;
        const browserConditions = condition.toJS();
        const fieldsData = !isEmpty(browserConditions) && browserConditions[index].items;
        let items = new Array();
        // console.log('fieldsData',fieldsData);
        fieldsData.forEach( field => {
        	// if(field.isQuickSearch){
        	// 	quickSearchPara = field.domkey[0];
        	// }
            // console.log('field.value',field.value)
            items.push({
                com:(<FormItem
                    label={`${field.label}`}
                    labelCol={{span: `${field.labelcol}`}}
                    wrapperCol={{span: `${field.fieldcol}`}}>
                        {WeaTools.getComponent(field.conditionType, field.browserConditionParam, field.domkey,this.props, field)}
                    </FormItem>),
                colSpan:field.colSpan || 2
            });
        });
       return items;
    }
    getTree() {
	    const {actions,loading} = this.props;
	    return (
            <WeaOrgTree
                loading
                needDropMenu
                needSearch
                isLoadSubDepartment
                topPrefix={'hrmSearch'}
                inputLeftDom = {'<b>全部类型</b>'}
                onSelect={this.menuSelect}
                onFliterAll={()=>{
                    actions.setShowSearchAd(false);
                    actions.saveFormFields();
                    actions.doSearch();
                }}
                treeNodeClick={this.treeNodeClick} 
            />
	    )
    }
    menuSelect=(e)=>{
        // console.log("onSelect",e);
        const {companysDefault} = this.state;
        const {companyDropMenu} = this.props;
        companyDropMenu&&companyDropMenu.toJS().forEach((item)=>{
            if(e.key == item.companyid){
                this.setState({
                    companysDefault:{companyid:e.key,name:item.name},
                });
            }
        })
    }
    treeNodeClick = (nodeObj) => {
		const type = nodeObj.node.props.type || '0';
        const id = nodeObj.node.props.id || '';
		const name = nodeObj.node.props.name || '';
    	const {actions,fields}=this.props;
		let paras = {};
    	actions.setShowSearchAd(false);
		if(type=='1'){
			paras['subcompanyid1']={name:'subcompanyid1',value:id,valueSpan:name}
		}
		if(type=='2'){
			paras['departmentid']={name:'departmentid',value:id,valueSpan:name}
		}
    	actions.saveFormFields(paras);
    	actions.doSearch();
    }
    getRightMenu(){
        const {comsWeaTable} = this.props;
        const keys = this.getSelectedRowKeys();
        const arr = [{
                icon: <i className='icon-coms-HumanResources'/>,
                content:'发起群聊',
                disabled: keys.length==0
            },{
                icon: <i className='icon-coms-ws'/>,
                content:'搜索'
            },{
                icon: <i className='icon-coms-ws'/>,
                content:'重新搜索'
            },{
                icon: <i className='icon-coms-ws'/>,
                content:'导出-Excel'
            },{
                icon: <i className='icon-Right-menu-Custom'/>,
                content:'显示定制列'
            }
        ];
        return arr;
    }
    getSelectedRowKeys(){
        const {comsWeaTable,dataKey} = this.props;
        const tablekey = dataKey ? dataKey.split('_')[0] : 'init';
        const tableNow = comsWeaTable.get(tablekey);
        return tableNow.get('selectedRowKeys').toJS();
    }
    sendEmessage(){
        const keys = this.getSelectedRowKeys();
        const ids = keys ? keys.join(',') : '';
        PublicFunc.sendEmessage(ids);
    }
    exportExcel(){
        window.open('/hrm/search/HrmResourceSearchResultExcel.jsp?export=true')
    }
    onRightMenuClick(key){
        const {actions,dataKey} = this.props;
        switch(key){
            case '0':
                this.sendEmessage();
                break;
            case '1':
                actions.doSearch()
                break;
            case '2':
                actions.saveFormFields();
                this.context.router.goBack();
                break;
            case '3':
                this.exportExcel();
                break;
            case '4':
                actions.setColSetVisible(dataKey,true);
                actions.tableColSet(dataKey,true);
                break;
        } 
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
        props.actions.saveFormFields({...props.fields.toJS(), ...fields});
    },
	mapPropsToFields(props) {
		return props.fields.toJS();
  	}
})(SearchResult);


// 把 state map 到组件的 props 上
const mapStateToProps = state => {
    // console.log('==================================================state',state);
	const {hrmSearch,comsWeaTable} = state;
	return { 
		loading:hrmSearch.get('loading'),
		title:hrmSearch.get('title'),
		condition:hrmSearch.get('condition'),
		fields: hrmSearch.get('fields'),
		dataKey:hrmSearch.get('dataKey'),
		showSearchAd:hrmSearch.get('showSearchAd'),
		searchParamsAd: hrmSearch.get('searchParamsAd'),
		comsWeaTable: comsWeaTable, //绑定整个table
        templateSelect:hrmSearch.get('templateSelect'),
	}
}

// 把 dispatch map 到组件的 props 上
const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators({...SearchAction,...WeaTableAction}, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
