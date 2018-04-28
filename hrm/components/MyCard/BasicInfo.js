
import { Tabs,Button,Form, Modal,message,Row,Col } from 'antd';
import PropTypes from 'react-router/lib/PropTypes';
const TabPane = Tabs.TabPane;
const createForm = Form.create;
const FormItem = Form.Item;
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty'
import debounce from 'lodash/debounce'
import Immutable from 'immutable'
const is = Immutable.is;

import * as MyCardAction from '../../actions/myCard'
import { WeaErrorPage, WeaTools,WeaSearchBrowserBox,WeaTableEdit } from 'ecCom'
import '../../css/myCard-basicInfo.less';
import InfoGroup from '../public/infoGroup';
import {createQRCode,imgZoom} from '../../utils'

class BasicInfo extends React.Component {
    static contextTypes = {
        router: PropTypes.routerShape,
    }
    constructor(props) {
        super(props);
        const funcs = ['showSQR','tableEditChange'];
        funcs.forEach(f=> this[f] = this[f].bind(this));

    }
    componentDidMount(){
        const {actions,qRCode,location} = this.props;
        const hrmId = location.state ? location.state : '';
        actions.getHrmResourceItem({id:hrmId});
        actions.getQRCode({id:hrmId}).then(obj=>{
            obj.hasQRCode && createQRCode(obj.options);
        }).catch(err=>{
            message.error(err)
        });
        // let dom = ReactDOM.findDOMNode(this);
        // imgZoom(dom, ".hrm-my-card-basicInfo-left-imgwrap");
    }
    shouldComponentUpdate(nextProps, nextState) {
        return  !is(this.props.datas,nextProps.datas) ||
            !is(this.props.modelItems,nextProps.modelItems)||
            this.props.showSQR !== nextProps.showSQR||
            this.props.showBigImg !== nextProps.showBigImg||
            this.props.showAccountInfo !== nextProps.showAccountInfo||
            this.props.isEditor !== nextProps.isEditor

    }
    showSQR(bool,e){
        const {actions,showSQR}=this.props;
        e.stopPropagation && e.stopPropagation();
        e.preventDefault && e.preventDefault();
        e.nativeEvent && e.nativeEvent.preventDefault();
        actions.showSQR(bool);
    }
    render() {
        const {actions,infoGroup,imgSrc,modelItems,showSQR,showBigImg,sendButtons,accountInfo,showAccountInfo,isEditor}=this.props;
        const getPortrait =()=>{
            const loadingImg = '/images/messageimages/temp/loading_wev8.gif';
            return (
                <div className='hrm-my-card-basicInfo-left-imgwrap'>
                    <div className='hrm-my-card-basicInfo-left-imgwrap-triangle' onClick={debounce(this.showSQR.bind(null,true),150)}/>
                    <img className='hrm-my-card-basicInfo-left-img' 
                        src={imgSrc ? imgSrc : loadingImg}
                        onClick={()=>imgSrc && actions.showBigImg(true)} 
                    />
                    <img className={`hrm-my-card-basicInfo-left-img-big ${showBigImg ?  'hrm-my-card-basicInfo-left-img-big-active' : ''}`} 
                        onClick={()=>imgSrc && actions.showBigImg(false)} 
                        src={imgSrc ? imgSrc : loadingImg} 
                    />
                    <div className='hrm-my-card-basicInfo-left-img-sqrimg' style={{position:'absolute',top:4,right:5}} onClick={debounce(this.showSQR.bind(null,true),150)}>
                        <i className='icon-coms-Scan' style={{color:'#fff'}}/>
                    </div>
                    <div className='hrm-my-card-basicInfo-sqr' style={{display: showSQR ? 'block' : 'none'}} onClick={this.showSQR.bind(null,false)}/>
                </div>
            )
        }
        const getPortraitButtons=()=>{
            const colArr = [];
            sendButtons && sendButtons.get('sendEmessage') && colArr.push(
                <Col span={6}>
                    <div className='hrm-my-card-basicInfo-icon-circle'>
                        <i className='icon-coms-Send-message'></i>
                    </div>
                </Col>
            );
            sendButtons && sendButtons.get('openmessage') && colArr.push(
                <Col span={6}>
                    <div className='hrm-my-card-basicInfo-icon-circle'>
                        <i className='icon-coms-message-o'></i>
                    </div>
                </Col>
            );
            sendButtons && sendButtons.get('openemail') && colArr.push(
                <Col span={6}>
                    <div className='hrm-my-card-basicInfo-icon-circle'>
                        <i className='icon-coms-Send-emails'></i>
                    </div>
                </Col>
            );
            sendButtons && sendButtons.get('doAddWorkPlan') && colArr.push(
                <Col span={6}>
                    <div className='hrm-my-card-basicInfo-icon-circle'>
                        <i className='icon-coms-New-schedule'></i>
                    </div>
                </Col>
            );
            return colArr;
        }
        const getAccountinfo=()=>{
            console.log('accountInfo',accountInfo.toJS())
            let colArr = [];
             accountInfo && accountInfo.toJS().forEach((a,i)=>{
                colArr.push(
                    <Col className='hrm-my-card-basicInfo-left-accountinfo-label' span='12'>
                    {a.label}
                    </Col>
                );
                colArr.push(
                    <Col className='hrm-my-card-basicInfo-left-accountinfo-value' span='12'>
                    {a.value ? <span dangerouslySetInnerHTML={{__html:a.value}}/> : <div>&nbsp;</div>}
                    </Col>
                );
                i==3 && colArr.push(<Col className='hrm-my-card-basicInfo-left-accountinfo-middline' span='24'/>);
               
            });
            if(!showAccountInfo){
                colArr.splice(9,colArr.length);
            }
            colArr.push(
                <Col className='hrm-my-card-basicInfo-left-accountinfo-endicon' span='24' onClick={()=>actions.showAccountInfo(!showAccountInfo)}>
                    <i className={showAccountInfo ? 'icon-coms-up' : 'icon-coms-down'}/>
                </Col>
            );
            return colArr;
        }
        const viewCard = (
            <div className='hrm-my-card-basicInfo' style={{height:'100%'}}>
                <div className='hrm-my-card-basicInfo-left' >
                    {getPortrait()}
                    <Row className="hrm-my-card-basicInfo-left-imgwrap-op" gutter={16}>{getPortraitButtons()}</Row>
                    <Row>{getAccountinfo()}</Row>
                </div>
                <div className='hrm-my-card-basicInfo-right'>
                    <div className='hrm-my-card-basicInfo-right-counts'>
                    {
                        modelItems && modelItems.toJS().map(c => {
                            const fontColor = c['font-color'];
                            return (
                                <div className='hrm-my-card-basicInfo-right-counts-cell' >
                                    <img src={c.icon} alt=""/>
                                    <div className='hrm-my-card-basicInfo-right-counts-cell-info'>
                                        <div>{c.label}</div>
                                        <div title={c.num} className='text-overflow'><a href={c.url} style={fontColor?{color:fontColor}:null} target='_blank'>{c.num}</a></div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    </div>
                    <Row className='hrm-my-card-basicInfo-right-info'>
                        {
                            infoGroup && infoGroup.toJS().map(info => {
                                return (
                                    <Col span='24'>
                                        <InfoGroup items={info.items} title={info.title} showGroup={info.defaultshow}/>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </div>
            </div>
        )
        const editCard = (
            <div className='hrm-my-card-basicInfo' style={{height:'100%'}}>
                编辑我的卡片{this.getSearchs()}
                <WeaTableEdit
                    datas={datas_mock}
                    columns={columns_mock}
                    onChange={this.tableEditChange}
                    viewAttr={2}
                />
            </div>
        )
        return !isEditor ? viewCard : editCard
    }
    tableEditChange(data){

    }
    getSearchs(){
    //     const { conditioninfo } = this.props;
    //     let group = [];
    //     conditioninfo&&conditioninfo.toJS().forEach(c =>{
    //         let items = [];
    //         c.items.forEach( field => {
    //             if(field.isQuickSearch){
    //                 quickSearchPara = field.domkey[0];
    //             }
    //             items.push({
    //                 com:(<FormItem
    //                     label={`${field.label}`}
    //                     labelCol={{span: `${field.labelcol}`}}
    //                     wrapperCol={{span: `${field.fieldcol}`}}>
    //                         {WeaTools.getComponent(field.conditionType,field.browserConditionParam,field.domkey,this.props,field)}
    //                     </FormItem>),
    //                 colSpan:field.colSpan || 2
    //             });
    //         });
    //         group.push(<WeaSearchGroup needTigger={true} title={c.title} showGroup={c.defaultshow} items={items}/>)
    //     });
    //     return <Form horizontal>{group}</Form>
    }
}
let datas_mock =   [
                        {
                            "member": "张三",
                            "jobtitle": "职员",
                            "title": "父亲",
                            "address": "上海泛微",
                            "company": "上海泛微"
                        },
                        {
                            "member": "李四",
                            "jobtitle": "职员",
                            "title": "母亲",
                            "address": "上海泛微",
                            "company": "上海泛微"
                        }
                    ]
let columns_mock = [
                        {
                            "title": "成员",
                            "com": [
                                {
                                    "key": "member",
                                    "label": "",
                                    "type": "INPUT",
                                    "viewAttr": 1,
                                    "width": "16%"
                                }
                            ],
                            "dataIndex": "member",
                            "key": "member"
                        },
                        {
                            "title": "称谓",
                            "com": [
                                {
                                    "key": "title",
                                    "label": "",
                                    "type": "INPUT",
                                    "viewAttr": 2,
                                    "width": "100%"
                                }
                            ],
                            "dataIndex": "title",
                            "key": "title"
                        },
                        {
                            "title": "工作单位",
                            "com": [
                                {
                                    "key": "company",
                                    "label": "",
                                    "type": "INPUT",
                                    "viewAttr": 2,
                                    "width": "16%"
                                }
                            ],
                            "dataIndex": "company",
                            "key": "company"
                        },
                        {
                            "title": "地址",
                            "com": [
                                {
                                    "key": "address",
                                    "label": "",
                                    "type": "INPUT",
                                    "viewAttr": 2,
                                    "width": "23%"
                                }
                            ],
                            "dataIndex": "address",
                            "key": "address"
                        }
                    ]


//组件检错机制
class MyErrorHandler extends React.Component {
    render() {
        const hasErrorMsg = this.props.error && this.props.error !== "";
        return(
            <WeaErrorPage msg={ hasErrorMsg ? this.props.error : "对不起，该页面异常，请联系管理员！" } />
        );
    }
}

BasicInfo = WeaTools.tryCatch( React, MyErrorHandler, { error: "" })(BasicInfo);

// 把 state map 到组件的 props 上
const mapStateToProps = state => {
    const {hrmMyCard,comsWeaTable} = state;
    return {
        datas:hrmMyCard.get('datas'),
        infoGroup:hrmMyCard.get('infoGroup'),
        imgSrc:hrmMyCard.get('imgSrc'),
        accountInfo:hrmMyCard.get('accountInfo'),
        sendButtons:hrmMyCard.get('sendButtons'),
        showAccountInfo:hrmMyCard.get('showAccountInfo'),
        showSQR:hrmMyCard.get('showSQR'),
        showBigImg:hrmMyCard.get('showBigImg'),
        modelItems:hrmMyCard.get('modelItems'),
        isEditor:hrmMyCard.get('isEditor')
    }
}

// 把 dispatch map 到组件的 props 上
const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(MyCardAction, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BasicInfo);