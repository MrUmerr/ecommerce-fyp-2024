import React from 'react'
import Navbar from '../components/Navbar'
import About from '../components/About'
import Footer from '../components/Footer'

const Aboutus = () => {
  return (
    <>
      <Navbar />
      <div className='min-h-screen'>
        <About />
      </div>
      <Footer />
    </>
  )
}

export default Aboutus
