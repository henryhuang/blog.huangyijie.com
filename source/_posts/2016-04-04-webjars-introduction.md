title: WebJars介绍
date: 2016-04-04 22:26:26
tags: [webjars, java, javascript, css]
categories: introduction
---

## 什么是WebJars

什么是WebJars？WebJars是将客户端（浏览器）资源（JavaScript，Css等）打成jar包文件，以对资源进行统一依赖管理。WebJars的jar包部署在Maven中央仓库上。

## 为什么使用WebJars

我们在开发Java web项目的时候会使用像Maven，Gradle等构建工具以实现对jar包版本依赖管理，以及项目的自动化管理，但是对于JavaScript，Css等前端资源包，我们只能采用拷贝到webapp下的方式，这样做就无法对这些资源进行依赖管理。那么WebJars就提供给我们这些前端资源的jar包形势，我们就可以进行依赖管理。

## 三种风格的WebJars

官方提供三种风格的WebJars，NPM，Bower，和Classic。

### NPM WebJars

- 根据镜像即时创建和部署
- 任何人都可以请求发布资源包
- 使用[NPM](https://www.npmjs.com/)的镜像资源，NPM是javascript（主要是nodejs，iojs）的包管理工具

### Bower WebJars

- 根据镜像即时创建和部署
- 任何人都可以请求发布资源包
- 使用[Bower](http://www.bower.io/)的镜像资源，Bower是前端资源的管理工具

### Classic WebJars

- 手工打包并且部署
- 只由WebJars官方团队发布
- 人工创建RequireJS配置文件（RequireJS是一个使浏览器使用javascript模块化的库）

前两种主要是使用很成熟的前端资源管理工具的仓库资源来创建jar包并且部署，但是任何人都可以发布包，这就造成了有些包的内容不严谨，说不定给你弄点恶意代码你都不知道，而第三种是由官方团队进行发布。

前两种根据镜像即时发布，可以使资源版本维持在最新状态，而第三种是手工打包的，难免会有延迟。

## 官方网站

[http://www.webjars.org/](http://www.webjars.org/)

关于WebJars的使用，可看我这篇[WebJars使用示例](/2016/04/07/webjars-usage-sample/)