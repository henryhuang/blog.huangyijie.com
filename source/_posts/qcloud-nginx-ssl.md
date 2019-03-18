---
title: Nginx使用SSL证书配置https
date: 2019-02-24 21:53:23
tags: ["nginx", "qcloud", "ssl", "https"]
cover: http://githubimg.wxio.club/image/jpg/nginx.jpeg
---

## 申请SSL证书

首先申请SSL证书，这里以腾讯云的免费DVSSL证书为例，前往 https://console.cloud.tencent.com/ssl/apply

- 填入通用名称，比如 www.wxio.club
- 最好不要密码
- 填好其他信息
- 点击下一步，如果域名在腾讯云解析，就选择 *自动DNS验证*，否则按照选项进行配置
- 点击确认申请

## 下载和上传证书

前往 https://console.cloud.tencent.com/ssl 下载刚申请的证书，以 www.wxio.club 为例，解压后有

```
.
├── Apache
│   ├── 1_root_bundle.crt
│   ├── 2_www.wxio.club.crt
│   └── 3_www.wxio.club.key
├── IIS
│   ├── keystorePass.txt
│   └── www.wxio.club.pfx
├── Nginx
│   ├── 1_www.wxio.club_bundle.crt
│   └── 2_www.wxio.club.key
├── Tomcat
│   ├── keystorePass.txt
│   └── www.wxio.club.jks
└── www.wxio.club.csr

```

复制Nginx里的 1_www.wxio.club_bundle.crt 和 2_www.wxio.club.key 到服务器的 /etc/nginx （其实那都可以）

## 配置 nginx.conf

编辑器打开 /etc/nginx/nginx.conf, 在 http 下面，添加或者修改配置：

```
server {
        listen 80;
        server_name www.wxio.club wxio.club;
        rewrite ^(.*)$ https://${server_name}$1 permanent; # 这里是使 http 跳转到 https
}

server {
        listen 443;
        server_name www.wxio.club wxio.club;

        ssl on;
        ssl_certificate 1_www.wxio.club_bundle.crt; # 这里可以写 .crt 的全路径
        ssl_certificate_key 2_www.wxio.club.key; # 这里可以写 .key 的全路径
        ssl_session_timeout 5m;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
        ssl_prefer_server_ciphers on;

        location / {
                root /home/git/www/public;
                index index.html index.htm;
        }

}
```

## 重启 nginx 服务

```
service nginx restart
```
