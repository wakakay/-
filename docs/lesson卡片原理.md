## lesson卡片原理及组件 ##
* 业务原理
    > 1、以卡片的形式展示课程内容的方式 <br/> 
      2、交互卡，poll、quiz、sort、 image、hot-spot、seesion、front等展示形式组件<br/>
      3、poll、quiz、sort、seesion未完成下不可能切换到下一张 <br/>
      4、最后一张是front卡的时候代表是有即练的页面
      5、components/cards-type，是所有卡片组件的
* 实现原理：
    > 1、使用wx api提供的swiper组件 <br/> 
      2、在swiper外层添加一个view并绑定bindtouchstart，bindtouchend <br/>
      3、swiper下的swiper-item中用getCatchTouchMove屏蔽原有的手势滑动事件
      
* 微信组件的坑
    > 1、组件在实例化中是公用的，所以通过循环遍历出来的组件，他们是公用数据及方法
      2、但在template的渲染中却是独立的
      
* 微信组件坑解决方案
    > 1、传递的参数中传入一个整个组数对象，及对应的索引值，直接匹配操作
      2、但其缺点就是变量会很长，对于三级遍历，不容易阅读
      
* 其他组件
    > 1、components/course-module/learning-discuss想法列表，会自动获取父级的courseID跟senceID去请求接口，渲染列表
    > 2、components/shareImages/share-card 生成分享图
