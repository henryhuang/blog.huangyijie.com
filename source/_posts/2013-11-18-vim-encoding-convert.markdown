title:  "VIM对于文件字符编码的转换"
date:  2013-11-18 16:29
tags: [vim,linux,mac]
---
###使用vim自己的方式

####fenc, enc
在Vim中输入:set fenc=编码  即可将文档的编码转换为相应的编码格式,这是只需要保存文档,文档的编码就变了。

如果在Vim中输入:set enc=编码  即可改变Vim的显示编码,这是就可以看到文档中的乱码了,不过这是即使对文档做了修改并保存,文档仍旧以之前的文档编码保存。

<!-- more -->
####fileencoding
Vim中输入:set fileencoding=编码

###使用iconv
iconv命令用于转换指定文件的编码,默认输出到标准输出设备,亦可指定输出文件。

####用法
iconv [选项...] [文件...]

####参数
* 输入/输出格式规范：

	-f, --from-code=名称 原始文本编码
	
	-t, --to-code=名称 输出编码
	
* 信息：

	-l, --list 列举所有已知的字符集

* 输出控制：

	-c 从输出中忽略无效的字符

	-o, --output=FILE 输出文件

	-s, --silent 关闭警告

	--verbose 打印进度信息

* 其他：

	-?, --help 给出该系统求助列表

	--usage 给出简要的用法信息

	-V, --version 打印程序版本号
	
####示例
iconv -f utf-8 -t gb2312 filebackupscheme.ini > filebackupscheme2.ini
