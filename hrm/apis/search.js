import { WeaTools } from 'ecCom'

export const getHrmSearchCondition = (params) => {
	return  WeaTools.callApi('/api/hrm/base/getHrmSearchCondition','GET',params);
}
export const queryFieldsSearch = (params) => {
    return WeaTools.callApi('/api/hrm/base/getHrmSearchResult', 'POST', params);
}
export const queryFieldsTree = (params) => {
    return WeaTools.callApi('/api/hrm/base/getHrmSearchTree', 'GET', params);
}
export const saveHrmSearchCondition = (params) => {
	return WeaTools.callApi('/api/hrm/base/saveHrmSearchCondition','POST',params)
}
export const getHrmSearchMoudleList = (params) => {
	return WeaTools.callApi('/api/hrm/base/getHrmSearchMoudleList','GET',params)
}
export const customQueryCondition = (params) => {
	return WeaTools.callApi('/api/hrm/base/getHrmSearchUserDefine','GET',params)
}
export const saveQueryCondition = (params) => {
	return WeaTools.callApi('/api/hrm/base/saveHrmSearchUserDefine','POST',params)
}