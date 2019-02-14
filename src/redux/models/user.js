/**
 * @file
 * @author: lzb
 * @params: 参数说明
 * @history:
 * Date      Version Remarks
 * ========= ======= ==================================
 * 2019/2/13      1.0     First version
 *
 */
import wepy from 'wepy'
import {store} from '../store'
import { getStore, connect } from "wepy-redux"
import {ROUTERS, SCENE} from '../../utils/dictionary'
import {fetch} from '../../api'
import {CancelAuthenticationError, RejectAuthenticationError, CustomError, UnAuthenticationError} from '../../errors'
import _ from 'underscore'

const initialState = {
    firstAccess: 0,
    name: 'GUEST',
    avatar: '../../assets/img/icon-info.svg',
    equipmentModel: '未知',
    pixelRatio: 2,
    platform: 'defaultPlatform',
    phone: 'deadNumber',
    code: 'xxx',
    token: 'defaultToken',
    role: '普通用户',
    unionID: null,
    windowHeight: 0,
    windowWidth: 0,
    screenHeight: 0
}

const setStorage = (storeInfo) => {
    _.mapObject(storeInfo, (value, key) => {
        wepy.setStorage({
            key: key,
            data: value
        })

        if ('hasGift' === key && _.isBoolean(value) && !value) {
            storeInfo.isShowGift = true
            wepy.setStorage({
                key: 'isShowGift',
                data: true
            })
        }
    })
    _.extend(initialState, storeInfo)
}

/**
 * 一进入小程序就获取微信的登录，拿到code，交给后端获取tokenID
 * @returns {function(*, *)}
 */
export const getLoginToken = () => (dispatch, getState) => {
    let sourceName = ''
    let entr = getStore().getState().entrance.scenceID
    let path = getStore().getState().entrance.path
    let query = getStore().getState().entrance.query // 二维码进来的参数

    if (query.source) { // 地址栏的source有带直接给
        sourceName = query.source
    } else if (SCENE[entr]) { // 是否又在场景值中
        sourceName = SCENE[entr]
    } else if (ROUTERS[path]) { // 匹配路由中的sence
        sourceName = ROUTERS[path].sence
    }

    sourceName = sourceName || 'other'
    let urlEnd = '&source=' + sourceName

    let storeInfo = {}
    return new Promise((resolve, reject) => {
        return wepy.login().then(respone => {
            if ('login:ok' !== respone.errMsg) throw new CustomError('登录失败')
            storeInfo.code = respone.code
            return wepy.getSystemInfo()
        }).then(respone => {
            // 记录设备信息
            if ('getSystemInfo:ok' !== respone.errMsg) {
                throw new CustomError('获取用户设备失败')
            }
            _.extend(storeInfo, respone)
            delete storeInfo.errMsg

            wepy.$instance.globalData.getShareHuilder(entr, sourceName) // ga统计

            let postData = {
                code: storeInfo.code,
                source: sourceName,
                sceneName: entr
            }
            return fetch.getLogin(postData)
        }).then(respone => {
            respone.name = respone.nickName
            _.extend(storeInfo, respone)
            delete storeInfo.nickName
            setStorage(storeInfo)
            return getState()['user']
        })
    })
}

/**
 * 更新当前用户的code
 * @param dispatch
 * @returns {Promise<{errMsg: *, code?: *}>}
 */
export const renewWechatCode = dispatch => {
    return wepy.login().then(({ errMsg, code }) => {
        code && setStorage({code: code}) || new Error(false)
        return { errMsg, code }
    }).catch(error => Promise.reject(error))
}

/**
 * 更新当前是否显示专属礼包
 * @param role
 * @returns {function(*, *)}
 */
export const renewUserGiftBox = isShowGift => (dispatch, getState) => {
    debugger
    wepy.setStorage({
        key: 'isShowGift',
        data: isShowGift
    })
    return isShowGift && setStorage({isShowGift: isShowGift})
}

/**
 * 更新当前用户的角色身份
 * @param role
 * @returns {function(*, *)}
 */
export const renewUserRole = role => (dispatch, getState) => {
    return role && setStorage({role: role})
}

/**
 * 验证微信登陆session是否还有效
 * @returns {function(*, *=)}
 */
export const checkLoginStatus = () => (dispatch, getState) => {
    let { name, avatar, code, phone, token, windowWidth, windowHeight, screenHeight } = getState && getState().user
    // wx.clearStorage()
    return wepy.checkSession()
        .then(({ errMsg }) => {
            if ('checkSession:ok' !== errMsg) {
                throw errMsg // session失效
            } else {
                return true // session有效
            }
        }).catch(errMsg => {
            return wepy.login().catch(err => {
                setStorage({token: 'defaultToken'})
                throw 'login:no'
            })
        }).then(flag => {
            return 'login:online' // cb通知外层已经登陆
        }).catch(respone => {
            setStorage({token: 'defaultToken'})
            if (respone && JSON.stringify(respone).includes('session time out')) throw 'login:no'
            if (respone && JSON.stringify(respone).includes('cgi response is empty')) throw 'login:no'
            throw respone
        }).catch(respone => {
            throw respone
        })
}

/**
 * 更新当前用户的信息
 * @param respone
 * @returns {function(*, *)}
 */
export const refreshUserInformations = (respone) => (dispatch, getState) => {
    return setStorage(respone)
}

export const userReducer = (user = initialState, action) => {
    return initialState
}
