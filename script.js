// script.js - Comportamento do modal/carrossel e gatilhos das categorias
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("gallery-modal");
  const modalTitle = document.getElementById("gallery-title");
  const carouselView = document.querySelector(".carousel-view");
  const dotsWrap = document.querySelector(".carousel-dots");
  const btnPrev = document.querySelector(".carousel-prev");
  const btnNext = document.querySelector(".carousel-next");
  const closeBtn = document.querySelector(".modal-close");

  // Dados das galerias: cada array deve apontar para imagens reais do seu servidor/pasta
  const galleries = {
    "15anos": ["/fotografo/img/15 anos/1.jpg", "/fotografo/img/15 anos/2.jpg", "/fotografo/img/15 anos/3.jpg"],
    criancas: ["/fotografo/img/Crianças/1.jpg", "/fotografo/img/Crianças/2.jpg", "/fotografo/img/Crianças/3.jpg"],
    formatura: ["/fotografo/img/Formatura/1.jpg", "/fotografo/img/Formatura/2.jpg", "/fotografo/img/Formatura/3.jpg"],
    gravida: ["/fotografo/img/Grávida/1.jpg", "/fotografo/img/Grávida/2.jpg", "/fotografo/img/Grávida/3.jpg"],
    noivas: ["/fotografo/img/Noivas/1.png", "/fotografo/img/Noivas/2.png", "/fotografo/img/Noivas/3.png"],
    paisagens: [
      "https://i.pinimg.com/736x/f5/de/1f/f5de1f40b5343d4ca8de245efe67ddeb.jpg",
      "https://i.pinimg.com/1200x/ac/46/18/ac4618d195b576be660970007b6b3506.jpg",
      "https://i.pinimg.com/736x/6b/7d/fe/6b7dfe97fd9306ddb72cd12c74852fdb.jpg",
      "https://i.pinimg.com/1200x/ba/24/50/ba24507c7f5452c198ff3033f98385c8.jpg",
      "https://i.pinimg.com/736x/60/9b/6b/609b6bdda7afb8ce6949cbfe2d320548.jpg",
    ],
  };

  let currentGallery = null;
  let index = 0;

  // Abre modal com uma galeria específica
  function openGallery(key) {
    const imgs = galleries[key];
    if (!imgs || imgs.length === 0) return;

    currentGallery = imgs;
    index = 0;
    renderImage();
    renderDots();
    modalTitle.textContent = prettifyKey(key);
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeGallery() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    carouselView.innerHTML = "";
    dotsWrap.innerHTML = "";
    document.body.style.overflow = "";
  }

  function renderImage() {
    carouselView.innerHTML = "";
    const img = document.createElement("img");
    img.src = currentGallery[index];
    img.alt = `Imagem ${index + 1} de ${currentGallery.length}`;
    carouselView.appendChild(img);
    updateDots();
  }

  function renderDots() {
    dotsWrap.innerHTML = "";
    currentGallery.forEach((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = i === index ? "active" : "";
      b.addEventListener("click", () => {
        index = i;
        renderImage();
      });
      dotsWrap.appendChild(b);
    });
  }

  function updateDots() {
    const buttons = Array.from(dotsWrap.children);
    buttons.forEach((b, i) => b.classList.toggle("active", i === index));
  }

  // Navegação
  btnPrev.addEventListener("click", () => {
    if (!currentGallery) return;
    index = (index - 1 + currentGallery.length) % currentGallery.length;
    renderImage();
  });
  btnNext.addEventListener("click", () => {
    if (!currentGallery) return;
    index = (index + 1) % currentGallery.length;
    renderImage();
  });

  // Fechar modal
  closeBtn.addEventListener("click", closeGallery);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeGallery();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeGallery();
    if (e.key === "ArrowLeft") btnPrev.click();
    if (e.key === "ArrowRight") btnNext.click();
  });

  // Gatilhos - botões de categoria e cards do portfolio
  document.querySelectorAll(".cat-btn, .portfolio-card").forEach((el) => {
    el.addEventListener("click", () => {
      const key = el.dataset.target || el.getAttribute("data-target");
      if (key) openGallery(key);
    });
  });

  // Insere ano no rodapé
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Helper: transformar chave em título bonitinho
  function prettifyKey(k) {
    return k
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/(\d)(anos)/i, "$1 anos")
      .replace(/_/g, " ")
      .replace(/^\w/, (c) => c.toUpperCase());
  }
});
