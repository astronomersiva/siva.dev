---
title: maestro, a Z Shell theme
date: August, 2018
description: My attempt at learning how theming works in shells.
tags: Tooling
order: 30
---


**maestro** is a Z Shell theme that I developed to learn how theming works in general with shells.

I intended to create something visually similar to the impressive [night owl](https://github.com/sdras/night-owl-vscode-theme) theme and with some of the best functionality that several themes provide but at the same time remain uncluttered.

[[Source on Github]](https://github.com/astronomersiva/zsh-theme-maestro/)

::: lazy-image src="/static/images/lowres/maestro.png" alt="maestro theme" :::

It has the following feautures:

* The prompt character turns red when the previous command didn't run sucessfully(non-zero exit code).
* All directory paths are shown relative to the root.
* When in a Git repository, the path is shown relative to the project root.
* Displays the branch name when in a Git repository and indicates if it's dirty. 

::: lazy-image src="/static/images/lowres/git-repo.png" alt="git repo" :::
