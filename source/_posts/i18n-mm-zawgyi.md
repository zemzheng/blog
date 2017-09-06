---
title: 缅甸文的 Zawgyi 编码及字体
date: 2017-09-06 23:46:39
tags:
    - i18n
    - encoding
    - webfont
    - chatset
---

## 背景

近期项目组在准备缅甸国际化事宜。我们上线了一版 utf-8 编码的页面，与其他语言版本相比并无多少不同。然而请缅甸团队同事 review 后却被告知显示编码不对，显示有误。

## 原因

原来缅甸语市场有 unicode 和 zawgyi 两套编码方案，据称两套编码方案使用情况为：

zawgyi | both | unicode
--     | --   | --
60%    | 30%  | 10%

```
    内容提供方（unicode）--> 项目组（unicode）<--> 用户（zawgyi）
```

我们如果采用 unicode 编码，按照上面了解到的情况，在缅甸语市场上将导致大部分用户的显示异常。

## 商讨方案


