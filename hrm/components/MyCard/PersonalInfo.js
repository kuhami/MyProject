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

class PersonInfo extends React.Component {
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

const personInfo = {
    "result": [
        {
            "title": "个人信息",
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
                        "birthdayselect",
                        "birthdayfrom",
                        "birthdayto"
                    ],
                    "fieldcol": 18,
                    "isQuickSearch": false,
                    "label": "出生日期",
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
                    "viewAttr": 2
                },
                {
                    "colSpan": 2,
                    "conditionType": "INPUT",
                    "domkey": [
                        "folk"
                    ],
                    "fieldcol": 12,
                    "isQuickSearch": false,
                    "label": "民族",
                    "labelcol": 6,
                    "viewAttr": 2
                },
                {
                    "colSpan": 2,
                    "conditionType": "INPUT",
                    "domkey": [
                        "nativeplace"
                    ],
                    "fieldcol": 12,
                    "isQuickSearch": false,
                    "label": "籍贯",
                    "labelcol": 6,
                    "viewAttr": 2
                },
                {
                    "colSpan": 2,
                    "conditionType": "INPUT",
                    "domkey": [
                        "regresidentplace"
                    ],
                    "fieldcol": 12,
                    "isQuickSearch": false,
                    "label": "户口",
                    "labelcol": 6,
                    "viewAttr": 2
                },
                {
                    "colSpan": 2,
                    "conditionType": "INPUT",
                    "domkey": [
                        "certificatenum"
                    ],
                    "fieldcol": 12,
                    "isQuickSearch": false,
                    "label": "身份证号码",
                    "labelcol": 6,
                    "viewAttr": 2
                },
                {
                    "colSpan": 2,
                    "conditionType": "SELECT",
                    "domkey": [
                        "maritalstatus"
                    ],
                    "fieldcol": 12,
                    "isQuickSearch": false,
                    "label": "婚姻状况",
                    "labelcol": 6,
                    "options": [
                        {
                            "key": "0",
                            "selected": false,
                            "showname": "未婚"
                        },
                        {
                            "key": "1",
                            "selected": false,
                            "showname": "已婚"
                        },
                        {
                            "key": "2",
                            "selected": false,
                            "showname": "离异"
                        }
                    ],
                    "viewAttr": 2
                },
                {
                    "colSpan": 2,
                    "conditionType": "INPUT",
                    "domkey": [
                        "policy"
                    ],
                    "fieldcol": 12,
                    "isQuickSearch": false,
                    "label": "政治面貌",
                    "labelcol": 6,
                    "viewAttr": 2
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
                        "bememberdateselect",
                        "bememberdatefrom",
                        "bememberdateto"
                    ],
                    "fieldcol": 18,
                    "isQuickSearch": false,
                    "label": "入团日期",
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
                    "viewAttr": 2
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
                        "bepartydateselect",
                        "bepartydatefrom",
                        "bepartydateto"
                    ],
                    "fieldcol": 18,
                    "isQuickSearch": false,
                    "label": "入党日期",
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
                    "viewAttr": 2
                },
                {
                    "colSpan": 2,
                    "conditionType": "SELECT",
                    "domkey": [
                        "islabouunion"
                    ],
                    "fieldcol": 12,
                    "isQuickSearch": false,
                    "label": "工会会员",
                    "labelcol": 6,
                    "options": [
                        {
                            "key": "1",
                            "selected": false,
                            "showname": "是"
                        },
                        {
                            "key": "0",
                            "selected": false,
                            "showname": "否"
                        }
                    ],
                    "viewAttr": 2
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
                        "linkUrl": "/hrm/educationlevel/HrmEduLevelEdit.jsp?id=",
                        "pageSize": 10,
                        "quickSearchName": "",
                        "title": "学历",
                        "type": "30",
                        "viewAttr": 2
                    },
                    "colSpan": 2,
                    "conditionType": "BROWSER",
                    "domkey": [
                        "educationlevel"
                    ],
                    "fieldcol": 12,
                    "isQuickSearch": false,
                    "label": "学历",
                    "labelcol": 6,
                    "viewAttr": 2
                },
                {
                    "colSpan": 2,
                    "conditionType": "INPUT",
                    "domkey": [
                        "degree"
                    ],
                    "fieldcol": 12,
                    "isQuickSearch": false,
                    "label": "学位",
                    "labelcol": 6,
                    "viewAttr": 2
                },
                {
                    "colSpan": 2,
                    "conditionType": "SELECT",
                    "domkey": [
                        "healthinfo"
                    ],
                    "fieldcol": 12,
                    "isQuickSearch": false,
                    "label": "健康状况",
                    "labelcol": 6,
                    "options": [
                        {
                            "key": "0",
                            "selected": false,
                            "showname": "优秀"
                        },
                        {
                            "key": "1",
                            "selected": false,
                            "showname": "良好"
                        },
                        {
                            "key": "2",
                            "selected": false,
                            "showname": "一般"
                        },
                        {
                            "key": "3",
                            "selected": false,
                            "showname": "较差"
                        }
                    ],
                    "viewAttr": 2
                },
                {
                    "colSpan": 2,
                    "conditionType": "SCOPE",
                    "domkey": [
                        "joblevel",
                        "joblevelTo"
                    ],
                    "fieldcol": 12,
                    "isQuickSearch": false,
                    "label": "身高(cm)",
                    "labelcol": 6,
                    "viewAttr": 2
                },
                {
                    "colSpan": 2,
                    "conditionType": "SCOPE",
                    "domkey": [
                        "joblevel",
                        "joblevelTo"
                    ],
                    "fieldcol": 12,
                    "isQuickSearch": false,
                    "label": "体重(kg)",
                    "labelcol": 6,
                    "viewAttr": 2
                },
                {
                    "colSpan": 2,
                    "conditionType": "INPUT",
                    "domkey": [
                        "residentplace"
                    ],
                    "fieldcol": 12,
                    "isQuickSearch": false,
                    "label": "现居住地",
                    "labelcol": 6,
                    "viewAttr": 2
                },
                {
                    "colSpan": 2,
                    "conditionType": "INPUT",
                    "domkey": [
                        "homeaddress"
                    ],
                    "fieldcol": 12,
                    "isQuickSearch": false,
                    "label": "家庭联系方式",
                    "labelcol": 6,
                    "viewAttr": 2
                },
                {
                    "colSpan": 2,
                    "conditionType": "INPUT",
                    "domkey": [
                        "tempresidentnumber"
                    ],
                    "fieldcol": 12,
                    "isQuickSearch": false,
                    "label": "暂住证号码",
                    "labelcol": 6,
                    "viewAttr": 2
                }
            ],
            "defaultshow": true
        },
        {
            "tables": [
                {
                    "tabinfo": {
                        "datas": [
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
                        ],
                        "columns": [
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
                    },
                    "tabname": "家庭情况"
                },
                {
                    "tabinfo": {
                        "datas": [
                            {
                                "-10519": "单行文本",
                                "-10454": "0",
                                "-15223span": "<a href=\"/hrm/resource/HrmResource.jsp?id=381\" target=\"_blank\">杨文元-hc</a>&nbsp;&nbsp;",
                                "-13108": true,
                                "-15223": "381",
                                "-10503": "多行文本"
                            }
                        ],
                        "columns": [
                            {
                                "title": "单行文本",
                                "com": [
                                    {
                                        "key": "-10519",
                                        "label": "",
                                        "type": "INPUT",
                                        "viewAttr": 0,
                                        "width": "80%"
                                    }
                                ],
                                "dataIndex": "-10519",
                                "key": "-10519"
                            },
                            {
                                "title": "多行文本",
                                "com": [
                                    {
                                        "key": "-10503",
                                        "label": "",
                                        "type": "TEXTAREA",
                                        "viewAttr": 0,
                                        "width": "80%"
                                    }
                                ],
                                "dataIndex": "-10503",
                                "key": "-10503"
                            },
                            {
                                "title": "浏览框",
                                "com": [
                                    {
                                        "browserParam": {
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
                                            "linkUrl": "/hrm/resource/HrmResource.jsp?id=",
                                            "pageSize": 10,
                                            "quickSearchName": "",
                                            "title": "人力资源",
                                            "type": "1",
                                            "viewAttr": 2
                                        },
                                        "key": "-15223",
                                        "label": "",
                                        "type": "BROWSER",
                                        "viewAttr": 0,
                                        "width": "80%"
                                    }
                                ],
                                "dataIndex": "-15223",
                                "key": "-15223"
                            },
                            {
                                "title": "check框",
                                "com": [
                                    {
                                        "key": "-13108",
                                        "label": "",
                                        "type": "CHECKBOX",
                                        "viewAttr": 0,
                                        "width": "80%"
                                    }
                                ],
                                "dataIndex": "-13108",
                                "key": "-13108"
                            },
                            {
                                "title": "选择框",
                                "com": [
                                    {
                                        "key": "-10454",
                                        "label": "",
                                        "options": [
                                            {
                                                "key": "0",
                                                "selected": false,
                                                "showname": "A"
                                            },
                                            {
                                                "key": "1",
                                                "selected": false,
                                                "showname": "B"
                                            },
                                            {
                                                "key": "2",
                                                "selected": false,
                                                "showname": "C"
                                            }
                                        ],
                                        "type": "SELECT",
                                        "viewAttr": 0,
                                        "width": "80%"
                                    }
                                ],
                                "dataIndex": "-10454",
                                "key": "-10454"
                            }
                        ]
                    },
                    "tabname": "自定义明细"
                }
            ],
            "title": "明细信息",
            "defaultshow": true
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

PersonInfo = WeaTools.tryCatch( React, MyErrorHandler, { error: "" })(PersonInfo);

PersonInfo = createForm()(PersonInfo);

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
export default connect(mapStateToProps, mapDispatchToProps)(PersonInfo);