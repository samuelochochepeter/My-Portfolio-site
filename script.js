/* Samuel Ochoche Peter portfolio — no build step required. */
"use strict";
(() => {
  // Optional EmailJS browser credentials. Never put a private key here.
  // The template must map from_name, reply_to, subject, and message.
  const EMAILJS = { publicKey: "", serviceId: "", templateId: "" };
  const EMAIL = "samuelochochepeter@gmail.com";
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const themeButton = $("#theme-toggle");
  let manualTheme = false;
  const systemTheme = window.matchMedia("(prefers-color-scheme: light)");
  function setTheme(light) {
    document.body.classList.toggle("light-theme", light);
    themeButton?.setAttribute("aria-pressed", String(light));
    themeButton?.setAttribute("aria-label", `Switch to ${light ? "dark" : "light"} theme`);
    const icon = $("i", themeButton || document.createElement("span"));
    if (icon) icon.className = `fas fa-${light ? "moon" : "sun"}`;
  }
  let theme;
  try { theme = localStorage.getItem("portfolio-theme"); } catch { /* storage can be disabled */ }
  manualTheme = theme === "light" || theme === "dark";
  setTheme(manualTheme ? theme === "light" : systemTheme.matches);
  themeButton?.addEventListener("click", () => {
    manualTheme = true;
    const light = !document.body.classList.contains("light-theme");
    setTheme(light);
    try { localStorage.setItem("portfolio-theme", light ? "light" : "dark"); } catch { /* theme still works */ }
  });
  systemTheme.addEventListener("change", event => { if (!manualTheme) setTheme(event.matches); });

  // Menu: hidden links leave the tab order on small screens.
  const menuButton = $(".menu-btn"), nav = $("#primary-navigation");
  const narrowScreen = window.matchMedia("(max-width: 992px)");
  let menuOpen = false;
  function setMenu(open, restoreFocus = false) {
    menuOpen = open && narrowScreen.matches;
    nav?.classList.toggle("active", menuOpen);
    if (nav) nav.inert = narrowScreen.matches && !menuOpen;
    menuButton?.setAttribute("aria-expanded", String(menuOpen));
    menuButton?.setAttribute("aria-label", menuOpen ? "Close navigation" : "Open navigation");
    const icon = menuButton && $("i", menuButton);
    if (icon) icon.className = `fas ${menuOpen ? "fa-xmark" : "fa-bars"}`;
    if (restoreFocus) menuButton?.focus();
  }
  setMenu(false);
  menuButton?.addEventListener("click", () => setMenu(!menuOpen));
  narrowScreen.addEventListener("change", () => setMenu(false));
  $$("a", nav || document.createElement("nav")).forEach(link => link.addEventListener("click", () => {
    setMenu(false);
    const target = document.getElementById(link.hash.slice(1));
    if (target) { target.tabIndex = -1; target.focus({ preventScroll: true }); }
  }));
  document.addEventListener("click", event => {
    if (menuOpen && !nav?.contains(event.target) && !menuButton?.contains(event.target)) setMenu(false);
  });
  document.addEventListener("keydown", event => { if (event.key === "Escape" && menuOpen) setMenu(false, true); });
  const header = $("#header"), topButton = $("#scroll-top");
  let ticking = false;
  function updateScroll() {
    header?.classList.toggle("scrolled", window.scrollY > 80);
    topButton?.classList.toggle("active", window.scrollY > 500);
    ticking = false;
  }
  window.addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(updateScroll); }
  }, { passive: true });
  updateScroll();
  const sections = $$("main section[id]");
  if ("IntersectionObserver" in window) {
    const activeObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        $$("nav a").forEach(link => {
          const active = link.hash === `#${entry.target.id}`;
          link.classList.toggle("active", active);
          if (active) link.setAttribute("aria-current", "location"); else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-15% 0px -60% 0px" });
    sections.forEach(section => activeObserver.observe(section));
  }

  // Synchronous filtering avoids stale animation timers when filters are clicked quickly.
  const cards = $$(".project-card"), filters = $$(".project-filter button");
  filters.forEach(button => {
    button.type = "button";
    button.setAttribute("aria-pressed", String(button.classList.contains("active")));
    button.addEventListener("click", () => {
      filters.forEach(filter => {
        const active = filter === button;
        filter.classList.toggle("active", active);
        filter.setAttribute("aria-pressed", String(active));
      });
      cards.forEach(card => { card.hidden = button.dataset.filter !== "all" && !card.classList.contains(button.dataset.filter); });
      window.AOS?.refresh();
    });
  });

  const dialog = $("#project-dialog");
  function showProject(card, opener) {
    if (!dialog || typeof dialog.showModal !== "function") return;
    const title = $("h3", card)?.textContent.trim() || "Project details";
    $("#dialog-title").textContent = title;
    $("#dialog-description").textContent = $(".project-content > p", card)?.textContent.replace(/\s+/g, " ").trim() || "";
    const source = $("img", card), image = $("#dialog-image");
    image.hidden = !source;
    if (source) { image.src = source.src; image.alt = `${title} preview`; }
    const tech = $("#dialog-tech"), links = $("#dialog-links");
    tech.replaceChildren(); links.replaceChildren();
    $$(".tech span", card).forEach(tag => tech.append(tag.cloneNode(true)));
    $$(".buttons a", card).forEach(link => links.append(link.cloneNode(true)));
    dialog.showModal();
    document.body.classList.add("dialog-open");
    dialog.addEventListener("close", () => {
      document.body.classList.remove("dialog-open");
      if (!opener.closest("[hidden]")) opener.focus();
    }, { once: true });
  }
  cards.forEach(card => {
    const actions = $(".buttons", card);
    if (!actions || card.classList.contains("more-projects")) return;
    const button = document.createElement("button");
    button.type = "button"; button.className = "project-details"; button.textContent = "View Details";
    button.setAttribute("aria-label", `View details: ${$("h3", card)?.textContent.trim() || "project"}`);
    button.addEventListener("click", () => showProject(card, button));
    actions.append(button);
  });
  $(".dialog-close")?.addEventListener("click", () => dialog.close());
  dialog?.addEventListener("click", event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });

  const greeting = $("#greeting");
  if (greeting) {
    const hour = new Date().getHours();
    greeting.textContent = hour < 12 ? "Good Morning 👋" : hour < 17 ? "Good Afternoon 👋" : "Good Evening 👋";
  }
  if (window.AOS && !reduceMotion) window.AOS.init({ duration: 600, once: true, disable: false });
  if (window.Typed && !reduceMotion && $(".typing")) {
    $(".typing").textContent = "";
    new window.Typed(".typing", { strings: ["Full Stack Web Developer", "Data Analyst", "Technology Educator", "Cybersecurity Analyst"], typeSpeed: 60, backSpeed: 35, backDelay: 1800, loop: true });
  }
  // Do not leave an overlay blocking content if an external image/library is slow.
  $("#preloader")?.remove();
  const copyright = $(".copyright");
  if (copyright) copyright.textContent = copyright.textContent.replace(/©\s*\d{4}/, `© ${new Date().getFullYear()}`);

  const form = $("#contact-form"), status = $("#form-status"), note = $("#contact-note");
  const configured = Object.values(EMAILJS).every(value => value.trim().length > 0);
  let sdkPromise;
  function getEmailSDK() {
    if (window.emailjs) return Promise.resolve(window.emailjs);
    if (!sdkPromise) sdkPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
      script.onload = () => window.emailjs ? resolve(window.emailjs) : reject(new Error("Email service unavailable"));
      script.onerror = () => reject(new Error("Email service unavailable"));
      document.head.append(script);
    }).catch(error => { sdkPromise = undefined; throw error; });
    return sdkPromise;
  }
  if (form) {
    const submit = $("button", form);
    if (configured) {
      submit.textContent = "Send Message";
      note.textContent = "Send a message directly to Samuel. Please do not include passwords or sensitive information.";
    }
    form.addEventListener("submit", async event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      if (["from_name", "subject", "message"].some(name => !String(data.get(name) || "").trim())) {
        status.textContent = "Please enter your name, subject, and message."; return;
      }
      if (!configured) {
        const body = `Name: ${data.get("from_name")}\nReply email: ${data.get("reply_to")}\n\n${data.get("message")}`;
        window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(data.get("subject"))}&body=${encodeURIComponent(body)}`;
        status.textContent = `An email draft was requested. Send it from your email app. If no app opens, email ${EMAIL} directly. Your message has not been sent by this website.`;
        return;
      }
      submit.disabled = true; submit.textContent = "Sending…"; status.textContent = "Sending your message…";
      try {
        const sdk = await getEmailSDK();
        await sdk.sendForm(EMAILJS.serviceId, EMAILJS.templateId, form, { publicKey: EMAILJS.publicKey });
        status.textContent = "Your message was sent successfully."; form.reset();
      } catch {
        status.textContent = `Unable to send your message. Please try again or email ${EMAIL} directly.`;
      } finally { submit.disabled = false; submit.textContent = "Send Message"; }
    });
  }
})();
