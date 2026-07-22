export type Lesson = {
  id: number;
  titleDe: string;
  titleAr: string;
  level: "B1" | "B2";
  duration: string;
  summaryAr: string;
  objectives: string[];
  vocabulary: string[];
  practice: string;
};

export type Question = {
  id: number;
  category: string;
  level: "B1" | "B2";
  qDe: string;
  qAr: string;
  answerDe: string;
};

export type Vocabulary = {
  id: number;
  word: string;
  arabic: string;
  type: string;
  category: string;
  exampleDe: string;
  situationDe: string;
};

export type Scenario = {
  id: number;
  titleDe: string;
  titleAr: string;
  category: string;
  lines: { speaker: "Kunde" | "Mitarbeiter"; de: string; ar: string }[];
  tip: string;
};

export const lessons: Lesson[] = [
  { id: 1, titleDe: "Sich professionell vorstellen", titleAr: "تقديم نفسك باحتراف", level: "B1", duration: "35 دقيقة", summaryAr: "تبني إجابة ثابتة ومرنة للتعريف بنفسك: الاسم، البلد، الدراسة، الخبرة، اللغات، الهوايات والهدف المهني.", objectives: ["ترتيب التعريف في 6 خطوات", "استخدام Platzhalter بدل الحفظ الأعمى", "نطق افتتاحية المقابلة بثقة"], vocabulary: ["sich vorstellen", "ursprünglich", "absolvieren", "Erfahrung sammeln", "sich weiterentwickeln"], practice: "سجّل تعريفًا مدته 60 ثانية، ثم أعده بعد تغيير الاسم والمدينة والخبرة فقط." },
  { id: 2, titleDe: "Motivation & Unternehmenswahl", titleAr: "الدافع واختيار الشركة", level: "B1", duration: "40 دقيقة", summaryAr: "تشرح لماذا تعلمت الألمانية، ولماذا اخترت خدمة العملاء، ولماذا هذه الشركة دون مبالغة أو إجابة محفوظة.", objectives: ["ربط الشركة بمهاراتك", "ذكر سبب مهني وسبب شخصي", "تجنب ذمّ صاحب عمل سابق"], vocabulary: ["Motivation", "guter Ruf", "Entwicklungsmöglichkeiten", "sich bewerben", "Beitrag leisten"], practice: "اكتب إجابة تصلح لأي شركة ثم بدّل [Firmenname] و[Produkt/Branche]." },
  { id: 3, titleDe: "Stärken, Schwächen & Soft Skills", titleAr: "نقاط القوة والضعف والمهارات الشخصية", level: "B2", duration: "45 دقيقة", summaryAr: "تحوّل نقاط القوة إلى دليل عملي، وتعرض نقطة ضعف حقيقية مع خطة تحسين بدل الإجابات المستهلكة.", objectives: ["قاعدة صفة + مثال + نتيجة", "اختيار ضعف غير قاتل للوظيفة", "شرح Teamfähigkeit وFlexibilität"], vocabulary: ["zuverlässig", "belastbar", "lösungsorientiert", "Lernbereitschaft", "Perfektionismus"], practice: "اختر قوتين وضعفًا واحدًا، واربط كل واحدة بموقف حقيقي من الدراسة أو العمل." },
  { id: 4, titleDe: "Grundlagen des Kundenservice", titleAr: "أساسيات خدمة العملاء", level: "B1", duration: "50 دقيقة", summaryAr: "تفهم معنى الخدمة الجيدة، مراحل المكالمة، الاستماع النشط، إظهار التعاطف، التوضيح، الحل والإغلاق المهني.", objectives: ["بناء مكالمة من 7 مراحل", "استخدام عبارات التعاطف", "التأكد من رضا العميل"], vocabulary: ["Anliegen", "Kundenzufriedenheit", "aktiv zuhören", "Verständnis zeigen", "lösungsorientiert"], practice: "طبّق الهيكل: Begrüßung → Zuhören → Klären → Lösung → Bestätigung → Abschluss." },
  { id: 5, titleDe: "Schwierige Kunden & Stress", titleAr: "العميل الغاضب والعمل تحت الضغط", level: "B2", duration: "50 دقيقة", summaryAr: "تتعامل مع الصراخ والإهانة والنقد والضغط من غير ما تأخذ الموقف بشكل شخصي، مع حدود مهنية واضحة.", objectives: ["تهدئة العميل دون وعود كاذبة", "ترتيب الأولويات تحت الضغط", "استقبال النقد كفرصة تحسين"], vocabulary: ["verärgert", "nicht persönlich nehmen", "ausreden lassen", "Prioritäten setzen", "Eskalation"], practice: "تدرّب على جملة التعاطف ثم سؤال توضيحي ثم حل واحد قابل للتنفيذ." },
  { id: 6, titleDe: "Bestellung, Lieferung & Retoure", titleAr: "الطلب والتوصيل والمرتجعات", level: "B1", duration: "55 دقيقة", summaryAr: "كل مفردات الطلب، رقم الشحنة، التأخير، التلف، المنتج الخطأ، الإرجاع، الاستبدال والاسترداد.", objectives: ["قراءة حالة الشحنة", "طلب الصور ورقم الطلب", "شرح الخطوات والمدة للعميل"], vocabulary: ["Bestellnummer", "Sendungsstatus", "beschädigt", "Rücksendeetikett", "Ersatzlieferung"], practice: "مثّل ثلاث حالات: طرد تالف، توصيل متأخر، ومنتج بلون خاطئ." },
  { id: 7, titleDe: "Zahlung, Rechnung & Mahnung", titleAr: "الدفع والفاتورة والإنذار", level: "B2", duration: "50 دقيقة", summaryAr: "تتعامل مع رفض الدفع، الخصم المكرر، إثبات الدفع، الإنذار، التقسيط، والاسترداد بلغة دقيقة.", objectives: ["طلب Zahlungsbeleg", "شرح Zahlungsart وGuthaben", "تمييز Erstattung وRückerstattung"], vocabulary: ["Zahlungsmethode", "Zahlungsbeleg", "Mahnung", "doppelt abgebucht", "Ratenzahlung"], practice: "اشرح للعميل كيف يرسل إثبات الدفع ومتى يُلغى الإنذار." },
  { id: 8, titleDe: "Technik, System & Supportkanäle", titleAr: "التقنية والنظام وقنوات الدعم", level: "B2", duration: "45 دقيقة", summaryAr: "لغة الهاتف والبريد والشات والتذاكر والأعطال والتحويل للقسم المختص وحماية البيانات.", objectives: ["شرح عطل بسيط بوضوح", "تحويل المكالمة باحتراف", "احترام Datenschutz"], vocabulary: ["Fehlermeldung", "Support-Ticket", "Durchwahl", "Fachabteilung", "Datenschutz"], practice: "اشرح خطوة بخطوة إرسال SMS وتغيير نغمة الهاتف ثم عالج Systemfehler." },
  { id: 9, titleDe: "Rollenspiele im Call Center", titleAr: "مواقف تمثيلية في الكول سنتر", level: "B2", duration: "60 دقيقة", summaryAr: "ستة حوارات كاملة من الملفات: تالف، طلب خاطئ، إنذار، دفع مرفوض، مرتجع غير مسجل، وتأخير توصيل.", objectives: ["التبديل بين دور العميل والموظف", "استخدام نبرة هادئة", "إغلاق المكالمة وتأكيد الخطوة التالية"], vocabulary: ["Unannehmlichkeiten", "Zahlungsnachweis", "Bearbeitungszeit", "beschleunigen", "voraussichtlich"], practice: "اقرأ كل دور مرة، ثم غطِّ النص وردّ من ذاكرتك باستخدام المعنى لا الحفظ." },
  { id: 10, titleDe: "Karriere, Team & Unternehmenskultur", titleAr: "المسار المهني والفريق وثقافة الشركة", level: "B2", duration: "45 دقيقة", summaryAr: "أسئلة الراتب، العمل منفردًا أو مع فريق، الترقية، النقد، المدير غير العادل، والهدف بعد خمس سنوات.", objectives: ["عرض طموح واقعي", "الردّ الدبلوماسي على المواقف الحساسة", "شرح Loyalität وVertrauen"], vocabulary: ["Führungsposition", "Verantwortung", "Arbeitsklima", "Loyalität", "Vertrauen"], practice: "حضّر خطة مهنية من ثلاث مراحل: الآن، بعد سنتين، وبعد خمس سنوات." },
  { id: 11, titleDe: "B2 Alltag: Social Media & Online-Kauf", titleAr: "موضوعات B2: السوشيال ميديا والتسوق أونلاين", level: "B2", duration: "55 دقيقة", summaryAr: "قراءة وكتابة ومناقشة مزايا وعيوب السوشيال ميديا والتسوق مع einerseits/andererseits وweil/obwohl/deshalb.", objectives: ["استخراج الفكرة والتفاصيل", "كتابة 120–150 كلمة", "عرض رأي وحجة ومثال"], vocabulary: ["Auswirkungen", "übermäßige Nutzung", "sich vergleichen", "Rücksendung", "Bewertung"], practice: "اكتب رأيك: Sind soziale Medien mehr Vorteil oder Nachteil?" },
  { id: 12, titleDe: "Komplette Interview-Simulation", titleAr: "محاكاة المقابلة الكاملة", level: "B2", duration: "75 دقيقة", summaryAr: "مراجعة بنك الأسئلة، أسئلة المفاجأة، المواقف، وصف المدينة والعائلة والهاتف والملابس، ثم مقابلة كاملة بوقت محدد.", objectives: ["الردّ دون ترجمة خارجية", "تخصيص الإجابات", "التعامل مع سؤال غير متوقع"], vocabulary: ["Lebenslauf", "Berufserfahrung", "Gehaltsvorstellung", "Herausforderung", "Rückfrage"], practice: "شغّل وضع المحاكاة: 12 سؤالًا عشوائيًا، 60 ثانية لكل إجابة." },
];

