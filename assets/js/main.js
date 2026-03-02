// État global
let plantesData = window.plantesData || [];
let ressourcesData = window.ressourcesData || [];

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

// Initialisation au chargement
document.addEventListener('DOMContentLoaded', () => {
    // Injecter le header et footer
    injectComponents();
    
    // Charger les données depuis localStorage si disponibles
    loadLocalData();
    
    // Attacher les événements
    attachEvents();
    
    // Afficher les données
    afficherPlantes(plantesData);
    afficherRessources(ressourcesData);
    
    // Gestionnaire pour le menu mobile
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
});

// Charger les données depuis localStorage
function loadLocalData() {
    const savedPlantes = localStorage.getItem('plantesData');
    if (savedPlantes) {
        try {
            plantesData = JSON.parse(savedPlantes);
        } catch (e) {
            console.error('Erreur de parsing des données locales', e);
        }
    }
}

// Sauvegarder les données dans localStorage
function saveLocalData() {
    localStorage.setItem('plantesData', JSON.stringify(plantesData));
}

// Attacher les événements
function attachEvents() {
    searchInput.addEventListener('input', filtrerDonnees);
    filterFamille.addEventListener('change', filtrerDonnees);
    filterSysteme.addEventListener('change', filtrerDonnees);
    filterMaladie.addEventListener('change', filtrerDonnees);
    searchResInput.addEventListener('input', filtrerRessources);
    filterResType.addEventListener('change', filtrerRessources);
    
    // Fermer le modal en cliquant à l'extérieur
    document.getElementById('plantModal').addEventListener('click', function(e) {
        if (e.target === this) closeModal();
    });
}

// Injecter les composants header et footer
function injectComponents() {
    const headerPlaceholder = document.getElementById('header-component');
    const footerPlaceholder = document.getElementById('footer-component');
    
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = generateHeader();
    }
    
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = generateFooter();
    }
}

// Générer le header
function generateHeader() {
    return `
        <header class="bg-botanical text-white shadow-lg sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-20">
                    <div class="flex-shrink-0 flex items-center gap-3 cursor-pointer" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
                        <div class="bg-botanical-accent/20 p-2 rounded-full">
                            <i class="fa-solid fa-leaf text-3xl text-botanical-accent"></i>
                        </div>
                        <div>
                            <h1 class="font-black text-xl md:text-2xl tracking-tight" data-i18n="site_title">Atlas Plantes d'Haïti</h1>
                            <p class="text-xs opacity-80 -mt-1" data-i18n="site_subtitle">Grand Sud • Documentation • Conservation</p>
                        </div>
                    </div>

                    <div class="hidden md:flex items-center gap-2">
                        <div class="bg-botanical-dark/50 rounded-lg p-1 flex gap-1 border border-botanical-accent/30">
                            <button onclick="setLanguage('fr')" class="lang-btn px-3 py-1.5 rounded-md text-sm font-bold hover:bg-botanical-accent/20">🇫🇷 FR</button>
                            <button onclick="setLanguage('en')" class="lang-btn px-3 py-1.5 rounded-md text-sm font-bold hover:bg-botanical-accent/20">🇬🇧 EN</button>
                            <button onclick="setLanguage('ht')" class="lang-btn px-3 py-1.5 rounded-md text-sm font-bold hover:bg-botanical-accent/20">🇭🇹 HT</button>
                        </div>
                        <a href="#data-hub" class="ml-2 px-4 py-2 bg-botanical-accent text-botanical-dark rounded-lg font-bold hover:bg-white transition-all hover:scale-105 shadow-lg flex items-center gap-2">
                            <i class="fa-solid fa-database"></i> <span data-i18n="nav_data">Base de données</span>
                        </a>
                    </div>

                    <div class="md:hidden flex items-center gap-2">
                        <select id="mobileLang" class="bg-botanical-dark border border-botanical-accent rounded-lg px-2 py-1 text-sm text-white" onchange="setLanguage(this.value)">
                            <option value="fr">🇫🇷 FR</option>
                            <option value="en">🇬🇧 EN</option>
                            <option value="ht">🇭🇹 HT</option>
                        </select>
                        <button id="mobile-menu-btn" class="outline-none text-white focus:outline-none p-2">
                            <i class="fa-solid fa-bars text-3xl"></i>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    `;
}

