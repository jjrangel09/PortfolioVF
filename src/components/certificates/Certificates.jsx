import React from 'react'
import './certificates.css'
import {BsCheck2All} from 'react-icons/bs'

const Certificates = () => {
  return (
    <section id='certificates'>
      <h5>Courses I have taken</h5>
      <h2>Certificates</h2>
      <div className="container certificates__container">
        <article className="certificate">
          <div className="certificate__head">
            <h3>Frontend</h3>
          </div>
          <ul className="certificate__list">
            <li>
              <BsCheck2All className='certificate__list-icon'/>
              <p>React + Redux course Sololearn Inc - Certificate #1097-4964883</p>
            </li>
            <li>
              <BsCheck2All className='certificate__list-icon'/>
              <p>CSS Course Sololearn Inc - Certificate #1023-4964883</p>
            </li>
            <li>
              <BsCheck2All className='certificate__list-icon'/>
              <p>JavaScript – ES6 course Sololearn Inc - Certificate #4964883-1024</p>
            </li>
            <li>
              <BsCheck2All className='certificate__list-icon'/>
              <p>HTML course Sololearn Inc - Certificate #1014-4964883</p>
            </li>
          </ul>
        </article>
        <article className="certificate">
          <div className="certificate__head">
            <h3>Backend</h3>
          </div>
          <ul className="certificate__list">
            <li>
              <BsCheck2All className='certificate__list-icon'/>
              <p>JAVA Course Sololearn Inc - Certificate #1068-4964883</p>
            </li>
            <li>
              <BsCheck2All className='certificate__list-icon'/>
              <p>SQL Course Sololearn Inc - Certificate #1060-4964883</p>
            </li>
          </ul>
        </article>
        <article className="certificate">
          <div className="certificate__head">
            <h3>Others</h3>
          </div>
          <ul className="certificate__list">
            <li>
              <BsCheck2All className='certificate__list-icon'/>
              <p>Scrum Fundamentals Certified SCRUMstudy - Certificate 770136</p>
            </li>
            <li>
              <BsCheck2All className='certificate__list-icon'/>
              <p>UiPath RPA Starter 
              </p>
            </li>
            <li>
              <BsCheck2All className='certificate__list-icon'/>
              <p>UiPath DataTables and Excel Automation with Studio (v2020.10)</p>
            </li>
            <li>
              <BsCheck2All className='certificate__list-icon'/>
              <p>Get Started with RPA Development (v2020.10)</p>
            </li>
            <li>
              <BsCheck2All className='certificate__list-icon'/>
              <p>Introduction to RPA and Automation</p>
            </li>
            <li>
              <BsCheck2All className='certificate__list-icon'/>
              <p>Marketing Digital y Nuevas Tendencias Centro educación CAFAM (XSczUnt5j2) </p>
            </li>
          </ul>
        </article>
      </div>
    </section>
  )
}

export default Certificates