(function () {
  const WEBHOOK =
    "https://n8n.alecasgari.com/webhook/5f5f6cb1-212c-4d22-a131-139a500b4506";
  const MAPS = "https://goo.gl/maps/LQWLw7nzCf7GFoii6";
  const TELEGRAM = "https://t.me/mahnegahbot";
  const ADDRESS =
    "سعادت آباد، بلوار سرو غرب، خیابان ریاضی بخشایش، کوی هفدهم غربی، ساختمان پزشکان عرفان، واحد ۱۰۸";
  const SERVICES = [
    "هایفوتراپی",
    "مزوتراپی",
    "زاویه سازی فک",
    "ژل و فیلر",
    "بوتاکس",
    "لیزر",
    "فیشیال",
    "لاغری",
    "لابیا پلاستی",
    "سایر خدمات",
  ];
  const UTM_KEYS = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "gclid",
    "fbclid",
    "msclkid",
  ];

  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }

  function basePath() {
    return document.documentElement.getAttribute("data-base") || "";
  }

  function siteHref(path) {
    const base = basePath();
    if (!path || path === "/") return base || "./";
    if (path.startsWith("#")) return (base || "./") + path;
    return base + path.replace(/^\//, "");
  }

  function serviceOptions(selected) {
    return SERVICES.map(function (s) {
      const sel = s === selected ? " selected" : "";
      return '<option value="' + s + '"' + sel + ">" + s + "</option>";
    }).join("");
  }

  function formMarkup(selected) {
    return (
      '<form class="form" data-lead-form>' +
      "<label>نام کامل" +
      '<input name="name" type="text" required autocomplete="name" placeholder="نام و نام خانوادگی">' +
      "</label>" +
      "<label>موبایل" +
      '<input name="phone" type="tel" required inputmode="numeric" lang="en" autocomplete="tel" maxlength="11" minlength="11" pattern="09[0-9]{9}" placeholder="0912xxxxxxx" dir="ltr">' +
      "</label>" +
      "<label>خدمت مورد نظر" +
      '<select name="service" required>' +
      '<option value="" disabled' +
      (selected ? "" : " selected") +
      ">انتخاب کنید</option>" +
      serviceOptions(selected) +
      "</select>" +
      "</label>" +
      '<div class="hp-field" aria-hidden="true">' +
      '<label>شرکت<input name="company" type="text" tabindex="-1" autocomplete="off"></label>' +
      "</div>" +
      '<button class="btn btn-primary" type="submit">ارسال درخواست</button>' +
      '<div class="form-status" data-form-status></div>' +
      "</form>"
    );
  }

  function injectChrome() {
    if (qs("[data-chrome-ready]")) return;
    const current = document.body.getAttribute("data-current") || "";
    const headerHost = qs("[data-site-header]");
    const footerHost = qs("[data-site-footer]");
    if (headerHost) {
      headerHost.outerHTML =
        '<header class="site-header" data-chrome-ready>' +
        '<div class="header-pill">' +
        '<a class="brand" href="' +
        siteHref("/") +
        '">' +
        '<img src="' +
        siteHref("assets/img/logo.png") +
        '" alt="لوگوی مه نگاه" width="42" height="42">' +
        "<span>مه نگاه</span></a>" +
        '<p class="header-motto"><span class="motto-rule"></span><span class="motto-text">زیباتر بودن، حق شماست!</span><span class="motto-rule"></span></p>' +
        '<div class="header-end">' +
        '<button class="menu-toggle" type="button" data-menu-toggle aria-expanded="false">منو</button>' +
        '<nav class="nav" data-nav>' +
        '<a href="' +
        siteHref("/") +
        '"' +
        (current === "home" ? ' aria-current="page"' : "") +
        ">خانه</a>" +
        '<a href="' +
        siteHref("#services") +
        '"' +
        (current === "services" ? ' aria-current="page"' : "") +
        ">خدمات</a>" +
        '<a href="' +
        siteHref("blog/") +
        '"' +
        (current === "blog" ? ' aria-current="page"' : "") +
        ">مجله زیبایی</a>" +
        '<a href="' +
        siteHref("#about") +
        '"' +
        (current === "about" ? ' aria-current="page"' : "") +
        ">درباره مه نگاه</a>" +
        '<a href="' +
        siteHref("#tamas") +
        '">تماس با مه نگاه</a>' +
        '<button type="button" class="nav-cta" data-open-consult>مشاوره رایگان</button>' +
        "</nav></div></div></header>";
    }
    if (footerHost) {
      footerHost.outerHTML =
        '<footer class="site-footer" id="tamas" data-chrome-ready>' +
        '<div class="footer-pill">' +
        '<div class="footer-grid">' +
        "<div><h2>گروه پزشکی مه نگاه</h2>" +
        "<p>ارائه‌دهنده خدمات پوست و زیبایی در سعادت‌آباد، با پزشکان متخصص و تجهیزات دارای تأییدیه.</p>" +
        "<p>" +
        ADDRESS +
        "</p></div>" +
        "<div><h2>ارتباط</h2><ul>" +
        '<li><a href="' +
        TELEGRAM +
        '" rel="noopener">تلگرام @mahnegahbot</a></li>' +
        '<li><a href="' +
        MAPS +
        '" rel="noopener">مسیریابی گوگل‌مپ</a></li>' +
        "</ul></div>" +
        "<div><h2>صفحات</h2><ul>" +
        '<li><a href="' +
        siteHref("blog/") +
        '">مجله زیبایی</a></li>' +
        '<li><a href="' +
        siteHref("facial-full/") +
        '">فیشیال تخصصی</a></li>' +
        '<li><a href="' +
        siteHref("laser-full/") +
        '">لیزر موهای زائد</a></li>' +
        '<li><a href="' +
        siteHref("زاویه-سازی-فک-چگونه-است-قیمت-روش/") +
        '">زاویه سازی فک</a></li>' +
        "</ul></div></div></div></footer>";
    }

    const modal = document.createElement("div");
    modal.className = "modal";
    modal.setAttribute("data-consult-modal", "");
    modal.hidden = true;
    modal.innerHTML =
      '<div class="modal-backdrop" data-close-modal></div>' +
      '<div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="consult-title">' +
      '<button class="modal-close" type="button" data-close-modal aria-label="بستن">×</button>' +
      ' <h2 id="consult-title">مشاوره رایگان</h2>' +
      '<p class="muted">نام، موبایل و خدمت را بفرستید تا مشاور مه نگاه با شما تماس بگیرد.</p>' +
      formMarkup("") +
      "</div>";
    document.body.appendChild(modal);

    const sticky = document.createElement("button");
    sticky.type = "button";
    sticky.className = "sticky-consult";
    sticky.setAttribute("data-open-consult", "");
    sticky.textContent = "مشاوره رایگان";
    document.body.appendChild(sticky);
  }

  function captureAttribution() {
    const params = new URLSearchParams(location.search);
    const stored = JSON.parse(sessionStorage.getItem("mahnegah_attr") || "{}");
    if (!stored.landing) {
      stored.landing = location.pathname + location.search;
      stored.first_referrer = document.referrer || "";
      stored.first_seen = new Date().toISOString();
    }
    UTM_KEYS.forEach(function (k) {
      const v = params.get(k);
      if (v && !stored[k]) stored[k] = v;
    });
    sessionStorage.setItem("mahnegah_attr", JSON.stringify(stored));
    return stored;
  }

  function payloadFromForm(form) {
    const attr = captureAttribution();
    const localPhone = (form.phone.value || "").trim();
    const e164 = toE164(localPhone);
    return {
      name: (form.name.value || "").trim(),
      phone: e164,
      service: form.service.value || "",
      page: location.href,
      path: location.pathname,
      referrer: document.referrer || attr.first_referrer || "",
      landing: attr.landing || location.pathname,
      utm_source: attr.utm_source || "",
      utm_medium: attr.utm_medium || "",
      utm_campaign: attr.utm_campaign || "",
      utm_term: attr.utm_term || "",
      utm_content: attr.utm_content || "",
      gclid: attr.gclid || "",
      fbclid: attr.fbclid || "",
      msclkid: attr.msclkid || "",
      user_agent: navigator.userAgent,
      language: navigator.language,
      timestamp: new Date().toISOString(),
      site: "mahnegahclinic.ir",
    };
  }

  const FA_DIGITS = /[\u06F0-\u06F9\u0660-\u0669]/;
  let lastFaAlert = 0;

  function warnEnglishKeyboard() {
    const now = Date.now();
    if (now - lastFaAlert < 1600) return;
    lastFaAlert = now;
    alert("کیبورد را انگلیسی کنید. فقط رقم انگلیسی 0 تا 9 قبول است.");
  }

  function toE164(localPhone) {
    const digits = String(localPhone || "").replace(/\D/g, "");
    if (/^09\d{9}$/.test(digits)) return "+98" + digits.slice(1);
    return "";
  }

  function hasPersianDigits(value) {
    return FA_DIGITS.test(value || "");
  }

  function bindPhoneInput(input) {
    if (!input || input.getAttribute("data-phone-bound")) return;
    input.setAttribute("data-phone-bound", "1");
    input.addEventListener("beforeinput", function (ev) {
      if (ev.data && FA_DIGITS.test(ev.data)) {
        ev.preventDefault();
        warnEnglishKeyboard();
      }
    });
    input.addEventListener("paste", function (ev) {
      const text = (ev.clipboardData || window.clipboardData).getData("text") || "";
      if (FA_DIGITS.test(text)) {
        ev.preventDefault();
        warnEnglishKeyboard();
      }
    });
    input.addEventListener("input", function () {
      if (FA_DIGITS.test(input.value)) {
        warnEnglishKeyboard();
        input.value = input.value.replace(FA_DIGITS, "").replace(/\D/g, "").slice(0, 11);
        return;
      }
      input.value = input.value.replace(/\D/g, "").slice(0, 11);
    });
  }

  function setStatus(el, type, text) {
    if (!el) return;
    el.className = "form-status " + type;
    el.textContent = text;
  }

  async function onSubmit(ev) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const status = qs("[data-form-status]", form) || qs(".form-status", form.parentElement);
    const btn = qs("button[type=submit]", form);
    const honey = (form.company && form.company.value) || "";
    const name = (form.name.value || "").trim();
    const rawPhone = form.phone.value || "";
    const service = form.service.value || "";
    if (honey) {
      window.location.href = siteHref("thankyou/");
      return;
    }
    if (!name || !rawPhone || !service) {
      setStatus(status, "err", "نام، موبایل و خدمت هر سه الزامی هستند.");
      return;
    }
    if (hasPersianDigits(rawPhone)) {
      warnEnglishKeyboard();
      setStatus(status, "err", "شماره را با کیبورد انگلیسی وارد کنید.");
      return;
    }
    const localPhone = rawPhone.replace(/\D/g, "");
    if (!/^09\d{9}$/.test(localPhone)) {
      setStatus(status, "err", "موبایل باید ۱۱ رقم انگلیسی و با ۰۹ شروع شود.");
      return;
    }
    const data = payloadFromForm(form);
    if (btn) btn.disabled = true;
    setStatus(status, "", "در حال ارسال…");
    try {
      const res = await fetch(WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("webhook " + res.status);
      window.location.href = siteHref("thankyou/");
    } catch (err) {
      setStatus(status, "err", "ارسال فرم ناموفق بود. دوباره تلاش کنید یا در تلگرام به @mahnegahbot پیام بدهید.");
      if (btn) btn.disabled = false;
    }
  }

  function modalEl() {
    return qs("[data-consult-modal]");
  }

  function openModal(service) {
    const modal = modalEl();
    if (!modal) return;
    const select = qs("select[name=service]", modal);
    if (select) {
      const match = SERVICES.indexOf(service) !== -1 ? service : "";
      select.value = match;
      if (!match) select.selectedIndex = 0;
    }
    modal.hidden = false;
    document.body.classList.add("modal-open");
    const name = qs("input[name=name]", modal);
    if (name) name.focus();
  }

  function closeModal() {
    const modal = modalEl();
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove("modal-open");
  }

  function bindChrome() {
    const toggle = qs("[data-menu-toggle]");
    const nav = qs("[data-nav]");
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        const open = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }
    document.addEventListener("click", function (ev) {
      const opener = ev.target.closest("[data-open-consult]");
      if (opener) {
        ev.preventDefault();
        openModal(opener.getAttribute("data-service") || "");
        return;
      }
      if (ev.target.closest("[data-close-modal]")) closeModal();
    });
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape") closeModal();
    });
    document.querySelectorAll("form[data-lead-form]").forEach(function (form) {
      form.addEventListener("submit", onSubmit);
      bindPhoneInput(qs("input[name=phone]", form));
    });
    document.addEventListener("click", function (ev) {
      const btn = ev.target.closest("[data-copy-link]");
      if (!btn) return;
      const url = btn.getAttribute("data-url") || location.href;
      const done = function () {
        const prev = btn.textContent;
        btn.textContent = "کپی شد";
        setTimeout(function () {
          btn.textContent = prev;
        }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(done).catch(function () {});
      }
    });
  }

  function revealOnScroll() {
    const nodes = document.querySelectorAll("[data-reveal]");
    if (!nodes.length || !("IntersectionObserver" in window)) {
      nodes.forEach(function (n) {
        n.classList.add("is-in");
      });
      return;
    }
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    nodes.forEach(function (n) {
      io.observe(n);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    captureAttribution();
    injectChrome();
    bindChrome();
    revealOnScroll();
  });
})();
