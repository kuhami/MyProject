import PropTypes from 'react-router/lib/PropTypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Button, Form, Modal,message,Checkbox} from 'antd'
const createForm = Form.create;
const FormItem = Form.Item;
import isEmpty from 'lodash/isEmpty'
import cloneDeep from 'lodash/cloneDeep'
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
import * as Utils from '../../utils/index';

class Main extends React.Component {
    static contextTypes = {
        router: PropTypes.routerShape
    }
    constructor(props) {
        super(props);
        const funcs = ['getButtons','saveClick','getTitle','getFields','onRightMenuClick'];
        funcs.forEach(f => this[f] = this[f].bind(this))
        this.state = {
            showGroup: true,
        }
    }
    
    componentDidMount(){
        const {actions} = this.props;
        try{
            actions.customQueryCondition().then(condition=>{
                const arr = new Array();
                let obj = new Object();
                for(let i = 0,leng=condition.length; i<leng; i++){
                    arr.push(...condition[i].items)
                }
                for (let i = 0,leng=arr.length; i<leng; i++) {
                    obj[arr[i].fieldname] = {name:arr[i].fieldname,value:arr[i].fieldvalue=='1'}
                }
                actions.saveQueryConditionFiels(obj)
            });
        }catch(err){
            message.error(err)
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return  !is(this.props.queryConditionFields,nextProps.queryConditionFields) ||
            !is(this.props.queryCondition,nextProps.queryCondition)
    }
    render() {
        const {title='查询条件定制',items=[],queryCondition} = this.props;
        const {showGroup} = this.state;
        // console.log("queryCondition:",queryCondition.toJS());
        return (
            <WeaRightMenu datas={this.getRightMenu()} onClick={this.onRightMenuClick}>
                <WeaTop
                    title={title}
                    loading={true}
                    icon={<i className='icon-coms-hrm' />}
                    iconBgcolor='#f00'
                    buttons={this.getButtons()}
                    buttonSpace={10}
                    showDropIcon={true}
                    dropMenuDatas={this.getRightMenu()}
                    onDropMenuClick={this.onRightMenuClick}
                >
                   <Form horizontal>{this.getSearchs()}</Form>
                </WeaTop>
            </WeaRightMenu>
        )
    }
   getSearchs() {
        const {queryCondition} = this.props;
        let searchGroupArr = [];
        queryCondition && queryCondition.toJS().forEach((item,index)=>{
            searchGroupArr.push(
                <WeaSearchGroup 
                 needTigger={true}
                 title={this.getTitle(index)} 
                 showGroup={this.isShowFields(index)}
                 items={this.getFields(index)}
                 />
            )
        })
        return searchGroupArr;
    }
    getTitle(index=0) {
        const {queryCondition} = this.props;
        return !isEmpty(queryCondition.toJS()) && queryCondition.toJS()[index].title
    }
    isShowFields(index=0) {
        const {queryCondition} = this.props;
        return !isEmpty(queryCondition.toJS()) && queryCondition.toJS()[index].defaultshow
    }
    getFields = (index=0) => {
        const {queryCondition,actions,form,queryConditionFields} = this.props;
        const checkedObj = queryConditionFields.toJS();
        const browserConditions = queryCondition.toJS();
        const fieldsData = !isEmpty(browserConditions) && browserConditions[index].items;
        let items = new Array();
        fieldsData.forEach( field => {
            const isChecked = checkedObj[field.fieldname]&&checkedObj[field.fieldname].value
            items.push({
                com:(<FormItem  wrapperCol={{span:'8'}}>
                        <span>
                            <Checkbox checked={isChecked} {...form.getFieldProps(field.fieldname)}/>
                            {field.fieldlabel}
                        </span>
                    </FormItem>),
                colSpan:2
            });
        });
       return items;
    }
    saveClick(){
        const {actions,location,queryConditionFields} = this.props;
        const checkedObj = queryConditionFields.toJS();
        const obj =  Utils.translateFormFields(checkedObj);
        let newObj = cloneDeep(obj);
        for(let key in newObj){
            newObj[key]==true ? newObj[key] = '1' : newObj[key] = '0';
        }
        // console.log('newObj',newObj)
        actions.saveQueryCondition(newObj)
        this.context.router.goBack();
    }
    getButtons() {
        let btns =[];
        btns.push(
            <Button type="default"  onClick={this.saveClick}>保存</Button>
        );
        return btns
    }
    getRightMenu(){
        const arr = [{
                icon: <i className='icon-Right-menu--search'/>,
                content:'保存'
            },{
                icon: <i className='icon-Right-menu-Batch-sharing'/>,
                content:'收藏',
            },{
                icon: <i className='icon-Right-menu-Custom'/>,
                content:'帮助'
            }
        ];
        return arr;
    }
    onRightMenuClick(key){
        console.log('onRightMenuClick-key',key);
        switch(key){
            case '0':
                this.saveClick();
                break;
            case '1':
                alert('收藏');
                break;
            case '2':
                alert('帮助');
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

Main = WeaTools.tryCatch( React, MyErrorHandler, { error: "" })(Main);

//form 表单与 redux 双向绑定
Main = createForm({
    onFieldsChange(props, fields) {
        props.actions.saveQueryConditionFiels({...props.queryConditionFields.toJS(), ...fields});
    },
    mapPropsToFields(props) {
        return props.queryConditionFields.toJS();
    }
})(Main);


// 把 state map 到组件的 props 上
const mapStateToProps = state => {
    // console.log('==================================================state',state);
    const {hrmSearch,comsWeaTable} = state;
    return {
        queryConditionFields: hrmSearch.get('queryConditionFields'), 
        queryCondition:hrmSearch.get('queryCondition'),
    }
}

// 把 dispatch map 到组件的 props 上
const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({...SearchAction,...WeaTableAction}, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);