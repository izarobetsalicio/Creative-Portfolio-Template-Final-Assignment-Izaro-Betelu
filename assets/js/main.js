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
