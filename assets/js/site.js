(function () {
  const WEBHOOK =
    "https://n8n.alecasgari.com/webhook-test/5f5f6cb1-212c-4d22-a131-139a500b4506";
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
    return {
      name: (form.name.value || "").trim(),
      phone: (form.phone.value || "").trim(),
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
    const data = payloadFromForm(form);
    if (!data.name || !data.phone || !data.service) {
      setStatus(status, "err", "لطفاً نام، موبایل و خدمت را کامل کنید.");
      return;
    }
    if (!/^0?9\d{9}$/.test(data.phone.replace(/\s+/g, ""))) {
      setStatus(status, "err", "شماره موبایل را به‌صورت ۰۹۱۲xxxxxxx وارد کنید.");
      return;
    }
    if (btn) btn.disabled = true;
    setStatus(status, "", "در حال ارسال…");
    try {
      const res = await fetch(WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("webhook " + res.status);
      const base = document.documentElement.getAttribute("data-base") || "";
      window.location.href = base + "thankyou/";
    } catch (err) {
      setStatus(
        status,
        "err",
        "ارسال فرم ناموفق بود. از واتساپ اقدام کنید یا دوباره تلاش کنید."
      );
      if (btn) btn.disabled = false;
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    captureAttribution();
    const toggle = qs("[data-menu-toggle]");
    const nav = qs("[data-nav]");
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        const open = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }
    document.querySelectorAll("form[data-lead-form]").forEach(function (form) {
      form.addEventListener("submit", onSubmit);
    });
  });
})();
