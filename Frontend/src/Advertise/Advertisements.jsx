import React from 'react'
import Navbar from '../components/Navbar'
import Advertisement from '../components/Advertisement'
import Footer from '../components/Footer'

const Advertisements = () => {
  return (
    <>
      <Navbar/>
      <div className='min-h-screen'>
       <Advertisement />
      </div>
      <Footer/>
    </>
  )
}

export default Advertisements
