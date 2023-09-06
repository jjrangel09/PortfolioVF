import React from 'react'
import CV from '../../assets/CV-Juan_Jose_Rangel.pdf'

const CTA = () => {
  return (
    <div className="cta">
        <a href={CV} download className='button'>Download CV (Spanish)</a>
        <a href="#contact" className='button button-primary'>Let´s Talk</a>
    </div>
  )
}

export default CTA