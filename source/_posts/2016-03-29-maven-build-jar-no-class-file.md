title: Maven打jar包内容出错
date: 2016-03-29 23:24:13
tags: [maven, java, jar, wicket]
categories: basic
---

今天在使用maven打包时，发现打的jar包有问题。

## 第1种情况－无class文件

打的jar包没有内容（准确地说是没有class）,猜想应该是maven打包的时候没有compile java源文件到class，从网上找原因，原来maven默认是compile **src/main/java** 下的java文件，而我们目录结构中的源码目录是 **src/**，需要在**pom.xml**里指定源码位置。

在pom.xml文件的 build > resources 前加入 <sourceDirectory>${basedir}/src</sourceDirectory> ，如下：

``` xml
<sourceDirectory>${basedir}/src</sourceDirectory>
<resources>
    <resource>
        <filtering>false</filtering>
        <directory>src/main/java</directory>
        <includes>
            <include>**</include>
        </includes>
        <excludes>
            <exclude>**/*.java</exclude>
        </excludes>
    </resource>
</resources>
```

打出的jar包内就有class了。

## 第2种情况－无资源文件

启动系统后，界面报错，提示找不到 html 资源文件。

由于使用的是[Wicket](http://wicket.apache.org)，需要打入Component对应的html文件（这是Wicket的特点），界面提示找不到html文件，查找这个jar包的内容，发现没有html，再次回到 pom.xml 文件查看：

``` xml
<sourceDirectory>${basedir}/src</sourceDirectory>
<resources>
    <resource>
        <filtering>false</filtering>
        <directory>src/main/java</directory>
        <includes>
            <include>**</include>
        </includes>
        <excludes>
            <exclude>**/*.java</exclude>
        </excludes>
    </resource>
</resources>
```

如上，resources > resource > directory 的内容是 src/main/java，改成 src 后再打的jar包就好了。

具体原因和第一个问题类似，这里的配置是将 resource （除了class等其他资源）打入jar包，而配置是只将 src/main/java 内的所有资源（除了java文件的文件）打入jar包，实际上我们所希望的是将 src/ 下的打入，改完后如下：

```xml
<sourceDirectory>${basedir}/src</sourceDirectory>
<resources>
    <resource>
        <filtering>false</filtering>
        <directory>src</directory>
        <includes>
            <include>**</include>
        </includes>
        <excludes>
            <exclude>**/*.java</exclude>
        </excludes>
    </resource>
</resources>
```

## 参考

pom.xml的上级配置（默认配置）：[https://maven.apache.org/guides/introduction/introduction-to-the-pom.html#Super_POM](https://maven.apache.org/guides/introduction/introduction-to-the-pom.html#Super_POM)