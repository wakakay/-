## css规范 ##
##### 1、命名规则，不实用驼峰命名，使用'-'来分割 #####
```css
.order-list{} /* good */
.orderList{} /* bad */
```
##### 2、使用前缀命名，区分模块，如 #####
    公用模块，使用'model-'开头<br> 
    行内模块，使用'ui-‘开头，或使用‘-box’表示一个块<br> 
    单元格元素，一般是对行内标签且或最底层添加，使用'cell-'开头
```css
    .model-header{}
    .ui-order-list{}
    .order-list-box{}
    .cell-button{}
```
##### 3、行内标签i，只用于使用字体图标，且字体图标的className开头为icon- #####
```css
    .icon-search{}
    .icon-add{}
```
##### 4、使用css选择器 #####
```css
    [class^='icon-']{} /* 所有icon-开头的className */
    [flex~="show:visible"]{} /* 匹配标签元素(attr)中flex中value包含show:visible的标签元素 */
    input[type="text"]{} /* 查找所有input的type为text的表单控件 */
    
    p~p{} /* p标签紧跟其后的下一个p标签 */
    p+p{} /* p标签紧跟气候的所有同级p标签 */
    
    :nth-child(1){} /* 查找某个元素下第一个子元素 */
    :nth-of-type(1){}  /* 查找某个元素下同元素第一个子元素 */
    
    :before{}
    :after{}
```
## less编译样式的注意事项 ##
##### 1、使用css3的自动计算长度的方法`calc` #####
    .box{width: calc(100% - 50px);}
    会编译成
    .box{width: calc(50%);}
    所以在less中正确的写法是
    .box{width: calc(~"100% - 50px");}
