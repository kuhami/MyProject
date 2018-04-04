import { WeaTools } from 'ecCom'

export const getDatas = params => {
	return WeaTools.callApi('/', 'GET', params);
}
export const queryFieldsTree = (params) => {
    return WeaTools.callApi('/api/hrm/base/getHrmSearchTree', 'GET', params);
}
export const treeSearch = (params) => {
	return WeaTools.callApi('/api/hrm/base/getHrmSearchTree','GET',params)
}
