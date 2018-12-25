import wepy from 'wepy'
import { getStore, connect } from "wepy-redux"
import config from './config'
import {ROUTERS, SCENE} from '../utils/dictionary'
import {CancelAuthenticationError, RejectAuthenticationError, CustomError, UnAuthenticationError} from '../errors'
import _ from 'underscore'

export const getUserInfo = () => {
    let utm_source = ''
    let entr = getStore().getState().entrance.scenceID
    let path = getStore().getState().entrance.path
    let query = getStore().getState().entrance.query // 二维码进来的参数

    if (SCENE[entr]) { // 是否又在场景值中
        utm_source = SCENE[entr]
    } else if (query.source) { // 地址栏的source有带直接给
        utm_source = query.source
    } else if (ROUTERS[path]) { // 匹配路由中的sence
        utm_source = ROUTERS[path].sence
    }

    if (!utm_source) {
        utm_source = 'other'
    }

    let urlEnd = '&source=' + utm_source
    let scope = {}
    return new Promise((resolve, reject) => {
        return wepy.login()
            .then(({ errMsg, code }) => {
                scope.code = code
                if ('login:ok' !== errMsg) throw new CustomError('登录失败')
                return wepy.getSystemInfo()
            })
            .then(({ errMsg, system: equipmentSystem, version: equipmentVersion, model: equipmentModel, windowWidth, windowHeight, screenHeight, platform, statusBarHeight: statusHeight }) => {
                if ('getSystemInfo:ok' !== errMsg) throw new CustomError('获取用户设备失败')
                Object.assign(scope, { equipmentSystem, equipmentModel, equipmentVersion, windowWidth, windowHeight, screenHeight, platform, statusHeight })

                wepy.$instance.globalData.getShareHuilder(entr, utm_source) // ga统计
                console.log('scope.code', scope.code)
                return wepy.request({
                    url: `${config.baseUrl}user/login?code=${scope.code}${urlEnd}`,
                    method: 'POST',
                })
            })
            .then(({ data: { data, message, status } }) => {
                if (200 !== status) throw new CustomError(message)
                Object.assign(scope, {...data })
                return wepy.getUserInfo()
            })
            .then(res => {
                let bundle = {...res, ...scope, ...config }
                Object.assign(scope, {...res })
                return wepy.request({
                    url: `${config.baseUrl}user/sendUserInfo?token=${scope.token}`,
                    method: 'POST',
                    data: JSON.stringify({ jsonObject: bundle })
                })
            })
            .then(({ data: { data, status, message } }) => {
                if (200 !== status) throw new CustomError(message)
                return wepy.showToast({
                    title: '登录成功',
                    icon: 'fail'
                })
            })
            .then(() => {
                return resolve(scope)
            })
            .catch(err => {
                console.log(err)
                throw new CustomError(err.toString())
            })

    })
}

export const checkAuthorizationOfUserInfo = () => {
        return wepy.getUserInfo()
            .then(({ errMsg }) => {
                console.log('res 第一次微信自动校验', errMsg)
                if (errMsg && 'getUserInfo:ok' === errMsg) return true
                    // deny
                throw new RejectAuthenticationError()
            })
            .catch(error => {
                throw new RejectAuthenticationError(error.errMsg)
            })

    } // end checkUserAuthorization

export const doAuthorization = () => {
    return wepy.showModal({
            title: '提示',
            content: '必须授权登录才能即学即用，是否重新授权?',
            showCancel: false,
            cancelText: '否',
            confirmText: '去授权'
        })
        .then(({ confirm }) => {
            if (confirm) return wepy.navigateTo({ url: '/pages/NoLogin/index' })
            throw new CancelAuthenticationError()
        })
}

export const setOnlineStatu = ({ token }) => {
    let mPlatform = getStore().getState().user.platform
    return wepy.request({
            url: `${config.baseUrl}user/updateUserLogin?token=${token}&platform=${mPlatform}`,
            method: 'POST'
        }).then(({ data: { data, status, message } }) => data)
}

export const sendPhoneNumber = ({ token, code, encryptedData, iv }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}user/sendUserPhoneNumber2?token=${token}`,
            method: 'POST',
            header: {
                'content-type': 'application/json'
            }, // end header
            data: { token, code, encryptedData, iv }
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new CustomError('decryptError')
            return data
        })
}

export const doPermitTester = ({ token }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}MVP3/doPermitTester?token=${token}`,
            method: 'POST',
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new CustomError('decryptError')
            return data
        })
}
