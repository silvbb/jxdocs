---
title: 服务器（nginx apache）
urlname: OzjmdQArcoEpeBxZuhncyRtun3b
date: '2025-04-02 11:44:59'
updated: '2025-04-02 23:58:52'
---
## 1，apache
改变其端口，编辑配置文件

sudo nano /etc/apache2/ports.conf


## 2, nginx
请求处理流程：

所有请求 -> Nginx 监控的端口 -> 配置location 代理到 127.0.0.1:8000（自己设定） -> 后台框架应用（比如Laravel 应用）



172.30.33.xxx是NGINX反向代理服务的网段（来自官方文档），所以要添加信任才能公网访问，不然会出现 400 bad request 的错误。
```undefined
http:
  server_host: 0.0.0.0  # 监听所有网络
  server_port: 8133
  use_x_forwarded_for: true
  trusted_proxies:
    - 127.0.0.1
    - ::1
    - 172.0.0.0/8  # 覆盖WSL可能使用的IP范围
    - 192.168.0.0/16
  ip_ban_enabled: true
  # 如果用户连续5次登录失败，IP会被临时封禁
  login_attempts_threshold: 5
  # CORS（跨源资源共享）允许列表中的域名访问HA的API
  cors_allowed_origins:
    - https://ha.jwisdom.fun
    - https://dha.jwisdom.fun  
```
创建 NGINX 配置文件：

在Ubuntu系统上，NGINX的配置文件通常位于以下位置：

1. 主配置文件： /etc/nginx/nginx.conf

2. 站点配置文件： /etc/nginx/sites-available/your-site-config


```toml
#符号链接
sudo ln -s /etc/nginx/sites-available/homeassistant /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/tmall /etc/nginx/sites-enabled/

sudo nginx -t  # 测试配置是否有错误
sudo systemctl restart nginx

关闭nginx
wsl -d Ubuntu-20.04 sudo service nginx stop

或在~/.bashrc设定快捷指令
alias ng2='sudo service nginx start'
alias ng3='sudo service nginx stop'
alias ng4='sudo service nginx status'
```
### 检查 Nginx 用户权限
```yaml
# 检查 Nginx 用户
ps aux | grep nginx

# 如果需要，修改 Nginx 用户权限
sudo usermod -a -G <homeassistant用户组> nginx
```


使用sudo touch 或直接通过 sudo vim 创建的 Nginx 配置文件



配置内容包含：
- 监听端口和 SSL 配置

- 服务器名称 (tm.jwisdom.fun)

- SSL 证书和密钥路径

- 安全头设置

    
- SSL 协议和加密套件

    ChaCha20-Poly1305 加密套件，对移动设备更友好
- 代理设置和 WebSocket 支持

- HTTP 到 HTTPS 的重定向

- SSL 会话管理

     ssl_session_timeout 、 ssl_session_cache 和 ssl_session_tickets off
