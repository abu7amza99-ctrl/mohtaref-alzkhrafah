/* script.js — PART 1 (الجزء الأول)
   الصق هذا الجزء أولاً داخل ملف script.js
   الجزء الثاني سيُرسل بعده ويلغي أي وظائف ناقصة.
*/
(function () {
  'use strict';

  /* ============================
     اختصارات وعناصر DOM
     ============================ */
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));

  // الترحيب
  const welcomeScreen = $('#welcome-screen');
  const startBtn = $('#start-btn');

  // الشريط والقائمة الجانبية
  const menuBtn = $('#menu-btn');
  const sidebar = $('#sidebar');
  const sidebarItems = sidebar ? Array.from(sidebar.querySelectorAll('li')) : [];

  // الأقسام
  const sections = {
    home: $('#home'),
    fonts: $('#fonts'),
    names: $('#names'),
    about: $('#about'),
    contact: $('#contact'),
  };

  // الصفحة الرئيسية
  const searchInput = $('#search-input');
  const searchBtn = $('#search-btn');
  const gallery = $('#gallery');
  const addImageInput = $('#add-image-input');
  const addImageBtn = $('#add-image-btn');

  // زخرفة الخطوط
  const fontText = $('#font-text');
  const fontSelector = $('#font-selector');
  const colorType = $('#color-type');
  const colorControls = $('#color-controls');
  const previewBox = $('#preview-box');
  const formatSelect = $('#format');
  const sizeSelect = $('#size');
  const downloadBtn = $('#download-btn');

  // زخرفة الأسماء
  const nameInput = $('#name-input');
  const styledNames = $('#styled-names');

  // حول التطبيق
  const aboutText = $('#about-text');

  // اتصل بنا
  const contactLinks = $('#contact-links');

  // لوحة التحكم
  const controlBtn = $('#control-btn');
  const controlPanel = $('#control-panel');
  const closeControlPanel = $('#close-control-panel');

  const styleSelector = $('#style-selector');
  const appFontSelector = $('#app-font-selector');

  const oldPass = $('#old-pass');
  const newPass = $('#new-pass');
  const confirmPass = $('#confirm-pass');
  const savePassBtn = $('#save-pass-btn');

  const aboutEdit = $('#about-edit');
  const saveAboutBtn = $('#save-about-btn');

  const fontNameInput = $('#font-name');
  const fontFileInput = $('#font-file');
  const saveFontBtn = $('#save-font-btn');

  const imageStyleName = $('#image-style-name');
  const imageStyleFiles = $('#image-style-files');
  const saveImageStyleBtn = $('#save-image-style-btn');

  /* ============================
     مفاتيح localStorage والافتراضيات
     ============================ */
  const LS = {
    PASS: 'wt_pass_v1',
    LOGGED: 'wt_logged_v1',
    IMAGES: 'wt_images_v1',
    FONTS: 'wt_fonts_v1',
    OVERLAYS: 'wt_overlays_v1',
    CONTACTS: 'wt_contacts_v1',
    ABOUT: 'wt_about_v1',
    APPFONT: 'wt_appfont_v1',
    THEME: 'wt_theme_v1',
    STYLE: 'wt_style_v1'
  };

  const DEFAULT_PASS = '1234'; // كلمة مرور افتراضية قابلة للتغيير من لوحة التحكم

  /* ============================
     أدوات مساعدة عامة
     ============================ */
  function toast(msg, ms = 1600) {
    const t = document.createElement('div');
    t.className = 'az-toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), ms);
  }

  function fileToDataURL(file) {
    return new Promise((res, rej) => {
      const fr = new FileReader();
      fr.onload = () => res(fr.result);
      fr.onerror = rej;
      fr.readAsDataURL(file);
    });
  }

  function clearInput(el) {
    try { if (el) el.value = ''; } catch (e) { /* ignore */ }
  }

  function copyToClipboard(txt) {
    if (!txt) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(txt);
    }
    const ta = document.createElement('textarea');
    ta.value = txt; document.body.appendChild(ta); ta.select();
    document.execCommand('copy'); ta.remove();
  }

  /* ============================
     تهيئة localStorage
     ============================ */
  (function initLS() {
    if (!localStorage.getItem(LS.PASS)) localStorage.setItem(LS.PASS, btoa(DEFAULT_PASS));
    if (!localStorage.getItem(LS.LOGGED)) localStorage.setItem(LS.LOGGED, '0');
    if (!localStorage.getItem(LS.IMAGES)) localStorage.setItem(LS.IMAGES, JSON.stringify([]));
    if (!localStorage.getItem(LS.FONTS)) localStorage.setItem(LS.FONTS, JSON.stringify([])); // {name,family,dataUrl}
    if (!localStorage.getItem(LS.OVERLAYS)) localStorage.setItem(LS.OVERLAYS, JSON.stringify([])); // dataUrls
    if (!localStorage.getItem(LS.CONTACTS)) localStorage.setItem(LS.CONTACTS, JSON.stringify([])); // {name,url,icon}
    if (!localStorage.getItem(LS.ABOUT)) localStorage.setItem(LS.ABOUT, aboutText ? aboutText.value : 'تطبيق عالم التصاميم والزخرفة');
    if (!localStorage.getItem(LS.APPFONT)) localStorage.setItem(LS.APPFONT, 'Noto Kufi Arabic');
    if (!localStorage.getItem(LS.THEME)) localStorage.setItem(LS.THEME, '#d4af37');
    if (!localStorage.getItem(LS.STYLE)) localStorage.setItem(LS.STYLE, 'default');
  })();

  function getSavedImages() { return JSON.parse(localStorage.getItem(LS.IMAGES) || '[]'); }
  function getSavedFonts() { return JSON.parse(localStorage.getItem(LS.FONTS) || '[]'); }
  function getSavedOverlays() { return JSON.parse(localStorage.getItem(LS.OVERLAYS) || '[]'); }
  function getSavedContacts() { return JSON.parse(localStorage.getItem(LS.CONTACTS) || '[]'); }

  /* ============================
     شاشة الترحيب
     ============================ */
  function showWelcome() {
    if (!welcomeScreen) return;
    welcomeScreen.style.display = 'flex';
  }
  function hideWelcome() {
    if (!welcomeScreen) return;
    welcomeScreen.style.display = 'none';
  }

  // start button
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      hideWelcome();
      setActiveSection('home');
    });
  }
  // show welcome by default on load
  showWelcome();

  /* ============================
     القائمة الجانبية والتنقل
     ============================ */
  function toggleSidebar() {
    if (!sidebar) return;
    sidebar.classList.toggle('active');
  }

  if (menuBtn) menuBtn.addEventListener('click', toggleSidebar);
  // clicking outside of sidebar should close it (for mobile)
  document.addEventListener('click', (e) => {
    if (!sidebar) return;
    if (!sidebar.contains(e.target) && !menuBtn.contains(e.target) && sidebar.classList.contains('active')) {
      sidebar.classList.remove('active');
    }
  });

  // navigation from sidebar
  sidebarItems.forEach(li => {
    li.addEventListener('click', () => {
      const id = li.dataset.section;
      if (id) setActiveSection(id);
      if (sidebar.classList.contains('active')) sidebar.classList.remove('active');
    });
  });

  function setActiveSection(id) {
    Object.keys(sections).forEach(k => {
      const el = sections[k];
      if (!el) return;
      if (k === id) { el.classList.add('active'); el.style.display = 'block'; }
      else { el.classList.remove('active'); el.style.display = 'none'; }
    });
    // highlight active menu
    sidebarItems.forEach(li => li.classList.toggle('active', li.dataset.section === id));
  }

  /* ============================
     معرض الصور + إضافة صور
     ============================ */
  function renderGallery() {
    if (!gallery) return;
    gallery.innerHTML = '';
    const arr = getSavedImages();
    if (!arr.length) {
      gallery.innerHTML = `<div class="muted" style="padding:12px;text-align:center">لا توجد صور في المعرض — أضف صوراً من لوحة التحكم أو من هنا.</div>`;
      return;
    }
    arr.forEach((src, idx) => {
      const wrap = document.createElement('div');
      wrap.className = 'gallery-item';
      const img = document.createElement('img');
      img.src = src;
      img.alt = `صورة ${idx + 1}`;
      img.loading = 'lazy';
      img.tabIndex = 0;
      wrap.appendChild(img);
      // click to open in new tab
      img.addEventListener('click', () => {
        const w = window.open('', '_blank');
        if (w) {
          w.document.write(`<img src="${src}" style="max-width:100%"/>`);
        } else {
          // fallback: copy url
          copyToClipboard(src);
          toast('تم نسخ رابط الصورة.');
        }
      });
      gallery.appendChild(wrap);
    });
  }
  renderGallery();

  // add image via UI (home quick uploader)
  if (addImageBtn && addImageInput) {
    addImageBtn.addEventListener('click', () => addImageInput.click());
    addImageInput.addEventListener('change', async (e) => {
      const files = Array.from(e.target.files || []);
      if (!files.length) return;
      const existing = getSavedImages();
      try {
        const added = await Promise.all(files.slice(0, 20).map(f => fileToDataURL(f)));
        const merged = existing.concat(added);
        localStorage.setItem(LS.IMAGES, JSON.stringify(merged));
        clearInput(addImageInput);
        renderGallery();
        toast('تمت إضافة الصور إلى المعرض.');
      } catch (err) {
        console.error(err);
        toast('فشل إضافة الصور.');
      }
    });
  }

  // search in gallery
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = (e.target.value || '').trim().toLowerCase();
      const items = Array.from(gallery.querySelectorAll('img'));
      items.forEach(img => {
        const meta = (img.alt || '').toLowerCase();
        img.parentElement.style.display = (!q || meta.includes(q)) ? '' : 'none';
      });
    });
    if (searchBtn) {
      searchBtn.addEventListener('click', () => {
        const ev = new Event('input', { bubbles: true });
        searchInput.dispatchEvent(ev);
      });
    }
  }

  /* ============================
     إدارة أيقونات التواصل
     ============================ */
  function renderContacts() {
    if (!contactLinks) return;
    contactLinks.innerHTML = '';
    const arr = getSavedContacts();
    if (!arr.length) {
      contactLinks.innerHTML = `<div class="muted" style="padding:8px">لم يضف المالك روابط تواصل بعد.</div>`;
      return;
    }
    arr.forEach(c => {
      const img = document.createElement('img');
      img.src = c.icon;
      img.alt = c.name;
      img.title = c.name;
      img.style.cursor = 'pointer';
      img.addEventListener('click', () => window.open(c.url, '_blank'));
      contactLinks.appendChild(img);
    });
  }
  renderContacts();

  /* ============================
     خطوط: تحميل/عرض/تسجيل @font-face
     ============================ */
  function loadFontsToSelect() {
    const saved = getSavedFonts(); // {name,family,dataUrl}
    const basic = [
      { name: 'Noto Kufi Arabic', family: 'Noto Kufi Arabic' },
      { name: 'Cairo', family: 'Cairo' },
      { name: 'Amiri', family: 'Amiri' },
      { name: 'Tajawal', family: 'Tajawal' },
      { name: 'Reem Kufi', family: 'Reem Kufi' },
      { name: 'El Messiri', family: 'El Messiri' },
      { name: 'Arial', family: 'Arial' },
      { name: 'Tahoma', family: 'Tahoma' },
      { name: 'Segoe UI', family: 'Segoe UI' },
      { name: 'Verdana', family: 'Verdana' }
    ];
    const combined = basic.concat(saved.map(f => ({ name: f.name, family: f.family })));
    if (fontSelector) {
      fontSelector.innerHTML = '';
      combined.forEach(f => {
        const o = document.createElement('option'); o.value = f.family; o.textContent = f.name;
        fontSelector.appendChild(o);
      });
      const savedChoice = localStorage.getItem(LS.APPFONT) || combined[0].family;
      fontSelector.value = savedChoice;
    }
    if (appFontSelector) {
      appFontSelector.innerHTML = '';
      combined.forEach(f => {
        const o = document.createElement('option'); o.value = f.family; o.textContent = f.name;
        appFontSelector.appendChild(o);
      });
      appFontSelector.value = localStorage.getItem(LS.APPFONT) || combined[0].family;
    }
    // inject @font-face for saved
    saved.forEach((f, idx) => {
      const id = `wt_userfont_${idx}`;
      if (!document.getElementById(id)) {
        const st = document.createElement('style');
        st.id = id;
        st.innerHTML = `@font-face{ font-family: '${f.family}'; src: url('${f.dataUrl}'); }`;
        document.head.appendChild(st);
      }
    });
  }
  loadFontsToSelect();

  // change app font (applies to body)
  if (appFontSelector) {
    appFontSelector.addEventListener('change', (e) => {
      const val = e.target.value;
      localStorage.setItem(LS.APPFONT, val);
      document.body.style.fontFamily = `${val}, Noto Kufi Arabic, Cairo, sans-serif`;
      loadFontsToSelect(); // refresh
    });
    // apply stored on load
    const af = localStorage.getItem(LS.APPFONT) || 'Noto Kufi Arabic';
    document.body.style.fontFamily = `${af}, Noto Kufi Arabic, Cairo, sans-serif`;
  }

  /* ============================
     بناء خيارات اللون لزخرفة الخطوط
     ============================ */
  function buildColorControls() {
    if (!colorControls) return;
    colorControls.innerHTML = '';

    // solid
    const solidWrap = document.createElement('div');
    solidWrap.className = 'color-control-row';
    const sLbl = document.createElement('label'); sLbl.textContent = 'لون ثابت';
    const sInput = document.createElement('input'); sInput.type = 'color'; sInput.id = 'opt_solid_color'; sInput.value = '#000000';
    solidWrap.appendChild(sLbl); solidWrap.appendChild(sInput);

    // gradient
    const gradWrap = document.createElement('div');
    gradWrap.className = 'color-control-row';
    const gLbl = document.createElement('label'); gLbl.textContent = 'تدرجات جاهزة';
    const gSelect = document.createElement('select'); gSelect.id = 'opt_grad_select';
    const GRADIENTS = [
      ['#c19a27', '#ffd700'],
      ['#ff9a9e', '#ffc3a0'],
      ['#d7d7d7', '#f0f0f0'],
      ['#89f7fe', '#66a6ff'],
      ['#ff7e5f', '#feb47b'],
      ['#7F00FF', '#E100FF'],
      ['#56ab2f', '#a8e063'],
      ['#ff9966', '#ff5e62'],
      ['#a1c4fd', '#c2e9fb'],
      ['#e96443', '#904e95']
    ];
    GRADIENTS.forEach(g => {
      const o = document.createElement('option'); o.value = JSON.stringify(g); o.textContent = `${g[0]} → ${g[1]}`;
      gSelect.appendChild(o);
    });
    gradWrap.appendChild(gLbl); gradWrap.appendChild(gSelect);

    // image overlay select
    const imgWrap = document.createElement('div');
    imgWrap.className = 'color-control-row';
    const iLbl = document.createElement('label'); iLbl.textContent = 'اختيار صورة للتلبيس';
    const iSelect = document.createElement('select'); iSelect.id = 'opt_img_select';
    imgWrap.appendChild(iLbl); imgWrap.appendChild(iSelect);

    colorControls.appendChild(solidWrap);
    colorControls.appendChild(gradWrap);
    colorControls.appendChild(imgWrap);

    function updateVisibility() {
      const mode = colorType ? colorType.value : 'solid';
      solidWrap.style.display = (mode === 'solid') ? '' : 'none';
      gradWrap.style.display = (mode === 'gradient') ? '' : 'none';
      imgWrap.style.display = (mode === 'image') ? '' : 'none';
      populateOverlaySelect();
      applyPreview();
    }

    if (colorType) colorType.addEventListener('change', updateVisibility);
    sInput.addEventListener('input', applyPreview);
    gSelect.addEventListener('change', applyPreview);
    iSelect.addEventListener('change', applyPreview);

    updateVisibility();
  }
  buildColorControls();

  // populate overlay select with saved overlays
  function populateOverlaySelect() {
    const sel = document.getElementById('opt_img_select');
    if (!sel) return;
    sel.innerHTML = '';
    const arr = getSavedOverlays();
    if (!arr.length) {
      const o = document.createElement('option'); o.value = ''; o.textContent = 'لا توجد صور محفوظة';
      sel.appendChild(o);
      return;
    }
    arr.forEach((d, i) => {
      const o = document.createElement('option'); o.value = i; o.textContent = `صورة ${i + 1}`;
      sel.appendChild(o);
    });
  }
  populateOverlaySelect();

  /* ============================
     معاينة النص (preview) — ستطبق Solid/Gradient/Image
     ============================ */
  function applyPreview() {
    if (!previewBox) return;
    const txt = (fontText && fontText.value) ? fontText.value : 'معاينة';
    previewBox.textContent = txt;
    // font
    const fam = (fontSelector && fontSelector.value) ? fontSelector.value : getComputedStyle(document.body).fontFamily;
    previewBox.style.fontFamily = `${fam}, Noto Kufi Arabic, Cairo, sans-serif`;
    // reset styles
    previewBox.style.background = 'none';
    previewBox.style.webkitBackgroundClip = '';
    previewBox.style.webkitTextFillColor = '';
    previewBox.style.color = '';

    const mode = (colorType && colorType.value) ? colorType.value : 'solid';
    if (mode === 'solid') {
      const c = document.getElementById('opt_solid_color') ? document.getElementById('opt_solid_color').value : '#000';
      previewBox.style.color = c;
    } else if (mode === 'gradient') {
      const sel = document.getElementById('opt_grad_select');
      const stops = sel ? JSON.parse(sel.value) : ['#c19a27', '#ffd700'];
      const g = `linear-gradient(90deg, ${stops.join(',')})`;
      previewBox.style.background = g;
      previewBox.style.webkitBackgroundClip = 'text';
      previewBox.style.webkitTextFillColor = 'transparent';
    } else if (mode === 'image') {
      const sel = document.getElementById('opt_img_select');
      const idx = sel ? parseInt(sel.value, 10) : -1;
      const overlays = getSavedOverlays();
      const src = overlays[idx];
      if (src) {
        previewBox.style.backgroundImage = `url(${src})`;
        previewBox.style.backgroundSize = 'cover';
        previewBox.style.webkitBackgroundClip = 'text';
        previewBox.style.webkitTextFillColor = 'transparent';
      } else {
        previewBox.style.color = '#fff';
      }
    }
  }

  // bind preview inputs
  if (fontText) fontText.addEventListener('input', applyPreview);
  if (fontSelector) fontSelector.addEventListener('change', applyPreview);
  if (colorType) colorType.addEventListener('change', applyPreview);

  // apply initial preview
  applyPreview();

  /* ============================
     تنزيل التصدير — تحويل المعاينة إلى كانفاس وتحميل
     ============================ */
  function downloadPreview() {
    const txt = (fontText && fontText.value) ? fontText.value : 'معاينة';
    const fam = (fontSelector && fontSelector.value) ? fontSelector.value : getComputedStyle(document.body).fontFamily;
    const sizeOption = sizeSelect ? sizeSelect.value : 'medium';
    let w = 800, h = 400;
    if (sizeOption === 'small') { w = 600; h = 300; }
    else if (sizeOption === 'large') { w = 1400; h = 700; }
    const fmt = formatSelect ? formatSelect.value : 'png';

    const canvas = document.createElement('canvas');
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d');
    // background transparent by default
    ctx.clearRect(0, 0, w, h);
    // set font size depending on canvas
    const fontSize = Math.floor(Math.min(w, h) / 4);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `${fontSize}px ${fam}`;

    const mode = (colorType && colorType.value) ? colorType.value : 'solid';
    if (mode === 'solid') {
      const c = document.getElementById('opt_solid_color') ? document.getElementById('opt_solid_color').value : '#000';
      ctx.fillStyle = c;
      drawMultilineCanvas(ctx, txt, w / 2, h / 2, w * 0.9);
      finalize();
    } else if (mode === 'gradient') {
      const sel = document.getElementById('opt_grad_select');
      const stops = sel ? JSON.parse(sel.value) : ['#c19a27', '#ffd700'];
      const g = ctx.createLinearGradient(0, 0, w, 0);
      const step = 1 / (stops.length - 1 || 1);
      stops.forEach((s, i) => g.addColorStop(i * step, s));
      ctx.fillStyle = g;
      drawMultilineCanvas(ctx, txt, w / 2, h / 2, w * 0.9);
      finalize();
    } else if (mode === 'image') {
      const sel = document.getElementById('opt_img_select');
      const idx = sel ? parseInt(sel.value, 10) : -1;
      const overlays = getSavedOverlays();
      const src = overlays[idx];
      if (!src) { toast('اختر صورة للتلبيس أولاً.'); return; }
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = function () {
        // draw image full canvas then clip text
        ctx.drawImage(img, 0, 0, w, h);
        ctx.globalCompositeOperation = 'destination-in';
        ctx.fillStyle = '#000';
        ctx.font = `${fontSize}px ${fam}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        drawMultilineCanvas(ctx, txt, w / 2, h / 2, w * 0.9);
        ctx.globalCompositeOperation = 'source-over';
        finalize();
      };
      img.onerror = function () { toast('فشل تحميل صورة التلبيس.'); };
      img.src = src;
      return;
    }

    function finalize() {
      const mime = (fmt === 'jpg' || fmt === 'jpeg') ? 'image/jpeg' : 'image/png';
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `zakhrafa.${fmt}`;
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 2000);
      }, mime);
    }
  }

  if (downloadBtn) downloadBtn.addEventListener('click', downloadPreview);

  function drawMultilineCanvas(ctx, text, x, y, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let line = '';
    for (let i = 0; i < words.length; i++) {
      const test = line + words[i] + ' ';
      if (ctx.measureText(test).width > maxWidth && i > 0) {
        lines.push(line.trim());
        line = words[i] + ' ';
      } else { line = test; }
    }
    if (line) lines.push(line.trim());
    const fontSize = parseInt(ctx.font, 10) || 48;
    const lineHeight = fontSize * 1.05;
    const startY = y - ((lines.length - 1) * lineHeight) / 2;
    lines.forEach((ln, idx) => ctx.fillText(ln, x, startY + idx * lineHeight));
  }

  /* ============================
     زخرفة الأسماء — توليد 120 نمط
     ============================ */
  const DECOR = {
    internal: 'ـﮧِۢ',
    symbols: ['⊰', '⊱', '✧', 'ꕤ', '✿', 'ꨄ', '⋆', '꧁', '꧂', '𓆩', '𓆪', '★', '♡', '✦', '❀', '❖']
  };

  function generate120Styles(name) {
    const arr = [];
    const base = name || 'الاسم';
    const syms = DECOR.symbols;
    for (let i = 0; i < 120; i++) {
      const left = syms[i % syms.length];
      const right = syms[(i + 4) % syms.length];
      const v = i % 8;
      let txt = '';
      switch (v) {
        case 0: txt = `${left} ${DECOR.internal} ${base} ${DECOR.internal} ${right}`; break;
        case 1: txt = `${left}${left} ${base} ${right}${right}`; break;
        case 2: txt = `${left} ${base} ${DECOR.internal}${right}`; break;
        case 3: txt = `${DECOR.internal} ${left} ${base} ${right}`; break;
        case 4: txt = `✦ ${base} ✦`; break;
        case 5: txt = `ღ ${base} ღ`; break;
        case 6: txt = `★ ${base} ★`; break;
        default: txt = `${left} ${base} ${right}`; break;
      }
      arr.push(txt);
    }
    return arr;
  }

  function renderStyledNames(name) {
    if (!styledNames) return;
    styledNames.innerHTML = '';
    const items = generate120Styles(name);
    items.forEach((t) => {
      const d = document.createElement('div');
      d.className = 'styled-name-item';
      d.textContent = t;
      // click copies
      d.addEventListener('click', () => {
        copyToClipboard(t);
        d.style.background = 'rgba(212,175,55,0.25)';
        setTimeout(() => d.style.background = '', 300);
        toast('تم نسخ النمط.');
      });
      // long press -> copy (mobile)
      attachLongPress(d, () => { copyToClipboard(t); toast('تم نسخ النمط.'); });
      styledNames.appendChild(d);
    });
  }

  if (nameInput) {
    nameInput.addEventListener('input', (e) => {
      const v = (e.target.value || '').trim() || 'الاسم';
      renderStyledNames(v);
    });
    // initial render
    renderStyledNames('الاسم');
  }

  // utility long-press
  function attachLongPress(el, cb, delay = 700) {
    let timer = null;
    const start = (ev) => { ev.preventDefault(); timer = setTimeout(() => { cb(); timer = null; }, delay); };
    const cancel = () => { if (timer) { clearTimeout(timer); timer = null; } };
    el.addEventListener('touchstart', start);
    el.addEventListener('mousedown', start);
    el.addEventListener('touchend', cancel);
    el.addEventListener('mouseup', cancel);
    el.addEventListener('mouseleave', cancel);
  }

  /* ============================
     لوحة التحكم — فتح/إغلاق وتطبيقات
     ============================ */
  if (controlBtn) {
    controlBtn.addEventListener('click', () => {
      if (!controlPanel) return;
      controlPanel.classList.remove('hidden');
      // populate current about text
      aboutEdit.value = localStorage.getItem(LS.ABOUT) || '';
      // load saved overlays and fonts into selects (calls in part2 will finalize)
      populateOverlayListInControl();
      loadFontsToSelect(); // ensures list is up-to-date
      // apply saved style
      const st = localStorage.getItem(LS.STYLE) || 'default';
      if (styleSelector) styleSelector.value = st;
      // apply saved font
      const af = localStorage.getItem(LS.APPFONT) || 'Noto Kufi Arabic';
      if (appFontSelector) appFontSelector.value = af;
    });
  }
  if (closeControlPanel) {
    closeControlPanel.addEventListener('click', () => {
      if (!controlPanel) return;
      controlPanel.classList.add('hidden');
    });
  }

  // style selector
  if (styleSelector) {
    styleSelector.addEventListener('change', (e) => {
      const val = e.target.value;
      localStorage.setItem(LS.STYLE, val);
      // style presets (simple)
      if (val === 'dark') {
        document.documentElement.style.setProperty('--gold-1', '#c19a27');
        document.body.style.background = 'radial-gradient(circle at center, #2b1b0f 0%, #0f0a06 100%)';
      } else if (val === 'light') {
        document.documentElement.style.setProperty('--gold-1', '#d4af37');
        document.body.style.background = 'linear-gradient(180deg,#fbf6ea,#fffaf2)';
      } else {
        // default
        document.documentElement.style.setProperty('--gold-1', '#d4af37');
        document.body.style.background = 'radial-gradient(circle at center, #2b1b0f 0%, #1a120c 100%)';
      }
      toast('تم تغيير ستايل التطبيق.');
    });
  }

  /* ============================
     تغيير كلمة السر (لوحة التحكم)
     ============================ */
  if (savePassBtn) {
    savePassBtn.addEventListener('click', () => {
      const curHash = localStorage.getItem(LS.PASS);
      const oldVal = (oldPass && oldPass.value) ? oldPass.value : '';
      if (!oldVal) return toast('ادخل كلمة السر القديمة.');
      if (btoa(oldVal) !== curHash) return toast('كلمة السر القديمة غير صحيحة.');
      const np = (newPass && newPass.value) ? newPass.value : '';
      const cp = (confirmPass && confirmPass.value) ? confirmPass.value : '';
      if (!np || np !== cp) return toast('تأكد من كلمة السر الجديدة ومطابقتها.');
      localStorage.setItem(LS.PASS, btoa(np));
      oldPass.value = newPass.value = confirmPass.value = '';
      toast('تم تغيير كلمة السر محلياً.');
    });
  }

  /* ============================
     تعديل نص "لمحة عن التطبيق"
     ============================ */
  if (saveAboutBtn && aboutEdit) {
    saveAboutBtn.addEventListener('click', () => {
      const txt = aboutEdit.value || '';
      localStorage.setItem(LS.ABOUT, txt);
      if (aboutText) aboutText.value = txt;
      toast('تم حفظ نص لمحة التطبيق.');
    });
  }

  /* ============================
     إضافة خطوط من لوحة التحكم
     ============================ */
  if (saveFontBtn && fontFileInput) {
    saveFontBtn.addEventListener('click', async () => {
      try {
        if (!fontFileInput.files.length) return toast('اختر ملف الخط أولاً.');
        const file = fontFileInput.files[0];
        const dataUrl = await fileToDataURL(file);
        const family = (fontNameInput && fontNameInput.value.trim()) ? fontNameInput.value.trim() : `UserFont_${Date.now()}`;
        const arr = getSavedFonts();
        arr.push({ name: family, family: family, dataUrl: dataUrl });
        localStorage.setItem(LS.FONTS, JSON.stringify(arr));
        clearInput(fontFileInput); if (fontNameInput) fontNameInput.value = '';
        loadFontsToSelect();
        toast('تم حفظ الخط محلياً.');
      } catch (err) {
        console.error(err); toast('فشل حفظ الخط.');
      }
    });
  }

  /* ============================
     إضافة صور التلبيس (overlays) من لوحة التحكم
     ============================ */
  if (saveImageStyleBtn && imageStyleFiles) {
    saveImageStyleBtn.addEventListener('click', async () => {
      try {
        const files = Array.from(imageStyleFiles.files || []);
        if (!files.length) return toast('اختر صوراً أولاً.');
        const existing = getSavedOverlays();
        const added = await Promise.all(files.slice(0, 20).map(f => fileToDataURL(f)));
        localStorage.setItem(LS.OVERLAYS, JSON.stringify(existing.concat(added)));
        clearInput(imageStyleFiles); if (imageStyleName) imageStyleName.value = '';
        populateOverlaySelect(); populateOverlaySelect(); // refresh
        toast('تم حفظ صور التلبيس.');
      } catch (err) {
        console.error(err); toast('فشل حفظ صور التلبيس.');
      }
    });
  }

  /* ============================
     إضافة أيقونات التواصل (control panel)
     ============================ */
  // In index.html we didn't include direct inputs for contacts inside control panel,
  // but we support adding contacts through stored key directly if needed (handled in Part2).
  function populateOverlayListInControl() {
    // filler: Part2 will build UI for previewing overlays inside control panel if needed
    // For now ensure select is populated
    populateOverlaySelect();
  }

  // helper to populate overlay select used elsewhere
  function populateOverlaySelect() {
    const sel = document.getElementById('opt_img_select');
    if (!sel) return;
    sel.innerHTML = '';
    const arr = getSavedOverlays();
    if (!arr.length) {
      const o = document.createElement('option'); o.value = ''; o.textContent = 'لا توجد صور محفوظة';
      sel.appendChild(o);
      return;
    }
    arr.forEach((d, i) => {
      const o = document.createElement('option'); o.value = i; o.textContent = `صورة ${i + 1}`;
      sel.appendChild(o);
    });
  }

  /* ============================
     تهيئة أولية نهائية للواجهة
     ============================ */
  (function initialUI() {
    // set about text
    const at = localStorage.getItem(LS.ABOUT) || '';
    if (aboutText) aboutText.value = at;
    if (aboutEdit) aboutEdit.value = at;

    // apply theme style
    const st = localStorage.getItem(LS.STYLE) || 'default';
    if (styleSelector) styleSelector.value = st;

    // load saved data
    loadFontsToSelect();
    populateOverlaySelect();
    renderGallery();
    renderContacts();
    applyPreview();
  })();

  /* ============================
     expose some helpers for debug
     ============================ */
  window.wtApp = {
    renderGallery,
    renderContacts,
    loadFontsToSelect,
    populateOverlaySelect,
    applyPreview,
    generate120Styles
  };

  // PART 1 — لا تغلق IIFE هنا، الجزء الثاني سيكمل الوظائف ويغلقه.
  /* script.js — PART 2 (الجزء الثاني)
   ألصق هذا الجزء بعد PART 1 داخل نفس ملف script.js
   هذا الجزء يكمل جميع الوظائف المتقدمة ويغلق الـ IIFE
*/
  /* ============================
     تكملة وظائف الجزء الثاني
     ============================ */

  // ======= توليد 120 ستايل (وظيفة مستخدمة في PART1) =======
  function generate120Styles(name) {
    const arr = [];
    const base = name || 'الاسم';
    const syms = DECOR.symbols;
    for (let i = 0; i < 120; i++) {
      const left = syms[i % syms.length];
      const right = syms[(i + 4) % syms.length];
      const v = i % 10;
      let txt = '';
      switch (v) {
        case 0:
          txt = `${left} ${DECOR.internal} ${base} ${DECOR.internal} ${right}`;
          break;
        case 1:
          txt = `${left}${left} ${base} ${right}${right}`;
          break;
        case 2:
          txt = `${left} ${base} ${DECOR.internal}${right}`;
          break;
        case 3:
          txt = `${DECOR.internal} ${left} ${base} ${right}`;
          break;
        case 4:
          txt = `✦ ${base} ✦`;
          break;
        case 5:
          txt = `ღ ${base} ღ`;
          break;
        case 6:
          txt = `★ ${base} ★`;
          break;
        case 7:
          txt = `${base} ✿`;
          break;
        case 8:
          txt = `《 ${base} 》`;
          break;
        default:
          txt = `${left} ${base} ${right}`;
          break;
      }
      arr.push(txt);
    }
    return arr;
  }

  // ======= عرض 120 ستايل في الـ UI (styledNames container) =======
  function renderStyledNames(name) {
    if (!styledNames) return;
    styledNames.innerHTML = '';
    const list = generate120Styles(name);
    list.forEach((t) => {
      const el = document.createElement('div');
      el.className = 'styled-name-item';
      el.textContent = t;
      // نسخ عند النقر
      el.addEventListener('click', () => {
        copyToClipboard(t);
        el.style.background = 'rgba(212,175,55,0.25)';
        setTimeout(() => (el.style.background = ''), 300);
        toast('تم نسخ النمط.');
      });
      // الدعم للضغط المطوّل (mobile)
      attachLongPress(el, () => {
        copyToClipboard(t);
        toast('تم نسخ النمط.');
      });
      styledNames.appendChild(el);
    });
  }

  // إذا لم يكن هناك input اسم، اعرض الافتراضي (تم ربط listener في part1)
  if (nameInput) {
    // تأكد أن العرض محدث عند تحميل الصفحة
    const initialNameVal = (nameInput.value || '').trim() || 'الاسم';
    renderStyledNames(initialNameVal);
  }

  // expose generate function globally (safety)
  window.generate120Styles = generate120Styles;

  // ======= وظائف اختيار التلبيسات وإدارتها في لوحة التحكم =======
  // إظهار قائمة التلبيسات بمكوّن تحكّم داخل لوحة التحكم (إن وُجد)
  function buildOverlayPreviewArea() {
    // نبحث عن عنصر داخل control panel لوضع معاينات (إن أردت إضافة لاحقاً)
    // في حال لم يوجد، نقوم فقط بتحديث الـ selects.
    populateOverlaySelect();
  }

  // call it to ensure UI sync
  buildOverlayPreviewArea();

  // ======= إدارة جهات الاتصال (إذا أراد المالك إضافة روابط) =======
  // لأن عناصر الإدخال لإضافة جهة اتصال لم تكن موجودة في التصميم النهائي (أو يمكن إضافة لاحقاً) —
  // سنوفر دالة مساعدة يمكن استدعاؤها عبر Console أو إضافتها لاحقاً في لوحة التحكم.
  window.addContact = async function (name, url, file) {
    // usage: addContact('Instagram','https://instagram.com', fileInput.files[0])
    try {
      if (!name || !url) throw new Error('الاسم والرابط مطلوبان.');
      let iconData = '';
      if (file) {
        iconData = await fileToDataURL(file);
      } else {
        // placeholder icon data (شفرة صغيرة بالـ SVG كأيقونة افتراضية)
        iconData = 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="100%" height="100%" fill="#d4af37"/><text x="50%" y="50%" font-size="28" font-family="Arial" fill="#000" text-anchor="middle" dominant-baseline="central">🔗</text></svg>`);
      }
      const arr = getSavedContacts();
      arr.push({ name, url, icon: iconData });
      localStorage.setItem(LS.CONTACTS, JSON.stringify(arr));
      renderContacts();
      toast('تمت إضافة جهة الاتصال.');
    } catch (err) {
      console.error(err);
      toast('فشل إضافة جهة الاتصال.');
    }
  };

  // ======= وظيفة حذف صورة من المعرض (يمكن استخدامها مستقبلاً) =======
  window.removeGalleryImageAt = function (index) {
    const arr = getSavedImages();
    if (index < 0 || index >= arr.length) return toast('فهرس غير صحيح.');
    arr.splice(index, 1);
    localStorage.setItem(LS.IMAGES, JSON.stringify(arr));
    renderGallery();
    toast('تم حذف الصورة.');
  };

  // ======= وظيفة حذف تلبيس (overlay) =======
  window.removeOverlayAt = function (index) {
    const arr = getSavedOverlays();
    if (index < 0 || index >= arr.length) return toast('فهرس غير صحيح.');
    arr.splice(index, 1);
    localStorage.setItem(LS.OVERLAYS, JSON.stringify(arr));
    populateOverlaySelect();
    toast('تم حذف التلبيس.');
  };

  // ======= دعم حفظ / تحميل إعدادات كاملة (Export/Import JSON) =======
  window.exportSettings = function () {
    const payload = {
      images: getSavedImages(),
      overlays: getSavedOverlays(),
      fonts: getSavedFonts(),
      contacts: getSavedContacts(),
      about: localStorage.getItem(LS.ABOUT) || '',
      appfont: localStorage.getItem(LS.APPFONT) || '',
      theme: localStorage.getItem(LS.THEME) || '',
      style: localStorage.getItem(LS.STYLE) || ''
    };
    const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'wt_backup.json'; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    toast('تم تنزيل نسخة احتياطية من الإعدادات.');
  };

  window.importSettings = async function (file) {
    try {
      if (!file) throw new Error('اختر ملف JSON للاستيراد.');
      const text = await fileToDataURL(file); // data:*;base64,...
      // convert dataURL -> string
      const comma = text.indexOf(','); const jsonStr = atob(text.slice(comma + 1));
      const payload = JSON.parse(jsonStr);
      if (payload.images) localStorage.setItem(LS.IMAGES, JSON.stringify(payload.images));
      if (payload.overlays) localStorage.setItem(LS.OVERLAYS, JSON.stringify(payload.overlays));
      if (payload.fonts) localStorage.setItem(LS.FONTS, JSON.stringify(payload.fonts));
      if (payload.contacts) localStorage.setItem(LS.CONTACTS, JSON.stringify(payload.contacts));
      if (payload.about) localStorage.setItem(LS.ABOUT, payload.about);
      if (payload.appfont) localStorage.setItem(LS.APPFONT, payload.appfont);
      if (payload.theme) localStorage.setItem(LS.THEME, payload.theme);
      if (payload.style) localStorage.setItem(LS.STYLE, payload.style);
      // re-init UI
      loadFontsToSelect();
      populateOverlaySelect();
      renderGallery();
      renderContacts();
      if (aboutText) aboutText.value = localStorage.getItem(LS.ABOUT) || '';
      applyPreview();
      toast('تم استيراد الإعدادات.');
    } catch (err) {
      console.error(err);
      toast('فشل استيراد الإعدادات.');
    }
  };

  // ======= تحسينات واجهة: اختصارات لوحة المفاتيح للـ Admin =======
  document.addEventListener('keydown', (e) => {
    // Ctrl+Shift+A لفتح لوحة التحكم (للمالك)
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
      if (controlPanel) controlPanel.classList.toggle('hidden');
    }
    // ESC لإغلاق القوائم
    if (e.key === 'Escape') {
      if (sidebar && sidebar.classList.contains('active')) sidebar.classList.remove('active');
      if (controlPanel && !controlPanel.classList.contains('hidden')) controlPanel.classList.add('hidden');
    }
  });

  // ======= تهيئة نهائية خفيفة بعد جزء 2 =======
  (function finalBoot() {
    try {
      // إعادة تحميل بعض القوائم بعد أي تغييرات
      loadFontsToSelect();
      populateOverlaySelect();
      renderGallery();
      renderContacts();
      applyPreview();
      // لو هناك نص محفوظ لقسم "حول" ضعه
      const aboutVal = localStorage.getItem(LS.ABOUT) || '';
      if (aboutText) aboutText.value = aboutVal;
      // لو اللوحة مفتوحة مسبقاً طبق الإعدادات
      const st = localStorage.getItem(LS.STYLE) || 'default';
      if (styleSelector) styleSelector.value = st;
      // كلمة ترحيب تظهر فقط أول مرة — لكن وضعناها تظهر دوماً حتى تضغط ابدأ
      console.log('%c✔ تطبيق عالم التصاميم والزخرفة جاهز للعمل', 'color:gold;font-weight:bold;');
    } catch (err) {
      console.error('finalBoot error', err);
    }
  })();

  // ======= تعريض دوال للمراجعة في Console إن احتجت (debug helpers) =======
  window.wtDebug = {
    lsKeys: LS,
    exportSettings,
    importSettings,
    addContact: window.addContact,
    removeGalleryImageAt: window.removeGalleryImageAt,
    removeOverlayAt: window.removeOverlayAt,
    renderGallery,
    renderContacts,
    renderStyledNames,
    generate120Styles
  };

  // ========= غلق الـ IIFE =========
})(); // نهاية سكربت