// Générer le footer
function generateFooter() {
    return `
        <footer class="bg-gray-900 text-gray-400 py-12 text-center border-t-4 border-botanical-accent">
            <div class="max-w-7xl mx-auto px-4">
                <div class="flex items-center justify-center gap-3 mb-6">
                    <i class="fa-solid fa-leaf text-botanical-accent text-2xl"></i>
                    <h4 class="text-white text-xl font-bold tracking-wider">ATLAS DES PLANTES DU GRAND SUD D'HAÏTI</h4>
                </div>
                <p class="mb-4" data-i18n="foot_p1">Un projet de documentation, conservation et valorisation de la biodiversité.</p>
                <p class="text-sm text-gray-500">© ${new Date().getFullYear()} Atlas Botanique. Tous droits réservés.</p>
            </div>
        </footer>
    `;
}

// Fonction pour obtenir la couleur du statut
function getStatusColor(statutKey) {
    if (!statutKey) return 'bg-gray-100 text-gray-800';
    const s = statutKey.toLowerCase();
    if (s.includes('commune') || s.includes('cultivée') || s.includes('common') || s.includes('cultivated') || s.includes('komen') || s.includes('kiltive')) 
        return 'bg-green-100 text-green-800 border-green-300';
    if (s.includes('rare') || s.includes('menacée') || s.includes('endangered') || s.includes('an danje')) 
        return 'bg-red-100 text-red-800 border-red-300';
    if (s.includes('endémique') || s.includes('endemic') || s.includes('andemik')) 
        return 'bg-purple-100 text-purple-800 border-purple-300';
    if (s.includes('envahissante') || s.includes('invasive') || s.includes('anvayisan')) 
        return 'bg-orange-100 text-orange-800 border-orange-300';
    return 'bg-gray-100 text-gray-800 border-gray-300';
}

