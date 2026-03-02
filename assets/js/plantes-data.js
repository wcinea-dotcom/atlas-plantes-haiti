// Données des plantes (structure multilingue)
const plantesData = [
    {
        id: 1,
        nomScientifique: "Ruellia tuberosa L.",
        famille: "Acanthaceae",
        image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=400&h=300",
        nomCommun: {fr: "Pèpèt", en: "Minnie Root", ht: "Pèpèt"},
        systeme: {fr: "Digestif, Urinaire", en: "Digestive, Urinary", ht: "Dijestif, Pipi"},
        maladie: {fr: "Troubles digestifs, Calculs rénaux", en: "Digestive issues, Kidney stones", ht: "Pwoblèm dijesyon, Wòch nan ren"},
        utilisation: {fr: "Infusion des feuilles - diurétique", en: "Leaf infusion - diuretic", ht: "Fèy bouyi - diurétik"},
        statut: {fr: "Commune", en: "Common", ht: "Komen"},
        origine: {fr: "Native", en: "Native", ht: "Natif natal"}
    },
    {
        id: 2,
        nomScientifique: "Moringa oleifera Lam.",
        famille: "Moringaceae",
        image: "https://images.unsplash.com/photo-1626094309830-abbb0c99da4a?auto=format&fit=crop&q=80&w=400&h=300",
        nomCommun: {fr: "Benzoliv", en: "Moringa", ht: "Benzoliv"},
        systeme: {fr: "Immunitaire, Nutrition", en: "Immune, Nutrition", ht: "Iminitè, Nitrisyon"},
        maladie: {fr: "Malnutrition, Anémie", en: "Malnutrition, Anemia", ht: "Malnitrisyon, Anemi"},
        utilisation: {fr: "Feuilles en poudre", en: "Powdered leaves", ht: "Fèy an poud"},
        statut: {fr: "Cultivée", en: "Cultivated", ht: "Kiltive"},
        origine: {fr: "Exotique", en: "Exotic", ht: "Egzotik"}
    },
    {
        id: 3,
        nomScientifique: "Momordica charantia L.",
        famille: "Cucurbitaceae",
        image: "https://images.unsplash.com/photo-1604841505532-1f8fc96bc58b?auto=format&fit=crop&q=80&w=400&h=300",
        nomCommun: {fr: "Asosi", en: "Bitter melon", ht: "Asosi"},
        systeme: {fr: "Métabolique, Digestif", en: "Metabolic, Digestive", ht: "Metabolik, Dijestif"},
        maladie: {fr: "Diabète, Parasitose", en: "Diabetes, Parasites", ht: "Dyabèt, Vè"},
        utilisation: {fr: "Décoction des feuilles", en: "Leaf decoction", ht: "Fèy bouyi"},
        statut: {fr: "Commune", en: "Common", ht: "Komen"},
        origine: {fr: "Exotique", en: "Exotic", ht: "Egzotik"},
        toxicite: {fr: "Abortif - déconseillé grossesse", en: "Abortifacient - avoid pregnancy", ht: "Pa bon pou fanm ansent"}
    },
    {
        id: 4,
        nomScientifique: "Cymbopogon citratus",
        famille: "Poaceae",
        image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=400&h=300",
        nomCommun: {fr: "Sitwonèl", en: "Lemongrass", ht: "Sitwonèl"},
        systeme: {fr: "Nerveux, Digestif", en: "Nervous, Digestive", ht: "Nève, Dijestif"},
        maladie: {fr: "Stress, Grippe", en: "Stress, Flu", ht: "Estrès, Grip"},
        utilisation: {fr: "Infusion des feuilles", en: "Leaf infusion", ht: "Fèy bouyi"},
        statut: {fr: "Cultivée", en: "Cultivated", ht: "Kiltive"},
        origine: {fr: "Exotique", en: "Exotic", ht: "Egzotik"}
    },
    {
        id: 5,
        nomScientifique: "Zingiber officinale",
        famille: "Zingiberaceae",
        image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=400&h=300",
        nomCommun: {fr: "Jinjanm", en: "Ginger", ht: "Jenjanm"},
        systeme: {fr: "Digestif, Immunitaire", en: "Digestive, Immune", ht: "Dijestif, Iminitè"},
        maladie: {fr: "Nausées, Grippe", en: "Nausea, Flu", ht: "Kè plen, Grip"},
        utilisation: {fr: "Rhizome en infusion", en: "Rhizome infusion", ht: "Rasin nan bouyi"},
        statut: {fr: "Cultivée", en: "Cultivated", ht: "Kiltive"},
        origine: {fr: "Exotique", en: "Exotic", ht: "Egzotik"}
    }
];

