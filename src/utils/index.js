import wepy from 'wepy'
import { getStore, connect } from "wepy-redux"
import { auth as authApi, course as courseApi, practice as practiceApi } from '../api'
import {renewWechatCode, setPhone, login, checkLoginStatus, renewUserRole, refreshUserInformations} from "../redux/models/user";
import { refreshActivity } from '../redux/models/activity'
import { refreshLearnings } from '../redux/models/learning'
import { setCurrentPracticeOffset, setLastPracticeOffset, setSubmitSection } from "../redux/models/practice"
import { CustomError, InitializeError, UnAuthenticationError, RejectAuthenticationError, CancelAuthenticationError } from '../errors'
import _ from 'underscore'

const PHONE_ERRORS_MAPPER = {
    userDeny: '授权手机号才能即学哦',
    codeError: '手机号解析失败，请重试',
    decryptError: '手机号解析失败，请重试',
    paramsLost: '必须授权手机号才能即学哦'
}

const PRACTICES_ROUTER_MAPPER = {
    textSelectionVer2: '/pages/SingleSelection/index',
    order: '/pages/Sorting/index'
}

const PREVIOUS_PRACTICES_ROUTER_MAPPER = {
    textSelectionVer2: '/pages/PreviousPracticeSingleSelection/index'
}

export const showErrorPage = () => {
    return wepy.navigateTo({
        url: '/pages/Mistake/index'
    })
}

export const downLoadPhoto = url => {
    return wepy.downloadFile({
            url: url.replace('http://image.runwise.cn/', 'https://wx-small.runwise.cn/')
        })
        .then(({ tempFilePath, statusCode, errMsg }) => {
            //console.log('tmp', tempFilePath)
            if ('downloadFile:ok' !== errMsg) throw new Error('fail to download image: ' + errMsg)
            return tempFilePath
        })
}

export const previewPhoto = ({ url }) => {
    let tmpUrl = null
    return wepy.downloadFile({url}).then(({ tempFilePath, statusCode, errMsg }) => {
            if ('downloadFile:ok' !== errMsg) throw new Error('fail to download image')
            tmpUrl = tempFilePath
            return wepy.previewImage({ current: url, urls: [url] })
        }).then(({ errMsg }) => ({ errMsg, tmpUrl }))
}

export const canvasPreviewAndSave = ({ fileType = 'jpg', width, height, canvasID }) => {
        return new Promise((resolve, reject) => {
                wx.canvasToTempFilePath({
                    x: 0,
                    y: 0,
                    width,
                    height,
                    destWidth: width,
                    destHeight: height,
                    canvasId: canvasID,
                    fileType: 'jpg',
                    quality: 1,
                    success: res => resolve(res),
                    fail: error => error
                })
            })
            .then(({ errMsg, tempFilePath }) => {
                //console.log('tempFilePath', tempFilePath)
                if ('canvasToTempFilePath:ok' !== errMsg) throw new Error('fail to preview image')
                wx.previewImage({
                    current: tempFilePath,
                    urls: [tempFilePath]
                })
                return new Promise((resolve, reject) => {
                        wx.saveImageToPhotosAlbum({
                            filePath: tempFilePath,
                            success: res => resolve(res),
                            fail: error => reject(error)
                        })
                    })
            })
    }

