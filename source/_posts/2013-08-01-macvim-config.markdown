title:  "macvim配置"
date:  2013-08-01 17:04
tags: [macvim,vim,it]
---
虽然我还没用，但是记下总是好的吧，这种东西网站一输如就能找到，就不放到笔记里了。

<!-- more -->

```sh
"设置菜单语言
setlangmenu=zh_cn
" =========
" 功能函数
" =========
" 获取当前目录
func GetPWD()
returnsubstitute(getcwd(), "", "", "g")
endf
" =========
" 环境配置
" =========
" 保留历史记录
sethistory=400
" 命令行于状态行
setch=1
setstl=\ [File]\ %F%m%r%h%y[%{&fileformat},%{&fileencoding}]\ %w\ \ [PWD]\ %r%{GetPWD()}%h\ %=\ [Line]\ %l,%c\ %=\ %P
setls=2 " 始终显示状态行
" 制表符
settabstop=4
setexpandtab
setsmarttab
setshiftwidth=4
setsofttabstop=4
" 状态栏显示目前所执行的指令
setshowcmd
" 行控制
setlinebreak
setnocompatible
settextwidth=80
setwrap
" 行号和标尺
setnumber
setruler
setrulerformat=%15(%c%V\ %p%%%)
" 控制台响铃
:setnoerrorbells
:setnovisualbell
:sett_vb= "close visual bell
" 插入模式下使用 、
setbackspace=indent,eol,start
" 标签页
settabpagemax=20
setshowtabline=2
" 缩进
setautoindent
setcindent
setsmartindent
" 自动重新读入
setautoread
" 代码折叠
setfoldmethod=manual
"setfoldmethod=indent
" 自动切换到文件当前目录
setautochdir
"在查找时忽略大小写
setignorecase
setincsearch
sethlsearch
"显示匹配的括号
setshowmatch
"实现全能补全功能，需要打开文件类型检测
"filetype plugin indent on
"打开vim的文件类型自动检测功能
filetype on
"在所有模式下都允许使用鼠标，还可以是n,v,i,c等
setmouse=a
" 恢复上次文件打开位置
setviminfo='10,\"100,:20,%,n~/.viminfo
" =====================
" 多语言环境
"    默认为 UTF-8 编码
" =====================
ifhas("multi_byte")
setencoding=utf-8
" English messages only
"language messages zh_CN.utf-8
ifhas('win32')
language english
let&termencoding=&encoding
endif
setfencs=ucs-bom,utf-8,gbk,cp936,latin1
setformatoptions+=mM
setnobomb " 不使用 Unicode 签名
ifv:lang =~? '^\(zh\)\|\(ja\)\|\(ko\)'
setambiwidth=double
endif
else
echoerr "Sorry, this version of (g)vim was not compiled with +multi_byte"
endif
" =========
" 图形界面
" =========
ifhas('gui_running')
" 只显示菜单
setguioptions=mcr
" 高亮光标所在的行
setcursorline
" 编辑器配色
"colorscheme zenburn
"colorscheme dusk
ifhas("win32")
" Windows 兼容配置
source$VIMRUNTIME/mswin.vim
" f11 最大化
nmap :call libcallnr('fullscreen.dll', 'ToggleFullScreen', 0)
nmap ff :call libcallnr('fullscreen.dll', 'ToggleFullScreen', 0)
" 自动最大化窗口
au GUIEnter * simalt ~x
" 给 Win32 下的 gVim 窗口设置透明度
au GUIEnter * call libcallnr("vimtweak.dll", "SetAlpha", 250)
" 字体配置
exec'set guifont='.iconv('Courier_New', &enc, 'gbk').':h11:cANSI'
exec'set guifontwide='.iconv('微软雅黑', &enc, 'gbk').':h11'
endif
ifhas("unix") && !has('gui_macvim')
setguifont=Courier\ 10\ Pitch\ 11
setguifontwide=YaHei\ Consolas\ Hybrid\ 11
endif
ifhas("gui_macvim")
" MacVim 下的字体配置
setguifont=Menlo:h12
setguifontwide=Hei:h12
" 半透明和窗口大小
settransparency=2
setlines=40 columns=110
" 使用MacVim原生的全屏幕功能
lets:lines=&lines
lets:columns=&columns
func! FullScreenEnter()
setlines=999 columns=999
setfu
endf
func! FullScreenLeave()
let&lines=s:lines
let&columns=s:columns
setnofu
endf
func! FullScreenToggle()
if&fullscreen
call FullScreenLeave()
else
call FullScreenEnter()
endif
endf
" Mac 下，按 \\ 切换全屏
nmap   :call FullScreenToggle()
" Set input method off
setimdisable
" Set QuickTemplatePath
letguickTemplatePath = $HOME.'/.vim/templates/'
" 如果为空文件，则自动设置当前目录为桌面
lcd ~/Desktop/
" 自动切换到文件当前目录
setautochdir
" Set QuickTemplatePath
letguickTemplatePath = $HOME.'/.vim/templates/'
endif
endif
" =========
" 插件
" =========
filetype plugin indent on
" =========
" AutoCmd
" =========
ifhas("autocmd")
filetype plugin indent on
" 括号自动补全
func! AutoClose()
:inoremap ( ()i
:inoremap " ""i
:inoremap ' ''i
:inoremap { {}i
:inoremap [ []i
:inoremap } =ClosePair('}')
:inoremap ] =ClosePair(']')
:inoremap ) =ClosePair(')')
endf
func! ClosePair(char)
ifgetline('.')[col('.') - 1] == a:char
return"\"
else
returna:char
endif
endf
"auto close quotation marks forPHP, Javascript, etc, file
au FileType php,c,python,javascript exe AutoClose()
" Auto Check Syntax
"au BufWritePost,FileWritePost *.js,*.php call CheckSyntax(1)
" JavaScript 语法高亮
au FileType html,javascript letg:javascript_enable_domhtmlcss = 1
" 给 Javascript 文件添加 Dict
ifhas('gui_macvim') || has('unix')
au FileType javascript setlocal dict+=~/.vim/dict/javascript.dict
else
au FileType javascript setlocal dict+=$VIM/vimfiles/dict/javascript.dict
endif
" 格式化 JavaScript 文件
"au FileType javascript map :call g:Jsbeautify()
au FileType javascript setomnifunc=javascriptcomplete#CompleteJS
" 给 CSS 文件添加 Dict
ifhas('gui_macvim') || has('unix')
au FileType css setlocal dict+=~/.vim/dict/css.dict
else
au FileType css setlocal dict+=$VIM/vimfiles/dict/css.dict
endif
" 增加 ActionScript 语法支持
au BufNewFile,BufRead *.as setf actionscript
" CSS3 语法支持
au BufRead,BufNewFile *.css setft=css syntax=css3
" 增加 Objective-C 语法支持
au BufNewFile,BufRead,BufEnter,WinEnter,FileType *.m,*.h setf objc
" 将指定文件的换行符转换成 UNIX 格式
au FileType php,javascript,html,css,python,vim,vimwiki setff=unix
" 保存编辑状态
au BufWinLeave * ifexpand('%') != ''&& &buftype == ''| mkview | endif
au BufRead     * ifexpand('%') != ''&& &buftype == ''| silent loadview | syntax on | endif
" 自动最大化窗口
ifhas('gui_running')
ifhas("win32")
au GUIEnter * simalt ~x
"elseif has("unix")
"au GUIEnter * winpos 0 0
"setlines=999 columns=999
endif
endif
endif
"acp 自动补全插件
letg:AutoComplPop_Behavior = {
\ 'c': [ {'command': "\\",
\ 'pattern': ".",
\ 'repeat': 0}
\ ]
\}
" =========
" 快捷键
" =========
map cal:Calendar
letNERDTreeWinSize=22
map ntree :NERDTree
map nk :NERDTreeClose
map n :NERDTreeToggle
map cse :ColorSchemeExplorer
" 标签相关的快捷键 Ctrl
map tn :tabnext
map tp :tabprevious
map tc :tabclose
map :tabnew
map :tabprevious
map :tabnext
map :tabclose
map :tabnext
" 新建 XHTML 、PHP、Javascript 文件的快捷键
nmap :NewQuickTemplateTab xhtml
nmap :NewQuickTemplateTab php
nmap :NewQuickTemplateTab javascript
nmap :NewQuickTemplateTab css
" 在文件名上按gf时，在新的tab中打开
map gf :tabnew
"jquery 配色
au BufRead,BufNewFile *.js setsyntax=jquery
" jsLint forVim
letg:jslint_highlight_color  = '#996600'
" 指定 jsLint 调用路径，通常不用更改
letg:jslint_command = $HOME . '\/.vim\/jsl\/jsl'
" 指定 jsLint 的启动参数，可以指定相应的配置文件
letg:jslint_command_options = '-nofilelisting -nocontext -nosummary -nologo -process'
" 返回当前时间
func! GetTimeInfo()
"returnstrftime('%Y-%m-%d %A %H:%M:%S')
returnstrftime('%Y-%m-%d %H:%M:%S')
endfunction
" 插入模式按 Ctrl + D(ate) 插入当前时间
imap =GetTimeInfo()
" ==================
" plugin list
" ==================
"Color Scheme Explorer
"jsbeauty \ff
"NERDTree
"Calendar
"conquer_term
"nerd_commenter
"setup forC and C++
filetype plugin on
setnocp
```