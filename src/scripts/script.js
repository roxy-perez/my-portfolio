document.addEventListener("DOMContentLoaded", () => {
  let currentLanguage = "en"; //

  function toggleLanguage() {
    currentLanguage = currentLanguage === "en" ? "es" : "en";

    const langToggle = document.querySelector(".lang-toggle");
    langToggle.innerHTML = currentLanguage === "en" ? "<b>ES</b>" : "<b>EN</b>";

    const elements = document.querySelectorAll("[data-en][data-es]");
    elements.forEach((element) => {
      element.classList.add("lang-transition");
      setTimeout(() => {
        element.textContent = element.getAttribute(`data-${currentLanguage}`);
        element.classList.remove("lang-transition");
        element.classList.add("visible");
      }, 150);
    });

    document.documentElement.lang = currentLanguage;
  }

  const langToggleBtn = document.querySelector(".lang-toggle");
  langToggleBtn.addEventListener("click", toggleLanguage);
});

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }

  function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector(".theme-toggle");

    body.classList.toggle("dark");
    themeToggle.innerHTML = body.classList.contains("dark")
      ? "<i class='bx bx-sun-bright'></i>"
      : "<i class='bx bx-moon'></i>";

    // Guardar la preferencia
    localStorage.setItem(
      "theme",
      body.classList.contains("dark") ? "dark" : "light"
    );
  }

  const themeToggleBtn = document.querySelector(".theme-toggle");
  themeToggleBtn.addEventListener("click", toggleTheme);
});

function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    document.querySelector(".theme-toggle").textContent = "☀︎";
  }
}

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

function setupForm() {
  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const name =
      formData.get("name") ||
      e.target.querySelector('input[type="text"]').value;
    const email =
      formData.get("email") ||
      e.target.querySelector('input[type="email"]').value;
    const message =
      formData.get("message") || e.target.querySelector("textarea").value;

    const successMessage =
      currentLanguage === "en"
        ? "Thank you for your message! I'll get back to you soon."
        : "¡Gracias por tu mensaje! Te responderé pronto.";

    alert(successMessage);

    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadTheme();
  setupSmoothScrolling();
  setupForm();
  animateSkills();

  handleScroll();

  window.addEventListener("scroll", handleScroll);

  window.addEventListener("resize", () => {
    handleScroll();
  });

  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("open");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      // Cerrar menú hamburger para pantallas medianas y pequeñas
      if (window.innerWidth <= 1100) {
        hamburger.classList.remove("active");
        navLinks.classList.remove("open");
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1100) {
      hamburger.classList.remove("active");
      navLinks.classList.remove("open");
    }
  });
});

window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(var(--card), 0.95)";
  } else {
    header.style.background = "var(--card)";
  }
});