const q = (id: number, category: string, level: "B1" | "B2", qDe: string, qAr: string, answerDe: string): Question => ({ id, category, level, qDe, qAr, answerDe });

export const questions: Question[] = [
  q(1,"التعريف بالنفس · 3 دقائق","B2","Stellen Sie sich bitte vor.","عرّف نفسك من فضلك.","Guten Tag, mein Name ist [Name]. Ich komme aus [Land] und stamme ursprünglich aus [Stadt]. Ich interessiere mich sehr für Kundenservice und Kommunikation, weil ich gern mit Menschen arbeite, aufmerksam zuhöre und gemeinsam mit ihnen passende Lösungen finde.\n\nMeine Muttersprache ist [Muttersprache]. Außerdem spreche ich Deutsch als meine wichtigste Fremdsprache und Englisch als weitere Fremdsprache. Zurzeit verbessere ich meine Deutschkenntnisse kontinuierlich, besonders meinen Wortschatz, meine Aussprache und meine Sicherheit in beruflichen Gesprächen.\n\nIch habe mein Studium bereits abgeschlossen und [Studienfach] studiert. Neben meinem Studium habe ich schon Erfahrungen im Umgang mit Kunden gesammelt. Dabei habe ich gelernt, freundlich und professionell zu kommunizieren, Fragen verständlich zu beantworten und auch bei unterschiedlichen Anliegen geduldig zu bleiben. Ich arbeite gern im Team, kann Aufgaben aber ebenfalls selbstständig und zuverlässig erledigen. Zurzeit konzentriere ich mich darauf, mich beruflich weiterzuentwickeln und neue Aufgaben schnell und sorgfältig zu lernen.\n\nIn meiner Freizeit habe ich verschiedene Hobbys. Zum Beispiel spiele ich gern Fußball, gehe einkaufen und mache Spaziergänge. Diese Aktivitäten helfen mir, einen guten Ausgleich zum Alltag zu finden, aktiv zu bleiben und neue Energie zu sammeln.\n\nAuch meine Familie spielt in meinem Leben eine sehr wichtige Rolle. Wir verbringen gern Zeit miteinander und unterstützen uns gegenseitig. Meine Familie ist für mich das A und O, weil sie mir Stabilität, Motivation und Rückhalt gibt.\n\nZu meinen größten Stärken gehören Zuverlässigkeit, Teamfähigkeit und Lernbereitschaft. Bei der Teamarbeit tausche ich mich gern mit anderen aus, unterstütze meine Kollegen und übernehme Verantwortung für gemeinsame Ziele. Im Bereich Kommunikation kann ich gut zuhören, gezielte Fragen stellen und freundlich auf Kunden eingehen. Außerdem bleibe ich auch in stressigen Situationen ruhig, strukturiert und lösungsorientiert. Wenn mehrere Aufgaben gleichzeitig anstehen, setze ich Prioritäten und bearbeite sie Schritt für Schritt.\n\nNatürlich ist niemand perfekt. Eine Schwäche von mir ist, dass ich manchmal zu sehr auf Details achte, weil ich Fehler vermeiden möchte. Inzwischen habe ich jedoch gelernt, meine Aufgaben besser zu priorisieren, klare Zeitgrenzen zu setzen und zwischen wichtigen und weniger wichtigen Details zu unterscheiden. Früher war ich außerdem etwas zurückhaltend. In den letzten Jahren habe ich aber bewusst an meinen Kommunikationsfähigkeiten gearbeitet und mich deutlich verbessert. Heute spreche ich offener, frage aktiv nach und bringe meine Ideen selbstbewusster ein.\n\nZusammenfassend bin ich eine motivierte, zuverlässige und lernbereite Person. Ich möchte meine Sprachkenntnisse, meine Erfahrung im Kundenkontakt und meine Stärken in Ihr Unternehmen einbringen und mich dort langfristig weiterentwickeln. Vielen Dank."),
  q(2,"التعريف بالنفس","B1","Wo und wie haben Sie Deutsch gelernt?","أين وكيف تعلمت الألمانية؟","Ich habe Deutsch an [Universität/Institut] gelernt. Zusätzlich besuche ich Kurse, höre Podcasts, schaue deutsche Videos und übe regelmäßig mit Lernpartnern. Diese Mischung aus Unterricht und täglicher Praxis hilft mir besonders beim Sprechen."),
  q(3,"الدافع","B1","Warum haben Sie sich entschieden, Deutsch zu lernen?","لماذا قررت تعلم الألمانية؟","Deutsch eröffnet mir berufliche Möglichkeiten und ermöglicht mir, mit deutschsprachigen Kunden professionell zu kommunizieren. Außerdem interessiere ich mich für die deutsche Kultur. Die Sprache ist anspruchsvoll, und genau diese Herausforderung motiviert mich."),
  q(4,"الدافع","B1","Was motiviert Sie?","ما الذي يحفزك؟","Mich motivieren sichtbare Fortschritte und gute Arbeitsergebnisse. Wenn ich ein Problem löse oder einem Kunden helfen kann, gibt mir das Energie für die nächste Aufgabe. Auch Feedback nutze ich, um mich weiterzuentwickeln."),
  q(5,"الشركة","B1","Warum möchten Sie bei uns arbeiten?","لماذا تريد العمل معنا؟","Ihr Unternehmen hat einen guten Ruf und legt Wert auf Kundenservice sowie Mitarbeiterentwicklung. Meine Kommunikationsfähigkeiten und meine Deutschkenntnisse passen gut zu der Position. Gleichzeitig sehe ich bei Ihnen die Chance, Verantwortung zu übernehmen und langfristig zu wachsen."),
  q(6,"الشركة","B2","Warum sollten wir Sie einstellen?","لماذا ينبغي أن نوظفك؟","Sie sollten mich einstellen, weil ich ruhig, zuverlässig und lösungsorientiert arbeite. Ich höre genau zu, lerne neue Systeme schnell und bleibe auch unter Druck freundlich. Diese Eigenschaften kann ich direkt im Kontakt mit Ihren Kunden einsetzen."),
  q(7,"الشركة","B2","Was wissen Sie über unser Unternehmen?","ماذا تعرف عن شركتنا؟","Ich weiß, dass [Firmenname] in der Branche [Branche] tätig ist und besonderen Wert auf [Service/Innovation] legt. Vor dem Gespräch habe ich mich über Ihre Produkte, Werte und Entwicklungsmöglichkeiten informiert. Besonders interessant finde ich [konkreter Punkt]."),
  q(8,"الخبرة","B1","Haben Sie Erfahrung im Call Center?","هل لديك خبرة في الكول سنتر؟","Ich habe [direkte/noch keine direkte] Call-Center-Erfahrung. Durch [Arbeit/Studium/Projekte] habe ich jedoch gelernt, klar zu kommunizieren, aufmerksam zuzuhören und Probleme strukturiert zu lösen. Diese Fähigkeiten möchte ich schnell in Ihre Abläufe übertragen."),
  q(9,"الخبرة","B2","Haben Sie Erfahrung mit Telefon- oder E-Mail-Support?","هل لديك خبرة في الدعم عبر الهاتف أو البريد؟","Ja, ich habe Erfahrung mit [Telefon/E-Mail/Chat]. Am Telefon achte ich auf eine ruhige, klare Stimme. In E-Mails formuliere ich verständlich, professionell und vollständig. In beiden Fällen dokumentiere ich die nächsten Schritte."),
  q(10,"خدمة العملاء","B1","Was bedeutet guter Kundenservice für Sie?","ماذا تعني لك خدمة العملاء الجيدة؟","Guter Kundenservice bedeutet für mich, freundlich, zuverlässig und lösungsorientiert zu handeln. Der Kunde soll sich ernst genommen fühlen, klare Informationen bekommen und genau wissen, was als Nächstes passiert."),
  q(11,"خدمة العملاء","B2","Wie gehen Sie mit einem schwierigen Kunden um?","كيف تتعامل مع عميل صعب؟","Ich bleibe ruhig und nehme den Ärger nicht persönlich. Zuerst lasse ich den Kunden ausreden, fasse sein Anliegen zusammen und zeige Verständnis. Dann prüfe ich die Fakten, biete eine realistische Lösung an und bestätige die nächsten Schritte."),
  q(12,"خدمة العملاء","B2","Was machen Sie, wenn ein Kunde schreit?","ماذا تفعل إذا كان العميل يصرخ؟","Ich spreche bewusst ruhig und unterbreche den Kunden nicht. Sobald er sein Anliegen erklärt hat, sage ich: „Ich verstehe, dass die Situation ärgerlich ist. Lassen Sie uns gemeinsam eine Lösung finden.“ Bei Beleidigungen setze ich höflich eine klare Grenze."),
  q(13,"خدمة العملاء","B2","Wie reagieren Sie auf Kritik von Kunden?","كيف تتعامل مع نقد العملاء؟","Ich höre aufmerksam zu und trenne die Sache von meiner Person. Wenn ein Fehler passiert ist, übernehme ich Verantwortung und korrigiere ihn. Danach überlege ich, wie derselbe Fehler in Zukunft vermieden werden kann."),
  q(14,"خدمة العملاء","B2","Was tun Sie, wenn Sie die Antwort nicht kennen?","ماذا تفعل إذا لم تعرف الإجابة؟","Ich erfinde keine Antwort. Ich sage dem Kunden offen, dass ich die Information prüfe, recherchiere im System oder frage die zuständige Fachabteilung. Anschließend melde ich mich mit einer verlässlichen Antwort zurück."),
  q(15,"خدمة العملاء","B2","Können Sie ein Beispiel nennen, wie Sie ein Problem gelöst haben?","اذكر مثالًا لمشكلة قمت بحلها.","Ein Kunde wartete länger als erwartet auf seine Bestellung. Ich hörte ihm zu, entschuldigte mich, prüfte den Status und leitete eine Nachforschung ein. Danach erklärte ich die Lieferfrist transparent. Der Kunde war zufrieden, weil er eine klare Lösung und einen festen nächsten Schritt bekam."),
  q(16,"الضغط","B1","Können Sie unter Druck arbeiten?","هل تستطيع العمل تحت الضغط؟","Ja. Unter Druck setze ich Prioritäten, bearbeite eine Aufgabe nach der anderen und dokumentiere wichtige Punkte. So bleibe ich konzentriert und vermeide unnötige Fehler."),
  q(17,"الضغط","B2","Wie bleiben Sie unter Stress ruhig?","كيف تحافظ على هدوئك تحت الضغط؟","Ich atme kurz durch, ordne die Aufgaben nach Dringlichkeit und konzentriere mich auf das, was ich beeinflussen kann. Bei Bedarf bitte ich rechtzeitig um Unterstützung, statt ein Problem zu spät zu melden."),
  q(18,"نقاط القوة","B1","Was sind Ihre Stärken?","ما نقاط قوتك؟","Meine größten Stärken sind Zuverlässigkeit, Kommunikationsfähigkeit und Lernbereitschaft. Zum Beispiel [kurzes Beispiel]. Dadurch kann ich Aufgaben sorgfältig erledigen und gleichzeitig freundlich mit Kunden und Kollegen umgehen."),
  q(19,"نقاط الضعف","B2","Was sind Ihre Schwächen?","ما نقاط ضعفك؟","Früher habe ich manchmal zu viel Zeit in Details investiert. Inzwischen setze ich klare Zeitgrenzen und priorisiere die wichtigsten Aufgaben. So behalte ich meine Sorgfalt, arbeite aber deutlich effizienter."),
  q(20,"الفريق","B1","Arbeiten Sie lieber allein oder im Team?","تفضل العمل منفردًا أم في فريق؟","Beides ist für mich wichtig. Allein kann ich konzentriert Verantwortung für meine Aufgabe übernehmen. Im Team tausche ich Ideen aus, unterstütze Kollegen und erreiche gemeinsame Ziele schneller. Ich passe mich an die Aufgabe an."),
  q(21,"الفريق","B2","Wie gehen Sie mit Konflikten im Team um?","كيف تتعامل مع خلاف داخل الفريق؟","Ich spreche das Problem früh, ruhig und sachlich an. Zuerst höre ich die andere Perspektive, dann suchen wir nach einer Lösung, die zum gemeinsamen Ziel passt. Persönliche Vorwürfe vermeide ich."),
  q(22,"المستقبل","B1","Wo sehen Sie sich in fünf Jahren?","أين ترى نفسك بعد خمس سنوات؟","In fünf Jahren möchte ich ein erfahrener Mitarbeiter mit mehr Verantwortung sein. Ich will meine Deutschkenntnisse und fachlichen Fähigkeiten weiterentwickeln, neue Kollegen unterstützen und – wenn es passt – erste Führungsaufgaben übernehmen."),
  q(23,"المستقبل","B2","Welche Ziele haben Sie dieses Jahr?","ما أهدافك هذا العام؟","Ich möchte mein Deutsch auf [Niveau] verbessern, praktische Erfahrung im Kundenservice sammeln und sicher mit den wichtigsten Systemen arbeiten. Dafür habe ich einen konkreten Lern- und Übungsplan."),
  q(24,"المستقبل","B2","Was ist Ihr Traumjob?","ما وظيفة أحلامك؟","Mein Traumjob verbindet Kommunikation, Problemlösung und Entwicklungsmöglichkeiten. Ich möchte in einem internationalen Team arbeiten, Verantwortung übernehmen und durch gute Leistung einen echten Beitrag für Kunden und Unternehmen leisten."),
  q(25,"الشركة","B2","Haben Sie sich bei anderen Unternehmen beworben?","هل قدمت في شركات أخرى؟","Ja, ich führe einige passende Gespräche, weil ich meine berufliche Zukunft sorgfältig plane. Ihre Position interessiert mich jedoch besonders wegen [konkreter Grund]. Mir ist wichtig, langfristig zu einem Unternehmen zu passen."),
  q(26,"الشركة","B2","Was tun Sie, wenn Sie nicht akzeptiert werden?","ماذا ستفعل إذا لم يتم قبولك؟","Ich würde um konstruktives Feedback bitten, meine Lücken gezielt verbessern und mich weiterqualifizieren. Eine Absage sehe ich nicht als Ende, sondern als Information, mit der ich beim nächsten Gespräch besser werde."),
  q(27,"مواقف","B2","Was tun Sie, wenn Ihr Vorgesetzter Sie ungerecht behandelt?","ماذا تفعل إذا عاملك مديرك بظلم؟","Zuerst prüfe ich ruhig, ob ich alle Fakten richtig verstanden habe. Dann bitte ich um ein sachliches Gespräch, schildere konkrete Beispiele und höre seine Sicht an. Mein Ziel ist eine faire Lösung, nicht ein persönlicher Streit."),
  q(28,"مواقف","B2","Was würden Sie tun, wenn ein Kollege befördert wird?","ماذا تفعل إذا تمت ترقية زميل بدلًا منك؟","Ich gratuliere ihm ehrlich und bleibe professionell. Danach frage ich meinen Vorgesetzten, welche Kompetenzen ich für den nächsten Schritt noch entwickeln soll, und arbeite mit einem klaren Plan daran."),
  q(29,"مواقف","B2","Was tun Sie, wenn ein Kunde Sie beleidigt?","ماذا تفعل إذا أهانك العميل؟","Ich nehme die Äußerung nicht persönlich und bleibe ruhig. Ich bitte den Kunden höflich, respektvoll zu bleiben, damit ich ihm helfen kann. Wenn die Beleidigungen weitergehen, folge ich der Eskalationsregel des Unternehmens."),
  q(30,"مواقف","B2","Was tun Sie, wenn ein Kunde einen Dialekt spricht, den Sie nicht verstehen?","ماذا تفعل إذا تحدث العميل بلهجة لا تفهمها؟","Ich bitte freundlich: „Könnten Sie bitte etwas langsamer oder auf Hochdeutsch sprechen?“ Danach wiederhole ich die wichtigsten Punkte, um Missverständnisse zu vermeiden."),
  q(31,"طلبات وشحن","B1","Was tun Sie, wenn eine Lieferung fehlt?","ماذا تفعل إذا لم تصل الشحنة؟","Ich prüfe zuerst die Bestellnummer und den Sendungsstatus. Dann entschuldige ich mich für die Verzögerung und erkläre die passende Lösung: Nachforschung, Ersatzlieferung oder – falls möglich – Rückerstattung."),
  q(32,"طلبات وشحن","B1","Was tun Sie bei einem beschädigten Paket?","ماذا تفعل مع طرد تالف؟","Ich zeige Verständnis, bitte um Fotos und dokumentiere den Schaden. Danach biete ich gemäß den Regeln einen Ersatz oder eine Rückerstattung an und erkläre dem Kunden die nächsten Schritte."),
  q(33,"طلبات وشحن","B1","Wie reagieren Sie auf eine falsche Lieferung?","كيف تتعامل مع توصيل منتج خاطئ؟","Ich entschuldige mich für den Fehler, prüfe die Bestellnummer und veranlasse den Versand des richtigen Artikels. Für die falsche Ware erhält der Kunde ein kostenloses Rücksendeetikett."),
  q(34,"مدفوعات","B2","Was tun Sie, wenn eine Zahlung abgelehnt wurde?","ماذا تفعل إذا تم رفض الدفع؟","Ich frage nach der verwendeten Zahlungsmethode, bitte den Kunden, Guthaben und Daten zu prüfen, und schlage einen neuen Versuch oder eine andere Zahlungsart vor. Sensible Daten frage ich nicht unnötig ab."),
  q(35,"مدفوعات","B2","Ein Kunde hat trotz Zahlung eine Mahnung erhalten. Was tun Sie?","عميل دفع ومع ذلك وصلته مطالبة، ماذا تفعل؟","Ich bitte um den Zahlungsbeleg, prüfe, ob die Zahlung bereits verbucht wurde, und storniere die Mahnung bei einem Fehler. Danach bestätige ich dem Kunden das Ergebnis schriftlich."),
  q(36,"مدفوعات","B2","Was tun Sie bei einer doppelten Abbuchung?","ماذا تفعل عند خصم المبلغ مرتين؟","Ich prüfe die beiden Transaktionen und gleiche Betrag, Datum und Referenznummer ab. Wenn die Doppelabbuchung bestätigt ist, veranlasse ich die Erstattung und nenne eine realistische Bearbeitungszeit."),
  q(37,"التقنية","B2","Was tun Sie bei einem System- oder Internetproblem?","ماذا تفعل عند مشكلة في النظام أو الإنترنت؟","Ich informiere Teamleitung oder IT, dokumentiere die Kundendaten gemäß den Regeln und erkläre dem Kunden transparent die Verzögerung. Wenn möglich, nutze ich einen freigegebenen Ersatzprozess und melde mich nach der Lösung zurück."),
  q(38,"التقنية","B1","Wie kann man eine SMS schicken?","كيف نرسل رسالة SMS؟","Öffnen Sie die Nachrichten-App und wählen Sie „Neue Nachricht“. Geben Sie die Nummer oder den Namen ein, schreiben Sie den Text und drücken Sie anschließend auf „Senden“."),
  q(39,"التقنية","B1","Wie kann man den Klingelton ändern?","كيف نغيّر نغمة الرنين؟","Öffnen Sie die Einstellungen, wählen Sie „Töne“ oder „Klingelton“, suchen Sie einen Ton aus und bestätigen Sie die Auswahl."),
  q(40,"المستوى B2","B2","Was sind die Vor- und Nachteile des Online-Kaufs?","ما مزايا وعيوب الشراء أونلاين؟","Online-Kauf ist bequem, jederzeit möglich und bietet eine große Auswahl. Nachteile sind, dass man Produkte nicht direkt prüfen kann, Lieferungen sich verspäten können und Rücksendungen manchmal Aufwand verursachen."),
  q(41,"المستوى B2","B2","Sind soziale Medien mehr Vorteil oder Nachteil?","هل السوشيال ميديا ميزة أم عيب أكثر؟","Meiner Meinung nach hängt das von der Nutzung ab. Einerseits erleichtern soziale Medien Kommunikation und Information. Andererseits können ständiger Vergleich und übermäßige Nutzung Stress verursachen. Deshalb sind klare Zeitgrenzen sinnvoll."),
  q(42,"الوصف","B1","Beschreiben Sie bitte Ihre Familie.","صف عائلتك.","Ich komme aus einer liebevollen Familie mit [Anzahl] Personen. Wir unterstützen einander und verbringen am Wochenende gern Zeit zusammen. Meine Familie ist für mich eine wichtige Quelle von Motivation und Stabilität."),
  q(43,"الوصف","B1","Beschreiben Sie Ihre Stadt.","صف مدينتك.","Ich lebe in [Stadt]. Sie ist [groß/ruhig/lebendig] und bekannt für [Ort/Merkmal]. Besonders mag ich [Vorteil]. Manchmal ist [Verkehr/Lärm] anstrengend, aber die Menschen sind freundlich und hilfsbereit."),
  q(44,"الوصف","B1","Beschreiben Sie Ihr Handy.","صف هاتفك.","Mein Handy ist ein [Marke/Modell]. Es hat einen großen Bildschirm, eine gute Kamera und genug Speicherplatz. Ich nutze es für Kommunikation, Lernen, E-Mails und Podcasts, aber ich achte auf meine Bildschirmzeit."),
  q(45,"الوصف","B1","Was haben Sie im letzten Urlaub gemacht?","ماذا فعلت في آخر إجازة؟","Im letzten Urlaub war ich mit [Familie/Freunden] in [Ort]. Wir haben Sehenswürdigkeiten besucht, lokales Essen probiert und uns erholt. Die Reise war für mich eine gute Gelegenheit, neue Energie zu tanken."),
  q(46,"ألمانيا","B1","Warum möchten Sie nach Deutschland reisen?","لماذا تريد السفر إلى ألمانيا؟","Ich möchte die Sprache im Alltag erleben, die Kultur kennenlernen und Städte wie [Stadt] besuchen. Besonders interessieren mich [Sehenswürdigkeit/Thema]. Eine Reise wäre für mich gleichzeitig Motivation und Sprachpraxis."),
  q(47,"ألمانيا","B2","Was ist ein Unterschied zwischen Ihrer Kultur und der deutschen Kultur?","ما الفرق بين ثقافتك والثقافة الألمانية؟","Ein Unterschied kann der Umgang mit Zeit und Kommunikation sein. In Deutschland werden Pünktlichkeit und direkte Aussagen oft stark betont. In meiner Kultur spielt persönliche Nähe häufig eine größere Rolle. Beide Seiten haben Stärken, und ich passe mich respektvoll an."),
  q(48,"قيم العمل","B2","Was bedeutet Loyalität für Sie?","ماذا يعني لك الولاء؟","Loyalität bedeutet für mich, ehrlich, zuverlässig und respektvoll zu handeln. Ich stehe zu Absprachen, schütze vertrauliche Informationen und spreche Probleme intern sachlich an. Loyalität bedeutet jedoch nicht, Fehler zu verschweigen."),
  q(49,"قيم العمل","B2","Was verstehen Sie unter Flexibilität?","ماذا تفهم من المرونة؟","Flexibilität bedeutet, sich an neue Aufgaben, Systeme oder Situationen anzupassen, ohne Qualität und Regeln zu verlieren. Ich bleibe offen, lerne schnell und suche auch bei Änderungen nach einer praktikablen Lösung."),
  q(50,"قيم العمل","B2","Wie wichtig ist Vertrauen im Kundenservice?","ما أهمية الثقة في خدمة العملاء؟","Vertrauen ist die Grundlage des Kundenservice. Es entsteht, wenn ich ehrlich kommuniziere, Zusagen einhalte, Daten schütze und keine unrealistischen Versprechen mache."),
  q(51,"أسئلة مفاجئة","B2","Was würden Sie mit einer Million Euro tun?","ماذا تفعل لو كان معك مليون يورو؟","Ich würde zuerst einen Teil sicher investieren und meine Familie unterstützen. Einen weiteren Teil würde ich für Weiterbildung oder ein kleines Projekt nutzen und einen angemessenen Betrag spenden. Mir wäre eine verantwortungsvolle Balance wichtig."),
  q(52,"أسئلة مفاجئة","B2","Welche Superkraft würden Sie wählen?","أي قوة خارقة ستختار؟","Ich würde die Fähigkeit wählen, jede Sprache zu verstehen. Damit könnte ich Menschen verbinden, Missverständnisse vermeiden und in internationalen Teams besonders gut arbeiten."),
  q(53,"أسئلة مفاجئة","B2","Worauf können Sie nicht verzichten?","ما الشيء الذي لا تستطيع الاستغناء عنه؟","Auf meine Familie und kontinuierliches Lernen möchte ich nicht verzichten. Beides gibt mir Stabilität, Motivation und die Energie, auch schwierige Ziele langfristig zu verfolgen."),
  q(54,"أسئلة مفاجئة","B2","Was war Ihr größter Erfolg?","ما أكبر نجاح لك؟","Mein größter Erfolg war [Erfolg]. Dafür musste ich [Herausforderung] überwinden. Ich habe gelernt, konsequent zu arbeiten, Hilfe anzunehmen und auch bei Rückschlägen dranzubleiben."),
  q(55,"المقابلة","B2","Haben Sie noch Fragen an uns?","هل لديك أسئلة لنا؟","Ja, gern. Wie sieht die Einarbeitung in den ersten Wochen aus? Woran messen Sie Erfolg in dieser Position? Und welche Entwicklungsmöglichkeiten gibt es nach einer guten Leistung?"),
];

