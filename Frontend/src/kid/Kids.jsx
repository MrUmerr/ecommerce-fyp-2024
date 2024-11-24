import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Kid from '../components/Kid'

const Kids = () => {
  return (
    <>
      <Navbar />
      <div className='min-h-screen'>
      <Kid />
      </div>
      <Footer />
    </>
  )
}

export default Kids
