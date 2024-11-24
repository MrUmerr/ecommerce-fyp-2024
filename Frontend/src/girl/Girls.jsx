import React from 'react'
import Footer from '../components/Footer'
import Girl from '../components/Girl'
import Navbar from '../components/Navbar'

const Girls = () => {
  return (
    <>
     <Navbar />
     <div  className='min-h-screen'>
      <Girl />
      </div>
      <Footer /> 
    </>
  )
}

export default Girls
