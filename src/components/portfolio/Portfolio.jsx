import React from 'react'
import './portfolio.css'
import IMG1 from '../../assets/portfolio1.jpeg'
import IMG2 from '../../assets/portfolio2.jpg'
import IMG3 from '../../assets/portfolio3.jpg'
import IMG4 from '../../assets/portfolio4.jpg'
import IMG5 from '../../assets/portfolio5.png'
import IMG6 from '../../assets/portfolio6.jpg'
import IMG7 from '../../assets/portfolio7.jpg'
import IMG8 from '../../assets/portfolio8.jpg'

const Portfolio = () => {
  return (
    <section id='portfolio'>
      <h5>Some of the projects I have participated in</h5>
      <h2>Portfolio</h2>

      <div className="container portfolio__container">
        <article className="portfolio__item">
          <div className="portfolio__item-image">
            <img src={IMG1} alt="description" />
          </div>
          <h3>"1000 y Una Historias" - (Game Design on Unity and Manual Testing (QA))</h3>
          <div className="portfolio__item-cta">
            <a href="https://1000yunahistorias.enfermeras.co" target="_blank" rel="noreferrer" className='button button-primary'>See Website</a>
          </div>
        </article>
        <article className="portfolio__item">
          <div className="portfolio__item-image">
            <img src={IMG2} alt="description" />
          </div>
          <h3>"1000 y Una Historias RA" - (Game Design on Unity and Manual Testing (QA))</h3>
          <div className="portfolio__item-cta">
            <a href="https://youtu.be/-JQkPA5DpIo" target="_blank" rel="noreferrer" className='button'>See Video</a>
          </div>
        </article>
        <article className="portfolio__item">
          <div className="portfolio__item-image">
            <img src={IMG3} alt="description" />
          </div>
          <h3>"1000 y una Historias" - BackOffice design/wireframing for interactive flow of RA Application</h3>
          <div className="portfolio__item-cta">
            <a href="https://1000yunahistorias.enfermeras.co" target="_blank" rel="noreferrer" className='button'>See Website</a>
          </div>
        </article>
        <article className="portfolio__item">
          <div className="portfolio__item-image">
            <img src={IMG4} alt="description" />
          </div>
          <h3>"SSL Colombia" - BackOffice Wireframing/desing of interactive flow for moodle custom courses app  </h3>
          <div className="portfolio__item-cta">
          </div>
        </article>
        <article className="portfolio__item">
          <div className="portfolio__item-image">
            <img src={IMG5} alt="description" />
          </div>
          <h3>"Titania RV Admin" - Backoffice for administration of 360° scenerios of Unity App</h3>
          <div className="portfolio__item-cta">
            <a href="https://titaniavr.com" target="_blank" rel="noreferrer" className='button button-primary'>Visit site</a>
          </div>
        </article>
        <article className="portfolio__item">
          <div className="portfolio__item-image">
            <img src={IMG6} alt="description" />
          </div>
          <h3>"EDIngenieria" - Web application for the calculation of electrical structures</h3>
        </article>
        <article className="portfolio__item">
          <div className="portfolio__item-image">
            <img src={IMG7} alt="description" />
          </div>
          <h3>"Titania RV" - Application for ecosystems education</h3>
          <div className="portfolio__item-cta">
          <a href="https://titaniavr.com" target="_blank" rel="noreferrer" className='button'>Visit site</a>
          </div>
        </article>
        <article className="portfolio__item">
          <div className="portfolio__item-image">
            <img src={IMG8} alt="description" />
          </div>
          <h3>"GoU" - Web/Android Application for Carpooling</h3>
        </article>
      </div>
    </section>
  )
}

export default Portfolio