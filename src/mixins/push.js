import wepy from 'wepy'
import { getStore, connect } from 'wepy-redux'
import { push as pushApi } from '../api'

const store = getStore()
export default class PushMixin extends wepy.mixin {
  data = {
  } // end data
  methods = {
    handleSavePushCode({detail: { formId }}) {
      console.log('mixin handle push code', formId)
      pushApi.savePushCode(store.getState().user.token, formId)
        .then(flag => console.log('succed in saving push code'))
        .catch(error => console.log('error', error))
    }
  } // end methods
}
