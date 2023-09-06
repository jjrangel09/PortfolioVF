import React from 'react'
import './about.css'
import ME from '../../assets/me-about.jpg'
import { FaAward } from 'react-icons/fa'
import { FaUsers } from 'react-icons/fa'
import { GoProject } from 'react-icons/go'

const About = () => {
  return (
    <section id='about'>
      <h5>Get to know</h5>
      <h2>About Me</h2>
      <div className="container about__container">
        <div className="about__me">
          <div className="about__me-image">
            <img src={ME} alt="About" />
          </div>
        </div>

        <div className="about__content">
          <div className="about__cards">
            <article className="about__card">
              <FaAward className='about__icon' />
              <h5>Experience</h5>
              <small>2+ Years Working</small>
            </article>

            <article className="about__card">
              <FaUsers className='about__icon' />
              <h5>Clients</h5>
              <small>10+ in Colombia</small>
            </article>

            <article className="about__card">
              <GoProject className='about__icon' />
              <h5>Projects</h5>
              <small>15+ Completed</small>
            </article>
          </div>

          <p>Systems engineer with experience in development in programming languages 
            (JAVA, JAVASCRIPT, TypeScript, PHP, Python), support, mentoring and codeReviews 
            for junior and trainee developers; management of frameworks 
            (Spring, React, Angular, Vue, NodeJs). Extensive knowledge in REST and SOAP, 
            agile methodologies (SCRUM, KANBAN and XP), AWS technologies 
            (Lambda Functions in Java and Python, CodeBuild, AWS SAM, XRay, IAM, RDS, EC2, CloudWatch), 
            databases (AuroraDB, Postgres, SQL Server, MySQL) and extensive experience and knowledge 
            in functional testing. Noted for solving complex challenges, fast learning and passion 
            for excellence in software development. I am constantly updated in technologies and development methodologies.
          </p>

          <a href="#contact" className="button button-primary">Let's Talk</a>
        </div>
      </div>

    </section>
  )
}

export default About