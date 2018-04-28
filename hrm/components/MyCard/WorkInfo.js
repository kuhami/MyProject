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
import { WeaErrorPage, WeaTools,WeaSearchBrowserBox,WeaTableEdit,WeaSearchGroup } from 'ecCom'
// import '../../css/myCard-basicInfo.less';
import InfoGroup from '../public/infoGroup';

class WorkInfo extends React.Component {
    static contextTypes = {
        router: PropTypes.routerShape,
    }
    constructor(props) {
        super(props);
        const funcs = ['tableEditChange'];
        funcs.forEach(f=> this[f] = this[f].bind(this))
    }
    componentDidMount(){
        const {actions} = this.props;
        
    }
    shouldComponentUpdate(nextProps, nextState) {
        return  true
    }

    render() {
        const {actions,isEditor}=this.props;
        return  (
            <div className='hrm-my-card-basicInfo' style={{height:'100%'}}>
                <Form horizontal>{this.getSearchs()}</Form>
                <Tabs>{this.getTabChildren()}</Tabs>
            </div>
        )
    }
    tableEditChange(data){
        
    }
    getTabChildren(){
         let columns = [],datas=[];
         const tabChildren = []
         let editorTables = [];
         personInfo.result.forEach(c =>{
            c.tables && (editorTables = c.tables)
         });
         editorTables.map((t,i)=>{
            tabChildren.push(
                <TabPane tab={t.tabname} key={i}>
                    <WeaTableEdit
                        columns={t.tabinfo.columns}
                        datas={t.tabinfo.datas}
                        onChange={this.tableEditChange}
                        viewAttr={2}
                    />
                </TabPane>
            );
        })
        return tabChildren;
    }
    getSearchs(){
        const { conditioninfo } = this.props;
        let info=[];
        personInfo.result.forEach(c =>{
            !c.tables && (info = c)
         });
        let items = [];
        info.items.forEach( field => {
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
        return <WeaSearchGroup needTigger={true} title={info.title} showGroup={info.defaultshow} items={items}/>
    }
}

const personInfo ={
    "result": [
        {
            "title": "工作信息",
            "items": [
                {
                    "browserConditionParam": {
                        "completeParams": {},
                        "conditionDataParams": {},
                        "dataParams": {},
                        "destDataParams": {},
                        "hasAddBtn": false,
                        "hasAdvanceSerach": true,
                        "idSeparator": ",",
                        "isAutoComplete": 1,
                        "isDetail": 0,
                        "isMultCheckbox": false,
                        "isSingle": true,
                        "linkUrl": "/hrm/usekind/HrmUseKindEdit.jsp?id=",
                        "pageSize": 10,
                        "quickSearchName": "",
                        "title": "用工性质",
                        "type": "31",
                        "viewAttr": 2
                    },
                    "colSpan": 2,
                    "conditionType": "BROWSER",
                    "domkey": [
                        "usekind"
                    ],
                    "fieldcol": 12,
                    "isQuickSearch": false,
                    "label": "用工性质",
                    "labelcol": 6,
                    "viewAttr": 1
                },
                {
                    "browserConditionParam": {
                        "completeParams": {},
                        "conditionDataParams": {},
                        "dataParams": {},
                        "destDataParams": {},
                        "hasAddBtn": false,
                        "hasAdvanceSerach": true,
                        "idSeparator": ",",
                        "isAutoComplete": 1,
                        "isDetail": 0,
                        "isMultCheckbox": false,
                        "isSingle": true,
                        "linkUrl": "",
                        "pageSize": 10,
                        "quickSearchName": "",
                        "title": "日期",
                        "type": "2",
                        "viewAttr": 2
                    },
                    "colSpan": 2,
                    "conditionType": "DATE",
                    "domkey": [
                        "startdateselect",
                        "startdatefrom",
                        "startdateto"
                    ],
                    "fieldcol": 18,
                    "isQuickSearch": false,
                    "label": "合同开始日期",
                    "labelcol": 6,
                    "options": [
                        {
                            "key": "0",
                            "selected": true,
                            "showname": "全部"
                        },
                        {
                            "key": "1",
                            "selected": false,
                            "showname": "今天"
                        },
                        {
                            "key": "2",
                            "selected": false,
                            "showname": "本周"
                        },
                        {
                            "key": "3",
                            "selected": false,
                            "showname": "本月"
                        },
                        {
                            "key": "7",
                            "selected": false,
                            "showname": "上个月"
                        },
                        {
                            "key": "4",
                            "selected": false,
                            "showname": "本季"
                        },
                        {
                            "key": "5",
                            "selected": false,
                            "showname": "本年"
                        },
                        {
                            "key": "8",
                            "selected": false,
                            "showname": "上一年"
                        },
                        {
                            "key": "6",
                            "selected": false,
                            "showname": "指定日期范围"
                        }
                    ],
                    "viewAttr": 1
                },
                {
                    "browserConditionParam": {
                        "completeParams": {},
                        "conditionDataParams": {},
                        "dataParams": {},
                        "destDataParams": {},
                        "hasAddBtn": false,
                        "hasAdvanceSerach": true,
                        "idSeparator": ",",
                        "isAutoComplete": 1,
                        "isDetail": 0,
                        "isMultCheckbox": false,
                        "isSingle": true,
                        "linkUrl": "",
                        "pageSize": 10,
                        "quickSearchName": "",
                        "title": "日期",
                        "type": "2",
                        "viewAttr": 2
                    },
                    "colSpan": 2,
                    "conditionType": "BROWSER",
                    "domkey": [
                        "probationenddate"
                    ],
                    "fieldcol": 12,
                    "isQuickSearch": false,
                    "label": "试用期结束日期",
                    "labelcol": 6,
                    "viewAttr": 1
                },
                {
                    "browserConditionParam": {
                        "completeParams": {},
                        "conditionDataParams": {},
                        "dataParams": {},
                        "destDataParams": {},
                        "hasAddBtn": false,
                        "hasAdvanceSerach": true,
                        "idSeparator": ",",
                        "isAutoComplete": 1,
                        "isDetail": 0,
                        "isMultCheckbox": false,
                        "isSingle": true,
                        "linkUrl": "",
                        "pageSize": 10,
                        "quickSearchName": "",
                        "title": "日期",
                        "type": "2",
                        "viewAttr": 2
                    },
                    "colSpan": 2,
                    "conditionType": "DATE",
                    "domkey": [
                        "enddateselect",
                        "enddatefrom",
                        "enddateto"
                    ],
                    "fieldcol": 18,
                    "isQuickSearch": false,
                    "label": "合同结束日期",
                    "labelcol": 6,
                    "options": [
                        {
                            "key": "0",
                            "selected": true,
                            "showname": "全部"
                        },
                        {
                            "key": "1",
                            "selected": false,
                            "showname": "今天"
                        },
                        {
                            "key": "2",
                            "selected": false,
                            "showname": "本周"
                        },
                        {
                            "key": "3",
                            "selected": false,
                            "showname": "本月"
                        },
                        {
                            "key": "7",
                            "selected": false,
                            "showname": "上个月"
                        },
                        {
                            "key": "4",
                            "selected": false,
                            "showname": "本季"
                        },
                        {
                            "key": "5",
                            "selected": false,
                            "showname": "本年"
                        },
                        {
                            "key": "8",
                            "selected": false,
                            "showname": "上一年"
                        },
                        {
                            "key": "6",
                            "selected": false,
                            "showname": "指定日期范围"
                        }
                    ],
                    "viewAttr": 1
                }
            ],
            "defaultshow": true
        },
        {
            "tables": [
                {
                    "tabinfo": {
                        "datas": [],
                        "columns": [
                            {
                                "title": "语言",
                                "com": [
                                    {
                                        "key": "language",
                                        "label": "",
                                        "type": "INPUT",
                                        "viewAttr": 1,
                                        "width": "80%"
                                    }
                                ],
                                "dataIndex": "language",
                                "key": "language"
                            },
                            {
                                "title": "水平",
                                "com": [
                                    {
                                        "key": "level",
                                        "label": "",
                                        "options": [
                                            {
                                                "key": "0",
                                                "selected": true,
                                                "showname": "一般"
                                            },
                                            {
                                                "key": "1",
                                                "selected": false,
                                                "showname": "良好"
                                            },
                                            {
                                                "key": "2",
                                                "selected": false,
                                                "showname": "熟练"
                                            },
                                            {
                                                "key": "3",
                                                "selected": false,
                                                "showname": "精通"
                                            }
                                        ],
                                        "type": "SELECT",
                                        "viewAttr": 1,
                                        "width": "80%"
                                    }
                                ],
                                "dataIndex": "level",
                                "key": "level"
                            },
                            {
                                "title": "备注",
                                "com": [
                                    {
                                        "key": "memo",
                                        "label": "",
                                        "type": "INPUT",
                                        "viewAttr": 1,
                                        "width": "80%"
                                    }
                                ],
                                "dataIndex": "memo",
                                "key": "memo"
                            }
                        ]
                    },
                    "tabname": "语言能力"
                }
            ]
        }
    ]
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

WorkInfo = WeaTools.tryCatch( React, MyErrorHandler, { error: "" })(WorkInfo);

WorkInfo = createForm()(WorkInfo);

// 把 state map 到组件的 props 上
const mapStateToProps = state => {
    const {hrmMyCard,comsWeaTable} = state;
    return {
       
    }
}

// 把 dispatch map 到组件的 props 上
const mapDispatchToProps = dispatch => {
    return {
       
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(WorkInfo);