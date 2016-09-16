title:  "Groovy开始"
date:  2014-10-28 19:54
tags: [IT,Groovy,JVM]
---

之前看了《Java程序员修炼之道》，第三部分JVM上的多语言编程里面讲到JVM上面的一些脚本语言，有Groovy，Scala，Clojure，没有等。于是这两天学了一下Groovy，发现还真是方便，最明显的就是他的闭包Closure。


平时在用Java编程的时候，写着写着总是有点烦，一个很简单的方法都要写一堆代码，其实具体逻辑就一行，想着用闭包多好，那么Groovy完全就可以用得上。

<!-- more -->

### 1. Groovy的安装

+ 安装GVM

使用[GVM](http://gvmtool.net)(the Groovy enVironment Manager)进行安装和版本管理，进行版本的随意切换，GVM的概念可以说是来自RVM，它不仅可以管理Groovy，还可以管理crash, gaiden, glide, gradle, grails, griffon

``` bash
curl -s get.gvmtool.net | bash
```
+ 直接安装最新版的Groovy

	``` bash
	gvm install groovy
	```
	
+ 安装指定版本的Groovy
	
首先查看所有版本：

   ``` bash
	gvm list groovy
	 
	```
		
然后加入版本号即可：
	
	
	``` bash
	gvm install groovy 2.3.7
	```


### 2. Groovy的编程

+ Hello World

Groovy可以不像Java那样每个class文件必须有一个类，它就像很多脚本一样，一行代码：

```
print "Hello World"
```

保存为hw.groovy，

```
groovy hw.groovy
```
解决！而在Java里，则要这么麻烦

```
public class HelloWorld {

	public static void main(String[] args) {
		System.out.println("Hello World!");
	}
}

```
保存hw.java，

```
javac hw.java
java hw.class
```
这一点Groovy还是挺方便的了。

+ groovyConsole

Groovy还提供了GroovyConsole，一个简单的IDE，也是挺方便的，可以通过以下方式启动：

```bash
$ groovyConsole
```

#### 2.2 闭包

对于闭包，官方的解释是：

What is a Closure?
A Groovy Closure is like a "code block" or a method pointer. It is a 
piece of code that is defined and then executed at a later point. It has some special properties like implicit variables, support for currying and support for free variables (which we'll see later on). We'll ignore the nitty gritty details for now (see the formal definition if you want those) and look at some simple examples.

一个最简单的例子：

```
def clos = { println "hello!"}
println "Executing the Closure:"
clos()
```

更多的说明在官网文档[Closures](http://groovy.codehaus.org/Closures)还有。

Groovy里很多的类都有专门传闭包方法，比如List：

```
def list = ['c', 'n', 'h', 'a', 'l', 'o']
def newList = []
		
def clos = {
	it.toUpperCase()
}
list.collect(newList, clos)
println newList

// 输出：[C, N, H, A, L, O]
		
```

#### 2.3 一个具体的脚本例子

脚本的功能：将octopress文章转换成hexo文章

调用方式：

```bash
$ groovy script.groovy octopress路径 输出路径
```

以下是脚本内容：

```groovy

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
}
```


### 3. 结语
Groovy有很多很亮的特性，使得它可以成为和Java共用的语言，这也是我为什么要选择Groovy作为JVM脚本语言入门的最大的理由（最为对比，另一个是Scala），他的语法和Java很像，本来用Java实现的逻辑可以用Groovy更简短的语句实现。Groovy和Java之间的相互调用也是很方便的。

希望在自己接触的项目中可以很快用上Groovy。
