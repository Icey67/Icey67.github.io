---
layout: default
title: Ice Blogs
---


<h1><span style="color: cyan">Icey</span>'s Weblog</h1>
<sub>Look ma! I'm a blogger! <i>she isn't proud.</i></sub>
{% assign sorted_posts = site.posts | sort: 'date' %}
{% for post in sorted_posts %}
<article>
<p>
<a href="{{ post.url }}">{{ post.title }}</a>
- <small>Created on {{ post.date | date: "%B %d, %Y; %H:%M" }}</small>
</p>
</article>
{% endfor %}