---
title: .homeassistant自定义
urlname: HtBqdlc4So2ARTxZAglc4hDUnOc
date: '2025-03-27 00:25:21'
updated: '2025-03-27 15:55:51'
---

## 1，小米音箱 miservice
创建 MiAccount 实例进行登录认证

set MI_USER=15073592888

set MI_PASS=cfeihong1024@

python micli.py list 获取所有小米设备

echo %MI_USER%


### 设置 DID
export MI_DID=<Device ID|Name>



set MI_DID=594644116

echo %MI_DID%



查询设备的 MIoT 接口能力描述：

python micli.py spec xiaomi.wifispeaker.lx04

播报“您好”

python micli.py 5 您好



 查询音量属性

python micli.py 2-1

对音箱说“小爱同学，查询天气”是一个效果：
python micli.py 5-4 查询天气 1


## 2，ZhiBot
```bash
https://127.0.0.1:8123/genie2bot?q=action
https://127.0.0.1:8123/genie2bot?q=place
https://127.0.0.1:8123/genie2bot?q=device
```
```bash
@{action}@{place}@{device}
@{action}@{place}
@{action}@{device}
@{place}@{device}
@{action}
@{place}
@{device}
```

