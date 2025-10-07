// ---- Decoration generation & rendering (زخارف الأسماء) ----
function specialDynamicVariants(name) {
  const nm = (name || '').trim();
  const arr = [];
  if (!nm) return arr;

  // أمثلة زخارف ديناميكية تستبدل الاسم بأي نص يكتبه المستخدم
  arr.push(`★彡 ${nm} 彡★`);
  arr.push(`꧁༺ ${nm} ༻꧂`);
  arr.push(`✿ ${nm} ✿`);
  arr.push(`• ${nm} •`);
  arr.push(`☆ ${nm} ☆`);
  arr.push(`♡ ${nm} ♡`);
  arr.push(`✨ ${nm} ✨`);
  arr.push(`💫 ${nm} 💫`);
  arr.push(`『 ${nm} 』`);
  arr.push(`『★』${nm}『★』`);
  arr.push(`⚘ ${nm} ⚘`);
  arr.push(`꧁☬ ${nm} ☬꧂`);
  arr.push(`꧁𓊈𒆜 ${nm} 𒆜𓊉꧂`);
  arr.push(`꧁༒☬ ${nm} ☬༒꧂`);
  arr.push(`♛ ${nm} ♛`);
  arr.push(`✧ ${nm} ✧`);
  arr.push(`♜ ${nm} ♜`);
  arr.push(`🖤 ${nm} 🖤`);
  arr.push(`☁️ ${nm} ☁️`);
  arr.push(`❤️ ${nm} ❤️`);

  return arr;
}