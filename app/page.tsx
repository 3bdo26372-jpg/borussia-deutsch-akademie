"use client";

import { useMemo, useState } from "react";
import { questions, vocabulary, type Vocabulary } from "./course-data";

type Section = "home" | "questions" | "vocabulary";

const nav: { id: Section; label: string; de: string; icon: string }[] = [
  { id: "home", label: "Startseite", de: "Überblick", icon: "⌂" },
  { id: "questions", label: "Fragen", de: "Interview", icon: "?" },
  { id: "vocabulary", label: "Wortschatz", de: "Wörter", icon: "Aa" },
];

const questionCategories = ["ALLE", ...Array.from(new Set(questions.map((item) => item.category)))];
const vocabCategories = ["ALLE", ...Array.from(new Set(vocabulary.map((item) => item.category)))];
const categoryNames: Record<string, string> = {
  "التعريف بالنفس": "Vorstellung", "التعريف بالنفس · 3 دقائق": "Vorstellung · 3 Minuten", "الدافع": "Motivation", "الشركة": "Unternehmen",
  "الخبرة": "Erfahrung", "خدمة العملاء": "Kundenservice", "الضغط": "Stress", "نقاط القوة": "Stärken", "نقاط الضعف": "Schwächen",
  "الفريق": "Teamarbeit", "المستقبل": "Zukunft", "مواقف": "Situationen", "طلبات وشحن": "Bestellung & Versand", "مدفوعات": "Zahlungen",
  "التقنية": "Technik", "الوصف": "Beschreibung", "ألمانيا": "Deutschland", "قيم العمل": "Arbeitswerte", "أسئلة مفاجئة": "Überraschungsfragen",
  "المقابلة": "Interview", "عام": "Allgemein", "أساسيات": "Grundlagen", "شحن": "Versand", "قواعد": "Grammatik", "تواصل": "Kommunikation",
  "الطلبات والشحن": "Bestellungen & Versand", "الإرجاع والاستبدال": "Retoure & Umtausch", "الدفع والفواتير": "Zahlung & Rechnung",
  "الهاتف والدعم التقني": "Telefon & Technik", "المقابلة والعمل": "Interview & Arbeit", "B2 والحياة اليومية": "B2 & Alltag",
};
const categoryName = (value: string) => value === "ALLE" ? "Alle Kategorien" : (categoryNames[value] ?? "Kursthema");

async function speak(text: string) {
  if (typeof window === "undefined") return;
  const engine = (window as Window & { speechSynthesis?: SpeechSynthesis }).speechSynthesis;
  if (!engine) {
    window.alert("Die Sprachausgabe wird von diesem Browser nicht unterstützt.");
    return;
  }
  let voices = engine.getVoices();
  if (!voices.length) {
    await new Promise<void>((resolve) => {
      const timeout = window.setTimeout(resolve, 700);
      engine.addEventListener("voiceschanged", () => { window.clearTimeout(timeout); resolve(); }, { once: true });
    });
    voices = engine.getVoices();
  }
  const germanVoice = voices.find((voice) => voice.lang.toLowerCase() === "de-de")
    ?? voices.find((voice) => voice.lang.toLowerCase().startsWith("de"));
  if (!germanVoice) {
    window.alert("Auf diesem Gerät ist keine deutsche Stimme installiert.");
    return;
  }
  engine.cancel();
  const utterance = new SpeechSynthesisUtterance(text.replace(/\[[^\]]+\]/g, ""));
  utterance.lang = "de-DE";
  utterance.voice = germanVoice;
  utterance.rate = 0.88;
  utterance.pitch = 1;
  engine.speak(utterance);
}

function AudioButton({ text, label = "Aussprache anhören" }: { text: string; label?: string }) {
  return <button className="audio-button" onClick={(event) => { event.stopPropagation(); void speak(text); }} aria-label={label} title={label}>◖))</button>;
}

