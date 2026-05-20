import { useState } from "react";
import "./App.css";

const text = {
  PT: {
    overlayTitle: "Escolha o idioma",
    close: "Fechar menu de idioma",
    languageButton: "Alterar idioma",
    heroEyebrow: "Aprendizado com foco profissional",
    heroTitle: "Domine conceitos e tecnologias com um percurso claro.",
    heroText:
      "Conteúdo pensado para estudantes que querem aprender com consistência e construir projetos reais. Aqui você encontra rotas de estudo confiáveis e explicações diretas.",
    ctaPrimary: "Ver plano de aprendizado",
    ctaSecondary: "Ver tecnologias",
    sectionHow: "Aprendizado estruturado",
    sectionHowTitle: "Método para quem quer resultado",
    sectionHowText:
      "Estudo organizado em passos, prática dirigida e tecnologias relevantes para cada fase da sua jornada.",
    highlight1Title: "Aprendizado aplicado",
    highlight1Text: "Foque em conceitos usados no mercado e em projetos reais.",
    highlight2Title: "Material organizado",
    highlight2Text: "Cada etapa aparece com objetivos claros e linguagem direta.",
    highlight3Title: "Trajetória prática",
    highlight3Text: "Você evolui com exemplos, projetos e revisão constante.",
    techTitle: "Tecnologias para aprender hoje",
    techSubtitle:
      "Linguagens, frameworks e bancos de dados que ajudam a construir seu portfólio.",
    planTitle: "O fluxo ideal de estudo",
    path1Title: "Fundamentos sólidos",
    path1Text:
      "Comece por lógica, HTML, CSS e JavaScript para formar uma base confiável.",
    path2Title: "Aprenda a construir",
    path2Text:
      "Use React, Node e Express para desenvolver aplicações completas.",
    path3Title: "Escale seu conhecimento",
    path3Text:
      "Adicione TypeScript, bancos de dados e deploy para projetos profissionais.",
    ctaTitle: "Pronto para ir além?",
    ctaSubtitle: "Seu estudo precisa ser bem direcionado.",
    ctaText:
      "Use o material certo para evoluir na programação sem perder tempo com tópicos desorganizados.",
    whatsappContactMessage:
      "Olá, gostaria de saber mais sobre como começar meus estudos em programação.",
    whatsappCourseMessage:
      "Olá, gostei do curso de {course}. Gostaria de saber mais detalhes sobre ele.",
    contactLabel: "Fale conosco",
    cardAction: "Ver mais",
    footerText:
      "Prof Gabriel Moraes • Treino e tecnologia para quem quer aprender com propósito.",
    navHome: "Início",
    navMethod: "Aprendizado",
    navTech: "Tecnologias",
    navContact: "Contato",
  },
  EN: {
    overlayTitle: "Choose your language",
    close: "Close language menu",
    languageButton: "Change language",
    heroEyebrow: "Learning with a professional focus",
    heroTitle: "Master concepts and technologies with a clear path.",
    heroText:
      "Content designed for learners who want consistency and real project experience. Find trusted study routes and direct explanations here.",
    ctaPrimary: "See learning plan",
    ctaSecondary: "View technologies",
    sectionHow: "Structured learning",
    sectionHowTitle: "A method for getting results",
    sectionHowText:
      "Learning organized into steps, guided practice, and relevant technologies for every phase of your journey.",
    highlight1Title: "Applied learning",
    highlight1Text: "Focus on concepts used in real market projects.",
    highlight2Title: "Organized material",
    highlight2Text: "Each stage appears with clear goals and direct language.",
    highlight3Title: "Practical path",
    highlight3Text: "You progress with examples, projects and constant review.",
    techTitle: "Technologies to learn today",
    techSubtitle:
      "Languages, frameworks, and databases that help build your portfolio.",
    planTitle: "The ideal study flow",
    path1Title: "Solid fundamentals",
    path1Text:
      "Start with logic, HTML, CSS, and JavaScript to build a reliable base.",
    path2Title: "Learn to build",
    path2Text: "Use React, Node, and Express to develop complete applications.",
    path3Title: "Scale your knowledge",
    path3Text:
      "Add TypeScript, databases, and deploy to build professional projects.",
    ctaTitle: "Ready to go further?",
    ctaSubtitle: "Your study needs to be well directed.",
    ctaText:
      "Use the right material to evolve in programming without wasting time on unfocused topics.",
    whatsappContactMessage:
      "Hi, I would like to learn more about how to start my programming studies.",
    whatsappCourseMessage:
      "Hi, I liked the {course} course. I would like to know more details about it.",
    contactLabel: "Contact us",
    cardAction: "Learn more",
    footerText:
      "Prof Gabriel Moraes • Training and technology for learners with purpose.",
    navHome: "Home",
    navMethod: "Learning",
    navTech: "Technologies",
    navContact: "Contact",
  },
  ES: {
    overlayTitle: "Elige el idioma",
    close: "Cerrar menú de idioma",
    languageButton: "Cambiar idioma",
    heroEyebrow: "Aprendizaje con enfoque profesional",
    heroTitle: "Domina conceptos y tecnologías con un camino claro.",
    heroText:
      "Contenido pensado para quienes quieren consistencia y experiencia con proyectos reales. Encuentra rutas de estudio confiables y explicaciones directas.",
    ctaPrimary: "Ver plan de aprendizaje",
    ctaSecondary: "Ver tecnologías",
    sectionHow: "Aprendizaje estructurado",
    sectionHowTitle: "Método para obtener resultados",
    sectionHowText:
      "Aprendizaje organizado en pasos, práctica guiada y tecnologías relevantes para cada fase de tu trayectoria.",
    highlight1Title: "Aprendizaje aplicado",
    highlight1Text: "Enfócate en conceptos usados en proyectos reales.",
    highlight2Title: "Material organizado",
    highlight2Text: "Cada etapa aparece con objetivos claros y lenguaje directo.",
    highlight3Title: "Camino práctico",
    highlight3Text: "Avanzas con ejemplos, proyectos y revisión constante.",
    techTitle: "Tecnologías para aprender hoy",
    techSubtitle:
      "Lenguajes, frameworks y bases de datos para construir tu portafolio.",
    planTitle: "El flujo de estudio ideal",
    path1Title: "Fundamentos sólidos",
    path1Text:
      "Empieza con lógica, HTML, CSS y JavaScript para crear una base confiable.",
    path2Title: "Aprende a construir",
    path2Text:
      "Usa React, Node y Express para desarrollar aplicaciones completas.",
    path3Title: "Escala tu conocimiento",
    path3Text:
      "Agrega TypeScript, bases de datos y deploy para proyectos profesionales.",
    ctaTitle: "¿Listo para avanzar?",
    ctaSubtitle: "Tu estudio debe estar bien dirigido.",
    ctaText:
      "Usa el material correcto para evolucionar en programación sin perder tiempo en temas dispersos.",
    whatsappContactMessage:
      "Hola, me gustaría saber más sobre cómo comenzar mis estudios en programación.",
    whatsappCourseMessage:
      "Hola, me gustó el curso de {course}. Quisiera saber más detalles al respecto.",
    contactLabel: "Contáctanos",
    cardAction: "Ver más",
    footerText:
      "Prof Gabriel Moraes • Entrenamiento y tecnología para quienes aprenden con propósito.",
    navHome: "Inicio",
    navMethod: "Aprendizaje",
    navTech: "Tecnologías",
    navContact: "Contacto",
  },
};

