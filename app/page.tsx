"use client";

import { useEffect, useMemo, useState } from "react";
import { lessons, materials, questions, scenarios, vocabulary, type Lesson, type Vocabulary } from "./course-data";

type Section = "home" | "course" | "questions" | "vocabulary" | "situations" | "practice" | "sources";

const nav: { id: Section; label: string; de: string; icon: string }[] = [
  { id: "home", label: "الرئيسية", de: "Start", icon: "⌂" },
  { id: "course", label: "المحاضرات", de: "Kurs", icon: "▤" },
  { id: "questions", label: "الأسئلة", de: "Fragen", icon: "?" },
  { id: "vocabulary", label: "الكلمات", de: "Wörter", icon: "Aa" },
  { id: "situations", label: "المواقف", de: "Dialoge", icon: "◌" },
  { id: "practice", label: "تدريب", de: "Üben", icon: "◎" },
  { id: "sources", label: "المصادر", de: "Quellen", icon: "≡" },
];

const questionCategories = ["الكل", ...Array.from(new Set(questions.map((item) => item.category)))];
const vocabCategories = ["الكل", ...Array.from(new Set(vocabulary.map((item) => item.category)))];

function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text.replace(/\[[^\]]+\]/g, ""));
  utterance.lang = "de-DE";
  utterance.rate = 0.88;
  window.speechSynthesis.speak(utterance);
}

function AudioButton({ text, label = "اسمع النطق" }: { text: string; label?: string }) {
  return <button className="audio-button" onClick={(event) => { event.stopPropagation(); speak(text); }} aria-label={label} title={label}>◖))</button>;
}

function Reveal({ children, label = "إظهار الترجمة" }: { children: React.ReactNode; label?: string }) {
  const [open, setOpen] = useState(false);
  return open ? <div className="translation-panel">{children}</div> : <button className="reveal-button" onClick={() => setOpen(true)}>عـ {label}</button>;
}

export default function Home() {
  const [section, setSection] = useState<Section>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [completed, setCompleted] = useState<number[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedWord, setSelectedWord] = useState<Vocabulary | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("bda-progress");
    if (saved) setCompleted(JSON.parse(saved));
  }, []);

  const changeSection = (next: Section) => {
    setSection(next); setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleLesson = (id: number) => {
    const next = completed.includes(id) ? completed.filter((item) => item !== id) : [...completed, id];
    setCompleted(next); window.localStorage.setItem("bda-progress", JSON.stringify(next));
  };

  const progress = Math.round((completed.length / lessons.length) * 100);

  return (
    <div className="app-shell" dir="rtl">
      <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
        <button className="close-menu" onClick={() => setMenuOpen(false)} aria-label="إغلاق القائمة">×</button>
        <div className="brand-block">
          <div className="brand-mark"><span>B</span><b>DA</b></div>
          <div><strong>BORUSSIA</strong><small>DEUTSCH AKADEMIE</small></div>
        </div>
        <div className="sidebar-progress">
          <div><span>تقدمك</span><b>{progress}%</b></div>
          <div className="progress-track"><i style={{ width: `${progress}%` }} /></div>
          <small>{completed.length} من {lessons.length} محاضرة</small>
        </div>
        <nav className="main-nav" aria-label="أقسام الأكاديمية">
          {nav.map((item) => (
            <button key={item.id} className={section === item.id ? "active" : ""} onClick={() => changeSection(item.id)}>
              <span className="nav-icon">{item.icon}</span><span><b>{item.label}</b><small>{item.de}</small></span>
            </button>
          ))}
        </nav>
        <div className="sidebar-tip"><span>!</span><p>حاول تفهم الألماني الأول. الترجمة مستخبية لحد ما تطلبها.</p></div>
      </aside>

      {menuOpen && <button className="menu-backdrop" onClick={() => setMenuOpen(false)} aria-label="إغلاق" />}

      <main className="main-content">
        <header className="topbar">
          <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="فتح القائمة">☰</button>
          <div className="mobile-brand"><span>BDA</span><b>Deutsch Akademie</b></div>
          <div className="topbar-actions">
            <span className="level-pill">B1 → B2</span>
            <button className="search-jump" onClick={() => changeSection("vocabulary")}>⌕ <span>ابحث في القاموس</span></button>
          </div>
        </header>

        {section === "home" && <HomeSection onNavigate={changeSection} progress={progress} completed={completed.length} />}
        {section === "course" && <CourseSection completed={completed} onSelect={setSelectedLesson} onToggle={toggleLesson} />}
        {section === "questions" && <QuestionsSection />}
        {section === "vocabulary" && <VocabularySection onSelect={setSelectedWord} />}
        {section === "situations" && <SituationsSection />}
        {section === "practice" && <PracticeSection />}
        {section === "sources" && <SourcesSection />}

        <footer><span className="flag-line" /><p>Borussia Deutsch Akademie · تعلّم، طبّق، واتكلم بثقة</p></footer>
      </main>

      {selectedLesson && <LessonModal lesson={selectedLesson} done={completed.includes(selectedLesson.id)} onClose={() => setSelectedLesson(null)} onToggle={() => toggleLesson(selectedLesson.id)} />}
      {selectedWord && <WordModal word={selectedWord} onClose={() => setSelectedWord(null)} />}
    </div>
  );
}

