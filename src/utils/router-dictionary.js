/**
 * @file
 * @author: lzb
 * @params: 参数说明
 * @history:
 * Date      Version Remarks
 * ========= ======= ==================================
 * 2018/9/25      1.0     First version
 *
 */
export const ROUTERS = {

    /*-------------------课程-----------------------*/
    'pages/FindList/index': {screenName: '发现页', isLevel: true},
    /*-------------------课程-----------------------*/
    'pages/course-module/course': {screenName: '课程页', isLevel: true},
    'pages/course-module/course-new-details': {screenName: '课程详情页'}, // 需要记录哪门子课程详情
    'pages/course-module/course-details': {screenName: '课程详情页'}, // 需要记录哪门子课程详情
    'pages/course-module/assortment': {screenName: '系列详情页'}, // 需要记录哪门子的系列课程
    'pages/course-module/course-learning': {screenName: '微课学习'}, // 需要记录哪门子的微课
    'pages/course-module/lesson': {screenName: '微课学习'},
    'pages/course-module/lesson-for-android': {screenName: '微课学习'},
    'pages/Review/index': {screenName: '微课回顾'},
    'pages/course-module/course-discuss': {screenName: '微课即练评论'}, // 需要记录哪门子的微课
    'pages/course-module/course-complete': {screenName: '微课学习成果'}, // 需要记录哪门子的微课
    'pages/course-module/course-level-instructions': {screenName: '技能等级说明'},
    'pages/course-module/course-evaluation': {screenName: '微课评价'}, // 需要记录哪门子的微课
    'pages/course-module/course-pay': {screenName: '微课支付'}, // 需要记录哪门子的微课
    'pages/SingleSelection/index': {screenName: '微课即练'}, // 需要记录哪门子的微课
    'pages/Sorting/index': {screenName: '微课即练'}, // 需要记录哪门子的微课?
    /*-------------------其他模版-----------------------*/
    'pages/other-module/work-template':  {screenName: '精练工作模板'},
    'pages/other-module/job-skills':  {screenName: '核心工作技能'},
    'pages/other-module/community':  {screenName: '专属社群'},
    /*-------------------训练营-----------------------*/
    'pages/training-camp-module/index': {screenName: '训练营', isLevel: true},
    'pages/training-camp-module/all-training': {screenName: '训练营-查看全部训练营'},
    'pages/training-camp-module/introduce': {screenName: '训练营-训练营介绍'},
    'pages/training-camp-module/registration': {screenName: '训练营-报名'},
    'pages/training-camp-module/registration-info': {screenName: '训练营-报名信息'},
    'pages/training-camp-module/coursr-list': {screenName: '训练营-课程列表'},
    'pages/training-camp-module/release-message': {screenName: '训练营-发布消息'},
    'pages/training-camp-module/add-task': {screenName: '训练营-添加任务'},
    'pages/training-camp-module/invite-friends': {screenName: '训练营-邀请好友'},
    'pages/training-camp-module/skill-levels': {screenName: '训练营-技能水平'},
    'pages/training-camp-module/evaluation': {screenName: '训练营-评价'},
    'pages/training-camp-module/ranking-list': {screenName: '训练营-排行榜'},
    'pages/training-camp-module/transcript': {screenName: '训练营-成绩单'},
    'pages/training-camp-module/learning-result': {screenName: '训练营-学习成果'},
    'pages/training-camp-module/task-list': {screenName: '训练营-全部任务'},
    'pages/training-camp-module/my/main': {screenName: '我管理-管理'},
    'pages/training-camp-module/my/edit': {screenName: '我管理-编辑训练营'},
    'pages/training-camp-module/my/students-list': {screenName: '我管理-学员列表'},
    'pages/training-camp-module/my/students-management': {screenName: '我管理-学员管理'},
    'pages/training-camp-module/my/release-task': {screenName: '我管理-发布任务'},
    'pages/training-camp-module/my/share-link': {screenName: '我管理-分享链接'},
    'pages/training-camp-module/my/course-evaluation': {screenName: '我管理-课程评价'},
    'pages/training-camp-module/my/release-poll': {screenName: '我管理-发布投票'},
    'pages/training-camp-module/my/learning-goals': {screenName: '我管理-学习目标'},

    /*-------------------活动-----------------------*/
    'pages/SpecialCourse/index': {screenName: '课程专题页'},  // 需要记录哪个专题
    'pages/GiftDetail/index': {screenName: '赠一得一详情'},
    'pages/Largess/index': {screenName: '赠一得一'},
    'pages/activity-module/appraisal-start': {screenName: '测评页面'},
    'pages/activity-module/appraisal-questions': {screenName: '测评答题'},
    'pages/activity-module/appraisal-results': {screenName: '测评结果'},
    /*-------------------注册-----------------------*/
    'pages/registered-module/weclome': {enName: 'welcome_page', screenName: 'user onboarding-欢迎页'},
    'pages/registered-module/interest-select': {enName: 'interest_select', screenName: 'user onboarding-职能选择页'},
    'pages/registered-module/recommend': {enName: 'course_recommend', screenName: 'user onboarding-课程推荐页'},
    /*-------------------我的-----------------------*/
    'pages/user-module/mine': {screenName: '我的'},
    'pages/user-module/mine-edit': {screenName: '我的-个人信息'},
    'pages/user-module/mine-edit-status': {screenName: '我的-更改职能'},
    'pages/user-module/mine-edit-interest': {screenName: '我的-更改兴趣'},
    'pages/user-module/mine-edit-target': {screenName: '我的-更改目标'},
    'pages/user-module/mine-edit-phone': {screenName: '我的-更改手机号码'},
    'pages/user-module/mine-edit-email': {screenName: '我的-更改邮箱'},
    'pages/user-module/skill-board': {screenName: '我的-技能看板'},
    'pages/user-module/lesson-list': {screenName: '我的-已完成微课'},
    'pages/user-module/score-detail': {screenName: '我的-即能币明细'},
    'pages/user-module/score-rules': {screenName: '我的-即能币规则'},
    'pages/user-module/apply-for-test': {screenName: '我的-申请成为内测用户'},
    'pages/user-module/mine-feedback': {screenName: '我的-意见反馈'},
    /*-------------------异常-----------------------*/
    'pages/Mistake/index': {screenName: '异常-报错页面'}, // 某个接口不通、服务器挂了、用户网络超时等
    'pages/NoLogin/index': {screenName: '异常-登录页面'}, // 某个接口拿不到正确的token导致的
}
