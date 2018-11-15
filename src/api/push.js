import wepy from 'wepy'
import config from './config'
import { UnAuthenticationError } from '../errors'

export const savePushCode = (token, code) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}push/sendPushCode?token=${token}&code=${code}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return true
        })
}

export const sendFeedBack = ({ token, courseID, senceID, cardID, type }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}MVP5/sendFeedBackSelect?token=${token}&courseID=${courseID}&senceID=${senceID}&cardID=${cardID}&type=${type}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            return 200 === status
        })
}

export const sendPollSelection = ({ token, cardID, optionList }) => {
  if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
  let mString = optionList
  if (optionList.forEach) mString.join(',')
  return wepy.request({
          url: `${config.baseUrl}report/reportUserPollOption?token=${token}&cardID=${cardID}&optionList=${mString}`,
          method: 'POST'
      })
      .then(({ data: { data, status, message } }) => {
          return 200 === status
      })
}