import wepy from 'wepy'
import { getStore, connect } from 'wepy-redux'
import config from './config'
import {CancelAuthenticationError, InnerError, NetworkError, RejectAuthenticationError, CustomError, UnAuthenticationError} from '../errors'
import ga from 'wxapp-ga/ga'

const GoogleAnalytics = ga.GoogleAnalytics
const HitBuilders = ga.HitBuilders
const CampaignParams = ga.CampaignParams
const getTracker = () => {
    let self = this
    let tracker = {}
    // 初始化GoogleAnalytics Tracker
    tracker = GoogleAnalytics.getInstance(self)
        .setAppName('即能')
        .setAppVersion('v1.0')
        .newTracker('UA-127840357-1') // 用你的 Tracking ID 代替
    tracker.setTrackerServer("https://wx-small.runwise.cn") // 使用自己的合法域名做跟踪数据转发
    return tracker
}

const getShareHuilder = (entr, code) => {
    if (!entr || !code) {
        return
    }

    let data = {
        "utm_source" : code,
        "utm_medium" : entr
    }
    console.log('渠道', data)
    let campaignUrl = CampaignParams.parseFromPageOptions(data).toUrl()
    let trackerInfo = getTracker()
    trackerInfo.setCampaignParamsOnNextHit(campaignUrl)
    trackerInfo.send(new HitBuilders.ScreenViewBuilder().build())
}

export const QRcodeType = (location) => {
    let result = ''
    switch (location.source) {
        case 'WeChat_group_1': // 微信群1-5
            result = '&source=WeChat_group_1'
            break
        case 'WeChat_group_2':
            result = '&source=WeChat_group_2'
            break
        case 'WeChat_group_3':
            result = '&source=WeChat_group_3'
            break
        case 'WeChat_group_4':
            result = '&source=WeChat_group_4'
            break
        case 'WeChat_group_5':
            result = '&source=WeChat_group_5'
            break
        case 'WeChat_article_1': // 微信文章1-5
            result = '&source=WeChat_article_1'
            break
        case 'WeChat_article_2':
            result = '&source=WeChat_article_2'
            break
        case 'WeChat_article_3':
            result = '&source=WeChat_article_3'
            break
        case 'WeChat_article_4':
            result = '&source=WeChat_article_4'
            break
        case 'WeChat_article_5':
            result = '&source=WeChat_article_5'
            break
        case 'WeChat_circle_1': // 朋友圈1-5
            result = '&source=WeChat_circle_1'
            break
        case 'WeChat_circle_2':
            result = '&source=WeChat_circle_2'
        case 'WeChat_circle_3':
            result = '&source=WeChat_circle_3'
            break
        case 'WeChat_circle_4':
            result = '&source=WeChat_circle_4'
            break
        case 'WeChat_circle_5':
            result = '&source=WeChat_circle_5'
            break
        case 'not_WeChat_1': // 非微信渠道1-5
            result = '&source=not_WeChat_1'
            break
        case 'not_WeChat_2':
            result = '&source=not_WeChat_2'
            break
        case 'not_WeChat_3':
            result = '&source=not_WeChat_3'
            break
        case 'not_WeChat_4':
            result = '&source=not_WeChat_4'
            break
        case 'not_WeChat_5':
            result = '&source=not_WeChat_5'
            break
    }
    return result
}

export const getUserInfo = () => {
        let urlEnd = '&source=other'
        let entr = getStore().getState().entrance.scenceID + ''
        let path = getStore().getState().entrance.path
        let query = getStore().getState().entrance.query // 二维码进来的参数

        switch (entr) {
            case '1005':
            case '1006':
            case '1027':
            case '1042':
            case '1053':
            case '1054':
                urlEnd = '&source=search' // 搜索
                break;
            case '1014':
                urlEnd = '&source=服务通知' // 小程序模版消息(服务通知)
                break;
            case '1058':
                urlEnd = '&source=officalAccount' // 公众号文章
                break;
            case '1067':
                urlEnd = '&source=officalAccount1067' // 公众号文章广告
                break;
            case '1082':
                urlEnd = '&source=officalAccount1082' // 公众号会话下发的文字链接
                break;
            case '1043':
                urlEnd = '&source=officalAccount1043' // 公众号模板消息
                break;
            case '1074':
                urlEnd = '&source=officalAccount1074' // 公众号会话下发的小程序消息卡片
                break;
            case '1035':
                urlEnd = '&source=officalAccount1035' // 公众号自定义菜单
                break;
            case '1020':
                urlEnd = '&source=officalAccount1020' // 公众号 profile 页相关小程序列表
                break;
            case '1011':
            case '1012':
            case '1047':
            case '1048':
            case '1049':
                let outSide = QRcodeType(query);
                if (outSide) {
                    urlEnd = outSide
                }else if (path === 'pages/training-camp-module/coursr-list') {
                    urlEnd = '&source=teamLearShare' // 团队学习分享
                } else if (path === 'pages/activity-module/appraisal-results') {
                    urlEnd = '&source=preTestShare' // 学前测评
                } else if (path === 'pages/user-module/skill-board') {
                    urlEnd = '&source=skillBoard' // 即能看板
                } else if (path === 'pages/course-module/lesson' || path === 'pages/course-module/lesson-for-android' || path === 'pages/course-module/course-learning') {
                    urlEnd = '&source=CardsShare' // 微课分享
                } else {
                    urlEnd = '&source=QRcode' // 二维码分享
                }
                break;
            default:
                switch (path) {
                    case 'pages/activity-module/appraisal-start':
                        urlEnd = '&source=preTestShare' // 学前测评
                        break;
                    case 'pages/course-module/course-details':
                        if (entr == '1007' || entr == '1008') {
                            urlEnd = '&source=CourseShare'
                        } else if (entr != '1020' && entr != '1035' && entr != '1043' && entr != '1058' && entr != '1067' && entr != '1074') {
                            urlEnd = '&source=CardsShare'
                        }
                        break;
                    case 'pages/course-module/assortment':
                        urlEnd = '&source=seriesShare'
                        break;
                    case 'pages/SpecialCourse/index':
                        if (entr == '1007' || entr == '1008') {
                            urlEnd = '&source=SpecialCourseShare'
                        } else if (entr != '1020' && entr != '1035' && entr != '1043' && entr != '1058' && entr != '1067' && entr != '1074') {
                            urlEnd = '&source=CardsShare'
                        }
                        break;
                    case 'pages/Largess/index':
                        urlEnd = '&source=giftShare' // 赠一得一
                        break;
                    case 'pages/training-camp-module/coursr-list':
                        urlEnd = '&source=teamLearShare' // 团队学习分享
                        break;
                    case 'pages/course-module/course':
                        if (entr == '1007' || entr == '1008') {
                            urlEnd = '&source=TopAppShare'
                        }
                        break;
                    default:
                        break;
                }
                break;
        }

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

                    let srcType = urlEnd.split('=')[1]
                    getShareHuilder(entr, srcType) // 分享进来的ga统计

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
    } // end getUserInfo

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
    } // edn doAuthorization

export const setOnlineStatu = ({ token }) => {
    let mPlatform = getStore().getState().user.platform
    return wepy.request({
            url: `${config.baseUrl}user/updateUserLogin?token=${token}&platform=${mPlatform}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => data)
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
