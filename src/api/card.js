import wepy from 'wepy'
import { getStore } from 'wepy-redux'
import config from './config'
import { UnAuthenticationError, LessonPermissionDenyError } from '../errors'

export const getPracticeList = ({ token = 'defaultToken', cardID = 'defaultCardID', senceID = 'defaultSenceID', courseID = 'defaultCourseID', requestFlag, teamID = 'defaultTeamID' }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}MVP3/getSenceCardListByPractice?token=${token}&cardID=${cardID}&senceID=${senceID}&courseID=${courseID}&requestFlag=${requestFlag}&teamID=${teamID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (-99991 === status) throw new LessonPermissionDenyError({senceID, courseID})
            if (200 !== status) throw new Error(message)
            return {...data, requestFlag }
        })
}

export const getCardList = ({ token = 'defaultToken', senceID = 'defaultSenceID', courseID = 'defaultCourseID', requestFlag, teamID = 'defaultTeamID' }) => {
    if ('' === token || 'defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}MVP3/getSenceCardListByGoPracticeLink?token=${token}&senceID=${senceID}&courseID=${courseID}&requestFlag=${requestFlag}&teamID=${teamID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (-99991 === status) throw new LessonPermissionDenyError({senceID, courseID})
            if (200 !== status) throw new Error(message)
            return {...data, requestFlag }
        })
}

//8/28
export const getCardListWithPreview = ({ token = 'defaultToken', senceID = 'defaultSenceID', courseID = 'defaultCourseID', requestFlag, teamID = 'defaultTeamID', source='' }) => {
    if ('' === token || 'defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}MVP3/getSenceCardListByGoPracticeLinkByNeedPayToTry?token=${token}&senceID=${senceID}&courseID=${courseID}&requestFlag=${requestFlag}&teamID=${teamID}&source=${source}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (-99991 === status) throw new LessonPermissionDenyError({senceID, courseID})
            if (200 !== status) throw new Error(message)
            return {...data, requestFlag }
        })
}

export const markCard = ({ token = 'defaultToken', courseID = 'defaultCourseID', senceID = 'defaultSenceID', cardID, requestFlag, teamID = 'defaultTeamID' }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}courseV2/sendCard?token=${token}&senceID=${senceID}&cardID=${cardID}&requestFlag=${requestFlag}&teamID=${teamID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const sendCardScore = ({ token = 'defaultToken', senceID = 'defaultSenceID', cardID = 'defaultCardID', score, weight = 0, message = 'defaultMessage', abilityGroup = 'defaultAbilityGroup', abilitySkill = 'defaultAbiitySkill', questionIndex = 0, json = 'defaultJson' }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
        url: `${config.baseUrl}practice/sendPracticeCard?token=${token}&senceID=${senceID}&cardID=${cardID}&message=${message}&abilityGroup=${abilityGroup}&abilitySkill=${abilitySkill}&score=${score}&weight=${weight}&questionIndex=${questionIndex}&json=${encodeURIComponent(json)}`,
        method: 'POST'
    })
}

export const getStudyConclusion = ({ token = 'defaultToken', senceID = 'defaultSenceID', cardID = 'defaultCardID' }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
        url: `${config.baseUrl}practice/getPracticeTotalScore?token=${token}&senceID=${senceID}&cardID=${cardID}`,
        method: 'POST'
    })
}