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

/**
 * 昨天说到了基本面分析，一家公司的决定因素有四个，

 第一是预期增长率，不能增长的公司，也就不能给估值溢价，所以增长很重要，他是复利的源泉，但是这有一个问题，那就是公司是有生命周期的，不能一直增长下去，比如100年前的明星公司，基本所剩无几，另外，基数效应也是问题，1000万的小公司，一年翻一倍很容易，而1000亿的大公司，就很难保持业绩持续增长。所以买增长其实是两个维度，一个是增长率有多高，一个是确定的增长时间有多长，如果他增长100%，但一年就结束了，那么也没什么价值，如果只有8%的增长，能保持30年，这也是一家很伟大的公司。而在华尔街，投资者们几乎都会犯下乐观的毛病。大家给他的市盈率，要明显高于他们的实际增长。

 第二，是股利支付率，股利是除了价格之外收回投资的唯一渠道，所以股利给的越高，价格也就应该越高，但这条规则，好像越来越不适用了，比如公用事业， 银行，汽车股的股利就非常高，但是他们的估值很低，说白了还是因为第一点，增长率太低。

 第三，风险程度，风险低的股票，就应该遭遇资金哄抢，所以估值会高，而风险高的股票，估值应该越低，但这条老齐觉得，作者说错了，现实中风险低的公司，确实估值不便宜，但是风险大的公司，往往估值更高。很多都是没影的事，竟然能炒出天价。

 第四，市场利率水平，利率水平越高，股票就越低，比如美国80年代初，公司债利率逼近了15%，那会股票可谓是一片惨淡，也是整个股市最黑暗的时候。1987年股灾也是如此，利率大幅上升，结果股市崩盘，所以市场利率是一个重要的指标。如果市场利率在高位，意味着股市就在低位，如果市场利率很宽松，那么股市就会走好。但有时候他不是线性的，不是说利率一涨，股市就跌，很可能他一直涨，股市也涨，但某一时点突然崩盘。

 所以根据这四个因素，我们可以判断出，公司增长率越高，增长时间越长，股利发放越多，以及风险越低的公司，在高利率转低利率环境下买入，就可以取得不错的收益。但是作者在这来了个转折，他说除了四点因素，还有三点警示。

 警示1，对将来的预期无法证明，你的情绪会随着大环境而变化，乐观的时候你会更乐观，而悲观的时候，你会对自己充满怀疑。所以被情绪所裹挟的预测，根本就可能是错误的

 警示2，运用不确定的信息进行估值，不可能得到精确值，既然是预估，一个是预期，一个是估值，这两都是不确定的，所以你不可能得到一个准确的结果，甚至可能结果天差地别。就连公司创始人，ceo，都无法预测公司未来5年的业绩，更别提分析师了。大家其实而更多是用过去的增长率，倒推他未来的增长率。这其实完全不靠谱。

 警示3，市场偏好也不确定，有的时候喜欢增长，有的时候喜欢价值，还有的时候他什么都不信，又或者什么都信，所以你去预测5年后的估值，这就有很大的问题，你完全不可能知道到时候的市场状况。

 所以基本面分析，尽管看起来逻辑严谨，也有很多大师证明过，但是却很可能不管用，他更像是一个穿着科学外衣的封建迷信，有着巨大的缺陷，就像刚才说的，评估的分析师不靠谱，评估的公司不靠谱，评估的市场环境也不靠谱，这三项可是乘积关系，所以最后你想想你的价值评估得差距多大。老齐多说一句，作者说这个是非常正确的，价值分析与估值是不可能算出一个非常明确的结果的，比如你觉得20元是价值低估了，那么他会不会跌到10块钱呢？太有可能了，巴菲特就遇到过很多次这种情况。伯克希尔当年拖累了他多少年，说白了就是估值没错，但市场偏好错了，市场不喜欢没有增长的东西了，所以基本面分析，你必须把市场情绪考虑进去，而这其实已经变成了玄学，也就是说，你必须在熊市里去克服自己的心魔，然后分析他的基本面，只有熊市里买什么才是都是对的。彼得林奇为什么是最牛的基金经理，因为命好，彼得林奇总说自己背，他一升官，保证赶上股市大跌。但这恰恰是让他先苦后甜，一开始被骂，但他却买什么都对。以他那么爱买股票的个性，如果他一上任就是牛市末期，那么结果可能就完全相反了。

 最近几年，还出现一个流派那就是结合了技术分析与基本面分析。这其实也很简单，就是他们先用基本面分析找出一个能够连续五年增长的股票池，他们期待的是，在这些股票没被别人发掘之前，就买进去，然后等待戴维斯双击的机会，也就是业绩和估值双提升，比如彼得林奇就用了这种方法，他用市盈率比上增长率，得到PEG指标，PEG小于1就是一个很好地买入信号。再然后他们就要看看，这些故事是否真的具备感染力，能不能激发市场的想象力，这就是空中楼阁理论，如果正是市场中最容易炒作的题材，那么他就有很强的上涨动力，如果跟大环境相背离，那么就比较麻烦，举个例子，比如养老抗癌药，这东西就很容易炒作，而在去杠杆背景下，PPP项目，就比较难获得认同。所以经过三重把控，这个流派投资的成功率也将有一定的提升。

 下面作者继续黑技术分析，说这些分析师，你走近他们会发现他们的鞋子上有破洞，那意思就是说，他们已经穷的连新鞋都买不起了，还在那里装大师，作者说有一次他就问这些分析师，为什么没赚到钱，这些人的回答让人啼笑皆非，他们说那是因为他们没有相信自己的图表。所谓技术分析，其实完全就是话术而已，他们经常会说如果大盘既不上涨，也不下跌，那他将保持横向波动，或者告诉你低买高卖，波段操作。作者讲，技术分析其实就是试图用过去的价格预测未来的股价，道理就是，一直上涨的股票更容易上涨，一直下跌的股票更容易下跌，就这么简单。但你能说一个人扔了10把色子，都开了大，就认为他第11把扔出大的概率更大吗？其实并不是。

 为了证明他的观点，他让学生做了个实验，用抛硬币来模拟股价，正面就代表上涨，背面就代表下跌， 结果学生抛硬币，竟然做出了一条跟股市K线几乎相同的走势图，而且也呈现出了周期波动，什么头肩顶，三重底，这些形态全都有。后来他把这张图拿给图表分析师看，这哥们果真上当，认为这只股票走的很经典，未来仍将上涨。在得知真相后，两人从此就友尽了。

 抛硬币都能得到股票走势，足以说明随机漫步性，也就是说，股票的走势短期完全随机，根本没有什么规律可言，第二天上涨和下跌的概率都是50%，当然作者也不是说，技术分析从来赚不到钱，但他只能在某一时段赚到钱，而长期下来，几乎没有人是通过技术分析发财的，所以短期赚钱，很可能与时机和命有关。也就是说很可能就是赶上了，蒙对了。与技术分析进行对照的是，简单的买入持有，任何时间都不卖，在过去的80年间，市场为投资者提供了将近年化10%的投资回报率。技术分析显然从没达到这个长期收益水平，所以很显然他是无效的。

 当然技术分析肯定不服输，他说我们可不是傻投，我们有自己的系统，比如从低点反弹5%，我们才认为趋势确立，从高点跌去5%，我们会认为趋势结束，所以这种过滤系统能帮我们减少不少的损失，但有学者就是很较真，跑了一遍各种过滤系统，无论是1%还是50%，如果考虑到交易成本，最后结果无疑都跑不赢简单的买入持有，还有很多什么道氏理论，相对强弱理论，量价理论，都一样，经过长期数据测试下来，他们基本跑不赢买入并持有的策略。换句话说根本跑不赢指数。

 至于那些大师，比如艾略特，他其实是个会计，他的理论一开始默默无闻，后来一个美林证券的初级普通分析师普莱切特却如获至宝，他用这套理论进行操作，并在媒体发表投资文章，一开始赶上了牛市，所以几乎说什么都对，把自己炒成了网红股市大师，那么他用这套方法到底准不准呢？咱们明天接着讲。
 */
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
    // 生成赠一得一
    createGiftID(params) {
        return fetch({method: 'post', url: 'gift/getGiftID', params: params})
    },
    // 接受赠一得一
    receiveCourseGift(params) {
        return fetch({method: 'post', url: 'gift/receiveCourseGift', params: params, isUnFilter: true})
    },
    // 保存giftID的接口
    saveGiftId(params) {
        return fetch({method: 'post', url: 'gift/saveGiftId', params: params, isUnFilter: true})
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
    // 给一个想法点赞
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
    }
}