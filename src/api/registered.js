/**
 * @file
 * @author: lzb
 * @params: 参数说明
 * @history:
 * Date      Version Remarks
 * ========= ======= ==================================
 * 2018/9/19      1.0     First version
 *
 */
import wepy from 'wepy'
import config from './config'
import _ from 'underscore'
import { UnAuthenticationError } from '../errors'

/**
 * 参数进行分割
 * @param data
 * @returns {{string: {字符串的键值对}, array: {数组对象的键值对}}}
 */
const paramsData = (data) => {
    let result = {
        string: {},
        array: {},
        object: {}
    }
    let params = []
    _.mapObject(data, function(val, key) {
        if(_.isArray(val)) {
            result.array[key] = val
        } else if (_.isObject(val)) {
            result.object = val
        } else {
            params.push(`${key}=${val}`)
        }
    })
    result.string = '?' + params.join('&')
    return result
}

const fetch = (actionObj) => {
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
        let {data: {data, status, message}} = respone
        if (200 !== status) throw new Error(message)
        return data
    })
}

export default {
    // 获取职能跟对应的兴趣
    weclomeSwiper(params) {
        return fetch({method: 'post', url: 'common/v1/getImage', params: params, isVisitor: true})
    },
    // 获取职能跟对应的兴趣
    userInfo(params) {
        return fetch({method: 'post', url: 'userprofile/v1/userInfo', params: params})
    },
    // 获取职能跟对应的兴趣
    profileList(params) {
        return fetch({method: 'post', url: 'userprofile/v2/profileList', params: params})
    },
    // 提交兴趣
    userProfile(params) {
        return fetch({method: 'post', url: 'userprofile/v2/userProfile', params: params})
    },
    // 为你推荐的轮番图
    recommendCourse(params) {
        return fetch({method: 'post', url: 'userprofile/v1/recommendCourse', params: params})
    },
    // 发送验证码
    setVerCode(params) {
        return fetch({method: 'post', url: 'userprofile/v1/getVerCode', params: params})
    },
    // 校验短信验证码
    checkVerCode(params) {
        return fetch({method: 'post', url: 'userprofile/v1/checkVerCode', params: params})
    },
    // 保存手机号码
    savePhone(params) {
        return fetch({method: 'post', url: 'userprofile/v1/mobile', params: params})
    },

    /*--------------------课后练习-----------------------*/
    // 评论列表数据
    discussList(params) {
        return fetch({method: 'post', url: 'reviewTestPost/v1/postList', params: params})
    },
    // 评论列表点赞
    discussLink(params) {
        return fetch({method: 'post', url: 'reviewTestPost/v1/postLike', params: params})
    },
    // 发送评论
    discussLeaveMessage(params) {
        return fetch({method: 'post', url: 'reviewTestPost/v1/post', params: params})
    },
    /*--------------------微课完成-----------------------*/
    // 发送评论
    sendFinish(params) {
        return fetch({method: 'post', url: 'course/sendFinish', params: params})
    },
    // 发送评论
    sendFinishResults(params) {
        return fetch({method: 'post', url: 'MVP3/getSenceFinishInitPage', params: params})
    },

    /*--------------------微课-----------------------*/
    // 课程详情
    courseDetail(params) {
        return fetch({method: 'post', url: 'MVP5/getCourseDetail', params: params, isVisitor: true})
    },
    // 课程详情
    courseShareCount(params) {
        return fetch({method: 'post', url: 'sence/senceShareRecord', params: params, isVisitor: true})
    },

    /*--------------------发现页-----------------------*/
    // 发现页列表
    discoverPage(params) {
        return fetch({method: 'post', url: 'discover/v1/discoverPage', params: params, isVisitor: true})
    },

    /*--------------------测评-----------------------*/
    // 获得测评题目
    getExamPracticeList(params) {
        return fetch({method: 'post', url: 'userExam/getExamPracticeList', params: params, isVisitor: true})
    },
    // 获得测评题目
    sendUserDoExam(params) {
        return fetch({method: 'post', url: 'userExam/sendUserDoExam', params: params, isVisitor: true})
    }
}