---
layout: default
title: Plant Atlas of the Great South
lang: en
---

<section class="bg-gradient-to-r from-red-700 to-red-500 text-white py-6 px-4">
  <div class="max-w-6xl mx-auto flex items-center justify-center gap-4 flex-wrap">
    <div class="bg-white/20 p-3 rounded-full">
      <i class="fa-solid fa-triangle-exclamation text-2xl"></i>
    </div>
    <p class="text-lg font-bold text-center">
      ⚠️ IMPORTANT WARNING: This atlas is not intended for self-medication. Many plants can be toxic. Always consult a healthcare professional before any use.
    </p>
  </div>
</section>

<section class="bg-[#2c5e3b] text-white py-8">
  <div class="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
    <div class="bg-white/10 p-4 rounded-xl">
      <div class="text-3xl font-black">90+</div>
      <div class="text-sm uppercase tracking-wider opacity-90">Documented Plants</div>
    </div>
    <div class="bg-white/10 p-4 rounded-xl">
      <div class="text-3xl font-black">25+</div>
      <div class="text-sm uppercase tracking-wider opacity-90">Botanical Families</div>
    </div>
    <div class="bg-white/10 p-4 rounded-xl">
      <div class="text-3xl font-black">12</div>
      <div class="text-sm uppercase tracking-wider opacity-90">Body Systems</div>
    </div>
    <div class="bg-white/10 p-4 rounded-xl">
      <div class="text-3xl font-black">80%</div>
      <div class="text-sm uppercase tracking-wider opacity-90">Traditional Use</div>
    </div>
  </div>
</section>

<section id="data-hub" class="bg-[#e8f5e9] py-16 px-4 border-b border-gray-200">
  <div class="max-w-6xl mx-auto text-center">
    <span class="inline-block py-1 px-4 rounded-full bg-[#2c5e3b] text-white text-sm font-bold mb-6 tracking-wide">
      <i class="fa-solid fa-leaf mr-1"></i> 90+ Documented Plants
    </span>
    <h2 class="text-4xl md:text-5xl font-black text-[#1e4028] mb-4">Plant Atlas of the Great South</h2>
    <p class="text-lg text-gray-700 mb-10 max-w-3xl mx-auto">
      Explore the wealth of medicinal, aromatic and nutritional flora in the South and Grand'Anse departments.
    </p>

    <div class="bg-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row gap-4 items-center border border-gray-100">
      <div class="relative w-full md:w-1/4">
        <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
        <input type="text" id="searchInput"
               class="block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2c5e3b] focus:border-[#2c5e3b] outline-none transition"
               placeholder="🔍 Search for a plant...">
      </div>

      <select id="filterFamille" class="w-full md:w-1/5 py-3 px-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2c5e3b] focus:border-[#2c5e3b] outline-none bg-white">
        <option value="">All families</option>
        <option value="Acanthaceae">Acanthaceae</option>
        <option value="Asteraceae">Asteraceae</option>
        <option value="Cucurbitaceae">Cucurbitaceae</option>
        <option value="Euphorbiaceae">Euphorbiaceae</option>
        <option value="Fabaceae">Fabaceae</option>
        <option value="Lamiaceae">Lamiaceae</option>
        <option value="Rutaceae">Rutaceae</option>
        <option value="Solanaceae">Solanaceae</option>
      </select>

      <select id="filterSysteme" class="w-full md:w-1/5 py-3 px-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2c5e3b] focus:border-[#2c5e3b] outline-none bg-white">
        <option value="">All systems</option>
        <option value="Nerveux">Nervous</option>
        <option value="Digestif">Digestive</option>
        <option value="Cardiovasculaire">Cardiovascular</option>
        <option value="Respiratoire">Respiratory</option>
        <option value="Immunitaire">Immune</option>
      </select>

      <select id="filterMaladie" class="w-full md:w-1/5 py-3 px-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2c5e3b] focus:border-[#2c5e3b] outline-none bg-white">
        <option value="">All diseases</option>
        <option value="Diabète">Diabetes</option>
        <option value="Hypertension">Hypertension</option>
        <option value="Paludisme">Malaria</option>
        <option value="Infections">Infections</option>
      </select>

      <button onclick="resetFilters()" class="w-full md:w-auto px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition flex items-center justify-center gap-2" type="button">
        <i class="fa-solid fa-rotate-right"></i> Reset
      </button>
    </div>
  </div>
</section>

<section class="py-12 px-4 max-w-7xl mx-auto">
  <div class="flex justify-between items-center mb-6">
    <h3 class="text-2xl font-bold text-gray-800">🌿 Medicinal, aromatic and nutritional plants</h3>
    <span id="resultCount" class="bg-[#e8f5e9] border border-[#2c5e3b] text-[#2c5e3b] px-4 py-2 rounded-full text-sm font-bold">0</span>
  </div>
  <div id="resultatsGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-[400px]"></div>
</section>

