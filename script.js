/* ==========================================
   PARTIO WEBSITE JAVASCRIPT
========================================== */


/* ==========================================
   OPENING ANIMATION
========================================== */

const loader = document.getElementById("loader");

const prefersReducedMotion =
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;


window.addEventListener("load", () => {

  if (!loader) return;

  if (prefersReducedMotion) {

    loader.classList.add("hide");

    return;

  }

  setTimeout(() => {

    loader.classList.add("hide");

  }, 1800);

});


/* ==========================================
   SCROLL REVEAL ANIMATION
========================================== */

const revealElements =
  document.querySelectorAll(".reveal");


if (prefersReducedMotion) {

  revealElements.forEach((element) => {

    element.classList.add("visible");

  });

} else {

  const revealObserver = new IntersectionObserver(

    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          revealObserver.unobserve(entry.target);

        }

      });

    },

    {
      threshold: 0.12
    }

  );


  revealElements.forEach((element, index) => {

    element.style.transitionDelay =
      `${Math.min(index % 6, 5) * 70}ms`;

    revealObserver.observe(element);

  });

}


/* ==========================================
   SMOOTH INTERNAL LINKS
========================================== */

document
  .querySelectorAll('a[href^="#"]')
  .forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetID =
        link.getAttribute("href");

      const target =
        document.querySelector(targetID);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({

        behavior: prefersReducedMotion
          ? "auto"
          : "smooth",

        block: "start"

      });

    });

  });


/* ==========================================
   PACKAGE CARD TILT
========================================== */

const packageCards =
  document.querySelectorAll(".package");


packageCards.forEach((card) => {

  card.addEventListener("mousemove", (event) => {

    if (window.innerWidth < 900) return;

    const rect =
      card.getBoundingClientRect();

    const x =
      event.clientX - rect.left;

    const y =
      event.clientY - rect.top;

    const centerX =
      rect.width / 2;

    const centerY =
      rect.height / 2;

    const rotateX =
      ((y - centerY) / centerY) * -2;

    const rotateY =
      ((x - centerX) / centerX) * 2;

    card.style.transform =
      `perspective(900px)
       rotateX(${rotateX}deg)
       rotateY(${rotateY}deg)
       translateY(-6px)`;

  });


  card.addEventListener("mouseleave", () => {

    card.style.transform = "";

  });

});


/* ==========================================
   HERO IMAGE PARALLAX
========================================== */

const heroImage =
  document.querySelector(".hero-image");


const supportsHover =
  window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches;


if (
  heroImage &&
  supportsHover &&
  window.innerWidth >= 900
) {

  window.addEventListener(
    "mousemove",
    (event) => {

      const x =
        (event.clientX / window.innerWidth - 0.5) * 8;

      const y =
        (event.clientY / window.innerHeight - 0.5) * 8;

      heroImage.style.transform =
        `rotate(-4deg)
         translate3d(${x}px, ${y}px, 0)`;

    },
    {
      passive: true
    }
  );

}


/* ==========================================
   NAVBAR SCROLL EFFECT
========================================== */

const navbar =
  document.querySelector(".navbar");


let navbarTicking = false;


function updateNavbar() {

  if (!navbar) return;


  if (window.scrollY > 50) {

    navbar.style.background =
      "rgba(8,9,10,.92)";

  } else {

    navbar.style.background =
      "rgba(16,17,18,.78)";

  }


  navbarTicking = false;

}


window.addEventListener(
  "scroll",
  () => {

    if (navbarTicking) return;

    navbarTicking = true;

    requestAnimationFrame(updateNavbar);

  },
  {
    passive: true
  }
);


/* ==========================================
   WHATSAPP ENQUIRY
========================================== */

const whatsappNumber =
  "919932010126";


function openWhatsApp(message) {

  const url =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");

}


/* ==========================================
   PARTIO EVENT ENQUIRY FORM
   Three-step form -> WhatsApp
========================================== */

