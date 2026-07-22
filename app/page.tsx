"use client";

import { useMemo, useState } from "react";
import { lessons, questions, scenarios, vocabulary, type Lesson, type Vocabulary } from "./course-data";

type Section = "home" | "course" | "questions" | "vocabulary" | "situations" | "practice";

const nav: { id: Section; label: string; de: string; icon: string }[] = [
  { id: "home", label: "Startseite", de: "Überblick", icon: "⌂" },
  { id: "course", label: "Lektionen", de: "Kurs", icon: "▤" },
  { id: "questions", label: "Fragen", de: "Interview", icon: "?" },
  { id: "vocabulary", label: "Wortschatz", de: "Wörter", icon: "Aa" },
  { id: "situations", label: "Dialoge", de: "Rollenspiele", icon: "◌" },
  { id: "practice", label: "Training", de: "Üben", icon: "◎" },
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
  "الدفع": "Zahlung", "الإرجاع": "Retoure", "تقنية": "Technik", "عميل صعب": "Schwierige Kunden",
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

const directTranslations = new Map(vocabulary.map((item) => [item.word.toLocaleLowerCase("de-DE"), item.arabic]));
const basicTranslations: Record<string, string> = {
  ich: "أنا", sie: "حضرتك / هي / هم", du: "أنت", wir: "نحن", mein: "خاصتي", meine: "خاصتي", mich: "نفسي / إياي",
  und: "و", oder: "أو", aber: "لكن", weil: "لأن", dass: "أن", wenn: "إذا / عندما", auch: "أيضًا", nicht: "لا / ليس", sehr: "جدًا",
  gern: "بكل سرور", heute: "اليوم", danke: "شكرًا", guten: "طيب / سعيد", tag: "يوم", name: "اسم", arbeit: "عمل", kunde: "عميل",
  kunden: "عملاء", team: "فريق", deutsch: "الألمانية", lernen: "يتعلم", gelernt: "تعلّم", arbeiten: "يعمل", problem: "مشكلة", lösung: "حل",
  frage: "سؤال", antwort: "إجابة", erfahrung: "خبرة", stärke: "نقطة قوة", stärken: "نقاط القوة", unternehmen: "شركة", freundlich: "ودود",
  zuverlässig: "يمكن الاعتماد عليه", wichtig: "مهم", ruhig: "هادئ", schnell: "سريع", gemeinsam: "معًا", möchte: "أود", kann: "أستطيع",
  habe: "لدي", bin: "أكون / أنا", ist: "هو / يكون", sind: "هم / يكونون", mit: "مع", für: "لـ / من أجل", von: "من", zu: "إلى",
};

function HoverTranslation({ children, translation, className = "" }: { children: React.ReactNode; translation: string; className?: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const text = typeof children === "string" ? children : String(children ?? "");
  const tokens = text.match(/[\p{L}\p{N}\[\]-]+|[^\p{L}\p{N}\[\]-]+/gu) ?? [text];
  return <span className={`hover-translation ${className}`}>
    {tokens.map((token, index) => {
      if (!/[\p{L}\p{N}]/u.test(token)) return <span key={index}>{token}</span>;
      const normalized = token.replace(/^\[|\]$/g, "").toLocaleLowerCase("de-DE");
      const meaning = directTranslations.get(normalized) ?? basicTranslations[normalized] ?? translation;
      return <span key={`${token}-${index}`} className={`touch-word ${open === index ? "tooltip-open" : ""}`} tabIndex={0} onClick={(event) => { event.stopPropagation(); setOpen(open === index ? null : index); }} onBlur={() => setOpen(null)}>
        {token}<span className="hover-tooltip" role="tooltip">{meaning}</span>
      </span>;
    })}
  </span>;
}

export default function Home() {
  const [section, setSection] = useState<Section>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedWord, setSelectedWord] = useState<Vocabulary | null>(null);

  const changeSection = (next: Section) => {
    setSection(next); setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app-shell" dir="ltr">
      <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
        <button className="close-menu" onClick={() => setMenuOpen(false)} aria-label="Menü schließen">×</button>
        <div className="brand-block">
          <div className="brand-mark"><span>B</span><b>DA</b></div>
          <div><strong>BORUSSIA</strong><small>DEUTSCH AKADEMIE</small></div>
        </div>
        <nav className="main-nav" aria-label="Bereiche der Akademie">
          {nav.map((item) => (
            <button key={item.id} className={section === item.id ? "active" : ""} onClick={() => changeSection(item.id)}>
              <span className="nav-icon">{item.icon}</span><span><b>{item.label}</b><small>{item.de}</small></span>
            </button>
          ))}
        </nav>
        <div className="sidebar-tip"><span>!</span><p>Wort berühren oder mit der Maus darüberfahren: Die arabische Bedeutung erscheint sofort.</p></div>
      </aside>

      {menuOpen && <button className="menu-backdrop" onClick={() => setMenuOpen(false)} aria-label="Schließen" />}

      <main className="main-content">
        <header className="topbar">
          <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Menü öffnen">☰</button>
          <div className="mobile-brand"><span>BDA</span><b>Deutsch Akademie</b></div>
          <div className="topbar-actions">
            <span className="level-pill">B1 → B2</span>
            <button className="search-jump" onClick={() => changeSection("vocabulary")}>⌕ <span>Wortschatz durchsuchen</span></button>
          </div>
        </header>

        {section === "home" && <HomeSection onNavigate={changeSection} />}
        {section === "course" && <CourseSection onSelect={setSelectedLesson} />}
        {section === "questions" && <QuestionsSection />}
        {section === "vocabulary" && <VocabularySection onSelect={setSelectedWord} />}
        {section === "situations" && <SituationsSection />}
        {section === "practice" && <PracticeSection />}

        <footer><span className="flag-line" /><p>Borussia Deutsch Akademie · Lernen, anwenden, sicher sprechen</p></footer>
        <nav className="mobile-bottom-nav" aria-label="Schnellnavigation">
          {nav.filter((item) => ["home", "course", "questions", "vocabulary", "practice"].includes(item.id)).map((item) => <button key={item.id} className={section === item.id ? "active" : ""} onClick={() => changeSection(item.id)}><span>{item.icon}</span><small>{item.label}</small></button>)}
        </nav>
      </main>

      {selectedLesson && <LessonModal lesson={selectedLesson} onClose={() => setSelectedLesson(null)} />}
      {selectedWord && <WordModal word={selectedWord} onClose={() => setSelectedWord(null)} />}
    </div>
  );
}

function HomeSection({ onNavigate }: { onNavigate: (s: Section) => void }) {
  return <div className="page home-page">
    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow"><i /> DEIN WEG ZUM ERFOLG</div>
        <h1>Deutsch sprechen.<br/><em>Sicher auftreten.</em></h1>
        <p>Dein kompletter Praxiskurs für Interviews und Kundenservice: Lektionen, Fragen, Wortschatz, Dialoge und Aussprache an einem Ort.</p>
        <div className="hero-actions">
          <button className="primary-button" onClick={() => onNavigate("course")}>Kurs starten <span>←</span></button>
          <button className="ghost-button" onClick={() => onNavigate("practice")}>Jetzt trainieren</button>
        </div>
        <div className="hero-note">Übersetzungen bleiben verborgen. Berühre ein deutsches Wort oder fahre mit der Maus darüber.</div>
      </div>
      <div className="hero-visual" aria-hidden="true">
        <div className="stadium-lines" />
        <div className="hero-score"><small>DEUTSCH</small><strong>B2</strong><span>INTERVIEW READY</span></div>
        <div className="german-bars"><i/><i/><i/></div>
      </div>
    </section>

    <section className="stats-grid">
      <div><strong>12</strong><span>Strukturierte Lektionen</span><small>LEKTIONEN</small></div>
      <div><strong>{questions.length}</strong><span>Fragen mit Antworten</span><small>INTERVIEWFRAGEN</small></div>
      <div><strong>{vocabulary.length}</strong><span>Interaktive Wörter</span><small>WORTSCHATZ</small></div>
      <div><strong>{scenarios.length}</strong><span>Komplette Dialoge</span><small>ROLLENSPIELE</small></div>
    </section>

    <section className="dashboard-grid">
      <div className="continue-card">
        <div className="section-heading"><div><small>DEIN KURSPLAN</small><h2>Der klare Einstieg in deinen Kurs</h2></div></div>
        <div className="current-lesson">
          <span className="lesson-number">01</span>
          <div><small>ERSTE LEKTION</small><h3 className="de" dir="ltr"><HoverTranslation translation={lessons[0].titleAr}>{lessons[0].titleDe}</HoverTranslation></h3><p>{lessons[0].duration.replace("دقيقة", "Minuten")} · {lessons[0].level}</p></div>
          <button onClick={() => onNavigate("course")}>Kurs öffnen ←</button>
        </div>
      </div>
      <div className="quick-card">
        <small>SCHNELLSTART</small><h2>Direkt trainieren</h2>
        <button onClick={() => onNavigate("questions")}><span>?</span><div><b>Interviewfrage</b><small>Antwort, Aussprache und Wortübersetzung</small></div><i>←</i></button>
        <button onClick={() => onNavigate("vocabulary")}><span>Aa</span><div><b>Wort des Tages</b><small>Bedeutung, Beispiel und Situation</small></div><i>←</i></button>
      </div>
    </section>

    <section className="roadmap">
      <div className="section-heading"><div><small>DER LERNWEG</small><h2>Dein Weg zum Interview</h2></div><button onClick={() => onNavigate("course")}>Alle Lektionen ←</button></div>
      <div className="roadmap-line">
        {["Vorstellung","Kundenservice","Problemlösung","B2-Training","Simulation"].map((name, index) => <div key={name}><span>{index + 1}</span><b className="de">{name}</b><small>{["Sicher vorstellen","Kunden verstehen","Probleme lösen","Flüssig sprechen","Interview bestehen"][index]}</small></div>)}
      </div>
    </section>
  </div>;
}

function PageIntro({ kicker, title, text, count }: { kicker: string; title: string; text: string; count: string }) {
  return <div className="page-intro"><div><small>{kicker}</small><h1>{title}</h1><p>{text}</p></div><strong>{count}</strong></div>;
}

function CourseSection({ onSelect }: { onSelect: (l: Lesson) => void }) {
  return <div className="page"><PageIntro kicker="DEIN KOMPLETTER KURS" title="Lektionen" text="Beginne mit Lektion 1 oder öffne direkt das Thema, das du gerade brauchst." count={`${lessons.length}`} />
    <div className="lesson-grid">
      {lessons.map((lesson) => <article key={lesson.id} className="lesson-card">
        <div className="lesson-card-top"><span>{String(lesson.id).padStart(2,"0")}</span><div><b>{lesson.level}</b><small>{lesson.duration.replace("دقيقة", "Minuten")}</small></div></div>
        <h2 className="de" dir="ltr"><HoverTranslation translation={lesson.titleAr}>{lesson.titleDe}</HoverTranslation></h2>
        <div className="lesson-tags">{lesson.vocabulary.slice(0,3).map((item) => <span key={item} className="de">{item}</span>)}</div>
        <div className="lesson-card-actions"><button onClick={() => onSelect(lesson)}>Lektion öffnen ←</button></div>
      </article>)}
    </div>
  </div>;
}

function QuestionsSection() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALLE");
  const [level, setLevel] = useState("ALLE");
  const [open, setOpen] = useState<number | null>(null);
  const filtered = useMemo(() => questions.filter((item) => (category === "ALLE" || item.category === category) && (level === "ALLE" || item.level === level) && `${item.qDe} ${item.qAr}`.toLowerCase().includes(search.toLowerCase())), [search, category, level]);
  return <div className="page"><PageIntro kicker="FRAGENBANK" title="Interviewfragen" text="Antworte zuerst selbst und öffne danach die Musterantwort. Jedes deutsche Wort reagiert auf Berührung oder Mauszeiger." count={`${filtered.length}`} />
    <div className="filter-bar"><label className="search-field">⌕<input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Frage durchsuchen..." /></label><select value={category} onChange={(e) => setCategory(e.target.value)}>{questionCategories.map((item) => <option key={item} value={item}>{categoryName(item)}</option>)}</select><select value={level} onChange={(e) => setLevel(e.target.value)}><option value="ALLE">Alle Niveaus</option><option>B1</option><option>B2</option></select></div>
    <div className="questions-list">
      {filtered.map((item) => <article className={`question-card ${open === item.id ? "open" : ""}`} key={item.id}>
        <div className="question-head">
          <span className="question-index">{String(item.id).padStart(2,"0")}</span><div><small>{categoryName(item.category)} · {item.level}</small><h2 className="de" dir="ltr"><HoverTranslation translation={item.qAr}>{item.qDe}</HoverTranslation></h2></div><button className="expand-button" onClick={() => setOpen(open === item.id ? null : item.id)} aria-label={open === item.id ? "Antwort schließen" : "Antwort öffnen"}>{open === item.id ? "−" : "+"}</button>
        </div>
        {open === item.id && <div className="question-body">
          <div className="answer-label"><span>MUSTERANTWORT</span><AudioButton text={`${item.qDe}. ${item.answerDe}`} /></div>
          <p className="answer-de de" dir="ltr"><HoverTranslation translation={item.answerAr}>{item.answerDe}</HoverTranslation></p>
          {item.personalize && <div className="personalize-tip"><span>✎</span><p><b>Personalisieren:</b> Ersetze nur die Angaben in eckigen Klammern und sprich mit kurzen, natürlichen Pausen.</p></div>}
        </div>}
      </article>)}
      {!filtered.length && <div className="empty-state">Keine Ergebnisse. Ändere den Suchbegriff oder die Filter.</div>}
    </div>
  </div>;
}

