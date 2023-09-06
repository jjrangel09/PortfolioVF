import React from 'react'
import {BsLinkedin} from 'react-icons/bs'
import {BsTwitter} from 'react-icons/bs'
import {BsGithub} from 'react-icons/bs'

const HeaderSocials = () => {
  return (
    <div className='header__socials'>
        <a href="https://www.linkedin.com/in/juanjoserangel" target="_blank" rel="noreferrer"><BsLinkedin/></a>
        {/* <a href="https://twitter.com/Juanjose80R" target="_blank" rel="noreferrer"><BsTwitter/></a>
        <a href="https://github.com/jjrangel09" target="_blank" rel="noreferrer"><BsGithub/></a> */}    </div>
  )
}

export default HeaderSocials