import React from 'react'
import Navbar from '../Navbar'
import Filter from '../Filter'
import Footer from '../Footer'

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