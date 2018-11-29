import wepy from 'wepy'
import config from './config'
import { InnerError, NetworkError, UnAuthenticationError } from '../errors'

export const getCourseList = ({ token }) => {
        if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
        return wepy.request({
                url: `${config.baseUrl}courseV2/getMyCourseList?token=${token}`,
                method: 'POST'
            })
            .then(({ data: { data, status, message } }) => {
                if (200 !== status) throw new NetworkError(message)
                return data
            })
    } // end getCourseList

export const getMVP5Courses = ({ token }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            // url: `${config.baseUrl}MVP5/homePage2?token=${token}`,
            url: `${config.baseUrl}MVP5/homePageByEditor?token=${token}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new NetworkError(message)
            return data
        })
}

export const getDisvoeryCourses = ({ token }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}discover/getDiscoverPage?token=${token}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new NetworkError(message)
            return data
        })
}

export const getMyCardList = ({ token }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}course/getMyCourseList?token=${token}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const getReview = ({ token, courseID, senceID, teamID }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}MVP3/getReview?token=${token}&courseID=${courseID}&senceID=${senceID}&teamID=${teamID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new NetworkError(message)
            return data
        })
}

export const sendFinish = ({ token, senceID, courseID, requestFlag, teamID }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}course/sendFinish?token=${token}&courseID=${courseID}&senceID=${senceID}&requestFlag=${requestFlag}&teamID=${teamID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new NetworkError(message)
            return data
        })
}

export const sendFeedback = ({ token, senceID: senceid, star, teamID }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}course/sendFeedback?token=${token}`,
            data: { senceid, star, teamID },
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new NetworkError(message)
            return true
        })
}

export const getMyCenter = ({ token }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
        url: `${config.baseUrl}MVP3/getMyCenter?token=${token}`,
        method: 'POST'
    }).then(({ data: { data, status, message } }) => {
        if (200 !== status) throw new NetworkError(message)
        return data
    })
}

export const getMyCenterNew = ({ token }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
        url: `${config.baseUrl}userCenter/userCenterInitPage?token=${token}`,
        method: 'POST'
    }).then(({ data: { data, status, message } }) => {
        if (200 !== status) throw new NetworkError(message)
        return data
    })
}

export const getMyPayCourse = ({ token }) => {
        if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
        return wepy.request({
            url: `${config.baseUrl}MVP3/getMyPayCourse?token=${token}`,
            method: 'POST'
        }).then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new NetworkError(message)
            return data
        })
    } ///api/MVP3/getMyLearnCourse


export const getMyLearnCourse = ({ token, skill }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
        url: `${config.baseUrl}MVP3/getMyLearnCourse?token=${token}&skill=${skill}`,
        method: 'POST'
    }).then(({ data: { data, status, message } }) => {
        if (200 !== status) throw new NetworkError(message)
        return data
    })
}

export const addTestUser = ({ token, otherLink: otherLink }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
        url: `${config.baseUrl}MVP3/addTester?token=${token}&otherLink=${otherLink}`,
        method: 'POST'
    }).then(({ data: { data, status, message } }) => {
        if (200 !== status) throw new NetworkError(message)
        return true
    })
}

export const getTestUserDetail = ({ token }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
        url: `${config.baseUrl}userCenter/initSendTestPage?token=${token}`,
        method: 'POST'
    }).then(({ data: { data, status, message } }) => {
        if (200 !== status) throw new NetworkError(message)
        return data
    })
}

export const exchangeCourse = ({ token, courseID }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
        url: `${config.baseUrl}MVP3/payByCoupon?token=${token}&courseID=${courseID}`,
        method: 'POST'
    }).then(({ data: { data, status, message } }) => {
        if (200 !== status) throw new NetworkError(message)
        return true
    })
}

export const getAllLesson = ({ token }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
        url: `${config.baseUrl}MVP5/getAllLessonByPay?token=${token}`,
        method: 'POST'
    }).then(({ data: { data, status, message } }) => {
        if (200 !== status) throw new NetworkError(message)
        return data
    })
}

export const getMyLesson = ({ token }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
        url: `${config.baseUrl}MVP5/myLearning?token=${token}`,
        method: 'POST'
    }).then(({ data: { data, status, message } }) => {
        if (200 !== status) throw new NetworkError(message)
        return data
    })
}

