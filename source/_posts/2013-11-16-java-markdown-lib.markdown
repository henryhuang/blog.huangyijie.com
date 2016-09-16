title:  "Java中使用Markdown"
date:  2013-11-16 00:39
tags: [markdown,java]
---

由于需要将输入的markdown内容转换成html，所以找到了这个包：[MarkdownPapers](http://markdown.tautua.org/)

Maven依赖：

```xml
<dependency>
    <groupId>org.tautua.markdownpapers</groupId>
    <artifactId>markdownpapers-core</artifactId>
    <version>${use latest}</version>
</dependency>
```

使用起来非常简单：

```java 示例
Reader in = new FileReader("in.md");
Writer out = new FileWriter("out.html");

Markdown md = new Markdown();
md.transform(in, out);
```