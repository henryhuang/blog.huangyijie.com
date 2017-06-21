title: 使用EditorConfig
date: 2017-06-21 20:56:27
tags: ["coding", "IDE", "editor"]
---

使用不同编辑器，比如IDE（Eclipse，Intellij IDEA），又使用不同OS（Mac，Windows等），难免会碰到编码风格不一致的情况，那怎么办？

使用 **EditorConfig**！

## 有什么好处？

当你将代码推送到GitHub时，你可以避免Mac和Windows之间的**换行符冲突**，以及其他多人协作开发中遇到的事情。

## 什么是EditorConfig？

这段摘自官方网站。

EditorConfig帮助开发人员在不同的编辑器和IDE之间定义和维护一致的编码风格。 EditorConfig项目包括**用于定义编码样式的文件格式**和**文本编辑器插件**，使编辑器能够读取文件格式并遵守定义的样式。 EditorConfig文件易于阅读，可以使**版本控制系统**（Git等）保持良好的工作环境。

## 示例配置文件

EditorConfig的配置文件名称是 **.editorconfig **，将以下内容添加到此文件中：

```
[*]
end_of_line = lf

```

然后当你打开一个文件时，EditorConfig插件将使文件的**换行符换成 LF **。

## 如何使用

1.在你的编辑器或者IDE中添加插件

http://editorconfig.org/#download

以上链接的eclipse插件需要从Eclipse Marketplace进行安装。如果没有Eclipse Marketplace入口，你可以使用**https：//editorconfig-eclipse.github.io/repository**进行安装。

2.将.editorconfig文件添加到项目的**根目录**（对于Windows用户：要在Windows资源管理器中创建.editorconfig文件，你需要创建一个名为**.editorconfig.**的文件，Windows资源管理器将自动重命名为.editorconfig）

并添加内容：

```
root = true

[*]
end_of_line = lf

```

更多配置参见https://github.com/editorconfig/editorconfig/wiki/EditorConfig-Properties。

## 结语

请注意，EditorConfig不仅可以避免换行冲突，还可以避免**缩进样式，缩进大小，字符集等冲突**。

对于git的autocrlf配置，这个博文https://github.com/cssmagic/blog/issues/22可能对你有用。
