import { useState, useEffect, useRef } from 'react'
import './App.css'
import profilePic from './assets/Me.png'
import avatarImg from './assets/avatar.jpg'
import mrsBakersImg from './assets/projects/mrs-bakers.jpg'
import itbytesImg from './assets/projects/itbytes.png'
import vawcareImg from './assets/projects/vawcare.png'
import {
  LinkedinOutlined,
  GithubOutlined,
  InstagramOutlined,
  MailOutlined,
  CloseOutlined,
  ArrowRightOutlined,
  CheckOutlined,
  CopyOutlined,
  GlobalOutlined,
  CalendarOutlined,
  RocketOutlined,
  CodeOutlined,
  SafetyCertificateOutlined,
  CompassOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons'

/* ─── Static Data ─── */
const NAV_LINKS = ['Home', 'About', 'Projects', 'Skills', 'Experience', 'Contact']

const TECH_MARQUEE = [
  'React 19',
  'Node.js',
  'JavaScript ES6+',
  'Express.js',
  'Vite',
  'MongoDB',
  'MySQL',
  'Google Workspace Admin',
  'Odoo ERP',
  'Tailwind CSS',
  'REST APIs',
  'Linux Ubuntu',
  'Git & GitHub',
  'Progressive Web Apps',
  'Postman',
  'Mockoon',
]

const TECH_STACK = {
  Frontend: [
    { name: 'JavaScript', level: 90, tag: 'Core' },
    { name: 'React 19', level: 88, tag: 'Framework' },
    { name: 'HTML5 & Semantic UI', level: 95, tag: 'Standard' },
    { name: 'Modern CSS & Flex/Grid', level: 90, tag: 'Styling' },
    { name: 'JSX & Component Design', level: 88, tag: 'Architecture' },
    { name: 'Vite', level: 80, tag: 'Build Tool' },
    { name: 'Tailwind CSS', level: 80, tag: 'Utility' },
    { name: 'Material UI', level: 75, tag: 'Design System' },
  ],
  Backend: [
    { name: 'Node.js', level: 85, tag: 'Runtime' },
    { name: 'Express.js', level: 82, tag: 'API Framework' },
    { name: 'REST APIs & Webhooks', level: 88, tag: 'Architecture' },
    { name: 'Python', level: 78, tag: 'General' },
    { name: 'Java', level: 75, tag: 'OOP' },
    { name: 'C# & .NET', level: 72, tag: 'Enterprise' },
  ],
  Databases: [
    { name: 'MongoDB', level: 80, tag: 'NoSQL' },
    { name: 'MySQL', level: 85, tag: 'Relational' },
    { name: 'MariaDB', level: 78, tag: 'SQL' },
    { name: 'Firebase Firestore', level: 75, tag: 'Realtime' },
  ],
  'DevOps / Systems': [
    { name: 'Google Workspace Admin', level: 88, tag: 'Enterprise' },
    { name: 'Odoo ERP Administration', level: 85, tag: 'ERP' },
    { name: 'Linux Ubuntu & Bash', level: 70, tag: 'OS' },
    { name: 'Git & Version Control', level: 90, tag: 'Workflow' },
    { name: 'Azure Cloud Fundamentals', level: 65, tag: 'Cloud' },
    { name: 'RabbitMQ', level: 60, tag: 'Messaging' },
  ],
  Tools: [
    { name: 'VS Code', level: 95, tag: 'Primary IDE' },
    { name: 'Postman', level: 90, tag: 'API Testing' },
    { name: 'Mockoon', level: 88, tag: 'Mock Server' },
    { name: 'Jira & Agile Workflows', level: 85, tag: 'Management' },
    { name: 'Visual Studio & Android Studio', level: 75, tag: 'IDE' },
  ],
}

const PROJECTS = [
  {
    id: 'mrs-bakers',
    title: 'Mrs. Bakers',
    category: 'Web App',
    year: '2026',
    role: 'Full-Stack Developer',
    description: 'A comprehensive web application engineered for Mrs. Bakers Restaurant and Pastry Shop.',
    longDescription:
      'A full-featured restaurant web application built for Mrs. Bakers Restaurant and Pastry Shop. Features dynamic online menu browsing, seamless customer ordering, automated reservation handling, and a protected administrative dashboard for managing real-time inventory and incoming orders.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'REST API'],
    link: 'https://github.com/KKAnanayo/SofEng-Final-Project',
    github: 'https://github.com/KKAnanayo/SofEng-Final-Project',
    metrics: 'Online ordering · Inventory Admin · Reservations',
    color: 'from-amber-500/20 to-purple-600/20',
    image: mrsBakersImg,
  },
  {
    id: 'itbytes',
    title: 'ITBYTES',
    category: 'E-Commerce',
    year: '2026',
    role: 'Full-Stack Developer',
    description: 'Full-scale e-commerce web platform for ITBytes computer and CCTV security systems.',
    longDescription:
      'A robust commercial e-commerce solution engineered for ITBytes, catering to commercial hardware, enterprise computing gear, and CCTV security installations. Includes real-time catalog filtering, dynamic shopping cart, authenticated customer portal, and comprehensive inventory management.',
    tags: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS', 'Responsive'],
    link: 'https://itbytes.dreos.qzz.io/',
    github: null,
    metrics: 'Live Production · Cart & Checkout · Catalog Filter',
    color: 'from-cyan-500/20 to-blue-600/20',
    image: itbytesImg,
  },
  {
    id: 'vawcare',
    title: 'VAWCARE',
    category: 'PWA',
    year: '2026',
    role: 'Frontend / PWA Engineer',
    description: 'Progressive Web Application empowering community barangay-level VAWC protection.',
    longDescription:
      'A high-reliability Progressive Web Application (PWA) designed specifically to support local barangay-level efforts in preventing, documenting, and responding to Violence Against Women and Children (VAWC) incidents. Built with offline capability, encrypted reporting, real-time alert dispatch, and community support directories.',
    tags: ['React', 'Firebase', 'PWA', 'Vite', 'Service Worker'],
    link: 'https://vawcare-app.vercel.app/',
    github: null,
    metrics: 'Offline Support · Realtime Alerts · Case Tracking',
    color: 'from-emerald-500/20 to-indigo-600/20',
    image: vawcareImg,
  },
]

const EXPERIENCE = [
  {
    period: 'June 2026 – September 2026',
    duration: '4 Months',
    badge: 'Contract of Service',
    title: 'COS IT Staff',
    company: "Saint Mary's University",
    location: 'Bayombong, Nueva Vizcaya (Region II), PH',
    description:
      "Appointed as Contract of Service (COS) IT Staff at Saint Mary's University following a high-performing practicum. Spearheaded institutional Google Workspace administration (corporate email domain, user provisioning, SSO authentication), Odoo ERP administration, and operated digital ID production with smart student credential encoding. Provided tier-1 and tier-2 helpdesk support for faculty and student portal systems.",
    highlights: [
      'Google Workspace Admin & Domain Provisioning',
      'Odoo ERP Institutional Operations',
      'Digital Student ID Card Encoding Systems',
      'Tier-1 & Tier-2 End-User Technical Helpdesk',
    ],
  },
  {
    period: 'March 2026 – June 2026',
    duration: '4 Months',
    badge: 'Practicum / OJT',
    title: 'IT Practicum Trainee (OJT)',
    company: "Saint Mary's University",
    location: 'Bayombong, Nueva Vizcaya (Region II), PH',
    description:
      'Completed an intensive 4-month technical practicum focused on mission-critical IT infrastructure across campus facilities. Gained end-to-end expertise in structured fiber optic splicing, Cat6 structured cabling, CCTV network design and setup, high-density enterprise wireless deployment, and on-site hardware troubleshooting.',
    highlights: [
      'Fiber Optic Splicing & Structured Cabling',
      'Campus-wide CCTV Security Network Setup',
      'Enterprise Wireless Access Point Deployment',
      'Hardware Diagnostics & Hardware Troubleshooting',
    ],
  },
]

const SOCIAL_LINKS = [
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: <LinkedinOutlined /> },
  { name: 'GitHub', url: 'https://github.com/KKAnanayo', icon: <GithubOutlined /> },
  { name: 'Instagram', url: 'https://instagram.com', icon: <InstagramOutlined /> },
  { name: 'Email', url: 'mailto:ananayokevinklein@gmail.com', icon: <MailOutlined /> },
]

