// script.js — النسخة النهائية المدمجة
// كلمة مرور لوحة التحكم الافتراضية: asd321321

document.addEventListener('DOMContentLoaded', () => {
  // ---- helpers ----
  const $ = id => document.getElementById(id);
  const q = sel => document.querySelector(sel);
  const safeAdd = (el, ev, fn) => { if (el) el.addEventListener(ev, fn); };

  // ---- Elements (existing + new) ----
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

  const newStyleName = $('newStyleName');
  const newStylePattern = $('newStylePattern');
  const addStyleBtn = $('addStyleBtn');
  const uploadStyleFile = $('uploadStyleFile');
  const adminStylesList = $('adminStylesList');

  const saveSettings = $('saveSettings');
  const resetSettings = $('resetSettings');

  // gradient controls (admin)
  const gradColor1 = $('gradColor1');
  const gradColor2 = $('gradColor2');
  const gradColor3 = $('gradColor3');
  const gradType = $('gradType');
  const applyGradientBtn = $('applyGradientBtn');
  const saveGradientBtn = $('saveGradientBtn');
  const gradPreview = $('gradPreview');

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

  const aslPresetsContainer = $('aslPresets');

  // popup inputs (reuse)
  const popupBgMain = $('popupBgMain');
  const popupBgMainInput = $('popupBgMainInput');
  const popupBgMainApply = $('popupBgMainApply');
  const popupBgMainClose = $('popupBgMainClose');

  // ---- Local storage keys ----
  const LS_FONTS = 'app_fonts_v1';
  const LS_STYLES = 'app_styles_v1';
  const LS_APP_FONT = 'app_font_v1';
  const LS_BG_MAIN = 'bg_main_v1';
  const LS_BG_FONTS = 'bg_fonts_v1';
  const LS_BG_STYLES = 'bg_styles_v1';
  const LS_GRAD_TYPE = 'app_grad_type_v1';
  const LS_GRAD_COLORS = 'app_grad_colors_v1';
  const LS_GRAD_PRESETS = 'app_grad_presets_v1';

  // ---- Default fonts & styles (keep your original lists) ----
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

  let fonts = JSON.parse(localStorage.getItem(LS_FONTS) || 'null') || defaultFonts.slice();
  let styles = JSON.parse(localStorage.getItem(LS_STYLES) || 'null') || [
    {id:'s1', label:'نجوم ✨', pattern:'✨ {txt} ✨'},
    {id:'s2', label:'قفص « »', pattern:'« {txt} »'},
    {id:'s3', label:'قلبان ❤️', pattern:'❤️ {txt} ❤️'},
    {id:'s4', label:'زخرفة مزدوجة', pattern:'★彡 {txt} 彡★'},
    {id:'s5', label:'مربعات ▢', pattern:'▢ {txt} ▢'},
    {id:'s6', label:'تاج ♛', pattern:'♛ {txt} ♛'},
    {id:'s7', label:'إطار 『 』', pattern:'『 {txt} 』'},
    {id:'s8', label:'شرائط —', pattern:'— {txt} —'},
    {id:'s9', label:'زهور ✿', pattern:'✿ {txt} ✿'},
    {id:'s10', label:'نجمة ✦', pattern:'✦ {txt} ✦'},
    {id:'s11', label:'قوس 〈〉', pattern:'〈 {txt} 〉'},
    {id:'s12', label:'محاط ⟪⟫', pattern:'⟪ {txt} ⟫'},
    {id:'s13', label:'زخرفة قديمة 𓆩', pattern:'𓆩 {txt} 𓆪'},
    {id:'s14', label:'متموج ~', pattern:'~ {txt} ~'},
    {id:'s15', label:'شراريب ≈', pattern:'≈ {txt} ≈'},
    {id:'s16', label:'قلب صغير ღ', pattern:'ღ {txt} ღ'},
    {id:'s17', label:'مميز ✪', pattern:'✪ {txt} ✪'},
    {id:'s18', label:'شرطات ⇝', pattern:'⇝ {txt} ⇜'},
    {id:'s19', label:'حافة ═', pattern:'═ {txt} ═'},
    {id:'s20', label:'فنّي ▣', pattern:'▣ {txt} ▣'}
  ];

  // ---- ensure fonts loaded ----
  function ensureFontLoaded(f) {
    if (!f || !f.url) return;
    const existing = Array.from(document.head.querySelectorAll('link')).some(l => l.href === f.url);
    if (!existing) {
      const l = document.createElement('link'); l.rel='stylesheet'; l.href=f.url; document.head.appendChild(l);
    }
  }
  fonts.forEach(ensureFontLoaded);

  // ---- render selectors ----
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

  function renderStyleOptions() {
    if (!styleSelector) return;
    styleSelector.innerHTML = '';
    styles.forEach(s => {
      const o = document.createElement('option'); o.value = s.id; o.textContent = s.label; styleSelector.appendChild(o);
    });
  }
  renderStyleOptions();

  function renderAdminLists() {
    if (adminFontsList) {
      adminFontsList.innerHTML = '';
      fonts.forEach((f,i) => {
        const div = document.createElement('div');
        div.className = 'admin-item';
        div.innerHTML = `<strong>${f.name}</strong> <button data-i="${i}" class="remove-font small">حذف</button>`;
        adminFontsList.appendChild(div);
      });
      adminFontsList.querySelectorAll('.remove-font').forEach(btn => {
        btn.addEventListener('click', () => {
          const i = Number(btn.dataset.i);
          if (confirm('حذف الخط نهائياً؟')) {
            fonts.splice(i,1);
            localStorage.setItem(LS_FONTS, JSON.stringify(fonts));
            renderFontOptions(); renderAdminLists();
          }
        });
      });
    }
    if (adminStylesList) {
      adminStylesList.innerHTML = '';
      styles.forEach((s,i) => {
        const div = document.createElement('div');
        div.className = 'admin-item';
        div.innerHTML = `<strong>${s.label}</strong> <button data-i="${i}" class="remove-style small">حذف</button>`;
        adminStylesList.appendChild(div);
      });
      adminStylesList.querySelectorAll('.remove-style').forEach(btn => {
        btn.addEventListener('click', () => {
          const i = Number(btn.dataset.i);
          if (confirm('حذف الستايل نهائياً؟')) {
            styles.splice(i,1);
            localStorage.setItem(LS_STYLES, JSON.stringify(styles));
            renderStyleOptions(); renderAdminLists();
          }
        });
      });
    }
  }
  renderAdminLists();

  // ---- Splash behavior ----
  safeAdd(splashStart, 'click', () => { if (splash) splash.style.display = 'none'; });
  safeAdd(splashAdmin, 'click', () => {
    if (splash) splash.style.display = 'none';
    if (adminModal) { adminModal.classList.add('show'); adminModal.setAttribute('aria-hidden','false'); }
  });
  setTimeout(()=> { if (splash && splash.style.display !== 'none') splash.style.display = 'none'; }, 6000);

  // ---- Sidebar open/close ----
  safeAdd(toggleSidebar, 'click', ()=> { if (sidebar) sidebar.classList.add('open'); });
  safeAdd(closeSidebar, 'click', ()=> { if (sidebar) sidebar.classList.remove('open'); });
  document.querySelectorAll('.sidebar-nav a').forEach(a => a.addEventListener('click', ()=> { if (sidebar) sidebar.classList.remove('open'); }));

  // ---- Admin modal open/close/login ----
  safeAdd(openAdmin, 'click', ()=> { if (adminModal) { adminModal.classList.add('show'); adminModal.setAttribute('aria-hidden','false'); } });
  safeAdd(closeAdmin, 'click', ()=> { if (adminModal) { adminModal.classList.remove('show'); adminModal.setAttribute('aria-hidden','true'); }});
  safeAdd(adminCancelBtn, 'click', ()=> { if (adminModal) { adminModal.classList.remove('show'); adminModal.setAttribute('aria-hidden','true'); }});

  safeAdd(adminLoginBtn, 'click', ()=> {
    const pass = adminPass ? adminPass.value : '';
    if (pass === 'asd321321') {
      if (adminLogin) adminLogin.style.display = 'none';
      if (adminPanel) adminPanel.style.display = 'block';
      renderAdminLists();
      loadSavedGradientToUI();
    } else alert('كلمة المرور غير صحيحة');
  });

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
    styles.push({id, label:name, pattern:pat});
    localStorage.setItem(LS_STYLES, JSON.stringify(styles));
    renderStyleOptions(); renderAdminLists();
    alert('تمت إضافة الستايل');
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
          arr.forEach((p,i) => { if (typeof p === 'string' && p.includes('{txt}')) styles.push({id:'imp-'+Date.now()+'-'+i,label:p.slice(0,40),pattern:p}); });
        } else {
          txt.split(/\r?\n/).map(l=>l.trim()).filter(Boolean).forEach((p,i)=> { if (p.includes('{txt}')) styles.push({id:'imp-'+Date.now()+'-'+i,label:p.slice(0,40),pattern:p}); });
        }
      } catch {
        txt.split(/\r?\n/).map(l=>l.trim()).filter(Boolean).forEach((p,i)=> { if (p.includes('{txt}')) styles.push({id:'imp-'+Date.now()+'-'+i,label:p.slice(0,40),pattern:p}); });
      }
      localStorage.setItem(LS_STYLES, JSON.stringify(styles));
      renderStyleOptions(); renderAdminLists();
      alert('تم استيراد الستايلات من الملف');
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

  // ---- Gradient helpers (compose gradient strings) ----
  function composeGradient(type, c1, c2, c3) {
    c1 = c1 || '#5b21b6'; c2 = c2 || '#2563eb'; c3 = c3 || '#10b981';
    switch(type) {
      case 'linear-135': return `linear-gradient(135deg, ${c1}, ${c2}, ${c3})`;
      case 'linear-90': return `linear-gradient(90deg, ${c1}, ${c2}, ${c3})`;
      case 'linear-45': return `linear-gradient(45deg, ${c1}, ${c2}, ${c3})`;
      case 'radial': return `radial-gradient(circle, ${c1}, ${c2}, ${c3})`;
      case 'conic': return `conic-gradient(from 180deg, ${c1}, ${c2}, ${c3})`;
      default: return `linear-gradient(135deg, ${c1}, ${c2}, ${c3})`;
    }
  }

  // load saved gradient from LS to UI
  function loadSavedGradientToUI(){
    const savedType = localStorage.getItem(LS_GRAD_TYPE) || 'linear-135';
    const savedColors = JSON.parse(localStorage.getItem(LS_GRAD_COLORS) || 'null') || ['#5b21b6','#2563eb','#10b981'];
    if (gradType) gradType.value = savedType;
    if (gradColor1) gradColor1.value = savedColors[0];
    if (gradColor2) gradColor2.value = savedColors[1];
    if (gradColor3) gradColor3.value = savedColors[2];
    updateGradPreview();
  }

  function updateGradPreview(){
    if (!gradPreview) return;
    const type = gradType ? gradType.value : 'linear-135';
    const c1 = gradColor1 ? gradColor1.value : '#5b21b6';
    const c2 = gradColor2 ? gradColor2.value : '#2563eb';
    const c3 = gradColor3 ? gradColor3.value : '#10b981';
    const g = composeGradient(type, c1, c2, c3);
    gradPreview.style.background = g;
    gradPreview.style.webkitBackgroundClip = 'border-box';
  }

  // apply gradient to previewFont based on admin or user selection
  function applyGradientToPreview(type, colors){
    if (!previewFont) return;
    const g = composeGradient(type, colors[0], colors[1], colors[2]);
    previewFont.style.background = g;
    previewFont.style.webkitBackgroundClip = 'text';
    previewFont.style.webkitTextFillColor = 'transparent';
  }

  // ---- ASL-like quick presets (applies gradient quickly) ----
  const aslPresets = [
    {id:'p1', label:'أرجواني • أزرق • أخضر', colors:['#5b21b6','#2563eb','#10b981'], type:'linear-135'},
    {id:'p2', label:'أحمر • برتقالي • أصفر', colors:['#ef4444','#f97316','#facc15'], type:'linear-135'},
    {id:'p3', label:'سماوي • بنفسجي', colors:['#0ea5e9','#6366f1','#8b5cf6'], type:'linear-90'},
    {id:'p4', label:'ترخواز • سماوي', colors:['#14b8a6','#22d3ee','#06b6d4'], type:'radial'},
    {id:'p5', label:'وردي • بنفسجي', colors:['#f43f5e','#ec4899','#8b5cf6'], type:'conic'}
  ];

  function renderASLPresets(){
    if (!aslPresetsContainer) return;
    aslPresetsContainer.innerHTML = '';
    aslPresets.forEach(p => {
      const b = document.createElement('button');
      b.className = 'btn btn-ghost';
      b.innerText = p.label;
      b.style.minWidth = 'auto';
      b.addEventListener('click', ()=> {
        // set UI to preset and apply
        if (gradColor1) gradColor1.value = p.colors[0];
        if (gradColor2) gradColor2.value = p.colors[1];
        if (gradColor3) gradColor3.value = p.colors[2];
        if (gradType) gradType.value = p.type;
        localStorage.setItem(LS_GRAD_TYPE, p.type);
        localStorage.setItem(LS_GRAD_COLORS, JSON.stringify(p.colors));
        if (useGradient) { if (!useGradient.checked) useGradient.checked = true; }
        applyGradientToPreview(p.type, p.colors);
      });
      // small color strip
      const span = document.createElement('span');
      span.style.display = 'inline-block';
      span.style.width='60px';
      span.style.height='22px';
      span.style.marginLeft='8px';
      span.style.borderRadius='6px';
      span.style.background = composeGradient(p.type, p.colors[0], p.colors[1], p.colors[2]);
      b.appendChild(span);
      aslPresetsContainer.appendChild(b);
    });
  }
  renderASLPresets();

  // ---- apply gradient buttons handlers ----
  safeAdd(applyGradientBtn, 'click', ()=> {
    const type = gradType ? gradType.value : 'linear-135';
    const colors = [gradColor1 ? gradColor1.value : '#5b21b6', gradColor2 ? gradColor2.value : '#2563eb', gradColor3 ? gradColor3.value : '#10b981'];
    localStorage.setItem(LS_GRAD_TYPE, type);
    localStorage.setItem(LS_GRAD_COLORS, JSON.stringify(colors));
    updateGradPreview();
    if (useGradient && useGradient.checked) applyGradientToPreview(type, colors);
    alert('تم تطبيق التدرج مؤقتاً');
  });

  safeAdd(saveGradientBtn, 'click', ()=> {
    const type = gradType ? gradType.value : 'linear-135';
    const colors = [gradColor1 ? gradColor1.value : '#5b21b6', gradColor2 ? gradColor2.value : '#2563eb', gradColor3 ? gradColor3.value : '#10b981'];
    // Save presets list (append)
    let presets = JSON.parse(localStorage.getItem(LS_GRAD_PRESETS) || 'null') || [];
    presets.push({id:'p'+Date.now(), type, colors, label: `${colors[0]} ${colors[1]} ${colors[2]}`});
    localStorage.setItem(LS_GRAD_PRESETS, JSON.stringify(presets));
    alert('تمت إضافة التدرج لقائمة الحفظ (محلياً)');
  });

  // ---- preview update functions (integrate gradient support) ----
  function updateArabicPreview() {
    if (!previewFont) return;
    const txt = (inputText && inputText.value) ? inputText.value : 'المعاينة هنا';
    previewFont.textContent = txt;
    const ff = (fontSelector && fontSelector.value) ? fontSelector.value : '';
    previewFont.style.fontFamily = ff || '';
    // priority: if useGradient checked -> use saved gradient; else use color
    const savedType = localStorage.getItem(LS_GRAD_TYPE);
    const savedColors = JSON.parse(localStorage.getItem(LS_GRAD_COLORS) || 'null');
    if (useGradient && useGradient.checked) {
      // if admin set gradient in UI apply that, else saved
      const type = (gradType && gradType.value) || savedType || 'linear-135';
      const colors = (gradColor1 && gradColor2 && gradColor3 && gradColor1.value && gradColor2.value && gradColor3.value) ? [gradColor1.value, gradColor2.value, gradColor3.value] : (savedColors || ['#5b21b6','#2563eb','#10b981']);
      applyGradientToPreview(type, colors);
    } else {
      previewFont.style.background = 'none';
      previewFont.style.webkitBackgroundClip = 'unset';
      previewFont.style.webkitTextFillColor = 'unset';
      previewFont.style.color = (fontColor && fontColor.value) ? fontColor.value : '#111';
    }
  }

  safeAdd(inputText, 'input', updateArabicPreview);
  safeAdd(fontSelector, 'change', updateArabicPreview);
  safeAdd(fontColor, 'input', updateArabicPreview);
  safeAdd(useGradient, 'change', updateArabicPreview);
  safeAdd(clearText, 'click', ()=> { if (inputText) inputText.value=''; updateArabicPreview(); });

  // ---- save preview as image ----
  safeAdd(saveImage, 'click', ()=> {
    if (!previewFont) return alert('لا توجد معاينة للحفظ');
    html2canvas(previewFont, {backgroundColor:null, scale:3}).then(canvas => {
      const a = document.createElement('a'); a.href = canvas.toDataURL('image/png'); a.download = 'preview.png'; a.click();
    }).catch(()=> alert('فشل إنشاء الصورة'));
  });

  // ---- styles behavior (name styles) ----
  function updateStylePreview() {
    if (!stylePreview) return;
    const txt = (nameInput && nameInput.value) ? nameInput.value : 'الاسم';
    const sel = (styleSelector && styleSelector.value) ? styleSelector.value : (styles[0] ? styles[0].id : '');
    const s = styles.find(x=>x.id===sel) || styles[0];
    if (!s) { stylePreview.textContent = txt; return; }
    stylePreview.textContent = s.pattern.replace('{txt}', txt);
  }
  safeAdd(nameInput, 'input', updateStylePreview);
  safeAdd(styleSelector, 'change', updateStylePreview);

  safeAdd(copyResult, 'click', ()=> {
    if (!stylePreview) return;
    navigator.clipboard.writeText(stylePreview.textContent).then(()=> alert('تم نسخ النص المزخرف')).catch(()=> alert('فشل النسخ'));
  });

  // long-press to copy (mobile)
  if (stylePreview) {
    let t = null;
    stylePreview.addEventListener('touchstart', ()=> {
      t = setTimeout(()=> { navigator.clipboard.writeText(stylePreview.textContent).then(()=> alert('تم النسخ (لمس طويل)')); }, 700);
    });
    stylePreview.addEventListener('touchend', ()=> { if (t) clearTimeout(t); });
  }

  // ---- Save & reset settings ----
  safeAdd(saveSettings, 'click', ()=> {
    localStorage.setItem(LS_FONTS, JSON.stringify(fonts));
    localStorage.setItem(LS_STYLES, JSON.stringify(styles));
    localStorage.setItem(LS_GRAD_TYPE, gradType ? gradType.value : 'linear-135');
    const colors = [gradColor1 ? gradColor1.value : '#5b21b6', gradColor2 ? gradColor2.value : '#2563eb', gradColor3 ? gradColor3.value : '#10b981'];
    localStorage.setItem(LS_GRAD_COLORS, JSON.stringify(colors));
    alert('تم حفظ الإعدادات محلياً');
    renderAdminLists();
  });
  safeAdd(resetSettings, 'click', ()=> {
    if (!confirm('استعادة القيم الافتراضية؟')) return;
    localStorage.removeItem(LS_FONTS); localStorage.removeItem(LS_STYLES); localStorage.removeItem(LS_APP_FONT);
    localStorage.removeItem(LS_GRAD_TYPE); localStorage.removeItem(LS_GRAD_COLORS);
    fonts = defaultFonts.slice(); styles = JSON.parse(JSON.stringify(styles)).slice(0,20);
    renderFontOptions(); renderStyleOptions(); renderAdminLists();
    alert('تمت الاستعادة');
    location.reload();
  });

  // ---- popup handlers (small) ----
  if (popupBgMain) {
    safeAdd(popupBgMainApply, 'click', ()=> {
      const v = popupBgMainInput ? popupBgMainInput.value.trim() : '';
      if (!v) return alert('ادخل لون HEX او رابط');
      if (v.startsWith('#')) document.body.style.background = v; else document.body.style.backgroundImage = `url(${v})`;
      localStorage.setItem(LS_BG_MAIN, v);
      if (popupBgMain) { popupBgMain.classList.remove('show'); popupBgMain.setAttribute('aria-hidden','true'); }
    });
    safeAdd(popupBgMainClose, 'click', ()=> { if (popupBgMain) { popupBgMain.classList.remove('show'); popupBgMain.setAttribute('aria-hidden','true'); }});
  }

  // ---- initialize previews & gradient UI ----
  function initAll(){
    renderFontOptions();
    renderStyleOptions();
    renderAdminLists();
    loadSavedGradientToUI();
    updateArabicPreview();
    updateStylePreview();
  }
  initAll();

  // update gradient preview whenever colors/type change
  if (gradColor1) safeAdd(gradColor1, 'input', updateGradPreview);
  if (gradColor2) safeAdd(gradColor2, 'input', updateGradPreview);
  if (gradColor3) safeAdd(gradColor3, 'input', updateGradPreview);
  if (gradType) safeAdd(gradType, 'change', updateGradPreview);

  // ---- helper to check existence ----
  function exists(el) { return el !== null && typeof el !== 'undefined'; }

  // ---- debug safety ----
  window.addEventListener('error', (e) => {
    console.error('JS Error captured:', e.message, e.filename, e.lineno);
  });

  // ---- export small utilities to console for debugging ----
  window._app = { fonts, styles, renderFontOptions, renderStyleOptions, renderAdminLists, composeGradient, applyGradientToPreview, renderASLPresets };

});