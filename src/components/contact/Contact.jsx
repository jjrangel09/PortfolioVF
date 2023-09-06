import React from 'react'
import './contact.css'
import {AiOutlineMail} from 'react-icons/ai'
import {BsMessenger} from 'react-icons/bs'
import {BsWhatsapp} from 'react-icons/bs'
import {BsLinkedin} from 'react-icons/bs'
import { useRef } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_ywjzvla', 'template_5inqa8f', form.current, 'gTr2FepNhZzr8Un4S')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });

    e.target.reset()
  };

  return (
    <section id='contact'>
      <h5>Get in touch</h5>
      <h2>Contact</h2>

      <div className="container contact__container">
        <div className="contact__options">
          <article className="contact__option">
            <AiOutlineMail className='contact__option-icon'/>
            <h4>Email</h4>
            <h5>juanjose840@yahoo.com.co</h5>
            <a href="mailto:juanjose840@yahoo.com.co">Send an Email</a>
          </article>
          <article className="contact__option">
            <BsMessenger className='contact__option-icon'/>
            <h4>Messenger</h4>
            <h5>Juan José Rangel</h5>
            <a href="https://m.me/juanjose.rangel1">Send a Message</a>
          </article>
          <article className="contact__option">
            <BsWhatsapp className='contact__option-icon'/>
            <h4>Whatsapp</h4>
            <h5>+573004801412</h5>
            <a href="https://wa.me/+573004801412">Send a Message</a>
          </article>
          <article className="contact__option">
            <BsLinkedin className='contact__option-icon'/>
            <h4>LinkedIn</h4>
            <h5>Juan José Rangel</h5>
            <a href="www.linkedin.com/in/juanjoserangel">LinkedIn Profile</a>
          </article>
        </div>
        {/* <form ref={form} onSubmit={sendEmail}>
          <input type="text" name="name" placeholder='Your full Name' required/>
          <input type="email" name="email" placeholder='Your Email' required/>
          <textarea name="message" rows="7" placeholder='Your Message' required></textarea>
          <button type="submit" className='button button-primary'>Send Message</button>
        </form> */}
      </div>
    </section>
  )
}

export default Contact