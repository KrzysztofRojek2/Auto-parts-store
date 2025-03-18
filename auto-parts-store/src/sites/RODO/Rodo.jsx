import React from 'react'
import './rodo.css'
import Navbar from '../../containers/navbar/Navbar'
import Footer from '../../containers/footer/Footer'
const Rodo = () => {
  return (
    <>
        <Navbar/>
        <div className='rodo'>
        <h1>General Data Protection Regulation (GDPR) Policy</h1>
        <p>Welcome to our GDPR policy page. This policy outlines how we handle your personal data in compliance with the General Data Protection Regulation (GDPR).</p>

        <h2>1. Introduction</h2>
        <p>The GDPR is a regulation in EU law on data protection and privacy for all individuals within the European Union and the European Economic Area. It also addresses the transfer of personal data outside the EU and EEA areas.</p>

        <h2>2. Data We Collect</h2>
        <p>We may collect the following types of personal data:</p>
        <ul>
          <li>Identification data (e.g., name, date of birth, passport number)</li>
          <li>Contact data (e.g., address, email, phone number)</li>
          <li>Financial data (e.g., bank account details, transaction history)</li>
          <li>Technical data (e.g., IP address, browser type, access times)</li>
          <li>Usage data (e.g., how you use our website, services, and products)</li>
          <li>Marketing data (e.g., your preferences in receiving marketing from us)</li>
        </ul>

        <h2>3. How We Use Your Data</h2>
        <p>Your personal data will be used only for the following purposes:</p>
        <ul>
          <li>To provide and maintain our services</li>
          <li>To manage your account</li>
          <li>To perform contractual obligations</li>
          <li>To comply with legal obligations</li>
          <li>To improve our services</li>
          <li>To send you marketing communications (if you have opted-in)</li>
        </ul>

        <h2>4. Legal Basis for Processing</h2>
        <p>We process your personal data based on the following legal grounds:</p>
        <ul>
          <li>Consent: You have given us permission to process your personal data for specific purposes.</li>
          <li>Contract: The processing is necessary for the performance of a contract with you.</li>
          <li>Legal obligation: We must process your data to comply with a legal obligation.</li>
          <li>Legitimate interests: The processing is necessary for our legitimate interests or the legitimate interests of a third party, provided your interests and fundamental rights do not override those interests.</li>
        </ul>
        </div>
        <Footer />
    </>
  )
}

export default Rodo