export const materials = [
  { name: "German Interview Prep (Detailed)", pages: 32, topics: "30 سؤالًا تفصيليًا بإجابات ألمانية وترجمة ونصائح" },
  { name: "Interview Deutsch", pages: 15, topics: "100 سؤال مقابلة + أسئلة Vodafone وتقنية" },
  { name: "INTERVIEW", pages: 13, topics: "47 سؤالًا وملاحظات تدريبية ومواقف" },
  { name: "interviews_Vodafone", pages: 8, topics: "35 سؤال Vodafone، مواقف، تقنية وقيم العمل" },
  { name: "Wortschatz zum Thema Kundenservice", pages: 29, topics: "بنك موسّع لمفردات خدمة العملاء مع أمثلة" },
  { name: "Rollenspiel", pages: 4, topics: "6 حوارات عميل وموظف" },
  { name: "Train to Hire – Customer Service", pages: 3, topics: "الشحن والدفع وقراءتان و50 كلمة/عبارة" },
  { name: "B2 Tagesaufgabe – Soziale Medien", pages: 3, topics: "قراءة وأسئلة وقواعد وكتابة ومحادثة" },
  { name: "B2 Lektion 4", pages: 2, topics: "السيرة الذاتية والـSoft Skills والمناقشة" },
  { name: "Interview Training – Top 5", pages: 5, topics: "أسئلة ونصوص وتدريب محادثة" },
  { name: "German Interview Formatted", pages: 2, topics: "تعريف موسع وإجابات نموذجية" },
  { name: "Schwierige Kunden", pages: 3, topics: "6 أسئلة وإجابات لخدمة العملاء" },
];

