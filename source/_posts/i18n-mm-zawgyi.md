---
title: 缅甸文的 Zawgyi 编码及字体
date: 2017-11-30 13:46:39
tags:
    - i18n
    - encoding
    - webfont
    - chatset
---

## 背景

之前项目组在准备缅甸国际化事宜。我们上线了一版 utf-8 编码的页面，与其他语言版本相比并无多少不同。然而请缅甸团队同事 review 后却被告知显示编码不对，显示有误。

## 原因

原来缅甸语市场有 unicode 和 zawgyi 两套编码方案，据称两套编码方案使用情况为：

[来源](http://mmgpmedia.com/local-news/15058)
zawgyi | both | unicode
--     | --   | --
60%    | 30%  | 10%

```
    内容提供方(zawgyi)--> 项目组(unicode)<--> 用户(zawgyi)
```

由于我们项目本身是采用 `unicode - utf8` 进行编码，新增一个缅甸语市场的接入，还需要保持兼容原来的内容。

然而如果采用 unicode 编码，按照上面了解到的情况，在缅甸语市场上将导致大部分用户的显示异常，并且需要额外做编码转换。

## 解决方案

直接从编码的情况考虑，将内容转为 `unicode` 应该是最佳选择。

然而通过研究 unicode 和 zawgyi 两种编码方式，其实我们可以有个取巧的方案。

参考[缅甸维基百科·字体](https://my.wikipedia.org/wiki/Wikipedia:Font)o

{% asset_img my.wikipedia.png Unicode vs Zawgyi-One %}

实际上两种编码大概在同一个码点区， Zawgyi 占用了其他一些小语种的编码。那么我完全可以不转义供应方提供的 Zawgyi 编码内容，然后在展示给用户那一侧用 Zawgyi 字体来优先显示内容。

```
  |   codes      |                fonts                  |
  | ... unicode  | ----------------------> unicode-font  |
  |    zawgyi    | ----> Zawgyi-One                      |
  | ... unicode  | ----------------------> unicode-font  |
  font-familys : "Zawgyi-One", "Arial";
```