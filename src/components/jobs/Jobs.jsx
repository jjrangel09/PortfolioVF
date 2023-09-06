import React from 'react'
import './jobs.css'
import AVTR1 from '../../assets/avatar1.jpg'
import AVTR2 from '../../assets/avatar2.jpg'
import AVTR3 from '../../assets/avatar3.jpg'
import AVTR4 from '../../assets/avatar4.jpg'

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination } from "swiper";

const Jobs = () => {
  return (
    <section id='jobs'>
      <h5>Companies I have worked with</h5>
      <h2>Jobs</h2>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 5,
          slideShadows: false,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper">
        <SwiperSlide className="container testimonials__container">
          <div className="testimonial">
            <div className="client__avatar">
              <img src={AVTR4} alt="Avatar" />
            </div>
            <h5 className="client__name">Emida - Software Developer</h5>
            <small className="client__review">
            I perform custom development of solutions for clients incorporated in the Instapay platform and Emida services API.
- Development of solutions in Java and JavaScript in VUE Framework.
- Rest and Soap services creation
- Integration with mobile phone service providers.
- Currently assisting in the renovation and creation of new services in the company (React, Aws Lambda, AuroraDB, ECS, EKS).
            </small>
          </div>
        </SwiperSlide>
        <SwiperSlide className="container testimonials__container">
          <div className="testimonial">
            <div className="client__avatar">
              <img src={AVTR3} alt="Avatar" />
            </div>
            <h5 className="client__name">Globant - Test Automation Engineer</h5>
            <small className="client__review">
            Performed the creation of automated tests in Appium (JAVA) for Disney Resort App project.
- Performed automated testing creation with selenium (Java) for ESPN project.
- Implemented and designed test cases for Automated Testing for AutoDesk project API with REST Assure (JAVA)
            </small>
          </div>
        </SwiperSlide>
        <SwiperSlide className="container testimonials__container">
          <div className="testimonial">
            <div className="client__avatar">
              <img src={AVTR2} alt="Avatar" />
            </div>
            <h5 className="client__name">Unisys - Software and RPA developer</h5>
            <small className="client__review">
              Performed the review, execution and development of RPA solutions in UIPATH.
- Executed the development of interfaces based on user stories for software solutions in EAE proprietary language migrating services to Spring with PostgreSQL.
- Implemented and designed user interfaces for CINCO information system.
            </small>
          </div>
        </SwiperSlide>
        <SwiperSlide className="container testimonials__container">
          <div className="testimonial">
            <div className="client__avatar">
              <img src={AVTR1} alt="Avatar" />
            </div>
            <h5 className="client__name">Gaira Consulting Group - Functional Tester</h5>
            <small className="client__review">
            Developed and executed functional test plans for about 5 projects of web and mobile (Android) solutions for MinCiencias and MinTIC.
- Tested mobile and web applications in controlled environments prior to production releases
- Established and built strong working relationships with project skateholders and developers
- Reviewed test plans and procedures to adapt the coverage of these to the requirements of the projects.
            </small>
          </div>
        </SwiperSlide>
        <SwiperSlide className="container testimonials__container">
          <div className="testimonial">
            <div className="client__avatar">
              <img src={AVTR1} alt="Avatar" />
            </div>
            <h5 className="client__name">Gaira Consulting Group - Documentation Excecutive</h5>
            <small className="client__review">
            Documented and designed the technical requirements of 5 WEB and Mobile software projects.
- Modeled and designed wireframes of user interfaces for software solutions based on the requirements provided by MinTIC or the Client (Adobe XD).
- Prepared and edited project documentation according to the specifications of the project manager, team or client.
- Performed code reviews and corrections in the Front end of web projects (AngularJS) and deployed them in AWS EC2 and database in AWS RDS.
            </small>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  )
}

export default Jobs