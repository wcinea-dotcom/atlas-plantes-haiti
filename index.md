---
layout: default
title: "Accueil"
lang: fr
permalink: /fr/
---

{% assign t = site.data.translations.fr %}

{% assign plantes = site.data.plantes %}
{% assign stats_plantes = plantes | size %}
{% assign stats_familles = plantes | map: "famille" | uniq | size %}
{% assign stats_endemiques = plantes | where: "statut.fr", "Endémique" | size %}

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
  <h2>Plantes à découvrir</h2>

  <div class="plantes-grid">
    {% assign featured = plantes | sample: 6 %}
    {% for plante in featured %}
      {% include plant-card.html plante=plante %}
    {% endfor %}
  </div>

  <div class="view-all">
    <a href="{{ '/fr/atlas/plantes/' | relative_url }}" class="btn btn-primary">
      Voir toutes les plantes →
    </a>
  </div>
</section>

<section class="categories-grid">
  <a href="{{ '/fr/atlas/familles/' | relative_url }}" class="category-card">
    <i class="fas fa-sitemap"></i>
    <h3>Par famille botanique</h3>
    <p>{{ stats_familles }} familles documentées</p>
  </a>

  <a href="{{ '/fr/atlas/systemes/' | relative_url }}" class="category-card">
    <i class="fas fa-heart-pulse"></i>
    <h3>Par système du corps</h3>
    <p>12 systèmes</p>
  </a>

  <a href="{{ '/fr/atlas/maladies/' | relative_url }}" class="category-card">
    <i class="fas fa-virus-covid"></i>
    <h3>Par maladie</h3>
    <p>25 pathologies</p>
  </a>

  <a href="{{ '/fr/conservation/' | relative_url }}" class="category-card">
    <i class="fas fa-tree"></i>
    <h3>Conservation</h3>
    <p>Espèces menacées</p>
  </a>
</section>

<section class="featured-ressources">
  <h2>Ressources récentes</h2>

  <div class="ressources-grid">
    {% assign ressources = site.data.ressources | sample: 3 %}
    {% for ressource in ressources %}
      {% include resource-card.html ressource=ressource %}
    {% endfor %}
  </div>
</section>
