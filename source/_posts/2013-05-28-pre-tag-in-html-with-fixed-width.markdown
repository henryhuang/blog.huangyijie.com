title:  "多浏览器支持pre固定宽度"
date:  2013-05-28 11:18
tags: [CSS,HTML]
---
之前将pre设置css属性width：xpx，一直使用的chrome来测试，还没发现有问题，放到ie下就没用了，通过以下解决：

```css
pre {
    white-space: -moz-pre-wrap; /* Mozilla, supported since 1999 */
    white-space: -pre-wrap; /* Opera */
    white-space: -o-pre-wrap; /* Opera */
    white-space: pre-wrap; /* CSS3 - Text module (Candidate Recommendation) http://www.w3.org/TR/css3-text/#white-space */
    word-wrap: break-word; /* IE 5.5+ */
}
```
