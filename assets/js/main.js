document.addEventListener("DOMContentLoaded", () => {
  /* ===== REDUCED MOTION ===== */
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ===== LOADER ===== */
  const loader = document.getElementById("loader");
  if (loader) {
    setTimeout(() => loader.classList.add("loaded"), 2000);
    setTimeout(() => loader.remove(), 2800);
  }

  /* ===== SCALLOP SCROLL ANIMATION ===== */
  const scallop = document.querySelector(".contact-scallop");
  if (scallop) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          scallop.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(scallop);
  }

  /* ===== DARK MODE ===== */
  const toggle = document.getElementById("dark-mode-toggle");
  const darkIcon = document.getElementById("dark-icon");
  const lightIcon = document.getElementById("light-icon");

  if (toggle) {
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      darkIcon.style.display = document.body.classList.contains("dark-mode") ? "none" : "block";
      lightIcon.style.display = document.body.classList.contains("dark-mode") ? "block" : "none";
    });
  }

  /* ===== GSAP ANIMATIONS ===== */
  if (!prefersReducedMotion && window.gsap) {
    gsap.registerPlugin(ScrollTrigger);

    // Animate the main project title
    gsap.from(".project-title h1", {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    // Animate each project row
    gsap.utils.toArray(".projects-grid").forEach((row) => {
      gsap.from(row, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: row,
          start: "top 80%",
          toggleActions: "play none none none",
        }
      });
    });

    // Animate project items individually for more flair
    gsap.utils.toArray(".project-item").forEach((item) => {
      gsap.from(item, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          start: "top 90%",
          toggleActions: "play none none none",
        }
      });
    });
  } else {
    // If reduced motion, show everything instantly
    document.querySelectorAll("[data-animate]").forEach(el => {
      el.style.opacity = 1;
      el.style.transform = "none";
    });
  }

  /* ===== CONTACT SCALLOP ===== */
  gsap.from(".contact-scallop", {
    scaleY: 0,
    transformOrigin: "top",
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".contact-section",
      start: "top 80%",
    }
  });

});

document.addEventListener("DOMContentLoaded", () => {
  const menuLinks = document.querySelectorAll(".menu a");
  const sections = document.querySelectorAll("section");
  let isClicking = false; // flag to prevent scroll from overriding click

  // ===== Click to set active =====
  menuLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Scroll smoothly to section
      const targetId = link.getAttribute("href").slice(1);
      const targetSection = document.getElementById(targetId);
      targetSection.scrollIntoView({ behavior: "smooth" });

      // Set active class on click
      menuLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      // Temporarily prevent scroll spy from overriding
      isClicking = true;
      setTimeout(() => isClicking = false, 1000); // 1 second
    });
  });

  // ===== Scroll spy =====
  window.addEventListener("scroll", () => {
    if (isClicking) return; // skip if user just clicked

    let scrollPos = window.scrollY + window.innerHeight / 2;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      const link = document.querySelector(`.menu a[href="#${section.id}"]`);

      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        menuLinks.forEach(l => l.classList.remove("active"));
        if (link) link.classList.add("active");
      }
    });
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const backToTop = document.getElementById("back-to-top");

  // Show/hide button on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) { // show after scrolling 300px
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  // Scroll smoothly to top
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});

