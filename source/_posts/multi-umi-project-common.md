---
title: 多个 umi.js 项目共享 common 代码的方案
date: 2019-05-17 18:00:00
tags:
    - js
    - umi
---

## 背景

- umi 版本 2.6
- 目录结构
```javascript
    app-a/
        .umirc.js
        src/
    app-b/
        .umirc.js
        src/
    common/
        src/
```
- app-a 和 app-b 有部分公用的组件和逻辑
- 将公用部分抽到 common 目录下，配置 alias: '/common' = common/src
- 并没有按预期编译成功，会看到公用代码部分编译报错提示：`odule parse failed: Unexpected token`

## 分析

看样子是 common 目录并没有在编译配置中，因此在引入这部分代码的时候会出现解析错误。

翻看 github 上 umi 相关的讨论：

- https://github.com/umijs/umi/issues/1830#issuecomment-456388152
> 所以想问一下，一个大的系统，分了很多子系统，每个子系统是一个SPA，用UMI可以开发这样的一个大系统吗？还是说用UMI单独开发每一个子系统。那是不是有点儿浪费，每个子系统之间有很多公用的组件和module。请问大家一般是怎么处理这样的场景的？
- https://github.com/umijs/umi-example-monorepo
> 关于 umi 的分包，我理解分包是指把一个应用的部分拆出去，然后按需引入。拆的部分可以是路由、model、service、组件等等。

然而我手头的业务是 app-a, app-b, common 都经常更改和提交代码的，如果以 npm 包依赖发布 common 在日常开发维护中会比较麻烦
而且 common 内的代码也仅供 app-a, app-b 两个 SPA 使用而已

在 umi 文档中翻到了 [chainWebpack](https://umijs.org/zh/config/#chainwebpack)，可以自行扩展和修改 webpack 配置

那么应该可以用这个方法来搞事情

## 解决

结合前面提及的，如果能将 common 配置和 src/ 下的代码处理一致，应该就能满足需要了。

于是这边新增： `common/.umirc.js`

```javascript
// common/.umirc.js
const path = require('path');
const commonRoot = path.join(__dirname, 'src');
module.exports = (src) => ({
    // ... 其他 umi 配置
    alias: {
        '/src': path.join(root, 'src'),
        '/common': commonRoot,
    },
    chainWebpack(config){
        config.module.rules.values().forEach((oneConfig) => {
            if( oneConfig.include.has(root) ){
                oneConfig.include.add(commonRoot);
            }
        });
    }
});
```

再修改 `app-a/.umirc.js` 和 `app-b/.umirc.js` ：
```javascript
const config = require('../common/.umirc.js')(__dirname);
// 如果有必要，在这里修改 config 的配置
module.exports = config;
```

这样就能在 app-a 和 app-b 中愉快地使用 common/src 里面的组件和逻辑了
