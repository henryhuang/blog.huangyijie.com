title:  "JAVA中判断日期是上午还是下午"
date:  2013-08-01 17:11
tags: [java,date,it]
---
```java
GregorianCalendar cal = new GregorianCalendar();
System.out.println((cal.get(GregorianCalendar.AM_PM) == GregorianCalendar.PM)? "下午" : "上午");
```

当然，通过GregorianCalendar.get()还可以获取更多的信息。