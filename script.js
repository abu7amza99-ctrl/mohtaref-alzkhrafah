// script.js — النسخة النهائية الكاملة
// كلمة مرور لوحة التحكم الافتراضية: asd321321

document.addEventListener('DOMContentLoaded', () => {
  // ---- helpers ----
  const $ = id => document.getElementById(id);
  const qAll = sel => Array.from(document.querySelectorAll(sel));
  const safeAdd = (el, ev, fn) => { if (el) el.addEventListener(ev, fn); };

  // ---- Elements ----
  const splash = $('splash');
  const splashStart = $('splashStart');
  const splashAdmin = $('splashAdmin');

  const toggleSidebar = $('toggleSidebar');
  const sidebar = $('sidebar');
  const closeSidebar = $('closeSidebar');

  const openAdmin = $('openAdmin');
  const adminModal = $('adminModal');
  const closeAdmin = $('closeAdmin');
  const adminLogin = $('adminLogin');
  const adminPanel = $('adminPanel');
  const adminPass = $('adminPass');
  const adminLoginBtn = $('adminLoginBtn');
  const adminCancelBtn = $('adminCancelBtn');
  const adminLogout = $('adminLogout');

  const appFontSelect = $('appFontSelect');
  const bgMainInput = $('bgMain');
  const bgFontsInput = $('bgFonts');
  const bgStylesInput = $('bgStyles');
  const applyBgMain = $('applyBgMain');
  const clearBgMain = $('clearBgMain');
  const applyBgFonts = $('applyBgFonts');
  const applyBgStyles = $('applyBgStyles');

  const newFontName = $('newFontName');
  const newFontUrl = $('newFontUrl');
  const addFontBtn = $('addFontBtn');
  const uploadFontFile = $('uploadFontFile');
  const adminFontsList = $('adminFontsList');

  const uploadTilbisFile = $('uploadTilbisFile');
  const addTilbisBtn = $('addTilbisBtn');
  const tilbisTitle = $('tilbisTitle');
  const tilbisList = $('tilbisList');

  const newStyleName = $('newStyleName');
  const newStylePattern = $('newStylePattern');
  const addStyleBtn = $('addStyleBtn');
  const uploadStyleFile = $('uploadStyleFile');
  const adminStylesList = $('adminStylesList');

  const saveSettings = $('saveSettings');
  const resetSettings = $('resetSettings');

  const gradColor1 = $('gradColor1');
  const gradColor2 = $('gradColor2');
  const gradColor3 = $('gradColor3');
  const gradType = $('gradType');
  const applyGradientBtn = $('applyGradientBtn');
  const saveGradientBtn = $('saveGradientBtn');
  const gradPreview = $('gradPreview');

  const aboutLinkInput = $('aboutLink');
  const aboutImageFile = $('aboutImageFile');
  const applyAboutBtn = $('applyAboutBtn');

  // sections UI
  const inputText = $('inputText');
  const fontSelector = $('fontSelector');
  const fontColor = $('fontColor');
  const useGradient = $('useGradient');
  const previewFont = $('previewFont');
  const saveImage = $('saveImage');
  const clearText = $('clearText');

  const nameInput = $('nameInput');
  const styleSelector = $('styleSelector');
  const stylePreview = $('stylePreview');
  const copyResult = $('copyResult');

  const colorMode = $('colorMode');
  const gradientControls = $('gradientControls');
  const tilbisControls = $('tilbisControls');
  const tilbisThumbnails = $('tilbisThumbnails');
  const presetGradients = $('presetGradients');

  const decorResults = $('decorResults');
  const aboutMedia = $('aboutMedia');

  // ---- Local storage keys ----
  const LS_FONTS = 'app_fonts_v1';
  const LS_STYLES = 'app_styles_v1';
  const LS_APP_FONT = 'app_font_v1';
  const LS_BG_MAIN = 'bg_main_v1';
  const LS_BG_FONTS = 'bg_fonts_v1';
  const LS_BG_STYLES = 'bg_styles_v1';
  const LS_GRAD = 'app_grad_v1';
  const LS_TILBIS = 'app_tilbis_v1';
  const LS_ABOUT_IMG = 'app_about_img_v1';
  const LS_ABOUT_LINK = 'app_about_link_v1';
  const LS_LOGGED = 'app_admin_logged_v1';

  // ---- Default fonts & styles ----
  let defaultFonts = [
    {name:'Amiri', css:'Amiri', url:'https://fonts.googleapis.com/css2?family=Amiri&display=swap'},
    {name:'Cairo', css:'Cairo', url:'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;700&display=swap'},
    {name:'Reem Kufi', css:'Reem Kufi', url:'https://fonts.googleapis.com/css2?family=Reem+Kufi&display=swap'},
    {name:'Lateef', css:'Lateef', url:'https://fonts.googleapis.com/css2?family=Lateef&display=swap'},
    {name:'Tajawal', css:'Tajawal', url:'https://fonts.googleapis.com/css2?family=Tajawal&display=swap'},
    {name:'Noto Naskh Arabic', css:'"Noto Naskh Arabic"', url:'https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic&display=swap'},
    {name:'Noto Kufi Arabic', css:'"Noto Kufi Arabic"', url:'https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic&display=swap'},
    {name:'Scheherazade New', css:'"Scheherazade New"', url:'https://fonts.googleapis.com/css2?family=Scheherazade+New&display=swap'},
    {name:'Mada', css:'Mada', url:'https://fonts.googleapis.com/css2?family=Mada&display=swap'},
    {name:'Markazi Text', css:'"Markazi Text"', url:'https://fonts.googleapis.com/css2?family=Markazi+Text&display=swap'},
    {name:'Mirza', css:'Mirza', url:'https://fonts.googleapis.com/css2?family=Mirza&display=swap'},
    {name:'Rakkas', css:'Rakkas', url:'https://fonts.googleapis.com/css2?family=Rakkas&display=swap'},
    {name:'Changa', css:'Changa', url:'https://fonts.googleapis.com/css2?family=Changa&display=swap'},
    {name:'Katibeh', css:'Katibeh', url:'https://fonts.googleapis.com/css2?family=Katibeh&display=swap'},
    {name:'Lalezar', css:'Lalezar', url:'https://fonts.googleapis.com/css2?family=Lalezar&display=swap'},
    {name:'El Messiri', css:'"El Messiri"', url:'https://fonts.googleapis.com/css2?family=El+Messiri&display=swap'},
    {name:'Harmattan', css:'Harmattan', url:'https://fonts.googleapis.com/css2?family=Harmattan&display=swap'},
    {name:'Jomhuria', css:'Jomhuria', url:'https://fonts.googleapis.com/css2?family=Jomhuria&display=swap'},
    {name:'Almarai', css:'Almarai', url:'https://fonts.googleapis.com/css2?family=Almarai&display=swap'},
    {name:'Aref Ruqaa', css:'"Aref Ruqaa"', url:'https://fonts.googleapis.com/css2?family=Aref+Ruqaa&display=swap'}
  ];

  // Default simple styles (kept but we'll add extra decorative items)
  let defaultStyles = [
    {id:'s1', label:'نجوم ✨', pattern:'✨ {txt} ✨'},
    {id:'s2', label:'قفص « »', pattern:'« {txt} »'},
    {id:'s3', label:'قلبان ❤️', pattern:'❤️ {txt} ❤️'},
    {id:'s4', label:'زخرفة مزدوجة', pattern:'★彡 {txt} 彡★'},
    {id:'s5', label:'مربعات ▢', pattern:'▢ {txt} ▢'}
  ];

  // Extra decorations user requested — ensure these appear at top of the styles list
  const extraTopStyles = [
    {id:'u_top_1', label:'✭ ⋆⃝ Fancy', pattern:'✭ ⋆⃝ {txt} ☄'},
    {id:'u_top_2', label:'°•⋆ زخرفة', pattern:'°•⋆{txt}⋆•°'},
    {id:'u_top_3', label:'رموز وقلوب', pattern:'ہٰٖہٰٖہٰٖہٰٖ}txt}🜫'},
    {id:'u_top_4', label:'تلبيس غامق', pattern:'ہٰٖہٰٖہٰٖہٰٖہٰٖ{txt}ہٰٖہٰٖہٰٖہٰٖہٰٖ'},
{id:'u_top_5', label:'تلبيس برمز 1', pattern:'ہٰٖہٰٖہٰٖہٰٖہٰٖ{txt}ہٰٖ🝁'},
    {id:'u_top_6', label:'زخرفة مع رموز', pattern:'ـِْ✮ِـٰٚـِْ✮ِـٰٚـِْ✮ِـٰٚـِْ✮ِـٰٚـِْ🎞💛'}
  ];
  
  
  // دمج ستايلات أبو حمزة مع الستات الأصلية
if (window.abuHamzaStylesList && Array.isArray(window.abuHamzaStylesList)) {
  window.abuHamzaStylesList.forEach(style => {
    decorations.push(style);
  });
}

  // load saved or defaults
  let fonts = JSON.parse(localStorage.getItem(LS_FONTS) || 'null') || (defaultFonts.slice());
  let styles = JSON.parse(localStorage.getItem(LS_STYLES) || 'null') || (extraTopStyles.concat(defaultStyles));
  let tilbis = JSON.parse(localStorage.getItem(LS_TILBIS) || 'null') || [];

  // utility: load font links into head
  function ensureFontLoaded(f) {
    if (!f || !f.url) return;
    const existing = Array.from(document.head.querySelectorAll('link')).some(l => l.href === f.url);
    if (!existing) {
      const l = document.createElement('link'); l.rel='stylesheet'; l.href=f.url; document.head.appendChild(l);
    }
  }
  fonts.forEach(ensureFontLoaded);

  // render font selector & appFontSelect
  function renderFontOptions() {
    if (fontSelector) {
      fontSelector.innerHTML = '';
      fonts.forEach(f => {
        const o = document.createElement('option'); o.value = f.css; o.textContent = f.name; fontSelector.appendChild(o);
      });
    }
    if (appFontSelect) {
      appFontSelect.innerHTML = '';
      fonts.forEach(f => {
        const o = document.createElement('option'); o.value = f.css; o.textContent = f.name; appFontSelect.appendChild(o);
      });
      const saved = localStorage.getItem(LS_APP_FONT);
      if (saved) document.body.style.fontFamily = saved;
    }
  }
  renderFontOptions();

  // render style selector
  function renderStyleOptions() {
    if (!styleSelector) return;
    styleSelector.innerHTML = '';
    styles.forEach(s => {
      const o = document.createElement('option'); o.value = s.id; o.textContent = s.label; styleSelector.appendChild(o);
    });
  }
  renderStyleOptions();

  // render admin lists (fonts, styles, tilbis)
  function renderAdminLists() {
    // fonts
    if (adminFontsList) {
      adminFontsList.innerHTML = '';
      fonts.forEach((f,i) => {
        const div = document.createElement('div');
        div.className = 'admin-item';
        div.innerHTML = `<strong>${f.name}</strong> <button data-i="${i}" class="remove-font small">حذف</button>`;
        adminFontsList.appendChild(div);
      });
      adminFontsList.querySelectorAll('.remove-font').forEach(btn => {
        btn.addEventListener('click', e => {
          const i = Number(btn.dataset.i);
          if (confirm('حذف الخط نهائياً؟')) {
            fonts.splice(i,1);
            localStorage.setItem(LS_FONTS, JSON.stringify(fonts));
            renderFontOptions(); renderAdminLists();
          }
        });
      });
    }

    // styles
    if (adminStylesList) {
      adminStylesList.innerHTML = '';
      styles.forEach((s,i) => {
        const div = document.createElement('div');
        div.className = 'admin-item';
        div.innerHTML = `<strong>${s.label}</strong> <button data-i="${i}" class="remove-style small">حذف</button>`;
        adminStylesList.appendChild(div);
      });
      adminStylesList.querySelectorAll('.remove-style').forEach(btn => {
        btn.addEventListener('click', e => {
          const i = Number(btn.dataset.i);
          if (confirm('حذف الستايل نهائياً؟')) {
            styles.splice(i,1);
            localStorage.setItem(LS_STYLES, JSON.stringify(styles));
            renderStyleOptions(); renderAdminLists();
            updateStylePreview();
          }
        });
      });
    }

    // tilbis
    if (tilbisList) {
      tilbisList.innerHTML = '';
      if (tilbis.length === 0) tilbisList.textContent = 'لا توجد تلبيسات مضافة';
      tilbis.forEach((t,i) => {
        const div = document.createElement('div');
        div.style.display = 'flex';
        div.style.alignItems = 'center';
        div.style.justifyContent = 'space-between';
        div.style.marginBottom = '8px';
        const left = document.createElement('div');
        left.style.display = 'flex';
        left.style.alignItems = 'center';
        const thumb = document.createElement('div');
        thumb.style.width='84px'; thumb.style.height='44px'; thumb.style.borderRadius='8px';
        thumb.style.backgroundImage = `url(${t.data})`; thumb.style.backgroundSize='cover'; thumb.style.marginLeft='8px';
        const title = document.createElement('div');
        title.textContent = t.title || ('تلبيس '+(i+1));
        left.appendChild(thumb); left.appendChild(title);
        const actions = document.createElement('div');
        actions.innerHTML = `<button data-i="${i}" class="use-tilbis small btn btn-primary">اختيار</button> <button data-i="${i}" class="del-tilbis small btn btn-ghost">حذف</button>`;
        div.appendChild(left); div.appendChild(actions);
        tilbisList.appendChild(div);
      });

      tilbisList.querySelectorAll('.del-tilbis').forEach(btn => {
        btn.addEventListener('click', ()=> {
          const i = Number(btn.dataset.i);
          if (!confirm('حذف هذا التلبيس؟')) return;
          tilbis.splice(i,1);
          localStorage.setItem(LS_TILBIS, JSON.stringify(tilbis));
          renderAdminLists();
          renderTilbisThumbnails();
        });
      });

      tilbisList.querySelectorAll('.use-tilbis').forEach(btn => {
        btn.addEventListener('click', ()=> {
          const i = Number(btn.dataset.i);
          applyTilbisToPreview(tilbis[i]);
        });
      });
    }
  }
  renderAdminLists();

  // ---- Splash behavior ----
  safeAdd(splashStart, 'click', () => { if (splash) splash.style.display = 'none'; });
  safeAdd(splashAdmin, 'click', () => {
    if (splash) splash.style.display = 'none';
    openAdminModal();
  });
  setTimeout(()=> { if (splash && splash.style.display !== 'none') splash.style.display = 'none'; }, 6000);

  // ---- Sidebar open/close ----
  safeAdd(toggleSidebar, 'click', ()=> { if (sidebar) sidebar.classList.add('open'); });
  safeAdd(closeSidebar, 'click', ()=> { if (sidebar) sidebar.classList.remove('open'); });
  document.querySelectorAll('.sidebar-nav a').forEach(a => {
    a.addEventListener('click', ()=> { if (sidebar) sidebar.classList.remove('open'); });
  });

  // ---- Admin modal open/close/login ----
  safeAdd(openAdmin, 'click', openAdminModal);
  safeAdd(closeAdmin, 'click', closeAdminModal);
  safeAdd(adminCancelBtn, 'click', closeAdminModal);

  function openAdminModal(){
    if (!adminModal) return;
    adminModal.classList.add('show');
    adminModal.setAttribute('aria-hidden','false');
    const logged = localStorage.getItem(LS_LOGGED) === '1';
    if (logged) showAdminPanel(); else showAdminLogin();
  }

  function closeAdminModal(){
    if (!adminModal) return;
    adminModal.classList.remove('show');
    adminModal.setAttribute('aria-hidden','true');
  }

  function showAdminPanel(){
    if (adminLogin) adminLogin.style.display = 'none';
    if (adminPanel) adminPanel.style.display = 'block';
    if (adminLogout) adminLogout.style.display = 'inline-block';
    renderAdminLists();
    const first = document.querySelector('.admin-section');
    if (first) first.classList.add('open');
  }

  function showAdminLogin(){
    if (adminLogin) adminLogin.style.display = 'block';
    if (adminPanel) adminPanel.style.display = 'none';
    if (adminLogout) adminLogout.style.display = 'none';
  }

  safeAdd(adminLoginBtn, 'click', ()=> {
    const pass = adminPass ? adminPass.value : '';
    if (pass === 'asd321321') {
      localStorage.setItem(LS_LOGGED, '1');
      showAdminPanel();
    } else {
      alert('كلمة المرور غير صحيحة');
    }
  });

  safeAdd(adminLogout, 'click', ()=> {
    localStorage.removeItem(LS_LOGGED);
    showAdminLogin();
  });

  // ---- Accordion behavior ----
  function initAccordion(){
    qAll('.admin-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const section = btn.closest('.admin-section');
        if (!section) return;
        qAll('.admin-section').forEach(s => { if (s !== section) s.classList.remove('open'); });
        section.classList.toggle('open');
      });
    });
  }
  initAccordion();

  // ---- Add font by URL ----
  safeAdd(addFontBtn, 'click', ()=> {
    const name = newFontName ? newFontName.value.trim() : '';
    const url = newFontUrl ? newFontUrl.value.trim() : '';
    if (!name) return alert('ادخل اسم الخط');
    const obj = {name, css:name, url};
    fonts.push(obj);
    if (url) ensureFontLoaded(obj);
    localStorage.setItem(LS_FONTS, JSON.stringify(fonts));
    renderFontOptions(); renderAdminLists();
    alert('تمت إضافة الخط (قد تحتاج إعادة تحميل ليعمل بالكامل)');
  });

  // ---- upload font file (dataURL -> @font-face) ----
  if (uploadFontFile) uploadFontFile.addEventListener('change', e => {
    const f = e.target.files[0]; if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      const data = reader.result;
      const fontName = f.name.split('.').slice(0,-1).join('.') || ('font-'+Date.now());
      const format = f.name.endsWith('.ttf') ? 'truetype' : f.name.endsWith('.otf') ? 'opentype' : (f.name.endsWith('.woff2') ? 'woff2' : 'woff');
      const style = document.createElement('style');
      style.innerHTML = `@font-face{font-family:'${fontName}';src:url('${data}') format('${format}');font-weight:normal;font-style:normal;}`;
      document.head.appendChild(style);
      fonts.push({name:fontName, css:fontName, url:''});
      localStorage.setItem(LS_FONTS, JSON.stringify(fonts));
      renderFontOptions(); renderAdminLists();
      alert('تم رفع الخط محلياً ويمكن اختياره الآن');
    };
    reader.readAsDataURL(f);
  });

  // ---- Add style ----
  safeAdd(addStyleBtn, 'click', ()=> {
    const name = newStyleName ? newStyleName.value.trim() : '';
    const pat = newStylePattern ? newStylePattern.value.trim() : '';
    if (!name || !pat || !pat.includes('{txt}')) return alert('ادخل اسم و نمط يحتوي {txt}');
    const id = 'u_'+Date.now();
    styles.unshift({id, label:name, pattern:pat}); // add to top
    localStorage.setItem(LS_STYLES, JSON.stringify(styles));
    renderStyleOptions(); renderAdminLists();
    alert('تمت إضافة الستايل');
    updateStylePreview();
  });

  // ---- upload style file (txt lines or JSON) ----
  if (uploadStyleFile) uploadStyleFile.addEventListener('change', e => {
    const f = e.target.files[0]; if(!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      let txt = reader.result;
      try {
        const arr = JSON.parse(txt);
        if (Array.isArray(arr)) {
          arr.forEach((p,i) => { if (typeof p === 'string' && p.includes('{txt}')) styles.unshift({id:'imp-'+Date.now()+'-'+i,label:p.slice(0,40),pattern:p}); });
        } else {
          txt.split(/\r?\n/).map(l=>l.trim()).filter(Boolean).forEach((p,i)=> { if (p.includes('{txt}')) styles.unshift({id:'imp-'+Date.now()+'-'+i,label:p.slice(0,40),pattern:p}); });
        }
      } catch {
        txt.split(/\r?\n/).map(l=>l.trim()).filter(Boolean).forEach((p,i)=> { if (p.includes('{txt}')) styles.unshift({id:'imp-'+Date.now()+'-'+i,label:p.slice(0,40),pattern:p}); });
      }
      localStorage.setItem(LS_STYLES, JSON.stringify(styles));
      renderStyleOptions(); renderAdminLists();
      alert('تم استيراد الستايلات من الملف');
      updateStylePreview();
    };
    reader.readAsText(f);
  });
  // ---- apply/clear backgrounds ----
  safeAdd(applyBgMain, 'click', ()=> {
    const v = bgMainInput ? bgMainInput.value.trim() : '';
    if (!v) return alert('أدخل لون أو رابط');
    if (v.startsWith('#')) document.body.style.background = v; else document.body.style.backgroundImage = `url(${v})`;
    localStorage.setItem(LS_BG_MAIN, v);
  });
  safeAdd(clearBgMain, 'click', ()=> { document.body.style.background = ''; localStorage.removeItem(LS_BG_MAIN); });

  safeAdd(applyBgFonts, 'click', ()=> {
    const v = bgFontsInput ? bgFontsInput.value.trim() : '';
    if (!v) return alert('أدخل قيمة');
    const sect = $('arabicFontsSection'); if (!sect) return;
    if (v.startsWith('#')) sect.style.background = v; else sect.style.backgroundImage = `url(${v})`;
    localStorage.setItem(LS_BG_FONTS, v);
  });

  safeAdd(applyBgStyles, 'click', ()=> {
    const v = bgStylesInput ? bgStylesInput.value.trim() : '';
    if (!v) return alert('أدخل قيمة');
    const sect = $('nameStylesSection'); if (!sect) return;
    if (v.startsWith('#')) sect.style.background = v; else sect.style.backgroundImage = `url(${v})`;
    localStorage.setItem(LS_BG_STYLES, v);
  });

  // apply saved backgrounds
  const savedMain = localStorage.getItem(LS_BG_MAIN);
  if (savedMain) { if (savedMain.startsWith('#')) document.body.style.background = savedMain; else document.body.style.backgroundImage = `url(${savedMain})`; }
  const savedFontsBg = localStorage.getItem(LS_BG_FONTS);
  if (savedFontsBg && $('arabicFontsSection')) { if (savedFontsBg.startsWith('#')) $('arabicFontsSection').style.background = savedFontsBg; else $('arabicFontsSection').style.backgroundImage = `url(${savedFontsBg})`; }
  const savedStylesBg = localStorage.getItem(LS_BG_STYLES);
  if (savedStylesBg && $('nameStylesSection')) { if (savedStylesBg.startsWith('#')) $('nameStylesSection').style.background = savedStylesBg; else $('nameStylesSection').style.backgroundImage = `url(${savedStylesBg})`; }

  // ---- change app font ----
  safeAdd(appFontSelect, 'change', (e)=> { document.body.style.fontFamily = e.target.value; localStorage.setItem(LS_APP_FONT, e.target.value); });
  const savedAppFont = localStorage.getItem(LS_APP_FONT);
  if (savedAppFont) document.body.style.fontFamily = savedAppFont;

  // ---- Gradient handling ----
  function buildGradientString(c1, c2, c3, type){
    if (type === 'radial') return `radial-gradient(circle, ${c1}, ${c2}, ${c3})`;
    if (type === 'conic') return `conic-gradient(${c1}, ${c2}, ${c3})`;
    if (type === 'linear-90') return `linear-gradient(90deg, ${c1}, ${c2}, ${c3})`;
    if (type === 'linear-45') return `linear-gradient(45deg, ${c1}, ${c2}, ${c3})`;
    return `linear-gradient(135deg, ${c1}, ${c2}, ${c3})`;
  }

  function previewGradient(){
    const g = buildGradientString(gradColor1.value, gradColor2.value, gradColor3.value, gradType.value);
    if (gradPreview) gradPreview.style.background = g;
  }
  safeAdd(applyGradientBtn, 'click', ()=> {
    const g = buildGradientString(gradColor1.value, gradColor2.value, gradColor3.value, gradType.value);
    document.documentElement.style.setProperty('--grad-temp', g);
    previewGradient();
    alert('تم تطبيق التدرج مؤقتاً — احفظه إن أردت الاحتفاظ به');
    renderPresetGradients(); // keep presets display in sync
  });

  safeAdd(saveGradientBtn, 'click', ()=> {
    const obj = {c1:gradColor1.value,c2:gradColor2.value,c3:gradColor3.value,type:gradType.value};
    localStorage.setItem(LS_GRAD, JSON.stringify(obj));
    alert('تم حفظ التدرج كإعداد افتراضي');
    renderPresetGradients();
  });

  const savedGrad = localStorage.getItem(LS_GRAD);
  if (savedGrad){
    try {
      const g = JSON.parse(savedGrad);
      gradColor1.value = g.c1; gradColor2.value = g.c2; gradColor3.value = g.c3; gradType.value = g.type;
      previewGradient();
    } catch {}
  } else previewGradient();

  // ---- Preset gradients (20+) ----
  const presetGradList = [
    {id:'g1', label:'violet ocean', css:'linear-gradient(135deg,#5b21b6,#2563eb,#10b981)'},
    {id:'g2', label:'sunset', css:'linear-gradient(135deg,#ff7a18,#ffb12d,#ffd57e)'},
    {id:'g3', label:'gold', css:'linear-gradient(135deg,#ffd57e,#e6b95c,#b6872b)'},
    {id:'g4', label:'silver', css:'linear-gradient(135deg,#e6e9ef,#cfd6df,#9aa4b4)'},
    {id:'g5', label:'rose', css:'linear-gradient(135deg,#ff7ab6,#ff9fc4,#ffd1e6)'},
    {id:'g6', label:'emerald', css:'linear-gradient(135deg,#10b981,#34d399,#86efac)'},
    {id:'g7', label:'oceanic', css:'linear-gradient(135deg,#0ea5e9,#3b82f6,#6366f1)'},
    {id:'g8', label:'fiery', css:'linear-gradient(135deg,#ef4444,#f97316,#facc15)'},
    {id:'g9', label:'lavender', css:'linear-gradient(135deg,#7c4dff,#b388ff,#e1b7ff)'},
    {id:'g10', label:'teal breeze', css:'linear-gradient(135deg,#14b8a6,#22d3ee,#06b6d4)'},
    {id:'g11', label:'pink coral', css:'linear-gradient(135deg,#ff6b6b,#ffb199,#ffd6c0)'},
    {id:'g12', label:'midnight', css:'linear-gradient(135deg,#0f172a,#1e293b,#334155)'},
    {id:'g13', label:'mango', css:'linear-gradient(135deg,#ffb02e,#ff7a18,#ff4d00)'},
    {id:'g14', label:'mint', css:'linear-gradient(135deg,#bff0d8,#86efac,#34d399)'},
    {id:'g15', label:'coral blue', css:'linear-gradient(135deg,#06b6d4,#3b82f6,#8b5cf6)'},
    {id:'g16', label:'wine', css:'linear-gradient(135deg,#7f1d1d,#b91c1c,#fb7185)'},
    {id:'g17', label:'sunrise', css:'linear-gradient(135deg,#ff9a9e,#fecfef,#f6d365)'},
    {id:'g18', label:'forest', css:'linear-gradient(135deg,#164e63,#0ea5a9,#34d399)'},
    {id:'g19', label:'steel', css:'linear-gradient(135deg,#94a3b8,#64748b,#0f172a)'},
    {id:'g20', label:'peach', css:'linear-gradient(135deg,#ffd1dc,#ffb3c6,#ff9aa2)'},
    {id:'g21', label:'sunbeam', css:'linear-gradient(135deg,#fff7cc,#ffecb3,#ffd57e)'}
  ];

  function renderPresetGradients(){
    if (!presetGradients) return;
    presetGradients.innerHTML = '';
    presetGradList.forEach(p => {
      const b = document.createElement('button');
      b.className = 'btn btn-ghost';
      b.style.minWidth='120px';
      b.style.margin='6px 6px 0 0';
      b.innerHTML = `<div style="height:32px;border-radius:8px;padding:2px;display:flex;align-items:center;justify-content:center;background:${p.css};color:#fff;font-weight:700">${p.label}</div>`;
      b.addEventListener('click', ()=> {
        // apply as gradient temp
        document.documentElement.style.setProperty('--grad-temp', p.css);
        colorMode.value = 'gradient';
        updateArabicPreview();
      });
      presetGradients.appendChild(b);
    });
  }
  renderPresetGradients();
  // ---- Tilbis (image-based skins) ----
  // upload file and capture dataURL
  if (uploadTilbisFile) uploadTilbisFile.addEventListener('change', e => {
    const f = e.target.files[0]; if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      const data = reader.result;
      // temporary fill title if provided
      const title = tilbisTitle ? tilbisTitle.value.trim() : '';
      tilbis.push({title: title || ('تلبيس '+(tilbis.length+1)), data});
      localStorage.setItem(LS_TILBIS, JSON.stringify(tilbis));
      renderAdminLists(); renderTilbisThumbnails();
      if (tilbisTitle) tilbisTitle.value = '';
      alert('تم رفع التلبيس وحفظه محلياً');
      uploadTilbisFile.value = '';
    };
    reader.readAsDataURL(f);
  });

  // add tilbis via button (if you want separate behavior)
  if (addTilbisBtn) addTilbisBtn.addEventListener('click', ()=> {
    // if file already handled via input change, this helps finalize title only
    if (tilbis.length === 0) return alert('اختر صورة أولاً من زر "رفع صورة"');
    renderAdminLists(); renderTilbisThumbnails();
  });

  function renderTilbisThumbnails(){
    if (!tilbisThumbnails) return;
    tilbisThumbnails.innerHTML = '';
    if (tilbis.length === 0) { tilbisThumbnails.textContent = 'لا توجد تلبيسات'; return; }
    tilbis.forEach((t,i) => {
      const d = document.createElement('div');
      d.className = 'tilbis-thumb';
      d.style.backgroundImage = `url(${t.data})`;
      d.title = t.title || ('تلبيس '+(i+1));
      d.addEventListener('click', ()=> {
        // set colorMode to tilbis and mark selected
        colorMode.value = 'tilbis';
        qAll('.tilbis-thumb').forEach(el=>el.classList.remove('selected'));
        d.classList.add('selected');
        applyTilbisToPreview(t);
      });
      tilbisThumbnails.appendChild(d);
    });
  }
  renderTilbisThumbnails();

  function applyTilbisToPreview(t){
    if (!previewFont) return;
    previewFont.style.backgroundImage = `url(${t.data})`;
    previewFont.style.backgroundSize = 'cover';
    previewFont.style.backgroundPosition = 'center';
    previewFont.style.webkitBackgroundClip = 'text';
    previewFont.style.backgroundClip = 'text';
    previewFont.style.color = 'transparent';
  }

  // ---- preview update functions ----
  function updateArabicPreview() {
    if (!previewFont) return;
    const txt = (inputText && inputText.value) ? inputText.value : 'المعاينة هنا';
    previewFont.textContent = txt;
    const ff = (fontSelector && fontSelector.value) ? fontSelector.value : '';
    previewFont.style.fontFamily = ff || '';

    const mode = colorMode ? colorMode.value : 'solid';
    if (mode === 'tilbis') {
      // Let selected tilbis control background (if any)
      const selected = document.querySelector('.tilbis-thumb.selected');
      if (selected) {
        // already applied via click
        return;
      } else {
        // no selection: clear to solid
        previewFont.style.background = 'none';
        previewFont.style.webkitBackgroundClip = 'unset';
        previewFont.style.webkitTextFillColor = 'unset';
        previewFont.style.color = (fontColor && fontColor.value) ? fontColor.value : '#111';
      }
      return;
    }

    if (mode === 'gradient') {
      const rootGrad = getComputedStyle(document.documentElement).getPropertyValue('--grad-temp').trim();
      if (rootGrad && rootGrad !== "''") {
        previewFont.style.background = rootGrad;
      } else {
        previewFont.style.background = `linear-gradient(90deg, ${gradColor1.value}, ${gradColor2.value}, ${gradColor3.value})`;
      }
      previewFont.style.webkitBackgroundClip = 'text';
      previewFont.style.webkitTextFillColor = 'transparent';
      previewFont.style.color = 'transparent';
    } else {
      // solid
      previewFont.style.background = 'none';
      previewFont.style.webkitBackgroundClip = 'unset';
      previewFont.style.webkitTextFillColor = 'unset';
      previewFont.style.color = (fontColor && fontColor.value) ? fontColor.value : '#111';
    }
  }
  safeAdd(inputText, 'input', updateArabicPreview);
  safeAdd(fontSelector, 'change', updateArabicPreview);
  safeAdd(fontColor, 'input', ()=> {
    document.documentElement.style.removeProperty('--grad-temp');
    updateArabicPreview();
  });
  safeAdd(useGradient, 'change', updateArabicPreview);
  safeAdd(clearText, 'click', ()=> { if (inputText) inputText.value=''; updateArabicPreview(); });

  // color mode switching
  safeAdd(colorMode, 'change', ()=> {
    const v = colorMode.value;
    if (v === 'tilbis') {
      tilbisControls.style.display = 'block';
      gradientControls.style.display = 'none';
    } else if (v === 'gradient') {
      tilbisControls.style.display = 'none';
      gradientControls.style.display = 'block';
    } else {
      tilbisControls.style.display = 'none';
      gradientControls.style.display = 'block';
    }
    updateArabicPreview();
  });

  // ---- save preview as image ----
  safeAdd(saveImage, 'click', ()=> {
    if (!previewFont) return alert('لا توجد معاينة للحفظ');
    // temporarily ensure correct rendering
    html2canvas(previewFont, {backgroundColor:null, scale:2}).then(canvas => {
      const a = document.createElement('a'); a.href = canvas.toDataURL('image/png'); a.download = 'preview.png'; a.click();
    }).catch(()=> alert('فشل إنشاء الصورة'));
  });

