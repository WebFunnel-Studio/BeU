const navbar = document.getElementById("navbar");
const menuBtn = document.getElementById("mobile-menu-btn");
const navMenu = document.getElementById("nav-menu");
const overlay = document.getElementById("menu-overlay");

const packageViews = [
  document.getElementById("senior-view"),
  document.getElementById("junior-view"),
];
const prevPackageBtn = document.getElementById("prev-package");
const nextPackageBtn = document.getElementById("next-package");

const studioGalleries = {
  cheras: {
    title: "Rename Studio — Cheras",
    images: [
      "./images/Studios/Rename-studio-Cheras1.jpg",
      "./images/Studios/Rename-studio-Cheras2.jpg",
      "./images/Studios/Rename-studio-Cheras3.jpg"
    ]
  },
  setapak: {
    title: "Rename Studio — Setapak",
    images: [
      "./images/Studios/Rename-studio-Setapak1.jpg",
      "./images/Studios/Rename-studio-Setapak2.jpg",
      "./images/Studios/Rename-studio-Setapak3.jpg"
    ]
  },
  puchong: {
    title: "Empty Space — Puchong",
    images: [
      "./images/Studios/Empty-Space-Puchong1.jpg",
      "./images/Studios/Empty-Space-Puchong2.jpg"
    ]
  }
};

function openGallery(location) {
  const modal = document.getElementById("galleryModal");
  const title = document.getElementById("galleryTitle");
  const imagesBox = document.getElementById("galleryImages");

  title.textContent = studioGalleries[location].title;
  imagesBox.innerHTML = studioGalleries[location].images
    .map(img => `<img src="${img}" alt="Studio photo">`)
    .join("");

  modal.classList.add("active");
}

function closeGallery() {
  document.getElementById("galleryModal").classList.remove("active");
}

let currentPackageIndex = 0;
let inactivityTimer = null;

const instructors = [
  { name: "Yining", specialty: "Founder", image: "./images/Tutor-Pics/Yining.webp" },
  { name: "Vanessa Ng", specialty: "Girlstyle Choreography", image: "./images/Tutor-Pics/VanessaNg.png" },
  { name: "Grace", specialty: "Heels Choreography", image: "./images/Tutor-Pics/Grace.webp" },
  { name: "Xinru", specialty: "Girlstyle Choreography", image: "./images/Tutor-Pics/Xin Ru.webp" },
  { name: "Reene.", specialty: "Hiphop", image: "./images/Tutor-Pics/Renee.webp" },
  { name: "Jee Lien", specialty: "Kpop Dance", image: "./images/Tutor-Pics/Jee Lien.webp" },
  { name: "Yvonne", specialty: "Kpop Dance", image: "./images/Tutor-Pics/Yvonne_.webp" },
  { name: "Kyala", specialty: "Kpop Dance", image: "./images/Tutor-Pics/Kyala.webp" },
  { name: "MK Lee", specialty: "Kpop Dance", image: "./images/Tutor-Pics/MK.webp" },
  { name: "Vanessa Wong", specialty: "Kpop Dance", image: "./images/Tutor-Pics/VanessaWong.webp" },
  { name: "Sunny", specialty: "Kpop Dance", image: "./images/Tutor-Pics/Sunny.webp" },
  { name: "Joey", specialty: "Kpop Dance", image: "./images/Tutor-Pics/Joey.webp" }
];

function initAOS() {
  if (window.AOS) {
    AOS.init({
      duration: 1000,
      once: false
    });
  }
}

function showNav() {
  if (!navbar) return;
  navbar.classList.remove("nav-hidden");
}


function hideNav() {
  if (!navbar) return;
  if (window.scrollY > 120 && !navMenu.classList.contains("nav-active")) {
    navbar.classList.add("nav-hidden");
  }
}

function resetNavTimer() {
  showNav();
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(hideNav, 2200);
}

