title:  "Tomcat打开远程调试"
date:  2013-10-29 22:59
tags: [tomcat,debug,remote,java]
---

## 配置
### 1.	Linux下
在bin/startup.sh 或者 bin/catalina.sh 开头添加

```sh
declare -x CATALINA_OPTS="-server -Xdebug -Xnoagent -Djava.compiler=NONE -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=8787"
```

### 2.	Windows下
在bin/startup.bat 或者 bin/catalina.bat 开头添加

```bat
SET CATALINA_OPTS=-server -Xdebug -Xnoagent -Djava.compiler=NONE -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=8787
```

## 调试

这样启动以后，就会监听8787端口，通过IDE进行调试，这里以Eclipse示例

依次打开Run --> Debug Configurations --> Remote Java Application --> 右键New --> 填写tomcat相关信息，端口就是8787

这样启动tomcat后，再进行Debug后就可以了。