type VocabSeed = [string, string, string];

const vocabGroups: { category: string; words: VocabSeed[] }[] = [
  {
    category: "الطلبات والشحن",
    words: [
      ["die Bestellung","الطلب","Nomen"],["der Artikel","السلعة / المنتج","Nomen"],["die Ware","البضاعة","Nomen"],["das Paket","الطرد","Nomen"],["die Verpackung","التغليف","Nomen"],["die Lieferung","الشحنة / التوصيل","Nomen"],["der Versand","الشحن","Nomen"],["die Versandkosten","تكاليف الشحن","Nomen"],["die Bestellnummer","رقم الطلب","Nomen"],["die Sendungsnummer","رقم الشحنة","Nomen"],["der Sendungsstatus","حالة الشحنة","Nomen"],["der Lieferschein","إيصال التسليم","Nomen"],["zustellen","يوصّل","Verb"],["liefern","يشحن / يسلّم","Verb"],["sich verspäten","يتأخر","Verb"],["unterwegs","في الطريق","Adjektiv"],["voraussichtlich","من المتوقع","Adverb"],["beschädigt","تالف","Adjektiv"],["defekt","معطّل","Adjektiv"],["fehlen","ينقص / لم يصل","Verb"],["die Verzögerung","التأخير","Nomen"],["die Nachforschung","تتبّع / تحقيق","Nomen"],["die Zustellung","عملية التوصيل","Nomen"],["der Versanddienstleister","شركة الشحن","Nomen"]
    ]
  },
  {
    category: "الإرجاع والاستبدال",
    words: [
      ["die Rücksendung","الإرجاع بالشحن","Nomen"],["die Retoure","المرتجع","Nomen"],["zurückgeben","يرجع المنتج","Verb"],["zurückschicken","يرسل المنتج عائدًا","Verb"],["abgeben","يسلّم يدويًا","Verb"],["das Rücksendeetikett","ملصق الإرجاع","Nomen"],["der Ersatz","البديل","Nomen"],["ersetzen","يستبدل","Verb"],["die Ersatzlieferung","شحنة بديلة","Nomen"],["die Erstattung","استرداد المبلغ","Nomen"],["die Rückerstattung","إرجاع المال","Nomen"],["erstatten","يردّ المبلغ","Verb"],["veranlassen","يبدأ / يرتّب الإجراء","Verb"],["stornieren","يلغي","Verb"],["die Stornierung","الإلغاء","Nomen"],["widerrufen","يتراجع / يلغي قانونيًا","Verb"],["die Garantie","الضمان","Nomen"],["die Reparatur","الإصلاح","Nomen"],["der Reparaturdienst","خدمة الإصلاح","Nomen"],["der Techniker","الفني","Nomen"],["die Bearbeitungszeit","مدة المعالجة","Nomen"],["beschleunigen","يسرّع","Verb"]
    ]
  },
  {
    category: "الدفع والفواتير",
    words: [
      ["die Zahlung","الدفع","Nomen"],["die Zahlungsmethode","وسيلة الدفع","Nomen"],["die Zahlungsart","طريقة الدفع","Nomen"],["der Zahlungsbeleg","إثبات الدفع","Nomen"],["die Rechnung","الفاتورة","Nomen"],["die Mahnung","إنذار / مطالبة بالدفع","Nomen"],["der Betrag","المبلغ","Nomen"],["das Guthaben","الرصيد","Nomen"],["die Kreditkarte","بطاقة الائتمان","Nomen"],["die Überweisung","التحويل البنكي","Nomen"],["überweisen","يحوّل ماليًا","Verb"],["die Transaktion","المعاملة المالية","Nomen"],["abbuchen","يخصم من الحساب","Verb"],["doppelt","مرتين / مكرر","Adjektiv"],["fällig","مستحق الدفع","Adjektiv"],["überfällig","متأخر عن السداد","Adjektiv"],["die Ratenzahlung","الدفع بالتقسيط","Nomen"],["der Zahlungsaufschub","تأجيل الدفع","Nomen"],["die Monatsabrechnung","كشف الحساب الشهري","Nomen"],["der Bankeinzug","الخصم البنكي المباشر","Nomen"],["die Gebühr","الرسوم","Nomen"],["das Inkasso","تحصيل الديون","Nomen"],["ablehnen","يرفض","Verb"]
    ]
  },
  {
    category: "خدمة العملاء",
    words: [
      ["das Anliegen","طلب / مشكلة العميل","Nomen"],["die Anfrage","الاستفسار","Nomen"],["die Beschwerde","الشكوى","Nomen"],["die Reklamation","شكوى على منتج / خدمة","Nomen"],["sich beschweren","يشتكي","Verb"],["reklamieren","يقدّم شكوى","Verb"],["der Kundenservice","خدمة العملاء","Nomen"],["der Kundendienst","قسم خدمة العملاء","Nomen"],["die Kundenbetreuung","رعاية العملاء","Nomen"],["die Kundenzufriedenheit","رضا العملاء","Nomen"],["die Lösung","الحل","Nomen"],["beheben","يصلح / يحل","Verb"],["prüfen","يراجع","Verb"],["bestätigen","يؤكد","Verb"],["weiterleiten","يحوّل الطلب","Verb"],["durchstellen","يحوّل المكالمة","Verb"],["die Fachabteilung","القسم المختص","Nomen"],["zuständig","مسؤول / مختص","Adjektiv"],["der Vorgesetzte","المدير المباشر","Nomen"],["die Eskalation","التصعيد","Nomen"],["der Rückruf","مكالمة رجوع","Nomen"],["die Ausnahme","استثناء","Nomen"],["das Verständnis","التفهّم","Nomen"],["die Geduld","الصبر","Nomen"]
    ]
  },
  {
    category: "الهاتف والدعم التقني",
    words: [
      ["der Anruf","المكالمة","Nomen"],["der Anrufer","المتصل","Nomen"],["das Telefongespräch","المحادثة الهاتفية","Nomen"],["die Hotline","الخط الساخن","Nomen"],["die Warteschleife","الانتظار على الخط","Nomen"],["die Warteschlange","قائمة الانتظار","Nomen"],["die Durchwahl","الرقم الداخلي","Nomen"],["die Verbindung","الاتصال","Nomen"],["die Aufzeichnung","التسجيل","Nomen"],["das Support-Ticket","تذكرة الدعم","Nomen"],["der technische Support","الدعم الفني","Nomen"],["die Fehlermeldung","رسالة الخطأ","Nomen"],["der Systemfehler","عطل النظام","Nomen"],["die Störung","العطل / التشويش","Nomen"],["der Zugang","الدخول / الوصول","Nomen"],["die Zugangsdaten","بيانات الدخول","Nomen"],["der Benutzername","اسم المستخدم","Nomen"],["das Passwort","كلمة المرور","Nomen"],["das Konto","الحساب","Nomen"],["die Bestätigungsnummer","رقم التأكيد","Nomen"],["die Verfügbarkeit","التوفر","Nomen"],["die Erreichbarkeit","إمكانية الوصول","Nomen"],["der Datenschutz","حماية البيانات","Nomen"],["die Sicherheit","الأمان","Nomen"]
    ]
  },
  {
    category: "المقابلة والعمل",
    words: [
      ["der Lebenslauf","السيرة الذاتية","Nomen"],["die Bewerbung","طلب التوظيف","Nomen"],["sich bewerben","يتقدم لوظيفة","Verb"],["die Berufserfahrung","الخبرة المهنية","Nomen"],["die Fähigkeit","المهارة","Nomen"],["die Stärke","نقطة القوة","Nomen"],["die Schwäche","نقطة الضعف","Nomen"],["zuverlässig","يمكن الاعتماد عليه","Adjektiv"],["pünktlich","ملتزم بالمواعيد","Adjektiv"],["geduldig","صبور","Adjektiv"],["flexibel","مرن","Adjektiv"],["belastbar","يتحمل الضغط","Adjektiv"],["lernbereit","مستعد للتعلم","Adjektiv"],["lösungsorientiert","يركز على الحل","Adjektiv"],["teamfähig","يجيد العمل ضمن فريق","Adjektiv"],["kommunikationsstark","قوي في التواصل","Adjektiv"],["die Verantwortung","المسؤولية","Nomen"],["die Lernbereitschaft","الاستعداد للتعلم","Nomen"],["die Teamfähigkeit","العمل الجماعي","Nomen"],["die Zuverlässigkeit","الاعتمادية","Nomen"],["die Herausforderung","التحدي","Nomen"],["die Motivation","الدافع","Nomen"],["die Gehaltsvorstellung","توقع الراتب","Nomen"],["die Führungsposition","منصب قيادي","Nomen"],["die Entwicklungsmöglichkeit","فرصة التطور","Nomen"],["das Arbeitsklima","بيئة العمل","Nomen"],["die Loyalität","الولاء","Nomen"],["das Vertrauen","الثقة","Nomen"],["die Rückmeldung","التغذية الراجعة","Nomen"],["sich weiterentwickeln","يطور نفسه","Verb"]
    ]
  },
  {
    category: "B2 والحياة اليومية",
    words: [
      ["die sozialen Medien","وسائل التواصل الاجتماعي","Nomen"],["die Auswirkung","التأثير","Nomen"],["die übermäßige Nutzung","الاستخدام المفرط","Nomen"],["sich vergleichen","يقارن نفسه","Verb"],["die Konzentration","التركيز","Nomen"],["die Bewertung","التقييم","Nomen"],["der Vorteil","الميزة","Nomen"],["der Nachteil","العيب","Nomen"],["einerseits","من ناحية","Konnektor"],["andererseits","من ناحية أخرى","Konnektor"],["obwohl","رغم أن","Konnektor"],["weil","لأن","Konnektor"],["deshalb","لذلك","Konnektor"],["meiner Meinung nach","في رأيي","Redemittel"],["die Kultur","الثقافة","Nomen"],["die Pünktlichkeit","الالتزام بالمواعيد","Nomen"],["die Sehenswürdigkeit","مَعْلم سياحي","Nomen"],["die Landschaft","المناظر الطبيعية","Nomen"],["die Gewohnheit","العادة","Nomen"],["die Freizeit","وقت الفراغ","Nomen"]
    ]
  }
];