const coreLexicon: Record<string, string> = {
  der: "الـ", die: "الـ", das: "الـ", ein: "واحد", eine: "واحدة", einen: "واحد", einem: "لواحد", einer: "لواحدة",
  ich: "أنا", sie: "حضرتك", du: "أنت", wir: "نحن", ihr: "أنتم", er: "هو", mein: "خاصتي", meine: "خاصتي", meiner: "خاصتي", ihren: "خاصتك", ihre: "خاصتك", ihrem: "خاصتك", ihnen: "لهم", mich: "نفسي", sich: "نفسه",
  und: "و", oder: "أو", aber: "لكن", weil: "لأن", dass: "أن", wenn: "إذا", bevor: "قبل", danach: "بعدها", deshalb: "لذلك", trotzdem: "رغم ذلك", sondern: "بل", sowie: "وكذلك", obwohl: "رغم أن",
  in: "في", im: "في", an: "عند", am: "عند", auf: "على", aus: "من", bei: "لدى", mit: "مع", ohne: "بدون", für: "لأجل", von: "من", zu: "إلى", zum: "إلى", zur: "إلى", nach: "بعد", unter: "تحت", über: "عن", zwischen: "بين", durch: "عبر", gegen: "ضد", vor: "قبل",
  ist: "يكون", sind: "يكونون", bin: "أكون", war: "كان", habe: "لدي", haben: "لديهم", hat: "لديه", kann: "يستطيع", können: "يستطيعون", könnte: "يمكن", möchten: "يرغبون", möchte: "أرغب", würde: "سوف", werden: "يصبح", wurde: "أصبح", muss: "يجب", soll: "ينبغي",
  nicht: "ليس", keine: "لا توجد", kein: "لا يوجد", auch: "أيضًا", sehr: "جدًا", mehr: "أكثر", noch: "ما زال", schon: "بالفعل", nur: "فقط", immer: "دائمًا", zuerst: "أولًا", gleichzeitig: "بالتزامن", gemeinsam: "معًا", genau: "بالضبط", besonders: "خصوصًا", heute: "اليوم", jetzt: "الآن", gern: "بسرور", bitte: "من فضلك", danke: "شكرًا",
  guten: "سعيد", tag: "يوم", name: "اسم", person: "شخص", menschen: "أشخاص", kunde: "عميل", kunden: "عملاء", mitarbeiter: "موظف", kollege: "زميل", team: "فريق", unternehmen: "شركة", arbeit: "عمل", position: "وظيفة", beruflich: "مهنيًا", laufbahn: "مسيرة",
  deutsch: "الألمانية", deutsche: "ألمانية", sprache: "لغة", sprechen: "يتحدث", lernen: "يتعلم", gelernt: "تعلّم", lerne: "أتعلم", hören: "يسمع", höre: "أسمع", aussprache: "نطق", wort: "كلمة", wortschatz: "مفردات", frage: "سؤال", fragen: "أسئلة", antwort: "إجابة", beispiel: "مثال",
  arbeiten: "يعمل", arbeite: "أعمل", arbeitet: "يعمل", aufgabe: "مهمة", aufgaben: "مهام", verantwortung: "مسؤولية", erfahrung: "خبرة", fähigkeit: "مهارة", fähigkeiten: "مهارات", stärke: "قوة", stärken: "نقاط قوة", schwäche: "ضعف", ziel: "هدف", ziele: "أهداف", leistung: "أداء", ergebnisse: "نتائج", feedback: "ملاحظات",
  motiviert: "متحفز", motivation: "دافع", freundlich: "ودود", zuverlässig: "موثوق", lernbereit: "مستعد للتعلم", ruhig: "هادئ", klar: "واضح", respektvoll: "محترم", sorgfältig: "دقيق", hilfsbereit: "متعاون", offen: "منفتح", flexibel: "مرن", geduldig: "صبور", belastbar: "يتحمل الضغط", selbstständig: "مستقل", professionell: "احترافي", vollständig: "كامل", wichtig: "مهم", sicher: "واثق", schnell: "سريع", langfristig: "طويل الأجل", realistisch: "واقعي", nachvollziehbar: "مفهوم", strukturiert: "منظم",
  vorstellen: "يعرّف", ausführlich: "بالتفصيل", einladung: "دعوة", gespräch: "محادثة", freue: "يسعد", dürfen: "يُسمح", angehen: "يتعامل", übernehmen: "يتحمل", bleiben: "يبقى", interessiert: "يهتم", aufmerksam: "بانتباه", gezielt: "محدد", versuchen: "يحاول", versuche: "أحاول", verstehen: "يفهم", lösung: "حل", anbiete: "أقدم", wissen: "يعرف", weiß: "أعرف", erfinde: "يخترع", prüfen: "يراجع", prüfe: "أراجع", information: "معلومة", informationen: "معلومات", stelle: "جهة", melde: "أتواصل", verlässlich: "موثوق", arbeitsweise: "أسلوب عمل", meinung: "رأي", kundenservice: "خدمة العملاء",
  lernbereitschaft: "استعداد للتعلم", neue: "جديدة", systeme: "أنظمة", problem: "مشكلة", chance: "فرصة", erweitern: "يوسّع", prioritäten: "أولويات", setzen: "يحدد", mehrere: "متعددة", dringlichkeit: "أولوية", schritt: "خطوة", dokumentiere: "أوثّق", kommunikation: "تواصل", nutzen: "يستخدم", deutschsprachigen: "ناطقين بالألمانية", kommunizieren: "يتواصل", regelmäßig: "بانتظام", inhalte: "محتوى", trainiere: "أتدرّب", typische: "معتادة", bewusst: "بوعي", prozess: "عملية", konsequent: "ملتزم", fehler: "خطأ", ausgeschriebenen: "معلنة", verbindung: "ارتباط", problemlösung: "حل المشكلات", ernst: "بجدية", anliegen: "طلب", anbieten: "يقدم", umfeld: "بيئة", zusammenarbeit: "تعاون", weiterentwicklung: "تطور", einzuarbeiten: "يتأقلم", unterstützen: "يدعم", zusammenfassend: "باختصار", geduld: "صبر", haltung: "نهج", eigenschaften: "صفات", einzusetzen: "يستخدم",
  wo: "أين", wie: "كيف", warum: "لماذا", was: "ماذا", welche: "أي", wer: "من", wann: "متى", woher: "من أين", kurz: "باختصار", lang: "طويل", fünf: "خمسة", jahr: "سنة", jahren: "سنوات",
  "3": "ثلاثة", ca: "تقريبًا", beschreiben: "يصف", call: "مكالمة", center: "مركز", dialekt: "لهجة", euro: "يورو", familie: "عائلة", flexibilität: "مرونة", handy: "هاتف محمول", klingelton: "نغمة الرنين", medien: "وسائل إعلام", million: "مليون", minuten: "دقائق", "online-kaufs": "الشراء عبر الإنترنت", sms: "رسالة نصية", stadt: "مدينة", superkraft: "قوة خارقة", "telefon-": "هاتف", urlaub: "إجازة", "vor-": "مزايا", vorgesetzter: "مدير", worauf: "على ماذا",
  abgelehnt: "مرفوض", akzeptiert: "مقبول", allein: "بمفرده", anderen: "أخرى", bedeutet: "يعني", befördert: "تمت ترقيته", behandelt: "يعامل", beleidigt: "يهين", beworben: "تقدّم", den: "الـ", des: "للـ", dieses: "هذه", entschieden: "قرّر", erhalten: "استلم", falsche: "خاطئة", fehlt: "مفقود", gehen: "يتعامل", gelöst: "حلّ", gemacht: "فعل", größter: "الأكبر", guter: "جيد", kennen: "يعرف", letzten: "الماضية", lieber: "يفضّل", machen: "يفعل", man: "المرء", nennen: "يذكر", reagieren: "يتفاعل", reisen: "يسافر", schicken: "يرسل", schreit: "يصرخ", schwierigen: "صعب", sehen: "يرى", sollten: "ينبغي", soziale: "اجتماعية", spricht: "يتحدث", trotz: "رغم", tun: "يفعل", um: "حول", ungerecht: "ظالم", uns: "لنا", unser: "خاصتنا", verzichten: "يستغني", wird: "يصبح", wählen: "يختار", ändern: "يغيّر",
  abläufe: "إجراءات", außerdem: "بالإضافة إلى ذلك", dabei: "أثناء ذلك", dafür: "لذلك", dank: "بفضل", diese: "هذه", mir: "لي", situation: "موقف", situationen: "مواقف", stattdessen: "بدلًا من ذلك", vielen: "كثير", achte: "أنتبه", als: "بصفتي", anspruchsvollen: "صعبة", anstehen: "قيد الانتظار", bisherigen: "السابقة", bleibe: "أبقى", bringe: "أجلب", darauf: "على ذلك", dem: "الـ", diesem: "هذا", erweitere: "أوسّع", es: "هو", etwas: "شيء", größten: "الأكبر", gut: "جيد", gute: "جيدة", jedem: "كل", kontinuierlich: "باستمرار", nehmen: "يأخذ", ordne: "أرتّب", passt: "يناسب", richtigen: "الصحيح", sehe: "أرى", suche: "أبحث", weiterzuentwickeln: "للتطوير أكثر", zurück: "للخلف", übe: "أتدرّب",
  absage: "رفض", alltag: "الحياة اليومية", anschließend: "بعد ذلك", aufwand: "مجهود", aussagen: "تصريحات", auswahl: "اختيار", balance: "توازن", bedarf: "حاجة", beide: "كلاهما", beides: "كلا الأمرين", beitrag: "مساهمة", beleidigungen: "إهانات", bildschirm: "شاشة", bildschirmzeit: "وقت الشاشة", branche: "مجال", chat: "دردشة", damit: "بذلك", dann: "ثم", daten: "بيانات", datum: "تاريخ", details: "تفاصيل", "e-mail": "بريد إلكتروني", "e-mails": "رسائل بريد إلكتروني", einstellungen: "إعدادات", ende: "نهاية", energie: "طاقة", ergebnis: "نتيجة", eskalationsregel: "قاعدة التصعيد", essen: "طعام", fakten: "حقائق", fotos: "صور", freunden: "أصدقاء", früher: "سابقًا", fällen: "حالات", geben: "يعطي", gelegenheit: "فرصة", grenze: "حد", grund: "سبب", grundlage: "أساس", hilfe: "مساعدة", it: "تقنية المعلومات", ideen: "أفكار", innovation: "ابتكار", institut: "معهد", ja: "نعم", kamera: "كاميرا", kompetenzen: "كفاءات", kontakt: "تواصل", kurse: "دورات", lassen: "يدع", "lern-": "تعلم", lernpartnern: "شركاء تعلم", lieferfrist: "موعد التسليم", lärm: "ضوضاء", lücken: "نقاط نقص", manchmal: "أحيانًا", merkmal: "صفة", mischung: "مزيج", missverständnisse: "سوء فهم", modell: "نموذج", möglichkeiten: "إمكانيات", nachricht: "رسالة", "nachrichten-app": "تطبيق الرسائل", nummer: "رقم", nutzung: "استخدام", nächstes: "التالي", nähe: "قرب", "online-kauf": "شراء عبر الإنترنت", perspektive: "وجهة نظر", persönliche: "شخصية", plan: "خطة", podcasts: "بودكاست", praxis: "ممارسة", produkte: "منتجات", projekt: "مشروع", projekte: "مشروعات", punkt: "نقطة", punkte: "نقاط", qualität: "جودة", quelle: "مصدر", referenznummer: "رقم مرجعي", regeln: "قواعد", reise: "رحلة", rolle: "دور", ruf: "سمعة", rückschlägen: "انتكاسات", sache: "أمر", schaden: "ضرر", seiten: "صفحات", senden: "يرسل", sensible: "حساسة", so: "هكذا", sobald: "بمجرد أن", sorgfalt: "عناية", speicherplatz: "مساحة تخزين", sprachpraxis: "ممارسة اللغة", stabilität: "استقرار", status: "حالة", stimme: "صوت", streit: "شجار", studium: "دراسة جامعية", städte: "مدن", teamleitung: "قيادة الفريق", teil: "جزء", telefon: "هاتف", text: "نص", thema: "موضوع", ton: "نبرة", töne: "نغمات", umgang: "تعامل", vergleich: "مقارنة", versuch: "محاولة", videos: "فيديوهات", vorwürfe: "اتهامات", weiterbildung: "تدريب متقدم", werte: "قيم", wochen: "أسابيع", wochenende: "عطلة نهاية الأسبوع", woran: "بماذا", zeit: "وقت", zeitgrenzen: "حدود زمنية", zusagen: "موافقات", zusätzlich: "إضافيًا", anzahl: "عدد", firmenname: "اسم الشركة", marke: "علامة تجارية", niveau: "مستوى", ort: "مكان", service: "خدمة", universität: "جامعة", verkehr: "مرور", konkreter: "أكثر تحديدًا", groß: "كبير",
  ab: "ابتداءً من", alle: "الكل", andere: "أخرى", angemessenen: "مناسبة", anspruchsvoll: "صعب", anstrengend: "مرهق", anzupassen: "للتكيّف", atme: "أتنفس", ausreden: "يكمل كلامه", beeinflussen: "يؤثر", behalte: "أحتفظ", beiden: "كليهما", beim: "عند", bekam: "حصل", bekannt: "معروف", bekommen: "يحصل", bequem: "مريح", bereits: "بالفعل", besonderen: "خاص", besser: "أفضل", bestätige: "أؤكد", bestätigt: "مؤكد", besucht: "زار", betont: "مؤكد", biete: "أقدّم", bietet: "يقدّم", daran: "في ذلك", derselbe: "نفسه", deutlich: "واضح", direkt: "مباشر", direkte: "مباشرة", drücken: "يضغط", echten: "حقيقي", effizienter: "أكثر كفاءة", ehrlich: "صادق", einander: "بعضهم بعضًا", einige: "بعض", entschuldige: "أعتذر", entschuldigte: "اعتذر", entsteht: "ينشأ", entwickeln: "يطوّر", erfahrener: "أكثر خبرة", erholt: "مرتاح", erhält: "يحصل", erkläre: "أشرح", erklärt: "يشرح", erklärte: "شرح", erleben: "يختبر", erledigen: "ينجز", erleichtern: "يسهّل", ermöglicht: "يتيح", erreiche: "أصل", erste: "الأولى", ersten: "الأول", erwartet: "متوقع", eröffnet: "افتتح", fachlichen: "تخصصية", faire: "عادلة", falls: "في حال", fasse: "ألخّص", festen: "ثابتة", finde: "أجد", finden: "يجد", folge: "أتبع", formuliere: "أصوغ", freigegebenen: "المعتمدة", früh: "مبكر", fühlen: "يشعر", führe: "أدير", gemäß: "وفقًا لـ", genommen: "مأخوذ", genug: "كافٍ", gibt: "يوجد", gleiche: "نفس", gratuliere: "أهنئ", große: "كبيرة", großen: "كبير", größere: "أكبر", handeln: "يتصرف", helfen: "يساعد", hilft: "يساعد", hängt: "يعتمد", häufig: "غالبًا", höflich: "مهذب", hörte: "سمع", ihm: "له", ihn: "إياه", informiere: "أُبلغ", informiert: "مُبلّغ", interessant: "مثير للاهتمام", interessiere: "أهتم", interessieren: "يهتم", intern: "داخليًا", internationalen: "دولي", investieren: "يستثمر", investiert: "استثمر", jede: "كل", jederzeit: "في أي وقت", jedoch: "لكن", kleines: "صغير", komme: "آتي", kommuniziere: "أتواصل", konkrete: "محددة", konkreten: "محدد", konstruktives: "بنّاء", konzentriere: "أركز", konzentriert: "مركز", korrigiere: "أصحّح", kostenloses: "مجاني",
  langsamer: "أبطأ", lasse: "أدع", lebe: "أعيش", lebendig: "نابض بالحياة", legt: "يضع", leisten: "ينجز", leitete: "قاد", liebevollen: "محب", lokales: "محلي", länger: "أطول", löse: "أحل", lösen: "يحل", mache: "أفعل", mag: "أحب", messen: "يقيس", motivieren: "يحفّز", musste: "اضطر", möglich: "ممكن", nehme: "آخذ", nenne: "أذكر", nutze: "أستخدم", nächste: "التالية", nächsten: "التالي", ob: "ما إذا", oft: "غالبًا", passe: "أتكيّف", passen: "يناسب", passende: "مناسبة", passiert: "حدث", persönlich: "شخصيًا", persönlicher: "شخصي", plane: "أخطط", praktikablen: "عملي", praktische: "عملية", priorisiere: "أرتب حسب الأولوية", probiert: "جرّب", prüfte: "راجع", recherchiere: "أبحث", rechtzeitig: "في الوقت المناسب", richtig: "صحيح", sachlich: "بموضوعية", sachliches: "موضوعي", sage: "أقول", sammeln: "يجمع", schaue: "أنظر", schildere: "أصف", schlage: "أقترح", schreiben: "يكتب", schriftlich: "كتابيًا", schwierige: "صعبة", schütze: "أحمي", sein: "يكون", seine: "خاصته", setze: "أضع", sichtbare: "مرئية", sieht: "يرى", sinnvoll: "مفيد", spenden: "يتبرع", spielt: "يلعب", spreche: "أتحدث", spät: "متأخر", stark: "قوي", statt: "بدلًا من", stehe: "أقف", storniere: "ألغي", ständiger: "مستمر", tanken: "يتزوّد بالوقود", tausche: "أستبدل", transparent: "شفاف", trenne: "أفصل", täglicher: "يومي", tätig: "عامل", unnötig: "غير ضروري", unnötige: "غير ضرورية", veranlasse: "أرتّب", verbessern: "يحسّن", verbinden: "يربط", verbindet: "يربط", verbucht: "مسجّل", verlieren: "يفقد", vermeide: "أتجنب", vermeiden: "يتجنب", vermieden: "تم تجنبه", verschweigen: "يخفي", verstanden: "مفهوم", verstehe: "أفهم", verständlich: "مفهوم", vertrauliche: "سرية", verursachen: "يسبب", verwendeten: "المستخدمة", viel: "كثير", wachsen: "ينمو", wartete: "انتظر", wegen: "بسبب", weiteren: "إضافي", weiterqualifizieren: "يواصل التأهل", werde: "سوف", wiederhole: "أكرر", will: "يريد", wäre: "سيكون", zeige: "أُظهر", zusammen: "معًا", änderungen: "تغييرات", ärger: "غضب", äußerung: "عبارة", öffnen: "يفتح", übungsplan: "خطة تدريب", ärgerlich: "مزعج", überlege: "أفكر", übermäßige: "مفرطة", übernehme: "أتولى", übertragen: "ينقل", überwinden: "يتغلب",
  bewerber: "متقدم للوظيفة", eigenschaft: "صفة", interviewer: "المحاور", moment: "لحظة", ticket: "تذكرة", vorgang: "إجراء", bezahlt: "مدفوع", brauche: "أحتاج", darum: "حول ذلك", dazu: "لذلك", funktioniert: "يعمل", kaputt: "معطّل", kümmere: "أهتم", leite: "أحوّل", praktisch: "عملي", sofort: "فورًا", sowohl: "كلاهما", weiter: "إلى الأمام",
  bestellen: "يطلب", bestellung: "طلب", artikel: "منتج", ware: "بضاعة", paket: "طرد", lieferung: "توصيل", versand: "شحن", retoure: "مرتجع", rücksendung: "إرجاع", ersatz: "بديل", erstattung: "استرداد", rückerstattung: "استرداد", zahlung: "دفع", rechnung: "فاتورة", mahnung: "مطالبة", betrag: "مبلغ", abbuchung: "خصم", beschädigt: "تالف", defekt: "معطّل", verspätet: "متأخر", fehlermeldung: "رسالة خطأ", system: "نظام", technik: "تقنية", technische: "تقنية", support: "دعم", datenschutz: "حماية البيانات",
  beschwerde: "شكوى", reklamation: "شكوى", lösungsorientiert: "يركز على الحل", zufrieden: "راضٍ", kundenzufriedenheit: "رضا العملاء", stress: "ضغط", druck: "ضغط", kritik: "نقد", konflikt: "خلاف", konflikten: "خلافات", loyalität: "ولاء", vertrauen: "ثقة", zukunft: "مستقبل", erfolg: "نجاح", herausforderung: "تحدي", bewerbung: "تقديم وظيفة", bewerben: "يتقدم", lebenslauf: "سيرة ذاتية", berufserfahrung: "خبرة مهنية", gehalt: "راتب", traumjob: "وظيفة الأحلام",
};

