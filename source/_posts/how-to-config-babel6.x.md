---
title: 如何配置 Babel 6.x
date: 2016-05-04 13:45:44
tags:
    - react
    - babel
    - config
---

# Babel

我们使用 [Babel](https://babeljs.io/) 来将 ES6/7 或者 React 的语法编译成当前浏览器可以执行的代码


## Preset and Plugin

Babel 将各种语法特性的编译放在 Plugin 的中处理

如 React 我们就能找到下面这些 Plugin：
* react-constant-elements
* react-display-name
* react-inline-elements
* react-jsx
* react-jsx-compat
* react-jsx-source

Babel 官方给我们提供了一些 Preset，也就是常用的 Plugin 的组合，比如 preset-react

## 安装注意

grunt / gulp / webpack / cli 等各种工具都能在 Babel 的官网上找到集成配置方案。

需要注意的是 Babel 5 和 Babel 6 的配置是不一样的，升级的时候需要特别注意。

我所在的项目需要支持 React + ES 6/7 支持，因此会带上 preset-es2015, preset-stage-0, preset-react:
```sh
# npm install babel-preset-stage-0
# npm install babel-preset-react
# npm install babel-preset-es2015

// 参数
{ "presets": ["stage-0", "es2015", "react" ] }
```