// Fonction pour afficher les cartes de plantes
function renderPlantes(plantesToRender) {
    const grid = document.getElementById('resultatsGrid');
    const count = document.getElementById('resultCount');
    
    // Safety check if the elements don't exist on the page
    if (!grid) return;

    // Grab the UI translations for the current language
    const t = i18n[currentLang]; 

    grid.innerHTML = '';
    
    if (count) {
        count.textContent = plantesToRender.length;
    }

    // Show empty state if no plants match the search/filters
    if (plantesToRender.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-10">
                <p class="text-xl text-gray-500">${t.res_empty}</p>
                <p class="text-sm text-gray-400">${t.res_empty_desc}</p>
            </div>`;
        return;
    }

    // Loop through the plants and build the HTML cards
    plantesToRender.forEach(plante => {
        const nomComun = plante.nomCommun[currentLang];
        const systemes = plante.systeme[currentLang];
        const maladies = plante.maladie[currentLang];
        
        // Add a toxicity badge if the plant has toxicity data
        const toxicityBadge = plante.toxicite ? `<div class="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold shadow animate-pulse"><i class="fa-solid fa-triangle-exclamation"></i> ${t.lbl_tox_badge}</div>` : '';

        const card = document.createElement('div');
        card.className = 'bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 card-hover flex flex-col';
        
        card.innerHTML = `
            <div class="h-48 relative overflow-hidden bg-gray-200">
                <img src="${plante.image}" alt="${nomComun}" class="w-full h-full object-cover">
                <div class="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-[#2c5e3b] shadow">
                    ${plante.famille}
                </div>
                ${toxicityBadge}
            </div>
            <div class="p-5 flex-grow flex flex-col">
                <h4 class="text-xl font-black text-[#1e4028] mb-1">${nomComun}</h4>
                <p class="text-sm italic text-gray-500 mb-4">${plante.nomScientifique}</p>
                
                <div class="space-y-2 mb-4 flex-grow">
                    <p class="text-sm"><span class="font-bold text-gray-700">${t.lbl_sys} :</span> <span class="text-gray-600">${systemes}</span></p>
                    <p class="text-sm"><span class="font-bold text-gray-700">${t.lbl_mal} :</span> <span class="text-gray-600">${maladies}</span></p>
                </div>
                
                <button onclick="openModal(${plante.id})" class="w-full py-2 bg-[#e8f5e9] text-[#2c5e3b] font-bold rounded-xl hover:bg-[#2c5e3b] hover:text-white transition" type="button">
                    ${t.btn_details}
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Fonction pour ouvrir la fenêtre contextuelle (Modal)
function openModal(id) {
    const plante = plantesData.find(p => p.id === id);
    if (!plante) return;

    const t = i18n[currentLang];

    // Populate the modal content with dynamic data
    document.getElementById('modalImage').src = plante.image;
    document.getElementById('modalFamille').textContent = plante.famille;
    document.getElementById('modalNomSci').textContent = plante.nomScientifique;
    document.getElementById('modalNomCom').textContent = plante.nomCommun[currentLang];
    document.getElementById('modalSysteme').textContent = plante.systeme[currentLang];
    document.getElementById('modalMaladie').textContent = plante.maladie[currentLang];

    // Handle Utilization and optional Toxicity warnings
    let utilisationHtml = `<p class="text-gray-800">${plante.utilisation[currentLang]}</p>`;
    if (plante.toxicite) {
        utilisationHtml += `
            <div class="mt-4 bg-red-50 border-l-4 border-red-600 p-3 rounded">
                <p class="text-red-800 text-sm font-bold"><i class="fa-solid fa-triangle-exclamation"></i> ${t.lbl_tox}</p>
                <p class="text-red-700 text-sm">${plante.toxicite[currentLang]}</p>
            </div>
        `;
    }
    document.getElementById('modalUtilisation').innerHTML = utilisationHtml;

    // Show the modal window
    const modal = document.getElementById('plantModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.classList.add('modal-open');
}

// Fonction pour fermer la fenêtre contextuelle
function closeModal() {
    const modal = document.getElementById('plantModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.classList.remove('modal-open');
}

// Render the initial grid when the file loads
document.addEventListener('DOMContentLoaded', () => {
    // Adding a slight delay to ensure i18n is fully loaded from main.js
    setTimeout(() => {
        renderPlantes(plantesData);
    }, 100);
});