const vocabularyTokenTranslations = new Map<string, string>();
for (const entry of vocabulary) {
  vocabularyTokenTranslations.set(entry.word.toLocaleLowerCase("de-DE"), entry.arabic);
  const lexicalTokens = (entry.word.match(/[\p{L}\p{N}-]+/gu) ?? [])
    .map((token) => token.toLocaleLowerCase("de-DE"))
    .filter((token) => !["der", "die", "das", "sich"].includes(token));
  if (lexicalTokens.length === 1 && !coreLexicon[lexicalTokens[0]]) {
    vocabularyTokenTranslations.set(lexicalTokens[0], entry.arabic);
  }
}

function wordMeaning(word: string) {
  const normalized = word.replace(/^\[|\]$/g, "").toLocaleLowerCase("de-DE");
  const direct = coreLexicon[normalized] ?? vocabularyTokenTranslations.get(normalized);
  if (direct) return direct;
  const candidates = [normalized.replace(/(en|ern|eln)$/u, ""), normalized.replace(/(e|er|es|em|n|s|t)$/u, "")];
  for (const candidate of candidates) {
    const found = coreLexicon[candidate] ?? vocabularyTokenTranslations.get(candidate);
    if (found) return found;
  }
  const compound = Object.keys(coreLexicon).find((key) => key.length >= 5 && normalized.includes(key));
  return compound ? coreLexicon[compound] : "المعنى غير متاح";
}

