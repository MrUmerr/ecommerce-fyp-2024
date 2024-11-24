import React from 'react'
import Navbar from '../components/Navbar'
import Men from '../components/Men'
import Footer from '../components/Footer'

const Mens = () => {
  return (
    <>
     <Navbar />
     <div className='min-h-screen'>
      <Men />
      </div>
      <Footer /> 
    </>
  )
}

export default Mens
