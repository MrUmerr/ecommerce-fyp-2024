import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Presskits from '../components/Presskits'

const Presskit = () => {
    return (
        <>
            <Navbar />
            <div className='min-h-screen'>
            <Presskits />
            </div>
            <Footer />

        </>
    )
}

export default Presskit