<section id="resources-hub" class="bg-gray-100 py-16 px-4 border-t border-gray-200">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-12">
      <span class="inline-block py-1 px-4 rounded-full bg-[#c5a059] text-[#1e4028] text-sm font-bold mb-4">
        <i class="fa-solid fa-book-open-reader mr-1"></i> Resources
      </span>
      <h2 class="text-4xl md:text-5xl font-black text-[#1e4028] mb-4">Resources Database</h2>
      <p class="text-lg text-gray-600 max-w-3xl mx-auto">
        Browse our collection of scientific articles, specialized books, and botanical vocabulary.
      </p>
    </div>

    <div class="bg-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row gap-4 items-center max-w-4xl mx-auto">
      <div class="relative w-full md:w-2/3">
        <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
        <input type="text" id="searchResInput"
               class="block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#c5a059] focus:border-[#c5a059] outline-none"
               placeholder="Search for a resource...">
      </div>
      <select id="filterResType" class="w-full md:w-1/3 py-3 px-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#c5a059] focus:border-[#c5a059] outline-none bg-white">
        <option value="">All types</option>
        <option value="Livre">📚 Books</option>
        <option value="Article">📄 Articles</option>
        <option value="Vocabulaire">📖 Vocabulary</option>
      </select>
    </div>

    <div id="ressourcesGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10"></div>
  </div>
</section>

<section id="valorisation" class="bg-[#e8f5e9] py-16 px-4">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-12">
      <span class="inline-block py-1 px-4 rounded-full bg-[#2c5e3b] text-white text-sm font-bold mb-4">
        <i class="fa-solid fa-chart-line mr-1"></i> Multisectoral Potential
      </span>
      <h2 class="text-4xl md:text-5xl font-black text-[#1e4028] mb-4">Valorization of Phytotherapy</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div class="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-[#2c5e3b] card-hover">
        <div class="w-16 h-16 bg-[#e8f5e9] text-[#2c5e3b] rounded-2xl flex items-center justify-center text-3xl mb-6">
          <i class="fa-solid fa-heart-pulse"></i>
        </div>
        <h3 class="text-xl font-bold mb-3">Medical Health</h3>
        <p class="text-gray-600">Prevention and natural treatment of chronic or acute conditions.</p>
      </div>
      <div class="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-[#c5a059] card-hover">
        <div class="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-3xl mb-6">
          <i class="fa-solid fa-apple-whole"></i>
        </div>
        <h3 class="text-xl font-bold mb-3">Nutrition & Nutraceuticals</h3>
        <p class="text-gray-600">Use of plants as superfoods to boost immunity.</p>
      </div>
      <div class="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-blue-500 card-hover">
        <div class="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center text-3xl mb-6">
          <i class="fa-solid fa-brain"></i>
        </div>
        <h3 class="text-xl font-bold mb-3">Mental & Emotional Health</h3>
        <p class="text-gray-600">Use of adaptogenic plants for stress reduction and balance.</p>
      </div>
    </div>
  </div>
</section>

<section id="mission" class="bg-white py-16 px-4 border-t border-gray-200">
  <div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
    <div>
      <div class="flex items-center gap-4 mb-6">
        <div class="w-12 h-12 bg-[#2c5e3b] text-white rounded-xl flex items-center justify-center text-xl">
          <i class="fa-solid fa-book-open"></i>
        </div>
        <h2 class="text-2xl font-bold text-gray-800">History</h2>
      </div>
      <p class="text-gray-600 mb-4">Medicinal plants have a rich history in Haiti, merging Taíno, African and European knowledge.</p>
      <p class="text-gray-600">Today, over 80% of Haitians still use plants as their first line of health defense.</p>
    </div>

    <div>
      <div class="flex items-center gap-4 mb-6">
        <div class="w-12 h-12 bg-[#2c5e3b] text-white rounded-xl flex items-center justify-center text-xl">
          <i class="fa-solid fa-bullseye"></i>
        </div>
        <h2 class="text-2xl font-bold text-gray-800">Our Mission</h2>
      </div>
      <ul class="space-y-4">
        <li class="flex gap-3">
          <span class="font-bold text-[#2c5e3b] min-w-[100px]">Document:</span>
          <span class="text-gray-600">Systematically catalog the flora of the Great South.</span>
        </li>
        <li class="flex gap-3">
          <span class="font-bold text-[#2c5e3b] min-w-[100px]">Validate:</span>
          <span class="text-gray-600">Bridge ancestral knowledge and modern science.</span>
        </li>
        <li class="flex gap-3">
          <span class="font-bold text-[#2c5e3b] min-w-[100px]">Conserve:</span>
          <span class="text-gray-600">Promote the protection of endangered species.</span>
        </li>
      </ul>
    </div>
  </div>
</section>

<section class="bg-red-50 py-16 px-4 border-y border-red-200">
  <div class="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg border-l-8 border-red-600">
    <h2 class="text-2xl font-bold text-red-800 mb-6">Legal and Health Warning</h2>
    <ul class="space-y-4">
      <li class="flex items-start gap-3">
        <i class="fa-solid fa-circle-exclamation text-red-600 mt-1"></i>
        <span class="text-gray-700">This atlas is not a self-medication manual.</span>
      </li>
      <li class="flex items-start gap-3">
        <i class="fa-solid fa-circle-exclamation text-red-600 mt-1"></i>
        <span class="text-gray-700">Misidentifying a plant can be fatal.</span>
      </li>
      <li class="flex items-start gap-3">
        <i class="fa-solid fa-circle-exclamation text-red-600 mt-1"></i>
        <span class="text-gray-700">Some species are protected by law.</span>
      </li>
      <li class="flex items-start gap-3">
        <i class="fa-solid fa-circle-exclamation text-red-600 mt-1"></i>
        <span class="text-gray-700">ALWAYS consult a healthcare professional.</span>
      </li>
    </ul>
  </div>
</section>
