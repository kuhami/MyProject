import { WeaTools } from 'ecCom';

export const getTabsRouter = (params) => {
	return  WeaTools.callApi('/api/hrm/resource/getHrmResourceTab','GET',params);
}
export const getResourceCard = (params) => {
	return  WeaTools.callApi('/api/hrm/resource/getResourceCard','GET',params);
}
export const getHrmResourceItem = (params) => {
	return  WeaTools.callApi('/api/hrm/resource/getHrmResourceItem','GET',params);
}
export const getQRCode = (params) => {
	return  WeaTools.callApi('/api/hrm/resource/getQRCode','GET',params);
}
