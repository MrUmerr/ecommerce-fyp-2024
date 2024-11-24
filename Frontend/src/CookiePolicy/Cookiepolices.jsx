import React from 'react'
import Navbar from '../components/Navbar'
import Cokiepolicy from '../components/Cokiepolicy'
import Footer from '../components/Footer'

const Cookiepolices = () => {
  return (
    <>
      <Navbar />
      <div className='min-h-screen'>
        <Cokiepolicy />
      </div>
      <Footer />
    </>
  )
}

export default Cookiepolices