export const drawText = ({ ctx, color = '#000', fontSize = '18', fontStyle = 'normal', fontWeight = 'normal', fontFamily = 'PingFangSC-Regular', align = 'left', lineHeight = 0 }) => ({ x = 0, y = 0, content = 'text from canvas' }) => {
        let mArr = content.split('\n')
        //console.log('text array', mArr, lineHeight)
        ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`
        mArr.forEach((item, index) => {
            ctx.setFontSize(fontSize)
            ctx.setFillStyle(color)
            ctx.setTextAlign(align)
            ctx.fillText(item.toString(), x, y + index * fontSize + index * (lineHeight - fontSize)) // 写课程标题
        })
    } // drawText 画多行文字

export const drawCircle = ({ ctx, color }) => ({ x, y, radius }) => {
    const mStartAngle = -(1 / 2 * Math.PI)
    const mEndAngle = mStartAngle + 2 * Math.PI; //结束角度
    ctx.beginPath()
    ctx.setLineWidth(1)
    ctx.setStrokeStyle(color) // 设置绘制线条的颜色
    ctx.arc(x, y, radius, mStartAngle, mEndAngle)
    ctx.stroke()
    ctx.closePath()
}

export const drawRectangle = ({ ctx, color = '#FFFFFF' }) => ({ x, y, width, height }) => {
    ctx.save()
    ctx.beginPath()
    ctx.setLineJoin('round')
    ctx.moveTo(x, y)
    ctx.lineTo(x + width, y)
    ctx.lineTo(x + width, y + height)
    ctx.lineTo(x, y + height)
    ctx.setFillStyle(color) // 设置填充颜色
    ctx.closePath()
    ctx.setLineWidth(10)
    ctx.setStrokeStyle(color)
    ctx.stroke()
    ctx.clip()
    ctx.fill()
    ctx.setLineWidth(1)
    ctx.restore()
}

export const drawStrokeRectangle = ({ ctx, color = '#FFFFFF' }) => ({ x, y, width, height }) => {
    ctx.save()
    ctx.beginPath()
    ctx.setLineJoin('round')
    ctx.moveTo(x, y)
    ctx.lineTo(x + width - 10, y)
    ctx.lineTo(x + width - 10, y + height - 10)
    ctx.lineTo(x, y + height - 10)
    ctx.setFillStyle(color) // 设置填充颜色
    ctx.closePath()
    ctx.setLineWidth(10)
    ctx.setStrokeStyle(color)
    ctx.stroke()
    ctx.clip()
    ctx.fill()
    ctx.setLineWidth(1)
    ctx.restore()
}

export const drawDot = ({ ctx, color, radius }) => ({ x, y }) => {
    ctx.beginPath() // 开启绘制路径
    ctx.arc(x, y, radius, 0, 2 * Math.PI) // 绘制圆 参数依次为 圆的横坐标/纵坐标/半径/绘制圆的起始位置/绘制圆的弧度大小
    ctx.setFillStyle(color) // 设置填充颜色
    ctx.fill()
    ctx.closePath() // 关闭绘制路径
}

export const drawLine = ({ ctx, color, width }) => ({ srcX, srcY, dstX, dstY }) => {
    ctx.beginPath() // 开启绘制路径
    ctx.setLineWidth(1)
    ctx.moveTo(srcX, srcY) // 设置线的起始位置
    ctx.lineTo(dstX, dstY) // 设置线的结束位置
    ctx.setStrokeStyle(color) // 设置绘制线条的颜色
    ctx.stroke() // 绘制
    ctx.closePath() // 关闭绘制路径
}

export const drawCircleIcon = ({ ctx, diameter }) => ({ image, x, y }) => {
    //console.log('image', image)
    ctx.save()
    ctx.beginPath()
    ctx.arc(x, y, diameter / 2, 0, 2 * Math.PI)
    ctx.setStrokeStyle('#ffffff')
    ctx.stroke()
    ctx.clip()
    ctx.drawImage(image, x - diameter / 2, y - diameter / 2, diameter, diameter)
    ctx.restore()
}

export const asyncDrawCircleIcon = ({ ctx, diameter }) => ({ image, x, y }) => {
    return new Promise((resolve, reject) => {
        //console.log('image', image)
        ctx.save()
        ctx.beginPath()
        ctx.arc(x, y, diameter / 2, 0, 2 * Math.PI)
        ctx.setStrokeStyle('#ffffff')
        ctx.stroke()
        ctx.clip()
        ctx.drawImage(image, x - diameter / 2, y - diameter / 2, diameter, diameter)
        ctx.restore()
        ctx.draw(true, () => resolve(true))
    })
}

export const sleep = second => {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            resolve(timer)
        }, second * 1000)
    })
}

export const getStorageAsync = ({ key }) => {
    return new Promise((resolve, reject) => {
            wx.getStorage({
                key,
                success: ({ errMsg, data }) => 'getStorage:ok' === errMsg && resolve(data) || reject(data),
                fail: error => reject(`getStorage: fail to get ${key}`)
            })
        })
}

export const setStorageAsync = ({ key, value }) => {
    return new Promise((resolve, reject) => {
            wx.setStorage({
                key,
                data: value,
                success: ({ errMsg }) => 'setStorage:ok' === errMsg && resolve() || reject(errMsg),
                fail: error => reject(`setStorage: fail to get ${key}`)
            })
        })
}

export const showModalAsync = ({ title, content, showCancel = false, cancelText = '', confirmText }) => {
    return new Promise((resolve, reject) => {
            wx.showModal({
                    title,
                    content,
                    showCancel,
                    cancelText,
                    confirmText,
                    success: ({ confirm }) => confirm ? resolve() : reject(),
                    fail: error => reject(error)
                })
        })
}

export const doDecrpytPhone = ({ encryptedData, iv, errMsg: phoneErrMsg }) => {
        const store = getStore()
        return new Promise((resolve, reject) => {
                if ("getPhoneNumber:ok" !== phoneErrMsg) throw new CustomError('userDeny')
                if (null == encryptedData || null == iv) throw new CustomError('paramsLost')
                return resolve({ code: store.getState().user.code, errMsg: 'login:ok' })
                    // return resolve(renewWechatCode(store.dispatch))
            })
            .then(({ code, errMsg }) => {
                //console.log(`code: ${code}, errMsg: ${errMsg}`)
                if ('login:ok' !== errMsg) throw new CustomError('codeError')
                store.dispatch(setPhone({ status: "pending" }));
                let {
                    user: {
                        token
                    }
                } = store.getState()
                return authApi.sendPhoneNumber({
                        token,
                        code,
                        encryptedData,
                        iv
                    })
            })
            .then(({ phone }) => {
                //console.log("succeed in sending phone", phone);
                (phone &&
                    store.dispatch(
                        setPhone({
                            status: "success",
                            response: { phone }
                        })
                    ))
                renewWechatCode(store.dispatch)
            })
            .catch(error => {
                renewWechatCode(store.dispatch)
                return wepy.showModal({
                    title: "提示",
                    content: PHONE_ERRORS_MAPPER[error.message] || '授权错误默认提示',
                    showCancel: false,
                    confirmText: '知道了'
                }).then(() => {
                    throw new Error('fail in decrypting phone')
                })
            })
    }

export const navigateToLesson = ({ courseID, senceID, teamID='defaultTeamID', resumeLastRead='NO' ,source='' , isNewSence=false, isRedirectTo=false}) => {
    const { user: { platform } } = getStore().getState()
    let url = '/pages/course-module/lesson-for-android'
    // 是否是ppt卡片进去
    if (isNewSence) {
        url = '/pages/course-module/course-learning'
    } else {
        url = 'android' === platform ? '/pages/course-module/lesson-for-android' : '/pages/course-module/lesson'
    }
    url += `?courseID=${courseID}&senceID=${senceID}&platform=${platform}&teamID=${teamID}&resumeLastRead=${resumeLastRead}&source=${source}&isNewSence=${isNewSence}`
    //console.log('confirm navigation', mUrl)
    if (!isRedirectTo) {
        return wepy.navigateTo({ url: url })
    } else {
        return wepy.redirectTo({ url: url })
    }
}

export const redirectToLesson = ({ courseID, senceID, teamID = 'defaultTeamID', resumeLastRead = 'NO' , isNewSence=false }) => {
    const { user: { platform } } = getStore().getState()
    let url = '/pages/course-module/lesson-for-android'
    // 是否是ppt卡片进去
    if (isNewSence) {
        url = '/pages/course-module/course-learning'
    } else {
        url = 'android' === platform ? '/pages/course-module/lesson-for-android' : '/pages/course-module/lesson'
    }
    url += `?courseID=${courseID}&senceID=${senceID}&platform=${platform}&teamID=${teamID}&resumeLastRead=${resumeLastRead}&isNewSence=${isNewSence}`
    return wepy.redirectTo({ url: url })
}

export const navigateToPractice = practiceOffset => {
    let { practices: { sections } } = getStore().getState()
    let mRoute = PRACTICES_ROUTER_MAPPER[sections[practiceOffset]['type']]
    if (null == mRoute) throw new CustomError('route not found, the type of cards must be "order" or "textSelectionVer2"')
    getStore().dispatch(setCurrentPracticeOffset(practiceOffset))
        // return wepy.navigateTo({ url: mRoute })
    return wepy.redirectTo({ url: mRoute })
}

export const redirectToPractice = practiceOffset => {
    let { practices: { sections, courseID, senceID, teamID }, cards: { requestFlag: lessonRequestFlag }, user: { token } } = getStore().getState()
    sections[practiceOffset - 1] && practiceApi.sendDoneAPractice({
            token,
            senceID,
            cardID: sections[practiceOffset - 1]['id'],
            requestFlag: lessonRequestFlag
        })
        .catch(error => console.log('fail to send a done information of practice', error))
    if (!sections[practiceOffset]) {
        return wepy.redirectTo({ url: `/pages/course-module/course-complete?courseID=${courseID}&senceID=${senceID}&teamID=${teamID}` })
            .then(() => getStore().dispatch(setCurrentPracticeOffset(0)))

    }
    let mRoute = PRACTICES_ROUTER_MAPPER[sections[practiceOffset]['type']]
    if (null == mRoute) throw new CustomError('route not found, the type of cards must be "order" or "textSelectionVer2"')
    getStore().dispatch(setCurrentPracticeOffset(practiceOffset))
    return wepy.redirectTo({ url: mRoute })
}


export const formatTimestamp = timestamp => {
    let day = Math.floor(timestamp / 86400000)
    let hour = Math.floor(timestamp % 86400000 / (3600 * 1000))
    let minute = Math.floor(timestamp % 86400000 % (3600 * 1000) / (60 * 1000))
    let second = 0 || Math.floor(timestamp % 86400000 % (3600 * 1000) % (60 * 1000) / 1000)
    return { day, hour, minute, second }
}

export const formatTimestampForHours = timestamp => {
    let day = null
    let hour = Math.floor(timestamp / (3600 * 1000))
    let minute = Math.floor(timestamp % 86400000 % (3600 * 1000) / (60 * 1000))
    let second = 0 || Math.floor(timestamp % 86400000 % (3600 * 1000) % (60 * 1000) / 1000)
    return { day, hour, minute, second }
}

export const shareDictionary = {
    SHARE_TEAM: {
        event: 'SHARE_TEAM',
        type: '分享团队',
        report: '分享成绩单'
    },
    SHARE_COURSE: {
        event: 'SHARE_COURSE',
        type: '分享课程详情'
    },
    RECEIVE_COURSE: {
        event: 'RECEIVE_COURSE',
        type: '课程赠一得一'
    },
    SHARE_WE_APP: {
        event: 'SHARE_WE_APP',
        type: '分享HOME小程序'
    }, // 分享小程序home
    SHARE_COUPON: {
        event: 'SHARE_COUPON',
        type: '分享赠一得一'
    }, // 分享赠一得一
    SHARE_SPECIAL_COURSE: {
        event: 'SHARE_SPECIAL_COURSE',
        type: '分享专题详情'
    }, // 分享专题详情
    SHARE_CARD: {
        event: 'SHARE_CARD',
        type: '分享卡片[ 全图卡, 回顾页 ]'
    }, // 分享卡片[ 全图卡, 回顾页 ]
    SHARE_MEASURE: {
        event: 'SHARE_MEASURE',
        type: '分享测评'
    },
    SHARE_ASSORTMENT: {
        event: 'SHARE_ASSORTMENT',
        type: '分享课程系列'
    },
    SHARE_ASSORTMENT_COURSE: {
        event: 'SHARE_ASSORTMENT_COURSE',
        type: '点击课程系列课表tab'
    }
}

export const serialize = (obj, name) => {
    var result = "";

    function serializeInternal(o, path) {
        for (let p in o) {
            var value = o[p];
            if (typeof value != "object") {
                if (typeof value == "string") {
                    result += "\n" + path + "[" + (isNaN(p) ? "\"" + p + "\"" : p) + "] = " + "\"" + value.replace(/\"/g, "\\\"") + "\"" + ";";
                } else {
                    result += "\n" + path + "[" + (isNaN(p) ? "\"" + p + "\"" : p) + "] = " + value + ";";
                }
            } else {
                if (value instanceof Array) {
                    result += "\n" + path + "[" + (isNaN(p) ? "\"" + p + "\"" : p) + "]" + "=" + "new Array();";
                    serializeInternal(value, path + "[" + (isNaN(p) ? "\"" + p + "\"" : p) + "]");
                } else {
                    result += "\n" + path + "[" + (isNaN(p) ? "\"" + p + "\"" : p) + "]" + "=" + "new Object();";
                    serializeInternal(value, path + "[" + (isNaN(p) ? "\"" + p + "\"" : p) + "]");
                }
            }
        }
    }

    serializeInternal(obj, name);
    return result;
}

export const preFixNumber = (num, n) => (Array(n).join('0') + num).slice(-n) // preFixNumber

export const parsePercentageForPoll = (current, total) => delta => Math.round(parseInt(current / (total + delta) * 100))

Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

const synchronizeActivity = store => activity => getStorageAsync({ key: 'activity' })
    .then(({ participationTimes, participationDate, beginDate, terminalDate, isActivityOn, poster }) => {
        activity.participationTimes = participationTimes
        activity.participationDate = participationDate
        activity.beginDate = beginDate
        activity.terminalDate = terminalDate
        activity.isActivityOn = isActivityOn
        activity.poster = poster
    })
    .catch(error => console.log('storage: activity获取失败', error))
    .then(() => store.dispatch(refreshActivity(activity)))

const synchronizeLearning = store => learning => getStorageAsync({ key: 'learning' })
    .then(learnings => (learning = learnings))
    .catch(error => console.log('storage: learning获取失败', error))
    .then(() => store.dispatch(refreshLearnings(learning)))

const synchronizeUser = store => user => getStorageAsync({ key: 'firstAccess' }).then(firstAccess => {
        user.firstAccess = ++firstAccess
    }).catch(error => {
        user.firstAccess = 0
    }) // 至此initialState的firstAccess值确定
    // 首先校验firstAccess和entrancePath 两个先决条件
    .then(() => Promise.all(['token', 'name', 'equipmentModel', 'code', 'phone', 'avatar', 'role', 'unionID', 'platform', 'windowWidth', 'windowHeight', 'screenHeight', 'statusHeight'].map(item => getStorageAsync({ key: item }))))
    .then(([token, name, equipmentModel, code, phone, avatar, role, unionID, platform, pixelRatio, windowWidth, windowHeight, screenHeight, statusHeight]) => {
        user.token = token
        user.name = name
        user.code = code
        user.phone = phone
        user.avatar = avatar
        user.role = role
        user.unionID = unionID
        user.pixelRatio = pixelRatio
        user.platform = platform
        user.windowWidth = windowWidth
        user.windowHeight = windowHeight
        user.equipmentModel = equipmentModel
        user.screenHeight = screenHeight
        user.statusHeight = statusHeight
        return new Promise((resolve, reject) => {
            wx.getSystemInfo({
                success: ({ errMsg, pixelRatio: syncPixelRatio, windowWidth: syncWindowWidth, windowHeight: syncWindowHeight, model: syncEquipmentModel, screenHeight: syncScreenHeight, platform, statusBarHeight: syncStatusHeight }) => {
                    user.pixelRatio = 'getSystemInfo:ok' === errMsg ? syncPixelRatio : pixelRatio
                    user.windowWidth = 'getSystemInfo:ok' === errMsg ? syncWindowWidth : windowWidth
                    user.windowHeight = 'getSystemInfo:ok' === errMsg ? syncWindowHeight : windowHeight
                    user.equipmentModel = 'getSystemInfo:ok' === errMsg ? syncEquipmentModel : equipmentModel
                    user.screenHeight = 'getSystemInfo:ok' === errMsg ? syncScreenHeight : screenHeight
                    user.statusHeight = 'getSystemInfo:ok' === errMsg ? syncStatusHeight : statusHeight;
                    'getSystemInfo:ok' === errMsg && (user.platform = platform)
                    resolve()
                },
                fail: error => {
                    resolve()
                }
            })
        })
    }).catch(error => {
        console.log('storage: user获取失败', error)
    }).then(() => {
        store.dispatch(refreshUserInformations(user))
    })

const synchronize = initialState => Promise.all([
    synchronizeActivity(getStore())(initialState.activity),
    synchronizeLearning(getStore())(initialState.learning),
    synchronizeUser(getStore())(initialState.user)]).then(() => {
    // console.log('---------------------------== synchronize all sotrage:ok ==------------------------------')
}).catch(error => {
    throw error
})

const initialState = {
    user: {
        firstAccess: 0,
        name: 'GUEST',
        avatar: '../../assets/img/icon-info.svg',
        equipmentModel: '未知',
        platform: 'defaultPlatform',
        phone: 'deadNumber',
        code: 'xxx',
        token: 'defaultToken',
        role: '普通用户',
        unionID: null,
        pixelRatio: 2,
        windowHeight: 0,
        windowWidth: 0,
        screenHeight: 0,
        statusHeight: 0,
    },
    sences: {
        currentID: '',
        currentName: '',
        sections: [],
    },
    entrance: {
        scenceID: '',
        path: '',
        query: '',
        mappers: {
            1001: '发现栏小程序主入口',
            1005: '顶部搜索框的搜索结果页',
            1006: '发现栏小程序主入口搜索框的搜索结果页',
            1007: '单人聊天会话中的小程序消息卡片',
            1008: '群聊会话中的小程序消息卡片',
            1011: '扫描二维码',
            1012: '长按图片识别二维码',
            1013: '手机相册选取二维码',
            1014: '小程序模版消息',
            1017: '前往体验版的入口页',
            1019: '微信钱包',
            1020: '公众号 profile 页相关小程序列表',
            1022: '聊天顶部置顶小程序入口',
            1023: '安卓系统桌面图标',
            1024: '小程序 profile 页',
            1025: '扫描一维码',
            1026: '附近小程序列表',
            1027: '顶部搜索框搜索结果页“使用过的小程序”列表',
            1028: '我的卡包',
            1029: '卡券详情页',
            1030: '自动化测试下打开小程序',
            1031: '长按图片识别一维码',
            1032: '手机相册选取一维码',
            1034: '微信支付完成页',
            1035: '公众号自定义菜单',
            1036: 'App 分享消息卡片',
            1037: '小程序打开小程序',
            1038: '从另一个小程序返回',
            1039: '摇电视',
            1042: '添加好友搜索框的搜索结果页',
            1043: '公众号模板消息',
            1044: '带 shareTicket 的小程序消息卡片（详情)',
            1047: '扫描小程序码',
            1048: '长按图片识别小程序码',
            1049: '手机相册选取小程序码',
            1052: '卡券的适用门店列表',
            1053: '搜一搜的结果页',
            1054: '顶部搜索框小程序快捷入口',
            1056: '音乐播放器菜单',
            1057: '钱包中的银行卡详情页',
            1058: '公众号文章',
            1059: '体验版小程序绑定邀请页',
            1064: '微信连Wi-Fi状态栏',
            1067: '公众号文章广告',
            1068: '附近小程序列表广告',
            1071: '钱包中的银行卡列表页',
            1072: '二维码收款页面',
            1073: '客服消息列表下发的小程序消息卡片',
            1074: '公众号会话下发的小程序消息卡片',
            1078: '连Wi-Fi成功页',
            1089: '微信聊天主界面下拉',
            1090: '长按小程序右上角菜单唤出最近使用历史',
            1092: '城市服务入口'
        }
    },
    courses: {
        currentID: '',
        currentName: ''
    },
    cards: {
        requestFlag: '', // 进入课程请求时间戳
        currentSectionOffset: 0,
        sections: [],
        collections: {
            practiceInputs: [ //即学即练填空卡，初始化占位.共10组。最多10张即学即练填空卡
                { input1: '', input2: '' },
                { input1: '', input2: '' },
                { input1: '', input2: '' },
                { input1: '', input2: '' },
                { input1: '', input2: '' },
                { input1: '', input2: '' },
                { input1: '', input2: '' },
                { input1: '', input2: '' },
                { input1: '', input2: '' },
                { input1: '', input2: '' },
                { answer: [] }
            ]
        }
    },
    practices: {
        requestFlag: '',
        currentSectionOffset: 0,
        sections: [],
        courseID: 'defaultCourseID',
        senceID: 'defaultSenceID'
    }, // end practices
    learning: {
        teamIDForTest: 1526626753087
    },
    activity: {
        participationTimes: 0, // 用户参与次数
        participationDate: -1, // 用户参与时间 时间戳
        beginDate: -1, // 活动开始时间 时间戳
        terminalDate: -1, // 活动结束时间 时间戳
        isActivityOn: false, // 是否开启活动
        poster: 'http://wx-small.runwise.cn/image/imageIDd48efe7053f43db7f5fe023ae523.png' // 海报
    }
}

export const initializationDeligate = ({initializeFunc, callWhatever = false}) => {
    if (!initializeFunc instanceof Promise) {
        console.log(42332)
        throw 'initializeFunc must be Promise'
    }
    const store = getStore()
    return synchronize(initialState).then(() => {
            if (callWhatever) return initializeFunc() // 如果callWhatever，那么不校验登录状态，直接initialize初始化页面
            return store.dispatch(checkLoginStatus())
        }).then(status => {
            let {user: {token}} = store.getState()
            if ('login:online' === status) { // 后台刷新登录态
                authApi.setOnlineStatu({token}).then(response => {
                    if (!response) return
                    let {role} = response
                    store.dispatch(renewUserRole(role))
                })
            }

            return initializeFunc() // 剩余条件即login:already login:online
        })
}

export const preloadState = () => {
    return synchronize(initialState)
}

/**
 * 深度拷贝
 * @param obj 被拷贝的对象，支持任何类型
 * @type {function(*=)}
 */
export const deepCopy = ((obj) => {
    let results
    switch (typeof obj) {
        case 'undefined':
            break
        case 'string'   :
            results = obj + ''
            break
        case 'number'   :
            results = obj - 0
            break
        case 'boolean'  :
            results = obj
            break
        case 'object'   :
            if (_.isNull(obj)) {
                results = null
            } else {
                if (_.isArray(obj)) {
                    results = []
                    _.each(obj, (item) => {
                        results.push(deepCopy(item))
                    })
                } else {
                    results = {}
                    for (var key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            results[key] = deepCopy(obj[key])
                        }
                    }
                }
            }
            break
        default:
            results = _.clone(obj)
            break
    }
    return results
})