function VocabularySection({ onSelect }: { onSelect: (word: Vocabulary) => void }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALLE");
  const filtered = useMemo(() => vocabulary.filter((item) => (category === "ALLE" || item.category === category) && `${item.word} ${item.arabic}`.toLowerCase().includes(search.toLowerCase())), [search, category]);
  return <div className="page"><PageIntro kicker="DEIN WORTSCHATZ" title="Kurswörterbuch" text="Berühre ein Wort für die arabische Bedeutung. Öffne die Karte für Erklärung, Beispiel und Gesprächssituation." count={`${filtered.length}`} />
    <div className="filter-bar"><label className="search-field">⌕<input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Wort suchen..." /></label><select value={category} onChange={(e) => setCategory(e.target.value)}>{vocabCategories.map((item) => <option key={item} value={item}>{categoryName(item)}</option>)}</select></div>
    <div className="vocab-grid">{filtered.map((word) => <button key={word.id} className="word-card" onClick={() => onSelect(word)} aria-label={`${word.word} öffnen`}><span>{word.type}</span><h2 className="de" dir="ltr"><HoverTranslation translation={word.arabic}>{word.word}</HoverTranslation></h2><small>Wort berühren · Karte für Details öffnen ←</small></button>)}</div>
  </div>;
}

function SituationsSection() {
  const [open, setOpen] = useState<number | null>(1);
  return <div className="page"><PageIntro kicker="ECHTE GESPRÄCHE" title="Dialoge und Rollenspiele" text="Lies und höre zuerst den deutschen Dialog. Berühre danach jedes Wort, das du übersetzen möchtest." count={`${scenarios.length}`} />
    <div className="scenario-list">{scenarios.map((scenario) => <article key={scenario.id} className={`scenario-card ${open === scenario.id ? "open" : ""}`}>
      <div className="scenario-title"><span>{String(scenario.id).padStart(2,"0")}</span><div><small>{categoryName(scenario.category)}</small><h2 className="de" dir="ltr"><HoverTranslation translation={scenario.titleAr}>{scenario.titleDe}</HoverTranslation></h2></div><button className="expand-button" onClick={() => setOpen(open === scenario.id ? null : scenario.id)} aria-label={open === scenario.id ? "Dialog schließen" : "Dialog öffnen"}>{open === scenario.id ? "−" : "+"}</button></div>
      {open === scenario.id && <div className="scenario-body">
        <div className="scenario-toolbar"><AudioButton text={scenario.lines.map((line) => `${line.speaker}: ${line.de}`).join(" ")} label="Ganzen Dialog anhören"/><small>Wort berühren oder mit der Maus darüberfahren</small></div>
        <div className="dialogue">{scenario.lines.map((line, index) => <div key={index} className={line.speaker === "Kunde" ? "customer-line" : "agent-line"}><span>{line.speaker === "Kunde" ? "K" : "M"}</span><div><small>{line.speaker}</small><p className="de" dir="ltr"><HoverTranslation translation={line.ar}>{line.de}</HoverTranslation></p></div><AudioButton text={line.de} /></div>)}</div>
        <div className="personalize-tip"><span>!</span><p>Sprich beide Rollen laut und ersetze anschließend einzelne Angaben mit deinen eigenen Beispielen.</p></div>
      </div>}
    </article>)}</div>
  </div>;
}