function openMenu() {
  navMenu.classList.add("nav-active");
  menuBtn.classList.add("active");
  overlay.classList.add("active");
  menuBtn.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  navMenu.classList.remove("nav-active");
  menuBtn.classList.remove("active");
  overlay.classList.remove("active");
  menuBtn.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

function toggleMenu() {
  if (navMenu.classList.contains("nav-active")) {
    closeMenu();
  } else {
    openMenu();
  }
}

function showPackage(index) {
  currentPackageIndex = index;

  packageViews.forEach((view, i) => {
    if (!view) return;
    view.classList.toggle("active", i === currentPackageIndex);
  });
}

function changePackage(direction) {
  currentPackageIndex =
    (currentPackageIndex + direction + packageViews.length) % packageViews.length;
  showPackage(currentPackageIndex);
}

function setupAccordion() {
  const headers = document.querySelectorAll(".lux-header");

  headers.forEach((header) => {
    header.addEventListener("click", () => {
      const item = header.closest(".lux-item");
      const content = item.querySelector(".lux-content");
      const isActive = item.classList.contains("active");

      document.querySelectorAll(".lux-item").forEach((otherItem) => {
        otherItem.classList.remove("active");
        const otherContent = otherItem.querySelector(".lux-content");
        if (otherContent) otherContent.style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
}

const logos = [
  { name: "tic-tac-tots", image: "images/Collaboration-Pics/tic-tac-tots.png" },
  { name: "iop-preschool", image: "images/Collaboration-Pics/iop-preschool.png"},
  { name: "hankidz", image: "images/Collaboration-Pics/hankidz.png"},
  { name: "junior-champs", image: "images/Collaboration-Pics/junior-champs.png"},
  { name: "krecious-house", image: "images/Collaboration-Pics/krecious-house.png"},
  { name: "luminary-preschool", image: "images/Collaboration-Pics/luminary-preschool.png"},
  { name: "periwinkle-preschool", image: "images/Collaboration-Pics/periwinkle-preschool.png" }
];


function renderLogos(items) {
  return items.map(logo => `
    <div class="logo-card" aria-label="${logo.name}">
      <img src="${logo.image}" alt="${logo.name}">
    </div>
  `).join("");
}

const logoTrack = document.getElementById("logo-track");

if (logoTrack) {
  logoTrack.innerHTML = renderLogos(logos) + renderLogos(logos);
}


function setupCopyCards() {
  const cards = document.querySelectorAll(".copy-trigger");

  cards.forEach((card) => {
    card.addEventListener("click", async () => {
      const textToCopy = card.dataset.copy;
      const badge = card.querySelector(".copy-badge");
      if (!textToCopy || !badge) return;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          const textArea = document.createElement("textarea");
          textArea.value = textToCopy;
          textArea.style.position = "fixed";
          textArea.style.opacity = "0";
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand("copy");
          document.body.removeChild(textArea);
        }

        const originalText = badge.textContent;
        const originalBg = badge.style.background;
        const originalColor = badge.style.color;

        badge.textContent = "Copied!";
        badge.style.background = "#28a745";
        badge.style.color = "#fff";
        badge.style.borderColor = "#28a745";

        setTimeout(() => {
          badge.textContent = originalText;
          badge.style.background = originalBg;
          badge.style.color = originalColor;
          badge.style.borderColor = "";
        }, 1800);
      } catch (error) {
        console.error("Copy failed:", error);
      }
    });
  });
}

function renderTeam() {
  const grid = document.getElementById("instructor-grid");
  if (!grid) return;

  grid.innerHTML = instructors
    .map(
      (person) => `
        <div class="member" data-aos="fade-up">
          <div class="member-image-wrap">
            <img 
              src="${person.image}" 
              alt="${person.name}" 
              loading="lazy"
              decoding="async"
            >
          </div>
          <h3>${person.name}</h3>
          <p>${person.specialty}</p>
        </div>
      `
    )
    .join("");
}

function setupEvents() {
  if (menuBtn) {
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMenu();
    });
  }

  if (overlay) {
    overlay.addEventListener("click", closeMenu);
  }

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  if (prevPackageBtn) {
    prevPackageBtn.addEventListener("click", () => changePackage(-1));
  }

  if (nextPackageBtn) {
    nextPackageBtn.addEventListener("click", () => changePackage(1));
  }

  window.addEventListener("scroll", resetNavTimer, { passive: true });
  window.addEventListener("mousemove", (e) => {
    if (e.clientY <= 120) resetNavTimer();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 850) {
      closeMenu();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderTeam();
  setupAccordion();
  setupCopyCards();
  setupEvents();
  showPackage(0);
  initAOS();
  resetNavTimer();
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

function activateNavLink() {
  let currentSection = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");

    const href = link.getAttribute("href");

    if (href === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", activateNavLink);
window.addEventListener("load", activateNavLink);

  const dropdown = document.querySelector(".nav-dropdown");
  const dropdownBtn = document.querySelector(".dropdown-toggle");

  dropdownBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    dropdown.classList.toggle("open");
  });

  document.addEventListener("click", function () {
    dropdown.classList.remove("open");
  });