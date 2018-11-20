import wepy from 'wepy'
import config from './config'
import { UnAuthenticationError } from '../errors'

export const fetchEpiloguePageData = ({ courseID, senceID, token, teamID }) => { // 评价页
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    if (null == teamID) throw new CustomError(`illegal teamID: ${teamID}`)
    return wepy.request({
            url: `${config.baseUrl}MVP3/prepareScorePageBySenceList?token=${token}&courseID=${courseID}&senceID=${senceID}&teamID=${teamID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const sendComments = ({ token, courseID, senceID, message, label = '' }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}MVP3/sendFeedBackMessage?token=${token}&courseID=${courseID}&senceID=${senceID}&message=${message}&label=${label}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
        .catch(error => ({ isShare: 'notshare' }))
}

export const fetchSharePageData = ({ token, giftID = '', courseID = '', senceID = '' }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    if (null == giftID) throw new CustomError(`illegal giftID: ${giftID}`)
    return wepy.request({
            url: `${config.baseUrl}MVP3/sharePage?token=${token}&courseID=${courseID}&senceID=${senceID}&giftID=${giftID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const fetchLargessData = ({ token, giftID = '', courseID = '', senceID = '' }) => {
        //if ('defaultToken' === token || null == token || ''===token) throw new UnAuthenticationError()
        return wepy.request({
                url: `${config.baseUrl}MVP3/sharePageByProgressBySenceByBonus?token=${token}&courseID=${courseID}&senceID=${senceID}&giftID=${giftID}`,
                method: 'POST'
            })
            .then(({ data: { data, status, message } }) => {
                console.log('接口状态', data, status, message)
                if (200 !== status) throw new Error(message)
                return data
            })
    } // 新版赠一得一

export const sendShareMessage = ({ token, courseID, senceID, giftID }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}MVP3/sendShareMessage?token=${token}&courseID=${courseID}&senceID=${senceID}&giftID=${giftID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const reportReceiver = ({ token, giftID }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}MVP3/sendMyReceive?token=${token}&giftID=${giftID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const getMyGiftList = ({ token }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}MVP3/getMyGiftList?token=${token}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const getReviewShare = ({ token, courseID, senceID }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}MVP3/getReviewShare?token=${token}&courseID=${courseID}&senceID=${senceID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const getCourseQrCode = ({ token, courseID, width = 120, senceID }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}common/getImageCodeByCourseID?token=${token}&CourseID=${courseID}&width=${width}&senceID=${senceID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const getLargessQrCode = ({ token, giftID, width = 120 }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}common/getImageCodeByGiftID?token=${token}&giftID=${giftID}&width=${width}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const getShareDetail = ({ token, courseID, senceID, giftID, role }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}MVP3/sharePage?token=${token}&courseID=${courseID}&senceID=${senceID}&giftID=${giftID}&role=${role}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const reportSharing = ({ token, type, courseID = 'defaultCourseID', senceID = 'defaultSenceID', teamID = 'defaultTeamID' }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}report/reportShare?token=${token}&courseID=${courseID}&senceID=${senceID}&type=${type}&teamID=${teamID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) return console.log(`向后台报告分享行为${type}失败`)
            return console.log(`向后台报告分享行为${type}成功`)
        })
        .catch(error => console.log(`向后台报告分享行为${type}失败${error.toString()}`))
}

export const getDetailOfShareCard = ({ token, teamID }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    if (null == teamID) throw new CustomError(`illegal teamID: ${teamID}`)
    return wepy.request({
            url: `${config.baseUrl}teamByTaskOneDate/initTeamShareCardPage?token=${token}&teamID=${teamID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const sendDetailOfShareCard = ({ token, teamID, shareTitle, shareLink }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    if (null == teamID) throw new CustomError(`illegal teamID: ${teamID}`)
    return wepy.request({
            url: `${config.baseUrl}teamByTaskOneDate/sendTeamShareLinkPost?token=${token}&teamID=${teamID}&shareTitle=${shareTitle}&shareLink=${shareLink}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}