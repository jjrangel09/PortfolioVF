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
              <small>20+ in Colombia</small>
            </article>

            <article className="about__card">
              <GoProject className='about__icon' />
              <h5>Projects</h5>
              <small>15+ Completed</small>
            </article>
          </div>

          <p>Systems Engineer, with experience in development and design of User Interfaces, Web Apis and technical documentation for projects, Functional Testing, 
            application of SCRUM/KANBAN methodologies, JAVA, JAVASCRIPT, PHP, and HTML Markup and libraries/Frameworks such as React, Angular, Vue, Spring, NodeJs; 
            with fast learning capacity, ability to work in a team and creativity/problem solving skills.
          </p>

          <a href="#contact" className="button button-primary">Let's Talk</a>
        </div>
      </div>

    </section>
  )
}

export default About