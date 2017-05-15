---
title: JavaScript - cookbook
date: 2016-05-04 13:29:41
tags:
    - js
    - cookbook
---

一些比较有用或者好玩的方法 for javascript
<!-- more -->

## String

* 数字千分位逗号
```javascript
function ( s, len ){
    s = (function( len ){ 
            return ~~( s * len ) / len + ''
            })( Math.pow( 10, len = len || 2 ) );

    s = s.split( '.' );
    if( s.length < 2 ) s.push( '' );
    while( s[1].length < len ) s[1] += '0';

    var re = /(\d)(\d{3}[\.,])/;
    s[0] += '.';
    while( re.test( s[0] ) ) s[0] = s[0].replace( re, "$1,$2" );

    return s.join( '' );
}
```

* 时间格式化
```javascript

    function( time, format ){
        format = format || '%Y 年 %m 月 %d 日';
        var d = new Date( time * 1000 );
        return format
            .replace( /%Y/g, d.getFullYear()  )
            .replace( /%m/g, d.getMonth() + 1 )
            .replace( /%d/g, d.getDate()      )
            .replace( /%H/g, d.getHours()     )
            .replace( /%i/g, d.getMinutes()   )
            .replace( /%s/g, d.getSeconds()   )
    }
```

* 字符串补全
```javascript

    function( str, len, fill ){
        fill = fill || 0;
        while( str.length < len ){
            str = fill + str;
        }
        return str;
    }
```

## Image

* image 转 data-url

```javascript

    // 浏览器
    function image2dataurl( img ){
        var c = document.createElement("canvas");
        c.width  = img.width;
        c.height = img.height;
        c.getContext("2d").drawImage( img, 0, 0 );
        return c.toDataURL();
    };

    // 使用方法
    var dataurl = image2dataurl( img );
```

* url 转 data-url

```javascript
    // 浏览器
    // 调用本页的 image2dataurl 方法
    function url2dataurl( url ){
        return new Promise( function( resolve, reject ){
            var i = new Image();
            i.onload = function(){
                resolve( image2dataurl( i ) );
            };
            i.onerror = function( e ){
                reject( e );
            }
            i.src = url;
        } );
    };

    // 使用方法
    var dataurl;
    url2dataurl( 'http://to-your-image' ).then(function( _dataurl ){
        dataurl = _dataurl;
    });
```