function GermanText({ children, className = "" }: { children: string; className?: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const tokens = children.match(/[\p{L}\p{N}\[\]-]+|[^\p{L}\p{N}\[\]-]+/gu) ?? [children];
  return <span className={`hover-translation ${className}`}>
    {tokens.map((token, index) => {
      if (!/[\p{L}\p{N}]/u.test(token)) return <span key={index}>{token}</span>;
      const meaning = wordMeaning(token);
      return <span key={`${token}-${index}`} className={`touch-word ${open === index ? "tooltip-open" : ""}`} tabIndex={0}
        data-translation-status={meaning === "المعنى غير متاح" ? "missing" : "ready"}
        onClick={(event) => {
          event.stopPropagation();
          if (event.target !== event.currentTarget) return;
          setOpen(open === index ? null : index);
        }}
        onKeyDown={(event) => { if (event.key === "Escape") setOpen(null); }}>
        {token}
        <span className="hover-tooltip word-menu" role="dialog" aria-label={`${token} Wortoptionen`}>
          <strong className="selected-word" dir="ltr">{token}</strong>
          <span className="word-menu-actions">
            <label className="translation-option" onClick={(event) => event.stopPropagation()}>
              <input type="checkbox" />
              <span className="translation-option-label">Übersetzen</span>
              <span className="single-word-meaning" lang="ar" dir="rtl">{meaning}</span>
            </label>
            <button onPointerDown={(event) => event.preventDefault()} onClick={(event) => { event.stopPropagation(); void speak(token); }}>Anhören ◖))</button>
          </span>
        </span>
      </span>;
    })}
  </span>;
}

