---
title: Chrome v59 getComputedStyle 返回空 string 的问题
date: 2017-06-15 00:28:18
tags:
    - chrome
    - css
    - js
---

## 背景

项目用了 react-lazyload，今天收到一个 bug 反馈，说页面一堆 loading， 怎么回事？

## 原因及修复

排查后发现将 Chrome 从 v58 升级到 v59 后出现该问题，定位问题在： [react-lazyload - src/utils/scrollParent.js](https://github.com/zemzheng/react-lazyload/blob/512618857752578699f7990adc92ba1b199ceecb/src/utils/scrollParent.js#L19)
```javascript
    const overflowRegex = /(scroll|auto)/;
    // ...
    const style = window.getComputedStyle(parent);
    const position = style.position;
    const overflow = style.overflow;
    const overflowX = style['overflow-x'];
    const overflowY = style['overflow-y'];

    if (position === 'static' && excludeStaticParent) {
      continue;
    }

    // 在 parent 样式设置为 overflow-x:auto; overflow-y:scroll 的时候
    // chrome v59 获取 overflow 值为空 string，而 v58 时为 scroll
    if (overflowRegex.test(overflow) && overflowRegex.test(overflowX) && overflowRegex.test(overflowY)) {
      return parent;
    }
    // ...
```

做一段测试代码来检查手头的浏览器：
```javascript
(function(){
    function check( style, list ){
        var d  = document.createElement( 'div' ),
            id = d.id = 't-' +( +new Date );

        d.innerHTML = '<style>#' + id + ' div{' + style + '}</style><div/>';

        document.body.appendChild( d );
        var ii = list.length,
            s  = getComputedStyle( d.querySelector( 'div' ) );
        console.log( '' );
        console.log( 'style : ' + style );
        while( ii-- ){
            console.log( list[ ii ] + ' : ' + s[ list[ ii ] ] );
        }
        document.body.removeChild( d );
    }

    console.log( navigator.userAgent );

    check(
        'overflow-x :hidden; overflow-y:scroll;',
        'overflow,overflowX,overflowY'.split( ',' )
    );

    check(
        'overflow-x :visible; overflow-y:scroll;',
        'overflow,overflowX,overflowY'.split( ',' )
    );

    check(
        'overflow :hidden;',
        'overflow,overflowX,overflowY'.split( ',' )
    );

})();
```

得到：

```
Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36

style : overflow-x :hidden; overflow-y:scroll;
overflowY : scroll
overflowX : hidden
overflow : scroll

style : overflow-x :visible; overflow-y:scroll;
overflowY : scroll
overflowX : auto
overflow : auto

style : overflow :hidden;
overflowY : hidden
overflowX : hidden
overflow : hidden

Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729)
style : overflow-x :hidden; overflow-y:scroll;
overflowY : scroll
overflowX : hidden
overflow : scroll
style : overflow-x :visible; overflow-y:scroll;
overflowY : scroll
overflowX : visible
overflow : scroll
style : overflow :hidden;
overflowY : hidden
overflowX : hidden
overflow : hidden

Mozilla/5.0 (Windows NT 10.0; WOW64; rv:54.0) Gecko/20100101 Firefox/54.0 

style : overflow-x :hidden; overflow-y:scroll; 
overflowY : scroll 
overflowX : hidden 
overflow :  

style : overflow-x :visible; overflow-y:scroll; 
overflowY : scroll 
overflowX : auto 
overflow :  

style : overflow :hidden; 
overflowY : hidden 
overflowX : hidden 
overflow : hidden

Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36

style : overflow-x :hidden; overflow-y:scroll;
overflowY : scroll
overflowX : hidden
overflow : 

style : overflow-x :visible; overflow-y:scroll;
overflowY : scroll
overflowX : auto
overflow : 

style : overflow :hidden;
overflowY : hidden
overflowX : hidden
overflow : hidden
```

### fix 方案

```javascript
    // if (overflowRegex.test(overflow) && overflowRegex.test(overflowX) && overflowRegex.test(overflowY)) {
    // ==> 上面的 case 中都是 overflowX overflowY 都有值，那么直接判断这两个即可:
    if ( overflowRegex.test(overflowX) && overflowRegex.test(overflowY)) {
```

## 后续

- [x] 给 chrome 那边一个反馈： [733295](https://bugs.chromium.org/p/chromium/issues/detail?id=733295)
- [x] 给 react-lazyload 这边关联一个 [bug](https://github.com/jasonslyvia/react-lazyload/issues/84) 和 [push](https://github.com/jasonslyvia/react-lazyload/pull/98)


