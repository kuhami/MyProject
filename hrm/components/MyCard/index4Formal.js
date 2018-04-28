import { Tabs,Button,Form, Modal,message } from 'antd';
import PropTypes from 'react-router/lib/PropTypes';
const TabPane = Tabs.TabPane;
const createForm = Form.create;
const FormItem = Form.Item;
import isEmpty from 'lodash/isEmpty'

import { WeaErrorPage, WeaTools,WeaSearchBrowserBox } from 'ecCom'
import '../../css/myCard.less';
import MyCardTop from '../public/top';

class MyCard4Formal extends React.Component {
    static contextTypes = {
        router: PropTypes.routerShape,
    }
	constructor(props) {
		super(props);
		const funcs = ['onRightMenuClick','tabsOnChange','editCard','backCard','saveEditCard','getDatas'];
        funcs.forEach(f=> this[f] = this[f].bind(this))
        const {pathname} = props.location;
        const activekey = this.initActivekey(pathname);
        this.state={
            tabs:[],
            activeKey:activekey || 'HrmResourceBase',
            datas:[],
            infoGroup:[],
            imgSrc:null,
            hrmInfo:[],
            sendButtons:{},
            accountInfo:[],
            showSQR:false,
            showBigImg:false,
            showAccountInfo:true,
            isEditor:false,
        }
    }
    initActivekey(v){
        const routerKey =  v.split('/');
        const leng = routerKey.length;
        return leng > 0 ? routerKey[leng-1] : '';
    }
    getDatas(datas){
        let infoGroup=[];//信息组
        let imgSrc=null;//人员照片
        let hrmInfo=[];//我的卡片顶部信息
        let sendButtons={};
        let accountInfo=[];
        datas && datas.forEach(d=>{
            if(d.id=='item1'){
                hrmInfo = d.items;
            }
            if(d.id=='item2'){
                d.items.forEach(d2=>{
                    d2.name == 'resourceimageid' && (imgSrc = d2.value)
                    d2.hasSendButton && (sendButtons = d2.options);
                    d2.accountinfo && (accountInfo = d2.accountinfo)
                })
            } 
            if(d.id=='item4' || d.id=='item5') infoGroup.push(d);
        })
        this.setState({
            datas,
            infoGroup,
            imgSrc,
            hrmInfo,
            sendButtons,
            accountInfo,
        })
    }
    componentDidMount(){
        const {location}=this.props;
        const hrmId = location.state ? location.state : '';
        WeaTools.callApi('/api/hrm/resource/getHrmResourceTab','GET',{id:hrmId}).then(datas=>{
            this.setState({tabs:datas})
        }).catch(err=>{
            message.error(err);
        });
        WeaTools.callApi('/api/hrm/resource4formal/getResourceCard','GET',{operation:'getResourceBaseView',id:hrmId}).then(datas=>{
            this.getDatas(datas.result);
        }).catch(err=>{
            message.error(err);
        });
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     return  !is(this.state.tabs,nextState.tabs) ||
    //         !is(this.state.activeKey, nextState.activeKey) ||
    //         !is(this.state.hrmInfo, nextState.hrmInfo)||
    //         this.state.isEditor !== nextState.isEditor
            
    // }
    renderTabs(){
        const {tabs,activeKey,isEditor }=this.state;
        const tabPanes = [];
        iframeUrlArr = [];
        const newTabs = tabs;
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
        const childrenWithProps = React.Children.map(this.props.children,(child) => React.cloneElement(child, { isEditor:isEditor }));
        return  (
            <div>
                <Tabs activeKey={activeKey} onChange={this.tabsOnChange} >
                {tabPanes}
                </Tabs>
                {isIframe ? ifame : childrenWithProps}
            </div>
        );
    }
    render() {
        const {tabs,activeKey,hrmInfo}=this.state;
        const portraitConfig = {src:'/messager/images/icon_m_wev8.jpg'}
 
        return (
            <div className='hrm-my-card' style={{height:"100%"}}>
				<MyCardTop
                    title={hrmInfo && hrmInfo}
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
        const {tabs} = this.state;
        this.setState({setActiveKey:key});
        const newTabs = tabs
        newTabs && newTabs.forEach((t,i) => {
            if(t.key && t.rotueurl && t.url.indexOf(key) >=0 ){
                this.context.router.push({pathname:t.rotueurl})
            }
        })
    }
    onRightMenuClick(key){
        switch(key){
            case '0':
                break;
        } 
    }
    getTopButtons() {
        const {location,isEditor} = this.state;
        const save =  <Button type="primary" disabled={false} onClick={this.saveEditCard} >保存</Button>;
        const back =  <Button type="primary" disabled={false} onClick={this.backCard} >返回</Button>;
        const edit = <Button type="primary" disabled={false} onClick={this.editCard} >编辑</Button>;
        const btns = !isEditor ? [edit] : [save,back];
        return btns;
    }
    editCard(){
       this.setState({isEditor:true});
    }
    saveEditCard(){
        this.setState({isEditor:false});
    }
    backCard(){
        this.setState({isEditor:false});
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

MyCard4Formal = WeaTools.tryCatch( React, MyErrorHandler, { error: "" })(MyCard4Formal);

export default MyCard4Formal;