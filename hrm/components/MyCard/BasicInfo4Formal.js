import { Tabs,Button,Form, Modal,message,Row,Col } from 'antd';
import PropTypes from 'react-router/lib/PropTypes';
const TabPane = Tabs.TabPane;
const createForm = Form.create;
const FormItem = Form.Item;
import isEmpty from 'lodash/isEmpty'
import debounce from 'lodash/debounce'
import Immutable from 'immutable'
const is = Immutable.is;

import { WeaErrorPage, WeaTools,WeaSearchBrowserBox,WeaTableEdit } from 'ecCom'
import '../../css/myCard-basicInfo4Formal.less';
import { InfoGroup4Formal1,InfoGroup4Formal2} from '../public/infoGroup4Formal';

import {createQRCode} from '../../utils'

class BasicInfo4Formal extends React.Component {
    static contextTypes = {
        router: PropTypes.routerShape,
    }
    constructor(props) {
        super(props);
        const funcs = ['showSQR','tableEditChange'];
        funcs.forEach(f=> this[f] = this[f].bind(this))
        this.state={
            tabs:[],
            activeKey:'HrmResourceBase',
            modelItems:[],
            datas:[],
            infoGroup:[],
            infoGroup2:[],
            imgSrc:null,
            hrmInfo:[],
            sendButtons:{},
            accountInfo:[],
            showSQR:false,
            showBigImg:false,
            showAccountInfo:true,
        }
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
        const {qRCode,location} = this.props;
        const hrmId = location.state ? location.state : '';
        WeaTools.callApi('/api/hrm/resource4formal/getResourceCard','GET',{operation:'getResourceBaseView',id:hrmId}).then(datas=>{
            this.getDatas(datas.result);
        }).catch(err=>{
            message.error(err);
        });
        WeaTools.callApi('/api/hrm/resource4formal/getResourceCard','GET',{operation:'getResourceBaseView',id:hrmId,cmd:'getResourceBaseData'}).then(datas=>{
            this.setState({infoGroup2:datas.result})
        }).catch(err=>{
            message.error(err);
        });
        WeaTools.callApi('/api/hrm/resource/getHrmResourceItem','GET',{id:hrmId}).then(datas=>{
            this.setState({modelItems:datas})
        }).catch(err=>{
            message.error(err);
        });
       WeaTools.callApi('/api/hrm/resource/getQRCode','GET',{id:hrmId}).then(obj=>{
            obj.hasQRCode && createQRCode(obj.options);
        }).catch(err=>{
            message.error(err);
        });
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     return  !is(this.state.datas,nextState.datas) ||
    //         !is(this.state.modelItems,nextState.modelItems)||
    //         this.state.showSQR !== nextState.showSQR||
    //         this.state.showBigImg !== nextState.showBigImg||
    //         this.state.showAccountInfo !== nextState.showAccountInfo||
    //         this.props.isEditor !== nextProps.isEditor

    // }
    showSQR(bool,e){
        const {showSQR}=this.props;
        e.stopPropagation && e.stopPropagation();
        e.preventDefault && e.preventDefault();
        e.nativeEvent && e.nativeEvent.preventDefault();
        this.setState({showSQR:bool});
    }
    render() {
        const {infoGroup,infoGroup2,imgSrc,modelItems,showSQR,showBigImg,sendButtons,accountInfo,showAccountInfo}=this.state;
        const {isEditor} = this.props;
        console.log('infoGroup2',infoGroup2)

        const getPortrait =()=>{
            const loadingImg = '/images/messageimages/temp/loading_wev8.gif';
            return (
                <div className='hrm-my-card-basicInfo-left-imgwrap'>
                    <div className='hrm-my-card-basicInfo-left-imgwrap-triangle' onClick={debounce(this.showSQR.bind(null,true),150)}/>
                    <img className='hrm-my-card-basicInfo-left-img' 
                        src={imgSrc ? imgSrc : loadingImg}
                        onClick={()=>imgSrc && this.setState({showBigImg:true})} 
                    />
                    <img className={`hrm-my-card-basicInfo-left-img-big ${showBigImg ?  'hrm-my-card-basicInfo-left-img-big-active' : ''}`} 
                        onClick={()=>imgSrc && this.setState({showBigImg:false})} 
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
            sendButtons && sendButtons['sendEmessage'] && colArr.push(
                <Col span={6}>
                    <div className='hrm-my-card-basicInfo-icon-circle'>
                        <i className='icon-coms-Send-message'></i>
                    </div>
                </Col>
            );
            sendButtons && sendButtons['openmessage'] && colArr.push(
                <Col span={6}>
                    <div className='hrm-my-card-basicInfo-icon-circle'>
                        <i className='icon-coms-message-o'></i>
                    </div>
                </Col>
            );
            sendButtons && sendButtons['openemail'] && colArr.push(
                <Col span={6}>
                    <div className='hrm-my-card-basicInfo-icon-circle'>
                        <i className='icon-coms-Send-emails'></i>
                    </div>
                </Col>
            );
            sendButtons && sendButtons['doAddWorkPlan'] && colArr.push(
                <Col span={6}>
                    <div className='hrm-my-card-basicInfo-icon-circle'>
                        <i className='icon-coms-New-schedule'></i>
                    </div>
                </Col>
            );
            return colArr;
        }
        const getAccountinfo=()=>{
            let colArr = [];
             accountInfo && accountInfo.forEach((a,i)=>{
                if(a.name=='weixin'){
                    colArr.push(
                        <Col className='hrm-my-card-basicInfo-left-accountinfo-label' span='24'>
                            <a href='/hrm/resource/qccode.jsp' target='_blank'>{a.label}</a>
                        </Col>
                    );
                }else{
                    colArr.push(
                        <Col className='hrm-my-card-basicInfo-left-accountinfo-label' span='12'>
                        {a.label} :
                        </Col>
                    );
                    colArr.push(
                        <Col className='hrm-my-card-basicInfo-left-accountinfo-value' span='12'>
                        {a.value ? <span dangerouslySetInnerHTML={{__html:a.value}}/> : <div>&nbsp;</div>}
                        </Col>
                    );
                }
                
                i==3 && colArr.push(<Col className='hrm-my-card-basicInfo-left-accountinfo-middline' span='24'/>);
               
            });
            if(!showAccountInfo){
                colArr.splice(9,colArr.length);
            }
            colArr.push(
                <Col className='hrm-my-card-basicInfo-left-accountinfo-endicon' span='24' onClick={()=>this.setState({showAccountInfo:!showAccountInfo})}>
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
                        modelItems && modelItems.map(c => {
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
                    <Row gutter={24}>
                        <Col span='12'>
                            <Row className='hrm-my-card-basicInfo-right-info'>
                                {
                                    infoGroup && infoGroup.map(info => {
                                        return (
                                            <Col span='24'>
                                                <InfoGroup4Formal1 items={info.items} title={info.title} showGroup={info.defaultshow}/>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </Col>
                        <Col span='12'>
                            <Row className='hrm-my-card-basicInfo-right-info'>
                             {
                                    infoGroup2 && infoGroup2.map(info => {
                                        return (
                                            <Col span='24'>
                                                <InfoGroup4Formal2 items={info.items} title={info.title} showGroup={info.defaultshow}/>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        )
        const editCard = (
            <div className='hrm-my-card-basicInfo' style={{height:'100%'}}>
                编辑我的卡片{this.getSearchs()}
                <WeaTableEdit
                    title="议程列表"
                    datas={datas_mock}
                    columns={columns_mock}
                    onChange={this.tableEditChange}
                    viewAttr={1}
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
    //     conditioninfo&&conditioninfo.forEach(c =>{
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
let datas_mock = [
                        {
                            "member": "李四",
                            "jobtitle": "职员",
                            "title": "母亲",
                            "address": "上海泛微",
                            "company": "上海泛微"
                        },
                        {
                            "member": "张三",
                            "jobtitle": "职员",
                            "title": "父亲",
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
                                    "width": "80%"
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
                                    "viewAttr": 1,
                                    "width": "80%"
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
                                    "viewAttr": 1,
                                    "width": "80%"
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
                                    "viewAttr": 1,
                                    "width": "80%"
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

BasicInfo4Formal = WeaTools.tryCatch( React, MyErrorHandler, { error: "" })(BasicInfo4Formal);


export default BasicInfo4Formal;