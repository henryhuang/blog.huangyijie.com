title: mvn打包的时候为什么用clean
date: 2015-01-30 09:54:53
tags: [maven, java]
---

-	理论上来讲不做mvn clean 得到的jar包应该是最新的，除非其他方式修改jar包中的内容而不修改源代码。

-	平时可以用mvn install，而不进行chean节省时间（如果你觉得节省时间多的话），但最保险还是用 mvn clean install 生成最新的jar包或其他包

-	不想用mvn clean又想保证jar包最新，建议添加 -Djar.forceCreation 参数