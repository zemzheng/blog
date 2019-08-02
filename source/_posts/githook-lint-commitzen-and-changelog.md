---
title: 使用 *lint + lint-staged + husky + commitzen + auto-changelog 来让项目更规范
date: 2019-05-21 17:05:13
tags:
    - git
---

现在有越来越多的工具可以协助我们来维护项目的开发，避免不规范的代码和提交信息，并自动从 commit message 里面提取 changelog。
现在手头几个日常项目都陆续加上这些工具来提升开发体验，这里就顺带来记录下都用了些什么东西

`更新:`
- 2019-08-02 lint-staged 有调整，需要修改 pre-commit 及 ignore 配置


## 太长不看篇：
```bash
# 在项目根目录执行
bash <(curl https://blog.ziey.me/assert/githook-lint-commitzen-and-changelog/init.sh)
```


## *lint
`格式检查工具`
- [tslint](https://palantir.github.io/tslint/)
```bash
# ########### 安装
npm i tslint -D # 可以考虑用 npx，这里不需要安装
npm i typescript -D
# ########### 配置
# 配置一个 tslint.json 文件 @see https://palantir.github.io/tslint/usage/configuration/
# ########### 使用
./node_modules/.bin/tslint -c tslint.json yourfile.ts
# 或者 npx tslint -c tslint.json yourfile.ts
```

- [eslint](https://eslint.org/)
```bash
# ########### 安装
npm i eslint -D # 可以考虑用 npx，这里不需要安装
# ########### 配置
./node_modules/.bin/eslint --init
# ########### 使用
./node_modules/.bin/eslint yourfile.js
# 或者 npx eslint yourfile.js
```

- [commitlint](https://commitlint.js.org)
```bash
# ########### 安装
npm i commitlint -D # 可以考虑用 npx，这里不需要安装
npm i @commitlint/config-conventional -D
# ########### 配置
echo "module.exports = {extends: ['@commitlint/config-conventional']};" \
    > commitlint.config.js
# ########### 使用
./node_modules/.bin/commitlint "message"
# 或者 npx commitlint "message"
```

## lint-staged
`针对提交的文件执行特定的指令，如代码规范检查`
翻到 [🚫💩 lint-staged](https://github.com/okonet/lint-staged) 这个项目的时候还是觉得很喜感的：
> Run linters against staged git files and don't let 🚫 slip into your code base!

### 安装及配置
- npm i -D lint-staged
```javascript
// package.json 配置例子
{
  "lint-staged": {
    "*.{js,jsx}": ["eslint --fix", "git add"],
    "*.{ts,tsx}": ["tslint --fix", "git add"]
  }
}
```

## husky
> `Git hooks made easy`

[husky](https://github.com/typicode/husky) 可以用来通过配置 package.json 来设置 git hooks，结合前面列出的工具，可以在提交代码的时候自动对待提交内容进行代码格式、提交信息格式等进行检查。当然，包括本文没有提及的单元测试等也可以通过 husky 来配置启动

### 安装及配置

- `npm i husky -D`
- 在 package.json 中加入下面的内容：
```javascript
"husky": {
    "hooks": {
        "pre-commit": "lint-staged",
        "commit-msg": "npx commitlint -E HUSKY_GIT_PARAMS"
    }
}
```

## commitzen
`提交信息的格式化生成工具`

[commitzen](https://github.com/commitizen/cz-cli) 可以格式化提交信息，只要你运行并按照提示填写信息即可

### 安装及配置

```bash
npm i -D commitizen # 可以考虑用 npx，这里不需要安装
npm i -D cz-conventional-changelog
```

```javascript
{
    ...
    "config": {
        "commitizen": {
            "path": "cz-conventional-changelog"
        }
    }
}
```

然后就可以通过下面的命令来提交代码了：
```bash
git add .
./node_modules/.bin/git-cz
# 如果是使用 npx，则：
# npx git-cz
```

## auto-changelog

[auto-changelog](https://www.npmjs.com/package/auto-changelog) 的安装和使用很简单：
```bash
npm i -g auto-changelog
auto-changelog # 在项目目录下执行后会生成 CHANGELOG.md
# 也可以通过 npx 运行
npx auto-changelog
```
