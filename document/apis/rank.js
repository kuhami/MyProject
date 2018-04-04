import { WeaTools } from 'ecCom'

export const getTopTab = params => {
	return WeaTools.callApi('/api/doc/docrank/tabInfo', 'GET', params);
}