function HomeSection({ onNavigate, progress, completed }: { onNavigate: (s: Section) => void; progress: number; completed: number }) {
  return <div className="page home-page">
    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow"><i /> DEIN WEG ZUM ERFOLG</div>
        <h1>اتكلم ألماني<br/><em>بثقة.</em></h1>
        <p>كورس عملي كامل من ملفاتك: مقابلات، خدمة عملاء، مواقف، كلمات وقواعد — من غير ما تحتاج تفتح ترجمة خارجية.</p>
        <div className="hero-actions">
          <button className="primary-button" onClick={() => onNavigate("course")}>ابدأ الكورس <span>←</span></button>
          <button className="ghost-button" onClick={() => onNavigate("practice")}>اختبر نفسك</button>
        </div>
        <div className="hero-note">الترجمة لا تظهر تلقائيًا — اضغط عليها فقط وقت الحاجة.</div>
      </div>
      <div className="hero-visual" aria-hidden="true">
        <div className="stadium-lines" />
        <div className="hero-score"><small>DEUTSCH</small><strong>B2</strong><span>INTERVIEW READY</span></div>
        <div className="german-bars"><i/><i/><i/></div>
      </div>
    </section>

    <section className="stats-grid">
      <div><strong>12</strong><span>محاضرة مرتبة</span><small>Vorlesungen</small></div>
      <div><strong>{questions.length}</strong><span>سؤال بإجابة</span><small>Interviewfragen</small></div>
      <div><strong>{vocabulary.length}</strong><span>كلمة تفاعلية</span><small>Wortschatz</small></div>
      <div><strong>{scenarios.length}</strong><span>مواقف كاملة</span><small>Rollenspiele</small></div>
    </section>

    <section className="dashboard-grid">
      <div className="continue-card">
        <div className="section-heading"><div><small>DEIN FORTSCHRITT</small><h2>كمّل من مكانك</h2></div><span className="round-progress">{progress}%</span></div>
        <div className="current-lesson">
          <span className="lesson-number">{String(Math.min(completed + 1, 12)).padStart(2,"0")}</span>
          <div><small>NÄCHSTE LEKTION</small><h3 className="de" dir="ltr">{lessons[Math.min(completed, 11)].titleDe}</h3><p>{lessons[Math.min(completed, 11)].duration} · {lessons[Math.min(completed, 11)].level}</p></div>
          <button onClick={() => onNavigate("course")}>ابدأ ←</button>
        </div>
      </div>
      <div className="quick-card">
        <small>SCHNELLSTART</small><h2>تدريب سريع</h2>
        <button onClick={() => onNavigate("questions")}><span>؟</span><div><b>سؤال مقابلة</b><small>إجابة + نطق + ترجمة عند الطلب</small></div><i>←</i></button>
        <button onClick={() => onNavigate("vocabulary")}><span>Aa</span><div><b>كلمة اليوم</b><small>معنى + مثال + موقف</small></div><i>←</i></button>
      </div>
    </section>

    <section className="roadmap">
      <div className="section-heading"><div><small>DER LERNWEG</small><h2>خريطة الطريق</h2></div><button onClick={() => onNavigate("course")}>كل المحاضرات ←</button></div>
      <div className="roadmap-line">
        {["Vorstellung","Kundenservice","Problemlösung","B2 Training","Simulation"].map((name, index) => <div key={name} className={progress >= (index + 1) * 20 ? "passed" : ""}><span>{index + 1}</span><b className="de">{name}</b><small>{["قدّم نفسك","افهم العميل","حل المشكلة","ناقش بطلاقة","اجتز المقابلة"][index]}</small></div>)}
      </div>
    </section>
  </div>;
}

