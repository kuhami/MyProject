import PropTypes from 'react-router/lib/PropTypes'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as ComsAction from '../actions/coms'
import * as DetailAction from '../actions/detail'

import { Row, Col, Tabs, Form, Button, Input, Modal } from 'antd'
const FormItem = Form.Item;

import Immutable from 'immutable'
const is = Immutable.is;

import {
	WeaReqTop,
	WeaRightMenu,
	WeaErrorPage,
	WeaTools,
	WeaTableEdit,
	WeaNewScroll,
	WeaRichText,
} from 'ecCom'


import { WeaTable } from 'comsRedux'

import DocLog from './DocLog'

import '../css/detail.less'

class Detail extends React.Component {
	static contextTypes = {
		router: PropTypes.routerShape
	}
	constructor(props) {
		super(props);
		this.isIE = !((agent.contains("Firefox") || agent.contains(" Chrome") || agent.contains("Safari") ) || agent.contains("Edge"));
		this.state = {
			id: window.location.search.split('=')[1] || props.location.query.id || '',
			scrollTop: 0,
			innerTop: 0,
			visible: false,
			richVisible: false,
			richValue: '',
			stars: props.stars || [0,0,0,0,0],
		}
		this.onTabsChange = this.onTabsChange.bind(this);
		this.onStarMouseLeave = this.onStarMouseLeave.bind(this);
	}
	componentDidMount() {
		//一些初始化请求
		let { actions } = this.props,
			{ id } = this.state;
		actions.getBasic({ docid: id });
		
		//top
		this.setState({innerTop: innerTop = $('.wea-doc-detail-content-inner').offset().top - 100 || 0})
		$('.wea-new-top-req-content')[0] && $('.wea-new-top-req-content').scroll(() => {
			let scrollTop = $('.wea-new-top-req-content').scrollTop() || 0;
			this._reactInternalInstance !== undefined && this.setState({scrollTop})
		});
		
		this.isIE && window.Load && window.Load();
	}
	componentWillReceiveProps(nextProps) {
		const keyOld = this.props.location.key;
		const keyNew = nextProps.location.key;
		//点击菜单路由刷新组件
		if(keyOld !== keyNew) {

		}
		//设置页标题
		if(window.location.pathname.indexOf('/spa/document/') >= 0 && !is(this.props.basicInfo, nextProps.basicInfo) && nextProps.basicInfo.get('docSubject') && document.title !== nextProps.basicInfo.get('docSubject'))
			document.title = nextProps.basicInfo.get('docSubject');
	}
	shouldComponentUpdate(nextProps, nextState) {
		//组件渲染控制
		return true
	}
	componentWillUnmount() {
		//组件卸载时一般清理一些状态

	}
	render() {
		let { loading, basicInfo, tabKey } = this.props,
			{ id } = this.state,
			title = basicInfo.get('docSubject') || window.pre_title;
		return (
			<div className='wea-doc-detail'>
				<WeaReqTop
	                title={title}
	                loading={loading}
	                icon={<i className='icon-coms-doc' />}
	                iconBgcolor='#ff9e3f'
	                replaceTab={this.getReplaceTab()}
	                buttons={this.getButtons()}
	                showDropIcon={true}
	                dropMenuDatas={this.getRightMenu()}
	                onDropMenuClick={this.onRightMenuClick.bind(this)}
	            >
					<div className='wea-doc-detail-content'>
						<div className='wea-doc-detail-content-main' style={{height: 700, minHeight: 700}} dangerouslySetInnerHTML={{__html: window.pre_docDetail}} />
						<div className='wea-doc-detail-content-inner'>
							<Tabs 
								activeKey={tabKey}
			                    onChange={this.onTabsChange} 
							>
								{ this.getTabPane() }
			                </Tabs>
			                <div className={`wea-doc-detail-content-inner-tab-content ${tabKey === '4' ? 'wea-doc-detail-content-inner-tab-content-log' : ''}`}>
			                	{ 
			                		(tabKey === '0' || tabKey === '3' || tabKey === '6' || tabKey === '7') && this.getTitle()
			                	}
			                	{ 
				                	tabKey === '0' &&
				                	<WeaTable
					                	sessionKey=''
					                />
				                }
			                	{ 
				                	tabKey === '1' && this.getAttr()
				                }
				                { 
				                	tabKey === '2' &&
				                	<WeaTableEdit
					                	isModalEdit={true}
					                	datas={[]}
					                	columns={[]}
					                	conditions={[]}
					                	onChange={data => console.log('data: ', data)}
					                />
				                }
				                { 
				                	tabKey === '4' && <DocLog tabType='card' docid={id} searchType={['advanced']} needScroll={false}/>
				                }
				                { 
				                	tabKey === '5' && this.getRank()
				                }
			                </div>
						</div>
					</div>
				</WeaReqTop>
				{ this.getAffix() }
            </div>
		)
	}
	//title
	getReplaceTab(){
		let { basicInfo, actions } = this.props;
		if(basicInfo.size === 0) return <span className='wea-new-top-req-title-text-sub' style={{color: '#999'}} dangerouslySetInnerHTML={{__html: window.pre_subtitle}} />
		return (
			<span className='wea-new-top-req-title-text-sub' style={{color: '#999'}}>
				<span>最后由</span>
				<span style={{marginLeft: 10}}>{basicInfo.get('doclastmoduser')}</span>
				<span style={{marginLeft: 10}}>编辑于{basicInfo.get('doclastmoddatetime')}</span>
				<span style={{marginLeft: 30, cursor: 'pointer'}} onClick={()=> {
					actions.setTabKey('4'); 
					$('.wea-new-top-req-content').animate({ scrollTop: this.state.innerTop }, 300);
				}}> 阅读 ({basicInfo.get('replaydoccount')})</span>
				<span style={{marginLeft: 20}}> 赞 ({basicInfo.get('replaydoccount')})</span>
			</span>
		)
	}
	getButtons(){
        let btnArr = [
        	<Button type="primary" onClick={()=>{}}>{`按钮`}</Button>
        ];
        return btnArr
	}
	getRightMenu(){
		return null
	}
	onRightMenuClick(){
		
	}
	//backToTop
	getAffix(){
		let arr = [
				{
					icon: 'icon-coms-export',
					content: 'TOP',
				},
				{
					icon: 'icon-coms-New-SMS',
					content: '回复(15)',
				}
			],
			{ scrollTop, visible, richVisible, richValue } = this.state,
			_arr = [];
		
		arr.map((item, i) => {
			(i !== 0 || scrollTop >= 300) && 
			_arr.push(
				<Row onClick={this.onAffixClick.bind(this,i)}>
					<Col span={8}>
						<i className={item.icon} />
					</Col>
					<Col span={16}>
						{ item.content }
					</Col>
				</Row>
			)
		});
		return (
			<div className='wea-doc-detail-affix'>
				{ _arr }
				<Modal
					wrapClassName='wea-doc-detail-reply-modal'
					width={764}
					visible={visible}
					title={'文档回复'}
					onCancel={()=>this.setState({visible: false, richVisible: false})}
					footer={
						<div className='wea-doc-detail-reply-modal-rich' style={{padding: richVisible ? 0 : 10 }}>
							<div style={{ display: richVisible ? 'none' : 'block' }} onClick={() => this.setState({richVisible: true})}>
								<i className='icon-coms-edit' /> 写回复
							</div>
							<div style={{ display: richVisible ? 'block' : 'none' }}>
								<WeaRichText 
				                    value={richValue}
				                    ckConfig={{
				                    	toolbar:[
								            { name: 'document', items: [ 'Source'] },
								            { name: 'paragraph', items: [ 'JustifyLeft', 'JustifyCenter', 'JustifyRight', '-', 'NumberedList', 'BulletedList' ] },
								            { name: 'styles', items: [ 'Format', 'Font', 'FontSize' ] },
								            { name: 'colors', items: [ 'TextColor' ] },
								            { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', ] },
								            { name: 'insert', items: [ 'Image', 'Table', 'Smiley'] }
								        ],
				                        height:100,
				                        uploadUrl: '/api/blog/fileupload/uploadimage',
				                    }}
				                    extentsConfig={{}}
				                    onChange={v=>this.setState({richValue: v})}
				                    onStatusChange={s => alert(s)}
				                    onToolsChange={(a,b,c,d) => alert(a,b,c,d)}
				            	/>
							</div>
						</div>
					}
				>
					<WeaNewScroll scrollId='wea_doc_detail_reply_modal' height={420}>
						<div className='wea-doc-detail-reply-modal-list'>
							回复列表
						</div>
					</WeaNewScroll>
				</Modal>
			</div>
		)
	}
	onAffixClick(i){
		i === 0 && $('.wea-new-top-req-content').animate({ scrollTop: 0 }, 300);
		if(i === 1){
			this.setState({visible: true});
		}
	}
	//tab
	getTabPane(){
		let { tabDatas = [
			{
				key: '0',
				title: '文档附件（10）',
			},
			{
				key: '1',
				title: '文档属性',
			},
			{
				key: '2',
				title: '文档共享',
			},
			{
				key: '3',
				title: '文档版本',
			},
			{
				key: '4',
				title: '文档日志',
			},
			{
				key: '5',
				title: '文档打分',
			},
			{
				key: '6',
				title: '相关资源',
			},
			{
				key: '7',
				title: '子文档列表',
			},
		]} = this.props;
		return tabDatas.map(data => {
            return <Tabs.TabPane tab={data.title} key={data.key} />
        })
	}
	onTabsChange(key){
		let { actions } = this.props;
		actions.setTabKey(key);
	}
	//tab inner title
	getTitle(){
		let { tabKey } = this.props,
			contentLeft = null,
			contentRight = null;
		if(tabKey === '0') {
			contentLeft = '附件列表',
			contentRight = '搜索、批量下载';
		}
		if(tabKey === '3') {
			contentLeft = '版本信息',
			contentRight = null;
		}
		if(tabKey === '6') {
			contentLeft = '相关资源信息',
			contentRight = <Button>文档订阅</Button>;
		}
		if(tabKey === '7') {
			contentLeft = '子文档列表',
			contentRight = null;
		}
		return (
			<Row className='wea-doc-detail-content-inner-title'>
				<Col span={12} style={{paddingLeft: 20}}>
					{ contentLeft }
				</Col>
				<Col span={12} style={{textAlign: 'right'}}>
					{ contentRight }
				</Col>
			</Row>
		)
	}
	
	//文档属性
	getAttr(){
		let { attrDatas = [
				{ label: '文档编号', value: '0323656464' },
				{ label: '新闻类型', value: '文档' },
				{ label: '文档版本', value: '1.0' },
				{ label: '文档状态', value: '正常' },
			] } = this.props,
			itemsLeft = [],
			itemsRight = [];
		attrDatas.map((item, i) => {
			let _item = (
				<FormItem 
					label={item.label}
	                labelCol={{span: 8}}
	                wrapperCol={{span: 16}}
				>
					<div style={{borderBottom: '1px solid #ccc',lineHeight:1.5, paddingLeft: 12}}>{item.value}</div>
				</FormItem>
			)
			i % 2 === 0 ? itemsLeft.push(_item) : itemsRight.push(_item);
		})
		return (
			<Row className='wea-doc-detail-content-inner-attr'>
				<Col span={12}>
					{ itemsLeft }
				</Col>
				<Col span={12}>
					{ itemsRight }
				</Col>
			</Row>
		)
	}
	getRank(){
		let { stars, rankList = [
			{ label: '总分', value: '215 分' },
			{ label: '平均分', value: '5.0 分' },
			{ label: '评分总人数', value: '43 人' },
		] } = this.state;
		return (
			<div className='wea-doc-detail-content-inner-tab-content-rank'>
				<p>我的评分</p>
				<div className='wea-doc-detail-content-inner-tab-content-rank-star'>
					<span>评价文档</span>
					{
						stars.map((s,index) => {
							return <i key={index} 
								className={`icon-coms-Collection${s ? '2' : ''}`} 
								onClick={this.onStarClick.bind(this,index)}
								onMouseEnter={this.onStarMouseEnter.bind(this,index)}
								onMouseLeave={this.onStarMouseLeave}
							/>
						})
					}
				</div>
				<Input type="textarea" autosize={{ minRows: 6, maxRows: 6 }} onChange={e => console.log(e.target.value)} />
				<div style={{textAlign: 'right',padding: '10px 0'}}>
					<Button type="ghost" onClick={()=>{}}>{`发布`}</Button>
				</div>
				<div className='wea-doc-detail-content-inner-tab-content-rank-list'>
					<div>总分</div>
					{
						rankList.map((item, i) => {
							return (
								<FormItem 
									label={item.label}
					                labelCol={{span: 8}}
					                wrapperCol={{span: 16}}
								>
									<span style={{color: i === 2 ? '#000' : '#ffa741', fontSize: 14}}>{item.value}</span>
								</FormItem>
							)
						})
					}
				</div>
			</div>
		)
	}
	onStarClick(key){
		let { actions } = this.props,
			{ stars } = this.state;
		//actions.setStars(stars);
	}
	onStarMouseEnter(key){
		let { stars } = this.state;
		stars = stars.map((s, i) => i <= key ? 1 : 0)
		this.setState({stars})
	}
	onStarMouseLeave(){
		let { stars } = this.props;
		this.setState({stars: [0,0,0,0,0]})
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

Detail = WeaTools.tryCatch( React, MyErrorHandler, { error: "" })(Detail);

//form 表单与 redux 双向绑定
//Detail = createForm({
//	onFieldsChange(props, fields) {
//		props.actions.saveFields({ ...props.fields, ...fields });
//	},
//	mapPropsToFields(props) {
//		return props.fields;
//	}
//})(Detail);


// 把 state map 到组件的 props 上
const mapStateToProps = state => {
	const { documentDetail } = state;
	return { 
		loading: documentDetail.get('loading'),
		basicInfo: documentDetail.get('basicInfo'),	
		tabKey: documentDetail.get('tabKey'),	
	}
}

// 把 dispatch map 到组件的 props 上
const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators({...DetailAction, ...ComsAction}, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);