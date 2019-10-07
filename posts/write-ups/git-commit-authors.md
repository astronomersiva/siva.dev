---
title: Distinct Git authors for personal and work projects
date: October 7, 2019
description: No more wrong commit authors
tags: General, Workflow
code: true
order: 44
featured: true
showOnHomePage: true
---

If you are somebody like me who has both personal and work projects in your development setup, you will probably be setting up the commit author each time you clone a repo.

While it's foolproof, it can feel annoying to do this often. I was looking for a solution to this and here's what I found.

It is possible to include `.gitconfig` files in other `.gitconfig` files. An interesting feature in Git is that you can do this conditionally.

Let's use this feature to our advantage now. In your `~/.gitconfig`, do the following:

```bash
# ~/.gitconfig

[user]
    email = personal@email.com
    name  = Siva

[includeIf "gitdir:~/work/"]
    path = .gitconfig-work

```

What this does is that, it sets the commit author's name to `Siva` and email to `personal@email.com`. When a repository's path starts with `~/work`, it includes the configuration in `.gitconfig-work`. Now, if `.gitconfig-work` has the following contents, the commits in that repo alone will use the following user(essentially overriding the previous user).

```bash
# ~/.gitconfig-work

[user]
    email = official@company.com
    name  = Mr. Siva
```


Using the above setup, all Git repositories, except the ones under the path `~/work/` use my personal details and the ones under `~/work` are committed with my official details.
