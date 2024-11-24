import React from 'react'
import Navbar from '../Navbar'
import ProductAdminPanel from '../ProductAdminPanel'
import Footer from '../Footer'

const ProductsAdminPanel = () => {
  return (
    <div>
        <Navbar />
        <div className='min-h-screen'>
            <ProductAdminPanel />
        </div>
        <Footer />
    </div>
  )
}

export default ProductsAdminPanel