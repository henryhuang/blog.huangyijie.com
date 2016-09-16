title:  "JAVAList不能使用remove()"
date:  2012-12-07 10:01
tags: [IT,JAVA]
---
__List是不能使用remove()的，__

看以下代码：

```java
String [] a = new String[4];
a[0] = "1";
a[1] = "2";
List<String> list = Arrays.asList(a);
list.remove(0);
System.out.println(list.get(0));
```

这是会报错的：
<!--more-->

> <font color="red">Exception in thread "main" </font>java.lang.UnsupportedOperationException


> <font color="red">at java.util.AbstractList.remove(AbstractList.java:172)</font>


> <font color="red">at com.nevol.list.ListTest.main(ListTest.java:27)</font>

__很明显是不支持的操作！__

查看源码（AbstractList.java:172）

```java
public E remove(int index) {
    throw new UnsupportedOperationException();      
}
```

没有逻辑，直接抛出__UnsupportedOperationException__

解决方法，只要将List转成ArrayList就可以了，具体代码如下

```java
String [] a = new String[4];
a[0] = "1";
a[1] = "2";
List<String> list = Arrays.asList(a);
list = new ArrayList<String>(list);
list.remove(0);
System.out.println(list.get(0));
```
