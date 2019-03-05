const NODE_ENV = 'release'
export default {
    gaTracker: 'UA-124925915-2', // 用你的 Tracking ID 代替 test：UA-124925915-2 product： UA-127840357-1 
    environment: NODE_ENV,
    baseUrl: NODE_ENV === 'release' ? 'https://wx-small.runwise.cn/release/api/' : 'https://wx-small.runwise.cn/develop/api/',
    appid: 'wx0fbaa0e617f19200',
    secret: '639c1b0adaaa4e1169db3da4865adf17',
    grantType: 'authorization_code'
}
