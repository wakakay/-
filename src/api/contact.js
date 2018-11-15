import wepy from 'wepy'
import config from './config'

export const sendLink = ({ token }) => {
    if ('defaultToken'===token || null==token) throw new UnAuthenticationError() 
    return wepy.request({
        url: `${config.baseUrl}customer/sendMessage?token=${token}`,
        method: 'POST'
    })
    .then(({ data: { data, status, message } }) => {
        if (200 !== status) throw new Error(message)
        return { ...data }
    })
}

export const sendExtendLink = ({ token, courseID, senceID, index }) => {
    return wepy.request({
        url: `${config.baseUrl}customer/sendMessageExtendLink?token=${token}&courseID=${courseID}&senceID=${senceID}&index=${index}`,
        method: 'POST'
    })
    .then(({ data: { data, status, message } }) => {
        if (200 !== status) throw new Error(message)
        return { ...data }
    })
}
