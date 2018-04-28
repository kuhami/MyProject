import Route from "react-router/lib/Route"
import IndexRedirect from "react-router/lib/IndexRedirect"

import Home from "./components/Home.js"
/*查询人员*/
import Search from "./components/Search/Search.js"
import SearchResult from "./components/Search/SearchResult.js"
import CustomQueryCondition from "./components/Search/CustomQueryCondition.js"

/*我的卡片*/
import MyCard4Formal from "./components/MyCard/index4Formal"
import BasicInfo4Formal from "./components/MyCard/BasicInfo4Formal"
import PositionExplains from "./components/MyCard/PositionExplains"//(标准产品暂无)
import PersonalInfo from "./components/MyCard/PersonalInfo"
import SysInfo from "./components/MyCard/SysInfo"
import SalaryWelfare from "./components/MyCard/SalaryWelfare"
import AssetInfo from "./components/MyCard/AssetInfo"
import ListDoing from "./components/MyCard/ListDoing"
import Attendance from "./components/MyCard/Attendance"
import TrainingRecord from "./components/MyCard/TrainingRecord"
import RewardsAndPunishments from "./components/MyCard/RewardsAndPunishments"



/*新建人员*/
import Add from "./components/Add.js"

import "./css/icon.less"

import reducer from "./reducers/"
import * as SearchAction from "./actions/search"
import * as AddAction from "./actions/add";
import * as MyCardAction from "./actions/myCard";


const hrmRoute = (
  <Route path="hrm" component={ Home }>
    <Route name="resource4Formal" path="resource4Formal" component={ MyCard4Formal }>
      <IndexRedirect to="HrmResourceBase4Formal"/>
      <Route name='HrmResourceBase4Formal' path='HrmResourceBase4Formal' component={BasicInfo4Formal}/> 
      <Route name='HrmResourcePersonalView' path='HrmResourcePersonalView' component={PersonalInfo}/> 
      <Route name='HrmResourceSystemView' path='HrmResourceSystemView' component={SysInfo}/> 
      <Route name='HrmResourceFinanceView' path='HrmResourceFinanceView' component={SalaryWelfare}/> 
      <Route name='HrmResourceAbsense' path='HrmResourceAbsense' component={Attendance}/> 
      <Route name='HrmResourceTrainRecord' path='HrmResourceTrainRecord' component={TrainingRecord}/>
      <Route name='HrmResourceRewardsRecordView' path='HrmResourceRewardsRecordView' component={RewardsAndPunishments}/>
    </Route>
    <Route name="search" path="search" component={ Search }/>
    <Route name="SearchResult" path="SearchResult" component={ SearchResult }/>
    <Route name="customQueryCondition" path="customQueryCondition" component={ CustomQueryCondition }/>
    <Route name="add" path="add" component={ Add }/>
  </Route>
)

module.exports = {
  Route: hrmRoute,
  reducer,
  action: {
  	SearchAction,
    AddAction,
    MyCardAction,
  }
}