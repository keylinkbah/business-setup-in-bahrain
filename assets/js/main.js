(function () {
  var WA = "97332392277";
  // Sticky header shadow
  var header = document.querySelector("header");
  function onScroll() { header && header.classList.toggle("shadow-card", window.scrollY > 24); }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  // Mobile menu
  var toggle = document.querySelector('[aria-label="Toggle menu"]');
  var mnav = document.getElementById("mobile-nav");
  if (toggle && mnav) {
    toggle.addEventListener("click", function () {
      var open = mnav.hidden; mnav.hidden = !open; toggle.setAttribute("aria-expanded", String(open));
    });
    mnav.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { mnav.hidden = true; toggle.setAttribute("aria-expanded", "false"); }); });
  }

  // Calendly booking modal
  var modal = document.getElementById("booking-modal");
  var frame = modal.querySelector("iframe");
  function openModal() { if (!frame.src) frame.src = frame.dataset.src; modal.hidden = false; document.body.style.overflow = "hidden"; }
  function closeModal() { modal.hidden = true; document.body.style.overflow = ""; }
  document.querySelectorAll("[data-booking]").forEach(function (b) { b.addEventListener("click", function (e) { e.preventDefault(); if (mnav) mnav.hidden = true; openModal(); }); });
  modal.querySelectorAll("[data-close]").forEach(function (b) { b.addEventListener("click", closeModal); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !modal.hidden) closeModal(); });

  // Lead forms -> WhatsApp (nothing is stored)
  var rules = {
    name: function (v) { return v.length < 2 ? "Please enter your full name" : v.length > 100 ? "Name is too long" : ""; },
    email: function (v) { return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "Please enter a valid email" : ""; },
    phone: function (v) { return !/^\+?[0-9\s\-()]{6,25}$/.test(v) ? "Please enter a valid phone number with country code" : ""; },
    business_activity: function (v) { return v.length < 2 ? "Tell us your planned business activity" : v.length > 200 ? "Please keep it under 200 characters" : ""; }
  };
  document.querySelectorAll("form").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var vals = {}, ok = true;
      Object.keys(rules).forEach(function (k) {
        var input = form.querySelector('[id$="-' + k + '"]'); if (!input) return;
        var v = input.value.trim(), msg = rules[k](v); vals[k] = v;
        var err = input.parentNode.querySelector(".field-error");
        if (msg) {
          ok = false;
          if (!err) { err = document.createElement("p"); err.className = "field-error"; err.id = input.id + "-err"; input.parentNode.appendChild(err); }
          err.textContent = msg; input.setAttribute("aria-invalid", "true"); input.setAttribute("aria-describedby", err.id);
        } else if (err) { err.remove(); input.setAttribute("aria-invalid", "false"); input.removeAttribute("aria-describedby"); }
      });
      if (!ok) return;
      var text = ["Hello, I'd like a free consultation about business setup in Bahrain.", "",
        "Full name: " + vals.name, "Email: " + vals.email, "Phone / WhatsApp: " + vals.phone, "Business activity: " + vals.business_activity].join("\n");
      window.location.assign("https://wa.me/" + WA + "?text=" + encodeURIComponent(text));
    });
  });
})();