function PracticeSection() {
  const [mode, setMode] = useState<"cards" | "interview">("cards");
  const [index, setIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const word = vocabulary[index % vocabulary.length];
  const interviewQuestion = questions[questionIndex % questions.length];
  const nextWord = () => setIndex((index + 17) % vocabulary.length);
  const nextQuestion = () => { setQuestionIndex((questionIndex + 13) % questions.length); setShowAnswer(false); };
  return <div className="page"><PageIntro kicker="TRAININGSGELÄNDE" title="Freies Training" text="Ohne Punkte und ohne Noten: Versuche es zuerst selbst und berühre ein deutsches Wort nur dann, wenn du Hilfe brauchst." count="ÜBEN" />
    <div className="mode-tabs"><button className={mode === "cards" ? "active" : ""} onClick={() => setMode("cards")}>Wortkarten</button><button className={mode === "interview" ? "active" : ""} onClick={() => setMode("interview")}>Interview-Simulation</button></div>
    {mode === "cards" ? <div className="flashcard">
      <small>KARTE {index + 1} / {vocabulary.length}</small><AudioButton text={word.word}/><h2 className="de" dir="ltr"><HoverTranslation translation={word.arabic}>{word.word}</HoverTranslation></h2><span>{word.type} · Wort berühren</span>
      <div className="flash-answer"><div className="example-box"><small>BEISPIEL</small><p className="de" dir="ltr"><HoverTranslation translation={word.exampleAr}>{word.exampleDe}</HoverTranslation></p></div><button className="primary-button" onClick={nextWord}>Nächstes Wort ←</button></div>
    </div> : <div className="interview-sim">
      <div className="sim-top"><span>FRAGE {questionIndex + 1}</span><AudioButton text={interviewQuestion.qDe}/></div><h2 className="de" dir="ltr"><HoverTranslation translation={interviewQuestion.qAr}>{interviewQuestion.qDe}</HoverTranslation></h2><p>Antworte 30 bis 60 Sekunden laut. Öffne danach die Musterantwort.</p>
      {!showAnswer ? <button className="answer-toggle" onClick={() => setShowAnswer(true)}>Musterantwort öffnen</button> : <div className="sim-answer"><p className="de" dir="ltr"><HoverTranslation translation={interviewQuestion.answerAr}>{interviewQuestion.answerDe}</HoverTranslation></p></div>}
      <button className="primary-button" onClick={nextQuestion}>Nächste Frage ←</button>
    </div>}
  </div>;
}

function LessonModal({ lesson, onClose }: { lesson: Lesson; onClose: () => void }) {
  return <div className="modal-backdrop" onClick={onClose}><article className="lesson-modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={onClose}>×</button>
    <div className="modal-number">LEKTION {String(lesson.id).padStart(2,"0")}</div><h1 className="de" dir="ltr"><HoverTranslation translation={lesson.titleAr}>{lesson.titleDe}</HoverTranslation></h1><p className="lesson-summary">Lerne die wichtigsten Formulierungen, höre die Aussprache und wende das Thema anschließend frei im Gespräch an.</p>
    <div className="modal-meta"><span>{lesson.level}</span><span>{lesson.duration.replace("دقيقة", "Minuten")}</span></div>
    <section><small>LERNZIELE</small><h3>Ziele dieser Lektion</h3><ul><li>Das Thema sicher verstehen</li><li>Wichtige Formulierungen aktiv verwenden</li><li>Im Gespräch spontan und klar reagieren</li></ul></section>
    <section><small>SCHLÜSSELWÖRTER</small><h3>Wichtige Wörter</h3><div className="modal-vocab">{lesson.vocabulary.map((item) => { const meaning = directTranslations.get(item.toLocaleLowerCase("de-DE")) ?? lesson.titleAr; return <button key={item} className="de" onClick={() => speak(item)}><HoverTranslation translation={meaning}>{item}</HoverTranslation> <span>◖))</span></button>; })}</div></section>
    <section className="practice-box"><small>AUFGABE</small><h3>Freie Anwendung</h3><p>Sprich zwei Minuten frei über das Thema. Verwende mindestens drei Schlüsselwörter und wiederhole die Aufgabe anschließend ohne Notizen.</p></section>
    <button className="complete-button" onClick={onClose}>Zurück zu den Lektionen ←</button>
  </article></div>;
}

function WordModal({ word, onClose }: { word: Vocabulary; onClose: () => void }) {
  return <div className="modal-backdrop" onClick={onClose}><article className="word-modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={onClose}>×</button>
    <div className="word-modal-head"><span>{word.type} · {categoryName(word.category)}</span><div><h1 className="de" dir="ltr"><HoverTranslation translation={word.arabic}>{word.word}</HoverTranslation></h1><AudioButton text={word.word}/></div></div>
    <section className="meaning-block" lang="ar" dir="rtl"><small>ÜBERSETZUNG</small><h2>{word.arabic}</h2><p>{word.explanationAr}</p></section>
    <section><small>BEISPIEL</small><div className="example-box"><div><p className="de" dir="ltr">{word.exampleDe}</p><AudioButton text={word.exampleDe}/></div><p>{word.exampleAr}</p></div></section>
    <section><small>IM GESPRÄCH</small><div className="situation-box"><p className="de" dir="ltr"><HoverTranslation translation={word.situationAr}>{word.situationDe}</HoverTranslation></p><AudioButton text={word.situationDe} label="Situation anhören"/></div></section>
    <button className="complete-button" onClick={onClose}>Wort schließen ✓</button>
  </article></div>;
}
