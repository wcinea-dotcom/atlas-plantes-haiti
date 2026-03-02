// ============================================
// 1. DÉTECTION DE LA LANGUE VIA L'URL
// ============================================
// The script looks at the URL (e.g., /en/, /ht/) to know which language data to inject
let currentLang = 'fr';
if (window.location.pathname.includes('/en/')) {
    currentLang = 'en';
} else if (window.location.pathname.includes('/ht/')) {
    currentLang = 'ht';
}

// UI Translations exclusively for the JS-generated elements (cards and modals)
const ui = {
    fr: { sys: "Système", mal: "Maladies", btn: "Voir la fiche complète", empty: "Aucun résultat trouvé", empty_desc: "Essayez de modifier vos critères de recherche.", tox: "TOXIQUE", tox_lbl: "Toxicité & Précautions", read: "Consulter" },
    en: { sys: "System", mal: "Diseases", btn: "View full profile", empty: "No results found", empty_desc: "Try modifying your search criteria.", tox: "TOXIC", tox_lbl: "Toxicity & Precautions", read: "Read" },
    ht: { sys: "Sistèm", mal: "Maladi", btn: "Gade tout fich la", empty: "Nou pa jwenn anyen", empty_desc: "Eseye chanje kritè rechèch ou yo.", tox: "POZON", tox_lbl: "Toksisite & Prekosyon", read: "Konsilte" }
};
const t = ui[currentLang];

// ============================================
// 2. VARIABLES GLOBALES ET DOM
// ============================================
const grid = document.getElementById('resultatsGrid');
const searchInput = document.getElementById('searchInput');
const filterFamille = document.getElementById('filterFamille');
const filterSysteme = document.getElementById('filterSysteme');
const filterMaladie = document.getElementById('filterMaladie');
const resultCount = document.getElementById('resultCount');

const gridRes = document.getElementById('ressourcesGrid');
const searchResInput = document.getElementById('searchResInput');
const filterResType = document.getElementById('filterResType');

// ============================================
// 3. AFFICHAGE DES PLANTES (MULTI-PAGES)
// ============================================
function getStatusColor(statut) {
    if (!statut) return 'bg-gray-100 text-gray-800';
    const s = statut.toLowerCase();
    if (s.includes('commune') || s.includes('common') || s.includes('komen') || s.includes('cultivée') || s.includes('cultivated') || s.includes('kiltive')) 
        return 'bg-green-100 text-green-800 border-green-300';
    if (s.includes('menacée') || s.includes('endangered') || s.includes('an danje')) 
        return 'bg-red-100 text-red-800 border-red-300';
    if (s.includes('endémique') || s.includes('endemic') || s.includes('andemik')) 
        return 'bg-purple-100 text-purple-800 border-purple-300';
    return 'bg-gray-100 text-gray-800 border-gray-300';
}

