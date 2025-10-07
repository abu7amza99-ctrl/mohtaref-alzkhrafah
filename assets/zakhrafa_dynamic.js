// 🧹 تنظيف بيانات التخزين القديمة لمرة واحدة فقط
(function() {
  const resetKey = "cleanup_v2"; // غير الاسم لو بدك تجبر تنظيف جديد لاحقًا
  if (!localStorage.getItem(resetKey)) {
    localStorage.clear();
    localStorage.setItem(resetKey, "done");
    console.log("تم مسح بيانات التخزين القديمة لمرة واحدة ✅");
  }
})();
const dynamicStyles = [
  "• طۨہٰٰظۗـہٰٰجْۧ  ، ¦ 🌥❄️)،'",
  "⊰ طٰہٰٖظٰہٰٖجٰہٰٖ ،⁞ ²⁰⁰² 😻❤️⇣˓",
  "طِٰـﮧِۢظِٰـﮧِۢجِٰـﮧِۢ ⁞ ²⁰⁰¹ ⁽🌝🖤₎⇣℡",
  "⁽♔₎┋طُظهُجٍ ┋:",
  "• طَٰـُـٰٓظَٰـُـٰٓجَٰـُـٰٓ ⁞♩⁽♥️🌩₎⇣℡",
  "طـۘ❈ـۘظـۘ❈ـۘجـۘ❈ـۘ𝅘𝅥𝅯",
  "طٰہٰٖظٰہٰٖجٰہٰٖ𖤓",
  "ط͜ــ๋͜ـظــ๋͜ـ͜ــ๋͜ـج͜ــ๋͜ـ🌥💛 ؛",
  "طِـٰٚـِْ✮ِـٰٚـِْظِـٰٚـِْ✮ِـٰٚـِِْـٰٚـِْ✮ِـٰٚـِْجِـٰٚـِْ✮ِـٰٚـِْ🜫",
  "طٰہٰٖظٰہٰٖجٰہٰٖ❤️💸 ،",
  "طہظًجہ𖤓",
  "طۨہٰٰظۗـہٰٰجْۧ 𖥓"
];

// توزيع أحرف الاسم على ط، ظ، ج
function applyNameToDynamicStyles(name) {
  if (!name) return [];
  const letters = name.split('');
  const len = letters.length;

  return dynamicStyles.map(style => {
    let result = '';
    let count = 0;

    for (let ch of style) {
      if (ch === 'ط' || ch === 'ظ' || ch === 'ج') {
        // اختر الحرف المناسب من الاسم
        result += letters[count % len];
        count++;
      } else {
        result += ch;
      }
    }
    return result;
  });
}

if (typeof window !== "undefined") {
  window.applyNameToDynamicStyles = applyNameToDynamicStyles;

}
