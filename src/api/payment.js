import wepy from 'wepy'
import { getStore } from 'wepy-redux'
import config from './config'
import { savePushCode } from './push'
import { UnAuthenticationError } from '../errors'

const store = getStore()
const SIGNTYPE = 'MD5'

export const parseRequestObj = obj => {
    let mValues = Object.values(obj)
    let mKeys = Object.keys(obj).filter((item, index) => null != mValues[index] && '' !== mValues[index])
    let mQuery = ''
    if (0 === mKeys.length) throw CustomError('at least one more valuable param of obj is needed')
    for (let item of mKeys) {
        mQuery += `${item}=${obj[item]}&`
    }
    return mQuery.slice(0, -1)
}

export const requestPreviousPayment = ({ token, code, courseID }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}weixinPay/pay?token=${token}&code=${code}&courseID=${courseID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            let { prepay_id } = data
            // savePushCode(token, prepay_id) // 取消搜集支付产生的推送码
            return data
        })
}

export const requestEncampmentPreviousPayment = ({ token, code, teamID, payType = 'wx', payPrice, paySign, unit, taxNumber, address }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    let mQuery = parseRequestObj({ token, code, teamID, payType, payPrice, paySign, unit, taxNumber, address })
    return wepy.request({
            url: `${config.baseUrl}teamCustom/teamCustomSendPay?${mQuery}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            let { prepay_id } = data
            // savePushCode(token, prepay_id) // 取消搜集支付产生的推送码
            return data
        })
}

export const requestPreviousPaymentForSpecialCourse = ({ token, code, courseID }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}weixinPay/payNew?token=${token}&code=${code}&courseID=${courseID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            let { prepay_id } = data
            // savePushCode(token, prepay_id) // 取消搜集支付产生的推送码
            return data
        })
}

export const requestPreviousPaymentWithSignature = ({ token, code, courseID = 'defaultCourseID', senceID = 'defaultSenceID', teamID = 'defaultTeamID', paySign = 'defaultPaySign', payPrice = 'defaultPayPrice' }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    console.log(`${config.baseUrl}weixinPay/payByPaySign?token=${token}&code=${code}&courseID=${courseID}&senceID=${senceID}&teamID=${teamID}&paySign=${paySign}&payPrice=${payPrice}`)
    return wepy.request({
            url: `${config.baseUrl}weixinPay/payByPaySign?token=${token}&code=${code}&courseID=${courseID}&senceID=${senceID}&teamID=${teamID}&paySign=${paySign}&payPrice=${payPrice}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            let { prepay_id } = data
            // savePushCode(token, prepay_id) // 取消搜集支付产生的推送码
            return data
        })
}

export const requestPreviousPaymentWithPayBody = ({ token, code, courseID = 'defaultCourseID', senceID = 'defaultSenceID', teamID = 'defaultTeamID', payType = 'defaultPayType', payBody = 'defaultPayBody' }) => { // 积分微信支付
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    console.log(`${config.baseUrl}weixinPay/payByPaySignByBonus?token=${token}&code=${code}&courseID=${courseID}&senceID=${senceID}&teamID=${teamID}&payType=${payType}&payBody=${encodeURIComponent(payBody)}`)
    return wepy.request({
            url: `${config.baseUrl}weixinPay/payByPaySignByBonus?token=${token}&code=${code}&courseID=${courseID}&senceID=${senceID}&teamID=${teamID}&payType=${payType}&payBody=${encodeURIComponent(payBody)}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            let { prepay_id } = data
            // savePushCode(token, prepay_id) // 取消搜集支付产生的推送码
            return data
        })
}

export const payByPaySignByJinengBin = ({ token, code, courseID = 'defaultCourseID', senceID = 'defaultSenceID', payMoney, paySign }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}weixinPay/payByPaySignByJinengBin?token=${token}&code=${code}&courseID=${courseID}&senceID=${senceID}&paySign=${paySign}&payMoney=${payMoney}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            let { prepay_id } = data
            // savePushCode(token, prepay_id) // 取消搜集支付产生的推送码
            return data
        })
}


export const requestPayment = ({ timeStamp, nonceStr, pkg, paySign }) => {
    return wepy.requestPayment({
        timeStamp,
        nonceStr,
        package: pkg,
        signType: SIGNTYPE,
        paySign
    })
}

export const singlePay = ({ token, code, courseID: courseId }) => {
        console.log('tend to pay', token, code, courseId)
        if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
        return requestPreviousPayment({
                token,
                code,
                courseId
            })
            .then(response => {
                console.log('预支付成功', response)
                return response
            })
            .then(({ appId, nonceStr, package: pkg, paySign, prepay_id, return_code, return_msg, timeStamp }) => {
                console.log('after previous payment, now in payment')
                return requestPayment({
                    timeStamp,
                    nonceStr,
                    pkg,
                    paySign
                })
            })
    } // end handlePay


export const sencePayInitPageByJiNengBin = ({ senceID, token }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}sencePay/sencePayInitPageByJiNengBin?token=${token}&senceID=${senceID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })

}


export const coursePayInitPage = ({ courseID, token }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}weixinPay/coursePayInitPage?token=${token}&courseID=${courseID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })

}

export const payByJinengBin = ({ courseID, token, senceID, code, payMoney, paySign }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}weixinPay/payByJinengBin?token=${token}&courseID=${courseID}&senceID=${senceID}&code=${code}&payMoney=${payMoney}&paySign=${paySign}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })

}