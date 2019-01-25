/**
 * @file
 * @author: lzb
 * @params: 参数说明
 * @history:
 * Date      Version Remarks
 * ========= ======= ==================================
 * 2019/1/25      1.0     First version
 *
 */

import {fetch} from './fetch-utils'

/**
 * 测评
 */
export default {
    /**
     * 上报中台埋点
     * @param examID: 测评ID
     * @param wxPushType: 中台服务通知上报
     */
    getExamFront(params) {
        return fetch({method: 'post', url: 'userExam/getExamFront', params: params})
    },
}
