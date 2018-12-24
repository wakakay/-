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
import wepy from 'wepy'
import config from './config'
import { UnAuthenticationError } from '../errors'
import _ from 'underscore'

/**
 * 参数分割
 * @param data
 * @returns {{string: {字符串的键值对}, array: {数组对象的键值对}}}
 */
export const paramsData = ((data) => {
    let result = {
        string: {},
        array: {},
        object: {}
    }
    let params = []
    _.mapObject(data, function (val, key) {
        if (_.isArray(val)) {
            result.array[key] = val
        } else if (_.isObject(val)) {
            result.object = val
        } else {
            params.push(`${key}=${val}`)
        }
    })
    result.string = '?' + params.join('&')
    return result
})

export const fetch = ((actionObj) => {
    // 没有token的直接抛错
    if (!actionObj.isVisitor && ('defaultToken' === actionObj.params.token || !actionObj.params.token)) {
        throw new UnAuthenticationError()
    }

    let params = paramsData(actionObj.params)
    let requestData = {
        url: `${config.baseUrl + actionObj.url + params.string}`,
        method: actionObj.method,
        data: !_.isEmpty(params.object) ? params.object : params.array
    }

    return wepy.request(requestData).then((respone) => {
        let data = respone.data
        if (!_.isUndefined(data.success)) {
            if (actionObj.isUnFilter) {
                return data
            } else {
                if (1 === data.success) {
                    return data.data
                } else {
                    wx.showToast({title: data.message})
                }
            }
        } else {
            if (200 !== data.status) {
                throw new Error(data.message)
            } else {
                return data.data
            }
        }
    })
})