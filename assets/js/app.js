// ====== Lang dropdown ======
const langBtn = document.getElementById("langSelector");
const langMenu = document.getElementById("langMenu");
const currentLang = document.getElementById("currentLang");

function closeLangMenu(){
  if(!langMenu) return;
  langMenu.hidden = true;
  langBtn?.setAttribute("aria-expanded", "false");
}
function toggleLangMenu(){
  if(!langMenu) return;
  const isHidden = langMenu.hidden;
  langMenu.hidden = !isHidden;
  langBtn?.setAttribute("aria-expanded", String(isHidden));
}

langBtn?.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleLangMenu();
});

langMenu?.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-lang]");
  if(!btn) return;
  const lang = btn.getAttribute("data-lang");
  if(currentLang) currentLang.textContent = lang;

  // Ici tu peux brancher ta logique de traduction / pages FR-EN
  // ex: window.location.href = lang === "EN" ? "index-en.html" : "index.html";

  closeLangMenu();
});

document.addEventListener("click", () => closeLangMenu());
document.addEventListener("keydown", (e) => {
  if(e.key === "Escape") closeLangMenu();
});

// ====== Mobile menu ======
const mobileBtn = document.getElementById("mobileMenuBtn");
const mobileDrawer = document.getElementById("mobileDrawer");
const mobileClose = document.getElementById("mobileClose");

function openMobile(){
  if(!mobileDrawer) return;
  mobileDrawer.hidden = false;
  mobileBtn?.setAttribute("aria-expanded", "true");
}
function closeMobile(){
  if(!mobileDrawer) return;
  mobileDrawer.hidden = true;
  mobileBtn?.setAttribute("aria-expanded", "false");
}

mobileBtn?.addEventListener("click", () => openMobile());
mobileClose?.addEventListener("click", () => closeMobile());

mobileDrawer?.addEventListener("click", (e) => {
  if(e.target === mobileDrawer) closeMobile();
});
document.addEventListener("keydown", (e) => {
  if(e.key === "Escape") closeMobile();
});