(() => {
  const formSection = document.getElementById("partio-enquiry");
  if (!formSection) return;

  const WA_NUMBER = "919932010126";
  const get = (id) => document.getElementById(id);

  const form = get("pf-form");
  const progress = get("pf-progress");
  const backButton = get("pf-back");
  const nextButton = get("pf-next");
  const error = get("pf-error");
  const done = get("pf-done");
  const whatsappLink = get("pf-whatsapp");
  const summary = get("pf-summary");
  const copyButton = get("pf-copy");
  const copyNote = get("pf-copy-note");
  const bar = get("pf-bar");

  let currentStep = 1;

  function selectedValue(name) {
    const selected = form.querySelector(`input[name="${name}"]:checked`);
    return selected ? selected.value : "";
  }

  function formatDate(value) {
    if (!value) return "";
    const date = new Date(value + "T00:00:00");
    return Number.isNaN(date.getTime())
      ? value
      : date.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric"
        });
  }

  function scrollToForm() {
    const card = formSection.querySelector(".pf-card");
    if (card) {
      card.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start"
      });
    }
  }

  function showStep(step) {
    currentStep = step;

    formSection.querySelectorAll("[data-pf-step]").forEach((section) => {
      section.hidden = Number(section.getAttribute("data-pf-step")) !== step;
    });

    Array.from(progress.children).forEach((item, index) => {
      item.className = index < step ? "on" : "";
    });

    backButton.hidden = step === 1;
    nextButton.textContent = step === 3 ? "Get my details ready" : "Next";
    error.textContent = "";
    scrollToForm();
  }

  function validateStep() {
    const missing = [];

    if (currentStep === 1) {
      if (!get("pf-name").value.trim()) missing.push("your name");
      if (!selectedValue("pf-type")) missing.push("the event type");
    }

    if (currentStep === 2 && !get("pf-date").value) {
      missing.push("the event date");
    }

    if (missing.length) {
      error.textContent = "Please add " + missing.join(" and ") + ".";
      return false;
    }

    return true;
  }

  function buildMessage() {
    const services = Array.from(
      form.querySelectorAll('input[name="pf-service"]:checked')
    ).map((input) => input.value).join(", ");

    const rows = [
      ["Name", get("pf-name").value.trim()],
      ["WhatsApp", get("pf-phone").value.trim()],
      ["My birthday", formatDate(get("pf-bday").value)],
      ["My anniversary", formatDate(get("pf-anniv").value)],
      ["Event", selectedValue("pf-type")],
      ["Date", formatDate(get("pf-date").value)],
      ["Guests", get("pf-guests").value],
      ["Venue", get("pf-venue").value.trim()],
      ["Theme", get("pf-theme").value.trim()],
      ["Needs", services],
      ["Budget", selectedValue("pf-budget")],
      ["Notes", get("pf-notes").value.trim()],
      ["Found us via", selectedValue("pf-source")]
    ];

    return "Hi Partio! I’d like a quote for my event.\n\n" +
      rows
        .filter((row) => row[1] !== undefined && String(row[1]).trim() !== "")
        .map((row) => row[0] + ": " + row[1])
        .join("\n");
  }

  backButton.addEventListener("click", () => {
    showStep(currentStep - 1);
  });

  nextButton.addEventListener("click", () => {
    if (!validateStep()) return;

    if (currentStep < 3) {
      showStep(currentStep + 1);
      return;
    }

    const message = buildMessage();
    summary.value = message;

    form.hidden = true;
    progress.hidden = true;
    bar.hidden = true;
    done.hidden = false;

    whatsappLink.href =
      "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(message);
    whatsappLink.hidden = false;

    scrollToForm();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  copyButton.addEventListener("click", async () => {
    const text = summary.value;

    try {
      await navigator.clipboard.writeText(text);
      copyNote.textContent = "Copied. Paste it into WhatsApp or Instagram.";
    } catch (copyError) {
      summary.focus();
      summary.select();

      let copied = false;
      try {
        copied = document.execCommand("copy");
      } catch (error) {
        copied = false;
      }

      copyNote.textContent = copied
        ? "Copied. Paste it into WhatsApp or Instagram."
        : "Select the text above and copy it, then send it to Partio.";
    }
  });
})();


/* ==========================================
   ENQUIRY MODAL: accessible auto-open, close, reopen
========================================== */
(() => {
  const modal = document.getElementById("partio-enquiry");
  if (!modal) return;

  const closeButton = modal.querySelector("[data-close-enquiry]");
  const focusableSelector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(",");

  let lastFocused = null;
  let isOpen = false;

  // A closed dialog must not contain keyboard focus or appear in the
  // accessibility tree. The inert attribute also blocks tab navigation.
  modal.setAttribute("inert", "");
  modal.setAttribute("aria-hidden", "true");

  function getFocusableElements() {
    return Array.from(modal.querySelectorAll(focusableSelector)).filter((element) => {
      return !element.hidden &&
        !element.closest("[hidden]") &&
        element.getAttribute("aria-hidden") !== "true" &&
        element.getClientRects().length > 0;
    });
  }

  function openEnquiry(event) {
    if (event) event.preventDefault();
    if (isOpen) return;

    const trigger = event && event.currentTarget instanceof HTMLElement
      ? event.currentTarget
      : null;

    lastFocused = trigger || (
      document.activeElement instanceof HTMLElement &&
      !modal.contains(document.activeElement) &&
      document.activeElement !== document.body
        ? document.activeElement
        : null
    );

    // Unhide the dialog before moving focus into it.
    modal.removeAttribute("inert");
    modal.setAttribute("aria-hidden", "false");
    modal.classList.add("is-open");
    document.body.classList.add("pf-modal-open");
    isOpen = true;

    const firstField = modal.querySelector("#pf-name") || closeButton;
    window.requestAnimationFrame(() => {
      if (firstField && isOpen) firstField.focus();
    });
  }

  function closeEnquiry() {
    if (!isOpen) return;

    // Restore focus OUTSIDE the modal before setting aria-hidden/inert.
    let focusTarget = lastFocused;
    if (!focusTarget || !focusTarget.isConnected || modal.contains(focusTarget)) {
      focusTarget = document.querySelector("main") || document.body;
    }

    if (focusTarget === document.body || focusTarget === document.querySelector("main")) {
      if (!focusTarget.hasAttribute("tabindex")) {
        focusTarget.setAttribute("tabindex", "-1");
      }
    }

    if (focusTarget && typeof focusTarget.focus === "function") {
      focusTarget.focus({ preventScroll: true });
    }

    modal.classList.remove("is-open");
    document.body.classList.remove("pf-modal-open");
    modal.setAttribute("inert", "");
    modal.setAttribute("aria-hidden", "true");
    isOpen = false;
    lastFocused = null;
  }

  document.querySelectorAll("[data-open-enquiry]").forEach((link) => {
    link.addEventListener("click", openEnquiry);
  });

  if (closeButton) closeButton.addEventListener("click", closeEnquiry);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeEnquiry();
  });

  document.addEventListener("keydown", (event) => {
    if (!isOpen) return;

    if (event.key === "Escape") {
      event.preventDefault();
      closeEnquiry();
      return;
    }

    // Keep keyboard focus inside the dialog while it is open.
    if (event.key === "Tab") {
      const focusable = getFocusableElements();
      if (!focusable.length) {
        event.preventDefault();
        if (closeButton) closeButton.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  // Automatically open the enquiry form shortly after the page loads.
  const autoOpen = () => window.setTimeout(() => openEnquiry(), 650);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", autoOpen, { once: true });
  } else {
    autoOpen();
  }
})();