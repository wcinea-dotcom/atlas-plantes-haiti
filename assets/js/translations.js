function applyTranslations(lang) {
    currentLang = lang;
    const texts = i18n[lang];

    // Update text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (texts[key]) {
            el.textContent = texts[key];
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (texts[key]) {
            el.placeholder = texts[key];
        }
    });
}

// Set default language on load
document.addEventListener('DOMContentLoaded', () => {
    applyTranslations(currentLang);
});
