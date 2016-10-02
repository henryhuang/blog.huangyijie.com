title: 使用Github、Travis-CI和Coding.net自动部署博客［一］
date: 2016-09-20 22:38:41
tags: ["github", "travis", "coding.net"]
---
在从前，我在本地写一篇文章后要将它不熟到服务器并且提交源码，需要这么几个步骤：

```shell
$ hexo clean && hexo deploy // 我的博客是用hexo构建的，其他的静态博客构件工具还有jekyll等
$ git add .
$ git commit -m "xxxx"
$ git push origin source // 保存博客源码
```

这里主要做了两个操作，而这两个操作又是 **捆绑** 的，什么意思呢？就是每次写一篇文章我 **都要** 在本地执行进行部署，**并且**提交源码，这是很费劲的。

我可不可以像代码开发一样，在本地写完代码，然后提交代码，就这么结束了？当然可以了！

下面开始一步一步的讲解，过程虽然有些繁琐，但是记住这种事情只要做一次，正可谓功在当代，利在千秋啊！

## 持续集成（CI）

来到新公司，接触到了**[持续集成（CI）](http://baike.baidu.com/view/5253255.htm)**的概念，提供 CI 的开源工具有 Jenkins，但是我总不能自己跑个机器来运行 Jenkins 对我的博客源码变化进行监控吧？那么，就想到了有没有开源、免费的、提供 CI 功能的在线工具服务呢？当然有，[**Travis CI**](https://travis-ci.org/) 是目前比较火的开源持续集成构建工具，而且它对github的集成支持非常好。

## 怎么自动部署

那么，具体是怎么个自动部署法？这是时序图：

![自动部署是时序图](http://githubimg.qiniudn.com/blog-with-github-travis-ci-SequenceDiagram.jpg "自动部署时序图")

1. 创建文章；
2. 将代码 push 到远程仓库，这里是 Github；
3. Github 调用 Travis 的 webhook，关于什么是 webhook，这里不具体说明了，大体上就是一个链接，Travis 在 Github 上配置以后，Github 每发生一些事件（就比如我这里的 push）就会掉用访问这个链接以**起到通知 Travis 的作用**；
4. Travis 从 github 获取代码；
5. Travis build 代码；
6. Travis 部署博客到 Coding.net。

可以看到，在本地只需要执行两步操作，剩下的我完全不用管。

最右边的 **[Coding.net](https://coding.net/)** 是我用来部署博客的，它是类似  Github 的代码托管，并且也提供 pages 的服务，最关键的一点是它是**中国本地**的。最开始我部署在 Github 上，但是由于国内访问实在太慢而且不稳定，所以就选择了 **[Coding.net](https://coding.net/)**。

### 安装 Travis CI Command Line Client

下一篇将会着重讲 Travis CI 的配置和使用，在这之前先得安装一个 Travis 官方提供的命令行工具 **Travis CI Command Line Client**，它可以快捷的使用一些功能，比如生成 Travis 的加密文件等。

以下的安装教程是我直接翻译的[官方安装说明](https://github.com/travis-ci/travis.rb#installation)。

请确保本地已经安装**[Ruby](http://www.ruby-lang.org/en/downloads/)**，并且版本不低于1.9.3，推荐2.0.0版。

可以通过执行以下命令验证 Ruby 的版本：

```
$ ruby -v
ruby 2.0.0p195 (2013-05-14 revision 40734) [x86_64-darwin12.3.0]
```

然后执行:

```
$ gem install travis -v 1.8.2 --no-rdoc --no-ri
```

最后验证一下是否安装成功:

```
$ travis version
1.8.2
```

如上，如果出现 1.8.2 这样的版本信息，则说明 Travis CI Command Line Client 安装成功。 

使用 **gem** 需要安装 **ruby 环境**，作为一个开发人员，不要嫌麻烦。

*未完待续，还有第二篇。*