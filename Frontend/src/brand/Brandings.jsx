import React from 'react'
import Navbar from '../components/Navbar'
import Branding from '../components/Branding'
import Footer from '../components/Footer'

const brandings = () => {
  return (
    <>
      <Navbar />
      <div className='min-h-screen'>
      <Branding />
      </div>
      <Footer />
    </>
  )
}

export default brandings