export default function Home() {
  const [section, setSection] = useState<Section>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedWord, setSelectedWord] = useState<Vocabulary | null>(null);
  const changeSection = (next: Section) => { setSection(next); setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return <div className="app-shell" dir="ltr">
    <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
      <button className="close-menu" onClick={() => setMenuOpen(false)} aria-label="Menü schließen">×</button>
      <div className="brand-block"><div className="brand-mark"><span>B</span><b>DA</b></div><div><strong>BORUSSIA</strong><small>DEUTSCH AKADEMIE</small></div></div>
      <nav className="main-nav" aria-label="Bereiche der Akademie">{nav.map((item) => <button key={item.id} className={section === item.id ? "active" : ""} onClick={() => changeSection(item.id)}><span className="nav-icon">{item.icon}</span><span><b>{item.label}</b><small>{item.de}</small></span></button>)}</nav>
      <div className="sidebar-tip"><span>!</span><p>Wort antippen: Übersetzen oder mit deutscher Stimme anhören.</p></div>
    </aside>
    {menuOpen && <button className="menu-backdrop" onClick={() => setMenuOpen(false)} aria-label="Schließen" />}
    <main className="main-content">
      <header className="topbar"><button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Menü öffnen">☰</button><div className="mobile-brand"><span>BDA</span><b>Deutsch Akademie</b></div><div className="topbar-actions"><span className="level-pill">B1 → B2</span><button className="search-jump" onClick={() => changeSection("vocabulary")}>⌕ <span>Wortschatz durchsuchen</span></button></div></header>
      {section === "home" && <HomeSection onNavigate={changeSection} />}
      {section === "questions" && <QuestionsSection />}
      {section === "vocabulary" && <VocabularySection onSelect={setSelectedWord} />}
      <footer><span className="flag-line" /><p>Borussia Deutsch Akademie · Fragen und Wortschatz</p></footer>
      <nav className="mobile-bottom-nav compact-nav" aria-label="Schnellnavigation">{nav.map((item) => <button key={item.id} className={section === item.id ? "active" : ""} onClick={() => changeSection(item.id)}><span>{item.icon}</span><small>{item.label}</small></button>)}</nav>
    </main>
    {selectedWord && <WordModal word={selectedWord} onClose={() => setSelectedWord(null)} />}
  </div>;
}

