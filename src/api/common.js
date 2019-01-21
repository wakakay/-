/**
 * @file
 * @author: lzb
 * @params: 参数说明
 * @history:
 * Date      Version Remarks
 * ========= ======= ==================================
 * 2018/12/24      1.0     First version
 *
 */
import {fetch} from './fetch-utils'

/**
 * 公共接口
 */
export default {
    // 通用公共功能
    commonValue(params) {
        return fetch({method: 'post', url: 'common/value', params: params, isVisitor: true})
    },
    // 通用图片功能
    commonImgUrl(params) {
        return fetch({method: 'post', url: 'common/imgUrl', params: params, isVisitor: true})
    },
    /**
     * study bar
     * @param params
     */
    getMyLearningSenceList(params) {
        return fetch({method: 'post', url: 'myLearning/v1/getMyLearningSenceList', params: params})
    },
    /**
     * 上报中台埋点
     * @param  courseID: 课程ID
     * @param  pageTime: 开始到结束的时间戳
     */
    sendCoursePageTime(params) {
        return fetch({method: 'post', url: 'report/sendCoursePageTime', params: params})
    },

    /**
     * 上报中台埋点
     * @param  code: fromID
     */
    savePushCode(params) {
        return fetch({method: 'post', url: 'push/sendPushCode', params: params})
    },
}
