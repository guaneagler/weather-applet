# weather-applet

## 天气查询小程序

## 功能：

### 通过城市查询天气
- 手动输入城市名
- 选择之前查询的记录

### 显示城市当前的天气
- 点击查看之后三天的天气

## 实现：
### 布局
- 主要采用flex进行布局
- 样式主要参考微信小程序设计指南 https://mp.weixin.qq.com/debug/wxadoc/design/index.html?t=2017118
- 小程序设计指南最后附有小程序可用的psd文件
### 事件绑定
- bindtap
- bind*
- 绑定函数需要传递参数，需要加data-*属性
### 存储
- setStorageSync
- getStorageSync
### 主要功能参考 框架 https://mp.weixin.qq.com/debug/wxadoc/dev/framework/MINA.html 和 小程序demo