function HomeSection({ onNavigate }: { onNavigate: (section: Section) => void }) {
  return <div className="page home-page">
    <section className="hero simplified-hero"><div className="hero-copy"><div className="eyebrow"><i /> DEIN INTERVIEW-TRAINING</div><h1>Fragen verstehen.<br/><em>Wörter beherrschen.</em></h1><p>Konzentriertes Deutschtraining mit Interviewfragen, flexiblen Musterantworten und interaktivem Wortschatz.</p><div className="hero-actions"><button className="primary-button" onClick={() => onNavigate("questions")}>Fragen öffnen <span>←</span></button><button className="ghost-button" onClick={() => onNavigate("vocabulary")}>Wortschatz öffnen</button></div><div className="hero-note">Jedes Lernwort bietet zwei Optionen: Übersetzen oder auf Deutsch anhören.</div></div><div className="hero-visual" aria-hidden="true"><div className="stadium-lines"/><div className="hero-score"><small>DEUTSCH</small><strong>B2</strong><span>INTERVIEW READY</span></div><div className="german-bars"><i/><i/><i/></div></div></section>
    <section className="stats-grid two-stats"><div><strong>{questions.length}</strong><span>Fragen mit Antworten</span><small>INTERVIEWFRAGEN</small></div><div><strong>{vocabulary.length}</strong><span>Interaktive Wörter</span><small>WORTSCHATZ</small></div></section>
    <section className="focus-grid"><button onClick={() => onNavigate("questions")}><span>?</span><div><small>FRAGENBANK</small><h2>Interviewfragen trainieren</h2><p>Antworten öffnen, jedes Wort einzeln übersetzen oder anhören.</p></div><b>←</b></button><button onClick={() => onNavigate("vocabulary")}><span>Aa</span><div><small>WORTSCHATZ</small><h2>Wörter sicher lernen</h2><p>Bedeutung, Beispiel und echte Gesprächssituation.</p></div><b>←</b></button></section>
  </div>;
}

