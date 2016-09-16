title:  "Rails学习笔记-11.2"
date:  2013-02-12 21:41
tags: [rails,web]
---

11.2 迭代F2:建立一个基于Ajax的购物车

开始是按照书里面写的，创建create.js.rjs，

网上查了，需要使用protype-rails gem，于是安装了，但是页面点击后ajax没有效果，需要手动刷新后才能出现。

于是在网上查了,由于默认使用jquery，所以就改成了jquery的，创建create.js.erb，内容为$('#cart').html("<%= escape_javascript(render(@cart)) %>");

按照网上仁兄的做法来的：

1.\app\views\layouts\application.html.erb
<%= javascript_include_tag :defaults %> to <%= javascript_include_tag "application" %>
2.app/views/line_items/create.js.rjs 成create.js.erb，并修改内容：
$('#cart').html("<%= escape_javascript(render(@cart)) %>");

3.修改line_items_controller中的create方法， 加入format.js

传送门:<a href="http://ruby-china.org/topics/6154" target="_blank">RubyChina</a>
