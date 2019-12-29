title:  "MAC下JDK版本的切换"
date:  2013-12-02 19:31
tags: [java,mac,jdk]
---

原来系统里安装的是1.6的，这是最后一个由提供的jdk，1.7开始Oracle提供mac平台的jdk了。

现在安装了1.7的，觉得需要进行多个版本的切换，以下是方法：

### 临时更改版本（单会话有效）

首先运行：

```bash
/usr/libexec/java_home
```
可以知道当前环境的JAVA_HOME是：

```bash
/Library/Java/JavaVirtualMachines/jdk1.7.0_45.jdk/Contents/Home
```

这是1.7的JAVA_HOME，我们可以使用 -v 标识来获取1.6的JAVA_HOME

```bash
/usr/libexec/java_home -v '1.6*'

/Library/Java/JavaVirtualMachines/1.6.0_65-b14-462.jdk/Contents/Home
```

然后我们可以手动地设置JAVA_HOME

```bash

export JAVA_HOME=`/usr/libexec/java_home -v '1.6*'`

java -version

java version "1.6.0_65"
Java(TM) SE Runtime Environment (build 1.6.0_65-b14-462-11M4609)
Java HotSpot(TM) 64-Bit Server VM (build 20.65-b04-462, mixed mode)

```

### 所有会话生效

以上只是在一个终端会话中临时设置的，如果要运用到所有的会话中，则需要在.bash_profile中写入：

```bash
export JAVA_HOME=`/usr/libexec/java_home -v '1.6*'`
```

然后运行

```bash
source ~/.bash_profile
```
