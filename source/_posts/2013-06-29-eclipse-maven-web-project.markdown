title:  "Eclipse创建Maven的Web工程"
date:  2013-06-29 01:03
tags: [Java,Maven,Eclipse]
---
折腾很长时间，终于弄出可以调试的了，遇到了很多问题，但是一步一步查资料，求助，终于弄出来了。

首先，因为Eclipse更新到了4.3Kepler，所以一开始我就下的它来使用，结果里面的maven插件包括了m2e-wtp，这实在让人头疼。按照步骤也算是整出来了一个，但是，在使用Server打开的时候，却总是找不到类，找了很多解决方法也没不好解决，说是Server读的class的位置和项目的class位置不一样类似的原因，于是我想是不是因为m2e-wtp创建的项目会有所特殊，需要特别配置什么的，找资料也找不到解决的方法，于是就想着不要这个插件了，刚好有Juno版本的包，就重新安装了。

安装Juno后，是按照这个老外的方法来创建项目的，挺详细的：
[http://fruzenshtein.com/setup-of-dynamic-web-project-using-maven/
](http://fruzenshtein.com/setup-of-dynamic-web-project-using-maven/)

但是在直接右键通过Server打开的时候，遇到了包查不到，那是因为没有将Maven的依赖包放到WEB-INF/lib下，于是找到了下面这篇文章来解决：
[http://www.micmiu.com/software/build/eclipse-maven-web-lib/](http://www.micmiu.com/software/build/eclipse-maven-web-lib/)

最后遇到个问题，在需要执行jsp的时候，报无法解析jsp的错误，思前想后，找到原因：因为pom.xml里有依赖servlet和jsp，这两个虽然写的是部署的时候不加入，但是因为我直接将Maven的依赖放入lib下，这样就导致了冲突，所以就暂时也不将这两个相关的放到pom依赖里面了，最后成功解决。

虽然解决了，但是这毕竟不是正确地开发需要的方式，这只是小程序可以搞搞，但是在大项目有很多很多测试的时候，要解决就必须按照Maven的结构来了，那我想m2e-wtp才真正有他的优势吧。还有在原来的pom里有servlet和jsp的依赖，是为了代码里能使用到他们，但是在部署的时候是不需要的，所以采用直接不放到依赖里显然不是真正解决的方法。

待日后研究研究m2e-wtp。