function PageIntro({ kicker, title, text, count }: { kicker: string; title: string; text: string; count: string }) {
  return <div className="page-intro"><div><small>{kicker}</small><h1>{title}</h1><p>{text}</p></div><strong>{count}</strong></div>;
}

function CourseSection({ completed, onSelect, onToggle }: { completed: number[]; onSelect: (l: Lesson) => void; onToggle: (id: number) => void }) {
  return <div className="page"><PageIntro kicker="DEIN KOMPLETTER KURS" title="المحاضرات" text="ابدأ بالترتيب أو افتح الموضوع الذي تحتاجه الآن. كل محاضرة مرتبطة بأسئلتها وكلماتها ومواقفها." count={`${completed.length}/${lessons.length}`} />
    <div className="lesson-grid">
      {lessons.map((lesson) => <article key={lesson.id} className={`lesson-card ${completed.includes(lesson.id) ? "done" : ""}`}>
        <div className="lesson-card-top"><span>{String(lesson.id).padStart(2,"0")}</span><div><b>{lesson.level}</b><small>{lesson.duration}</small></div></div>
        <h2 className="de" dir="ltr">{lesson.titleDe}</h2>
        <Reveal label="معنى عنوان المحاضرة"><p>{lesson.titleAr}</p></Reveal>
        <div className="lesson-tags">{lesson.vocabulary.slice(0,3).map((item) => <span key={item} className="de">{item}</span>)}</div>
        <div className="lesson-card-actions"><button onClick={() => onSelect(lesson)}>افتح المحاضرة ←</button><button className="check-button" onClick={() => onToggle(lesson.id)} aria-label="تحديد كمكتملة">{completed.includes(lesson.id) ? "✓" : "○"}</button></div>
      </article>)}
    </div>
  </div>;
}

function QuestionsSection() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("الكل");
  const [level, setLevel] = useState("الكل");
  const [open, setOpen] = useState<number | null>(1);
  const filtered = useMemo(() => questions.filter((item) => (category === "الكل" || item.category === category) && (level === "الكل" || item.level === level) && `${item.qDe} ${item.qAr}`.toLowerCase().includes(search.toLowerCase())), [search, category, level]);
  return <div className="page"><PageIntro kicker="FRAGENBANK" title="بنك الأسئلة" text="اقرأ السؤال بالألماني، جاوب وحدك، ثم افتح الإجابة. الترجمة تظل مخفية لحد ما تطلبها." count={`${filtered.length}`} />
    <div className="filter-bar"><label className="search-field">⌕<input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ابحث بالألماني أو العربي..." /></label><select value={category} onChange={(e) => setCategory(e.target.value)}>{questionCategories.map((item) => <option key={item}>{item}</option>)}</select><select value={level} onChange={(e) => setLevel(e.target.value)}><option>الكل</option><option>B1</option><option>B2</option></select></div>
    <div className="questions-list">
      {filtered.map((item) => <article className={`question-card ${open === item.id ? "open" : ""}`} key={item.id}>
        <button className="question-head" onClick={() => setOpen(open === item.id ? null : item.id)}>
          <span className="question-index">{String(item.id).padStart(2,"0")}</span><div><small>{item.category} · {item.level}</small><h2 className="de" dir="ltr">{item.qDe}</h2></div><i>{open === item.id ? "−" : "+"}</i>
        </button>
        {open === item.id && <div className="question-body">
          <div className="answer-label"><span>MUSTERANTWORT</span><AudioButton text={`${item.qDe}. ${item.answerDe}`} /></div>
          <p className="answer-de de" dir="ltr">{item.answerDe}</p>
          <Reveal><div><b>{item.qAr}</b><p>{item.answerAr}</p></div></Reveal>
          {item.personalize && <div className="personalize-tip"><span>✎</span><p><b>خصّصها ليك:</b> {item.personalize}</p></div>}
        </div>}
      </article>)}
      {!filtered.length && <div className="empty-state">مفيش نتيجة بنفس الفلاتر. جرّب كلمة أو تصنيف تاني.</div>}
    </div>
  </div>;
}