// Afficher les plantes
function afficherPlantes(plantes) {
    if (!grid) return;
    
    grid.innerHTML = ''; 
    
    if (plantes.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
                <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fa-solid fa-leaf text-gray-400 text-3xl"></i>
                </div>
                <h4 class="text-xl text-gray-700 font-bold mb-2">${i18n[currentLang].res_empty}</h4>
                <p class="text-gray-500 mb-6">${i18n[currentLang].res_empty_desc}</p>
                <button onclick="resetFilters()" class="px-6 py-2 bg-botanical text-white rounded-lg hover:bg-botanical-dark transition">${i18n[currentLang].btn_reset}</button>
            </div>`;
        resultCount.textContent = `0 ${i18n[currentLang].pl_plante}`;
        return;
    }

    resultCount.textContent = `${plantes.length} ${i18n[currentLang].pl_plante}`;

    plantes.forEach(plante => {
        const carte = document.createElement('div');
        carte.className = 'bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col group cursor-pointer';
        carte.onclick = () => showPlantDetails(plante.id);
        
        const statusColor = getStatusColor(plante.statut[currentLang]);

        carte.innerHTML = `
            <div class="h-48 overflow-hidden relative">
                <img src="${plante.image}" alt="${plante.nomScientifique}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span class="absolute top-3 right-3 text-[10px] font-bold px-3 py-1.5 rounded-full ${statusColor} border shadow-sm uppercase tracking-wide">
                    ${plante.statut[currentLang] || 'Non évalué'}
                </span>
                ${plante.toxicite ? `<span class="absolute top-3 left-3 text-[10px] font-bold px-3 py-1.5 rounded-full bg-red-600 text-white border shadow-sm uppercase tracking-wide"><i class="fa-solid fa-triangle-exclamation mr-1"></i>${i18n[currentLang].lbl_tox_badge}</span>` : ''}
            </div>
            <div class="p-5 flex-grow flex flex-col relative bg-white">
                <div class="flex justify-between items-start mb-2">
                    <span class="text-[10px] font-bold text-botanical-accent uppercase tracking-widest">${plante.famille}</span>
                    <span class="text-[10px] bg-gray-100 px-2 py-1 rounded-full text-gray-600">${plante.origine[currentLang] || 'Non précisé'}</span>
                </div>
                <h3 class="text-lg font-extrabold text-gray-900 mb-1 italic">${plante.nomScientifique}</h3>
                <p class="text-sm text-gray-500 font-medium mb-3">${plante.nomCommun[currentLang]}</p>
                
                <div class="space-y-2 text-xs text-gray-700 flex-grow mb-3">
                    <div class="flex items-start gap-2">
                        <i class="fa-solid fa-child-reaching text-botanical mt-1 w-4 text-center"></i>
                        <div><span class="font-bold">${i18n[currentLang].lbl_sys}:</span> ${plante.systeme[currentLang]}</div>
                    </div>
                    <div class="flex items-start gap-2">
                        <i class="fa-solid fa-virus-covid text-botanical mt-1 w-4 text-center"></i>
                        <div><span class="font-bold">${i18n[currentLang].lbl_mal}:</span> ${plante.maladie[currentLang]}</div>
                    </div>
                </div>
                
                <button class="mt-auto w-full bg-botanical-light text-botanical font-bold py-2.5 rounded-lg group-hover:bg-botanical group-hover:text-white transition duration-300 border border-botanical-accent text-sm">
                    <i class="fa-regular fa-file-lines mr-2"></i> ${i18n[currentLang].btn_details}
                </button>
            </div>
        `;
        grid.appendChild(carte);
    });
}

// Filtrer les plantes
function filtrerDonnees() {
    const terme = searchInput.value.toLowerCase();
    const famille = filterFamille.value.toLowerCase();
    const systeme = filterSysteme.value.toLowerCase();
    const maladie = filterMaladie.value.toLowerCase();

    const resultats = plantesData.filter(plante => {
        const matchTexte = plante.nomScientifique.toLowerCase().includes(terme) || 
                           plante.nomCommun[currentLang].toLowerCase().includes(terme) ||
                           (plante.utilisation && plante.utilisation[currentLang].toLowerCase().includes(terme));
        
        const matchFamille = famille === "" || (plante.famille && plante.famille.toLowerCase().includes(famille));
        const matchSysteme = systeme === "" || (plante.systeme.fr && plante.systeme.fr.toLowerCase().includes(systeme));
        const matchMaladie = maladie === "" || (plante.maladie.fr && plante.maladie.fr.toLowerCase().includes(maladie));

        return matchTexte && matchFamille && matchSysteme && matchMaladie;
    });

    afficherPlantes(resultats);
}

// Réinitialiser les filtres
function resetFilters() {
    searchInput.value = '';
    filterFamille.value = '';
    filterSysteme.value = '';
    filterMaladie.value = '';
    filtrerDonnees();
}

// Définir un filtre
function setFilter(type, valeur) {
    resetFilters(); 
    if(type === 'famille') filterFamille.value = valeur;
    if(type === 'systeme') filterSysteme.value = valeur;
    if(type === 'maladie') filterMaladie.value = valeur;
    if(type === 'statut') {
        const resultats = plantesData.filter(p => p.statut && p.statut.fr.toLowerCase().includes(valeur.toLowerCase()));
        afficherPlantes(resultats);
        document.getElementById('data-hub').scrollIntoView({ behavior: 'smooth' });
        return;
    }
    filtrerDonnees();
    
    const mobileMenu = document.getElementById('mobile-menu');
    if(mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
    }
    document.getElementById('data-hub').scrollIntoView({ behavior: 'smooth' });
}

// Fonction pour obtenir l'icône du type de ressource
function getIconForResType(type) {
    if(type === 'Livre') return 'fa-book';
    if(type === 'Article') return 'fa-file-lines';
    if(type === 'Vocabulaire') return 'fa-spell-check';
    return 'fa-file';
}

// Afficher les ressources
function afficherRessources(ressources) {
    if (!gridRes) return;
    
    gridRes.innerHTML = '';
    
    if (ressources.length === 0) {
        gridRes.innerHTML = `
            <div class="col-span-full text-center py-12 bg-white rounded-xl border border-gray-200">
                <p class="text-gray-500 font-medium">${i18n[currentLang].res_empty}</p>
            </div>`;
        return;
    }

    ressources.forEach(res => {
        const carte = document.createElement('div');
        carte.className = 'bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 p-6 flex flex-col';
        
        carte.innerHTML = `
            <div class="flex items-start justify-between mb-4">
                <div class="w-12 h-12 rounded-full bg-botanical-light text-botanical flex items-center justify-center text-xl">
                    <i class="fa-solid ${getIconForResType(res.type)}"></i>
                </div>
                <span class="text-xs font-bold uppercase tracking-widest text-botanical border border-botanical px-2 py-1 rounded-full">${res.type}</span>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">${res.titre[currentLang]}</h3>
            <p class="text-sm text-gray-500 mb-4 font-medium"><i class="fa-regular fa-user mr-1"></i> ${res.auteur} &bull; ${res.annee}</p>
            <p class="text-gray-600 mb-6 flex-grow">${res.description[currentLang]}</p>
            ${res.type !== 'Vocabulaire' ? `
            <button class="mt-auto block text-center w-full bg-gray-100 text-gray-700 font-bold py-2 rounded-lg hover:bg-botanical hover:text-white transition duration-300" onclick="window.open('${res.lien || '#'}', '_blank')">
                ${i18n[currentLang].btn_read} <i class="fa-solid fa-arrow-right ml-1"></i>
            </button>` : ''}
        `;
        gridRes.appendChild(carte);
    });
}

// Filtrer les ressources
function filtrerRessources() {
    const terme = searchResInput.value.toLowerCase();
    const type = filterResType.value;

    const resultats = ressourcesData.filter(res => {
        const matchTexte = res.titre[currentLang].toLowerCase().includes(terme) || 
                           res.description[currentLang].toLowerCase().includes(terme) ||
                           res.auteur.toLowerCase().includes(terme);
        
        const matchType = type === "" || res.type === type;
        return matchTexte && matchType;
    });

    afficherRessources(resultats);
}

// Réinitialiser les filtres ressources
function resetFiltersRes() {
    searchResInput.value = '';
    filterResType.value = '';
    filtrerRessources();
}

// Définir un filtre ressources
function setFilterRes(type) {
    resetFiltersRes();
    filterResType.value = type;
    filtrerRessources();
    
    const mobileMenu = document.getElementById('mobile-menu');
    if(mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
    }
    document.getElementById('ressources-hub').scrollIntoView({ behavior: 'smooth' });
}

// Afficher les détails d'une plante
function showPlantDetails(id) {
    const plante = plantesData.find(p => p.id === id);
    if (!plante) return;
    
    document.getElementById('modalImage').src = plante.image;
    document.getElementById('modalFamille').innerText = plante.famille;
    document.getElementById('modalNomSci').innerText = plante.nomScientifique;
    document.getElementById('modalNomCom').innerText = plante.nomCommun[currentLang];
    
    document.getElementById('modalSysteme').querySelector('span').innerText = plante.systeme[currentLang];
    document.getElementById('modalMaladie').querySelector('span').innerText = plante.maladie[currentLang];
    document.getElementById('modalUtilisation').querySelector('span').innerText = plante.utilisation[currentLang];
    
    const statutEl = document.getElementById('modalStatut');
    statutEl.innerText = plante.statut[currentLang];
    statutEl.className = `inline-block px-3 py-1 rounded-full text-sm font-bold border ${getStatusColor(plante.statut[currentLang])}`;
    
    document.getElementById('modalOrigine').innerText = plante.origine[currentLang];
    
    const toxContainer = document.getElementById('modalToxiciteContainer');
    if(plante.toxicite) {
        toxContainer.classList.remove('hidden');
        document.getElementById('modalToxicite').querySelector('span').innerText = plante.toxicite[currentLang];
    } else {
        toxContainer.classList.add('hidden');
    }

    document.getElementById('plantModal').classList.remove('hidden');
    document.getElementById('plantModal').classList.add('flex');
    document.body.classList.add('modal-open');
}

// Fermer le modal
function closeModal() {
    document.getElementById('plantModal').classList.add('hidden');
    document.getElementById('plantModal').classList.remove('flex');
    document.body.classList.remove('modal-open');
}

// Toggle sous-menu mobile
function toggleMobileSubmenu(id) {
   
