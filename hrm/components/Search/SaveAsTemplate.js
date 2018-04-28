import {Row,Col,Icon,Input,Modal} from 'antd'

const config ={
    title:"模板",
    label:'存为模板',
}
class Main extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            showGroup:  true,
        }
    }
    inputOnChange=(e)=>{
        if(typeof this.props.inputOnChange == 'function'){
            this.props.inputOnChange(e.target.value);
        }
    }
	render() {
        const {title='',showModal=false} = this.props;
        const {showGroup,modalVisible} = this.state;
        return (
            <div>
                <div  style={{background:'#55D2D4'}}>
                    <span  style={{fontSize:35, color: "#55D2D4", backgroundColor: "#f9f9f9"}} />
                </div>
                <Row className="" style={{borderBottom:'1px solid #e9e9e9'}}>
                    <Col span="20" style={{height:32}}>
                        <span>{config.title}</span>
                    </Col>
                    <Col span="4" style={{textAlign:"right",paddingRight:10,fontSize:12}}>
                        <Icon type={showGroup ? 'up' : 'down'} 
                            style={{cursor:'pointer',fontSize:'12px',position:'absolute',top:'4px'}} 
                            onClick={()=>this.setState({showGroup:!showGroup})}/>
                    </Col>
                </Row>
                <Row className="" style={showGroup?{marginBottom:10,marginTop:10}:{height:0,overflow:'hidden'}}>
                    <Col span={4}>
                        <p style={{textAlign:'right',paddingRight:20}}>{config.label}</p>
                    </Col>
                    <Col span={16}>
                        <Input  onChange={this.inputOnChange.bind(this)}/>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default Main;
/*   <div className="">
                <Row className="">
                    <Col span={2}>
                        <i className='icon-coms-hrm'/>
                    </Col>
                    <Col span={4}>
                        <span>{config.title}</span>
                    </Col>
                    <Col span={18} style={{textAlign:"right",paddingRight:10,fontSize:12}}>
                        <Icon type={showGroup ? 'up' : 'down'} onClick={()=>this.setState({showGroup:!showGroup})}/>
                    </Col>
                </Row>
                <Row className="" style={showGroup?{marginBottom:'10px'}:{height:0,overflow:'hidden'}}>
                    <Col span={4}>
                        <p style={{textAlign:'right',lineHeight:'32px',paddingRight:'20px'}}>{config.label}</p>
                    </Col>
                    <Col span={16}>
                        <Input  onChange={this.inputOnChange.bind(this)}/>
                    </Col>
                </Row>
            </div>*/