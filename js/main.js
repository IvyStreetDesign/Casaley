/* ==========================================================================
   CASALEY OFFICER — interaction layer
   Scroll reveals, hero parallax, sticky navigation, menu drawer, form.
   ========================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----------------------------------------------------------------------
     Current year
     ---------------------------------------------------------------------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ----------------------------------------------------------------------
     Scroll reveal
     Elements carrying [data-reveal] animate in once, as they enter view.
     ---------------------------------------------------------------------- */
  var revealTargets = document.querySelectorAll("[data-reveal]");

  if (!("IntersectionObserver" in window) || reduceMotion) {
    revealTargets.forEach(function (el) { el.classList.add("is-revealed"); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });

    revealTargets.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ----------------------------------------------------------------------
     Hero parallax
     The photograph drifts slower than the page while the outline wordmark
     rises faster, so the two separate as the hero scrolls away.
     ---------------------------------------------------------------------- */
  var hero = document.getElementById("top");
  var heroImage = document.getElementById("heroImage");
  var heroWordmark = document.getElementById("heroWordmark");
  var ticking = false;

  function parallax() {
    ticking = false;
    if (!hero) return;

    var rect = hero.getBoundingClientRect();
    var height = rect.height || 1;
    // 0 at rest, 1 once the hero has fully scrolled past
    var progress = Math.min(Math.max(-rect.top / height, 0), 1);

    if (heroImage) heroImage.style.setProperty("--hero-shift", (progress * 90).toFixed(2) + "px");
    if (heroWordmark) heroWordmark.style.setProperty("--wm-shift", (progress * -110).toFixed(2) + "px");
  }

  function requestParallax() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(parallax);
  }

  if (!reduceMotion) {
    window.addEventListener("scroll", requestParallax, { passive: true });
    window.addEventListener("resize", requestParallax);
    parallax();
  }

  /* ----------------------------------------------------------------------
     Sticky bar
     Appears once the hero is behind us; hides again while scrolling down so
     the page stays uncluttered, and returns on any upward scroll.
     ---------------------------------------------------------------------- */
  var stickyBar = document.getElementById("stickyBar");
  var lastY = window.pageYOffset;
  var stickyTicking = false;

  function updateSticky() {
    stickyTicking = false;
    if (!stickyBar || !hero) return;

    var y = window.pageYOffset;
    var past = y > hero.offsetHeight * 0.85;
    var delta = y - lastY;

    if (!past) {
      stickyBar.classList.remove("is-visible");
    } else if (delta > 4) {
      // Deliberately heading down the page — get out of the way
      stickyBar.classList.remove("is-visible");
    } else {
      // Scrolling up, or resting
      stickyBar.classList.add("is-visible");
    }

    lastY = y;
  }

  function requestSticky() {
    if (stickyTicking) return;
    stickyTicking = true;
    window.requestAnimationFrame(updateSticky);
  }

  window.addEventListener("scroll", requestSticky, { passive: true });
  window.addEventListener("resize", requestSticky);
  updateSticky();

  /* ----------------------------------------------------------------------
     Menu drawer
     ---------------------------------------------------------------------- */
  var drawer = document.getElementById("drawer");
  var menuToggle = document.getElementById("menuToggle");
  var drawerLinks = drawer ? drawer.querySelectorAll(".drawer__link") : [];

  // Stagger the links as the drawer opens
  drawerLinks.forEach(function (link, i) {
    link.style.transitionDelay = 0.16 + i * 0.07 + "s, " + (0.16 + i * 0.07) + "s, 0s";
  });

  function openDrawer() {
    if (!drawer) return;
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-locked");
    if (menuToggle) menuToggle.setAttribute("aria-expanded", "true");
    var first = drawer.querySelector(".drawer__link");
    if (first) first.focus({ preventScroll: true });
  }

  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-locked");
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.focus({ preventScroll: true });
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      if (drawer && drawer.classList.contains("is-open")) closeDrawer();
      else openDrawer();
    });
  }

  document.querySelectorAll("[data-close-menu]").forEach(function (el) {
    el.addEventListener("click", closeDrawer);
  });

  // Any in-page link inside the drawer closes it before scrolling
  drawer && drawer.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function () {
      drawer.classList.remove("is-open");
      drawer.setAttribute("aria-hidden", "true");
      document.body.classList.remove("is-locked");
      if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && drawer && drawer.classList.contains("is-open")) closeDrawer();
  });

  /* ----------------------------------------------------------------------
     Enquiry form
     No endpoint is wired up yet — set data-endpoint on the form (or replace
     this handler) to post to your CRM.
     ---------------------------------------------------------------------- */
  var form = document.getElementById("enquiryForm");
  var status = document.getElementById("formStatus");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!status) return;

      var required = form.querySelectorAll("[required]");
      var missing = Array.prototype.filter.call(required, function (f) {
        return !f.value.trim() || (f.type === "email" && f.value.indexOf("@") === -1);
      });

      if (missing.length) {
        status.textContent = "Please complete the highlighted fields.";
        status.style.color = "var(--spicy-orange)";
        missing[0].focus();
        return;
      }

      var endpoint = form.getAttribute("data-endpoint");

      if (!endpoint) {
        status.textContent = "Thanks — this form is not connected to a CRM yet.";
        status.style.color = "var(--red-velvet)";
        return;
      }

      status.textContent = "Sending…";
      status.style.color = "var(--red-velvet)";

      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
      })
        .then(function (res) {
          if (!res.ok) throw new Error(res.status);
          form.reset();
          status.textContent = "Thank you — the team will be in touch shortly.";
        })
        .catch(function () {
          status.textContent = "Something went wrong. Please email hello@casaley.com.au.";
          status.style.color = "var(--spicy-orange)";
        });
    });
  }
})();
