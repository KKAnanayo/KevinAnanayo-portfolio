import './App.css'
import profilePic from './assets/Me.png'
import { LinkedinOutlined, GithubOutlined, InstagramOutlined } from '@ant-design/icons'

function App() {
  const techStack = {
    Frontend: ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'React', 'Vite', 'Material UI', 'Tailwind CSS'],
    Backend: ['Node.js', 'Express', 'Python', 'Java', 'C#', '.NET', 'REST'],
    Databases: ['MongoDB', 'MySQL', 'MariaDB', 'Firebase'],
    'DevOps / Cloud': ['Ubuntu', 'Bash', 'Azure', 'GitHub', 'Git', 'RabbitMQ', 'WordPress'],
    'Developer Tools': ['VS Code', 'Visual Studio', 'Postman', 'Eclipse', 'Android Studio'],
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
      description: 'Real-time analytics platform with interactive data visualization and reporting capabilities.',
      link: '#'
    },
    {
      title: 'ITBYTES',
      description: 'An ecommerce web application for ITBytes, a business that sells computers and CCTV systems.',
      link: 'https://itbytes.dreos.qzz.io/'
    },
    {
      title: 'VAWCARE',
      description: 'A Progressive Web Application (PWA) developed to support barangay-level efforts in preventing and responding to Violence Against Women and Children (VAWC) cases.',
      link: 'https://vawcare-app.vercel.app/'
    }
  ]

  const socialLinks = [
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: <LinkedinOutlined /> },
    { name: 'GitHub', url: 'https://github.com/KKAnanayo', icon: <GithubOutlined /> },
    { name: 'Instagram', url: 'https://instagram.com', icon: <InstagramOutlined /> }
  ]

  return (
    <div className="portfolio">
      {/* Profile Header - Sidebar Style */}
      <div className="profile-header">
        <img src={profilePic} alt="Kevin Ananayo" className="profile-image" />
        <div className="profile-info">
          <h1 className="name">Kevin Klein Ananayo</h1>
          <p className="location">📍 Metro Manila, Philippines</p>
          <p className="title">Software Engineer | Full Stack Developer</p>
          <div className="buttons">
            <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Schedule a meeting
            </a>
            <a href="mailto:jadenyuki486@gmail.com" className="btn btn-secondary">
              Send Email
            </a>
          </div>
        </div>
      </div>

      {/* Collage Grid Container */}
      <div className="collage-container">
        {/* About Section */}
        <section className="section about-card">
          <h2 className="section-title">📋 About</h2>
          <p className="section-text">
            A results-driven Full-Stack Developer with hands-on experience in both Rapid Application Development (RAD) and Agile methodologies. Proficient in modern development tools such as Jira for project tracking and Notion for documentation.
          </p>
          <p className="section-text">
            Adept at building scalable and efficient web applications using React, Node.js, TypeScript, and Vite. Strong focus on delivering seamless user experiences through UI/UX enhancements while ensuring robust backend performance to support enterprise-grade solutions.
          </p>
        </section>

        {/* Experience Section */}
        <section className="section experience-card">
          <h2 className="section-title">💼 Experience</h2>
          <div className="experience-list">
            {experience.map((exp, index) => (
              <div key={index} className="experience-item">
                <div className="exp-date">{exp.period}</div>
                <h4 className="exp-title">{exp.title}</h4>
                <p className="exp-company">{exp.company}</p>
                <p className="exp-description">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="section tech-card">
          <h2 className="section-title">💻 Tech Stack</h2>
          <div className="tech-categories">
            {Object.entries(techStack).map(([category, technologies]) => (
              <div key={category} className="tech-category">
                <h3 className="category-name">{category}</h3>
                <div className="tech-tags">
                  {technologies.map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Beyond Coding Section */}
        <section className="section beyond-card">
          <h2 className="section-title">🚀 Beyond Coding</h2>
          <p className="section-text">
            Outside of work, I'm focused on an active lifestyle through gym sessions to improve fitness and focus. Passionate about staying current with emerging technologies and exploring new development tools and methodologies.
          </p>
        </section>

        {/* Projects Section */}
        <section className="section projects-card">
          <h2 className="section-title">🎯 Recent Projects</h2>
          <div className="projects-list">
            {projects.map((project, index) => (
              <a
                key={index}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card"
              >
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
              </a>
            ))}
          </div>
        </section>
      </div>

      {/* Social Links Section */}
      <section className="section social-section">
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
              <span className="social-icon">{link.icon}</span>
              <span className="social-name">{link.name}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Copyright */}
      <div className="copyright">
        <p>&copy; 2025 Kevin Ananayo. All rights reserved.</p>
      </div>
    </div>
  )
}

export default App
