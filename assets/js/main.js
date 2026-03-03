// ============================================
// 1. LANGUAGE DETECTION
// ============================================
let currentLang = 'fr';
if (window.location.pathname.includes('/en/')) {
    currentLang = 'en';
} else if (window.location.pathname.includes('/ht/')) {
    currentLang = 'ht';
}

const ui = {
    fr: { sys: "Système", mal: "Maladies", btn: "Voir la fiche complète", empty: "Aucun résultat trouvé", empty_desc: "Modifiez vos critères.", tox: "TOXIQUE", tox_lbl: "Toxicité & Précautions" },
    en: { sys: "System", mal: "Diseases", btn: "View full profile", empty: "No results found", empty_desc: "Modify your criteria.", tox: "TOXIC", tox_lbl: "Toxicity & Precautions" },
    ht: { sys: "Sistèm", mal: "Maladi", btn: "Gade tout fich la", empty: "Nou pa jwenn anyen", empty_desc: "Chanje kritè yo.", tox: "POZON", tox_lbl: "Toksisite & Prekosyon" }
};

// ============================================
// 2. RENDER FUNCTION
// ============================================
function renderPlantes(plantesToRender) {
    const grid = document.getElementById('resultatsGrid');
    const count = document.getElementById('resultCount');
    const t = ui[currentLang];

    if (!grid) return;
    grid.innerHTML = '';
    if (count) count.textContent = plantesToRender.length;

    if (plantesToRender.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center py-10"><p class="text-xl text-gray-500">${t.empty}</p></div>`;
        return;
    }

    plantesToRender.forEach(p => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 flex flex-col group cursor-pointer hover:shadow-xl transition-all';
        card.onclick = () => showPlantDetails(p.id);

        card.innerHTML = `
            <div class="h-48 relative overflow-hidden bg-gray-200">
                <img src="${p.image}" alt="${p.nomCommun[currentLang]}" class="w-full h-full object-cover group-hover:scale-110 transition-transform">
                <div class="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded text-[10px] font-bold text-[#2c5e3b] uppercase">${p.famille}</div>
                ${p.toxicite ? `<span class="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded text-[10px] font-bold">⚠️ ${t.tox}</span>` : ''}
            </div>
            <div class="p-5 flex-grow">
                <h3 class="text-xl font-black text-[#1e4028]">${p.nomCommun[currentLang]}</h3>
                <p class="text-sm italic text-gray-500 mb-4">${p.nomScientifique}</p>
                <p class="text-xs text-gray-600"><strong>${t.sys}:</strong> ${p.systeme[currentLang]}</p>
                <p class="text-xs text-gray-600"><strong>${t.mal}:</strong> ${p.maladie[currentLang]}</p>
            </div>`;
        grid.appendChild(card);
    });
}

// ============================================
// 3. FILTER LOGIC (FIXED)
// ============================================
function applyFilters() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const famille = document.getElementById('filterFamille').value;
    const systeme = document.getElementById('filterSysteme').value;
    const maladie = document.getElementById('filterMaladie').value;

    const filtered = plantesData.filter(p => {
        const matchText = p.nomScientifique.toLowerCase().includes(search) || 
                          p.nomCommun[currentLang].toLowerCase().includes(search);
        const matchFam = famille === "" || p.famille === famille;
        
        // Match against the French key since the <option> values are in French
        const matchSys = systeme === "" || p.systeme.fr.includes(systeme);
        const matchMal = maladie === "" || p.maladie.fr.includes(maladie);

        return matchText && matchFam && matchSys && matchMal;
    });
    renderPlantes(filtered);
}

// ============================================
// 4. INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Attach listeners
    ['searchInput', 'filterFamille', 'filterSysteme', 'filterMaladie'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener(id === 'searchInput' ? 'input' : 'change', applyFilters);
    });

    // Check if data is loaded
    if (typeof plantesData !== 'undefined') {
        renderPlantes(plantesData);
    } else {
        console.error("Data 'plantesData' is not defined!");
    }
});

// Expose globally for HTML onclick
window.showPlantDetails = (id) => { /* Reuse your existing modal code here */ };
window.resetFilters = () => {
    ['searchInput', 'filterFamille', 'filterSysteme', 'filterMaladie'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    renderPlantes(plantesData);
};