function PageIntro({ kicker, title, text, count }: { kicker: string; title: string; text: string; count: string }) {
  return <div className="page-intro"><div><small>{kicker}</small><h1>{title}</h1><p>{text}</p></div><strong>{count}</strong></div>;
}

function QuestionsSection() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALLE");
  const [level, setLevel] = useState("ALLE");
  const [open, setOpen] = useState<number | null>(null);
  const filtered = useMemo(() => questions.filter((item) => (category === "ALLE" || item.category === category) && (level === "ALLE" || item.level === level) && `${item.qDe} ${item.qAr}`.toLowerCase().includes(search.toLowerCase())), [search, category, level]);
  return <div className="page"><PageIntro kicker="FRAGENBANK" title="Interviewfragen" text="Wort antippen und dann Übersetzen oder Anhören wählen. Die Übersetzung gilt immer nur für das ausgewählte Wort." count={`${filtered.length}`} />
    <div className="filter-bar"><label className="search-field">⌕<input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Frage durchsuchen..." /></label><select value={category} onChange={(event) => setCategory(event.target.value)}>{questionCategories.map((item) => <option key={item} value={item}>{categoryName(item)}</option>)}</select><select value={level} onChange={(event) => setLevel(event.target.value)}><option value="ALLE">Alle Niveaus</option><option>B1</option><option>B2</option></select></div>
    <div className="questions-list">{filtered.map((item) => <article className={`question-card ${open === item.id ? "open" : ""}`} key={item.id}>
      <div className="question-head"><span className="question-index">{String(item.id).padStart(2,"0")}</span><div><small>{categoryName(item.category)} · {item.level}</small><h2 className="de" dir="ltr"><GermanText>{item.qDe}</GermanText></h2></div><button className="expand-button" onClick={() => setOpen(open === item.id ? null : item.id)} aria-label={open === item.id ? "Antwort schließen" : "Antwort öffnen"}>{open === item.id ? "−" : "+"}</button></div>
      {open === item.id && <div className="question-body"><div className="answer-label"><span>MUSTERANTWORT</span><AudioButton text={`${item.qDe}. ${item.answerDe}`} /></div><p className="answer-de de" dir="ltr"><GermanText>{item.answerDe}</GermanText></p>{item.personalize && <div className="personalize-tip"><span>✎</span><p><b>Personalisieren:</b> Ersetze nur Angaben in eckigen Klammern und sprich mit natürlichen Pausen.</p></div>}</div>}
    </article>)}{!filtered.length && <div className="empty-state">Keine Ergebnisse. Ändere den Suchbegriff oder die Filter.</div>}</div>
  </div>;
}

