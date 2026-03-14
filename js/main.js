/**
 * Portfolio Website - Main JavaScript
 * Author: Muhammad Andrew Bima
 * NPM: 202410715052
 */

(function () {
  "use strict";

  // ========================================
  // DOM Elements
  // ========================================
  const header = document.getElementById("header");
  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-list");
  const navLinks = document.querySelectorAll(".nav-link");
  const parallaxBgs = document.querySelectorAll(".parallax-bg");
  const revealElements = document.querySelectorAll(
    ".reveal-up, .reveal-left, .reveal-right",
  );
  const hobbyItems = document.querySelectorAll(".hobby-item");
  const hobbyProgressBars = document.querySelectorAll(".hobby-progress");

  // ========================================
  // State
  // ========================================
  let lastScrollY = 0;
  let ticking = false;
  let isNavOpen = false;

  // ========================================
  // Calculate Age
  // ========================================
  function calculateAge() {
    const birthDate = new Date(2004, 2, 27); // March 27, 2004
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    const ageElement = document.getElementById("age");
    if (ageElement) {
      ageElement.textContent = `${age} Tahun`;
    }
  }

  // ========================================
  // Header Hide/Show on Scroll
  // ========================================
  function handleHeaderScroll() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      header.classList.add("hidden");
    } else {
      header.classList.remove("hidden");
    }

    lastScrollY = currentScrollY;
  }

  // ========================================
  // Parallax Effect
  // ========================================
  function handleParallax() {
    const scrolled = window.scrollY;

    parallaxBgs.forEach(function (bg) {
      const speed = parseFloat(bg.dataset.speed) || 0.3;
      const yPos = -(scrolled * speed);
      bg.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
  }

  // ========================================
  // Scroll Handler (Throttled)
  // ========================================
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        handleHeaderScroll();
        handleParallax();
        ticking = false;
      });
      ticking = true;
    }
  }

  // ========================================
  // Navigation Toggle
  // ========================================
  function toggleNav() {
    isNavOpen = !isNavOpen;
    navToggle.setAttribute("aria-expanded", isNavOpen);
    navList.classList.toggle("open", isNavOpen);

    // Prevent body scroll when nav is open
    document.body.style.overflow = isNavOpen ? "hidden" : "";
  }

  function closeNav() {
    if (isNavOpen) {
      isNavOpen = false;
      navToggle.setAttribute("aria-expanded", "false");
      navList.classList.remove("open");
      document.body.style.overflow = "";
    }
  }

  // ========================================
  // Active Navigation Link
  // ========================================
  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollY = window.scrollY + 150;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(function (link) {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  // ========================================
  // Intersection Observer for Reveals
  // ========================================
  function setupRevealObserver() {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  // ========================================
  // Hobby Progress Bars Animation
  // ========================================
  function setupHobbyObserver() {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3,
    };

    const hobbyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, index) {
        if (entry.isIntersecting) {
          // Stagger the animation
          setTimeout(function () {
            entry.target.classList.add("visible");

            // Animate progress bar
            const progressBar = entry.target.querySelector(".hobby-progress");
            if (progressBar) {
              const progress = entry.target.dataset.level || 0;
              progressBar.style.width = progress + "%";
            }
          }, index * 100);

          hobbyObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    hobbyItems.forEach(function (item) {
      hobbyObserver.observe(item);
    });
  }

  // ========================================
  // Smooth Scroll for Nav Links
  // ========================================
  function setupSmoothScroll() {
    navLinks.forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          closeNav();

          // Smooth scroll with offset for header
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.scrollY - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      });
    });
  }

  // ========================================
  // Keyboard Navigation
  // ========================================
  function setupKeyboardNav() {
    document.addEventListener("keydown", function (e) {
      // Close nav on Escape
      if (e.key === "Escape" && isNavOpen) {
        closeNav();
        navToggle.focus();
      }
    });
  }

  // ========================================
  // Resize Handler
  // ========================================
  function onResize() {
    // Close mobile nav on resize to desktop
    if (window.innerWidth > 768 && isNavOpen) {
      closeNav();
    }
  }

  // ========================================
  // THEME TOGGLE
  // ========================================
  const themeToggle = document.querySelector(".theme-toggle");
  const THEME_KEY = "portfolio-theme";

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }

  function getSavedTheme() {
    return localStorage.getItem(THEME_KEY);
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  function toggleTheme() {
    const currentTheme =
      document.documentElement.getAttribute("data-theme") || "dark";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  }

  function initTheme() {
    const savedTheme = getSavedTheme();
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme(getSystemTheme());
    }
  }

  // Listen for system theme changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", function (e) {
      if (!getSavedTheme()) {
        setTheme(e.matches ? "dark" : "light");
      }
    });

  // ========================================
  // Initialize
  // ========================================
  function init() {
    initTheme();
    calculateAge();
    setupRevealObserver();
    setupHobbyObserver();
    setupSmoothScroll();
    setupKeyboardNav();

    // Event Listeners
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scroll", updateActiveNavLink, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    if (navToggle) {
      navToggle.addEventListener("click", toggleNav);
    }

    if (themeToggle) {
      themeToggle.addEventListener("click", toggleTheme);
    }

    // Close nav when clicking outside
    document.addEventListener("click", function (e) {
      if (isNavOpen && !e.target.closest(".main-nav")) {
        closeNav();
      }
    });

    // Initial active state
    updateActiveNavLink();
  }

  // Run when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
