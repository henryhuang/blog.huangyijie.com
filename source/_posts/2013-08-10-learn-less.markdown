title:  "LESS学习"
date:  2013-08-10 14:59
tags: [less,css,it]
---
今天下午没事学了一下less，发现用来写样式表真是方便。

### 1. 什么是LESS
LESS是一种动态样式语言，属于CSS预处理语言的一种，它使用类似CSS的语法，为CSS的赋予了动态语言的特性，如变量、继承、运算、函数等，更方便CSS的编写和维护。

LESS可以在多种语言、环境中使用，包括浏览器端、桌面客户端、服务端。

LESS的很多特性，其实对于一个有编程思想的人来看其实很简单，在这就不列举了。

详细的LESS学习传送门：[http://www.lesscss.net/article/document.html](http://www.lesscss.net/article/document.html)

### 2. JavaScript求值
最让我觉得兴奋的是，LESS可以支持JavaScript求值，想想以后写一个页面，需要由浏览器的大小来决定某个元素的大小，那是相当方便呀：

```css
@divColor: black;
@windowWidth: `document.body.clientWidth`;
@windowHeight: `document.body.clientHeight`;


.block {
    width: @windowWidth;
    height: @windowHeight;
    border: 1px @divColor solid;
}
```

### 3. 注意事项
需要注意的是，less.js的引入需要放到文档的最后，否则会报错:SyntaxError: JavaScript evaluation error: 'TypeError: document.body is null'
