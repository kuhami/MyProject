import { WeaTools } from 'ecCom'

export const getTopTab = params => {
	return WeaTools.callApi('/api/doc/log/tabInfo', 'GET', params);
}