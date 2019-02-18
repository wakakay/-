import wepy from 'wepy'
import {auth as authApi} from '../api'
import {doDecrpytPhone, navigateToLesson} from "../utils"
import {renewWechatCode} from '../redux/models/user'
import {getStore} from 'wepy-redux'

export default class FetchPhoneMixin extends wepy.mixin {
    data = {
        renewTimeStamp: 0
    }

    onShow() {
        console.log('fetchPhone mixin on show')
        let mNowTimestamp = Date.now()
        if (300 > mNowTimestamp - this.renewTimeStamp) return Promise.resolve() // 阻止300毫秒以内的重复请求
        this.renewTimeStamp = mNowTimestamp
        renewWechatCode(getStore().dispatch)
    }

    methods = {
        handleFetchPhone({detail: {encryptedData, errMsg, iv}, target, currentTarget: {dataset}}) {
            console.log('mixin handle get phone number', errMsg, dataset)
            return new Promise((resolve, reject) => {
                if ('getPhoneNumber:ok' !== errMsg) return reject({flag: false})
                return resolve({falg: true, encryptedData, iv, ...dataset})
            })
        }
    }

}
