import {auth as authApi} from '../../api'
import wepy from 'wepy'
import {UnAuthenticationError} from "../../errors";
import {ROUTERS} from "../../utils/dictionary";

// Contents
export const SET_USER_INFO = 'SET_USER_INFO'
export const SET_FIRST_ACCESS = 'SET_FIRST_ACCESS'
export const DROP_FIRST_ACCESS = 'DROP_FIRST_ACCESS'
export const SET_NAME = 'SET_NAME'
export const DROP_NAME = 'DROP_NAME'
export const SET_AVATAR = 'SET_AVATAR'
export const DROP_AVATAR = 'DROP_AVATAR'
export const SET_PHONE = 'SET_PHONE'
export const DROP_PHONE = 'DROP_PHONE'
export const SET_PHONE_MODEL = 'SET_PHONE_MODEL'
export const DROP_PHONE_MODEL = 'DROP_PHONE_MODEL'
export const SET_PLATFORM = 'SET_PLATFORM'
export const SET_CODE = 'SET_CODE'
export const DROP_CODE = 'DROP_CODE'
export const SET_TOKEN = 'SET_TOKEN'
export const DROP_TOKEN = 'DROP_TOKEN'
export const FETCH_TOKEN = 'FETCH_TOKEN'
export const SET_ROLE = 'SET_ROLE'
export const UNION_ID = 'UNION_ID'
export const DROP_ROLE = 'DROP_ROLE'
export const FAILURE = 'FAILURE'
export const SET_PIXEL_RATIO = 'SET_PIXEL_RATIO'
export const SET_WINDOW_WIDTH = 'SET_WINDOW_WIDTH'
export const SET_WINDOW_HEIGHT = 'SET_WINDOW_HEIGHT'
export const SET_SCREEN_HEIGHT = 'SET_SCREEN_HEIGHT'
export const SET_STATUS_BAR_HEIGHT = 'SET_STATUS_BAR_HEIGHT'

const customErrActionBundle = {
    type: FAILURE,
    payload: {
        status: 'failure',
        response: {},
        error: { message: '错误' }
    }
}

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

const customDefaultUserInfoActionBundle = (pKey) => ({
    type: FAILURE,
    payload: {
        status: 'failure',
        response: { userInfo: { avatarUrl: pKey } }
    }
})

export const getStorageAsync = ({ key }) => {
    return new Promise((resolve, reject) => {
            wx.getStorage({
                key,
                success: ({ errMsg, data }) => 'getStorage:ok' === errMsg && resolve(data) || reject(data),
                fail: error => reject({ errMsg: `get storage:fail to fetch ${key}` })
            })
        }) // end return
}

// sync Actions
export const setStatusBarHeight = (height) => ({
    type: SET_STATUS_BAR_HEIGHT,
    payload: {
        height
    }
})
export const setFirstAccess = ({ status = 'success', firstAccess, error = { message: 'Oops' } }) => ({ type: SET_FIRST_ACCESS, payload: { firstAccess } })
export const dropFirstAccess = ({ status = 'success', firstAccess, error = { message: 'Oops' } }) => ({ type: DROP_FIRST_ACCESS, payload: { firstAccess } })
export const setPlatform = ({ status = 'pending', platform = 'defaultPlatform', error = { message: 'Oops' } }) => 'success' === status ? ({ type: SET_PLATFORM, payload: { platform } }) : customErrActionBundle
export const setAvatar = ({ status = 'pending', response = {}, error = { message: 'Oops' } }) => 'success' === status ? ({ type: SET_AVATAR, payload: {...response } }) : customErrActionBundle
export const setCode = ({ status = 'pending', response = {}, error = { message: 'Oops' } }) => 'success' === status ? ({ type: SET_CODE, payload: {...response } }) : customErrActionBundle
export const setName = ({ status = 'pending', response = {}, error = { message: 'Oops' } }) => 'success' === status ? ({ type: SET_NAME, payload: {...response } }) : customErrActionBundle
export const setEquipmentPhoneModel = ({ status = 'pending', response = {}, error = { message: 'Oops' } }) => 'success' === status ? ({ type: SET_PHONE_MODEL, payload: {...response } }) : customErrActionBundle