function afficherPlantes(plantes) {
    if (!grid) return;
    grid.innerHTML = '';
    
    if (resultCount) resultCount.textContent = plantes.length;

    if (plantes.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-10 bg-white rounded-xl border border-gray-200">
                <p class="text-xl text-gray-500 font-bold">${t.empty}</p>
                <p class="text-sm text-gray-400">${t.empty_desc}</p>
            </div>`;
        return;
    }

    plantes.forEach(plante => {
        // Fallbacks in case a specific translation is missing in the database
        const nomComun = plante.nomCommun?.[currentLang] || plante.nomScientifique;
        const systemes = plante.systeme?.[currentLang] || "";
        const maladies = plante.maladie?.[currentLang] || "";
        const statut = plante.statut?.[currentLang] || "";

        const carte = document.createElement('div');
        carte.className = 'bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col group cursor-pointer';
        carte.onclick = () => showPlantDetails(plante.id);
        
        const statusColor = getStatusColor(statut);
        const toxicityBadge = plante.toxicite ? `<span class="absolute top-3 left-3 text-[10px] font-bold px-3 py-1.5 rounded-full bg-red-600 text-white border shadow-sm animate-pulse">⚠️ ${t.tox}</span>` : '';

        carte.innerHTML = `
            <div class="h-48 overflow-hidden relative bg-gray-200">
                <img src="${plante.image}" alt="${nomComun}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                <span class="absolute top-3 right-3 text-[10px] font-bold px-3 py-1.5 rounded-full ${statusColor} border shadow-sm uppercase tracking-wide">
                    ${statut}
                </span>
                ${toxicityBadge}
            </div>
            <div class="p-5 flex-grow flex flex-col">
                <span class="text-[10px] font-bold text-[#c5a059] uppercase tracking-widest">${plante.famille}</span>
                <h3 class="text-xl font-black text-[#1e4028] mb-1">${nomComun}</h3>
                <p class="text-sm italic text-gray-500 mb-4">${plante.nomScientifique}</p>
                
                <div class="space-y-2 mb-4 flex-grow text-sm">
                    <p><span class="font-bold text-gray-700">${t.sys} :</span> <span class="text-gray-600">${systemes}</span></p>
                    <p><span class="font-bold text-gray-700">${t.mal} :</span> <span class="text-gray-600">${maladies}</span></p>
                </div>
                
                <div class="w-full py-2 bg-[#e8f5e9] text-[#2c5e3b] font-bold rounded-xl text-center group-hover:bg-[#2c5e3b] group-hover:text-white transition">
                    ${t.btn}
                </div>
            </div>
        `;
        grid.appendChild(carte);
    });
}

function filtrerDonnees() {
    if (!searchInput) return;

    const terme = searchInput.value.toLowerCase();
    const famille = filterFamille.value;
    const systeme = filterSysteme.value;
    const maladie = filterMaladie ? filterMaladie.value : "";

    const resultats = plantesData.filter(plante => {
        const nomSci = plante.nomScientifique.toLowerCase();
        const nomCom = (plante.nomCommun[currentLang] || "").toLowerCase();
        const matchTexte = nomSci.includes(terme) || nomCom.includes(terme);
        
        const matchFamille = famille === "" || plante.famille === famille;
        
        // Match against French base keys for select options
        const matchSysteme = systeme === "" || (plante.systeme.fr && plante.systeme.fr.includes(systeme));
        const matchMaladie = maladie === "" || (plante.maladie.fr && plante.maladie.fr.includes(maladie));
        
        return matchTexte && matchFamille && matchSysteme && matchMaladie;
    });

    afficherPlantes(resultats);
}

function resetFilters() {
    if (searchInput) searchInput.value = '';
    if (filterFamille) filterFamille.value = '';
    if (filterSysteme) filterSysteme.value = '';
    if (filterMaladie) filterMaladie.value = '';
    afficherPlantes(plantesData);
}

// ============================================
// 4. AFFICHAGE DES RESSOURCES
// ============================================
function getIconForResType(type) {
    if (type === 'Livre') return 'fa-book';
    if (type === 'Article') return 'fa-file-lines';
    if (type === 'Vocabulaire') return 'fa-spell-check';
    return 'fa-file';
}

function afficherRessources(ressources) {
    if (!gridRes) return;
    gridRes.innerHTML = '';
    
    if (ressources.length === 0) {
        gridRes.innerHTML = `<div class="col-span-full text-center py-8"><p class="text-gray-500">${t.empty}</p></div>`;
        return;
    }

    ressources.forEach(res => {
        const carte = document.createElement('div');
        carte.className = 'bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition border border-gray-100 flex flex-col';
        carte.innerHTML = `
            <div class="flex items-start justify-between mb-4">
                <div class="w-12 h-12 rounded-full bg-[#e8f5e9] text-[#2c5e3b] flex items-center justify-center text-xl">
                    <i class="fa-solid ${getIconForResType(res.type)}"></i>
                </div>
                <span class="text-xs font-bold uppercase text-[#2c5e3b] border border-[#2c5e3b] px-2 py-1 rounded-full">${res.type}</span>
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-2">${res.titre[currentLang]}</h3>
            <p class="text-gray-600 mb-4 flex-grow">${res.description[currentLang]}</p>
            <a href="${res.lien}" class="inline-flex items-center justify-center gap-2 w-full py-2 bg-gray-100 text-[#1e4028] font-bold rounded-xl hover:bg-[#c5a059] transition">
                <i class="fa-solid fa-arrow-up-right-from-square"></i> ${t.read}
            </a>
        `;
        gridRes.appendChild(carte);
    });
}

function filtrerRessources() {
    if (!searchResInput) return;
    const terme = searchResInput.value.toLowerCase();
    const type = filterResType.value;
    
    const resultats = ressourcesData.filter(r => 
        (r.titre[currentLang].toLowerCase().includes(terme) || r.description[currentLang].toLowerCase().includes(terme)) &&
        (type === "" || r.type === type)
    );
    afficherRessources(resultats);
}

function resetFiltersRes() {
    if (searchResInput) searchResInput.value = '';
    if (filterResType) filterResType.value = '';
    afficherRessources(ressourcesData);
}

// ============================================
// 5. MODAL ET INITIALISATION
// ============================================
function showPlantDetails(id) {
    const plante = plantesData.find(p => p.id === id);
    if (!plante) return;
    
    document.getElementById('modalImage').src = plante.image;
    document.getElementById('modalFamille').innerText = plante.famille;
    document.getElementById('modalNomSci').innerText = plante.nomScientifique;
    document.getElementById('modalNomCom').innerText = plante.nomCommun[currentLang];
    document.getElementById('modalSysteme').innerText = plante.systeme[currentLang];
    document.getElementById('modalMaladie').innerText = plante.maladie[currentLang];
    
    let utilText = `<p class="text-gray-800">${plante.utilisation[currentLang]}</p>`;
    if (plante.toxicite) {
        utilText += `
            <div class="mt-4 bg-red-50 border-l-4 border-red-600 p-3 rounded">
                <p class="text-red-800 text-sm font-bold"><i class="fa-solid fa-triangle-exclamation"></i> ${t.tox_lbl}</p>
                <p class="text-red-700 text-sm">${plante.toxicite[currentLang]}</p>
            </div>`;
    }
    document.getElementById('modalUtilisation').innerHTML = utilText;
    
    document.getElementById('plantModal').classList.remove('hidden');
    document.getElementById('plantModal').classList.add('flex');
    document.body.classList.add('modal-open');
}

function closeModal() {
    document.getElementById('plantModal').classList.add('hidden');
    document.getElementById('plantModal').classList.remove('flex');
    document.body.classList.remove('modal-open');
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.classList.toggle('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
    // Only run if the data arrays exist on the page
    if (typeof plantesData !== 'undefined') {
        afficherPlantes(plantesData);
    }
    if (typeof ressourcesData !== 'undefined') {
        afficherRessources(ressourcesData);
    }
    
    // Listeners for Plants
    if (searchInput) searchInput.addEventListener('input', filtrerDonnees);
    if (filterFamille) filterFamille.addEventListener('change', filtrerDonnees);
    if (filterSysteme) filterSysteme.addEventListener('change', filtrerDonnees);
    if (filterMaladie) filterMaladie.addEventListener('change', filtrerDonnees);
    
    // Listeners for Resources
    if (searchResInput) searchResInput.addEventListener('input', filtrerRessources);
    if (filterResType) filterResType.addEventListener('change', filtrerRessources);
    
    // Mobile Menu
    const mobileBtn = document.getElementById('mobile-menu-btn');
    if (mobileBtn) mobileBtn.addEventListener('click', toggleMobileMenu);
    
    // Modal Overlay Click
    const modal = document.getElementById('plantModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }
});

// Expose functions globally for the HTML onClick handlers
window.resetFilters = resetFilters;
window.resetFiltersRes = resetFiltersRes;
window.closeModal = closeModal;
window.showPlantDetails = showPlantDetails;