const learningText = (word: string, category: string, index: number) => {
  const templates: Record<string, { examples: string[]; situations: string[] }> = {
    "الطلبات والشحن": {
      examples: [
        `Der Begriff „${word}“ ist wichtig, wenn ein Kunde den Status seiner Bestellung wissen möchte.`,
        `Im Bestellsystem prüfe ich den Eintrag „${word}“, bevor ich dem Kunden eine verbindliche Auskunft gebe.`,
        `Bei einer Rückfrage zum Versand erkläre ich „${word}“ klar und in einfachen Worten.`,
        `Ich dokumentiere „${word}“ sorgfältig, damit der Vorgang für meine Kollegen nachvollziehbar bleibt.`,
      ],
      situations: [
        `Kunde: Ich habe eine Frage zum Begriff „${word}“. Mitarbeiter: Gern. Ich prüfe zuerst Ihre Bestelldaten und erkläre Ihnen danach den nächsten Schritt.`,
        `Kunde: Können Sie mir sagen, was „${word}“ in meinem Fall bedeutet? Mitarbeiter: Ja. Ich sehe mir den aktuellen Stand an und gebe Ihnen gleich eine klare Auskunft.`,
        `Mitarbeiter: In Ihrem Bestellvorgang ist „${word}“ relevant. Kunde: Könnten Sie mir bitte erklären, was ich jetzt tun soll?`,
      ],
    },
    "الإرجاع والاستبدال": {
      examples: [
        `Bei einer Reklamation prüfe ich, welche Rolle „${word}“ für die passende Lösung spielt.`,
        `Ich erkläre der Kundin den Ablauf rund um „${word}“ Schritt für Schritt.`,
        `Bevor ich etwas verspreche, kontrolliere ich die Bedingungen für „${word}“ im System.`,
        `Der Eintrag „${word}“ hilft mir, den nächsten Bearbeitungsschritt korrekt festzulegen.`,
      ],
      situations: [
        `Kunde: Welche Lösung gibt es in Verbindung mit „${word}“? Mitarbeiter: Ich prüfe Ihren Fall und erkläre Ihnen gleich die verfügbaren Optionen.`,
        `Mitarbeiter: Für Ihre Reklamation müssen wir „${word}“ genauer prüfen. Kunde: Welche Unterlagen benötigen Sie dafür von mir?`,
        `Kunde: Was muss ich beim Thema „${word}“ beachten? Mitarbeiter: Ich führe Sie Schritt für Schritt durch den Ablauf und fasse am Ende alles zusammen.`,
      ],
    },
    "الدفع والفواتير": {
      examples: [
        `Auf der Rechnung prüfe ich den Eintrag „${word}“ besonders sorgfältig, bevor ich dem Kunden antworte.`,
        `Die Buchhaltung kontrolliert „${word}“, damit der Zahlungsvorgang eindeutig nachvollziehbar bleibt.`,
        `Im Kundenkonto ist „${word}“ zusammen mit dem aktuellen Zahlungsstatus dokumentiert.`,
        `Ich erkläre dem Kunden den Begriff „${word}“ und nenne ihm anschließend die möglichen nächsten Schritte.`,
      ],
      situations: [
        `Kunde: Auf meiner Rechnung steht der Begriff „${word}“. Was bedeutet das genau? Mitarbeiter: Ich prüfe den Eintrag und erkläre Ihnen anschließend, wie die Zahlung verbucht wurde.`,
        `Mitarbeiter: Damit ich die Zahlung prüfen kann, benötige ich noch Angaben zu „${word}“. Kunde: In Ordnung. Ich sende Ihnen die Informationen sofort.`,
        `Kunde: Können Sie mir „${word}“ bitte genauer erklären? Mitarbeiter: Natürlich. Ich gehe die Buchung mit Ihnen durch und beantworte danach Ihre Fragen.`,
      ],
    },
    "خدمة العملاء": {
      examples: [
        `Im Kundenservice hilft „${word}“ dabei, ein Anliegen freundlich und professionell zu bearbeiten.`,
        `Ich verwende den Ausdruck „${word}“, wenn er zur Situation des Kunden passt.`,
        `Eine gute Lösung beginnt damit, „${word}“ richtig zu verstehen und gezielt nachzufragen.`,
        `Die Mitarbeiterin dokumentiert „${word}“ sachlich, damit der nächste Kollege den Fall sofort versteht.`,
      ],
      situations: [
        `Kunde: Ich brauche Unterstützung beim Thema „${word}“. Mitarbeiter: Gern. Erzählen Sie mir bitte kurz, was genau passiert ist.`,
        `Mitarbeiter: Darf ich Ihnen eine kurze Frage zu „${word}“ stellen? Kunde: Ja, natürlich. Welche Information benötigen Sie?`,
        `Kunde: Wie gehen wir bei „${word}“ jetzt weiter vor? Mitarbeiter: Ich erkläre Ihnen den nächsten Schritt und bleibe bei Rückfragen gern für Sie da.`,
      ],
    },
    "الهاتف والدعم التقني": {
      examples: [
        `Der technische Support prüft „${word}“ systematisch, bevor weitere Schritte eingeleitet werden.`,
        `Am Telefon erkläre ich „${word}“ langsam, deutlich und ohne unnötige Fachbegriffe.`,
        `Im Support-Ticket dokumentiere ich „${word}“ zusammen mit allen bereits getesteten Schritten.`,
        `Die Fachabteilung benötigt genaue Informationen zu „${word}“, um den Fehler zuverlässig zu analysieren.`,
      ],
      situations: [
        `Kunde: Mein technisches Problem betrifft „${word}“. Mitarbeiter: Welche Meldung sehen Sie genau, und seit wann tritt der Fehler auf?`,
        `Mitarbeiter: Ich prüfe jetzt „${word}“ und dokumentiere das Ergebnis. Kunde: Soll ich währenddessen am Telefon bleiben?`,
        `Kunde: Können Sie mir beim Thema „${word}“ helfen? Mitarbeiter: Ja. Wir gehen die Schritte gemeinsam durch und prüfen nach jedem Schritt das Ergebnis.`,
      ],
    },
    "المقابلة والعمل": {
      examples: [
        `Im Bewerbungsgespräch spreche ich offen über „${word}“ und verbinde den Begriff mit einer eigenen Erfahrung.`,
        `Für diese Position ist „${word}“ relevant, weil die Aufgabe direkten Kontakt mit Kunden erfordert.`,
        `Mein Beispiel aus der Praxis zeigt, wie ich „${word}“ im Arbeitsalltag konkret eingesetzt habe.`,
        `Die Frage zu „${word}“ beantworte ich mit einer kurzen Situation, meiner Aufgabe und dem erreichten Ergebnis.`,
      ],
      situations: [
        `Interviewer: Was können Sie uns über „${word}“ erzählen? Bewerber: Gern. Ich nenne Ihnen eine konkrete Situation und erkläre, was ich daraus gelernt habe.`,
        `Bewerber: Für meine Arbeit ist „${word}“ besonders wichtig. Interviewer: Können Sie das bitte mit einem praktischen Beispiel belegen?`,
        `Interviewer: Welche Erfahrung haben Sie mit „${word}“ gesammelt? Bewerber: Ich beschreibe Ihnen kurz die Ausgangssituation, meine Aufgabe und das Ergebnis.`,
      ],
    },
    "B2 والحياة اليومية": {
      examples: [
        `In einer B2-Diskussion verwende ich „${word}“ bewusst, um mein Argument genauer zu formulieren.`,
        `Mein Beitrag zum Alltag enthält „${word}“ und ein Beispiel aus meiner persönlichen Erfahrung.`,
        `Im Text wird „${word}“ erklärt und anschließend mit einem konkreten Beispiel verdeutlicht.`,
        `Mit dem Ausdruck „${word}“ kann ich meine Meinung differenziert und verständlich darstellen.`,
      ],
      situations: [
        `Prüfer: Wie verwenden Sie „${word}“ in einer Diskussion? Teilnehmer: Ich erkläre zuerst meine Meinung und ergänze danach ein Beispiel aus dem Alltag.`,
        `Teilnehmer: Mein nächster Punkt betrifft „${word}“. Prüfer: Bitte erklären Sie Ihre Position und nennen Sie einen konkreten Grund.`,
        `Prüfer: Welche Bedeutung hat „${word}“ in diesem Zusammenhang? Teilnehmer: Ich erkläre den Begriff kurz und zeige anschließend ein passendes Beispiel.`,
      ],
    },
  };
  const group = templates[category];
  return {
    exampleDe: group.examples[index % group.examples.length],
    situationDe: group.situations[index % group.situations.length],
  };
};

