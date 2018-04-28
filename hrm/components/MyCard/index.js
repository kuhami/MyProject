import { Tabs,Button,Form, Modal,message } from 'antd';
import PropTypes from 'react-router/lib/PropTypes';
const TabPane = Tabs.TabPane;
const createForm = Form.create;
const FormItem = Form.Item;
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty'
import Immutable from 'immutable'
const is = Immutable.is;

import * as MyCardAction from '../../actions/myCard'
import { WeaErrorPage, WeaTools,WeaSearchBrowserBox } from 'ecCom'
import '../../css/myCard.less';
import MyCardTop from '../public/top';

class MyCard extends React.Component {
    static contextTypes = {
        router: PropTypes.routerShape,
    }
	constructor(props) {
		super(props);
		const funcs = ['onRightMenuClick','tabsOnChange','editCard','backCard','saveEditCard'];
        funcs.forEach(f=> this[f] = this[f].bind(this))
        const {pathname} = props.location;
        this.init(pathname);
    }
    init(v){
        const { actions } = this.props;
        const routerKey =  v.split('/');
        const leng = routerKey.length;
        leng > 0 && actions.setActiveKey(routerKey[leng-1]);
    }
    componentDidMount(){
        const {actions,location} = this.props;
        const hrmId = location.state ? location.state : '';
        actions.getTabsRouter({id:hrmId});
        actions.getResourceCard({operation:'getResourceBaseView',id:hrmId});

    }
    shouldComponentUpdate(nextProps, nextState) {
        return  !is(this.props.tabs,nextProps.tabs) ||
            !is(this.props.activeKey, nextProps.activeKey) ||
            !is(this.props.hrmInfo, nextProps.hrmInfo)||
            this.props.isEditor !== nextProps.isEditor
            
    }
    renderTabs(){
        const {tabs,children,activeKey }=this.props;
        const tabPanes = [];
        iframeUrlArr = [];
        const newTabs = tabs.toJS();
        newTabs && newTabs.forEach((t,i) => {
            if(t.key && t.rotueurl) {
                tabPanes.push(<TabPane tab={t.value} key={t.key} url={t.url} rotueurl={t.rotueurl}/>);
            }else{
                iframeUrlArr[i] = t.url;
                tabPanes.push(<TabPane tab={t.value} key={`iframe-${i}`} url={t.url} rotueurl={t.rotueurl}/>);
            }
        })
        const isIframe = activeKey.split('-')[0] == 'iframe';
        const index = isIframe && activeKey.split('-')[1];
        const ifame = isIframe && <iframe src={newTabs[index].url}></iframe>;
        return  (
            <div>
                <Tabs activeKey={activeKey} onChange={this.tabsOnChange} >
                {tabPanes}
                </Tabs>
                {isIframe ? ifame : children}
            </div>
        );
    }
    render() {
        const {tabs,activeKey,hrmInfo}=this.props;
        const portraitConfig = {src:'/messager/images/icon_m_wev8.jpg'}
 
        return (
            <div className='hrm-my-card' style={{height:"100%"}}>
				<MyCardTop
					title={hrmInfo && hrmInfo.toJS()}
	            	portraitConfig={portraitConfig}
	            	buttons={this.getTopButtons()}
	            	buttonSpace={10}
	            	showDropIcon={true}
	            	dropMenuDatas={[]}
	            	onDropMenuClick={this.onRightMenuClick}
				>
                 { this.renderTabs()}
                </MyCardTop>
            </div>
        )
    }

    tabsOnChange(key){
        const {actions,tabs} = this.props;
        actions.setActiveKey(key);
        const newTabs = tabs.toJS()
        newTabs && newTabs.forEach((t,i) => {
            if(t.key && t.rotueurl && t.url.indexOf(key) >=0 ){
                this.context.router.push({pathname:t.rotueurl})
            }
        })
    }
    onRightMenuClick(key){
        const {actions} = this.props;
        switch(key){
            case '0':
                break;
        } 
    }
    getTopButtons() {
        const {actions,location,isEditor} = this.props;
        const save =  <Button type="primary" disabled={false} onClick={this.saveEditCard} >保存</Button>;
        const back =  <Button type="primary" disabled={false} onClick={this.backCard} >返回</Button>;
        const edit = <Button type="primary" disabled={false} onClick={this.editCard} >编辑</Button>;
        const btns = !isEditor ? [edit] : [save,back];
        return btns;
    }
    editCard(){
        const {actions,location,isEditor} = this.props;
        actions.editCard(true);
    }
    saveEditCard(){
        const {actions,location,isEditor} = this.props;
        actions.editCard(false);
    }
    backCard(){
        const {actions,location,isEditor} = this.props;
         actions.editCard(false);
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

MyCard = WeaTools.tryCatch( React, MyErrorHandler, { error: "" })(MyCard);

// 把 state map 到组件的 props 上
const mapStateToProps = state => {
    const {hrmMyCard,comsWeaTable} = state;
    return { 
        tabs:hrmMyCard.get('tabs'),
        activeKey:hrmMyCard.get('activeKey'),
        datas:hrmMyCard.get('datas'),
        hrmInfo:hrmMyCard.get('hrmInfo'),
        isEditor:hrmMyCard.get('isEditor')
    }
}

// 把 dispatch map 到组件的 props 上
const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(MyCardAction, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyCard);