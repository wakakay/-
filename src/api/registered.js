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
        return fetch({method: 'post', url: 'common/v1/getImage', params: params})
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
    /**
     * 获取测评卷封面信息
     * @param  examID: 测评ID
     */
    getExamFront(params) {
        return fetch({method: 'post', url: 'userExam/getExamFront', params: params, isVisitor: true})
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
     * 我的列表
     * @param params
     */
    getMyCenterNew(params) {
        return fetch({method: 'post', url: 'userCenter/userCenterInitPage', params: params})
    },

    /**
     * study bar
     * @param params
     */
    getMyLearningSenceList(params) {
        return fetch({method: 'post', url: 'myLearning/v1/getMyLearningSenceList', params: params})
    },

    /**
     * 测试用户
     * @param otherLink
     */
    addTestUser(params) {
        return fetch({method: 'post', url: 'MVP3/addTester', params: params})
    },
    /**
     * 测试用户页面初始化
     * @param params
     */
    getTestUserDetail(params) {
        return fetch({method: 'post', url: 'userCenter/initSendTestPage', params: params})
    },
    /**
     * 上报中台埋点
     * @param  courseID: 课程ID
     * @param  pageTime: 开始到结束的时间戳
     */
    sendCoursePageTime(params) {
        return fetch({method: 'post', url: 'report/sendCoursePageTime', params: params})
    },
    /**
     * 系列详情
     * @param  courseSeriesID: 系列ID
     * @param  seriesName: 系列的名称
     */
    getDiscoverPageByCourseSeriesByLinkByDetailNew(params) {
        return fetch({method: 'post', url: 'discover/v1/getDiscoverPageByCourseSeriesByLinkByDetailNew', params: params})
    },
    /**
     * 即能看板
     * @param  courseSeriesID: 系列ID
     * @param  seriesName: 系列的名称
     */
    getMyLearningPageBySkillgetDetail(params) {
        return fetch({method: 'post', url: 'myLearning/getMyLearningPageBySkillgetDetail', params: params})
    },
    /**
     * 系列页
     * @param  seriesID: 系列ID
     */
    getSeriesPage(params) {
        return fetch({method: 'post', url: 'discover/v1/getSeriesPage', params: params})
    }
}