---
layout: default
---

<div class="container">
	{% include what_is_parcks.html %}
</div>

<section class="full-width-purple-background" >
	<div class="container">
		<div class="latest-news">
		<h2>Latest news</h2>
		{% for post in site.posts limit:3 %}
		<a href="{{ post.url }}">
			<div class="news">
				<h3>{{post.title}}</h3>
				<p>{{ post.excerpt }}</p>
			</div>
		</a>
		{% endfor %}
		</div>
	</div>
</section>

<div class="container">
	{% include mission.html %}	
</div>
