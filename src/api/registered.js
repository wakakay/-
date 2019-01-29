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
    /**
     * 今日任务Tab→在学课程
     * @param params
     */
    todaySkills(params) {
        return fetch({method: 'post', url: 'todayTask/skills', params: params})
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
     * 即能看板
     * @param  courseSeriesID: 系列ID
     * @param  seriesName: 系列的名称
     */
    getMyLearningPageBySkillgetDetail(params) {
        return fetch({method: 'post', url: 'myLearning/getMyLearningPageBySkillgetDetail', params: params})
    },
    /**
     * 团队学习
     * @param  queryText: 搜索的名字
     */
    querySenceList(params) {
        return fetch({method: 'post', url: 'team/querySenceList', params: params})
    },
    /**
     * 团队学习
     * @param  queryText: 搜索的名字
     */
    queryPracticeList(params) {
        return fetch({method: 'post', url: 'team/queryPracticeList', params: params})
    },
    /**
     * 团读书学习→发起讨论
     * @param  teamID: 团队ID
     */
    saveTeamPost(params) {
        return fetch({method: 'post', url: 'team/saveTeamPost', params: params})
    },
    /**
     * 团读书学习→发起讨论
     * @param  teamID: 团队ID
     */
    getActivityfeedList(params) {
        return fetch({method: 'post', url: 'teamByTaskOneDate/v1/getActivityfeedList', params: params})
    },
    /**
     * 团队学习→获取训练营详情
     * @param  teamID: 团队ID
     */
    getTeamDetail(params) {
        return fetch({method: 'post', url: 'teamByTaskOneDate/v1/getTeamDetail', params: params})
    },
    /**
     * 团队学习→单选题提交答案
     * @param  teamID: 团队ID
     * @param  senceID: 微课ID
     * @param  cardID: 练习卡片ID
     * @param  score: 练习卡片总分
     * @param  weight: 权重
     * @param  questionIndex: 选题选项权重
     * @param  message: 选项文本内容
     * @param  skillID: 练习所属技能
     * @param  json: 记录JSON格式
     */
    sendTeamPractice(params) {
        let data = Object.assign({
            message: 'defaultMessage',
            json: 'defaultJson'
        }, params)
        return fetch({method: 'post', url: 'teamByTaskOneDate/sendTeamPractice', params: data})
    },
    /**
     * 团队学习→导师，管理员设置置顶
     * @param  teamID: 团队ID
     * @param  postID: 排名任务id
     * @param  type: {top: 置顶, notTop: 取消置顶}
     */
    teamSetTop(params) {
        return fetch({method: 'post', url: 'teamByTaskOneDate/v1/setTop', params: params})
    },
    /**
     * 团队学习→排名列表
     * @param  teamID: 团队ID
     */
    getTeamRankList(params) {
        return fetch({method: 'post', url: 'teamByTaskOneDate/v1/getTeamRankList', params: params})
    },
    /**
     * 团队学习→排名列表→喜欢
     * @param  teamID: 团队ID
     * @param  rankUserID: 排名任务id
     */
    tickTeamRankLike(params) {
        return fetch({method: 'post', url: 'teamByTaskOneDate/tickTeamRankLike', params: params})
    }
}
