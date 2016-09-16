title: WebJars使用示例
date: 2016-04-07 10:16:40
tags: [webjars, java, javascript, css]
categories: helloworld
---

## 说明

这里只介绍Servlet3如何使用WebJars（Classic风格），文章中示例源码地址在[https://github.com/henryhuang/webjars-example](http://https://github.com/henryhuang/webjars-example)。

## 代码编写

### Servlet类

首先配置一个Servlet：

``` java

public class ServletSample extends HttpServlet {
	
	private static final long serialVersionUID = -5041101055869552308L;
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		doPost(req, resp);
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		
		try(PrintWriter printWriter = resp.getWriter()) {
			printHTML(printWriter, "<script type='javascript' src='webjars/jquery/3.0.0-alpha1/jquery.js'></script>", "OK");
			printWriter.flush();
		}

	}
	
	private void printHTML(PrintWriter printWriter, String headContent, String bodyContent) {
		printWriter.print("<html>");
		printWriter.print("<head>");
		printWriter.print(headContent);
		printWriter.print("</head>");
		printWriter.print("<body>");
		printWriter.print(bodyContent);
		printWriter.print("</body>");
		printWriter.print("</html>");
	}
	
}

```

注意 **cnhalo.ServletSample#doPost**:

``` java

printHTML(printWriter, "<script type='javascript' src='webjars/jquery/3.0.0-alpha1/jquery.js'></script>", "OK");

```

**"webjars/jquery/3.0.0-alpha1/jquery.js"** 是根据jquery的WebJars包里**META-INF/resources**下的路径写的：

![文件结构](http://77fkdd.com1.z0.glb.clouddn.com/image%2Fpng%2Fwebjars-lib-tree.png)

### web.xml

web.xml 里的内容为：

``` xml
  <servlet>
  	<servlet-name>webjars</servlet-name>
  	<servlet-class>cnhalo.ServletSample</servlet-class>
  </servlet>
  <servlet-mapping>
  	<servlet-name>webjars</servlet-name>
  	<url-pattern>/webjars</url-pattern>
  </servlet-mapping>
```

## 运行

### 自己打包

示例项目使用Gradle进行构建，需要配置Gradle的环境，然后依次执行：

``` bash
git clone http://https://github.com/henryhuang/webjars-example
cd webjars-example
gradle war // 生成war包
```

gradle会打出war包，进入项目的 build/libs/ 下面，看到 **webjars-1.0.war** 即是，将war包放入tomcat下运行即可。

**注意，代码使用了jdk8。**

### 使用发布包

如果不想使用gradle打包，可以使用我已经打好的包[webjars-1.0.war](https://github.com/henryhuang/webjars-example/releases/download/1.0/webjars-1.0.war)。

## 验证

启动tomcat，访问 **http://localhost:8080/webjars-1.0/webjars**，界面显示 **OK**，查看页面源码（使用FireFox，鼠标右键，查看页面源代码，其它浏览器类似）：

``` html
<html>
<head>
    <script type='javascript' src='webjars/jquery/3.0.0-alpha1/jquery.js'></script>
</head>
<body>
    OK
</body>
</html>
```

点击 *webjars/jquery/3.0.0-alpha1/jquery.js* ，可显示 jquery的源码信息，则使用成功！