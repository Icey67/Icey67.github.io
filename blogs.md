---
layout: default
title: Ice Blogs
---


<h1>The <span style="color: cyan">Ice</span> Blogs</h1>
<sub>Look ma! I'm a blogger! <i>she isn't proud.</i></sub>
{% for post in site.posts %}
<article>
<p>
<a href="{{ post.url }}">{{ post.title }}</a>
- <small>Created on {{ post.date | date: "%B %d, %Y; %H:%M" }}</small>
</p>
</article>
{% endfor %}