export const vocabulary: Vocabulary[] = vocabGroups.flatMap((group) => group.words.map(([word, arabic, type], index) => ({
  id: 0,
  word,
  arabic,
  type,
  category: group.category,
  ...learningText(word, group.category, index),
}))).map((item, index) => ({ ...item, id: index + 1 }));

export const scenarios: Scenario[] = [
  { id:1, titleDe:"Paket beschädigt", titleAr:"طرد تالف", category:"الشحن", tip:"اطلب Bestellnummer ثم الصور، وبعدها اعرض Ersatz أو Rückerstattung.", lines:[
    {speaker:"Kunde",de:"Guten Tag, mein Paket ist beschädigt angekommen. Der Karton war offen und das Produkt ist kaputt.",ar:"مرحبًا، وصل الطرد تالفًا. الكرتونة كانت مفتوحة والمنتج مكسور."},
    {speaker:"Mitarbeiter",de:"Das tut mir sehr leid. Könnten Sie mir bitte Ihre Bestellnummer nennen?",ar:"آسف جدًا لذلك. هل يمكن أن تعطيني رقم الطلب؟"},
    {speaker:"Kunde",de:"Ja, die Nummer ist 458732. Was passiert jetzt?",ar:"نعم، الرقم 458732. ماذا سيحدث الآن؟"},
    {speaker:"Mitarbeiter",de:"Bitte schicken Sie uns Fotos. Danach veranlassen wir kostenlos einen Ersatz oder eine Rückerstattung.",ar:"أرسل لنا صورًا من فضلك، وبعدها سنرتب بديلًا مجانيًا أو استردادًا للمبلغ."}
  ]},
  { id:2, titleDe:"Falsche Lieferung", titleAr:"طلب خاطئ", category:"الشحن", tip:"أكد أن Versandkosten الإرجاع على الشركة.", lines:[
    {speaker:"Kunde",de:"Ich habe ein blaues Hemd bestellt, aber ein rotes bekommen.",ar:"طلبت قميصًا أزرق لكن وصلني أحمر."},
    {speaker:"Mitarbeiter",de:"Entschuldigung für den Fehler. Wir schicken Ihnen sofort den richtigen Artikel.",ar:"نعتذر عن الخطأ. سنرسل لك المنتج الصحيح فورًا."},
    {speaker:"Kunde",de:"Muss ich die Rücksendung bezahlen?",ar:"هل أدفع تكاليف الإرجاع؟"},
    {speaker:"Mitarbeiter",de:"Nein. Sie erhalten ein kostenloses Rücksendeetikett.",ar:"لا. ستحصل على ملصق إرجاع مجاني."}
  ]},
  { id:3, titleDe:"Mahnung trotz Zahlung", titleAr:"إنذار رغم الدفع", category:"الدفع", tip:"لا تلغِ الإنذار قبل مراجعة Zahlungsbeleg وتسجيل Zahlung.", lines:[
    {speaker:"Kunde",de:"Ich habe eine Mahnung erhalten, obwohl ich schon bezahlt habe.",ar:"وصلني إنذار بالدفع رغم أنني دفعت."},
    {speaker:"Mitarbeiter",de:"Wann haben Sie bezahlt und welche Zahlungsart haben Sie genutzt?",ar:"متى دفعت وما وسيلة الدفع؟"},
    {speaker:"Kunde",de:"Vor einer Woche per Überweisung.",ar:"منذ أسبوع عن طريق تحويل بنكي."},
    {speaker:"Mitarbeiter",de:"Bitte senden Sie den Zahlungsbeleg. Ich prüfe die Buchung und storniere die Mahnung, falls ein Fehler vorliegt.",ar:"أرسل إثبات الدفع. سأراجع التسجيل وألغي الإنذار إذا كان هناك خطأ."}
  ]},
  { id:4, titleDe:"Zahlung abgelehnt", titleAr:"الدفع مرفوض", category:"الدفع", tip:"اقترح Versuch erneut أو andere Zahlungsart بدون طلب بيانات حساسة.", lines:[
    {speaker:"Kunde",de:"Meine Kreditkarte wurde abgelehnt. Ich weiß nicht, warum.",ar:"تم رفض بطاقتي ولا أعرف السبب."},
    {speaker:"Mitarbeiter",de:"Bitte prüfen Sie Guthaben und Kartendaten. Manchmal liegt es an einer Sicherheitsprüfung.",ar:"راجع الرصيد وبيانات البطاقة. أحيانًا يكون السبب فحصًا أمنيًا."},
    {speaker:"Kunde",de:"Die Daten sind richtig.",ar:"البيانات صحيحة."},
    {speaker:"Mitarbeiter",de:"Dann versuchen Sie es bitte erneut oder wählen Sie PayPal beziehungsweise Überweisung.",ar:"إذًا جرّب مرة أخرى أو اختر باي بال أو التحويل البنكي."}
  ]},
  { id:5, titleDe:"Retoure nicht verbucht", titleAr:"مرتجع غير مسجل", category:"الإرجاع", tip:"اذكر Bearbeitungszeit محددة ولا تعد بما لا تملكه.", lines:[
    {speaker:"Kunde",de:"Ich habe die Ware vor zwei Wochen zurückgeschickt, aber noch kein Geld erhalten.",ar:"أرجعت البضاعة منذ أسبوعين ولم يصل المال."},
    {speaker:"Mitarbeiter",de:"Könnten Sie mir bitte die Sendungsnummer geben?",ar:"هل يمكن أن تعطيني رقم الشحنة؟"},
    {speaker:"Kunde",de:"Ja, hier ist sie: 778899.",ar:"نعم، هو 778899."},
    {speaker:"Mitarbeiter",de:"Das Paket ist angekommen. Die Bearbeitung dauert normalerweise fünf bis sieben Werktage. Ich prüfe, ob wir den Vorgang beschleunigen können.",ar:"وصل الطرد. المعالجة تستغرق عادة 5–7 أيام عمل. سأراجع إمكانية تسريع العملية."}
  ]},
  { id:6, titleDe:"Lieferung verspätet", titleAr:"توصيل متأخر", category:"الشحن", tip:"استخدم voraussichtlich بدل وعد قطعي إن لم تكن متأكدًا.", lines:[
    {speaker:"Kunde",de:"Mein Paket sollte gestern ankommen, aber ich habe nichts bekommen.",ar:"كان يفترض أن يصل الطرد أمس ولم يصل."},
    {speaker:"Mitarbeiter",de:"Ich verstehe Ihren Ärger. Ich prüfe sofort den Status.",ar:"أتفهم غضبك. سأراجع الحالة فورًا."},
    {speaker:"Kunde",de:"Danke.",ar:"شكرًا."},
    {speaker:"Mitarbeiter",de:"Es gibt eine Verzögerung beim Versanddienstleister. Ihr Paket kommt voraussichtlich morgen an.",ar:"هناك تأخير لدى شركة الشحن. من المتوقع وصول الطرد غدًا."}
  ]},
  { id:7, titleDe:"System funktioniert nicht", titleAr:"النظام لا يعمل", category:"تقنية", tip:"بلّغ العميل ولا تتركه منتظرًا بلا معلومة، ووثّق ما يلزم وفق Datenschutz.", lines:[
    {speaker:"Kunde",de:"Können Sie meine Bestellung jetzt ändern?",ar:"هل يمكنك تعديل طلبي الآن؟"},
    {speaker:"Mitarbeiter",de:"Im Moment gibt es leider ein technisches Problem. Ich informiere sofort die IT-Abteilung.",ar:"للأسف توجد مشكلة تقنية الآن. سأبلغ قسم تقنية المعلومات فورًا."},
    {speaker:"Kunde",de:"Wie lange dauert das?",ar:"كم سيستغرق ذلك؟"},
    {speaker:"Mitarbeiter",de:"Ich kann noch keine genaue Zeit nennen. Ich dokumentiere Ihr Anliegen und melde mich, sobald das System wieder verfügbar ist.",ar:"لا أستطيع تحديد وقت دقيق الآن. سأوثق طلبك وأتواصل معك فور عودة النظام."}
  ]},
  { id:8, titleDe:"Beleidigender Kunde", titleAr:"عميل يهين الموظف", category:"عميل صعب", tip:"الهدوء لا يعني قبول الإهانة؛ استخدم حدود الشركة وسياسة التصعيد.", lines:[
    {speaker:"Kunde",de:"Ihr Service ist völlig unfähig!",ar:"خدمتكم غير كفؤة تمامًا!"},
    {speaker:"Mitarbeiter",de:"Ich verstehe, dass Sie sehr verärgert sind, und ich möchte Ihnen helfen.",ar:"أتفهم أنك غاضب جدًا وأريد مساعدتك."},
    {speaker:"Kunde",de:"Dann lösen Sie endlich mein Problem!",ar:"إذًا حل مشكلتي أخيرًا!"},
    {speaker:"Mitarbeiter",de:"Gern. Bitte bleiben wir respektvoll. Erklären Sie mir kurz, was genau passiert ist.",ar:"بكل سرور. دعنا نحافظ على الاحترام. اشرح لي باختصار ما الذي حدث."}
  ]}
];
