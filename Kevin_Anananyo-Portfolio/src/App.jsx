import './App.css'
import profilePic from './assets/Me.png'
import {
  Tag,
  Timeline,
  FloatButton,
  Tooltip,
  Typography,
} from 'antd'
import {
  CalendarOutlined,
  MailOutlined,
  GithubOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  ArrowUpOutlined,
  CodeOutlined,
  ProjectOutlined,
  UserOutlined,
} from '@ant-design/icons'

const { Paragraph, Text, Title } = Typography

function App() {
  const techStack = {
    Frontend: ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'React', 'Vite', 'Material UI', 'Tailwind CSS'],
    Backend: ['Node.js', 'Express', 'Python', 'Java', 'C#', '.NET', 'REST'],
    Databases: ['MongoDB', 'MySQL', 'MariaDB', 'Firebase'],
    'DevOps / Cloud': ['Ubuntu', 'Bash', 'Azure', 'GitHub', 'Git', 'RabbitMQ', 'WordPress'],
    'Developer Tools': ['VS Code', 'Visual Studio', 'Postman', 'Eclipse', 'Android Studio'],
    'CMS & No-Code': ['WordPress'],
  }

  const experience = [
    {
      period: 'Dec 2023 - Present',
      title: 'Junior Software Engineer',
      company: 'Tech Company',
      description: 'Building scalable web applications with React and Node.js.',
    },
    {
      period: 'Jun 2023 - Aug 2023',
      title: 'Technical Consultant',
      company: 'Innovation Lab',
      description: 'Provided technical guidance and mentorship.',
    },
  ]

  const projects = [
    {
      title: 'Analytics Dashboard',
      description:
        'Real-time analytics platform with interactive data visualization and reporting capabilities.',
      link: '#',
    },
     {
      title: 'ITBYTES',
      description:
        'An ecommerce web application for ITBytes, a business that sells computers and CCTV systems.',
      link: 'https://itbytes.dreos.qzz.io/',
    },
    {
      title: 'VAWCARE',
      description:
        'A Progressive Web Application (PWA) developed to support barangay-level efforts in preventing and responding to Violence Against Women and Children (VAWC) cases.',
      link: 'https://vawcare-app.vercel.app/',
    },
  ]

  const socialLinks = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/kevin-klein-ananayo-5b246a399/', icon: <LinkedinOutlined /> },
    { name: 'GitHub', url: 'https://github.com/KKAnanayo', icon: <GithubOutlined /> },
    { name: 'Instagram', url: 'https://www.instagram.com/ako_si_kevs/', icon: <InstagramOutlined /> },
  ]

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="portfolio">
      {/* Header Section */}
      <header className="header">
        <div className="header-container">
          <div className="profile-section">
            <div className="profile-pic-wrapper">
              <div className="profile-pic">
                <img src={profilePic} alt="Kevin Ananayo" />
              </div>
            </div>
            <div className="profile-info">
              <h1 className="name">Kevin Klein Ananayo</h1>
              <p className="location">📍 Metro Manila, Philippines</p>
              <p className="title">Software Engineer | Full Stack Developer</p>

              <div className="header-buttons">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => window.open('https://calendly.com', '_blank')}
                >
                  <CalendarOutlined />
                  Schedule a meeting
                </button>
                <a href="mailto:jadenyuki486@gmail.com" className="btn btn-secondary">
                  <MailOutlined />
                  Send Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="main-container">
        <main className="content">
          {/* About (top, full-width) */}
          <section className="section about-section" id="about">
            <h2 className="section-title">
              📋 About
            </h2>
            <Paragraph className="about-text">
              A results-driven Full-Stack Developer with hands-on experience in both Rapid Application
              Development (RAD) and Agile methodologies. Proficient in modern development tools such as
              Jira for project tracking and Notion for documentation.
            </Paragraph>
            <Paragraph className="about-text">
              Adept at building scalable and efficient web applications using React, Node.js, TypeScript,
              and Vite. Strong focus on delivering seamless user experiences through UI/UX enhancements
              while ensuring robust backend performance to support enterprise-grade solutions.
            </Paragraph>
          </section>

          {/* Collage layout */}
          <div className="collage-grid">
            {/* Tech Stack */}
            <section className="section tech-stack-section" id="tech">
              <h2 className="section-title">
                💻 Tech Stack
              </h2>
              {Object.entries(techStack).map(([category, technologies]) => (
                <div key={category} className="tech-category">
                  <h3 className="tech-category-title">{category}</h3>
                  <div className="tech-tags">
                    {technologies.map((tech) => (
                      <Tag key={tech} className="tech-tag">
                        {tech}
                      </Tag>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            {/* Experience as a timeline */}
            <section className="section experience-section" id="experience">
              <h2 className="section-title">💼 Experience</h2>
              <Timeline
                className="experience-timeline"
                items={experience.map((exp) => ({
                  color: 'blue',
                  children: (
                    <div className="experience-item">
                      <div className="exp-date">{exp.period}</div>
                      <div className="exp-content">
                        <h4 className="exp-title">{exp.title}</h4>
                        <p className="exp-company">{exp.company}</p>
                        <p className="exp-description">{exp.description}</p>
                      </div>
                    </div>
                  ),
                }))}
              />
            </section>

            {/* Beyond Coding */}
            <section className="section beyond-coding" id="beyond">
              <h2 className="section-title">
                🚀 Beyond Coding
              </h2>
              <p className="beyond-text">
                Outside of work, I&apos;m focused on an active lifestyle through gym sessions to improve
                fitness and focus. Passionate about staying current with emerging technologies and
                exploring new development tools and methodologies.
              </p>
            </section>

            {/* Recent Projects */}
            <section className="section projects-section" id="projects">
              <h2 className="section-title">
                🎯 Recent Projects
              </h2>
              <div className="projects-list">
                {projects.map((project, index) => (
                  <a
                    key={index}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-item"
                    style={{ textDecoration: 'none' }}
                  >
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-desc">{project.description}</p>
                  </a>
                ))}
              </div>
            </section>
          </div>

          {/* Social Links */}
          <section className="section social-section" id="social">
            <h2 className="section-title">🔗 Social Links</h2>
            <div className="social-links">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  {link.icon}
                  <span>{link.name}</span>
                </a>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Floating navigation / back-to-top using AntD */}
      <FloatButton.Group
        shape="circle"
        style={{ right: 24 }}
        trigger="hover"
        icon={<ArrowUpOutlined />}
      >
        <Tooltip title="Back to top" placement="left">
          <FloatButton onClick={() => scrollToSection('about')} />
        </Tooltip>
        <Tooltip title="Tech Stack" placement="left">
          <FloatButton onClick={() => scrollToSection('tech')} icon={<CodeOutlined />} />
        </Tooltip>
        <Tooltip title="Experience" placement="left">
          <FloatButton onClick={() => scrollToSection('experience')} icon={<UserOutlined />} />
        </Tooltip>
        <Tooltip title="Projects" placement="left">
          <FloatButton onClick={() => scrollToSection('projects')} icon={<ProjectOutlined />} />
        </Tooltip>
      </FloatButton.Group>

      <footer className="footer">
        <p>&copy; 2025 Kevin Ananayo. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
