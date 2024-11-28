import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Kid from '../components/Kid'

const Kids = () => {
  return (
    <>
      <Navbar />
      <div className='pt-20'>
      <Kid />
      </div>
      <Footer />
    </>
  )
}

export default Kids
