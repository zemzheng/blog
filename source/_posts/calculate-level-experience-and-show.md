---
title: 通过经验值来计算和显示level条
date: 2016-05-11 13:51:03
tags:
    - 算法
---

早上跟 ch哥 在班车上闲聊，说到在游戏里面，如何根据一个经验值，显示当前用户的等级 Level，并且显示当前 Level 下距离下一级别的进度百分比。

ch哥 说要是让你做，怎么搞？

<!-- more --> 

```javascript
    function exp2level( exp ){ // 得到 exp 对应的 level
        /* ... */ 
    }

    function level2expRange( level ){ // 拿到这个 level 的 exp 范围
        /* ... */
    }

    function exp2width( exp ){ // 根据 exp 拿到 Level 进度条宽度百分比
        let width;
        let expRange = level2expRange( exp );
        if( expRange[ 0 ] == expRange[ 1 ] ){
            width = 0;
        } else {
            width = ( exp - expRange[ 0 ] ) / ( expRange[ 1 ] - expRange[ 0 ] );
        }
        return width;
    }

    // 所以当 exp 已知，有：
    let level = exp2level( exp );
    let width = exp2width( exp );
    
```

对于上面的答案， ch哥 并不满意，说那 exp2level, level2expRange 这两个方法该怎么写呢？

由于并不知道 exp 是怎么分布的，假定是一堆给定点，那么可以构造数组，然后判断落在数组中哪个区间来计算

```javascript
    let expRangeArray = [ 0, 50, 100, 134, 200, 234, 300, /* ... */ ];
    
    function exp2level( exp ){
        let ii = expRangeArray.length,
            i  = 0;

        while( i < ii ){
            if( exp >= expRangeArray[ i ] && exp < expRangeArray[ i + 1 ] ){
                return i + 1;
            }
            i++;
        }
    }

    function level2expRange( level ){ // 拿到这个 level 的 exp 范围
        let ii = expRangeArray.length,
            i  = 0;

        while( i < ii ){
            if( exp >= expRangeArray[ i ] && exp < expRangeArray[ i + 1 ] ){
                return [ expRangeArray[ i ], expRangeArray[ i + 1 ] ];
            }
            i++;
        }
    }
```

然而实际上 level 与 exp 之间应该是一条平滑曲线。按照起步升级快，后面不充钱升级越来越慢的性质，可以推断其实应该是一条抛物线:
<div id="canvas" style="width:500px;position:relative;margin:0 auto;border:1px dotted;"/>
<script>
(function( box ){
    var c = document.createElement( 'canvas' );
    if( !c.getContext ) {
        box.innerHTML = '<img src=""/>';
        return;
    }
	
	var yMax = 300;

    box.appendChild( c );
    c.width = yMax;
    c.height = yMax;

    var cxt = c.getContext("2d");

    function f(x){
        return 0.01 * x * x;
    }
    
    function draw(){
        var step = 0.5, start = 0, end = yMax;
        cxt.moveTo( 0, yMax );
        while( start < end ){
            cxt.lineTo( start, yMax - f( start ) );
            start += step;
        }
    }
    draw();
	
	cxt.fillText("Zem",yMax - 100,20);
	
	cxt.moveTo( 145, yMax );
	cxt.lineTo( 145, 0 );
	
	cxt.moveTo( 130, yMax );
	cxt.lineTo( 130, yMax - 10 );
	cxt.fillText("Ln",120,yMax-20);
	
	cxt.moveTo( 160, yMax );
	cxt.lineTo( 160, yMax - 10 );
	cxt.fillText("Ln+1",160,yMax-20);
	
	cxt.moveTo( 0, 0 );
	cxt.lineTo( 0, yMax );
	cxt.lineTo( yMax, yMax );
	
	cxt.font="16px Georgia";
    cxt.fillText("Exp",10,50);
	cxt.fillText("Level",250,260);
	
	
	
    cxt.stroke();
})( document.getElementById( 'canvas' ) );

</script>

突然间就回到高中的平面几何，求交点的问题了。

当手头有一个确定的经验值 exp，我们可以做一条 y = exp 的直线，求出与 level - exp 曲线的交点，再定位到 y = exp 与 x = 0 两个线的交点。

由于 level 值必然为整数，那么就可以拿到当前 level 所在的区间。

根据上面得到的 level 区间， level - exp 曲线，就可以方便算出当前等级的进度条了：

<a class="jsbin-embed" href="http://jsbin.com/necuti/embed?js,output">JS Bin on jsbin.com</a><script src="http://static.jsbin.com/js/embed.min.js?3.35.12"></script>
