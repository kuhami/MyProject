import { WeaTools } from 'ecCom'

export const getBasic = params => {
    return WeaTools.callApi('/api/doc/detail/basicInfo', 'GET', params);
}
