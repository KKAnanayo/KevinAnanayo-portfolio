import { useState, useEffect } from 'react'
import './App.css'
import profilePic from './assets/Me.png'
import {
  LinkedinOutlined,
  GithubOutlined,
  InstagramOutlined,
  MailOutlined,
  CloseOutlined,
} from '@ant-design/icons'

/* ─── Data ─── */
const NAV_LINKS = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact']

const TECH_STACK = {
  Frontend: [
    { name: 'JavaScript', level: 90 },
    { name: 'React', level: 88 },
    { name: 'HTML', level: 95 },
    { name: 'CSS', level: 90 },
    { name: 'JSX', level: 88 },
    { name: 'Vite', level: 80 },
    { name: 'Material UI', level: 75 },
    { name: 'Tailwind CSS', level: 80 },
  ],
  Backend: [
    { name: 'Node.js', level: 85 },
    { name: 'Express', level: 82 },
    { name: 'Python', level: 78 },
    { name: 'Java', level: 75 },
    { name: 'C#', level: 72 },
    { name: '.NET', level: 70 },
    { name: 'REST APIs', level: 88 },
  ],
  Databases: [
    { name: 'MongoDB', level: 80 },
    { name: 'MySQL', level: 85 },
    { name: 'MariaDB', level: 78 },
    { name: 'Firebase', level: 75 },
  ],
  'DevOps / Cloud': [
    { name: 'Ubuntu', level: 70 },
    { name: 'Bash', level: 68 },
    { name: 'Azure', level: 65 },
    { name: 'GitHub', level: 90 },
    { name: 'Git', level: 90 },
    { name: 'RabbitMQ', level: 60 },
    { name: 'WordPress', level: 72 },
  ],
  Tools: [
    { name: 'VS Code', level: 95 },
    { name: 'Postman', level: 90 },
    { name: 'Mockoon (API Mock Testing)', level: 88 },
    { name: 'Odoo ERP (Admin)', level: 85 },
    { name: 'Google Admin Console', level: 88 },
    { name: 'Visual Studio', level: 80 },
    { name: 'Android Studio', level: 70 },
    { name: 'Eclipse', level: 70 },
  ],
}

const PROJECTS = [
  {
    title: "Mrs. Bakers",
    description: "A web application for Mrs. Bakers Restaurant and Pastry Shop.",
    longDescription:
      "A full-featured restaurant web application built for Mrs. Bakers Restaurant and Pastry Shop. Features include menu browsing, online ordering, reservation management, and an admin dashboard for managing orders and inventory.",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    link: "https://github.com/KKAnanayo/SofEng-Final-Project",
    github: "https://github.com/KKAnanayo/SofEng-Final-Project",
    type: "Web App",
    emoji: "🍰",
  },
  {
    title: "ITBYTES",
    description: "An ecommerce web application for ITBytes, a business that sells computers and CCTV systems.",
    longDescription:
      "A comprehensive e-commerce platform for ITBytes, specializing in computers and CCTV security systems. Includes product catalog, shopping cart, secure checkout, user authentication, and full admin product management.",
    tags: ["PHP", "MySQL", "JavaScript", "HTML/CSS"],
    link: "https://itbytes.dreos.qzz.io/",
    github: null,
    type: "E-Commerce",
    emoji: "🖥️",
  },
  {
    title: "VAWCARE",
    description: "A PWA to support barangay-level efforts in preventing and responding to VAWC cases.",
    longDescription:
      "A Progressive Web Application (PWA) designed to support barangay-level efforts in preventing and responding to Violence Against Women and Children (VAWC) cases. Features case management, incident reporting, resource directories, and real-time notifications to empower local government units.",
    tags: ["React", "Firebase", "PWA", "Vite"],
    link: "https://vawcare-app.vercel.app/",
    github: null,
    type: "PWA",
    emoji: "🛡️",
  },
]

