import React from 'react'
import Footer from '../components/Footer'
import Girl from '../components/Girl'
import Navbar from '../components/Navbar'

const Girls = () => {
  return (
    <>
     <Navbar />
     <div  className='pt-20'>
      <Girl />
      </div>
      <Footer /> 
    </>
  )
}

export default Girls
