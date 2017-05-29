---
layout: default
---

{% include what_is_parcks.html %}

<h2>Latest news</h2>
<div class="latest-news">
{% for post in site.posts limit:3 %}
<a href="{{ post.url }}">
	<div class="news">
		<h3>{{post.title}}</h3>
		<p>{{ post.excerpt }}</p>
	</div>
</a>
{% endfor %}
</div>

## Mission
