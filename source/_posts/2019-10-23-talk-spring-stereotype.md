---
title: 聊聊Spring的stereotype注解
cover: 'http://githubimg.wxio.club/sea_common_cover.jpg'
date: 2019-10-23 00:06:28
tags: ["技术", "Java"]
---
我们在使用Spring的时候，使用最多的注解是什么？我想除了@Bean就是@Component了吧？@Component位于spring-context库（5.1.8版本，文中未特别说明的情况下默认此版本）的org.springframework.stereotype包路径下面：

![Spring Stereotype 1](http://githubimg.wxio.club/spring-stereotype-1.jpg)

会发现还有我们熟悉的@Controller，@Service，@Repository，这不就是Spring MVC里经常用到的么？

## 什么是 Stereotype

Stereotype是一种J2EE特性，以下来自网友：

```
Stereotype特性最早出现在J2EE6中（忘记是哪个JSR提出的了），
可以理解为围绕着“元数据”功能而发展出来的一种设计模式，
虽然我很难说清楚他属于23个设计模式中的哪一个，
但是这确实已经是一种约定俗成的做法，
只要看到Stereotype就应该像看到“Factory——工厂模式”、“Adapter——适配器模式”、“Facade——外观模式”一样，一眼就知道他的作用。
```

**简单的说Stereotype特性就是用注解来告诉框架某个类是属于系统功能中的哪一层。**

## Stereotype 特性如何被使用

在Stereotype模式下，Spring为Controller-Service-Dao的分层模型分别提供了@Controller、@Service、@Repository注解。

我们按照Stereotype的模式为对应的类标记3个注解，然后在引入MVC、ORM、JPA相关的框架之后这些注解会告诉框架对应的类扮演着什么样的功能角色，框架就能很清晰的根据注解提供相关的功能服务。

例如引入spring-webmvc库后，类如果被@Controller注解标记，框架就知道他们都是处理前端请求的，框架就会为他提供RequestMapping之类的功能。
