title: 使用Github、Travis-CI和Coding.net自动部署博客［二］
date: 2016-10-05 12:19:37
tags: ["github", "travis", "coding.net"]
---

接着[第一篇](/2016/09/20/blog-with-github-travis-ci-and-coding-net-1/)讲。

在确保注册 Travis CI 和已经安装了 **Travis CI Command Line Client** 之后，我们现在开始进行 Travis CI 相关的配置。

### 添加 Travis CI 配置文件

在博客根目录下添加 Travis CI 所需要的配置文件 **.travis.yml**，配置文件内容和一些说明如下：

``` yml
language: node_js

sudo: false

node_js:
  - "5.11"

cache:
  apt: true
  directories:
    - node_modules

addons:
  ssh_known_hosts: git.coding.net

script:
  - hexo clean && hexo generate

branches:
  only:
    - master
```

#### 个别说明

``` yml
node_js:
  - "5.11"
```

使用5.11版本的nodejs，具体在你本地控制台下使用 node -v 查看版本；

``` yml
addons:
  ssh_known_hosts: git.coding.net
```

我是将代码部署到 Coding.net 上，所以配 git.coding.net，如果是部署到github 上，则配置为 github.com；

``` yml
script:
  - hexo clean
  - hexo generate
```

这个配置表示让 Travis CI 依次执行 hexo clean 和 hexo generate 命令

``` yml
branches:
  only:
    - master
```

告诉 Travis CI 只监听 master 分支的变化，如果你的源码没有放在 master 分支，则做相应改变；

好了，其他没有说明的配置项则照抄。

写完以后，我们要使用 Travis CI Command Line 进行验证，看看配置文件有没有问题：

``` shell
travis lint .travis.yml
```

出现以下反馈则说明没有问题：

``` shell
Hooray, .travis.yml looks valid :)
```

### 生成私钥加密文件

#### 什么是私钥？

私钥就是密钥对（密钥对指一对**公钥**和**私钥**），我们在使用 github 的时候，首先需要在 github 上配置**公钥**，这是最基础的。那么，存在我们本地的**私钥**就是你的个人身份标示，如果你的项目 git 地址配置的是 **git@github.com:username/projectname.git**（相对的还有 https://github.com/username/projectname.git）， 当你在对 Repository 在一些操作（比如 push 等），则需要私钥进行身份验证了（这是自动验证的，如果是使用 https 的配置，则需要提供用户名和密码）。

我们在 Travis CI 上自动部署代码，就牵扯到了 push 操作，那么就需要提供**私钥**了。

新手首先理所当然觉得直接讲私钥放在项目里不就可以了吗？

你们啊，乃衣服！

#### 为什么生成私钥加密文件？

将私钥直接放在项目里，那么人人都能看到。**私钥**的泄露将会发生一系列的问题，比如有坏人拿你的私钥直接操作你的 git 项目，你能干啥他也能干啥（原理上面讲了），这咋整？我们需要对**私钥**进行加密。

Travis 提供了加密文件的支持，什么意思呢？我们可以对文件（这里指私钥）在本地进行加密，然后把加密过后的文件放在项目里，那么别人就无法获取里面的真实内容。然后我们在让 Travis 执行脚本的时候，在读取加密文件之前对文件进行解密（使用的解密密码提前在 Travis 上配置好了），这样就可以达到不将文件内容暴露，并且让 Travis 获取到真实内容的目的了，大概的时序图如下：

![Travis文件加密](http://githubimg.qiniudn.com/image/jpegTravisEncFileSequenceDiagram.jpg "Travis文件加密")

#### Travis 文件加密

那么现在开始进行文件的加密（主要是私钥的加密），首先看看前提（这里我直接翻译官方的说明）。

- 你的仓库已经在 Travis CI 上建立（在[前一篇](/2016/09/20/blog-with-github-travis-ci-and-coding-net-1/)已经讲过，如果你照做的话）
- 已经安装 Travis CI Command Line Client，并且已经**登陆**（在[前一篇](/2016/09/20/blog-with-github-travis-ci-and-coding-net-1/)已经讲过）

其实很简单，把私钥**拷贝**（不要删除原来的）到博客**根目录**下（之后会删除），然后执行：

```
travis encrypt-file id_rsa
```

id_rsa 是私钥文件，执行后博客根目录下会生成 id_rsa.enc 文件，这是加密过后的文件，会上传到 GitHub 上，使用它需要先进行解密。把这个加密后的文件放到博客根目录的 .travis 文件夹下（没有的话创建）后面用，别忘了删除 id_rsa 文件。 

之后登录 Travis CI 中 repositry 的 Settings 界面：

![Settings](http://githubimg.qiniudn.com/blog/blog-with-github-travis-ci-and-coding-net/travis-ci-key.png "Settings")

Travis CI 会给我们自动生成两个环境变量--两个 key，这两个 key 是对私钥加密文件进行解密的用的。

### 提交配置

完成以上后，可以将代码提交到 GitHub 上，这样 Travis CI 就会触发任务，如果在 Travis CI 的 Job Log 里最后的 log 是以下则说明执行成功：

```
Done. Your build exited with 0.
```

但是这还没有部署到 Coding.net （或者 github.com ）上，这需要编写 deploy 相关脚本。

好了，第二篇就差不多了，在最后一篇将讲编写部署脚本。

*未完待续，还有第三篇。*
