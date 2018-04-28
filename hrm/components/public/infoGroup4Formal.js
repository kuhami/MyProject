import {Row,Col,Icon} from 'antd';

class InfoGroup4Formal1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showGroup:true
        }
    }
    render() {
        const {title,items,colLeft=6,colRight=18} = this.props;
        const {showGroup} = this.state;
        const colArr = [];
        items && items.forEach((obj,index)=>{
            const config = {span:colLeft}
            colArr.push(
                <Col className="wea-info-group-content-cell-label" {...config}>
                    {obj.label ? obj.label : <div>&nbsp;</div>}
                </Col>
            );
            colArr.push(
                <Col className="wea-info-group-content-cell-value" span={colRight} >
                    {obj.value ? <div dangerouslySetInnerHTML={{__html:obj.value}}/> : <div>&nbsp;</div>}
                </Col>
            );
        })
        return (
            <div className="wea-info-group">
                <Row className="wea-info-group-title">
                    <Col span={20}>
                        <div><span className='wea-info-group-title-info'/>{title}</div>
                    </Col>
                    <Col span={4} style={{textAlign:"right",paddingRight:10,fontSize:12,lineHeight:'32px'}}>
                        <i style={{cursor: 'pointer'}} className={showGroup ? 'icon-coms-up' : 'icon-coms-down'} onClick={()=>this.setState({showGroup:!showGroup})}/>
                    </Col>
                </Row>
                <Row className="wea-info-group-content" style={showGroup ? null : {display:'none'}} >
                    {colArr}
                </Row>
            </div>
        )
    }

}

class InfoGroup4Formal2 extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            showGroup:true
        }
    }
	render() {
        const {title,items,colLeft=6,colRight1=10,colRight2=8} = this.props;
        const {showGroup} = this.state;
        const colArr = [];
        items && items.forEach((obj,index)=>{
            colArr.push(
                <Col className="wea-info-group-content-cell-label" span={colLeft}>
                    {obj.label ? obj.label : <div>&nbsp;</div>}
                </Col>
            );
            colArr.push(
                <Col className="wea-info-group-content-cell-value" span={colRight1} >
                    {obj.value ? obj.value : <div>&nbsp;</div>}
                </Col>
            );
            colArr.push(
                <Col className="wea-info-group-content-cell-value" span={colRight2} >
                    {obj.link ? <div dangerouslySetInnerHTML={{__html:obj.link}}/> : <div>&nbsp;</div>}
                </Col>
            );
        })
        return (
            <div  className="wea-info-group">
                <Row className="wea-info-group-title">
                    <Col span={20}>
                        <div><span className='wea-info-group-title-info'/>{title}</div>
                    </Col>
                    <Col span={4} style={{textAlign:"right",paddingRight:10,fontSize:12,lineHeight:'32px'}}>
                        <i style={{cursor: 'pointer'}} className={showGroup ? 'icon-coms-up' : 'icon-coms-down'} onClick={()=>this.setState({showGroup:!showGroup})}/>
                    </Col>
                </Row>
                <Row className="wea-info-group-content" style={showGroup ? null : {display:'none'}} >
                    {colArr}
                </Row>
            </div>
        )
    }
}
export {
    InfoGroup4Formal1,
    InfoGroup4Formal2
}