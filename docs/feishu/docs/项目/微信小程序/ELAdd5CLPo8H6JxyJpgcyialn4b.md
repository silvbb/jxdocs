---
title: 微信云开发注意
urlname: ELAdd5CLPo8H6JxyJpgcyialn4b
date: '2025-03-25 21:49:17'
updated: '2025-03-26 22:34:47'
---
## 1，开发者工具
安装 cloudbase-cli

npm install -g @cloudbase/cli



部署云函数

cloudbase functions deploy login
## 2，
## 4，在小程序中调用云函数
```undefined
wx.cloud.callFunction({
  name: 'login',
  data: {
    // 传递给云函数的参数
  },
  success: res => {
    console.log('调用成功：', res.result)
  },
  fail: err => {
    console.error('调用失败：', err)
  }
})
```
## 5，MongoDB 文档型数据库
```undefined
//创建数据库
const db = wx.cloud.database()
try {
  await db.createCollection('cards')
  console.log('创建集合成功')
} catch(err) {
  // 如果集合已存在会报错
  console.error('创建集合失败：', err)
}

//调用数据库
const cloud = require('wx-server-sdk');
const db = cloud.database();
 try {
    const result = await db.collection('cards').aggregate()
      .match({
        ...event.query,
        recordType: 1
      })
      .sort({ //类似于orderBy
        gdp: -1,
      })
      .skip(0) //类似于skip
      .limit(1000) //类似于limit，不填默认是20，没有上限
      .end()
    return {
      success: true,
      data: result.list
    }
  } catch (e) {
    // 这里catch到的是该collection已经存在，从业务逻辑上来说是运行成功的，所以catch返回success给前端，避免工具在前端抛出异常
    return {
      success: false,
      message: e.message || '获取数据失败'
    };
  }
```
![image](/feishu/asset/images/CyZCboG4YovdOnxNdICcdQ6dnMf.png)
## 6，调用云函数
```javascript
const fetch = ({ type, query = {}, data = {} }) => {
  return wx.cloud.callFunction({
    name: type,  // 云函数名称
    data: {      // 传递给云函数的数据
      query,     // 查询条件
      data      // 数据内容
    }
  })
}
```
## 7,微信云后台
https://cloud1-7glran2p2974ebc6-1302766248.tcloudbaseapp.com/cloud-admin/#/user/settings/logon
用于微信开发者工具进行提交代码的帐号密码
用户名：jwisdom

密码：jwisdom237514@
## 8,上线
https://mp.weixin.qq.com/

小程序：
君盛达 主体小芝  

杰维智能 主体罗锋 silvbb@gmail.com Robinhood283818@
## 9，授权助手，让你轻松实现微信扫码登录
https://www.authmate.cn/
```undefined
import createAuthmate from '@ostore/authmate';

// 创建实例
const authmate = createAuthmate({ container: 'container', appid: 'appid', uid: 'uid', loop: true});
// 获取用户信息
const user = await authmate?.login(); 
```
## 10，微信开发者代码管理
https://git.weixin.qq.com/#wechat_redirect