const EXPERIENCE = [
  {
    period: 'June 2026 – September 2026 · 4 Months',
    badge: 'Contract of Service',
    title: 'COS IT Staff',
    company: "Saint Mary's University — Bayombong, Nueva Vizcaya (Region II)",
    description:
      "Appointed as Contract of Service (COS) IT Staff at Saint Mary's University following a successful practicum. Primary responsibilities focused on Google Workspace administration (managing institutional & corporate email accounts, domain user provisioning, and authentication support), Odoo ERP system administration, and operating digital ID card production and student credential encoding systems. Provided dedicated tier-1 & tier-2 helpdesk support to faculty and students, resolving portal access issues, institutional account inquiries, and university online services.",
    tags: [
      'Google Workspace Admin',
      'Odoo ERP Admin',
      'Corporate Email Admin',
      'Digital ID Production',
      'Student Account Management',
      'User Support & Helpdesk',
    ],
  },
  {
    period: 'March 2026 – June 2026 · 4 Months',
    badge: 'Practicum / OJT',
    title: 'IT Practicum Trainee (OJT)',
    company: "Saint Mary's University — Bayombong, Nueva Vizcaya (Region II)",
    description:
      "Completed an intensive 4-month practicum at Saint Mary's University focused on core IT infrastructure and technical operations. Gained hands-on skills in structured cabling, fiber optic splicing, CCTV setup & installation, wireless networking, and front-line end-user IT support across campus facilities. Built a well-rounded foundation that enhances adaptability across software development, technical support, and network infrastructure roles.",
    tags: ['Structured Cabling', 'Fiber Optic Splicing', 'CCTV Installation', 'Wireless Networking', 'IT Support', 'Infrastructure'],
  },
]

const SOCIAL_LINKS = [
  { name: 'LinkedIn',  url: 'https://linkedin.com',            icon: <LinkedinOutlined />,  color: '#0077b5' },
  { name: 'GitHub',    url: 'https://github.com/KKAnanayo',    icon: <GithubOutlined />,    color: '#6e40c9' },
  { name: 'Instagram', url: 'https://instagram.com',           icon: <InstagramOutlined />, color: '#e1306c' },
  { name: 'Email',     url: 'mailto:jadenyuki486@gmail.com',   icon: <MailOutlined />,      color: '#ea4335' },
]

const STATS = [
  { value: '8 Mos',  label: 'Hands-on IT Experience', icon: '💼' },
  { value: '3+',     label: 'Featured Projects',      icon: '🎯' },
  { value: '25+',    label: 'Technologies & Tools',    icon: '💻' },
  { value: '100%',   label: 'Adaptability & Drive',   icon: '⚡' },
]

const TYPING_TEXTS = [
  'Software Engineer',
  'Full Stack Developer',
  'IT Infrastructure Specialist',
  'React & Node.js Developer',
  'Problem Solver',
]

/* ─── Custom Hook: Typing Effect ─── */
function useTyping(texts, speed = 100, deleteSpeed = 55, pause = 1600) {
  const [display, setDisplay]       = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [textIdx, setTextIdx]       = useState(0)
  const [charIdx, setCharIdx]       = useState(0)

  useEffect(() => {
    const current = texts[textIdx]
    let timer

    if (!isDeleting && charIdx <= current.length) {
      timer = setTimeout(() => {
        setDisplay(current.slice(0, charIdx))
        setCharIdx(c => c + 1)
      }, speed)
    } else if (!isDeleting && charIdx > current.length) {
      timer = setTimeout(() => setIsDeleting(true), pause)
    } else if (isDeleting && charIdx > 0) {
      timer = setTimeout(() => {
        setDisplay(current.slice(0, charIdx - 1))
        setCharIdx(c => c - 1)
      }, deleteSpeed)
    } else {
      setIsDeleting(false)
      setTextIdx(i => (i + 1) % texts.length)
    }

    return () => clearTimeout(timer)
  }, [charIdx, isDeleting, textIdx, texts, speed, deleteSpeed, pause])

  return display
}

/* ─── Custom Hook: Scroll Reveal ─── */
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.12 }
    )
    const els = document.querySelectorAll('.animate-on-scroll')
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

