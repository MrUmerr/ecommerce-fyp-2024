import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Office from '../components/Office'

const Offices = () => {
  return (
    <>
      <Navbar />
      <div className='min-h-screen'>
      <Office />
      </div>
      <Footer />
    </>
  )
}

export default Offices
