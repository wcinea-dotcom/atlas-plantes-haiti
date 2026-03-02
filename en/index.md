---
layout: default
title: "Home"
lang: en
permalink: /en/
---

{% assign t = site.data.translations.en %}

{% assign plantes = site.data.plantes %}
{% assign stats_plantes = plantes | size %}
{% assign stats_familles = plantes | map: "famille" | uniq | size %}
{% assign stats_endemiques = plantes | where: "statut.en", "Endemic" | size %}

<div class="hero-section">
  <div class="hero-content">
    <h1>{{ t.site_title }}</h1>
    <p>{{ t.site_subtitle }}</p>

    <div class="stats-grid">
      <div class="stat-card">
        <span class="stat-number">{{ stats_plantes }}+</span>
        <span class="stat-label">{{ t.stats.plantes }}</span>
      </div>

      <div class="stat-card">
        <span class="stat-number">{{ stats_familles }}</span>
        <span class="stat-label">{{ t.stats.familles }}</span>
      </div>

      <div class="stat-card">
        <span class="stat-number">12</span>
        <span class="stat-label">{{ t.stats.systemes }}</span>
      </div>

      <div class="stat-card">
        <span class="stat-number">{{ stats_endemiques }}</span>
        <span class="stat-label">{{ t.stats.endemiques }}</span>
      </div>
    </div>
  </div>
</div>

{% include search-form.html %}

<section class="featured-plantes">
  <h2>Featured Plants</h2>

  <div class="plantes-grid">
    {% assign featured = plantes | sample: 6 %}
    {% for plante in featured %}
      {% include plant-card.html plante=plante %}
    {% endfor %}
  </div>

  <div class="view-all">
    <a href="{{ '/en/atlas/plantes/' | relative_url }}" class="btn btn-primary">
      View all plants →
    </a>
  </div>
</section>

<section class="categories-grid">
  <a href="{{ '/en/atlas/familles/' | relative_url }}" class="category-card">
    <i class="fas fa-sitemap"></i>
    <h3>By botanical family</h3>
    <p>{{ stats_familles }} documented families</p>
  </a>

  <a href="{{ '/en/atlas/systemes/' | relative_url }}" class="category-card">
    <i class="fas fa-heart-pulse"></i>
    <h3>By body system</h3>
    <p>12 systems</p>
  </a>

  <a href="{{ '/en/atlas/maladies/' | relative_url }}" class="category-card">
    <i class="fas fa-virus-covid"></i>
    <h3>By disease</h3>
    <p>25 pathologies</p>
  </a>

  <a href="{{ '/en/conservation/' | relative_url }}" class="category-card">
    <i class="fas fa-tree"></i>
    <h3>Conservation</h3>
    <p>Endangered species</p>
  </a>
</section>

<section class="featured-ressources">
  <h2>Recent Resources</h2>

  <div class="ressources-grid">
    {% assign ressources = site.data.ressources | sample: 3 %}
    {% for ressource in ressources %}
      {% include resource-card.html ressource=ressource %}
    {% endfor %}
  </div>
</section>
