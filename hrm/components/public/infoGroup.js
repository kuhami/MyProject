import {Row,Col,Icon} from 'antd'


class InfoGroup extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            showGroup: props.showGroup ? props.showGroup : true
        }
    }
    componentWillReceiveProps(nextProps) {
   
    }
	render() {
        const {title,items,colLeft=3,colRight=9} = this.props;
        const {showGroup} = this.state;
        const colArr = [];
        items && items.forEach((obj,index)=>{
            const rightLabel = index%2 !== 0;
            const config = rightLabel ? { span:colLeft-1,offset:1} : {span:colLeft}
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

export default InfoGroup