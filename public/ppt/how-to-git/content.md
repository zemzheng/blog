# How to git

- - -

## what is git
[![wiki-git](/ppt/how-to-git/wiki-git.png)](https://zh.m.wikipedia.org/wiki/Git)

- - -
`Linus Torvalds`<br/>
[![linus](/ppt/how-to-git/linus.png)](https://en.m.wikiquote.org/wiki/Linus_Torvalds)


- - -
## summary

- git 对比 svn
- git 基本概念 
- git 常用指令 
- git 社区/服务

- - -
## 与 Svn 的对比

---
#### svn
![svn 流程](/ppt/how-to-git/svn.jpg)

---
### 单一中心与分布式

---
#### git
![git 流程](/ppt/how-to-git/git.jpg)

---
### 拉分支与打tag

---
#### svn
- svn copy ...
- svn merge ...

---
#### svn
`本质上是拷贝文件`
```shell
/
  trunk/
  branches/
    分支1/
    ...
  tags/
    标签1/
    ...
```

---
#### svn
![svn branch](/ppt/how-to-git/svn-line.png)

---
#### git
- git checkout -b ...
- git merge ...

---
#### git
![git branch](/ppt/how-to-git/git-line.png)


---
### 权限管理

---
#### svn
可以按照目录分配权限

---
#### git
按照项目分配权限

- - -

## Git 基本概念

- 工作目录（Working Directory）
- 暂存索引（Stage index）
- 历史记录（History）
- 本地版本库（Local Repository）
- 远端版本库（Remote Repository）

---
![git process](/ppt/how-to-git/git-process-summary.png)

---
![git process](/ppt/how-to-git/git-process.jpg)

---
### git - 简易指南
[![git - 简易指南](/ppt/how-to-git/git-guide.png)](http://www.bootcss.com/p/git-guide/)

- - -
## Git 常用指令

---
### git clone

- git clone <origin> <local>

---
### git checkout 

- git checkout [branch]
- git checkout -b [new branch]
- git checkout [file]

---
### git add/reset/commit

- git add [file]
- git reset [file]
- git commit -m "commit message"

---
### git pull/push

- git pull [origin] [branch]
- git push [origin] [branch]
- git remote -v

---
![git command](/ppt/how-to-git/git-command-summary.png)

---
### 其他

- git log
- git branch
- git tag
- git submodule
- ...

---
### GIT CHEAT SHEET
[![GIT CHEAT SHEET](/ppt/how-to-git/git-command-cheat.png)](https://services.github.com/on-demand/downloads/github-git-cheat-sheet.pdf)



- - -

## Git 社区/服务

---
### github
![github.logo](/ppt/how-to-git/github.logo.png)

---
### gitlab
![gitlab.logo](/ppt/how-to-git/gitlab.logo.png)

---
### git.code.oa.com
![git.code.oa.logo](/ppt/how-to-git/git.code.logo.svg)

---

### what else

- auth
- team/groups
- explore
- api/hook
- ...

- - -

## Q&A

---

### Fork
![fork](/ppt/how-to-git/fork.jpg)

---
![github.fork](/ppt/how-to-git/github.fork.png)<br/>
![gitlab.fork](/ppt/how-to-git/gitlab.fork.png)<br/>
![gitlab.fork](/ppt/how-to-git/git.code.fork.png)

