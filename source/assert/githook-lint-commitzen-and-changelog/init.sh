#!/bin/sh

echo ""
echo ""
echo "欢迎使用 ziey 项目初始化工具"
echo "本工具将在当前项目下部署 husky + lint-staged + commitzen + commitlint ( + eslint + tslint)"
echo ""
echo ""

if [ ! -f package.json ]; then
    echo "package.json not found";
    exit
fi

echo "module.exports = {extends: ['@commitlint/config-conventional']};" > commitlint.config.js

read -e -p "use npx? [Y/n]" useNpx
read -e -p "use tslint? [y/N]" useTslint
read -e -p "use eslint? [y/N]" useEslint

useNpx=${useNpx:-"Y"}
useTslint=${useTslint:-"N"}
useEslint=${useEslint:-"N"}

if [ $useNpx == "n" ]; then
    npm i -D commitlint
fi

echo ""
if [ ! -f tslint.json ]; then
    if [ $useTslint == "y" ]; then
        echo "准备进行 tslint 初始化工作"
        npm i -D typescript tslint;
            ./node_modules/.bin/tslint --init
    fi
fi

echo ""
if [ ! -f .eslintrc.js ]; then
    if [ $useEslint == "y" ]; then
        if [ $useNpx == "n" ]; then
            npm i -D eslint
            echo "准备进行 eslint 初始化工作"
            ./node_modules/.bin/eslint --init
        else
            echo "准备进行 eslint 初始化工作"
            npx eslint --init
        fi
    fi
fi

npm i -D husky lint-staged cz-conventional-changelog @commitlint/config-conventional

curl https://blog.ziey.me/assert/githook-lint-commitzen-and-changelog/init.js --output __ziey_init.js

echo ""
echo "对 pacakge.json 进行配置修改"
node ./__ziey_init.js "$useNpx $useEslint $useTslint"
rm ./__ziey_init.js