function VocabularySection({ onSelect }: { onSelect: (word: Vocabulary) => void }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("الكل");
  const filtered = useMemo(() => vocabulary.filter((item) => (category === "الكل" || item.category === category) && `${item.word} ${item.arabic}`.toLowerCase().includes(search.toLowerCase())), [search, category]);
  return <div className="page"><PageIntro kicker="DEIN WORTSCHATZ" title="قاموس الكورس" text="الكلمة الألمانية فقط هي الظاهرة. اضغط على أي كلمة لتظهر معناها وشرحها ومثال وموقف مترجم." count={`${filtered.length}`} />
    <div className="filter-bar"><label className="search-field">⌕<input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ابحث عن كلمة..." /></label><select value={category} onChange={(e) => setCategory(e.target.value)}>{vocabCategories.map((item) => <option key={item}>{item}</option>)}</select></div>
    <div className="vocab-grid">{filtered.map((word) => <button key={word.id} className="word-card" onClick={() => onSelect(word)}><span>{word.type}</span><h2 className="de" dir="ltr">{word.word}</h2><small>اضغط للشرح والموقف ←</small></button>)}</div>
  </div>;
}

function SituationsSection() {
  const [open, setOpen] = useState<number | null>(1);
  return <div className="page"><PageIntro kicker="ECHTE GESPRÄCHE" title="مواقف وتمثيل أدوار" text="اقرأ الحوار بالألماني أولًا، اسمعه، ثم اكشف ترجمته للتأكد من فهمك." count={`${scenarios.length}`} />
    <div className="scenario-list">{scenarios.map((scenario) => <article key={scenario.id} className={`scenario-card ${open === scenario.id ? "open" : ""}`}>
      <button className="scenario-title" onClick={() => setOpen(open === scenario.id ? null : scenario.id)}><span>{String(scenario.id).padStart(2,"0")}</span><div><small>{scenario.category}</small><h2 className="de" dir="ltr">{scenario.titleDe}</h2></div><i>{open === scenario.id ? "−" : "+"}</i></button>
      {open === scenario.id && <div className="scenario-body">
        <div className="scenario-toolbar"><AudioButton text={scenario.lines.map((line) => `${line.speaker}: ${line.de}`).join(" ")} label="اسمع الحوار كاملًا"/><Reveal label="ترجمة الحوار"><p><b>{scenario.titleAr}</b></p>{scenario.lines.map((line, index) => <p key={index}><b>{line.speaker === "Kunde" ? "العميل" : "الموظف"}:</b> {line.ar}</p>)}</Reveal></div>
        <div className="dialogue">{scenario.lines.map((line, index) => <div key={index} className={line.speaker === "Kunde" ? "customer-line" : "agent-line"}><span>{line.speaker === "Kunde" ? "K" : "M"}</span><div><small>{line.speaker}</small><p className="de" dir="ltr">{line.de}</p></div><AudioButton text={line.de} /></div>)}</div>
        <div className="personalize-tip"><span>!</span><p>{scenario.tip}</p></div>
      </div>}
    </article>)}</div>
  </div>;
}

function PracticeSection() {
  const [mode, setMode] = useState<"cards" | "interview">("cards");
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const word = vocabulary[index % vocabulary.length];
  const interviewQuestion = questions[questionIndex % questions.length];
  const nextWord = () => { setIndex((index + 17) % vocabulary.length); setRevealed(false); };
  const nextQuestion = () => setQuestionIndex((questionIndex + 13) % questions.length);
  return <div className="page"><PageIntro kicker="TRAININGSGELÄNDE" title="ملعب التدريب" text="تدريب من غير درجات معقدة: اكشف المعنى فقط بعد ما تحاول، أو شغّل محاكاة سؤال مقابلة." count="ÜBEN" />
    <div className="mode-tabs"><button className={mode === "cards" ? "active" : ""} onClick={() => setMode("cards")}>بطاقات الكلمات</button><button className={mode === "interview" ? "active" : ""} onClick={() => setMode("interview")}>محاكاة المقابلة</button></div>
    {mode === "cards" ? <div className={`flashcard ${revealed ? "revealed" : ""}`}>
      <small>KARTE {index + 1} / {vocabulary.length}</small><AudioButton text={word.word}/><h2 className="de" dir="ltr">{word.word}</h2><span>{word.type}</span>
      {!revealed ? <button className="primary-button" onClick={() => setRevealed(true)}>اكشف المعنى</button> : <div className="flash-answer"><strong>{word.arabic}</strong><p>{word.explanationAr}</p><div className="example-box"><small>BEISPIEL</small><p className="de" dir="ltr">{word.exampleDe}</p><p>{word.exampleAr}</p></div><button className="primary-button" onClick={nextWord}>الكلمة التالية ←</button></div>}
    </div> : <div className="interview-sim">
      <div className="sim-top"><span>FRAGE {questionIndex + 1}</span><AudioButton text={interviewQuestion.qDe}/></div><h2 className="de" dir="ltr">{interviewQuestion.qDe}</h2><p>جاوب بصوتك في 30–60 ثانية، وبعدها افتح الإجابة النموذجية.</p>
      <Reveal label="الإجابة النموذجية"><div className="sim-answer"><p className="de" dir="ltr">{interviewQuestion.answerDe}</p><Reveal><p>{interviewQuestion.answerAr}</p></Reveal></div></Reveal>
      <button className="primary-button" onClick={nextQuestion}>سؤال تاني ←</button>
    </div>}
  </div>;
}