export const setPixelRatio = ({ status = 'pending', response = {}, error = { message: 'Oops' } }) => 'success' === status ? ({ type: SET_PIXEL_RATIO, payload: {...response } }) : customErrActionBundle

export const setWindowHeight = ({ status = 'pending', response = {}, error = { message: 'Oops' } }) => 'success' === status ? ({ type: SET_WINDOW_HEIGHT, payload: {...response } }) : customErrActionBundle

export const setWindowWidth = ({ status = 'pending', response = {}, error = { message: 'Oops' } }) => 'success' === status ? ({ type: SET_WINDOW_WIDTH, payload: {...response } }) : customErrActionBundle

export const setScreenHeight = ({ status = 'pending', response = {}, error = { message: 'Oops' } }) => 'success' === status ? ({ type: SET_SCREEN_HEIGHT, payload: {...response } }) : customErrActionBundle

export const setToken = ({ status = 'pending', response = {}, error = { message: 'Oops' } }) => 'success' === status ? ({ type: SET_TOKEN, payload: {...response } }) : customErrActionBundle
export const setPhone = ({ status = 'pending', response = {}, error = { message: 'Oops' } }) => 'success' === status ? ({ type: SET_PHONE, payload: {...response } }) : customErrActionBundle
export const setRole = ({ status = 'pending', response = {}, error = { message: 'Oops' } }) => 'success' === status ? ({ type: SET_ROLE, payload: {...response } }) : customErrActionBundle
export const setUnionID = ({ status = 'pending', response = {}, error = { message: 'Oops' } }) => 'success' === status ? ({ type: UNION_ID, payload: {...response } }) : customErrActionBundle

// async Actions
export const login = () => (dispatch, getState) => {
    dispatch(setPlatform({ status: 'pending' }))
    dispatch(setToken({ status: 'pending' }))
    dispatch(setName({ status: 'pending' }))
    dispatch(setEquipmentPhoneModel({ status: 'pending' }))
    dispatch(setCode({ status: 'pending' }))
    dispatch(setPhone({ status: 'pending' }))
    dispatch(setAvatar({ status: 'pending' }))
    dispatch(setRole({ status: 'pending' }))
    dispatch(setUnionID({ status: 'pending' }))
    dispatch(setPixelRatio({ status: 'pending' }))
    dispatch(setWindowHeight({ status: 'pending' }))
    dispatch(setWindowWidth({ status: 'pending' }))
    return authApi.getUserInfo().then(response => {
            // console.log('user info *******', response)
            dispatch(setToken({ status: 'success', response }))
            dispatch(setName({ status: 'success', response }))
            dispatch(setEquipmentPhoneModel({ status: 'success', response }))
            dispatch(setCode({ status: 'success', response }))
            dispatch(setPhone({ status: 'success', response })) || dispatch(setPhone({ status: 'success', response: { phone: 'deadNumber' } }))
            dispatch(setPlatform({ platform: response.equipmentSystem.split(' ')[0].toLowerCase(), status: 'success' }))
            dispatch(setAvatar({ status: 'success', response }))
            dispatch(setRole({ status: 'success', response }))
            dispatch(setUnionID({ status: 'success', response }))
            dispatch(setPixelRatio({ status: 'success', response }))
            dispatch(setWindowHeight({ status: 'success', response }))
            dispatch(setWindowWidth({ status: 'success', response }))
            dispatch(setScreenHeight({ status: 'success', response }))
            dispatch(setStatusBarHeight(response.statusHeight))
            return getState()['user']
        })
        .catch(error => {
            // renewWechatCode(dispatch)
            dispatch(setToken({ status: 'failure', error }))
            dispatch(setName({ status: 'failure', error }))
            dispatch(setEquipmentPhoneModel({ status: 'failure', error }))
            dispatch(setPlatform({ status: 'failure', error }))
            dispatch(setCode({ status: 'failure', error }))
            dispatch(setAvatar({ status: 'failure', error }))
            dispatch(setPhone({ status: 'failure', error }))
            dispatch(setRole({ status: 'failure', error }))
            dispatch(setUnionId({ status: 'success', error }))
            dispatch(setPixelRatio({ status: 'failure', response }))
            dispatch(setWindowWidth({ status: 'failure', error }))
            dispatch(setWindowHeight({ status: 'failure', error }))
            dispatch(setScreenHeight({ status: 'failure', error }))
            dispatch(setStatusBarHeight(response.statusHeight))
        })

}

