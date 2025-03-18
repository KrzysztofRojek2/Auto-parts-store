import React from 'react'
import './about.css'
import Navbar from '../../containers/navbar/Navbar'

const About = () => {
  return (
    <>
    <Navbar/>
    <div className='about'>
      <h1>About Us</h1>
      <div className='about__text'>
        <p>Witaj w MotoCar - Twoim partnerze w podróży ku doskonałym samochodom! Jesteśmy zespołem pasjonatów motoryzacji, którzy od lat dostarczają
           klientom najwyższej jakości pojazdy i usługi. Nasza firma powstała z miłości do samochodów i zaufania do naszych klientów. Zapraszamy do odkrycia naszej oferty i dołączenia
             do rodziny MotoCar - gdzie pasja do motoryzacji łączy się z profesjonalizmem i zaufaniem.</p>
      </div>
    </div>
    </>
  )
}

export default About