const HERO_ROLES = [
  'Full-Stack Developer',
  'Software Engineer',
  'IT Infrastructure Specialist',
  'React & Node.js Builder',
]

/* ─── Main Component ─── */
export default function App() {
  const [activeNav, setActiveNav] = useState('Home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSkillCategory, setActiveSkillCategory] = useState('Frontend')
  const [activeProjectFilter, setActiveProjectFilter] = useState('All')
  const [activeModalProject, setActiveModalProject] = useState(null)
  const [roleIndex, setRoleIndex] = useState(0)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [currentTime, setCurrentTime] = useState('')

  /* Cycling headline roles */
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex(prev => (prev + 1) % HERO_ROLES.length)
    }, 2800)
    return () => clearInterval(timer)
  }, [])

  /* Philippines Digital Clock (GMT+8) */
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const options = {
        timeZone: 'Asia/Manila',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(now))
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  /* High-Performance Spotlight Mouse Tracking (zero React re-renders & rAF-throttled) */
  useEffect(() => {
    let ticking = false
    const handleMouseMove = e => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const card = e.target.closest('.bento-spotlight')
          if (card) {
            const rect = card.getBoundingClientRect()
            card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
            card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
          }
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  /* Scroll Observer for Active Nav */
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id
            setActiveNav(id.charAt(0).toUpperCase() + id.slice(1))
          }
        })
      },
      { threshold: 0.35 }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  /* Butter-Smooth Scroll Reveal Observer */
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    )
    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  /* Lock body scroll when modal or mobile menu is active */
  useEffect(() => {
    document.body.style.overflow = activeModalProject || menuOpen ? 'hidden' : ''
  }, [activeModalProject, menuOpen])

  const scrollTo = id => {
    const el = document.getElementById(id.toLowerCase())
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('ananayokevinklein@gmail.com')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2400)
  }

  const filteredProjects =
    activeProjectFilter === 'All'
      ? PROJECTS
      : PROJECTS.filter(p => p.category === activeProjectFilter)

  return (
    <div className="portfolio-app">
      {/* ── Ambient Radial Background Lights ── */}
      <div className="ambient-background" aria-hidden="true">
        <div className="ambient-light light-1" />
        <div className="ambient-light light-2" />
        <div className="ambient-light light-3" />
        <div className="ambient-noise-grid" />
      </div>

      {/* ────────────── FLOATING CAPSULE NAVBAR ────────────── */}
      <header className="navbar-container">
        <nav className="floating-navbar" role="navigation" aria-label="Main Navigation">
          {/* Brandmark */}
          <div
            className="brand-pill"
            onClick={() => scrollTo('home')}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && scrollTo('home')}
          >
            <div className="brand-avatar-box">
              <img src={avatarImg} alt="Kevin Ananayo" className="brand-avatar" />
              <span className="live-status-dot" title="Available for hire" />
            </div>
            <div className="brand-label">
              <span className="brand-name">Kevin</span>
              <span className="brand-dot">.</span>
              <span className="brand-dev">dev</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <ul className="desktop-nav-links" role="menubar">
            {NAV_LINKS.map(item => (
              <li key={item} role="none">
                <button
                  className={`nav-capsule-link ${activeNav === item ? 'is-active' : ''}`}
                  onClick={() => scrollTo(item)}
                  role="menuitem"
                >
                  {item}
                  {activeNav === item && <span className="nav-active-pill" />}
                </button>
              </li>
            ))}
          </ul>

          {/* Right Action: Let's Talk Magnetic CTA */}
          <div className="nav-action-wrapper">
            <button
              className="btn-talk"
              onClick={() => scrollTo('contact')}
              aria-label="Contact Kevin"
            >
              <span>Let's Talk</span>
              <ArrowRightOutlined className="btn-talk-arrow" />
            </button>

            {/* Hamburger Button */}
            <button
              className={`hamburger-btn ${menuOpen ? 'is-open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation drawer"
            >
              <span />
              <span />
            </button>
          </div>
        </nav>

        {/* Mobile Slide-down Drawer */}
        <div className={`mobile-nav-drawer ${menuOpen ? 'is-open' : ''}`}>
          <div className="mobile-drawer-header">
            <div className="brand-pill" onClick={() => scrollTo('home')}>
              <img src={avatarImg} alt="Kevin" className="brand-avatar-sm" />
              <span className="brand-name">Kevin.dev</span>
            </div>
            <button className="mobile-close-btn" onClick={() => setMenuOpen(false)}>
              <CloseOutlined />
            </button>
          </div>
          <div className="mobile-nav-list">
            {NAV_LINKS.map((link, idx) => (
              <button
                key={link}
                className={`mobile-nav-item ${activeNav === link ? 'is-active' : ''}`}
                onClick={() => scrollTo(link)}
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <span>{link}</span>
                <ArrowRightOutlined className="mobile-item-arrow" />
              </button>
            ))}
          </div>
          <div className="mobile-drawer-footer">
            <button className="btn-full-primary" onClick={() => scrollTo('contact')}>
              Let's Build Something Together ↗
            </button>
          </div>
        </div>
      </header>

      {/* ────────────── HERO SECTION (PLAINTHING MOTION STYLE) ────────────── */}
      <section id="home" className="hero-section">
        <div className="hero-container">
          {/* Top Availability Capsule */}
          <div className="hero-badge-row reveal-on-scroll">
            <div className="availability-capsule">
              <span className="beacon-dot" />
              <span className="capsule-text">Available for Opportunities & Projects</span>
            </div>
            <div className="location-capsule">
              <CompassOutlined className="capsule-icon" />
              <span>Nueva Vizcaya, PH</span>
            </div>
          </div>

          {/* Bold Editorial Headline */}
          <div className="hero-headline-block reveal-on-scroll">
            <h1 className="hero-main-title">
              Crafting digital products with{' '}
              <span className="highlight-text-gradient">fluid precision</span>
              <br className="hero-br" />
              & scalable architecture.
            </h1>

            {/* Dynamic Role Badge */}
            <div className="role-cycler-container">
              <span className="role-prefix">Specialized in</span>
              <div className="role-capsule-flipper" key={roleIndex}>
                <span className="role-flipper-text">{HERO_ROLES[roleIndex]}</span>
              </div>
            </div>

            <p className="hero-description">
              Hello, I'm <strong className="text-white">Kevin Klein Ananayo</strong>. A results-driven{' '}
              <span className="text-highlight">Full-Stack Developer</span> and{' '}
              <span className="text-highlight">IT Infrastructure Specialist</span> combining modern web
              technologies (React 19, Node.js, Vite) with 8 months of institutional IT administration and network infrastructure operations.
            </p>

            {/* Hero CTA Cluster */}
            <div className="hero-actions-cluster">
              <button className="hero-btn-primary" onClick={() => scrollTo('projects')}>
                <span>View Selected Works</span>
                <ArrowRightOutlined className="action-arrow" />
              </button>

              <button className="hero-btn-secondary" onClick={copyEmailToClipboard}>
                {copiedEmail ? <CheckOutlined className="text-emerald" /> : <CopyOutlined />}
                <span>{copiedEmail ? 'Email Copied!' : 'Copy Email'}</span>
              </button>

              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn-ghost"
              >
                <CalendarOutlined />
                <span>Schedule a Call</span>
              </a>
            </div>
          </div>

          {/* Plainthing Style Hero Interactive Showcase Card */}
          <div className="hero-showcase-wrapper reveal-on-scroll">
            <div className="hero-bento-card bento-spotlight">
              <div className="showcase-card-inner">
                {/* Visual Media Showcase */}
                <div className="showcase-media-box">
                  <div className="showcase-glow-ring" />
                  <img
                    src={profilePic}
                    alt="Kevin Klein Ananayo — Professional Portrait"
                    className="showcase-avatar-img"
                  />
                </div>

                {/* Floating Interactive Micro Badges */}
                <div className="floating-badge badge-top-left">
                  <span className="badge-emoji">⚡</span>
                  <div>
                    <div className="badge-title">8+ Months</div>
                    <div className="badge-subtitle">IT Infrastructure</div>
                  </div>
                </div>

                <div className="floating-badge badge-top-right">
                  <span className="badge-emoji">🎓</span>
                  <div>
                    <div className="badge-title">Saint Mary's</div>
                    <div className="badge-subtitle">COS IT Staff</div>
                  </div>
                </div>

                <div className="floating-badge badge-bottom-left">
                  <span className="badge-emoji">💻</span>
                  <div>
                    <div className="badge-title">React 19 & Node</div>
                    <div className="badge-subtitle">Full-Stack Architecture</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Infinite Tech Marquee Strip */}
        <div className="tech-marquee-wrapper" aria-hidden="true">
          <div className="tech-marquee-track">
            {TECH_MARQUEE.concat(TECH_MARQUEE).map((tech, idx) => (
              <span key={idx} className="marquee-item">
                <span className="marquee-dot">✦</span>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────── BENTO ABOUT & IDENTITY SECTION ────────────── */}
      <section id="about" className="section-container">
        <div className="section-header reveal-on-scroll">
          <span className="section-label">Identity & Story</span>
          <h2 className="section-title">
            The intersection of <span className="highlight-text-gradient">software</span> & enterprise infrastructure.
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="bento-grid">
          {/* Card 1: Main Story (2 Columns) */}
          <div className="bento-card bento-story bento-spotlight reveal-on-scroll">
            <div className="card-header-icon">
              <RocketOutlined />
            </div>
            <h3 className="bento-card-title">Building Resilient, Scalable Solutions</h3>
            <p className="bento-text">
              I am a results-oriented developer experienced in both{' '}
              <strong className="text-white">Rapid Application Development (RAD)</strong> and{' '}
              <strong className="text-white">Agile</strong> workflows. My approach unites modern frontend
              engineering with robust backend APIs, verified through strict testing standards using tools like{' '}
              <strong className="text-white">Mockoon</strong> and <strong className="text-white">Postman</strong>.
            </p>
            <p className="bento-text">
              What sets my journey apart is <strong className="text-white">8 months of hands-on IT operations</strong> at Saint Mary's University. From running Google Workspace institutional provisioning and Odoo ERP administration, to splicing fiber optics and deploying campus-wide CCTV security networks—I understand technology from both the code and the physical infrastructure layers.
            </p>
            <div className="story-pill-tags">
              <span className="story-tag">Full-Stack Web</span>
              <span className="story-tag">Cloud & Systems</span>
              <span className="story-tag">Institutional ERP</span>
              <span className="story-tag">Network Operations</span>
            </div>
          </div>

          {/* Card 2: Interactive Location & Live Digital Clock */}
          <div className="bento-card bento-time bento-spotlight reveal-on-scroll">
            <div className="time-card-content">
              <div className="time-header">
                <CompassOutlined className="time-icon" />
                <span className="time-zone-label">Based in Philippines (GMT+8)</span>
              </div>
              <div className="digital-clock-display">
                <ClockCircleOutlined className="clock-pulse" />
                <span className="clock-numbers">{currentTime || '12:00:00 PM'}</span>
              </div>
              <div className="time-footer-location">
                <span className="location-flag">📍</span>
                <span>Bayombong, Nueva Vizcaya</span>
              </div>
            </div>
          </div>

          {/* Card 3: Key Stats */}
          <div className="bento-card bento-stats bento-spotlight reveal-on-scroll">
            <div className="stats-inner-grid">
              <div className="stat-unit">
                <div className="stat-large-num">8+</div>
                <div className="stat-unit-label">Months Experience</div>
              </div>
              <div className="stat-unit">
                <div className="stat-large-num">3+</div>
                <div className="stat-unit-label">Shipped Projects</div>
              </div>
              <div className="stat-unit">
                <div className="stat-large-num">25+</div>
                <div className="stat-unit-label">Tools & Frameworks</div>
              </div>
              <div className="stat-unit">
                <div className="stat-large-num">100%</div>
                <div className="stat-unit-label">Adaptability & Drive</div>
              </div>
            </div>
          </div>

          {/* Card 4: Core Capabilities */}
          <div className="bento-card bento-disciplines bento-spotlight reveal-on-scroll">
            <h4 className="disciplines-header">What I Bring to Teams</h4>
            <div className="disciplines-list">
              <div className="discipline-item">
                <CodeOutlined className="discipline-icon icon-indigo" />
                <div>
                  <div className="discipline-name">Web Engineering</div>
                  <div className="discipline-desc">React 19, Node.js, Express, REST APIs, Vite</div>
                </div>
              </div>
              <div className="discipline-item">
                <SafetyCertificateOutlined className="discipline-icon icon-cyan" />
                <div>
                  <div className="discipline-name">Systems Administration</div>
                  <div className="discipline-desc">Google Workspace Admin, Odoo ERP, Digital Credentials</div>
                </div>
              </div>
              <div className="discipline-item">
                <CompassOutlined className="discipline-icon icon-teal" />
                <div>
                  <div className="discipline-name">IT Infrastructure</div>
                  <div className="discipline-desc">Fiber Optics, CCTV Security, Linux, Structured Cabling</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────── FEATURED PROJECTS (CASE STUDIES) ────────────── */}
      <section id="projects" className="section-container">
        <div className="section-header reveal-on-scroll">
          <div className="projects-header-flex">
            <div>
              <span className="section-label">Selected Case Studies</span>
              <h2 className="section-title">
                Handcrafted <span className="highlight-text-gradient">products</span> & applications.
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="project-filter-pills" role="tablist">
              {['All', 'Web App', 'E-Commerce', 'PWA'].map(cat => (
                <button
                  key={cat}
                  className={`filter-pill ${activeProjectFilter === cat ? 'is-active' : ''}`}
                  onClick={() => setActiveProjectFilter(cat)}
                  role="tab"
                  aria-selected={activeProjectFilter === cat}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project, idx) => (
            <article
              key={project.id}
              className="project-bento-card bento-spotlight reveal-on-scroll"
              style={{ animationDelay: `${idx * 0.1}s` }}
              onClick={() => setActiveModalProject(project)}
            >
              {/* Top Banner / Mockup Area */}
              <div className="project-banner-box">
                <div className="project-banner-media">
                  <img
                    src={project.image}
                    alt={`${project.title} logo`}
                    className="project-banner-img"
                  />
                </div>
                <div className="project-category-badge">{project.category}</div>
                <span className="project-year-badge">{project.year}</span>
              </div>

              {/* Card Body */}
              <div className="project-card-body">
                <div className="project-title-row">
                  <h3 className="project-card-heading">{project.title}</h3>
                  <div className="project-link-arrow-box" title="View Details">
                    <ArrowRightOutlined className="project-arrow-icon" />
                  </div>
                </div>

                <p className="project-card-desc">{project.description}</p>

                {/* Tech Tags */}
                <div className="project-tech-pills">
                  {project.tags.map(tag => (
                    <span key={tag} className="tech-badge">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bottom Metrics Bar */}
                <div className="project-card-footer">
                  <span className="project-metric-text">✦ {project.metrics}</span>
                  <span className="project-explore-hint">Explore Case Study ↗</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ────────────── SKILLS & TECH STACK ────────────── */}
      <section id="skills" className="section-container">
        <div className="section-header reveal-on-scroll">
          <span className="section-label">Technical Matrix</span>
          <h2 className="section-title">
            Technologies, tools & <span className="highlight-text-gradient">stack</span>.
          </h2>
        </div>

        <div className="skills-bento-layout">
          {/* Category Tabs */}
          <div className="skills-category-tabs reveal-on-scroll" role="tablist">
            {Object.keys(TECH_STACK).map(cat => (
              <button
                key={cat}
                className={`skills-tab-button ${activeSkillCategory === cat ? 'is-active' : ''}`}
                onClick={() => setActiveSkillCategory(cat)}
                role="tab"
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="skills-matrix-grid reveal-on-scroll">
            {TECH_STACK[activeSkillCategory].map(skill => (
              <div key={skill.name} className="skill-matrix-item bento-spotlight">
                <div className="skill-info-row">
                  <div>
                    <span className="skill-title-name">{skill.name}</span>
                    <span className="skill-discipline-tag">{skill.tag}</span>
                  </div>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
                <div className="skill-meter-track">
                  <div
                    className="skill-meter-fill"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────── WORK EXPERIENCE TIMELINE ────────────── */}
      <section id="experience" className="section-container">
        <div className="section-header reveal-on-scroll">
          <span className="section-label">Professional Background</span>
          <h2 className="section-title">
            Proven track record in <span className="highlight-text-gradient">IT operations</span> & infrastructure.
          </h2>
        </div>

        <div className="experience-timeline-container">
          {EXPERIENCE.map((exp, idx) => (
            <div key={idx} className="timeline-block reveal-on-scroll">
              <div className="timeline-connector">
                <div className="timeline-bullet-ring">
                  <div className="timeline-bullet-center" />
                </div>
                {idx !== EXPERIENCE.length - 1 && <div className="timeline-stem" />}
              </div>

              <div className="timeline-card bento-spotlight">
                <div className="timeline-top-meta">
                  <span className="timeline-contract-pill">{exp.badge}</span>
                  <span className="timeline-period-text">
                    <CalendarOutlined className="mr-1" /> {exp.period} · {exp.duration}
                  </span>
                </div>

                <h3 className="timeline-role-title">{exp.title}</h3>
                <div className="timeline-company-row">
                  <span className="company-name">🏢 {exp.company}</span>
                  <span className="company-location">📍 {exp.location}</span>
                </div>

                <p className="timeline-narrative">{exp.description}</p>

                <div className="timeline-highlights-list">
                  {exp.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="highlight-chip">
                      <CheckOutlined className="chip-check" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ────────────── CONTACT & LET'S TALK BANNER ────────────── */}
      <section id="contact" className="section-container">
        <div className="contact-callout-card bento-spotlight reveal-on-scroll">
          <div className="callout-content-wrapper">
            <span className="callout-pill">Ready for Collaboration</span>
            <h2 className="callout-main-headline">
              Let's create something <span className="highlight-text-gradient">remarkable</span> together.
            </h2>
            <p className="callout-subtext">
              Whether you have an ambitious web project, need a reliable Full-Stack engineer, or wish to explore technical consulting—my inbox is always open.
            </p>

            {/* Magnetic Email Copy Box */}
            <div className="email-action-capsule">
              <span className="email-label">ananayokevinklein@gmail.com</span>
              <button
                className="btn-copy-capsule"
                onClick={copyEmailToClipboard}
                title="Copy email to clipboard"
              >
                {copiedEmail ? (
                  <>
                    <CheckOutlined className="text-emerald" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <CopyOutlined />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Social Link Badges */}
            <div className="social-capsules-row">
              {SOCIAL_LINKS.map(s => (
                <a
                  key={s.name}
                  href={s.url}
                  target={s.url.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="social-dock-pill"
                >
                  <span className="social-dock-icon">{s.icon}</span>
                  <span>{s.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ────────────── FOOTER ────────────── */}
      <footer className="footer-container">
        <div className="footer-inner-content">
          <div className="footer-left-brand">
            <div className="brand-pill" onClick={() => scrollTo('home')}>
              <img src={avatarImg} alt="Kevin Ananayo" className="brand-avatar-sm" />
              <span className="brand-name">Kevin.dev</span>
            </div>
            <p className="footer-bio-note">
              Designed & developed with precision. Blending software craft with enterprise IT operations.
            </p>
          </div>

          <div className="footer-right-info">
            <button className="footer-back-top" onClick={() => scrollTo('home')}>
              Back to Top ↑
            </button>
            <p className="copyright-text">
              © {new Date().getFullYear()} Kevin Klein Ananayo. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* ────────────── PROJECT CASE STUDY MODAL ────────────── */}
      {activeModalProject && (
        <div
          className="modal-backdrop-blur"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveModalProject(null)}
        >
          <div className="modal-dialog-box bento-spotlight" onClick={e => e.stopPropagation()}>
            <button
              className="modal-close-trigger"
              onClick={() => setActiveModalProject(null)}
              aria-label="Close modal"
            >
              <CloseOutlined />
            </button>

            <div className="modal-header-banner">
              <div className="modal-image-avatar">
                <img
                  src={activeModalProject.image}
                  alt={`${activeModalProject.title} logo`}
                  className="modal-banner-img"
                />
              </div>
              <div>
                <span className="modal-category-tag">{activeModalProject.category} · {activeModalProject.year}</span>
                <h3 className="modal-project-title">{activeModalProject.title}</h3>
                <div className="modal-role-meta">Role: {activeModalProject.role}</div>
              </div>
            </div>

            <div className="modal-body-content">
              <h4 className="modal-section-h4">Project Overview</h4>
              <p className="modal-long-desc">{activeModalProject.longDescription}</p>

              <h4 className="modal-section-h4">Core Features & Architecture</h4>
              <div className="modal-metrics-card">
                <span className="modal-metrics-highlight">{activeModalProject.metrics}</span>
              </div>

              <h4 className="modal-section-h4">Technologies Used</h4>
              <div className="modal-tags-container">
                {activeModalProject.tags.map(t => (
                  <span key={t} className="modal-tech-tag">
                    {t}
                  </span>
                ))}
              </div>

              <div className="modal-cta-actions">
                {activeModalProject.link && (
                  <a
                    href={activeModalProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-btn-primary"
                  >
                    <GlobalOutlined />
                    <span>Launch Live Demo</span>
                  </a>
                )}
                {activeModalProject.github && (
                  <a
                    href={activeModalProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-btn-secondary"
                  >
                    <GithubOutlined />
                    <span>View Source on GitHub</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
