title: JavaScript执行window.print()打印内容为空白
date: 2016-10-08 20:56:27
tags: ["JavaScript", "HTML", "CSS"]
---
今天写代码的时候，需要用到打印页面的功能，按理说只要很简单的一段js代码就可以了：

``` javascript
window.print();
```

但是很奇怪，怎么执行，要打印的页面内容都是空白！

于是一步一步分析，终于找到了罪魁祸首的代码片段：

``` css
@media print {
    body * {
        visibility: hidden;
    }
}
```

这段 CSS 的作用就是当媒体类型为 print 的时候，body 里面所有元素都采用样式 “**visibility: hidden;**”，所以解决这个问题是
把 “**visibility: hidden;**” 去掉就可以了。

但是这里有两点可以说：

1. 写代码的时候，一个模块的功能不能影响到全局，这是谨慎也是需要第一位考虑的做法；
2. CSS 的 Media Type

### Media Type

#### Media Type 种类

**Media Type** 直译过来就是**媒体类型**，这是CSS2引入的属性，可以通过 **@media** 等方式给不同的媒体类型定义不同的CSS样式规则。上面讲到的，我在**打印**页面的时候，所处的媒体类型就是 **print**，一般我们在浏览网页的时候，媒体类型是 **screen**，W3C给出的媒体类型有以下十种（**注意，名字是大小写敏感的**）：

1. **all**
适用于所有设备。
2. **braille**
用于盲文触觉反馈设备。
3. **embossed**
用于分页盲文打印机。
4. **handheld**
用于手持设备（通常是指有限带宽的小屏设备）。
5. **print**
用于分页材料和打印预览模式下在屏幕上查看的文档。
6. **projection**
用于投影机。
7. **screen**
主要用于彩色计算机屏幕。
8. **speech**
用于语音合成设备。
9. **tty**
适用于使用固定间距字符网格（如电传打字机，终端，或具有有限显示能力的便携式设备）的媒体。在“tty”类型中不应该使用像素单元。
10. **tv**
用于电视类设备（分辨率低，彩色，有限可滚动屏幕，有声音的）。

#### Media Type 引入方式

Media Type 有多种引入方式。

1. @media方式引入
``` css
@media print{
  body * {
    visibility: hidden;
  }
}
```
	这种方式在 CSS 文件中 和 style 标签里都可以使用。
	
2. @import方式引入
``` css
@import url("css/print.css") print;
```
	和上一种一样，这种方式在 CSS 文件中 和 style 标签里都可以使用。

3. link方法引入
``` html
<link rel="stylesheet" type="text/css" href="../css/print.css" media="print" />
```

4. xml方式引入
``` html
<?xml-stylesheet rel="stylesheet" media="screen" href="css/style.css" ？>
```