function SourcesSection() {
  return <div className="page"><PageIntro kicker="ALLE DATEIEN GELESEN" title="المادة الأصلية" text="الكورس مبني على كل ملفات الـPDF الموجودة في المجلد، مع تنظيف الصياغة الألمانية ودمج التكرار وترتيب المحتوى تعليميًا." count="12 PDF" />
    <div className="source-summary"><strong>119</strong><div><h2>صفحة تمت مراجعتها</h2><p>النصوص والصور الممسوحة والأسئلة والمفردات والمواقف كلها دخلت في بناء المنهج.</p></div></div>
    <div className="sources-grid">{materials.map((material, index) => <article key={material.name}><span>{String(index + 1).padStart(2,"0")}</span><div><h2 className="de" dir="ltr">{material.name}</h2><p>{material.topics}</p></div><b>{material.pages} ص</b></article>)}</div>
    <div className="method-note"><span>✓</span><div><h3>إيه اللي اتعمل في المحتوى؟</h3><p>تصحيح الأخطاء الواضحة، حذف التكرار، تحويل الإجابات شديدة الخصوصية إلى قوالب مرنة، إضافة ترجمة عربية عند الطلب، وربط كل كلمة بمثال وموقف.</p></div></div>
  </div>;
}

function LessonModal({ lesson, done, onClose, onToggle }: { lesson: Lesson; done: boolean; onClose: () => void; onToggle: () => void }) {
  return <div className="modal-backdrop" onClick={onClose}><article className="lesson-modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={onClose}>×</button>
    <div className="modal-number">LEKTION {String(lesson.id).padStart(2,"0")}</div><h1 className="de" dir="ltr">{lesson.titleDe}</h1><Reveal label="ترجمة وشرح المحاضرة"><h2>{lesson.titleAr}</h2><p>{lesson.summaryAr}</p></Reveal>
    <div className="modal-meta"><span>{lesson.level}</span><span>{lesson.duration}</span></div>
    <section><small>LERNZIELE</small><h3>أهداف المحاضرة</h3><ul>{lesson.objectives.map((item) => <li key={item}>{item}</li>)}</ul></section>
    <section><small>SCHLÜSSELWÖRTER</small><h3>الكلمات الأساسية</h3><div className="modal-vocab">{lesson.vocabulary.map((item) => <button key={item} className="de" onClick={() => speak(item)}>{item} <span>◖))</span></button>)}</div></section>
    <section className="practice-box"><small>AUFGABE</small><h3>التطبيق</h3><p>{lesson.practice}</p></section>
    <button className={`complete-button ${done ? "done" : ""}`} onClick={onToggle}>{done ? "✓ تم إنجاز المحاضرة" : "حدّد المحاضرة كمكتملة"}</button>
  </article></div>;
}

function WordModal({ word, onClose }: { word: Vocabulary; onClose: () => void }) {
  return <div className="modal-backdrop" onClick={onClose}><article className="word-modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={onClose}>×</button>
    <div className="word-modal-head"><span>{word.type} · {word.category}</span><div><h1 className="de" dir="ltr">{word.word}</h1><AudioButton text={word.word}/></div></div>
    <section className="meaning-block"><small>BEDEUTUNG</small><h2>{word.arabic}</h2><p>{word.explanationAr}</p></section>
    <section><small>BEISPIEL</small><div className="example-box"><div><p className="de" dir="ltr">{word.exampleDe}</p><AudioButton text={word.exampleDe}/></div><p>{word.exampleAr}</p></div></section>
    <section><small>IM GESPRÄCH</small><div className="situation-box"><p className="de" dir="ltr">{word.situationDe}</p><p>{word.situationAr}</p><AudioButton text={word.situationDe} label="اسمع الموقف"/></div></section>
    <button className="complete-button" onClick={onClose}>فهمت الكلمة ✓</button>
  </article></div>;
}
