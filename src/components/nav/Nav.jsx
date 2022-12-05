import React from 'react'
import './nav.css'
import { AiOutlineHome } from 'react-icons/ai'
import { AiOutlineUser } from 'react-icons/ai'
import { BsBook } from 'react-icons/bs'
import { MdDesignServices } from 'react-icons/md'
import { AiOutlineContacts } from 'react-icons/ai'
import { useState } from 'react'

const Nav = () => {

  const [activeNavItem, setActiveNavItem] = useState('#home')

  function getActiveItem(item) {
    if(activeNavItem === item){
      return 'active'
    } else{
      return ''
    }
  }

  return (
    <nav>
      <a href="#home" onClick={() => setActiveNavItem('home')} className = {getActiveItem('home')}><AiOutlineHome /></a>
      <a href="#about" onClick={() => setActiveNavItem('about')} className = {getActiveItem('about')}><AiOutlineUser /></a>
      <a href="#experience" onClick={() => setActiveNavItem('experience')} className = {getActiveItem('experience')}><BsBook /></a>
      <a href="#certificates" onClick={() => setActiveNavItem('certificates')} className = {getActiveItem('certificates')}><MdDesignServices /></a>
      <a href="#contact" onClick={() => setActiveNavItem('contact')} className = {getActiveItem('contact')}><AiOutlineContacts /></a>
    </nav>
  )

}

export default Nav
