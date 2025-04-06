---
title: 网络命令
urlname: By3Gdf4jMoYYY7xpWT6cZ3NNnNc
date: '2025-04-02 01:01:45'
updated: '2025-04-02 23:32:21'
---
## 1，POST和PUT
是HTTP协议中的两种请求方法：

POST（发布） ：
- 用于向服务器提交数据，通常用于创建新资源

- 不具有幂等性（多次相同请求可能会创建多个资源）

- 数据通常在请求体中传输

- 常见用途：提交表单、上传文件、创建新记录



PUT（放置） ：
- 用于向服务器更新资源，或者在指定位置创建资源

- 具有幂等性（多次相同请求产生的效果相同）

- 完全替换目标资源

- 常见用途：更新已存在的资源

![image](/feishu/asset/images/YtErbab1xopHRyxO4nQcnWwanSh.png)
从您的日志截图来看，天猫精灵平台尝试向您的服务器发送了一个POST请求到 https://gm.mmstat.com/aes.1.1 和一个PUT请求到 https://iap.aligenie.com/api/hybird/logicConfig ，但两者都失败了。



您的Home Assistant服务器已经正确响应了认证文件的GET请求，但天猫精灵平台在尝试与其自己的API通信时遇到了问题。这些错误可能与天猫精灵平台内部通信有关，而不是您的Home Assistant配置问题。


- POST 请求到 https://gm.mmstat.com/aes.1.1 失败，显示 ERR_CONNECTION_CLOSED

- PUT 请求到 https://iap.aligenie.com/api/hybird/logicConfig 失败，显示 403 (Forbidden)

- mmstat.com 是阿里巴巴的统计和分析服务域名

- iap.aligenie.com 是天猫精灵平台的API域名


## 2，内网穿透
公网访问你的开发环境，如果无公网IP可以使用内网穿透的方式来进行。推荐几个内网穿透服务如下：
1. [https://github.com/open-dingtalk/dingtalk-pierced-client](https://github.com/open-dingtalk/dingtalk-pierced-client?spm=a2c6h.12873639.article-detail.6.5d844decw9AZ2W)**（推荐，本文使用）**

1. [https://ngrok.com/](https://ngrok.com/)

1. [https://natapp.cn/](https://natapp.cn/)

1. [https://hsk.oray.com/](https://hsk.oray.com/)

1. [https://expose.dev/](https://expose.dev/)

1. [https://github.com/fatedier/frp](https://github.com/fatedier/frp) 自建

1. [https://github.com/ehang-io/nps](https://github.com/ehang-io/nps) 自建


## 3，iptables 
iptables 是 Linux 系统中用于配置网络防火墙的命令行工具，它允许您设置、维护和检查 IPv4 数据包过滤规则。以下是 iptables 的基本使用方法：


### 基本概念
iptables 使用"表"和"链"的概念来组织规则：
- 表(tables)：filter(默认)、nat、mangle、raw 等

- 链(chains)：INPUT、OUTPUT、FORWARD 等

### 常用命令
1. 查看当前规则

```bash
sudo iptables -L -v
```
1. 添加规则

```bash
# 允许特定端口
sudo iptables -A INPUT -p tcp --dport 8123 -j ACCEPT
```
```plaintext

3. 删除规则
```bash
# 删除特定规则
sudo iptables -D INPUT -p tcp --dport 8123 -j ACCEPT
```
```plaintext

4. 设置默认策略
```bash
sudo iptables -P INPUT ACCEPT
```
1. 保存规则

```bash
sudo iptables-save > /etc/iptables/rules.v4
```
6. 恢复规则
```plaintext
sudo iptables-restore < /etc/iptables/rules.v4
```
```plaintext
### 实用示例
1. 允许 Home Assistant 端口
```bash
sudo iptables -A INPUT -p tcp --dport 8123 -j ACCEPT
2. 允许已建立的连接
```bash
sudo iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
3. 阻止特定 IP
```bash
sudo iptables -A INPUT -s 192.168.1.100 -j DROP
```
如果您经常使用 iptables，可以考虑在 .bashrc 中添加一些别名来简化操作：
```plaintext
# iptables 快捷命令
alias ipt='sudo iptables'
alias iptlist='sudo iptables -L -v --line-numbers'
alias iptsave='sudo iptables-save > /etc/iptables/rules.v4'

# ... 现有代码 ...
```