// ---- زخارف ديناميكية تطبق على "طظج" وأي اسم آخر ----
function specialDynamicVariants(name) {
  const nm = (name || '').trim();
  const arr = [];

  // زخارف الأساس لكلمة "طظج"
  const base = [
    '• طۨہٰٰظۗـہٰٰجْۧ  ، ¦ 🌥❄️)،',
    '⊰ طٰہٰٖظٰہٰٖجٰہٰٖ ،⁞ ²⁰⁰² 😻❤️⇣˓',
    'طِٰـﮧِۢظِٰـﮧِۢجِٰـﮧِۢ ⁞ ²⁰⁰¹ ⁽🌝🖤₎⇣℡',
    '⁽♔₎┋طُظهُجٍ ┋:',
    '• طَٰـُـٰٓظَٰـُـٰٓجَٰـُـٰٓ ⁞♩⁽♥️🌩₎⇣℡',
    'طـۘ❈ـۘظـۘ❈ـۘجـۘ❈ـۘ𝅘𝅥𝅯',
    'طٰہٰٖظٰہٰٖجٰہٰٖ𖤓',
    'ط͜ــ๋͜ـظــ๋͜ـ͜ــ๋͜ـج͜ــ๋͜ـ🌥💛 ؛',
    'طِـٰٚـِْ✮ِـٰٚـِْظِـٰٚـِْ✮ِـٰٚـِِْـٰٚـِْ✮ِـٰٚـِْجِـٰٚـِْ✮ِـٰٚـِْ🜫',
    'طٰہٰٖظٰہٰٖجٰہٰٖ❤️💸 ،',
    'طہظًجہ𖤓',
    'طۨہٰٰظۗـہٰٰجْۧ 𖥓'
  ];

  // إذا الاسم نفسه طظج → رجع الزخارف كما هي
  if (nm === 'طظج') return base;

  // لأي اسم آخر → استبدل طظج بالاسم
  base.forEach(z => {
    arr.push(z.replace(/طظج/g, nm));
  });

  return arr;
}  function generateDecorations(name) {
    const out = [];
    name = (name || '').trim();
    if (!name) return out;

    // 1) special exact variants (user examples)
    out.push(...specialDynamicVariants(name));

    // 2) from styles list (pattern replacement)
    styles.forEach(s => {
      try {
        const text = s.pattern.replace(/\{txt\}/g, name);
        out.push(text);
      } catch(e){}
    });

    // 3) some programmatic wrappers to increase variety
    const wrappers = [
      ['★彡 ', ' 彡★'],
      ['✧•° ', ' °•✧'],
      ['ღ ', ' ღ'],
      ['『 ', ' 』'],
      ['•·• ', ' •·•'],
      ['ᵕ̈ ', ' ᵕ̈']
    ];
    wrappers.forEach(w => {
      out.push(`${w[0]}${name}${w[1]}`);
    });

    // 4) remove duplicates and limit to reasonable count
    const seen = new Set();
    const final = [];
    out.forEach(t => {
      const clean = t.trim();
      if (!seen.has(clean) && final.length < 60) { seen.add(clean); final.push(clean); }
    });
    
    // 5) زخارف خاصة تستبدل ط ظ ج بحروف الاسم
if (window.applyNameToDynamicStyles) {
  try {
    const fancySet = window.applyNameToDynamicStyles(name);
    out.push(...fancySet);
  } catch(e) {
    console.warn('applyNameToDynamicStyles error', e);
  }
}

    return final;
  }

  function renderDecorResultsFor(name) {
    if (!decorResults) return;
    decorResults.innerHTML = '';
    const items = generateDecorations(name);
    if (items.length === 0) {
      decorResults.textContent = 'لا توجد زخارف للعرض — اكتب الاسم أعلاه';
      return;
    }
    items.forEach((it, idx) => {
      const card = document.createElement('div');
      card.className = 'decor-card';
      const txt = document.createElement('div');
      txt.className = 'txt';
      txt.textContent = it;
      const btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.innerHTML = 'نسخ';
      btn.title = 'نسخ';
      // click copy
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(it).then(()=> {
          btn.textContent = 'تم النسخ';
          setTimeout(()=> btn.textContent = 'نسخ', 900);
        }).catch(()=> alert('فشل النسخ'));
      });
      // whole card click -> copy
      card.addEventListener('click', ()=> {
        navigator.clipboard.writeText(it).then(()=> {
          btn.textContent = 'تم النسخ';
          setTimeout(()=> btn.textContent = 'نسخ', 900);
        }).catch(()=> alert('فشل النسخ'));
      });
      // long-press (mobile) on card to copy
      let longT = null;
      card.addEventListener('touchstart', ()=> {
        longT = setTimeout(()=> { navigator.clipboard.writeText(it).then(()=> alert('تم النسخ (لمس طويل)')); }, 700);
      });
      card.addEventListener('touchend', ()=> { if (longT) clearTimeout(longT); });

      card.appendChild(txt);
      card.appendChild(btn);
      decorResults.appendChild(card);
    });
  }

  // ---- styles behavior & live updates ----
  function updateStylePreview() {
    if (!stylePreview) return;
    const txt = (nameInput && nameInput.value) ? nameInput.value : 'الاسم';
    const sel = (styleSelector && styleSelector.value) ? styleSelector.value : (styles[0] ? styles[0].id : '');
    const s = styles.find(x=>x.id===sel) || styles[0];
    if (!s) { stylePreview.textContent = txt; renderDecorResultsFor(txt); return; }
    stylePreview.textContent = s.pattern.replace('{txt}', txt);
    // render cards for the given name
    renderDecorResultsFor(txt);
  }
  safeAdd(nameInput, 'input', updateStylePreview);
  safeAdd(styleSelector, 'change', updateStylePreview);

  // copy main preview result
  safeAdd(copyResult, 'click', ()=> {
    if (!stylePreview) return;
    navigator.clipboard.writeText(stylePreview.textContent).then(()=> alert('تم نسخ النص المزخرف')).catch(()=> alert('فشل النسخ'));
  });

  // long-press hint (the button itself shows behavior)
  if (stylePreview) {
    let t = null;
    stylePreview.addEventListener('touchstart', ()=> {
      t = setTimeout(()=> { navigator.clipboard.writeText(stylePreview.textContent).then(()=> alert('تم النسخ (لمس طويل)')); }, 700);
    });
    stylePreview.addEventListener('touchend', ()=> { if (t) clearTimeout(t); });
  }

  // ---- About image + link handling (file upload supported) ----
  safeAdd(applyAboutBtn, 'click', ()=> {
    const link = aboutLinkInput ? aboutLinkInput.value.trim() : '';
    if (link) localStorage.setItem(LS_ABOUT_LINK, link); else localStorage.removeItem(LS_ABOUT_LINK);
    populateAbout();
    alert('تم تحديث قسم "حول التطبيق"');
  });

  if (aboutImageFile) aboutImageFile.addEventListener('change', e => {
    const f = e.target.files[0]; if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      localStorage.setItem(LS_ABOUT_IMG, reader.result);
      populateAbout();
      alert('تم رفع صورة "حول التطبيق" وحفظها محلياً');
      aboutImageFile.value = '';
    };
    reader.readAsDataURL(f);
  });

  function populateAbout(){
    try {
      const storedImg = localStorage.getItem(LS_ABOUT_IMG);
      const storedLink = localStorage.getItem(LS_ABOUT_LINK);
      if (!aboutMedia) return;
      aboutMedia.innerHTML = '';
      if (storedImg) {
        const wrap = document.createElement('div');
        wrap.style.maxWidth = '320px';
        wrap.style.marginTop = '8px';
        const img = document.createElement('img');
        img.src = storedImg;
        img.alt = 'صورة حول التطبيق';
        img.style.width = '100%';
        img.style.borderRadius = '8px';
        img.style.cursor = storedLink ? 'pointer' : 'default';
        if (storedLink) img.addEventListener('click', ()=> { window.open(storedLink,'_blank'); });
        wrap.appendChild(img);
        aboutMedia.appendChild(wrap);
      } else if (storedLink) {
        const a = document.createElement('a');
        a.href = storedLink; a.target = '_blank'; a.textContent = storedLink;
        aboutMedia.appendChild(a);
      }
    } catch (e) { console.error(e); }
  }

  // ---- Save & reset settings ----
  safeAdd(saveSettings, 'click', ()=> {
    localStorage.setItem(LS_FONTS, JSON.stringify(fonts));
    localStorage.setItem(LS_STYLES, JSON.stringify(styles));
    localStorage.setItem(LS_TILBIS, JSON.stringify(tilbis));
    alert('تم حفظ الإعدادات محلياً');
    renderAdminLists();
  });
  safeAdd(resetSettings, 'click', ()=> {
    if (!confirm('استعادة القيم الافتراضي؟')) return;
    localStorage.removeItem(LS_FONTS); localStorage.removeItem(LS_STYLES); localStorage.removeItem(LS_APP_FONT);
    localStorage.removeItem(LS_BG_MAIN); localStorage.removeItem(LS_BG_FONTS); localStorage.removeItem(LS_BG_STYLES);
    localStorage.removeItem(LS_GRAD); localStorage.removeItem(LS_TILBIS); localStorage.removeItem(LS_ABOUT_IMG); localStorage.removeItem(LS_ABOUT_LINK);
    fonts = defaultFonts.slice(); styles = extraTopStyles.concat(defaultStyles); tilbis = [];
    renderFontOptions(); renderStyleOptions(); renderAdminLists(); renderTilbisThumbnails();
    alert('تمت الاستعادة');
    location.reload();
  });

  // ---- helper ----
  function exists(el) { return el !== null && typeof el !== 'undefined'; }

  // ---- initialize previews & initial population ----
  function populateInitial() {
    renderFontOptions();
    renderStyleOptions();
    renderAdminLists();
    renderTilbisThumbnails();
    populateAbout();
  }
  populateInitial();

  updateArabicPreview();
  updateStylePreview();

  // ---- ensure no uncaught errors: debug catch ----
  window.addEventListener('error', (e) => {
    console.error('JS Error captured:', e.message, e.filename, e.lineno);
  });

  // ---- export small utilities to console for debugging if needed ----
  window._app = { fonts, styles, tilbis, renderFontOptions, renderStyleOptions, renderAdminLists, generateDecorations };
  // === إصلاح شاشة الترحيب ===
