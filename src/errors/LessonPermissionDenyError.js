function LessonPermissionDenyError({senceID, courseID}) {
    this.name = 'LessonPermissionDenyError';
    this.message = '没有权限查阅，请先购买该课程';
    this.stack = (new Error()).stack;
    new Promise((resolve, reject) => {
        wx.showModal({
            title: '温馨提示',
            content: this.message,
            confirmText: '前往购买',
            showCancel: true,
            cancelText: '取消',
            success({confirm}) {
                confirm && resolve() || reject()
            }
        })
    }).then(() => {
        return wx.redirectTo({url: `/pages/course-module/course-pay?senceID=${senceID}&courseID=${courseID}`})
    }).catch(() => {
        wx.navigateBack()
    })
}

LessonPermissionDenyError.prototype = Object.create(Error.prototype)
LessonPermissionDenyError.prototype.constructor = LessonPermissionDenyError
export default LessonPermissionDenyError
