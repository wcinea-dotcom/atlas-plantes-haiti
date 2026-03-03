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
]; // Très important de bien fermer ici
