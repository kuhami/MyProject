import Route from "react-router/lib/Route"

import Home from "./components/Home"
import MyDoc from "./components/MyDoc"
import Search from "./components/Search/Search"
import SearchResult from "./components/Search/SearchResult"
import Directory from "./components/Directory"
import Dummy from "./components/Dummy"
import Latest from "./components/Latest"
import Rank from "./components/Rank"
import Subscription from "./components/Subscription"
import BatchSharing from "./components/BatchSharing"
import Monitor from "./components/Monitor"
import DocLog from "./components/DocLog"
import Detail from "./components/Detail"

import "./css/icon.css"

import reducer from "./reducers/"
import * as ComsAction from "./actions/coms"
import * as MyDocAction from "./actions/myDoc"
import * as SearchAction from "./actions/search"
import * as DirectoryAction from "./actions/directory"
import * as DummyAction from "./actions/dummy"
import * as LatestAction from "./actions/latest"
import * as RankAction from "./actions/rank"
import * as SubscriptionAction from "./actions/subscription"
import * as BatchSharingAction from "./actions/batchSharing"
import * as MonitorAction from "./actions/monitor"
import * as DocLogAction from "./actions/docLog"
import * as DetailAction from "./actions/detail"

const documentRoute = (
  <Route path="document" component={ Home }>
    <Route name="myDoc" path="myDoc" component={ MyDoc }/>
    <Route name="search" path="search" component={ Search }/>
    <Route name="searchResult" path="searchResult" component={ SearchResult }/>
    <Route name="directory" path="directory" component={ Directory }/>
    <Route name="dummy" path="dummy" component={ Dummy }/>
    <Route name="latest" path="latest" component={ Latest }/>
    <Route name="rank" path="rank" component={ Rank }/>
    <Route name="subscription" path="subscription" component={ Subscription }/>
    <Route name="batchSharing" path="batchSharing" component={ BatchSharing }/>
    <Route name="monitor" path="monitor" component={ Monitor }/>
    <Route name="docLog" path="docLog" component={ DocLog }/>
    <Route name="detail" path="detail" component={ Detail }/>
  </Route>
)

module.exports = {
  Route: documentRoute,
  reducer,
  action: {
  	ComsAction,
    MyDocAction,
    DirectoryAction,
    SearchAction,
    DummyAction,
    LatestAction,
    RankAction,
    SubscriptionAction,
    BatchSharingAction,
    MonitorAction,
    DocLogAction,
    DetailAction
  }
}