/* Origin Health — landing page interactions (no dependencies) */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector(".menu-toggle");
  var navWrap = document.getElementById("site-nav");
  if (toggle && navWrap) {
    var setMenu = function (open) {
      navWrap.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    navWrap.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        toggle.focus();
      }
    });
  }

  /* ---------- Header border on scroll ---------- */
  var header = document.querySelector(".site-header");
  var onScroll = function () {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Booking widget ---------- */
  var DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var MONTHS = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

  // Next five weekdays, starting tomorrow
  function nextWeekdays(count) {
    var out = [];
    var d = new Date();
    d.setHours(12, 0, 0, 0);
    while (out.length < count) {
      d.setDate(d.getDate() + 1);
      var day = d.getDay();
      if (day !== 0 && day !== 6) out.push(new Date(d));
    }
    return out;
  }

  var dayList = document.getElementById("day-list");
  var monthLabel = document.getElementById("month-label");
  if (dayList) {
    var days = nextWeekdays(5);
    days.forEach(function (d, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.dataset.value = DOW[d.getDay()] + " " + d.getDate() + " " + MONTHS[d.getMonth()].slice(0, 3);
      b.setAttribute("aria-pressed", i === 0 ? "true" : "false");
      b.setAttribute("aria-label", DOW[d.getDay()] + ", " + MONTHS[d.getMonth()] + " " + d.getDate());
      b.innerHTML = '<span class="dow">' + DOW[d.getDay()] + '</span><span class="date">' + d.getDate() + "</span>";
      dayList.appendChild(b);
    });
    if (monthLabel) {
      var first = days[0].getMonth(), last = days[days.length - 1].getMonth();
      monthLabel.textContent = first === last ? MONTHS[first] : MONTHS[first] + " – " + MONTHS[last];
    }
  }

  var form = document.getElementById("book");
  var summary = document.getElementById("booking-summary");
  var CHECK = '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';

  function selected(group) {
    var el = form.querySelector('[data-group="' + group + '"] [aria-pressed="true"]');
    return el ? el.dataset.value : "";
  }
  function describe() {
    return selected("type") + " · " + selected("day") + ", " + selected("time");
  }
  function showPending() {
    summary.classList.remove("is-confirmed");
    summary.textContent = describe() + " · Confirmation sent by email";
  }

  if (form && summary) {
    form.querySelectorAll("[data-group]").forEach(function (group) {
      group.addEventListener("click", function (e) {
        var btn = e.target.closest("button");
        if (!btn || !group.contains(btn)) return;
        group.querySelectorAll("button").forEach(function (b) {
          b.setAttribute("aria-pressed", b === btn ? "true" : "false");
        });
        showPending();
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      summary.classList.add("is-confirmed");
      summary.innerHTML = CHECK + "<span></span>";
      summary.querySelector("span").textContent = "Request received for " + describe();
    });

    showPending();
  }

  /* ---------- Reveal on scroll ---------- */
  if (!reduceMotion && "IntersectionObserver" in window) {
    var targets = document.querySelectorAll(
      ".section-head, .service-card, .statement, .steps li, .cta"
    );
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });
    targets.forEach(function (t) {
      t.classList.add("reveal");
      io.observe(t);
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
