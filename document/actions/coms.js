import * as types from '../constants/ActionTypes';
import { message } from 'antd';
import isEmpty from 'lodash/isEmpty';
import { WeaTools } from 'ecCom';
import { WeaTable } from 'comsRedux';
const WeaTableAction = WeaTable.action;
	// documentMyDoc,
	// documentSearch,
	// documentDirectory,
	// documentDummy,
	// documentLatest,
	// documentRank,
	// documentSubscription,
	// documentBatchSharing,
	// documentMonitor
/*
转换为大写
*/
const transferToUpcase = (p,bool=false)=>{
	p =  p.toLocaleUpperCase();
	if(bool && (p=='SEARCHRESULT')){p='SEARCH'}
	return p;
}
const getNewFiels=(fields={}) => {
	let params = {};
    if(!isEmpty(fields)){
    	for (let key in fields) {
	    	params[fields[key].name] = fields[key].value
    	}
	}
    return params
}
const searchUrls = {
	MyDoc: `${window.server || ''}/api/doc/mydocs/list`,//我的文档
	Latest: `${window.server || ''}/api/doc/latestdoc/list`,//最新文档
	Search: `${window.server || ''}/api/doc/docsearch/list`,//查询文档
	Directory: `${window.server || ''}/api/doc/doccategory/list`,//文档目录
	Dummy: `${window.server || ''}/api/doc/dummydoc/list`,//虚拟目录
	Rank: `${window.server || ''}/api/doc/docrank/list`,//知识排名
	DocLog : `${window.server || ''}/api/doc/log/list`,//文档日志
	
	Detail_file: `${window.server || ''}/api/doc/detail/docAcc`,//文档详情，附件列表
	Detail_log: `${window.server || ''}/api/doc/log/list`,//文档详情，文档日志
}
/*
搜索
*/
export const doSearch = ( module, params = {}) => {
	// console.log('doSearch--module',module);
	return (dispatch, getState) => {
		const {fields} = getState()[`document${module}`].toJS();
		const newFiells =  getNewFiels(fields);
		//== console.log('newFiells',newFiells,'params',params);
		const UpcaseModule = transferToUpcase(module);
		dispatch({
			type: types[`${UpcaseModule}_LOADING`],
			loading: true
		});


		WeaTools.callApi(searchUrls[params.type ? `${module}_${params.type}` : module], 'GET',{...newFiells,...params}).then(data => {
			const path = getState().routing.locationBeforeTransitions.pathname.split('/')[2];
			const nowModule = transferToUpcase(path,true);
			// console.log('nowModule',nowModule,'UpcaseModule',UpcaseModule)
			//if(nowModule == UpcaseModule){
				dispatch(WeaTableAction.getDatas(data.sessionkey, params.current || 1));
				dispatch({
					type: types[`${UpcaseModule}_SETDATAKEY`],
					dataKey: data.sessionkey,
					params
				})
			//}
			dispatch({
				type: types[`${UpcaseModule}_LOADING`],
				loading: false
			});
		}).catch(err=>message.error(err))
	}
}

const conditionUrls = {
	MyDoc: `${window.server || ''}/api/doc/mydocs/condition`,//我的文档
	Latest: `${window.server || ''}/api/doc/latestdoc/condition`,//最新文档
	Search: `${window.server || ''}/api/doc/docsearch/condition`,//查询文档
	Directory: `${window.server || ''}/api/doc/doccategory/condition`,//文档目录
	Dummy: `${window.server || ''}/api/doc/dummydoc/condition`,//虚拟目录
	Rank: `${window.server || ''}/api/doc/docrank/condition`,//知识排名
	DocLog : `${window.server || ''}/api/doc/log/condition`,//文档日志
}
/*
高级搜索条件
*/
export const getConditionInfo =  (module, params = {} ) => {
	const UpcaseModule = transferToUpcase(module);
	return (dispatch, getState) => {
		
		WeaTools.callApi(conditionUrls[module], 'GET', params).then(data => {
			
			const path = getState().routing.locationBeforeTransitions.pathname.split('/')[2];
		
			const nowModule = transferToUpcase(path,true);
			// console.log('nowModule',nowModule,'module',module)
			//if(nowModule == UpcaseModule){
				dispatch({
					type: types[`${UpcaseModule}_SETCONDITIONINFO`],
					conditioninfo: data.condition
				});
			//}
		}).catch(err=>message.error(err))
	}
}