window.addEventListener("load", () => {
  const splash = document.getElementById("splash");
  const startBtn = document.getElementById("splashStart");
  const adminBtn = document.getElementById("splashAdmin");

  if (startBtn && splash) {
    startBtn.addEventListener("click", () => splash.remove());
  }
  if (adminBtn && splash) {
    adminBtn.addEventListener("click", () => {
      splash.remove();
      const openAdmin = document.getElementById("openAdmin");
      if (openAdmin) openAdmin.click();
    });
  }
});
});


/* ----- injected: sidebar & admin password (do not remove) ----- */
(function(){
  try{
    function qs(id){return document.getElementById(id);}
    var side = qs('sidebar') || qs('sideMenu') || document.querySelector('.sidebar') || null;
    var toggle = qs('toggleSidebar') || qs('menuToggle') || qs('menu-toggle');
    var closeBtn = qs('closeSidebar') || qs('closeMenu') || document.querySelector('.close-x');
    if(toggle && side){
      toggle.addEventListener('click', function(){ side.classList.add('open'); document.body.classList.add('sidebar-open'); });
    }
    if(closeBtn && side){
      closeBtn.addEventListener('click', function(){ side.classList.remove('open'); document.body.classList.remove('sidebar-open'); });
    }
    document.querySelectorAll && document.querySelectorAll('#sidebar a, .sidebar-nav a, .side-menu a').forEach(function(a){
      a.addEventListener('click', function(){ if(side){ side.classList.remove('open'); document.body.classList.remove('sidebar-open'); } });
    });
  }catch(e){console && console.warn && console.warn('inject sidebar',e);}

  try{
    if(!window._injected_admin_pass){
      window._injected_admin_pass = true;
      var LS_ADMIN = 'app_admin_pass_v_final';
      var LS_LOGGED = 'app_admin_logged_v_final';
      var DEFAULT_ADMIN = 'asd321321';
      function getPass(){ try{ return localStorage.getItem(LS_ADMIN) || DEFAULT_ADMIN;}catch(e){return DEFAULT_ADMIN;} }
      function setPass(p){ try{ localStorage.setItem(LS_ADMIN,p); return true;}catch(e){return false;} }
      document.addEventListener('click', function(e){
        var t = e.target;
        if(t && t.id === 'adminLoginBtn'){
          var input = document.getElementById('adminPass') || document.querySelector('#adminModal input[type=password]');
          if(input){
            if(input.value === getPass()){
              try{ localStorage.setItem(LS_LOGGED,'1'); }catch(e){}
              var loginEl = document.getElementById('adminLogin'); if(loginEl) loginEl.style.display='none';
              var panelEl = document.getElementById('adminPanel'); if(panelEl) panelEl.style.display='block';
            } else { alert('كلمة المرور غير صحيحة'); }
          }
          e.preventDefault();
        }
        if(t && t.id === 'applyChangePass'){
          var oldP = document.getElementById('oldPass') ? document.getElementById('oldPass').value : '';
          var newP = document.getElementById('newPass') ? document.getElementById('newPass').value : '';
          var conf = document.getElementById('confirmPass') ? document.getElementById('confirmPass').value : '';
          if(!oldP || !newP || newP !== conf){ alert('تأكد من الحقول'); return; }
          if(oldP !== getPass()){ alert('كلمة المرور الحالية خاطئة'); return; }
          if(setPass(newP)){ alert('تم تغيير كلمة المرور'); try{ localStorage.setItem(LS_LOGGED,'1'); }catch(e){} }
        }
      }, true);
    }
  }catch(e){console && console.warn && console.warn('inject adminpass',e);}
})(); 
/* ----- end injected ----- */