### 完整homeassistant配置文件：
sudo vim /etc/nginx/sites-available/homeassistant
```undefined
server {
    listen 443 ssl;
    server_name ha.jwisdom.fun;
    
    ssl_certificate /mnt/f/project_space/.homeassistant-wsl/ssl/let.fullchain.pem;
    ssl_certificate_key /mnt/f/project_space/.homeassistant-wsl/ssl/let.privkey.pem;
    
     # 在这里添加安全头
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options SAMEORIGIN;
    add_header X-XSS-Protection "1; mode=block";
    
    # 其他SSL优化设置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    
    # 代理设置
    location / {
        proxy_pass http://127.0.0.1:8123;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        
        # WebSocket支持
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        
        # 添加这些头信息
        proxy_buffering off;
        proxy_redirect off;
        
        # 增加超时时间
        proxy_read_timeout 1800s;
        proxy_send_timeout 1800s;
    }
}

# HTTP重定向到HTTPS
server {
    listen 80;
    server_name ha.jwisdom.fun;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name dha.jwisdom.fun;
    
    ssl_certificate /mnt/f/project_space/.homeassistant-docker/ssl/dha.jwisdom.fun_public.crt;
    ssl_certificate_key /mnt/f/project_space/.homeassistant-docker/ssl/dha.jwisdom.fun.key;
    
     # 在这里添加安全头
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options SAMEORIGIN;
    add_header X-XSS-Protection "1; mode=block";
    
    # 其他SSL优化设置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    
    # 代理设置
    location / {
        proxy_pass http://127.0.0.1:8133;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        
        # WebSocket支持
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}

# HTTP重定向到HTTPS
server {
    listen 80;
    server_name dha.jwisdom.fun;
    return 301 https://$host$request_uri;
}


```
### 完整tmall配置文件：
```undefined
# HTTP 服务器 - 将所有 HTTP 请求重定向到 HTTPS
server {
    listen 80;
    server_name tm.jwisdom.fun;
    
    # 将 HTTP 请求永久重定向到 HTTPS
    return 301 https://$host$request_uri;
}

# HTTPS 服务器
server {
    listen 443 ssl;
    server_name tm.jwisdom.fun;  # 确保与证书匹配
    
    # SSL 证书配置
    ssl_certificate /mnt/f/project_space/aligenie-skill-demo-main/ssl/tm.jwisdom.fun.pem;
    ssl_certificate_key /mnt/f/project_space/aligenie-skill-demo-main/ssl/tm.jwisdom.fun.key;
    
    # 优化 SSL 设置
    ssl_protocols TLSv1.2 TLSv1.3;                # 只使用安全的 TLS 版本
    ssl_prefer_server_ciphers on;                 # 优先使用服务器定义的加密套件
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305;  # 安全的加密套件
    ssl_session_timeout 1d;                       # SSL 会话超时时间
    ssl_session_cache shared:SSL:10m;             # SSL 会话缓存
    ssl_session_tickets off;                      # 禁用不安全的会话票证
    
    # 安全头设置
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;  # HSTS 策略
    add_header X-Content-Type-Options nosniff always;                                  # 防止 MIME 类型嗅探
    add_header X-Frame-Options SAMEORIGIN always;                                      # 防止点击劫持
    add_header X-XSS-Protection "1; mode=block" always;                                # XSS 保护
    add_header Content-Security-Policy "upgrade-insecure-requests" always;             # 强制使用 HTTPS
    
    # 性能优化
    client_max_body_size 10M;                     # 允许上传的最大文件大小
    gzip on;                                      # 启用 Gzip 压缩
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;  # 压缩类型
    
    # 日志配置
    access_log /var/log/nginx/tm.jwisdom.fun.access.log;
    error_log /var/log/nginx/tm.jwisdom.fun.error.log;
    
    # 天猫精灵认证文件特殊处理
    location /aligenie/ {
        # 优先尝试直接代理到 Laravel，确保认证文件请求被正确处理
        try_files $uri $uri/ @laravel;
    }
    
    location @laravel {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
    }
    
    # 默认代理设置
    location / {
        proxy_pass http://127.0.0.1:8000;         # 代理到 Laravel 服务
        proxy_set_header Host $host;              # 传递原始主机名
        proxy_set_header X-Real-IP $remote_addr;  # 传递客户端真实 IP
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;  # 传递代理链信息
        proxy_set_header X-Forwarded-Proto https;  # 传递协议信息
        
        # WebSocket 支持
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        
        # 超时设置
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}

```
```yaml
# 默认静态文件处理
location / {
    try_files $uri $uri/ /index.php?$query_string;
}
```
- $uri ：首先尝试直接访问请求的文件（例如： /image.jpg → 直接返回图片）

- $uri/ ：如果上一步失败，尝试当作目录访问（例如： /blog/ → 寻找 /blog/index.html ）

- /index.php?$query_string ：前两步都失败时，将请求转发给 index.php （Laravel 入口文件）

```yaml
# 修改 Nginx 配置，阻止直接访问认证文件路径
location /aligenie/ {
    # 禁用静态文件查找，直接转发给后台框架处理
    try_files = /index.php?$query_string;
}
```

| 配置状态            | 无配置      | 配置1      | 配置1+配置2       |
| --------------- | -------- | -------- | ------------- |
| 静态文件访问          | √ 自动支持   | √ 自动支持   | √ 自动支持        |
| Laravel 路由      | × 全部404  | √ 正常     | √ 正常          |
| /aligenie/ 路径处理 | × 直接返回文件 | × 直接返回文件 | √ 强制走 Laravel |


## 3，测试工具
postman或curl



可以curl -v -X POST
```undefined
curl -k -X POST https://tm.jwisdom.fun/api/teach/tmall/animate-master \
  -H "Content-Type: application/json" \
  -d '{"intentName":"ai.dueros.common.default_intent","slotEntities":[],"utterance":"你好"}'
  
  收到的：请求经过 Nginx 代理转发（可以看到 x-forwarded-proto 等头信息）
  [2025-04-02 14:13:21] local.INFO: 收到天猫精灵请求 {"data":{"intentName":"ai.dueros.common.default_intent","slotEntities":[],"utterance":"你好"},"headers":{"host":["tm.jwisdom.fun"],"x-real-ip":["172.23.96.1"],"x-forwarded-for":["172.23.96.1"],"x-forwarded-proto":["https"],"connection":["upgrade"],"content-length":["87"],"user-agent":["curl/8.5.0"],"accept":["*/*"],"content-type":["application/json"]}} 
```
-v (--verbose) ：显示详细通信过程

-X (--request) ：指定 HTTP 请求方法

-k 参数忽略 SSL 证书验证