export const getCourseDetail = ({ token, courseID, source, wxPushType }) => {
    // if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
        url: `${config.baseUrl}MVP5/getCourseDetail?token=${token}&courseID=${courseID}&source=${source || wxPushType}`,
        method: 'POST'
    }).then(({ data: { data, status, message } }) => {
        if (200 !== status) throw new NetworkError(message)
        return data
    })
}

export const getSelectCourseByID = ({ token, courseID, wxPushType }) => {
    // if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
        url: `${config.baseUrl}MVP5/getSelectCourseByID2?token=${token}&courseID=${courseID}&source=${wxPushType}`,
        method: 'POST'
    }).then(({ data: { data, status, message } }) => {
        if (200 !== status) throw new NetworkError(message)
        return data
    })
}



export const getGiftDetail = ({ token, courseID }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
        url: `${config.baseUrl}gift/getGiftDetailByOnlyBonus?token=${token}`,
        method: 'POST'
    }).then(({ data: { data, status, message } }) => {

        if (200 !== status) throw new NetworkError(message)
        return data
    })
}


export const sendCourseUserEvent = ({ token, courseID, senceID }) => {
    let mUrl = `${config.baseUrl}report/sendCourseUserEvent?token=${token}&courseID=${courseID}`
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    if (senceID) mUrl += `&senceID=${senceID}`
    return wepy.request({
        url: mUrl,
        method: 'POST'
    }).then(({ data: { data, status, message } }) => {

        if (200 !== status) throw new NetworkError(message)
        return data
    })
}

export const sendCoursePageTime = ({ token, courseID, pageTime }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
        url: `${config.baseUrl}report/sendCoursePageTime?token=${token}&courseID=${courseID}&pageTime=${pageTime}`,
        method: 'POST'
    }).then(({ data: { data, status, message } }) => {

        if (200 !== status) throw new NetworkError(message)
        return data
    })
}
export const getDiscoverSeries = ({ token }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
        url: `${config.baseUrl}discover/getDiscoverPageByCourseSeries?token=${token}`,
        method: 'POST'
    }).then(({ data: { data, status, message } }) => {

        if (200 !== status) throw new NetworkError(message)
        return data
    })
}

//为你推荐  /api/discover/v1/getAnotherRecommendCourse
export const getAnotherRecommendCourse = ({ token }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
        url: `${config.baseUrl}discover/v1/getAnotherRecommendCourse?token=${token}`,
        method: 'POST'
    }).then(({ data: { data, status, message } }) => {

        if (200 !== status) throw new NetworkError(message)
        return data
    })
}

export const getCourseIndex = ({ token }) => {
    //if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
        url: `${config.baseUrl}discover/getDiscoverPageByCourseSeriesByLink?token=${token}`,
        method: 'POST'
    }).then(({ data: { data, status, message } }) => {
        if (200 !== status) throw new NetworkError(message)
        return data
    })
}

export const getDiscoverPageByCourseSeriesByLinkByDetail = ({ token }) => {
    if (null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}discover/getDiscoverPageByCourseSeriesByLinkByDetail?token=${token}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const getDiscoverPageByCourseSeriesByLinkByDetailNew = ({ courseSeriesID, token }) => {
    if (null == token) throw new UnAuthenticationError()
    return wepy.request({
        url: `${config.baseUrl}discover/v1/getDiscoverPageByCourseSeriesByLinkByDetailNew?token=${token}&courseSeriesID=${courseSeriesID}`,
        method: 'POST'
    })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const getMyLearningPage = ({ token }) => {
    if (null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}myLearning/getMyLearningPage?token=${token}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}


export const getSeriesTabByCourseListBySeriesID = ({ token, seriesID }) => {
    if (null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}myLearning/getSeriesTabByCourseListBySeriesID?token=${token}&seriesID=${seriesID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const getMyLearningPageBySkill = ({ token }) => {
    if (null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}/myLearning/getMyLearningPageBySkill?token=${token}`,
            method: 'POST'
        }).then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const getMyLearningSenceList = ({ token }) => {
    if (null == token) throw new UnAuthenticationError()
    return wepy.request({
        url: `${config.baseUrl}/myLearning/v1/getMyLearningSenceList?token=${token}`,
        method: 'POST'
    }).then(({ data: { data, status, message } }) => {
        if (200 !== status) throw new Error(message)
        return data
    })
}

export const getMyLearningPageBySkillgetDetail = ({ token }) => {
    if (null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}/myLearning/getMyLearningPageBySkillgetDetail?token=${token}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}
