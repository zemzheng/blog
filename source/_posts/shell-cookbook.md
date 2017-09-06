---
title: shell cookbook
date: 2016-05-04 13:50:09
tags:
    - cookbook
    - shell
---

一些比较有用或者好玩的方法 for shell
<!-- more -->

* 等待输入

```sh
    # 让用户输入一个字符来表示是否进行某个操作
    # http://stackoverflow.com/questions/1885525/how-do-i-prompt-a-user-for-confirmation-in-bash-script
    #
    read -p "Are you sure? " -n 1 -r
    # -n <num> 可以输入多少字符
    echo    # (optional) move to a new line
    if [[ $REPLY =~ ^[Yy]$ ]]
    then
        # do something you confirm
    fi
    
```
    
* echo 输出颜色
```sh

    # 设置接下来的输出颜色
    echo -e "\033[<F>;<B>m"
    echo -e "\e[<F>;<B>m"

    # \033[<F>;<B>m
    # \e[<F>;<B>m
    # <F> 文字颜色
    # <B> 背景颜色
```

&lt;F&gt; | &lt;B&gt; | 描述
--        | --        | --
30        | 40        | 黑色
31        | 41        | 红色
32        | 42        | 绿色
33        | 43        | 黄色
34        | 44        | 蓝色
35        | 45        | 紫红色
36        | 46        | 青蓝色
37        | 47        | 白色
    
* date 输出指定的格式

```sh
    date +'%s'
```

格式 | 说明
--   | --
%%   | a literal %
%a   | locale's abbreviated weekday name (Sun..Sat)
%A   | locale's full weekday name, variable length (Sunday..Saturday)
%b   | locale's abbreviated month name (Jan..Dec)
%B   | locale's full month name, variable length (January..December)
%c   | locale's date and time (Sat Nov 04 12:02:33 EST 1989)
%d   | day of month (01..31)
%D   | date (mm/dd/yy)
%e   | day of month, blank padded ( 1..31)
%h   | same as %b
%H   | hour (00..23)
%I   | hour (01..12)
%j   | day of year (001..366)
%k   | hour ( 0..23)
%l   | hour ( 1..12)
%m   | month (01..12)
%M   | minute (00..59)
%n   | a newline
%p   | locale's AM or PM
%r   | time, 12-hour (hh:mm:ss [AP]M)
%s   | seconds since 00:00:00, Jan 1, 1970 (a GNU extension)
%S   | second (00..60)
%t   | a horizontal tab
%T   | time, 24-hour (hh:mm:ss)
%U   | week number of year with Sunday as first day of week (00..53)
%V   | week number of year with Monday as first day of week (01..52)
%w   | day of week (0..6);  0 represents Sunday
%W   | week number of year with Monday as first day of week (00..53)
%x   | locale's date representation (mm/dd/yy)
%X   | locale's time representation (%H:%M:%S)
%y   | last two digits of year (00..99)
%Y   | year (1970...)
%z   | RFC-822 style numeric timezone (-0500) (a nonstandard extension)
%Z   | time zone (e.g., EDT), or nothing if no time zone is determinable

