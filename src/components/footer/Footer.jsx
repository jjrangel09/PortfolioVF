import React from 'react'
import './footer.css'
import {BsLinkedin} from 'react-icons/bs'
import {BsTwitter} from 'react-icons/bs'
import {BsGithub} from 'react-icons/bs'

const Footer = () => {
  return (
    <section id='footer'>
      <a href="#home" className="footer__logo">JRangel</a>
      <ul className="permalinks">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#certificates">Certificates</a></li>
        <li><a href="#portfolio">Porfolio</a></li>
        <li><a href="#jobs">Jobs</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <div className="footer__socials">
        <a href="https://www.linkedin.com" target="_blank" rel="noreferrer"><BsLinkedin /></a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer"><BsTwitter /></a>
        <a href="https://github.com" target="_blank" rel="noreferrer"><BsGithub /></a>
      </div>

      <div className="footer__copyright">
        <small>
          Made with ❤️. 2022 &copy;
        </small>
      </div>
    </section>
  )
}

export default Footer