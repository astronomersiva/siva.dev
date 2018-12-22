---
title: Bootstrap migration at scale for fast paced teams
date: May, 2018
description: An approach to lazily migrate Bootstrap at scale for busy teams.
tags: Bootstrap, Ideas
order: 22
---

Migrating tens of thousands of lines of code an be a pretty demanding task even for the most equipped teams. If there is a clear migration strategy that slowly introduces changes while gradually deprecating existing APIs, teams can migrate their code while upgrading versions by performing incremental changes. With Bootstrap 4 however, a bulk of the APIs have been changed and this requires every usage of Bootstrap to be changed to the latest version before upgrading. Even though this is straightforward to most projects, large projects that are fast paced may face difficulties.

Consider this example. Harry migrates from Bootstrap 3 to Bootstrap 4 in a branch `bootstrap-v4` forked from the master branch on May 5. He finishes this by May 7 and realises that there has been code modifications and he has to work on the migration again(and resolve all those ugly merge conflicts). Not only does he have to change class names on the changes, he should also ensure that there are no visual regressions because of his changes. On a sufficiently large codebase, this is frankly not possible as one cannot be expected to remember how each part of an application looks like. One way to avoid this will be stopping all development until Harry finishes his work and involving all developers in helping out Harry by splitting modules/components among fellow devs. But when your customers are demanding features and there are deadlines to be met, this is not feasible for fast paced teams.

A better approach will be to perform migrations on the basis of Bootstrap APIs<sup>*</sup>. Bootstrap 3 has a [`Customize and Download`](https://getbootstrap.com/docs/3.3/customize/) feature that we can use to help in this migration. Let's say on May 5, all developers decide to change all tables in their codebase to work with Bootstrap v4. The customize and Download feature can be used to compile and download Bootstrap with all styles other than the ones related to tables. Even though v4 does not have this feature, the required styles(in this case,`tables.scss`) alone can be imported in the `bootstrap.scss` file in the cloned source and built to CSS. We will now have two CSS files - v3 containing all styles other than tables and v4 containing only table related styles. All developers can now easily migrate tables alone to v4. This can go on for several iterations, migrating one(or multiple) components at a time till the entire codebase has been migrated to v4.

#### **Advantages**

* **Does not hinder the development cycle** - Migration can happen **along** with other feature development.
* **Enables a gradual learning(and unlearning) curve** - It will be quite confusing for developers to suddenly start using v4 syntax. With this approach, one gets to unlearn gradually and learn the latest syntax at the same time.
* **Lets the developers set the pace for the migration** - Is it a busy week when developers are overloaded with work? Migrate just one(or zero) APIs. Is it a relatively free week? Migrate four APIs!

#### **Disadvantages**

* Some teams might have to get any third-party dependencies like these from an organisation level download center to avoid licensing related issues. Since such teams will have to script this removal and addition logic on the downloaded assets, it will slightly increase the build timing and temporarily add an additional task to the build pipeline. Teams can try talking to the concerned people and use this as a special case to directly bundle Bootstrap in their repos to reduce these efforts.
* Interdependent APIs will have to be migrated together.
* There will be cases where manual intervention will be required while custom building the newer version. However, the effort involved in this will be significantly lesser than migrating in bulk as it is easier to concentrate on just one thing and analyse all its variants.
* Introduces an additional network call to fetch another CSS - This can be avoided by combining the two CSS files.
* Developers will have to keep track of which APIs have been converted to use the correct styles.

**Talk is cheap. Show me the code!**

I have put together a [small, ugly example](/static/bootstrap-migration/example.html) of using Bootstrap 3 and 4 together. The table in this example uses Bootstrap 4 and the rest use Bootstrap 3.

<sup>*</sup><small>Using the term APIs for the lack of something better.</small>