export const renewWechatCode = dispatch => {
    return wepy.login()
        .then(({ errMsg, code }) => {
            //console.log('renew code', code)
            code && dispatch(setCode({ status: 'success', response: { code } })) && true || new Error(false)
            return { errMsg, code }
        })
        .catch(error => Promise.reject(error))
}

export const renewUserRole = role => (dispatch, getState) => {
    return role && dispatch(setRole({ status: 'success', response: { role } })) || dispatch(setRole({ status: 'failure' }))
}

export const stayWechatLoginStatus = () => (dispatch, getState) => {
    return wepy.checkSession() // 验证微信登陆session是否还有效
        .then(({ errMsg }) => {
            if ('checkSession:ok' !== errMsg) throw new Error(errMsg) // session失效
            return true // session有效
        })
        .catch(errMsg => {
            dispatch(setCode({ status: 'pending' }))
            return wepy.login() // 如果微信session失效，微信login
        })
        .then(({ errMsg, code }) => {
            return code && dispatch(setCode({ status: 'success', response: { code } })) && true || dispatch(setToken({ status: 'failure' })) && Promise.reject(false)
        })
        .catch(error => Promise.reject(false))
}

export const checkLoginStatus = () => (dispatch, getState) => {
    let { name, avatar, code, phone, token, windowWidth, windowHeight, screenHeight } = getState && getState().user
        // wx.clearStorage()
    return wepy.checkSession() // 验证微信登陆session是否还有效
        .then(({ errMsg }) => {
            if ('checkSession:ok' !== errMsg) {
                throw errMsg // session失效
            } else {
                return true // session有效
            }
        }).catch(errMsg => {
            return wepy.login().catch(err => {
                    //console.log(err)
                    dispatch(setToken({ status: 'success', response: { token: 'defaultToken' } }))
                    throw 'login:no'
                })
        }).then(flag => {
            if ('GUEST' === name || '../../assets/img/icon-info.svg' === avatar || 'xxx' === code || 'deadNumber' === phone || 'defaultToken' === token || 0 === windowWidth || 0 === windowHeight || 0 === screenHeight) {
                // 当前这个页面是否是访客页面
                let rounter = getCurrentPages()
                let page = rounter[rounter.length - 1]
                if (!(ROUTERS[page.route] && ROUTERS[page.route].isVisitor)) {
                    throw 'login:no' // cb通知外层没有登陆
                }
            }
            //console.log('Already login, it\'s not necessary to login once again')
            return 'login:online' // cb通知外层已经登陆
        }).catch(reason => {
            //console.log('the last choice reason that not matched, it may be a callBack function error', reason)
            dispatch(setToken({ status: 'success', response: { token: 'defaultToken' } }))
            if (reason && JSON.stringify(reason).includes('session time out')) throw 'login:no'
            if (reason && JSON.stringify(reason).includes('cgi response is empty')) throw 'login:no'
            throw reason
        }).catch(reason => {
            //console.log('the last choice reason that not matched, it may be a callBack function error', reason)
            throw reason
        })
}

export const refreshUserInformations = ({ name, avatar, firstAccess, platform, equipmentModel, phone, code, token, role, unionID, pixelRatio, windowHeight, windowWidth, screenHeight, statusHeight }) => (dispatch, getState) => {
    let response = {
        userInfo: {
            nickName: name,
            avatarUrl: avatar
        },
        token,
        code,
        equipmentModel,
        pixelRatio,
        windowWidth,
        windowHeight,
        screenHeight,
        statusHeight,
        phone,
        role,
        unionID
    }

    wepy.$instance.globalData.unionID = unionID
    wepy.$instance.globalData.allOpenIDHash(token)

    dispatch(setFirstAccess({ status: 'success', firstAccess }))
    dispatch(setPlatform({ status: 'success', platform }))

    dispatch(setName({ status: 'success', response }))
    dispatch(setAvatar({ status: 'success', response }))
    dispatch(setToken({ status: 'success', response }))
    dispatch(setCode({ status: 'success', response }))
    dispatch(setEquipmentPhoneModel({ status: 'success', response }))
    dispatch(setPixelRatio({ status: 'success', response }))
    dispatch(setWindowWidth({ status: 'success', response }))
    dispatch(setWindowHeight({ status: 'success', response }))
    dispatch(setScreenHeight({ status: 'success', response }))
    dispatch(setPhone({ status: 'success', response }))
    dispatch(setRole({ status: 'success', response }))
    dispatch(setUnionID({ status: 'success', response }))
    dispatch(setStatusBarHeight(statusHeight))
}

