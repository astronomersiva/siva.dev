---
title: Render the scene and not the universe
date: September, 2018
description: Cutting down rendering performance in Ember
code: true
tags: EmberJS
order: 32
---

Anyone who has profiled long list views will know how slow they can get irrespective of the
framework used.

Tools like [vertical-collection](https://github.com/html-next/vertical-collection) help in
improving the initial and re-render performance by rendering **only the scene and not the
universe**.

Even with tools like these, there might be significant performance penalties due to what is
being displayed in the *scene* itself. Consider this very simple list with about 35 rows.
There are columns for the person's name, gender and a More Details dropdown. 

```
{{#each model as |row|}}
  {{#student-list}}
    <td>{{row.name}}</td>
    <td>{{row.gender}}</td>

    {{#basic-dropdown as |dropdown|}}
      {{#dropdown.trigger}}More Details{{/dropdown.trigger}}

      {{#dropdown.content}}
        <ul>
          <li>Phone: {{row.phone}}</li>
          <li>Company: {{row.company}}</li>
          <li>Balance: {{row.balance}}</li>
          {{#if row.isActive}}
            <li>Send Greeting</li>
          {{/if}}
        </ul>
      {{/dropdown.content}}

    {{/basic-dropdown}}
  {{/student-list}}
{{/each}}
```

Note that `vertical-collection` will still render all of these rows because they are all
in my viewport.

It displays something as simple as this.

::: lazy-image src="/static/images/lowres/list.png" alt="List" :::

Let us profile this and see. 

*I use a high-end Macbook Pro, so let's throttle the CPU by 4x to replicate what most
people will be seeing.*

::: lazy-image src="/static/images/lowres/before-isopen.png" alt="Rendering Speed" :::

There. ~240ms to display a simple list. I had this whole thing wrapped in a `canShow` block
with a button to toggle it and could clearly notice the lag between when I clicked the button
and when the table showed up.

240ms might not seem like much to some but when that dropdown's contents are based on some
computed properties, this could very well spike to significantly higher numbers.

**How do we solve this?**

Remember *render only the scene and not the universe*? If you have noticed properly, the
dropdowns' contents are rendered even if they might not get toggled at all by the users.
Luckily, the [basic-dropdown](https://github.com/cibernox/ember-basic-dropdown) addon
exposes an `isOpen` property that we can make use of. Even if you do not use this addon, it is
trivial to determine if a dropdown is open or not. Let's try and make use of this property to
see if there are any improvements in the initial rendering performance.

```
{{#each model as |row|}}
  {{#student-list}}
    <td>{{row.name}}</td>
    <td>{{row.gender}}</td>

    {{#basic-dropdown as |dropdown|}}
      {{#dropdown.trigger}}More Details{{/dropdown.trigger}}

      {{#if dropdown.isOpen}}
        {{#dropdown.content}}
          <ul>
            <li>Phone: {{row.phone}}</li>
            <li>Company: {{row.company}}</li>
            <li>Balance: {{row.balance}}</li>
            {{#if row.isActive}}
              <li>Send Greeting</li>
            {{/if}}
          </ul>
        {{/dropdown.content}}
      {{/if}}

    {{/basic-dropdown}}
  {{/student-list}}
{{/each}}
```

**99ms**. This is still bad but at least a major improvement from what we had before.

::: lazy-image src="/static/images/lowres/after-isopen.png" alt="After" :::

We were able to significantly improve our initial and re-render performance in some of our
routes by this technique. Do try this out in your apps if you follow a similar pattern in your templates.
