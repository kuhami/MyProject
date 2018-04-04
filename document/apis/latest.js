import { WeaTools } from 'ecCom'

export const getDatas = params => {
	return WeaTools.callApi('/', 'GET', params);
}

export const getTopTab = params => {
	return WeaTools.callApi('/api/doc/latestdoc/tabInfo', 'GET', params);
}