// Action Handlers
const ACTIONS_HANDLERS = {
    [SET_FIRST_ACCESS]: (user, { payload: { firstAccess } }) => {
        wepy.setStorage({
            key: 'firstAccess',
            data: firstAccess
        })
        return Object.assign({}, user, { firstAccess })
    },
    [SET_NAME]: (user, { payload: { userInfo: { nickName: name } } }) => {
        let nextState = Object.assign({}, user, { name })
        wepy.setStorage({
            key: 'name',
            data: name
        })
        return nextState
    },
    [SET_PHONE]: (user, { payload: { phone = 'deadNumber' } }) => {
        wepy.setStorage({
            key: 'phone',
            data: phone
        })
        return Object.assign({}, user, { phone })
    },
    [SET_AVATAR]: (user, { payload: { userInfo: { avatarUrl: avatar } } }) => {
        wepy.setStorage({
            key: 'avatar',
            data: avatar
        })
        return Object.assign({}, user, { avatar })
    },
    [SET_PHONE_MODEL]: (user, { payload: { equipmentModel } }) => {
        wepy.setStorage({
            key: 'equipmentModel',
            data: equipmentModel
        })
        return Object.assign({}, user, { equipmentModel })
    },
    [SET_PLATFORM]: (user, { payload: { platform } }) => {
        wepy.setStorage({
            key: 'platform',
            data: platform
        })
        return Object.assign({}, user, { platform })
    },
    [SET_PIXEL_RATIO]: (user, { payload: { pixelRatio } }) => {
        wepy.setStorage({
            key: 'pixelRatio',
            data: pixelRatio
        })
        return Object.assign({}, user, { pixelRatio })
    },
    [SET_WINDOW_WIDTH]: (user, { payload: { windowWidth } }) => {
        wepy.setStorage({
            key: 'windowWidth',
            data: windowWidth
        })
        return Object.assign({}, user, { windowWidth })
    },
    [SET_WINDOW_HEIGHT]: (user, { payload: { windowHeight } }) => {
        wepy.setStorage({
            key: 'windowHeight',
            data: windowHeight
        })
        return Object.assign({}, user, { windowHeight })
    },
    [SET_SCREEN_HEIGHT]: (user, { payload: { screenHeight } }) => {
        wepy.setStorage({
            key: 'screenHeight',
            data: screenHeight
        })
        return Object.assign({}, user, { screenHeight })
    },
    [SET_CODE]: (user, { payload: { code } }) => {
        wepy.setStorage({
            key: 'code',
            data: code
        })
        return Object.assign({}, user, { code })
    },
    [SET_TOKEN]: (user, { payload: { token } }) => {
        wepy.setStorage({
            key: 'token',
            data: token
        })
        return Object.assign({}, user, { token })
    },
    [SET_ROLE]: (user, { payload: { role } }) => {
        wepy.setStorage({
            key: 'role',
            data: role
        })
        return Object.assign({}, user, { role })
    },
    [UNION_ID]: (user, { payload: { unionID } }) => {
        wepy.setStorage({
            key: 'unionID',
            data: unionID
        })
        return Object.assign({}, user, { unionID })
    },
    [SET_STATUS_BAR_HEIGHT]: (user, { payload: { height } }) => {
        wepy.setStorage({
            key: 'statusHeight',
            data: height
        })
        return Object.assign({}, user, { statusHeight: height })
    }
}

export const userReducer = (user = initialState, action) => {
    const handler = ACTIONS_HANDLERS[action.type]
    return handler ? handler(user, action) : user
}
