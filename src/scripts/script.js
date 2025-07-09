// Language system
let currentLanguage = "en";

const translations = {
  en: {
    navAbout: "About",
    navSkills: "Skills",
    navExperience: "Experience",
    navProjects: "Projects",
    navContact: "Contact",
  },
  es: {
    navAbout: "Acerca de",
    navSkills: "Habilidades",
    navExperience: "Experiencia",
    navProjects: "Proyectos",
    navContact: "Contacto",
  },
};

function toggleLanguage() {
  currentLanguage = currentLanguage === "en" ? "es" : "en";

  // Update language toggle button
  const langToggle = document.querySelector(".lang-toggle");
  langToggle.innerHTML = currentLanguage === "en" ? "<b>ES</b>" : "<b>EN</b>";

  // Update all elements with data-en and data-es attributes
  const elements = document.querySelectorAll("[data-en][data-es]");
  elements.forEach((element) => {
    element.classList.add("lang-transition");
    setTimeout(() => {
      element.textContent = element.getAttribute(`data-${currentLanguage}`);
      element.classList.remove("lang-transition");
      element.classList.add("visible");
    }, 150);
  });

  // Update document language
  document.documentElement.lang = currentLanguage;
}

// Theme toggle
function toggleTheme() {
  const body = document.body;
  const themeToggle = document.querySelector(".theme-toggle");

  body.classList.toggle("dark");
  themeToggle.innerHTML = body.classList.contains("dark")
    ? "<i class='bx bx-sun-bright'></i>"
    : "<i class='bx  bx-moon' ></i>";

  // Save theme preference
  localStorage.setItem(
    "theme",
    body.classList.contains("dark") ? "dark" : "light"
  );
}

// Load saved theme
function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    document.querySelector(".theme-toggle").textContent = "☀︎";
  }
}

// Scroll animations
function handleScroll() {
  const sections = document.querySelectorAll(".section");
  const scrollPosition = window.scrollY + window.innerHeight;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollPosition > sectionTop + sectionHeight / 3) {
      section.classList.add("visible");
    }
  });
}

// Animate skill bars
function animateSkills() {
  const skillBars = document.querySelectorAll(".skill-progress");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute("data-width");
        entry.target.style.width = width + "%";
      }
    });
  });

  skillBars.forEach((bar) => observer.observe(bar));
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Form submission
function setupForm() {
  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const name =
      formData.get("name") ||
      e.target.querySelector('input[type="text"]').value;
    const email =
      formData.get("email") ||
      e.target.querySelector('input[type="email"]').value;
    const message =
      formData.get("message") || e.target.querySelector("textarea").value;

    // Show success message
    const successMessage =
      currentLanguage === "en"
        ? "Thank you for your message! I'll get back to you soon."
        : "¡Gracias por tu mensaje! Te responderé pronto.";

    alert(successMessage);

    // Reset form
    form.reset();
  });
}

// Initialize everything
document.addEventListener("DOMContentLoaded", () => {
  loadTheme();
  setupSmoothScrolling();
  setupForm();
  animateSkills();

  // Initial scroll check
  handleScroll();

  // Add scroll event listener
  window.addEventListener("scroll", handleScroll);

  // Add resize event listener for mobile responsiveness
  window.addEventListener("resize", () => {
    handleScroll();
  });

  // Hamburger menu logic
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("open");
  });

  // Opcional: cerrar menú al hacer click en un link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 900) {
        hamburger.classList.remove("active");
        navLinks.classList.remove("open");
      }
    });
  });
});

// Header background on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(var(--card), 0.95)";
  } else {
    header.style.background = "var(--card)";
  }
});