const treeUrls = {
	MyDoc: `${window.server || ''}/api/doc/mydocs/treeNode`,//我的文档
	Latest: `${window.server || ''}/api/doc/latestdoc/treeNode`,//最新文档
	Search: `${window.server || ''}/api/doc/docsearch/treeNode`,//查询文档
	Directory: `${window.server || ''}/api/doc/doccategory/treeNode`,//文档目录
	Dummy: `${window.server || ''}/api/doc/dummydoc/treeNode`,//虚拟目录
}
	// Rank: `${window.server || ''}/api/doc/docrank/treeNode`,//知识排名
/*
左侧树
*/
export const getTreeDatas = (module, params = {} ) => {
	const UpcaseModule = transferToUpcase(module);
	return (dispatch, getState) => {
		
		WeaTools.callApi(treeUrls[module], 'GET', params).then(data => {
			const path = getState().routing.locationBeforeTransitions.pathname.split('/')[2];
			const nowModule = transferToUpcase(path,true);
			// console.log('nowModule',nowModule,'module',module)
			if(nowModule == UpcaseModule){
				dispatch({
					type: types[`${UpcaseModule}_SETTREEDATAS`],
					treeDatas: data.treedata,
					treeTypes: data.countcfg,
					treeCounts: data.treecount
				});
			}
		}).catch(err=>message.error(err))
	}
}

/**
日志
*/
export const showDocLog = (module,params = {}) =>{
	const UpcaseModule = transferToUpcase(module);
	return (dispatch,getState) => {
			dispatch({
				type:types[`DOCLOG_DOCID`],
				docid : params.docid 	
			});
			dispatch({
				type: types[`${UpcaseModule}_LOG`],
				showLog : params.show,
				docid : params.docid 
			});

	}
}

/**
导入虚拟目录
*/
export const showDummyImport = (module,params = {}) => {
	const UpcaseModule = transferToUpcase(module);
    return (dispatch,getState) => {
    	const {fields} = getState()[`document${module}`].toJS();
		const newFiells =  getNewFiels(fields);
        dispatch({
            type: types[`${UpcaseModule}_IMPORT`],
            dummyImport : params.dummyImport,
			importType : params.importType,
			importParam : params.importType == "all" ? newFiells : params.importParam
        });
    }
}

/*
右键菜单
*/
const rightMenuUrls = {
	MyDoc: `${window.server || ''}/api/doc/mydocs/rightMenu`,//我的文档
	Latest: `${window.server || ''}/api/doc/latestdoc/rightMenu`,//最新文档
	Search: `${window.server || ''}/api/doc/docsearch/rightMenu`,//查询文档
	Directory: `${window.server || ''}/api/doc/doccategory/rightMenu`,//文档目录
	Dummy: `${window.server || ''}/api/doc/dummydoc/rightMenu`,//虚拟目录
	Rank: `${window.server || ''}/api/doc/docrank/rightMenu`,//知识排名
	DocLog : `${window.server || ''}/api/doc/log/rightMenu`,//文档日志
	//Detail : `${window.server || ''}/api/doc/detail/rightMenu`,//文档详情
}
export const getRightMenu = (module, params = {} ) => {
	const UpcaseModule = transferToUpcase(module);
	return (dispatch,getState) => {
		WeaTools.callApi(rightMenuUrls[module], 'GET', params).then(data=>{
			dispatch({
				type:types[`${UpcaseModule}_GET_RIGHT_MENU`],
				value:data
			})
		}).catch(err=>message.error(err))
	}
}

