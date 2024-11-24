import React from 'react'
import Navbar from '../../components/Navbar'
import Filter from '../../components/Filter'
import Footer from '../../components/Footer'

const FilData = () => {
  return (
    <>
    <Navbar />
    <div className='min-h-screen'>
        <Filter />
    </div>
    <Footer />
    </>
  )
}

export default FilData