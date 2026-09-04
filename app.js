/* Filter — shared page behaviour. Vanilla, no dependencies. */
(function () {
  "use strict";

  /* ---- mobile nav -------------------------------------------------- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- sticky nav shadow ------------------------------------------- */
  var nav = document.querySelector(".nav");

  if (nav) {
    var onScroll = function () {
      nav.classList.toggle("scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- reveal on scroll -------------------------------------------- */
  var revealables = document.querySelectorAll(".reveal");

  if (revealables.length) {
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });

      revealables.forEach(function (el) { io.observe(el); });
    } else {
      revealables.forEach(function (el) { el.classList.add("in"); });
    }
  }

  /* ---- screenshot carousel ----------------------------------------- */
  var rail = document.getElementById("rail");

  if (rail) {
    var step = function () {
      var card = rail.querySelector(".shot");
      if (!card) return rail.clientWidth * 0.8;
      var gap = parseFloat(getComputedStyle(rail).columnGap || getComputedStyle(rail).gap) || 0;
      return card.getBoundingClientRect().width + gap;
    };

    document.querySelectorAll("[data-scroll]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        rail.scrollBy({ left: step() * Number(btn.dataset.scroll), behavior: "smooth" });
      });
    });
  }

  /* ---- changelog search -------------------------------------------- */
  var search = document.getElementById("changelog-search");

  if (search) {
    var releases = Array.prototype.slice.call(document.querySelectorAll(".release"));
    var empty = document.querySelector(".no-results");

    search.addEventListener("input", function () {
      var q = search.value.trim().toLowerCase();
      var hits = 0;

      releases.forEach(function (release) {
        var match = !q || release.textContent.toLowerCase().indexOf(q) !== -1;
        release.hidden = !match;
        if (match) hits++;
      });

      if (empty) empty.classList.toggle("show", hits === 0);
    });
  }

  /* ---- current year ------------------------------------------------ */
  var year = String(new Date().getFullYear());
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = year; });
})();
