import { useEffect, useState } from "react";
import "./App.css";

// ---------------------------------------------------------------------------
// Professores. Dados compartilhados entre idiomas (textos ficam em `text`).
// ---------------------------------------------------------------------------
const MENTORS = [
  {
    id: "gabriel",
    name: "Gabriel Moraes",
    firstName: "Gabriel",
    photo: "/logo.png",
    photoPos: "50% 50%",
    alt: "Retrato ilustrado de Gabriel Moraes",
    techs: ["Python", "C#", "Java", "SQL"],
  },
  {
    id: "arthur",
    name: "Arthur",
    firstName: "Arthur",
    photo: "/ftArthur.png",
    photoPos: "50% 18%",
    alt: "Retrato ilustrado de Arthur com o troféu da Feira de Projetos SENAC 2025",
    techs: ["JavaScript", "React", "Node", "Mobile"],
  },
];

// ---------------------------------------------------------------------------
// Conteúdo em três idiomas. Chaves idênticas entre PT/EN/ES.
// ---------------------------------------------------------------------------
const text = {
  PT: {
    navSobre: "Quem ensina",
    navMetodo: "Método",
    navTrilhas: "Trilhas",
    navFaq: "Dúvidas",
    navContato: "Contato",

    heroTag: "Mentoria de programação · 1:1 · 100% online",
    heroTitleA: "Aprenda a programar com alguém",
    heroTitleEm: "do seu lado",
    heroTitleB: ".",
    heroLede:
      "Mentoria individual com plano sob medida, projetos reais e feedback direto: do primeiro “olá, mundo” ao portfólio que abre portas.",
    ctaPrimary: "Começar conversa",
    ctaSecondary: "Conhecer o método",
    heroBullets: [
      "Aulas e mentorias individuais, no seu ritmo",
      "Plano de estudos construído para o seu objetivo",
      "Projetos reais para o seu portfólio",
    ],

    scheduleWith: "Agendar com {name}",
    statusLine: "Vagas abertas · 1:1 · online · PT / EN / ES",

    mentors: {
      gabriel: {
        role: "Professor & mentor",
        cred: "Formação em tecnologia e educação",
        bio: "Une didática, estratégia e execução para transformar interesse em habilidade, com linguagem acessível e um plano que respeita o seu ponto de partida.",
      },
      arthur: {
        role: "Professor & desenvolvedor",
        cred: "2º lugar · Feira de Projetos SENAC 2025",
        bio: "Ensina construindo junto: projetos práticos desde o primeiro dia, correção próxima e a energia de quem está no código todos os dias.",
      },
    },

    aboutKicker: "( 01 · Quem ensina )",
    aboutTitle: "Dois professores, um mesmo método.",
    aboutLede:
      "Você escolhe com quem caminhar, ou combina os dois. A didática é a mesma: prática de verdade, feedback próximo e zero enrolação.",
    aboutList: [
      "Ensino com foco prático, aula a aula",
      "Mentoria orientada a resultados",
      "Projetos com aplicação real",
      "Acompanhamento entre as sessões",
    ],

    methodKicker: "( 02 · O método )",
    methodTitle: "Um caminho simples, feito para gerar progresso real.",
    methodLede: "Três etapas. Nenhuma fórmula mágica: direção, prática e constância.",
    steps: [
      {
        tag: "primeira conversa",
        title: "Diagnóstico",
        textBody:
          "Uma conversa para entender seu nível, seus objetivos e o melhor ponto de partida. Sem compromisso e sem julgamento.",
      },
      {
        tag: "semana 1",
        title: "Plano sob medida",
        textBody:
          "Montamos juntos uma trilha com foco em prática, clareza e ritmo sustentável. Nada de currículo genérico.",
      },
      {
        tag: "toda semana",
        title: "Execução com feedback",
        textBody:
          "Você aprende, aplica em projetos, recebe correção e ganha confiança para caminhar cada vez mais sozinho.",
      },
    ],

    tracksKicker: "( 03 · Trilhas )",
    tracksTitle: "Escolha por onde começar.",
    tracksLede: "Quatro trilhas, um mesmo método. Todas começam com uma conversa de diagnóstico.",
    trackAction: "Conversar sobre esta trilha",
    tracks: [
      {
        name: "Frontend",
        textBody: "Interfaces modernas, UX e desenvolvimento web completo: HTML, CSS, JavaScript e React.",
      },
      {
        name: "Backend",
        textBody: "APIs, servidores, bancos de dados e lógica de negócio: Node, C# e Java.",
      },
      {
        name: "Mobile",
        textBody: "Aplicativos móveis com React Native, da ideia à publicação.",
      },
      {
        name: "Dados",
        textBody: "Automação, análise de dados e Python para projetos inteligentes.",
      },
    ],

    fitKicker: "( 04 · É para você? )",
    fitTitle: "Mentoria boa é a que serve para o seu momento.",
    fitYesTitle: "Faz sentido se você…",
    fitYes: [
      "Está começando do zero e quer direção clara",
      "Estuda por conta própria mas sente que não sai do lugar",
      "Quer migrar de carreira com um plano realista",
      "Prefere aprender fazendo, com alguém para tirar dúvidas",
    ],
    fitNoTitle: "Talvez não seja a hora se você…",
    fitNo: [
      "Procura fórmula mágica ou resultado da noite para o dia",
      "Quer só um certificado, sem colocar a mão no código",
      "Não tem nenhum tempo na semana para praticar",
    ],

    faqKicker: "( 05 · Perguntas frequentes )",
    faqTitle: "O que costumam perguntar antes de começar.",
    faqs: [
      {
        q: "Preciso já saber programar?",
        a: "Não. O diagnóstico serve exatamente para encontrar o seu ponto de partida: do zero absoluto ao avançado.",
      },
      {
        q: "Como funcionam as aulas?",
        a: "Encontros individuais e online, com plano de estudos, projetos práticos e acompanhamento entre as sessões.",
      },
      {
        q: "Com qual professor vou aprender?",
        a: "Você escolhe na conversa de diagnóstico, Gabriel ou Arthur, de acordo com a trilha e os horários. O método é o mesmo com os dois.",
      },
      {
        q: "Quanto custa?",
        a: "Depende do formato: aula avulsa ou pacote. A primeira conversa é gratuita e sem compromisso. Nela definimos juntos o que faz sentido para você.",
      },
      {
        q: "Em quanto tempo vejo resultado?",
        a: "Depende do seu ritmo e dedicação. O que a mentoria garante é direção: você sempre vai saber o que estudar e por quê.",
      },
    ],

    ctaTitleA: "Pronto para",
    ctaTitleEm: "sair do lugar",
    ctaTitleB: "?",
    ctaText:
      "Chama a gente no WhatsApp e conta em que ponto você está. A primeira conversa é gratuita e pode ser o começo de uma virada.",
    ctaButton: "Chamar no WhatsApp",
    ctaNote: "Resposta rápida · sem compromisso",

    footerLine: "Ensino, estratégia e desenvolvimento profissional.",
    floatLabel: "Falar com os professores no WhatsApp",

    whatsappContactMessage: "Olá! Vi o site e quero saber mais sobre a mentoria.",
    whatsappMentorMessage: "Olá! Vi o site e quero conversar sobre mentoria com o professor {name}.",
    whatsappCourseMessage: "Olá! Vi o site e tenho interesse na trilha de {course}.",
  },

  EN: {
    navSobre: "Who teaches",
    navMetodo: "Method",
    navTrilhas: "Pathways",
    navFaq: "FAQ",
    navContato: "Contact",

    heroTag: "Programming mentorship · 1:1 · fully online",
    heroTitleA: "Learn to code with someone",
    heroTitleEm: "by your side",
    heroTitleB: ".",
    heroLede:
      "One-on-one mentorship with a tailored plan, real projects and direct feedback: from your first “hello, world” to a portfolio that opens doors.",
    ctaPrimary: "Start a conversation",
    ctaSecondary: "See the method",
    heroBullets: [
      "Individual lessons and mentorship, at your pace",
      "A study plan built around your goal",
      "Real projects for your portfolio",
    ],

    scheduleWith: "Book with {name}",
    statusLine: "Spots open · 1:1 · online · PT / EN / ES",

    mentors: {
      gabriel: {
        role: "Teacher & mentor",
        cred: "Background in technology and education",
        bio: "Blends teaching, strategy and execution to turn interest into skill, with accessible language and a plan that respects your starting point.",
      },
      arthur: {
        role: "Teacher & developer",
        cred: "2nd place · SENAC Project Fair 2025",
        bio: "Teaches by building together: hands-on projects from day one, close correction and the energy of someone who codes every day.",
      },
    },

    aboutKicker: "( 01 · Who teaches )",
    aboutTitle: "Two teachers, one method.",
    aboutLede:
      "You choose who walks with you, or combine both. The approach is the same: real practice, close feedback and zero fluff.",
    aboutList: [
      "Hands-on teaching, lesson by lesson",
      "Results-oriented mentorship",
      "Projects with real-world application",
      "Follow-up between sessions",
    ],

    methodKicker: "( 02 · The method )",
    methodTitle: "A simple path, designed for real progress.",
    methodLede: "Three steps. No magic formula: direction, practice and consistency.",
    steps: [
      {
        tag: "first talk",
        title: "Diagnosis",
        textBody:
          "A conversation to understand your level, your goals and the best starting point. No commitment, no judgement.",
      },
      {
        tag: "week 1",
        title: "Tailored plan",
        textBody:
          "Together we build a pathway focused on practice, clarity and a sustainable pace. No generic curriculum.",
      },
      {
        tag: "every week",
        title: "Execution with feedback",
        textBody:
          "You learn, apply it in projects, get corrections and gain the confidence to walk on your own.",
      },
    ],

    tracksKicker: "( 03 · Pathways )",
    tracksTitle: "Choose where to start.",
    tracksLede: "Four pathways, one method. All of them start with a diagnosis conversation.",
    trackAction: "Talk about this pathway",
    tracks: [
      {
        name: "Frontend",
        textBody: "Modern interfaces, UX and complete web development: HTML, CSS, JavaScript and React.",
      },
      {
        name: "Backend",
        textBody: "APIs, servers, databases and business logic: Node, C# and Java.",
      },
      {
        name: "Mobile",
        textBody: "Mobile apps with React Native, from idea to release.",
      },
      {
        name: "Data",
        textBody: "Automation, data analysis and Python for smart projects.",
      },
    ],

    fitKicker: "( 04 · Is it for you? )",
    fitTitle: "Good mentorship is the one that fits your moment.",
    fitYesTitle: "It makes sense if you…",
    fitYes: [
      "Are starting from zero and want clear direction",
      "Study on your own but feel stuck in place",
      "Want to switch careers with a realistic plan",
      "Prefer learning by doing, with someone to ask",
    ],
    fitNoTitle: "It may not be the time if you…",
    fitNo: [
      "Are looking for a magic formula or overnight results",
      "Only want a certificate, without touching code",
      "Have no time at all during the week to practice",
    ],

    faqKicker: "( 05 · Frequently asked )",
    faqTitle: "What people ask before starting.",
    faqs: [
      {
        q: "Do I need to know how to code already?",
        a: "No. The diagnosis exists precisely to find your starting point: from absolute zero to advanced.",
      },
      {
        q: "How do the lessons work?",
        a: "Individual online sessions, with a study plan, practical projects and follow-up between sessions.",
      },
      {
        q: "Which teacher will I learn with?",
        a: "You choose during the diagnosis conversation, Gabriel or Arthur, based on the pathway and schedule. The method is the same with both.",
      },
      {
        q: "How much does it cost?",
        a: "It depends on the format: single lessons or packages. The first conversation is free, with no commitment. That's where we define what fits you.",
      },
      {
        q: "How soon do I see results?",
        a: "It depends on your pace and dedication. What the mentorship guarantees is direction: you'll always know what to study and why.",
      },
    ],

    ctaTitleA: "Ready to",
    ctaTitleEm: "get unstuck",
    ctaTitleB: "?",
    ctaText:
      "Message us on WhatsApp and tell us where you are right now. The first conversation is free and it might be the start of a turning point.",
    ctaButton: "Message on WhatsApp",
    ctaNote: "Fast reply · no commitment",

    footerLine: "Teaching, strategy and professional growth.",
    floatLabel: "Talk to the teachers on WhatsApp",

    whatsappContactMessage: "Hi! I saw the website and I'd like to know more about the mentorship.",
    whatsappMentorMessage: "Hi! I saw the website and I'd like to talk about mentorship with {name}.",
    whatsappCourseMessage: "Hi! I saw the website and I'm interested in the {course} pathway.",
  },

  ES: {
    navSobre: "Quién enseña",
    navMetodo: "Método",
    navTrilhas: "Rutas",
    navFaq: "Dudas",
    navContato: "Contacto",

    heroTag: "Mentoría de programación · 1:1 · 100% online",
    heroTitleA: "Aprende a programar con alguien",
    heroTitleEm: "a tu lado",
    heroTitleB: ".",
    heroLede:
      "Mentoría individual con plan a medida, proyectos reales y feedback directo: desde tu primer “hola, mundo” hasta un portafolio que abre puertas.",
    ctaPrimary: "Empezar una conversación",
    ctaSecondary: "Conocer el método",
    heroBullets: [
      "Clases y mentorías individuales, a tu ritmo",
      "Plan de estudios construido para tu objetivo",
      "Proyectos reales para tu portafolio",
    ],

    scheduleWith: "Agendar con {name}",
    statusLine: "Plazas abiertas · 1:1 · online · PT / EN / ES",

    mentors: {
      gabriel: {
        role: "Profesor & mentor",
        cred: "Formación en tecnología y educación",
        bio: "Une didáctica, estrategia y ejecución para convertir interés en habilidad, con lenguaje accesible y un plan que respeta tu punto de partida.",
      },
      arthur: {
        role: "Profesor & desarrollador",
        cred: "2º lugar · Feria de Proyectos SENAC 2025",
        bio: "Enseña construyendo contigo: proyectos prácticos desde el primer día, corrección cercana y la energía de quien programa todos los días.",
      },
    },

    aboutKicker: "( 01 · Quién enseña )",
    aboutTitle: "Dos profesores, un mismo método.",
    aboutLede:
      "Tú eliges con quién caminar, o combinas a los dos. La didáctica es la misma: práctica de verdad, feedback cercano y cero relleno.",
    aboutList: [
      "Enseñanza práctica, clase a clase",
      "Mentoría orientada a resultados",
      "Proyectos con aplicación real",
      "Acompañamiento entre sesiones",
    ],

    methodKicker: "( 02 · El método )",
    methodTitle: "Un camino simple, pensado para generar progreso real.",
    methodLede: "Tres etapas. Ninguna fórmula mágica: dirección, práctica y constancia.",
    steps: [
      {
        tag: "primera charla",
        title: "Diagnóstico",
        textBody:
          "Una conversación para entender tu nivel, tus objetivos y el mejor punto de partida. Sin compromiso y sin juicios.",
      },
      {
        tag: "semana 1",
        title: "Plan a medida",
        textBody:
          "Armamos juntos una ruta enfocada en práctica, claridad y ritmo sostenible. Nada de currículo genérico.",
      },
      {
        tag: "cada semana",
        title: "Ejecución con feedback",
        textBody:
          "Aprendes, aplicas en proyectos, recibes correcciones y ganas confianza para caminar cada vez más solo.",
      },
    ],

    tracksKicker: "( 03 · Rutas )",
    tracksTitle: "Elige por dónde empezar.",
    tracksLede: "Cuatro rutas, un mismo método. Todas empiezan con una conversación de diagnóstico.",
    trackAction: "Hablar sobre esta ruta",
    tracks: [
      {
        name: "Frontend",
        textBody: "Interfaces modernas, UX y desarrollo web completo: HTML, CSS, JavaScript y React.",
      },
      {
        name: "Backend",
        textBody: "APIs, servidores, bases de datos y lógica de negocio: Node, C# y Java.",
      },
      {
        name: "Mobile",
        textBody: "Apps móviles con React Native, de la idea a la publicación.",
      },
      {
        name: "Datos",
        textBody: "Automatización, análisis de datos y Python para proyectos inteligentes.",
      },
    ],

    fitKicker: "( 04 · ¿Es para ti? )",
    fitTitle: "Una buena mentoría es la que sirve para tu momento.",
    fitYesTitle: "Tiene sentido si tú…",
    fitYes: [
      "Empiezas desde cero y quieres dirección clara",
      "Estudias por tu cuenta pero sientes que no avanzas",
      "Quieres cambiar de carrera con un plan realista",
      "Prefieres aprender haciendo, con alguien para preguntar",
    ],
    fitNoTitle: "Quizás no sea el momento si tú…",
    fitNo: [
      "Buscas una fórmula mágica o resultados de la noche a la mañana",
      "Solo quieres un certificado, sin tocar código",
      "No tienes nada de tiempo en la semana para practicar",
    ],

    faqKicker: "( 05 · Preguntas frecuentes )",
    faqTitle: "Lo que suelen preguntar antes de empezar.",
    faqs: [
      {
        q: "¿Necesito saber programar?",
        a: "No. El diagnóstico sirve exactamente para encontrar tu punto de partida: desde cero absoluto hasta avanzado.",
      },
      {
        q: "¿Cómo funcionan las clases?",
        a: "Encuentros individuales y online, con plan de estudios, proyectos prácticos y acompañamiento entre sesiones.",
      },
      {
        q: "¿Con qué profesor voy a aprender?",
        a: "Lo eliges en la conversación de diagnóstico, Gabriel o Arthur, según la ruta y los horarios. El método es el mismo con los dos.",
      },
      {
        q: "¿Cuánto cuesta?",
        a: "Depende del formato: clase suelta o paquete. La primera conversación es gratuita y sin compromiso. Ahí definimos juntos lo que tiene sentido para ti.",
      },
      {
        q: "¿En cuánto tiempo veo resultados?",
        a: "Depende de tu ritmo y dedicación. Lo que la mentoría garantiza es dirección: siempre sabrás qué estudiar y por qué.",
      },
    ],

    ctaTitleA: "¿Listo para",
    ctaTitleEm: "avanzar de verdad",
    ctaTitleB: "?",
    ctaText:
      "Escríbenos por WhatsApp y cuéntanos en qué punto estás. La primera conversación es gratuita y puede ser el comienzo de un cambio.",
    ctaButton: "Escribir por WhatsApp",
    ctaNote: "Respuesta rápida · sin compromiso",

    footerLine: "Enseñanza, estrategia y crecimiento profesional.",
    floatLabel: "Hablar con los profesores por WhatsApp",

    whatsappContactMessage: "¡Hola! Vi el sitio y quiero saber más sobre la mentoría.",
    whatsappMentorMessage: "¡Hola! Vi el sitio y quiero hablar sobre mentoría con el profesor {name}.",
    whatsappCourseMessage: "¡Hola! Vi el sitio y me interesa la ruta de {course}.",
  },
};

