import { WeaTools } from 'ecCom'

export const getDatas = params => {
	return WeaTools.callApi('/', 'GET', params);
}