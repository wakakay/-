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
    }
}