function VocabularySection({ onSelect }: { onSelect: (word: Vocabulary) => void }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALLE");
  const filtered = useMemo(() => vocabulary.filter((item) => (category === "ALLE" || item.category === category) && `${item.word} ${item.arabic}`.toLowerCase().includes(search.toLowerCase())), [search, category]);
  return <div className="page"><PageIntro kicker="DEIN WORTSCHATZ" title="Kurswörterbuch" text="Wort antippen und zwischen Übersetzen und Anhören wählen. Details öffnen für Beispiel und Gesprächssituation." count={`${filtered.length}`} />
    <div className="filter-bar"><label className="search-field">⌕<input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Wort suchen..." /></label><select value={category} onChange={(event) => setCategory(event.target.value)}>{vocabCategories.map((item) => <option key={item} value={item}>{categoryName(item)}</option>)}</select></div>
    <div className="vocab-grid">{filtered.map((word) => <article key={word.id} className="word-card"><span>{word.type}</span><h2 className="de" dir="ltr"><GermanText>{word.word}</GermanText></h2><button className="word-details-button" onClick={() => onSelect(word)}>Details öffnen ←</button></article>)}</div>
  </div>;
}

function WordModal({ word, onClose }: { word: Vocabulary; onClose: () => void }) {
  return <div className="modal-backdrop" onClick={onClose}><article className="word-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={onClose}>×</button>
    <div className="word-modal-head"><span>{word.type} · {categoryName(word.category)}</span><div><h1 className="de" dir="ltr"><GermanText>{word.word}</GermanText></h1><AudioButton text={word.word}/></div></div>
    <section><small>BEISPIEL</small><div className="example-box"><div><p className="de" dir="ltr"><GermanText>{word.exampleDe}</GermanText></p><AudioButton text={word.exampleDe}/></div></div></section>
    <section><small>IM GESPRÄCH</small><div className="situation-box"><p className="de" dir="ltr"><GermanText>{word.situationDe}</GermanText></p><AudioButton text={word.situationDe} label="Situation anhören"/></div></section>
    <button className="complete-button" onClick={onClose}>Wort schließen ✓</button>
  </article></div>;
}
