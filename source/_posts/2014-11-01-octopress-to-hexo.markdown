title: 从Octopress转到Hexo
date: 2014-11-01 19:34:18
tags: 记录
---

以前一直使用的Octopress来构建博客，部署在[github](http://pages.github.com)上。最近发现，github访问起来太不稳定了，又慢，所以就准备换个地方来写。

以前就关注过[GitCafe](http://pages.gitcafe.com)和[Hexo](http://hexo.io)，GitCafe是中国的，来提github对于天朝程序猿来说有先天优势。而使用Hexo来代替Octopress来说，则是因为想尝试一下，他是台湾人写的，算是支持一下华人了，另外他的主题我挺喜欢。

<!--more-->

做这件事件，主要有以下步骤：

> 1.	在GitCafe上创建Page Repository，部署Hexo
> 
> 2.	将Octopress转换成Hexo所支持的内容格式
>  
> 3.	主题的开发

<!-- more -->

## 1.	创建GitCafe Pages服务，部署Hexo

创建GitCafe Pages可以查看官方的[帮助](https://gitcafe.com/GitCafe/Help/wiki/Pages-相关帮助#wiki)，很详细。

当然，前提是需要安装git，并且将本地公钥配置到gitcafe上

> ### 安装git

+ Linux上的安装
	
Debain或者Ubuntu
	
	```
	sudo apt-get install git
	```
	
其他版本的Linux则从[官网](http://git-scm.com/download/)下载源码，然后通过执行以下三步安装
	
	
	```
	$ ./config
	$ make
	$ sudo make install

	```
	
+ Mac上的安装
	
推荐安装[homebrew](http://brew.sh)，然后通过homebrew来安装git
	
	```
	$ brew install git
	```

+ Windows上的安装

直接从[官网](http://git-scm.com/download/)上下载Windows安装工具，全部默认选项安装完毕


> ### 设置git

git安装完毕后，需要通过以下命令进行设置

```
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"

```

这个名字和email起到了标识作用，但是并不会用来验证真实身份，随便设置都可以，建议还是不要使坏

> ### 配置公钥

以下是Mac和Linux下的方式，windows的方式待补充。

```
$ cd ~/.ssh
$ ssh-keygen -t rsa -C "your_email@example.com"
```

根据要求输入，一般默认回车就可以了。

然后

```
cat ~/.ssh/id_rsa
```

复制内容，添加到gitcafe的账户ssh秘钥里。


> ### Hexo的安装

#### 安装Node.js

使用nvm安装Node.js

安装nvm，可以使用cUrl或者Wget：

cURL:

```
$ curl https://raw.github.com/creationix/nvm/master/install.sh | sh
```

Wget

```
$ wget -qO- https://raw.github.com/creationix/nvm/master/install.sh | sh
```

#### 安装Node.js

可以使用以下命令查看所有版本的Node.js

```
nvm ls-remote
```

然后指定版本进行安装，比如0.11.14：

```
$ nvm install 0.11.14
```

另外可以使用官网的[安装工具](http://nodejs.org)直接安装。

#### 安装Hexo

```
$ npm install -g hexo
```

> ### 将Hexo部署到GitCafe上

// TODO

## 2.	文章内容转换

Hexo和Octopress生成的markdown配置注释部分（暂且我是这么叫，还不知道专业名词叫什么）有点不太一样

用Octopress新建一篇文章的配置注释部分是：

```
---
layout: post
title: "文章标题"
date: 2014-10-28 19:54
comments: true
categories: 分类1 分类2
---

```

而Hexo这部分则为：

```

title: 文章标题
date: 2014-11-01 19:34:18
tags: 标签1 标签2
---

```

主要的区别是：

> 第一行：Hexo少了---
>  
> comments：Hexo没有这个配置
>
> categories：Hexo默认没有categories，而是用了tags

我写了一段groovy脚本，来将指定文件夹下的所有octopress文章转成hexo的

``` groovy

def inputArgs = args.clone()

if(inputArgs.length < 2) {
	pringHelp()
	return
}

// 检查目录是否存在 以及 不能重复
inputArgs.each { folderPath ->
	if(!new File(folderPath).exists()) {
		println folderPath + " is not exists!"
		System.exit(0)
	}
	if(inputArgs.count(folderPath) > 1) {
		println "all folders cannot be same!"
		System.exit(0)
	}
	println folderPath
}

// octopress 文章目录
def octoFolderPath = inputArgs[0]
// 输出路径
def outputFolderPath = inputArgs[1]

def mdList = new File(octoFolderPath).listFiles(
		[accept:{dir, fileName -> fileName ==~ "^.*\\.(markdown|md)\$" }] as FilenameFilter
		)


mdList.each { file ->

	def titleFormat = """title: %s
date: %s
tags: [%s]
---"""

	StringBuffer ret = new StringBuffer()
	def newFile = new File(outputFolderPath + "/" + file.getName())

	def titleMap = [:]
	def breakCount = 0
	file.withReader { reader ->
		reader.eachLine { line ->
			if(breakCount == 2) {
				ret.append("\r\n")
				ret.append(line)
			}
			if(breakCount < 2 && !line.contains("---")) {
				if(line.indexOf(":") != -1) {
					def key = line.substring(0, line.indexOf(":"))
					if (key.equals("categories")) {
						def temp = line.substring(line.indexOf(":") + 1, line.length()).replaceAll("\"", "").trim().split(" ");
						titleMap.put(key, String.join(",", temp))
					} else if(key.equals("title")) {
						titleMap.put(key, line.substring(line.indexOf(":") + 1, line.length()).replaceAll("\\[", "").replaceAll("\\]", ""))
					} else {
						titleMap.put(key, line.substring(line.indexOf(":") + 1, line.length()).replaceAll("\"", ""))
					}
				}
			}
			if((breakCount == 0 || breakCount == 1) && line.equals("---")) {
				breakCount++
			}
		}
	}
	println titleMap
	newFile.write((String.format(titleFormat, titleMap["title"], titleMap["date"], titleMap["categories"])) + ret.toString(), "UTF-8")
}

def pringHelp() {
	print "usage : groovy Octo2Hexo.groovy octoFolderPath outputFolderPath"

```

这样就轻松地解决的这个问题。

## 3.	主题开发

主题我是借鉴了landscape-plus主题和Writing主题，在默认主题下进行修改下，主要加入Jquery的ScrollUp插件，可以回到顶部，加入了一些动画，以及一些细节修改，直到达到符合我的口味：简约而不简单 。。。

主题总体是白色的，扁平化，响应式。

+ 安装

``` bash
$ git clone https://github.com/henryhuang/oishi.git themes/oishi
```
**Oishi 需要 Hexo 2.7 及以上版本.**

+ 启用

修改主题的设置文件`_config.yml`，把`theme`的值设置为`oshi`

> 为什么取名Oishi？因为当时在想名字的时候，旁边有一包上好佳。

