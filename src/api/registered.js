/**
 * @file
 * @author: lzb
 * @params: 参数说明
 * @history:
 * Date      Version Remarks
 * ========= ======= ==================================
 * 2018/9/19      1.0     First version
 *
 */
import {fetch} from './fetch-utils'

export default {
    /**
     * 获取职能跟对应的兴趣
     * @param imageType: 'useronboarding' 写死
     */
    weclomeSwiper(params) {
        return fetch({method: 'post', url: 'common/v1/getImage', params: params, isVisitor: true})
    },
    /**
     * 获取职能跟对应的兴趣
     * @param params
     */
    userInfo(params) {
        return fetch({method: 'post', url: 'userprofile/v1/userInfo', params: params})
    },
    /**
     * 获取职能跟对应的兴趣
     * @param params
     */
    profileList(params) {
        return fetch({method: 'post', url: 'userprofile/v2/profileList', params: params})
    },
    /**
     * 提交兴趣
     * @param positionList: Array 提交选中的智能信息
     */
    userProfile(params) {
        return fetch({method: 'post', url: 'userprofile/v2/userProfile', params: params})
    },
    /**
     * 为你推荐的轮番图
     * @param params
     */
    recommendCourse(params) {
        return fetch({method: 'post', url: 'userprofile/v1/recommendCourse', params: params})
    },
    /**
     * 发送验证码
     * @param mobile: Number 电话号码
     */
    setVerCode(params) {
        return fetch({method: 'post', url: 'userprofile/v1/getVerCode', params: params})
    },
    /**
     * 校验短信验证码（没用了）
     * @param params
     */
    checkVerCode(params) {
        return fetch({method: 'post', url: 'userprofile/v1/checkVerCode', params: params})
    },
    /**
     * 保存手机号码
     * @param mobile: Number 手机号码,
     * @param verCode: Number || null 验证码,
     * @param courseID: String 课程id
     */
    savePhone(params) {
        return fetch({method: 'post', url: 'userprofile/v1/mobile', params: params})
    },
    /*--------------------课后练习-----------------------*/
    /**
     * 评论列表数据
     * @param  senceID: String 微课id
     * @param  practiceCardID: String 卡片id
     */
    discussList(params) {
        return fetch({method: 'post', url: 'reviewTestPost/v1/postList', params: params})
    },
    /**
     * 评论列表点赞
     * @param postID: String 想法id,
     * @param clickType: String {'cancelLike': 取消, 'like': 点赞}
     */
    discussLink(params) {
        return fetch({method: 'post', url: 'reviewTestPost/v1/postLike', params: params})
    },
    /**
     * 发送评论
     * @param senceID: Sting 微课id
     * @param practiceCardID: String 卡片id
     * @param content: String 留言的内容，最多200字符
     */
    discussLeaveMessage(params) {
        return fetch({method: 'post', url: 'reviewTestPost/v1/post', params: params})
    },
    /*--------------------微课完成-----------------------*/
    /**
     * 第一次完成微课的，奖励即能币
     * @param courseID: String 课程id
     * @param senceID: String 微课id
     * @param requestFlag: Number
     * @param teamID: String 训练营id
     */
    sendFinish(params) {
        return fetch({method: 'post', url: 'course/sendFinish', params: params})
    },
    /**
     * 完成微课的信息
     * @param courseID: String 课程id
     * @param senceID: String 微课id
     * @param requestFlag: Number
     * @param teamID: String 训练营id
     */
    sendFinishResults(params) {
        return fetch({method: 'post', url: 'MVP3/getSenceFinishInitPage', params: params})
    },

    /*--------------------微课-----------------------*/
    // 课程页
    coursePageList(parmas) {
        return fetch({method: 'post', url: 'discover/v1/getDiscoverPageByCourseSeriesByLink', params: parmas, isVisitor: true})
    },
    // 课程详情
    courseDetail(params) {
        return fetch({method: 'post', url: 'MVP5/getCourseDetail', params: params, isVisitor: true})
    },
    // 赠送者→生成赠一得一
    createGiftID(params) {
        return fetch({method: 'post', url: 'gift/getGiftID', params: params})
    },
    // 受赠者→接受赠一得一
    receiveCourseGift(params) {
        return fetch({method: 'post', url: 'gift/receiveCourseGift', params: params, isUnFilter: true})
    },
    // 受赠者→保存giftID的接口
    saveGiftID(params) {
        return fetch({method: 'post', url: 'gift/saveGiftId', params: params, isUnFilter: true})
    },
    /**
     * 赠送者→创建一个普通分享的id
     * @param courseID String 课程ID
     * @param shareID String 分享ID
     */
    createShareID(params) {
        return fetch({method: 'post', url: 'gift/getShareID', params: params})
    },
    /**
     * 受赠者→接受一个普通分享
     * @param courseID String 课程ID
     */
    saveShareID(params) {
        return fetch({method: 'post', url: 'gift/saveShareID', params: params, isUnFilter: true})
    },
    // 课程详情
    courseShareCount(params) {
        return fetch({method: 'post', url: 'sence/senceShareRecord', params: params, isVisitor: true})
    },
    // 微课信息
    courseLearning(params) {
        return fetch({method: 'post', url: 'MVP3/getSenceCardListByGoPracticeLinkByNeedPayToTry', params: params})
    },
    // 重点卡
    collectionRecord(params) {
        return fetch({method: 'post', url: 'sence/cardCollectionRecord', params: params})
    },
    // 想法详情
    viewsDetails(params) {
        return fetch({method: 'post', url: 'senceViews/viewsDetails', params: params})
    },
    // 想法列表
    senceViewList(params) {
        return fetch({method: 'post', url: 'senceViews/senceViews', params: params})
    },
    // 发表一个想法
    publishSenceViews(params) {
        return fetch({method: 'post', url: 'senceViews/saveSenceViews', params: params})
    },
    // 回复一个想法
    replySenceViews(params) {
        return fetch({method: 'post', url: 'senceViews/replySenceViews', params: params})
    },
    /**
     * 微课想法→对一个想法的点赞
     * @param viewID String 想法ID
     */
    likeSenceViews(params) {
        return fetch({method: 'post', url: 'senceViews/likeSenceViews', params: params, isUnFilter: true})
    },
    // 取消对一个想法的点赞
    dislikeSenceViews(params) {
        return fetch({method: 'post', url: 'senceViews/dislikeSenceViews', params: params, isUnFilter: true})
    },
    // 删除一个想法
    deleteSenceViews(params) {
        return fetch({method: 'post', url: 'senceViews/deleteSenceViews', params: params})
    },
    /*--------------------发现页-----------------------*/
    // 发现页列表
    discoverPage(params) {
        return fetch({method: 'post', url: 'discover/v1/discoverPage', params: params, isVisitor: true})
    },

    /*--------------------测评-----------------------*/
    // 获得测评题目
    getExamPracticeList(params) {
        return fetch({method: 'post', url: 'userExam/getExamPracticeList', params: params, isVisitor: true})
    },
    // 获得测评题目
    sendUserDoExam(params) {
        return fetch({method: 'post', url: 'userExam/sendUserDoExam', params: params, isVisitor: true})
    },
    // 获得专题详情
    getNewSpecialCourse(params) {
        return fetch({method: 'post', url: 'course/getNewSpecialCourse', params: params, isVisitor: true})
    },
    // 专题投票
    sendUserPoll(params) {
        return fetch({method: 'post', url: 'course/sendUserPoll', params: params})
    },

    /*--------------------其他公共-----------------------*/
    // 获取staff的openid
    allOpenIDHash(params) {
        return fetch({method: 'post', url: 'common/getAllOpenIDHash', params: params, isVisitor: true})
    },
    // 训练营 提问
    sendTeamPost(params) {
        return fetch({method: 'post', url: 'teamByTaskOneDate/sendTeamPost', params: params, isVisitor: true})
    },
    //获取今日任务
    todayTaskList(params) {
        return fetch({method: 'post', url: 'todayTask/tasks', params: params, isVisitor: true})
    },
    //获取全部未学课程
    todayToLearnCourses(params) {
        return fetch({method: 'post', url: 'todayTask/toLearnCourses', params: params, isVisitor: true})
    },
    /**
     * 微课想法→课程回顾页删除想法
     * @param viewID String 想法ID
     */
    deleteSenceViews(params) {
        return fetch({method: 'post', url: 'senceViews/deleteSenceViews', params: params})
    },
}