const languages = [
  { code: "PT", label: "Português" },
  { code: "EN", label: "English" },
  { code: "ES", label: "Español" },
];

const whatsappNumber = "55993501176";

const createWhatsAppText = (template, course = "") => {
  const message = template.replace("{course}", course);
  return encodeURIComponent(message);
};

const createWhatsAppLink = (template, course = "") => {
  return `https://wa.me/${whatsappNumber}?text=${createWhatsAppText(template, course)}`;
};

function App() {
  const [language, setLanguage] = useState("PT");
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const t = text[language];

  return (
    <div className="app-shell">
      {langMenuOpen && (
        <div className="overlay" role="dialog" aria-modal="true">
          <div className="overlay-panel">
            <div className="overlay-header">
              <div>
                <p className="eyebrow">Prof Gabriel Moraes</p>
                <h2>{t.overlayTitle}</h2>
              </div>
              <button
                className="close-overlay"
                type="button"
                onClick={() => setLangMenuOpen(false)}
                aria-label={t.close}
              >
                ×
              </button>
            </div>
            <div className="language-options">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  className={`language-option ${lang.code === language ? "active" : ""}`}
                  onClick={() => {
                    setLanguage(lang.code);
                    setLangMenuOpen(false);
                  }}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── HEADER ── */}
      <header className="site-header">
        <a href="#inicio" className="brand">
          <div
            style={{
              background: "#0F172A",
              borderRadius: 14,
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg
              viewBox="0 0 104 104"
              width="32"
              height="32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#6C63FF" />
                  <stop offset="100%" stopColor="#22D3EE" />
                </linearGradient>
              </defs>
              <path
                d="M30 30 L16 52 L30 74"
                stroke="url(#lg)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M74 30 L88 52 L74 74"
                stroke="url(#lg)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line
                x1="62"
                y1="26"
                x2="42"
                y2="78"
                stroke="#22D3EE"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <circle cx="90" cy="18" r="10" fill="#6C63FF" />
              <circle cx="90" cy="18" r="5" fill="#22D3EE" />
            </svg>
          </div>
          <div style={{ lineHeight: 1.1 }}>
            <span
              style={{
                display: "block",
                fontSize: 10,
                letterSpacing: 3,
                color: "#94A3B8",
                fontWeight: 400,
              }}
            >
              PROF
            </span>
            <strong style={{ fontSize: 17, letterSpacing: -0.3 }}>
              Gabriel <span style={{ fontWeight: 300 }}>Moraes</span>
            </strong>
          </div>
        </a>

        <nav className="main-nav" aria-label="Menu principal">
          <a href="#inicio">{t.navHome}</a>
          <a href="#metodo">{t.navMethod}</a>
          <a href="#tecnologias">{t.navTech}</a>
          <a href="#contato">{t.navContact}</a>
        </nav>

        <button
          type="button"
          className="button button-lang"
          onClick={() => setLangMenuOpen(true)}
        >
          {language}
        </button>
      </header>

      <main>
        {/* ── HERO ── */}
        <section id="inicio" className="section hero section-hero">
          <div className="hero-copy">
            <p className="eyebrow">{t.heroEyebrow}</p>
            <h1>{t.heroTitle}</h1>
            <p className="hero-text">{t.heroText}</p>

            <div className="hero-actions">
              <a href="#metodo" className="button button-primary">
                {t.ctaPrimary}
              </a>
              <a href="#tecnologias" className="button button-secondary">
                {t.ctaSecondary}
              </a>
            </div>

            <div className="hero-highlights">
              <div>
                <strong>{t.highlight1Title}</strong>
                <span>{t.highlight1Text}</span>
              </div>
              <div>
                <strong>{t.highlight2Title}</strong>
                <span>{t.highlight2Text}</span>
              </div>
              <div>
                <strong>{t.highlight3Title}</strong>
                <span>{t.highlight3Text}</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="card-visual">
              <svg
                viewBox="0 0 680 480"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect
                  x="120"
                  y="60"
                  width="440"
                  height="300"
                  rx="18"
                  fill="#1E293B"
                />
                <rect
                  x="134"
                  y="74"
                  width="412"
                  height="272"
                  rx="10"
                  fill="#0F172A"
                />
                <rect
                  x="134"
                  y="74"
                  width="412"
                  height="22"
                  rx="6"
                  fill="#1E293B"
                />
                <circle cx="150" cy="85" r="5" fill="#EF4444" />
                <circle cx="165" cy="85" r="5" fill="#F59E0B" />
                <circle cx="180" cy="85" r="5" fill="#22C55E" />
                <rect
                  x="220"
                  y="80"
                  width="100"
                  height="10"
                  rx="5"
                  fill="#334155"
                />
                <rect
                  x="158"
                  y="100"
                  width="60"
                  height="10"
                  rx="5"
                  fill="#818CF8"
                />
                <rect
                  x="226"
                  y="100"
                  width="90"
                  height="10"
                  rx="5"
                  fill="#34D399"
                />
                <rect
                  x="324"
                  y="100"
                  width="50"
                  height="10"
                  rx="5"
                  fill="#64748B"
                />
                <rect
                  x="170"
                  y="122"
                  width="80"
                  height="10"
                  rx="5"
                  fill="#F472B6"
                />
                <rect
                  x="258"
                  y="122"
                  width="110"
                  height="10"
                  rx="5"
                  fill="#FBBF24"
                />
                <rect
                  x="376"
                  y="122"
                  width="40"
                  height="10"
                  rx="5"
                  fill="#64748B"
                />
                <rect
                  x="182"
                  y="144"
                  width="60"
                  height="10"
                  rx="5"
                  fill="#34D399"
                />
                <rect
                  x="250"
                  y="144"
                  width="70"
                  height="10"
                  rx="5"
                  fill="#818CF8"
                />
                <rect
                  x="328"
                  y="144"
                  width="55"
                  height="10"
                  rx="5"
                  fill="#F472B6"
                />
                <rect
                  x="182"
                  y="166"
                  width="40"
                  height="10"
                  rx="5"
                  fill="#FBBF24"
                />
                <rect
                  x="230"
                  y="166"
                  width="100"
                  height="10"
                  rx="5"
                  fill="#64748B"
                />
                <rect
                  x="170"
                  y="188"
                  width="50"
                  height="10"
                  rx="5"
                  fill="#818CF8"
                />
                <rect
                  x="228"
                  y="188"
                  width="85"
                  height="10"
                  rx="5"
                  fill="#34D399"
                />
                <rect
                  x="321"
                  y="188"
                  width="60"
                  height="10"
                  rx="5"
                  fill="#64748B"
                />
                <rect
                  x="158"
                  y="210"
                  width="70"
                  height="10"
                  rx="5"
                  fill="#F472B6"
                />
                <rect
                  x="236"
                  y="210"
                  width="55"
                  height="10"
                  rx="5"
                  fill="#818CF8"
                />
                <rect
                  x="182"
                  y="232"
                  width="90"
                  height="10"
                  rx="5"
                  fill="#FBBF24"
                />
                <rect
                  x="280"
                  y="232"
                  width="75"
                  height="10"
                  rx="5"
                  fill="#34D399"
                />
                <rect
                  x="182"
                  y="254"
                  width="60"
                  height="10"
                  rx="5"
                  fill="#64748B"
                />
                <rect
                  x="250"
                  y="254"
                  width="110"
                  height="10"
                  rx="5"
                  fill="#F472B6"
                />
                <rect
                  x="158"
                  y="276"
                  width="3"
                  height="14"
                  rx="1"
                  fill="#818CF8"
                  opacity="0.9"
                />
                <rect
                  x="315"
                  y="360"
                  width="50"
                  height="24"
                  rx="4"
                  fill="#334155"
                />
                <rect
                  x="270"
                  y="384"
                  width="140"
                  height="10"
                  rx="5"
                  fill="#475569"
                />
                <rect
                  x="60"
                  y="90"
                  width="54"
                  height="54"
                  rx="14"
                  fill="#F7DF1E"
                />
                <text
                  x="87"
                  y="126"
                  textAnchor="middle"
                  fontFamily="monospace"
                  fontWeight="700"
                  fontSize="20"
                  fill="#1E1E1E"
                >
                  JS
                </text>
                <circle
                  cx="600"
                  cy="120"
                  r="30"
                  fill="#1E293B"
                  stroke="#61DAFB"
                  strokeWidth="2.5"
                />
                <text
                  x="600"
                  y="126"
                  textAnchor="middle"
                  fontFamily="monospace"
                  fontWeight="700"
                  fontSize="13"
                  fill="#61DAFB"
                >
                  React
                </text>
                <rect
                  x="55"
                  y="250"
                  width="60"
                  height="32"
                  rx="10"
                  fill="#3776AB"
                />
                <text
                  x="85"
                  y="271"
                  textAnchor="middle"
                  fontFamily="monospace"
                  fontWeight="700"
                  fontSize="12"
                  fill="#FFD343"
                >
                  Python
                </text>
                <rect
                  x="590"
                  y="220"
                  width="50"
                  height="50"
                  rx="12"
                  fill="#3178C6"
                />
                <text
                  x="615"
                  y="254"
                  textAnchor="middle"
                  fontFamily="monospace"
                  fontWeight="700"
                  fontSize="20"
                  fill="#FFFFFF"
                >
                  TS
                </text>
                <rect
                  x="580"
                  y="310"
                  width="60"
                  height="30"
                  rx="10"
                  fill="#3C873A"
                />
                <text
                  x="610"
                  y="330"
                  textAnchor="middle"
                  fontFamily="monospace"
                  fontWeight="700"
                  fontSize="12"
                  fill="#FFFFFF"
                >
                  Node
                </text>
                <rect
                  x="60"
                  y="320"
                  width="60"
                  height="30"
                  rx="10"
                  fill="#E34F26"
                />
                <text
                  x="90"
                  y="340"
                  textAnchor="middle"
                  fontFamily="monospace"
                  fontWeight="700"
                  fontSize="12"
                  fill="#FFFFFF"
                >
                  HTML
                </text>
                <circle cx="100" cy="200" r="3" fill="#818CF8" opacity="0.7" />
                <circle cx="80" cy="170" r="2" fill="#F472B6" opacity="0.5" />
                <circle cx="115" cy="160" r="2" fill="#34D399" opacity="0.6" />
                <circle cx="570" cy="175" r="3" fill="#FBBF24" opacity="0.7" />
                <circle cx="558" cy="200" r="2" fill="#818CF8" opacity="0.5" />
              </svg>
              <div className="visual-bubble">
                Aprenda com exemplos práticos e objetivos.
              </div>
            </div>
          </div>
        </section>

        {/* ── ABOUT / QUEM SOU EU ── */}
        <section id="sobre" className="section section-about">
          <div className="about-card">
            <div className="about-left">
              <div className="about-avatar">
                <img src="/logo.png" alt="Prof. Gabriel Moraes" />
              </div>
              <div className="about-name">
                <p className="eyebrow">Quem sou eu</p>
                <h2>
                  Prof. Gabriel
                  <br />
                  Moraes
                </h2>
              </div>
            </div>

            <div className="about-right">
              <p className="about-text">
                Graduado em <strong>Sistemas para Internet</strong> pelo IFSul
                com formação pedagógica em Pedagogia, especialista em{" "}
                <strong>Administração, Orientação e Supervisão Escolar</strong>{" "}
                e especialista em <strong>Saúde Digital</strong> pela UFG,
                mestre em{" "}
                <strong>Tecnologia da Informação e Gestão em Saúde</strong> pela
                UFCSPA com ênfase em <strong>Sistemas Inteligentes</strong>.
              </p>

              <p className="about-text">
                Com <strong>mais de 5 anos de experiência</strong> como
                professor na rede escolar, atua no ensino de programação com
                foco em resultados práticos e linguagem acessível. Acredita que
                qualquer pessoa pode aprender a programar quando o conteúdo é
                bem estruturado e o caminho é claro.
              </p>

              <div className="about-tech">
                <p className="about-tech-label">Tecnologias que ensina</p>
                <div className="about-tech-list">
                  {["Python", "C#", "Node", "React Native", "Java"].map(
                    (tech) => (
                      <span key={tech} className="about-tech-tag">
                        {tech}
                      </span>
                    ),
                  )}
                </div>
              </div>

              <div className="about-badges">
                <span className="about-badge">
                  🎓 IFSul — Sistemas para Internet
                </span>
                <span className="about-badge">
                  📚 Pedagogia & Supervisão Escolar
                </span>
                <span className="about-badge">🏥 Saúde Digital — UFG</span>
                <span className="about-badge">
                  🤖 Mestrado TI & Saúde — UFCSPA
                </span>
                <span className="about-badge">🏫 +5 anos em sala de aula</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── MÉTODO ── */}
        <section id="metodo" className="section section-grid">
          <div className="section-header">
            <p className="eyebrow">{t.sectionHow}</p>
            <h2>{t.sectionHowTitle}</h2>
            <p className="section-description">{t.sectionHowText}</p>
          </div>
          <div className="grid-cards">
            <article className="info-card">
              <div className="icon icon-code" aria-hidden="true">
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 14L8 24L16 34"
                    stroke="#4F46E5"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M32 14L40 24L32 34"
                    stroke="#4F46E5"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M24 10H16C12.6863 10 10 12.6863 10 16V32C10 35.3137 12.6863 38 16 38H24"
                    stroke="#4F46E5"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3>Aprenda com foco</h3>
              <p>
                Materiais estruturados em ciclos de aprendizado rápido para você
                avançar com segurança.
              </p>
            </article>

            <article className="info-card">
              <div className="icon icon-light" aria-hidden="true">
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24 15C19.5817 15 16 18.5817 16 23C16 25.7665 17.2314 28.2684 19.2856 30.0788C20.3735 31.0104 21 32.3728 21 33.8824V36H27V33.8824C27 32.3728 27.6265 31.0104 28.7144 30.0788C30.7686 28.2684 32 25.7665 32 23C32 18.5817 28.4183 15 24 15Z"
                    stroke="#10B981"
                    strokeWidth="4"
                  />
                  <path
                    d="M24 38V44"
                    stroke="#10B981"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3>Conteúdo relevante</h3>
              <p>
                Você encontra os conceitos certos para evoluir de forma prática
                e aplicável no mercado.
              </p>
            </article>

            <article className="info-card">
              <div className="icon icon-rocket" aria-hidden="true">
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18 30L10 42L20 36L18 30Z" fill="#F59E0B" />
                  <path d="M30 30L38 42L28 36L30 30Z" fill="#F59E0B" />
                  <path
                    d="M24 8C18 8 13.5 11.9 12 17.3C10.8 21.4 11.7 26.3 13.9 30.1L24 44L34.1 30.1C36.3 26.3 37.2 21.4 36 17.3C34.5 11.9 30 8 24 8Z"
                    stroke="#F97316"
                    strokeWidth="4"
                    strokeLinejoin="round"
                  />
                  <circle cx="24" cy="20" r="4" fill="#F97316" />
                </svg>
              </div>
              <h3>Impacto real</h3>
              <p>
                Estude tecnologias que são usadas em projetos reais do mercado
                atual.
              </p>
            </article>

            <article className="info-card">
              <div className="icon icon-support" aria-hidden="true">
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24 12C17.3726 12 12 17.3726 12 24C12 30.6274 17.3726 36 24 36C30.6274 36 36 30.6274 36 24C36 17.3726 30.6274 12 24 12Z"
                    stroke="#38BDF8"
                    strokeWidth="4"
                  />
                  <path
                    d="M24 18V24"
                    stroke="#38BDF8"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M24 28H24.01"
                    stroke="#38BDF8"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3>Suporte contínuo</h3>
              <p>
                Aprenda com acompanhamento e suporte constante, para avançar sem
                perder o foco.
              </p>
            </article>
          </div>
        </section>

        {/* ── TECNOLOGIAS ── */}
        <section id="tecnologias" className="section section-tecnologias">
          <div className="section-header">
            <p className="eyebrow">{t.navTech}</p>
            <h2>{t.techTitle}</h2>
            <p className="section-description">{t.techSubtitle}</p>
          </div>
          <div className="tech-stack-grid">
            {[
              {
                label: "JavaScript",
                description: "Linguagem essencial para o front-end moderno.",
              },
              {
                label: "TypeScript",
                description: "Tipagem que deixa o código mais confiável.",
              },
              {
                label: "HTML",
                description: "Estrutura e semântica para páginas acessíveis.",
              },
              {
                label: "CSS",
                description: "Design visual com estilos profissionais.",
              },
              {
                label: "TailwindCSS",
                description: "UI rápida e moderna com utilitários.",
              },
              {
                label: "React",
                description: "Construção de interfaces reativas e escaláveis.",
              },
              {
                label: "React Native",
                description: "Apps móveis nativos com a mesma base web.",
              },
              {
                label: "Python",
                description:
                  "Linguagem versátil para scripts, automação e ciência de dados.",
              },
              {
                label: "Node",
                description:
                  "Plataforma de desenvolvimento ágil para APIs e serviços.",
              },
              {
                label: "Express",
                description:
                  "Servidor web simples e flexível para rotas e APIs.",
              },
              {
                label: "TypeORM",
                description: "ORM para organizar dados com TypeScript.",
              },
              {
                label: "MySQL",
                description: "Banco relacional usado em projetos empresariais.",
              },
              {
                label: "MongoDB",
                description: "Banco NoSQL ideal para dados flexíveis.",
              },
              {
                label: "PHP",
                description:
                  "Plataforma popular para back-end e sites dinâmicos.",
              },
              {
                label: "Java",
                description: "Linguagem robusta para sistemas de grande porte.",
              },
              {
                label: "C#",
                description: "Desenvolvimento profissional em apps e jogos.",
              },
            ].map((tech) => (
              <a
                key={tech.label}
                className="tech-pill"
                href={createWhatsAppLink(t.whatsappCourseMessage, tech.label)}
                target="_blank"
                rel="noreferrer"
                aria-label={`${t.cardAction} ${tech.label}`}
              >
                <div>
                  <h3>{tech.label}</h3>
                  <p>{tech.description}</p>
                </div>
                <span className="tech-action">{t.cardAction}</span>
              </a>
            ))}
          </div>
        </section>

        {/* ── FLUXO IDEAL ── */}
        <section className="section section-path">
          <div className="section-header">
            <p className="eyebrow">{t.sectionHow}</p>
            <h2>{t.planTitle}</h2>
          </div>
          <div className="path-list">
            {[
              { num: "1", title: t.path1Title, text: t.path1Text },
              { num: "2", title: t.path2Title, text: t.path2Text },
              { num: "3", title: t.path3Title, text: t.path3Text },
            ].map(({ num, title, text: txt }, i) => (
              <article key={num}>
                <div className="path-step-left">
                  <span className="path-number">{num}</span>
                  {i < 2 && <div className="path-connector" />}
                </div>
                <div>
                  <h3>{title}</h3>
                  <p>{txt}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── CONTATO / CTA ── */}
        <section id="contato" className="section section-cta">
          <div className="cta-card">
            <p className="eyebrow cta-eyebrow">{t.ctaTitle}</p>
            <h2>{t.ctaSubtitle}</h2>
            <p>{t.ctaText}</p>
            <a
              href={createWhatsAppLink(t.whatsappContactMessage)}
              target="_blank"
              rel="noreferrer"
              className="cta-btn"
            >
              {t.contactLabel}
            </a>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="site-footer">
        <p>{t.footerText}</p>
        <div className="footer-links">
          <a href="#inicio">{t.navHome}</a>
          <a href="#metodo">{t.navMethod}</a>
          <a href="#tecnologias">{t.navTech}</a>
        </div>
      </footer>
    </div>
  );
}

export default App;