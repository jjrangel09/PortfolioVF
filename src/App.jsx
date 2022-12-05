import React from 'react'
import About from './components/about/About'
import Contact from './components/contact/Contact'
import Experience from './components/experience/Experience'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import Nav from './components/nav/Nav'
import Portfolio from './components/portfolio/Portfolio'
import Certificates from './components/certificates/Certificates'
import Jobs from './components/jobs/Jobs'

const App = () => {
  return (
    <>
      <Header></Header>
      <Nav></Nav>
      <About></About>
      <Experience></Experience>
      <Certificates></Certificates>
      <Portfolio></Portfolio>
      <Jobs></Jobs>
      <Contact></Contact>
      <Footer></Footer>
    </>
  )
}

export default App