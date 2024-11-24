import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Marketing from '../components/Marketing'

const Marketings = () => {
  return (
    <>
      <Navbar />
      <div className='min-h-screen'> 
     <Marketing />
     </div>
      <Footer />
    </>
  )
}

export default Marketings