/* ─── Main App ─── */
export default function App() {
  const [activeNav,      setActiveNav]      = useState('Home')
  const [activeSkillTab, setActiveSkillTab] = useState('Frontend')
  const [activeProject,  setActiveProject]  = useState(null)
  const [menuOpen,       setMenuOpen]       = useState(false)

  const typingText = useTyping(TYPING_TEXTS)
  useScrollReveal()

  /* Active section via IntersectionObserver */
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const id = e.target.id
            setActiveNav(id.charAt(0).toUpperCase() + id.slice(1))
          }
        })
      },
      { threshold: 0.45 }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  /* Close modal on Escape key */
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') setActiveProject(null) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  /* Lock body scroll when modal or mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = (activeProject || menuOpen) ? 'hidden' : ''
  }, [activeProject, menuOpen])

  const scrollTo = id => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const handleContactSubmit = e => {
    e.preventDefault()
    const d = new FormData(e.target)
    const subject = encodeURIComponent(d.get('subject') || '')
    const body    = encodeURIComponent(`From: ${d.get('name')}\n\n${d.get('message')}`)
    window.location.href = `mailto:jadenyuki486@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <div className="portfolio">

      {/* ── Animated background orbs ── */}
      <div className="bg-orbs" aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      {/* ────────────── NAVBAR ────────────── */}
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="nav-inner">
          <div className="nav-logo" onClick={() => scrollTo('home')} role="button" tabIndex={0}
               onKeyDown={e => e.key === 'Enter' && scrollTo('home')}>
            <span className="logo-bracket">&lt;</span>KA<span className="logo-bracket">/&gt;</span>
          </div>

          <div
            className={`nav-backdrop ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />

          <ul className={`nav-links ${menuOpen ? 'open' : ''}`} role="menubar">
            {NAV_LINKS.map(link => (
              <li key={link} role="none">
                <button
                  id={`nav-${link.toLowerCase()}`}
                  className={`nav-link ${activeNav === link ? 'active' : ''}`}
                  role="menuitem"
                  aria-current={activeNav === link ? 'page' : undefined}
                  onClick={() => scrollTo(link)}
                >
                  {link}
                </button>
              </li>
            ))}
          </ul>

          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(m => !m)}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ────────────── HERO ────────────── */}
      <section id="home" className="hero-section" aria-label="Introduction">
        <div className="hero-content">
          <div className="hero-text animate-on-scroll">
            <p className="hero-greeting">👋 Hello, I'm</p>
            <h1 className="hero-name">Kevin Klein Ananayo</h1>

            <div className="hero-title-wrapper" aria-live="polite" aria-atomic="true">
              <span className="hero-title">{typingText}</span>
              <span className="cursor" aria-hidden="true">|</span>
            </div>

            <p className="hero-subtitle">
              A results-driven Full-Stack Developer & IT Specialist with practical experience in
              web application development and IT infrastructure operations. Based in Bayombong, Nueva Vizcaya (Region II), Philippines 📍
            </p>

            <div className="hero-buttons">
              <a
                id="hero-schedule-btn"
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                📅 Schedule a Meeting
              </a>
              <a
                id="hero-email-btn"
                href="mailto:jadenyuki486@gmail.com"
                className="btn btn-secondary"
              >
                ✉️ Send Email
              </a>
              <button
                id="hero-projects-btn"
                className="btn btn-outline"
                onClick={() => scrollTo('projects')}
              >
                🎯 View Projects
              </button>
            </div>
          </div>

          <div className="hero-avatar animate-on-scroll">
            <div className="avatar-ring">
              <div className="avatar-ring-2" aria-hidden="true" />
              <img
                src={profilePic}
                alt="Kevin Klein Ananayo — Software Engineer"
                className="profile-image"
              />
            </div>
          </div>
        </div>

        <div
          className="scroll-indicator"
          onClick={() => scrollTo('about')}
          role="button"
          tabIndex={0}
          aria-label="Scroll to About section"
          onKeyDown={e => e.key === 'Enter' && scrollTo('about')}
        >
          <div className="scroll-dot" aria-hidden="true" />
          <span>Scroll Down</span>
        </div>
      </section>

      {/* ────────────── ABOUT ────────────── */}
      <section id="about" className="section-wrapper" aria-labelledby="about-heading">
        <div className="section-container">
          <h2 id="about-heading" className="section-heading animate-on-scroll">
            <span className="heading-accent">About</span> Me
          </h2>

          <div className="about-grid">
            <div className="about-text animate-on-scroll">
              <p className="section-text">
                A results-driven Full-Stack Developer with hands-on experience in both{' '}
                <strong>Rapid Application Development (RAD)</strong> and{' '}
                <strong>Agile</strong> methodologies. Proficient in modern tools such as{' '}
                <strong>Mockoon</strong> for API mock testing, <strong>Postman</strong>, <strong>Jira</strong> for project tracking, and <strong>Notion</strong> for documentation.
              </p>
              <p className="section-text">
                Adept at building scalable, resilient web applications using{' '}
                <strong>React</strong>, <strong>Node.js</strong>, <strong>JSX</strong>, and{' '}
                <strong>Vite</strong>. Possesses <strong>8 months of hands-on IT experience</strong> combining practical infrastructure training (structured cabling, fiber optics, CCTV, and wireless networks) with institutional system administration (Google Workspace, Odoo ERP, student account helpdesk, and digital ID systems).
              </p>
              <p className="section-text">
                Highly adaptable to diverse roles across <strong>software engineering, full-stack development, technical support, and IT infrastructure</strong>. Outside of tech, I maintain focus and discipline through regular gym workouts. 🏋️
              </p>
            </div>

            <div className="stats-grid animate-on-scroll">
              {STATS.map((stat, i) => (
                <div key={i} className="stat-card" role="figure" aria-label={`${stat.value} ${stat.label}`}>
                  <div className="stat-icon" aria-hidden="true">{stat.icon}</div>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ────────────── SKILLS ────────────── */}
      <section id="skills" className="section-wrapper section-dark" aria-labelledby="skills-heading">
        <div className="section-container">
          <h2 id="skills-heading" className="section-heading animate-on-scroll">
            <span className="heading-accent">Tech</span> Stack & Tools
          </h2>
          <p className="section-subtitle animate-on-scroll">Technologies and developer tools I work with</p>

          {/* Category Tabs */}
          <div className="skill-tabs animate-on-scroll" role="tablist" aria-label="Skill categories">
            {Object.keys(TECH_STACK).map(tab => (
              <button
                key={tab}
                id={`tab-${tab.replace(/\s/g, '-').toLowerCase()}`}
                className={`skill-tab ${activeSkillTab === tab ? 'active' : ''}`}
                role="tab"
                aria-selected={activeSkillTab === tab}
                aria-controls="skills-panel"
                onClick={() => setActiveSkillTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div
            id="skills-panel"
            className="skills-grid animate-on-scroll"
            role="tabpanel"
            aria-labelledby={`tab-${activeSkillTab.replace(/\s/g, '-').toLowerCase()}`}
          >
            {TECH_STACK[activeSkillTab].map((skill, i) => (
              <div
                key={skill.name}
                className="skill-item"
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <div className="skill-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percent">{skill.level}%</span>
                </div>
                <div className="skill-bar" role="progressbar" aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100}>
                  <div className="skill-fill" style={{ '--skill-width': `${skill.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────── PROJECTS ────────────── */}
      <section id="projects" className="section-wrapper" aria-labelledby="projects-heading">
        <div className="section-container">
          <h2 id="projects-heading" className="section-heading animate-on-scroll">
            <span className="heading-accent">Recent</span> Projects
          </h2>
          <p className="section-subtitle animate-on-scroll">Click on any project to explore full details</p>

          <div className="projects-grid" role="list">
            {PROJECTS.map((project, i) => (
              <article
                key={i}
                className="project-card animate-on-scroll"
                style={{ animationDelay: `${i * 0.1}s` }}
                onClick={() => setActiveProject(project)}
                role="listitem button"
                tabIndex={0}
                aria-label={`View details for ${project.title}`}
                onKeyDown={e => e.key === 'Enter' && setActiveProject(project)}
              >
                <div className="project-emoji" aria-hidden="true">{project.emoji}</div>
                <span className="project-type-badge">{project.type}</span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-tags" aria-label="Technologies used">
                  {project.tags.map(tag => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>
                <div className="project-card-footer">
                  <span className="project-open-hint">Click to explore →</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────── EXPERIENCE ────────────── */}
      <section id="experience" className="section-wrapper section-dark" aria-labelledby="experience-heading">
        <div className="section-container">
          <h2 id="experience-heading" className="section-heading animate-on-scroll">
            <span className="heading-accent">Work</span> Experience
          </h2>
          <p className="section-subtitle animate-on-scroll">
            Hands-on professional background in IT operations and infrastructure
          </p>

          {EXPERIENCE.length === 0 ? (
            <div className="empty-experience animate-on-scroll">
              <div className="empty-icon" aria-hidden="true">🚀</div>
              <h3>Building My Journey</h3>
              <p>
                Currently seeking opportunities to make an impact.
                Open to full-time roles and freelance projects!
              </p>
              <a
                id="experience-contact-btn"
                href="mailto:jadenyuki486@gmail.com"
                className="btn btn-primary"
              >
                Get in Touch
              </a>
            </div>
          ) : (
            <div className="timeline">
              {EXPERIENCE.map((exp, i) => (
                <div
                  key={i}
                  className={`timeline-item animate-on-scroll ${i % 2 === 0 ? 'left' : 'right'}`}
                >
                  <div className="timeline-content">
                    <div className="timeline-header-row">
                      <span className="timeline-badge">{exp.badge}</span>
                      <span className="timeline-date">{exp.period}</span>
                    </div>
                    <h3 className="timeline-title">{exp.title}</h3>
                    <p className="timeline-company">🏢 {exp.company}</p>
                    <p className="timeline-desc">{exp.description}</p>
                    {exp.tags && (
                      <div className="timeline-tags">
                        {exp.tags.map(tag => (
                          <span key={tag} className="project-tag">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="timeline-dot" aria-hidden="true" />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ────────────── CONTACT ────────────── */}
      <section id="contact" className="section-wrapper" aria-labelledby="contact-heading">
        <div className="section-container">
          <h2 id="contact-heading" className="section-heading animate-on-scroll">
            Let's <span className="heading-accent">Connect</span>
          </h2>
          <p className="section-subtitle animate-on-scroll">
            Feel free to reach out for career opportunities, collaborations, or technical inquiries!
          </p>

          <div className="contact-grid">
            {/* Social Cards */}
            <div className="social-cards animate-on-scroll" role="list" aria-label="Social links">
              {SOCIAL_LINKS.map(link => (
                <a
                  key={link.name}
                  id={`social-${link.name.toLowerCase()}`}
                  href={link.url}
                  target={link.url.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="social-card"
                  style={{ '--social-color': link.color }}
                  role="listitem"
                  aria-label={`Visit my ${link.name}`}
                >
                  <span className="social-icon" aria-hidden="true">{link.icon}</span>
                  <span className="social-name">{link.name}</span>
                </a>
              ))}
            </div>

            {/* Contact Form */}
            <form
              id="contact-form"
              className="contact-form animate-on-scroll"
              onSubmit={handleContactSubmit}
              aria-label="Contact form"
              noValidate
            >
              <h3 className="form-title">Send a Message</h3>

              <div className="form-group">
                <label htmlFor="contact-name" className="sr-only">Your Name</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="form-input"
                  autoComplete="name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-subject" className="sr-only">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message" className="sr-only">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  required
                  className="form-input"
                />
              </div>

              <button id="contact-submit-btn" type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                ✉️ Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ────────────── FOOTER ────────────── */}
      <footer className="footer" role="contentinfo">
        <div className="footer-inner">
          <div className="nav-logo">
            <span className="logo-bracket">&lt;</span>KA<span className="logo-bracket">/&gt;</span>
          </div>
          <p>© {new Date().getFullYear()} Kevin Klein Ananayo. All rights reserved.</p>
          <p className="footer-sub">Software Engineer · Full Stack Developer · IT Infrastructure</p>
        </div>
      </footer>

      {/* ────────────── PROJECT MODAL ────────────── */}
      {activeProject && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={() => setActiveProject(null)}
        >
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button
              className="modal-close"
              aria-label="Close project details"
              onClick={() => setActiveProject(null)}
            >
              <CloseOutlined aria-hidden="true" />
            </button>

            <div className="modal-emoji" aria-hidden="true">{activeProject.emoji}</div>
            <span className="project-type-badge">{activeProject.type}</span>
            <h2 id="modal-title" className="modal-title">{activeProject.title}</h2>
            <p className="modal-desc">{activeProject.longDescription}</p>

            <div className="modal-tags" aria-label="Technologies used">
              {activeProject.tags.map(tag => (
                <span key={tag} className="project-tag">{tag}</span>
              ))}
            </div>

            <div className="modal-actions">
              {activeProject.link && (
                <a
                  href={activeProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  aria-label={`Open live demo of ${activeProject.title}`}
                >
                  🌐 Live Demo
                </a>
              )}
              {activeProject.github && (
                <a
                  href={activeProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  aria-label={`View ${activeProject.title} on GitHub`}
                >
                  <GithubOutlined aria-hidden="true" /> GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Screen-reader-only utility */}
      <style>{`.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}`}</style>
    </div>
  )
}
