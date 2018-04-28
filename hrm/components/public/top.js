import {Row, Col,Button,Dropdown,Menu}from 'antd'
const Item = Menu.Item
import cloneDeep from 'lodash/cloneDeep'

class Main extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            showDrop:false,
            height:0
        }
    }
	componentDidMount(){
	}
    render() {
    	const {showDrop,percent,end,height} = this.state;
        const {portraitConfig,children, icon,title,buttons,isFixed,buttonSpace,showDropIcon,dropMenuDatas} = this.props;//isFixed:hrm-my-card-top是否固定
        const menu = dropMenuDatas ?
        <Menu mode='vertical' onClick={o => {if(typeof this.props.onDropMenuClick == 'function') this.props.onDropMenuClick(o.key)}}>
    		{
    			dropMenuDatas.map((d, i)=> {
        			return (
        				<Item key={d.key || i} disabled={d.disabled}>
	        				<span className='wea-right-menu-icon'>{d.icon}</span>
	        				{d.content}
	        			</Item>
        			)
    		})}
    	</Menu> : '';
    	const portraitStyle = {width:'46px',height:'46px',borderRadius:'50%'}
    	let messageurl=null,lastname=null,workcode=null,sex={sex:'',value:''},orgInfo=null;
    	title.forEach(t => {
			t.name=='messagerurl' && (messageurl = t.value);
			t.name=='lastname' && (lastname = t.value);
			t.name=='workcode' && (workcode = t.value);
			t.name=='sex' && (sex = t);
			t.name=='orginfo' && (orgInfo = t.value);
		})
        return (
        	<div className="hrm-my-card-top-wapper">
	            <Row className={!!isFixed ? "hrm-my-card-top-fixed" : "hrm-my-card-top"}>
	                <Col span="14" className='hrm-my-card-top-title' style={{paddingLeft:14,paddingTop:20}}>
	                   	<span style={{verticalAlign:'middle',paddingLeft:10,paddingRight:14}}>
				   			<img style={portraitConfig.style?portraitConfig.style:portraitStyle} src={messageurl} alt=""/>
                    	</span>
						<span style={{display:'inline-block',verticalAlign:'30%'}} className='hrm-my-card-top-title-info'>
							<div style={{fontSize:14,paddingBottom:6}}><span style={{paddingRight:10}}>{lastname} {workcode ? `(${workcode})` : ''}</span>
								<span className={sex.sex=='1'?'hrm-my-card-top-title-femal':'hrm-my-card-top-title-male' }></span> 
								<span>{sex.value}</span>
							</div>
							<div style={{fontSize:12}} dangerouslySetInnerHTML={{__html:orgInfo}} />
						</span>
	                </Col>
	                <Col span="10" style={{textAlign:"right",lineHeight:'85px',paddingRight:14}}>
	                {
	                    buttons.map((data)=>{
	                        return (
	                            <span style={{display:'inline-block',lineHeight:'28px',verticalAlign:'middle',marginLeft:!!buttonSpace ? buttonSpace : 20}}>{data}</span>
	                        )
	                    })
	                }
	                {
	                	showDropIcon &&
		                <span className='hrm-my-card-top-drop-btn' onClick={()=>this.setState({showDrop:true})}>
		                	<i className="hrm-my-card-top-icon-button icon-New-Flow-menu" />
		                </span>
	                }
	                <div className='hrm-my-card-top-drop-menu wea-right-menu' onMouseLeave={()=>this.setState({showDrop:false})} style={{display:showDrop ? 'block' : 'none'}}>
	                	<span className='hrm-my-card-top-drop-btn' onClick={()=>this.setState({showDrop:false})}>
		                	<i className="hrm-my-card-top-icon-button icon-New-Flow-menu" />
		                </span>
		                <div className='wea-right-menu-icon-background'></div>
	                	{menu}
	                </div>
	                </Col>
	            </Row>
	            {
	            	children && <div className='hrm-my-card-top-content' style={{height:height}}>
		            	{children}
		            </div>
	            }
            </div>
        )
    }
}


export default Main;

