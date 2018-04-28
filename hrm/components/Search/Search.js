import PropTypes from 'react-router/lib/PropTypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Button, Form, Modal,message,Spin} from 'antd'
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
import SaveAsTemplate from './SaveAsTemplate';
import CustomQueryCondition from './CustomQueryCondition';
import '../../css/search.less'

/*快捷搜索参数*/
let quickSearchPara = '';
/*模板下拉 isSelected*/
let selectManually = false;

class Search extends React.Component {
	static contextTypes = {
		router: PropTypes.routerShape
	}
	constructor(props) {
		super(props);
        const funcs = ['goSearch','onRightMenuClick','handleCancel','handleOk','saveAsTemplate','templateSelectOnChange'];
        funcs.forEach(f=> this[f] = this[f].bind(this))
        this.state={
            showTemplate:false,
        }
	}
	componentDidMount() {
		const { actions } = this.props;
		actions.getHrmSearchCondition();//获取搜索条件
        actions.getHrmSearchMoudleList();//模板下拉菜单
	}
	componentWillReceiveProps(nextProps) {
		const { actions } = this.props;
		const keyOld = this.props.location.key;
		const keyNew = nextProps.location.key;
		//点击菜单路由刷新组件
		if(keyOld !== keyNew) {
			// console.log('componentWillReceiveProps--keyold!=keyNew');
			// actions.doSearch();
		}
		// if(window.location.pathname.indexOf('/') >= 0 && nextProps.title && document.title !== nextProps.title)
		// 	document.title = nextProps.title;
	}
	shouldComponentUpdate(nextProps, nextState) {
		return  !is(this.props.title,nextProps.title) ||
            !is(this.props.loading, nextProps.loading) ||
            !is(this.props.condition, nextProps.condition)||
            !is(this.props.fields, nextProps.fields)||
            this.props.showSearchAd !== nextProps.showSearchAd ||
            !is(this.props.searchParamsAd, nextProps.searchParamsAd)||
            !is(this.props.comsWeaTable,nextProps.comsWeaTable)||
            this.state.showTemplate !== nextState.showTemplate||
            !is(this.props.templateSelect,nextProps.templateSelect)||
            this.props.responseId !== nextProps.responseId||
            this.props.templateSelectedKey !== nextProps.templateSelectedKey

	}
	componentWillUnmount() {
		const {actions} = this.props;
        actions.setShowSearchAd(false);
	}
	render() {
		const {actions,dataKey, title,fields,searchParamsAd,showSearchAd,comsWeaTable} = this.props;
        const {showTemplate} = this.state;
		const tablekey = dataKey ? dataKey.split('_')[0] : 'init';
        const tableNow = comsWeaTable.get(tablekey);
        const loadingTable = tableNow.get('loading');
		return (
			<div className='wea-myhrm-search'>
                <Modal
                    title='存为模板'
                    wrapClassName="wea-myhrm-search-modal-wrap"
                    className={`wea-myhrm-search-modal`}
                    visible={showTemplate}
                    okText="保存" cancelText="关闭"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <SaveAsTemplate inputOnChange={(v)=> {
                            // console.log('v',v);
                            actions.saveFormFields({
                                ...fields.toJS(), 
                                mouldname:{name:'mouldname',value:v}
                            });
                        }}
                    />
                </Modal>
    			<WeaRightMenu datas={this.getRightMenu()} onClick={this.onRightMenuClick}>
    				<WeaTop
                    	title={title}
                    	loading={loadingTable}
                    	icon={<i className='icon-coms-hrm' />}
                    	iconBgcolor='#217346'
                    	buttons={this.getButtons()}
                    	buttonSpace={10}
                    	showDropIcon={true}
                    	dropMenuDatas={this.getRightMenu()}
                    	onDropMenuClick={this.onRightMenuClick}
                    >
                        <div className='wea-myhrm-search-query'>
                            <Form horizontal>{this.getSearchs(false)}</Form>
                            <div className='wea-myhrm-search-query-btns'>
                                {this.getSearchButtons()}
                            </div>
                        </div>
    				</WeaTop>
    			  </WeaRightMenu>
            </div>
		)
	}
	getTabButtonsAd() {
        const {actions,searchParamsAd} = this.props;
        return [
            (<Button type="primary" onClick={()=>{actions.doSearch();actions.setShowSearchAd(false)}}>搜索</Button>),
            (<Button type="ghost" onClick={()=>{actions.saveFormFields()}}>重置</Button>),
            (<Button type="ghost" onClick={()=>{actions.setShowSearchAd(false)}}>取消</Button>)
        ]
    }
    handleOk(){
        const {searchParamsAd}=this.props;
        if(!searchParamsAd.get('mouldname')){
            message.info('必填信息不完整');
            return;
        } 
        selectManually = false;
        this.saveAsTemplate(false);
        this.templateActions('insert');
    }
    handleCancel(){
        this.saveAsTemplate(false)
    }
    saveAsTemplate(bool){
        this.setState({showTemplate:bool})
    }
    templateActions(saveWay){
        const {actions,searchParamsAd,responseId}=this.props;
        saveWay=='insert' && actions.saveFormFields();//清空表单域
        const param = {...searchParamsAd.toJS(), opera:saveWay, mouldid:responseId}
        actions.saveHrmSearchCondition(param).then(data=>{
            const id = data.id;
            saveWay=='insert' && actions.saveResponseId(id);
            actions.getHrmSearchMoudleList({mouldid:id});
            actions.getHrmSearchCondition({mouldid:id});
        }).catch(err=>{
            message.error(err);
        });
    }
	getButtons() {
        const {actions,comsWeaTable,location,responseId} = this.props;
        // console.log('responseId',responseId)
        const arr = [<Button type="primary"  onClick={this.goSearch} >搜索</Button>,
            <Button type="default" onClick={()=>this.templateActions('update')} >保存</Button>,
            <Button type="default" onClick={()=>this.saveAsTemplate('insert')} >另存为</Button>,
            <Button type="default" onClick={()=>this.templateActions('delete')} >删除</Button>,
            <Button type="default" onClick={()=>actions.saveFormFields()} >重置</Button>,
            <Button type="default" onClick={()=>this.saveAsTemplate(true)} >存为模板</Button>,
            <Button type="default" onClick={()=>this.context.router.push({pathname:'/main/hrm/customQueryCondition'})}>查询条件定制</Button>
        ];
        let btns =[];
        !responseId && (btns = [arr[0],arr[4],arr[5],arr[6]]);
        responseId && (btns = arr.slice(0,4));
        return btns
    }
    getTemplateSelect(){
        const {templateSelect,searchParamsAd,templateSelectedKey}=this.props;
        const options = templateSelect&&templateSelect.get('options')&&templateSelect.get('options').toJS();//下拉选择框
        const key = selectManually ?  templateSelectedKey : WeaTools.getSelectDefaultValue(options);//下拉选中的模板key
        // console.log('key1:',templateSelectedKey,'key0:',WeaTools.getSelectDefaultValue(options),'key:',key);
        return (
            <WeaSelect
                value={key}
                options={options}
                onChange={this.templateSelectOnChange}
            />
        )
    }
    templateSelectOnChange(v){
        console.log('templateSelectOnChange',v);
        const {actions,fields}=this.props;
        selectManually = true;
        actions.saveSelectedKey(v);
        actions.getHrmSearchCondition({mouldid:v})
    }
    getSearchs(bool) {
    	const {condition} = this.props;
    	let searchGroupArr = [];
		condition && condition.toJS().forEach((item,index)=>{
			searchGroupArr.push(
				<WeaSearchGroup 
				 needTigger={true}
                 customComponent={index==0 ? this.getTemplateSelect() : ''}
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
    goSearch = ()=>{
        const { actions} = this.props;
        actions.setShowSearchAd(false);
        this.context.router.push({
            pathname:this.props.location.pathname+'result',
            // state:fields.tojs(),
        });
    }
    getSearchButtons() {
        const { actions} = this.props;
        const btnStyle={
        	borderRadius: 3,
			height: 28,
			width: 80
        }
        return [
            (<Button type="primary" style={btnStyle} onClick={this.goSearch}>搜索</Button>),
            (<span style={{width:'15px', display:'inline-block'}}></span>),
            (<Button type="ghost" style={btnStyle} onClick={()=>{actions.saveFormFields();actions.setShowSearchAd(false)}}>重置</Button>)
        ]
    }
    getRightMenu(){
        const {comsWeaTable} = this.props;
        const selectedRowKeys = comsWeaTable.get('selectedRowKeys');
        const arr = [{
                icon: <i className='icon-coms-ws'/>,
                content:'搜索'
            },{
                icon: <i className='icon-Right-menu-Batch-sharing'/>,
                content:'收藏',
                // disabled: !selectedRowKeys || !`${selectedRowKeys.toJS()}`
            },{
                icon: <i className='icon-Right-menu-Custom'/>,
                content:'帮助'
            }
        ];
        return arr
    }
    onRightMenuClick(key){
        const {actions,comsWeaTable} = this.props;
        switch(key){
            case '0':
                this.goSearch();
                break;
            case '1':
                // alert('收藏');
                break;
            case '2':
                // alert('帮助');
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

Search = WeaTools.tryCatch( React, MyErrorHandler, { error: "" })(Search);

//form 表单与 redux 双向绑定
Search = createForm({
	onFieldsChange(props, fields) {
        props.actions.saveFormFields({...props.fields.toJS(), ...fields});
    },
	mapPropsToFields(props) {
		return props.fields.toJS();
  	}
})(Search);


// 把 state map 到组件的 props 上
const mapStateToProps = state => {
	const {hrmSearch,hrmAdd,comsWeaTable} = state;
	return { 
		loading:hrmSearch.get('loading'),
		title:hrmSearch.get('title'),
		condition:hrmSearch.get('condition'),
		fields: hrmSearch.get('fields'),
		showSearchAd:hrmSearch.get('showSearchAd'),
		searchParamsAd: hrmSearch.get('searchParamsAd'),
		comsWeaTable: comsWeaTable, //绑定整个table
        templateSelect:hrmSearch.get('templateSelect'),
        responseId:hrmSearch.get('responseId'),
        templateSelectedKey:hrmSearch.get('templateSelectedKey'),
	}
}

// 把 dispatch map 到组件的 props 上
const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators({...SearchAction,...WeaTableAction}, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Search);
