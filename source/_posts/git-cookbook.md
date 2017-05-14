---
title: git cookbook
date: 2016-05-04 13:55:32
tags:
    - cookbook
    - git
---

一些比较有用或者好玩的方法 for git
<!-- more -->

* 更新本地代码

```sh
git fetch -p
git pull origin [branch]
```

* 获取远程分支的信息

```sh
git remote show origin
```

* 拉分支

```sh
git checkout -b feature.desc.160305 # 以当前分支为基础，拉出分支feature.desc.160305
git checkout -b [branch] [remotename]/[branch] # 远程拉取分支并本地跟踪
```

* 分支信息

```sh
git branch -vv # 显示各分支信息
```

* 删除远程分支

```sh
git push origin --delete [branch]
```

* 推送分支

```sh
git push origin head # 目前后台使用该命令会出错
git push origin $branch # 后台使用的版本支持
如果出现失败，可以尝试先pull
git pull origin [branch]
```

* 打tag

```sh
git tag 20160305
git push origin [tag]   # push tag到远端
```

* 对比差异

```sh
git diff    # 显示还未暂存的改动
git diff --staged # 显示当前和上次提交之间的差异
git diff master --name-only -- xxx # 当前分支和master对比xxx目录下的有差异文件列表，注意参数顺序
git diff 20160229 --name-only # 当前分支与tag 20160229 进行对比
git diff head head^ --name-only --diff-filter=AM # 列出两个提交点的新增及修改文件
```

* 拿到当前的 hash 值

```sh
git log --pretty=%H -n 1
```

* git 配置

```sh
 git config --global -l
 git config --global --add user.name yourname
 git config --global --unset user.name 
 # 命令中带了--global参数，这就意味是在进行全局配置,它会影响本机上的每个一个Git项目.
 # Git的全局配置文件是存放在~/.gitconfig（用户目录下的.gitconfig）文件中,项目配置文件是存放在Git项目所在目录的.git/config文件中,可自由添加 
```
	
* git 回滚 

```sh
 # 场景1:当你改乱了工作区某个文件的内容,想直接丢弃工作区的修改时,用命令
 git checkout -- file.  

 # 场景2:当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步
 # 第一步用命令
 git reset HEAD file # 回到了场景1，第二步按场景1操作 

 # 场景3:已经提交了不合适的修改到版本库时，想要撤销本次提交，不过前提是没有推送到远程库。
 # HEAD指向的版本就是当前版本，因此，Git允许在版本的历史之间穿梭，使用命令
 git reset --hard commit_id 
 # 向前回滚,用git log可以查看提交历史，以便确定要回退到哪个版本。
 # 向后用git reflog查看命令历史，以便确定要回到未来的哪个版本。
```

* 打一个更新包

```sh
    branch="master"                                              # 要打包的分支 master 或者 develop
    to="head"                                                    # 更新到目标点
    from="head^"                                                 # 上一个更新点
    git checkout $branch                                         # master 或者 release
    pkg="/data/release/cms-${branch}-$( date +"%Y%m%d-%s" ).tgz" # 更新包名称
    git checkout $targetBranch
    for f in $( git diff $fromBranch $targetBranch --name-only --diff-filter=AM ); do
        tar -rzf $pkg $f
    done;
    git checkout -
```
