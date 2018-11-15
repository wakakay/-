function UnAuthenticationError(message) {
  this.name = 'UnAuthenticationError';  
  this.message = message || 'Default Message';  
  this.stack = (new Error()).stack;  
  return wx.navigateTo({
    url: '/pages/NoLogin/index'
  })
}
UnAuthenticationError.prototype = Object.create(Error.prototype)
UnAuthenticationError.prototype.constructor = UnAuthenticationError
export default UnAuthenticationError
