// ============================================
// VARIABLES GLOBALES
// ============================================
// Détection de la langue courante depuis l'URL
const currentLang = window.location.pathname.split('/')[1] || 'fr';

// Éléments DOM
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
// FONCTIONS UTILITAIRES
// ============================================
function getStatusColor(statut) {
    if (!statut) return 'bg-gray-100 text-gray-800';
    const s = statut.toLowerCase();
    if (s.includes('commune') || s.includes('cultivée') || s.includes('common') || s.includes('cultivated') || s.includes('komen') || s.includes('kiltive')) 
        return 'bg-green-100 text-green-800 border-green-300';
    if (s.includes('rare') || s.includes('menacée') || s.includes('endangered') || s.includes('an danje')) 
        return 'bg-red-100 text-red-800 border-red-300';
    if (s.includes('endémique') || s.includes('endemic') || s.includes('andemik')) 
        return 'bg-purple-100 text-purple-800 border-purple-300';
    return 'bg-gray-100 text-gray-800 border-gray-300';
}

// ============================================
// AFFICHAGE DES PLANTES
// ============================================
function afficherPlantes(plantes) {
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (plantes.length === 0) {
        const emptyMsg = {
            fr: "Aucun résultat trouvé",
            en: "No results found",
            ht: "Nou pa jwenn anyen"
        };
        grid.innerHTML = `<div class="col-span-full text-center py-12 bg-white rounded-xl border border-gray-200">
            <p class="text-gray-500">${emptyMsg[currentLang]}</p>
        </div>`;
        resultCount.textContent = '0';
        return;
    }

    resultCount.textContent = plantes.length;

    plantes.forEach(plante => {
        const carte = document.createElement('div');
        carte.className = 'bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col group cursor-pointer';
        carte.onclick = () => showPlantDetails(plante.id);
        
        const statusColor = getStatusColor(plante.statut[currentLang]);

        carte.innerHTML = `
            <div class="h-48 overflow-hidden relative">
                <img src="${plante.image}" alt="${plante.nomScientifique}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                <span class="absolute top-3 right-3 text-[10px] font-bold px-3 py-1.5 rounded-full ${statusColor} border shadow-sm uppercase tracking-wide">
                    ${plante.statut[currentLang]}
                </span>
                ${plante.toxicite ? `<span class="absolute top-3 left-3 text-[10px] font-bold px-3 py-1.5 rounded-full bg-red-600 text-white border shadow-sm">⚠️ TOXIQUE</span>` : ''}
            </div>
            <div class="p-5 flex-grow">
                <span class="text-[10px] font-bold text-[#c5a059] uppercase tracking-widest">${plante.famille}</span>
                <h3 class="text-lg font-extrabold text-gray-900 mb-1 italic">${plante.nomScientifique}</h3>
                <p class="text-sm text-gray-500 font-medium mb-3">${plante.nomCommun[currentLang]}</p>
                <div class="space-y-2 text-xs text-gray-700">
                    <div class="flex items-start gap-2">
                        <i class="fa-solid fa-heart-pulse text-[#2c5e3b] mt-1 w-4"></i>
                        <div>${plante.systeme[currentLang]}</div>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(carte);
    });
}

function filtrerDonnees() {
    const terme = searchInput.value.toLowerCase();
    const famille = filterFamille.value;
    const systeme = filterSysteme.value;

    const resultats = plantesData.filter(plante => {
        const matchTexte = plante.nomScientifique.toLowerCase().includes(terme) || 
                           plante.nomCommun[currentLang].toLowerCase().includes(terme);
        const matchFamille = famille === "" || plante.famille === famille;
        const matchSysteme = systeme === "" || plante.systeme.fr.includes(systeme);
        return matchTexte && matchFamille && matchSysteme;
    });

    afficherPlantes(resultats);
}

function resetFilters() {
    searchInput.value = '';
    filterFamille.value = '';
    filterSysteme.value = '';
    filterMaladie.value = '';
    afficherPlantes(plantesData);
}

// ============================================
// AFFICHAGE DES RESSOURCES
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
        const emptyMsg = {
            fr: "Aucune ressource trouvée",
            en: "No resources found",
            ht: "Nou pa jwenn okenn resous"
        };
        gridRes.innerHTML = `<div class="col-span-full text-center py-8"><p class="text-gray-500">${emptyMsg[currentLang]}</p></div>`;
        return;
    }

    ressources.forEach(res => {
        const carte = document.createElement('div');
        carte.className = 'bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition border border-gray-100';
        carte.innerHTML = `
            <div class="flex items-start justify-between mb-4">
                <div class="w-12 h-12 rounded-full bg-[#e8f5e9] text-[#2c5e3b] flex items-center justify-center text-xl">
                    <i class="fa-solid ${getIconForResType(res.type)}"></i>
                </div>
                <span class="text-xs font-bold uppercase text-[#2c5e3b] border border-[#2c5e3b] px-2 py-1 rounded-full">${res.type}</span>
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-2">${res.titre[currentLang]}</h3>
            <p class="text-sm text-gray-500 mb-4">${res.auteur} • ${res.annee}</p>
            <p class="text-gray-600">${res.description[currentLang]}</p>
        `;
        gridRes.appendChild(carte);
    });
}

function filtrerRessources() {
    const terme = searchResInput.value.toLowerCase();
    const type = filterResType.value;
    const resultats = ressourcesData.filter(r => 
        (r.titre[currentLang].toLowerCase().includes(terme) || r.description[currentLang].toLowerCase().includes(terme)) &&
        (type === "" || r.type === type)
    );
    afficherRessources(resultats);
}

function resetFiltersRes() {
    searchResInput.value = '';
    filterResType.value = '';
    afficherRessources(ressourcesData);
}

// ============================================
// MODAL DÉTAILS PLANTE
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
    document.getElementById('modalUtilisation').innerText = plante.utilisation[currentLang];
    
    document.getElementById('plantModal').classList.remove('hidden');
    document.getElementById('plantModal').classList.add('flex');
    document.body.classList.add('modal-open');
}

function closeModal() {
    document.getElementById('plantModal').classList.add('hidden');
    document.getElementById('plantModal').classList.remove('flex');
    document.body.classList.remove('modal-open');
}

// ============================================
// MENU MOBILE
// ============================================
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.classList.toggle('hidden');
}

// ============================================
// INITIALISATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Afficher les données
    afficherPlantes(plantesData);
    afficherRessources(ressourcesData);
    
    // Attacher les événements
    if (searchInput) searchInput.addEventListener('input', filtrerDonnees);
    if (filterFamille) filterFamille.addEventListener('change', filtrerDonnees);
    if (filterSysteme) filterSysteme.addEventListener('change', filtrerDonnees);
    if (filterMaladie) filterMaladie.addEventListener('change', filtrerDonnees);
    if (searchResInput) searchResInput.addEventListener('input', filtrerRessources);
    if (filterResType) filterResType.addEventListener('change', filtrerRessources);
    
    // Mobile menu button
    const mobileBtn = document.getElementById('mobile-menu-btn');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Fermer le modal en cliquant à l'extérieur
    const modal = document.getElementById('plantModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }
});

// Exposer les fonctions globalement
window.resetFilters = resetFilters;
window.resetFiltersRes = resetFiltersRes;
window.closeModal = closeModal;