const languages = ["PT", "EN", "ES"];
const htmlLang = { PT: "pt-BR", EN: "en", ES: "es" };

const MARQUEE = [
  "Python", "JavaScript", "React", "Node", "C#", "Java",
  "SQL", "APIs", "Git", "HTML & CSS", "React Native", "TypeScript",
];

const whatsappNumber = "555193501176";

const createWhatsAppLink = (template, vars = {}) => {
  let message = template || "";
  Object.entries(vars).forEach(([key, value]) => {
    message = message.replace(`{${key}}`, value);
  });
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message.trim())}`;
};

const WhatsAppIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.94L2 22l5.2-1.5A9.9 9.9 0 1 0 12.04 2Zm0 1.8a8.1 8.1 0 1 1-4.13 15.08l-.3-.18-3.06.88.9-2.98-.2-.31A8.1 8.1 0 0 1 12.04 3.8Zm-3.3 4.36c-.18 0-.47.07-.72.34-.24.27-.94.92-.94 2.24 0 1.32.96 2.6 1.1 2.78.13.18 1.86 2.98 4.6 4.06 2.28.9 2.74.72 3.24.67.5-.04 1.6-.65 1.83-1.28.22-.63.22-1.17.15-1.28-.06-.11-.24-.18-.51-.31-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.13-.61.14-.18.27-.7.87-.86 1.05-.16.18-.31.2-.58.07-.27-.14-1.14-.42-2.17-1.34-.8-.72-1.34-1.6-1.5-1.87-.16-.27-.02-.42.12-.55.12-.12.27-.32.4-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.13-.6-1.45-.83-1.98-.2-.47-.4-.42-.56-.43l-.56-.02Z" />
  </svg>
);

function App() {
  const [language, setLanguage] = useState(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("gm:lang") : null;
    return languages.includes(saved) ? saved : "PT";
  });
  const t = text[language];

  useEffect(() => {
    document.documentElement.lang = htmlLang[language];
    localStorage.setItem("gm:lang", language);
  }, [language]);

  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("on"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("on");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const contactLink = createWhatsAppLink(t.whatsappContactMessage);
  const mentorLink = (mentor) =>
    createWhatsAppLink(t.whatsappMentorMessage, { name: mentor.firstName });

  return (
    <div className="page">
      <a className="skip-link" href="#inicio">
        {t.navContato}
      </a>

      <header className="topbar">
        <a href="#inicio" className="brand">
          <span className="brand-prof">prof.</span>
          <span className="brand-name">
            Gabriel Moraes<span className="brand-dot">.</span>
          </span>
        </a>

        <nav className="topnav" aria-label="Menu principal">
          <a href="#sobre">{t.navSobre}</a>
          <a href="#metodo">{t.navMetodo}</a>
          <a href="#trilhas">{t.navTrilhas}</a>
          <a href="#faq">{t.navFaq}</a>
        </nav>

        <div className="topbar-right">
          <div className="lang-switch" role="group" aria-label="Idioma">
            {languages.map((code) => (
              <button
                key={code}
                type="button"
                className={code === language ? "active" : ""}
                aria-pressed={code === language}
                onClick={() => setLanguage(code)}
              >
                {code}
              </button>
            ))}
          </div>
          <a className="btn btn-ink btn-small" href={contactLink} target="_blank" rel="noopener noreferrer">
            {t.navContato}
          </a>
        </div>
      </header>

      <main>
        {/* ------------------------------------------------ hero */}
        <section id="inicio" className="hero">
          <div className="hero-copy">
            <p className="kicker hero-kicker">{t.heroTag}</p>
            <h1>
              {t.heroTitleA} <em className="mark">{t.heroTitleEm}</em>
              {t.heroTitleB}
            </h1>
            <p className="lede">{t.heroLede}</p>

            <div className="hero-actions">
              <a className="btn btn-ink" href={contactLink} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                {t.ctaPrimary}
              </a>
              <a className="btn btn-ghost" href="#metodo">
                {t.ctaSecondary} ↓
              </a>
            </div>

            <ul className="hero-bullets">
              {t.heroBullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <aside className="hero-card-wrap" aria-label={t.navSobre}>
            <div className="hero-cards">
              {MENTORS.map((mentor) => (
                <div key={mentor.id} className="hero-card">
                  <span className="tape" aria-hidden="true" />
                  <div className="hero-card-head">
                    <img
                      src={mentor.photo}
                      alt={mentor.alt}
                      width="60"
                      height="60"
                      style={{ objectPosition: mentor.photoPos }}
                    />
                    <div>
                      <p className="hero-card-role">{t.mentors[mentor.id].role}</p>
                      <p className="hero-card-name">{mentor.name}</p>
                    </div>
                  </div>
                  <div className="hero-card-tags">
                    {mentor.techs.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                  <a
                    className="btn btn-blue"
                    href={mentorLink(mentor)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.scheduleWith.replace("{name}", mentor.firstName)}
                  </a>
                </div>
              ))}
            </div>
            <p className="hero-status">
              <span className="dot" aria-hidden="true" />
              {t.statusLine}
            </p>
          </aside>
        </section>

        {/* ------------------------------------------------ marquee */}
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...MARQUEE, ...MARQUEE].map((item, i) => (
              <span key={`${item}-${i}`}>
                {item}
                <i>✳</i>
              </span>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------ quem ensina */}
        <section id="sobre" className="section" data-reveal>
          <p className="kicker">{t.aboutKicker}</p>
          <div className="section-head">
            <h2>{t.aboutTitle}</h2>
            <p>{t.aboutLede}</p>
          </div>

          <div className="mentors-grid">
            {MENTORS.map((mentor) => (
              <article key={mentor.id} className="mentor-profile">
                <span className="tape" aria-hidden="true" />
                <div className="mentor-head">
                  <img
                    src={mentor.photo}
                    alt={mentor.alt}
                    width="96"
                    height="96"
                    style={{ objectPosition: mentor.photoPos }}
                  />
                  <div>
                    <p className="mentor-role">{t.mentors[mentor.id].role}</p>
                    <h3>{mentor.name}</h3>
                    <p className="mentor-cred">{t.mentors[mentor.id].cred}</p>
                  </div>
                </div>
                <p className="mentor-bio">{t.mentors[mentor.id].bio}</p>
                <div className="chip-row">
                  {mentor.techs.map((tech) => (
                    <span key={tech} className="chip">
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  className="mentor-cta"
                  href={mentorLink(mentor)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.scheduleWith.replace("{name}", mentor.firstName)}{" "}
                  <span aria-hidden="true">→</span>
                </a>
              </article>
            ))}
          </div>

          <ul className="plus-list plus-row">
            {t.aboutList.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------ método */}
        <section id="metodo" className="section" data-reveal>
          <p className="kicker">{t.methodKicker}</p>
          <div className="section-head">
            <h2>{t.methodTitle}</h2>
            <p>{t.methodLede}</p>
          </div>
          <ol className="steps">
            {t.steps.map((step, index) => (
              <li key={step.title} className="step">
                <span className="step-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <div className="step-body">
                  <h3>{step.title}</h3>
                  <p>{step.textBody}</p>
                </div>
                <span className="step-tag">{step.tag}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* ------------------------------------------------ trilhas */}
        <section id="trilhas" className="section" data-reveal>
          <p className="kicker">{t.tracksKicker}</p>
          <div className="section-head">
            <h2>{t.tracksTitle}</h2>
            <p>{t.tracksLede}</p>
          </div>
          <div className="tracks">
            {t.tracks.map((track, index) => (
              <a
                key={track.name}
                className="track"
                href={createWhatsAppLink(t.whatsappCourseMessage, { course: track.name })}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="track-index" aria-hidden="true">
                  0{index + 1}
                </span>
                <h3 className="track-name">{track.name}</h3>
                <p className="track-text">{track.textBody}</p>
                <span className="track-cta">
                  {t.trackAction} <span aria-hidden="true">→</span>
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------ fit */}
        <section id="fit" className="section" data-reveal>
          <p className="kicker">{t.fitKicker}</p>
          <div className="section-head">
            <h2>{t.fitTitle}</h2>
          </div>
          <div className="fit-grid">
            <div className="fit-panel fit-yes">
              <h3>{t.fitYesTitle}</h3>
              <ul>
                {t.fitYes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="fit-panel fit-no">
              <h3>{t.fitNoTitle}</h3>
              <ul>
                {t.fitNo.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ faq */}
        <section id="faq" className="section" data-reveal>
          <p className="kicker">{t.faqKicker}</p>
          <div className="section-head">
            <h2>{t.faqTitle}</h2>
          </div>
          <div className="faq">
            {t.faqs.map((item) => (
              <details key={item.q}>
                <summary>
                  {item.q}
                  <span className="faq-plus" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------ cta final */}
        <section id="contato" className="cta" data-reveal>
          <h2>
            {t.ctaTitleA} <em className="mark">{t.ctaTitleEm}</em>
            {t.ctaTitleB}
          </h2>
          <p>{t.ctaText}</p>
          <a className="btn btn-wa" href={contactLink} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon size={20} />
            {t.ctaButton}
          </a>
          <p className="cta-note">{t.ctaNote}</p>
        </section>
      </main>

      <footer className="footer">
        <p>
          <strong>Gabriel Moraes & Arthur</strong> · {t.footerLine}
        </p>
        <nav aria-label="Rodapé">
          <a href="#sobre">{t.navSobre}</a>
          <a href="#metodo">{t.navMetodo}</a>
          <a href="#trilhas">{t.navTrilhas}</a>
          <a href="#faq">{t.navFaq}</a>
        </nav>
        <p className="footer-year">© {new Date().getFullYear()}</p>
      </footer>

      <a
        className="float-wa"
        href={contactLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.floatLabel}
        title={t.floatLabel}
      >
        <WhatsAppIcon size={26} />
      </a>
    </div>
  );
}

export default App;
