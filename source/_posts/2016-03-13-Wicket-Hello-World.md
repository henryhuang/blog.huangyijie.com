title: Wicket的HelloWorld
date: 2016-03-13 20:44:06
tags: [java, web, wicket]
categories: helloworld
---

在公司用了4年的Wicket了，竟然发现没有写个HelloWorld。

Wicket，全称Apache Wicket， 它是个基于组件的Web应用框架，更多的解释看[Wikipedia](https://en.wikipedia.org/wiki/Apache_Wicket)。

官方网站：[wicket.apache.org](http://wicket.apache.org/)。

很遗憾，由于Wicket在国内的普及程度不够，中文相关的文档很少，有的话也就是基于1.2版本的，官方最新的release版本已经是7.x，SNAPSHOT是8.x（Wicket的版本规则从1.5以后就为6.x，7.x，8.x，有点像Java的版本规则）。

这里的HelloWorld是结合Gradle，Jettty完成的，在Eclipse IDE上开发。

<!--more-->

> 什么是Gradle？
	
Gradle是一个基于Apache Ant和Apache Maven概念的项目自动化建构工具。它使用一种基于Groovy的特定领域语言来声明项目设置，而不是传统的XML。

其他的自动化构建工具还有Ant和Maven等。

它有丰富的插件机制。

Eclipse上Gradle的配置请先看[http://www.cnphp6.com/archives/42868](http://www.cnphp6.com/archives/42868)。

> 什么是Jetty？

Jetty是一个纯粹的基于Java的网页服务器和Java Servlet容器。

其他的容器还有Tomcat，JBoss等。

这里使用Jetty是使用Gradle的Jetty插件。

下面开始HelloWorld。

### 创建Eclipse项目
	
以此选择File->Other，搜索 Gradle，选择 Gradle Project，输入Project name为 wicket-helloworld，Sample project选择 Java Quickstart，然后Finish。
	
### 调整项目文件结构

由于我们使用Java Quickstart的Sample project，会生成一些我们不需要的文件，所有我们需要调整文件结构（我这里都以**cnhalo**为包名前缀），调整后的结构为：

![文件结构](http://77fkdd.com1.z0.glb.clouddn.com/wicket-hello-worldproject-structure2.png)
	
### 加入Wicket依赖
	
我们向Gradle中加入Wicket依赖，在build.gradle中dependencies里加入：

```
compile ‘org.apache.wicket:wicket-core:7.2.0’
```

我写这遍文章的时候，使用最新的release版本7.2.0，更新的版本可在[mvnrepository.com](http://mvnrepository.com/artifact/org.apache.wicket/wicket-core)查看。

加入依赖后，在项目的右键，依次点击Gradle->Refresh All，让Gradle去下载依赖的包，等待下载完成后，项目的Gradle Dependencies为：

![Gradle Dependencies](http://77fkdd.com1.z0.glb.clouddn.com/wicket-hello-worldgradle-dep.png)

### 配置Jetty

在build.gradle最上面加入：

```
apply plugin: 'war'
apply plugin: 'jetty'
```
在Eclipse项目的的 src/main 下依次创建 webapp/WEB-INF/web.xml：

![web.xml](http://77fkdd.com1.z0.glb.clouddn.com/wicket-hello-worldwebxml.png)

web.xml的内容为：

``` xml

<?xml version="1.0" encoding="UTF-8"?>
<web-app id="WebApp_ID" version="2.4"
xmlns="http://java.sun.com/xml/ns/j2ee" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://java.sun.com/xml/ns/j2ee/web-app_2_4.xsd">

  <display-name>Wicket Hello World</display-name>
  <filter>
    <filter-name>App</filter-name>
    <filter-class>org.apache.wicket.protocol.http.WicketFilter</filter-class>
    <init-param>
      <param-name>applicationClassName</param-name>
      <param-value>cnhalo.CHApp</param-value>
    </init-param>
    <init-param>
      <param-name>configuration</param-name>
      <param-value>DEPLOYMENT</param-value>
    </init-param>
  </filter>

  <filter-mapping>
    <filter-name>App</filter-name>
    <url-pattern>/*</url-pattern>
    <dispatcher>REQUEST</dispatcher>
    <dispatcher>INCLUDE</dispatcher>
  </filter-mapping>

</web-app>

```
注意，这里的 cnhalo.CHApp 这个类这里还未创建，org.apache.wicket.protocol.http.WicketFilter 这个过滤器是请求进入Web容器后再进入Wicket的入口。
	
### 创建Wicket相关代码

创建 cnhalo.CHApp 类，继承org.apache.wicket.protocol.http.WebApplication，全部代码为：

``` java

package cnhalo;

import org.apache.wicket.Page;
import org.apache.wicket.protocol.http.WebApplication;

/**
 *
 *
 * @author	HuangYijie
 * @date	Mar 13, 2016 9:49:43 PM
 * 
 */
public class CHApp extends WebApplication {

  @Override
  public Class<? extends Page> getHomePage() {
    return IndexPage.class;
  }

}

```
创建 cnhalo.IndexPage 类，继承 org.apache.wicket.markup.html.WebPage，全部代码为：

``` java

package cnhalo;

import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.markup.html.basic.Label;

/**
 *
 *
 * @author	HuangYijie
 * @date	Mar 13, 2016 9:51:10 PM
 * 
 */
public class IndexPage extends WebPage {

  private static final long serialVersionUID = -2856887644490684320L;
  
  public IndexPage() {
    add(new Label(“helloworld”, “Wicket Hello World”)); // 在IndexPage.html中对wicket:id=“helloworld”的组件进行匹配
  }
  
}


```
在 cnhalo.IndexPage 的同级目录中创建 IndexPage.html：

``` html
<!DOCTYPE html>
<html xmlns:wicket>
<head>
<meta charset=“UTF-8”>
<title>Wicket Hello World</title>
</head>
<body>

  <h1 wicket:id=“helloworld”></h1>

</body>
</html>
```

### 运行

在Eclipse项目右键，依次选择 Run As -> Run with Jetty，然后浏览器访问 localhost:8080，即可看到 **Wicket Hello World**。
	
### 在Tomcat下运行

要在Tomcat下运行，只要打成war包就可以，依次在Eclipse项目右键执行 Gradle -> Task Quick Launcher，输入 war 后回车。Gradle将会打出 war 包，等 Eclipse 的 Console 显示：

``` shell

[sts] -----------------------------------------------------
[sts] Starting Gradle build for the following tasks: 
[sts]      war
[sts] -----------------------------------------------------
:compileJava UP-TO-DATE
:processResources UP-TO-DATE
:classes UP-TO-DATE
:war UP-TO-DATE

BUILD SUCCESSFUL

Total time: 0.276 secs
[sts] -----------------------------------------------------
[sts] Build finished succesfully!
[sts] Time taken: 0 min, 0 sec
[sts] -----------------------------------------------------


```
刷新Eclipse项目的build，build/libs/wicket-helloworld-1.0.war 即可放入Tomcat的webapps下。

---

文章中使用软件的版本：

JDK: 1.8.0_45
Gradle: 2.0
Eclipse: Luna Release (4.4.0)

项目源码地址：[https://github.com/henryhuang/WicketHelloWorld](https://github.com/henryhuang/WicketHelloWorld)。


