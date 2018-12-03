import wepy from 'wepy'
import config from './config'

export const getBeginningPage = ({ token = 'defaultToken', senceID = 'defaultSenceID' }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}previewTest/getPreviewTestFrontPage?token=${token}&senceID=${senceID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return {...data }
        })
}

export const getEndingPage = ({ token = 'defaultToken', senceID = 'defaultSenceID' }) => {
    // if ('defaultToken'===token || null==token) throw new UnAuthenticationError() 
    return wepy.request({
            url: `${config.baseUrl}previewTest/getPreviewTestFinishPage?token=${token}&senceID=${senceID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return {...data }
        })
}

export const getPreviousPracticeList = ({ token = 'defaultToken', senceID = 'defaultSenceID', courseID = 'defaultCourseID', requestFlag, teamID = 'defaultTeamID' }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}previewTest/getPreviewTestList?token=${token}&senceID=${senceID}&courseID=${courseID}&requestFlag=${requestFlag}&teamID=${teamID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (-99991 === status) throw new LessonPermissionDenyError({senceID, courseID})
            if (200 !== status) throw new Error(message)
            return {...data, requestFlag }
        })
}

export const sendCardScore = ({ token = 'defaultToken', senceID = 'defaultSenceID', cardID = 'defaultCardID', score, weight = 0, message = 'defaultMessage', abilityGroup = 'defaultAbilityGroup', abilitySkill = 'defaultAbiitySkill', questionIndex = 0, json = 'defaultJson' }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
        url: `${config.baseUrl}previewTest/sendPracticeCard?token=${token}&senceID=${senceID}&cardID=${cardID}&message=${message}&abilityGroup=${abilityGroup}&abilitySkill=${abilitySkill}&score=${score}&weight=${weight}&questionIndex=${questionIndex}&json=${encodeURIComponent(json)}`,
        method: 'POST'
    })
}

export const sendDoneAPractice = ({ token = 'defaultToken', senceID = 'defaultSenceID', cardID = 'defaultCardID', requestFlag }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}practice/sendPracticeCardRequestFlag?token=${token}&senceID=${senceID}&cardID=${cardID}&requestFlag=${requestFlag}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return {...data, requestFlag }
        })
}

export const getExamFront = ({ token = 'defaultToken', examID, wxPushType }) => {
    // if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}userExam/getExamFront?token=${token}&examID=${examID}&wxPushType=${wxPushType}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const getExamPracticeList = ({ token = 'defaultToken', examID }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}userExam/getExamPracticeList?token=${token}&examID=${examID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

//获取我的训练营Tab数据分我参与的我管理的 POST /api/myTeam/getMyTeamListByTabByCommend
export const getMyTeamListByTabByCommend = ({ token = 'defaultToken'}) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}myTeam/getMyTeamListByTabByCommend?token=${token}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

//获取我的训练营全部报名列表 POST /api/myTeam/getMyTeamSignupList
export const getMyTeamSignupList = ({ token = 'defaultToken'}) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}myTeam/getMyTeamSignupList?token=${token}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const getUserExamScore = ({ token = 'defaultToken', examID }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}userExam/getUserExamScore?token=${token}&examID=${examID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const sendUserDoExam = ({ token = 'defaultToken', json }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}userExam/sendUserDoExam?token=${token}`,
            data: json,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}