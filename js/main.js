/**
 * ==========================================
 * MUHAMMAD ANDREW BIMA - PORTFOLIO
 * Interactive JavaScript
 * ==========================================
 */

(function () {
  "use strict";

  // ========== Initialize Variables ==========
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  let ticking = false;

  // ========== DOM Elements ==========
  const html = document.documentElement;
  const header = document.querySelector(".site-header");
  const themeToggle = document.querySelector(".theme-toggle");
  const shapes = document.querySelectorAll(".parallax-shape");
  const revealElements = document.querySelectorAll(".reveal");
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileNav = document.querySelector(".mobile-nav");
  const mobileNavLinks = mobileNav.querySelectorAll(".nav-link");
  const skillLevels = document.querySelectorAll(".skill-level-fill");

  // ========== Theme Management ==========
  function initTheme() {
    const savedTheme = localStorage.getItem("theme");
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (savedTheme) {
      html.setAttribute("data-theme", savedTheme);
    } else if (systemDark) {
      html.setAttribute("data-theme", "dark");
    }
  }

  function toggleTheme() {
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  }

  // ========== Header Scroll Effect ==========
  function updateHeader() {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  // ========== Parallax Effect ==========
  function updateParallax() {
    if (prefersReducedMotion) return;

    const scrollY = window.scrollY;
    shapes.forEach(function (shape, index) {
      const speed = (index + 1) * 0.1;
      const yOffset = scrollY * speed;
      shape.style.transform = "translate3d(0, " + yOffset + "px, 0)";
    });
  }

  // ========== Scroll Handler (Throttled) ==========
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateHeader();
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  }

  // ========== Scroll Reveal Animation ==========
  function initRevealObserver() {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  // ========== Mobile Navigation ==========
  function toggleMobileNav() {
    const isOpen = mobileNav.classList.toggle("active");
    mobileMenuBtn.setAttribute("aria-expanded", isOpen);

    // Animate hamburger to X
    const spans = mobileMenuBtn.querySelectorAll("span");
    if (isOpen) {
      spans[0].style.transform = "rotate(45deg) translate(6px, 6px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(6px, -6px)";
    } else {
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    }
  }

  function closeMobileNav() {
    mobileNav.classList.remove("active");
    mobileMenuBtn.setAttribute("aria-expanded", "false");
    const spans = mobileMenuBtn.querySelectorAll("span");
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  }

  // ========== Smooth Scroll ==========
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
          });
        }
      });
    });
  }

  // ========== Skill Level Animation ==========
  function initSkillObserver() {
    const skillObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const fill = entry.target;
            const width = fill.style.width;
            fill.style.width = "0%";

            setTimeout(function () {
              fill.style.width = width;
            }, 100);

            skillObserver.unobserve(fill);
          }
        });
      },
      { threshold: 0.5 },
    );

    skillLevels.forEach(function (skill) {
      skillObserver.observe(skill);
    });
  }

  // ========== Keyboard Navigation ==========
  function onKeydown(e) {
    if (e.key === "Escape" && mobileNav.classList.contains("active")) {
      closeMobileNav();
      mobileMenuBtn.focus();
    }
  }

  // ========== Event Listeners ==========
  function initEventListeners() {
    // Theme toggle
    themeToggle.addEventListener("click", toggleTheme);

    // Scroll events
    window.addEventListener("scroll", onScroll);

    // Mobile navigation
    mobileMenuBtn.addEventListener("click", toggleMobileNav);
    mobileNavLinks.forEach(function (link) {
      link.addEventListener("click", closeMobileNav);
    });

    // Keyboard navigation
    document.addEventListener("keydown", onKeydown);
  }

  // ========== Initialize App ==========
  function init() {
    initTheme();
    initEventListeners();
    initRevealObserver();
    initSmoothScroll();
    initSkillObserver();
    updateHeader(); // Initial check
  }

  // Run when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
