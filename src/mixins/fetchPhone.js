import wepy from 'wepy'
import {auth as authApi} from '../api'
import {doDecrpytPhone, navigateToLesson} from "../utils"
import {renewWechatCode} from '../redux/models/user'
import {getStore} from 'wepy-redux'

export default class FetchPhoneMixin extends wepy.mixin {
    data = {
        renewTimeStamp: 0
    } // end data

    onShow() {
        console.log('fetchPhone mixin on show')
        let mNowTimestamp = Date.now()
        if (300 > mNowTimestamp - this.renewTimeStamp) return Promise.resolve() // 阻止300毫秒以内的重复请求
        this.renewTimeStamp = mNowTimestamp
        renewWechatCode(getStore().dispatch)
    } // end onShow

    methods = {
        handleFetchPhone({detail: {encryptedData, errMsg, iv}, target, currentTarget: {dataset}}) {
            console.log('mixin handle get phone number', errMsg, dataset)
            return new Promise((resolve, reject) => {
                if ('getPhoneNumber:ok' !== errMsg) return reject({flag: false})
                return resolve({falg: true, encryptedData, iv, ...dataset})
            })
            // authApi.stayWechatLoginStatus()
        }, // fetchPhone
        handleTendToBeginAndDescryptPhoneNumber({currentTarget: {dataset: {isTokenSet = true, courseID, senceID, buttonStatus, resume = 'NO', teamID = "defaultTeamID"}}, detail}) {
            if (!isTokenSet) return '不合法token'
            doDecrpytPhone(detail)
                .then(() => {
                    if ('needPay' === buttonStatus) return this.$navigate(`/pages/PayForLesson/index`, {
                        courseID,
                        senceID
                    })
                    navigateToLesson({courseID, senceID, resumeLastRead: resume, teamID})
                })
                .catch(error => console.log('descrypt error', error))
        } // handleTendToBeginAndDescryptPhoneNumbe 即学 试学获取手机号
    } // end methods

}
