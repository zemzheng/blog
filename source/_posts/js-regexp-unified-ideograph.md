---
title: Javascript 正则匹配汉字
date: 2018-01-30 22:58:13
tags:
    - js
    - regexp
    - unicode
---

最近刷到一篇文章： [JavaScript 正则表达式匹配汉字](https://jhuang.me/2018/01/26/JavaScript-%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F%E5%8C%B9%E9%85%8D%E6%B1%89%E5%AD%97/)

正好解决自己之前遇到的问题 [重新了解 JS Unicode, UTF16, UTF8, UCS-2，更新之前一个 CJK 判断的代码](https://github.com/zemzheng/blog/issues/1)

```javascript
/\p{Unified_Ideograph}/u
```
> 其中`\u`是 ECMAScript 2015 定义的[正则表达式标志](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp)，意味着将表达式作为 Unicode 码点序列。`\p`是正在提案阶段的[正则表达式 Unicode 属性转义](https://github.com/tc39/proposal-regexp-unicode-property-escapes)，它赋予了我们根据 Unicode 字符的属性数据3构造表达式的能力。`Unified_Ideograph`是 Unicode 字符的一个二值属性，对于汉字，其取值为 Yes，否则为 No。

[Unified Ideograph](https://en.wikipedia.org/wiki/CJK_Unified_Ideographs) 是中日韩越的统一表意文字属性，随着 Unicode 的发展其字符范围在不断扩大。

当然由于目前该表达式处于提案阶段，大部分环境是无法直接使用的。可以考虑使用：
- [@babel/plugin-proposal-unicode-property-regex](https://github.com/babel/babel/tree/master/packages/babel-plugin-proposal-unicode-property-regex)
- [在线转ES5](https://mothereff.in/regexpu#input=/%5Cp%7BUnified_Ideograph%7D/u%3B&unicodePropertyEscape=1)

下面也顺便把发文时的转码结果贴出：
```javascript
// ES6
/\p{Unified_Ideograph}/u;
// ES5
/(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])/;
```