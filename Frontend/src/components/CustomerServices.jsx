import React from 'react'
import { FaShippingFast, FaCheckCircle, FaLock, FaHeadphones } from 'react-icons/fa';

const CustomerServices = () => {
  return (
    <>
          <div className="flex flex-col md:flex-row md:justify-around bg-gray-100 py-8 px-4 space-y-6 md:space-y-0 md:space-x-8 dark:bg-slate-900">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <FaShippingFast className="text-red-500 text-5xl mb-2" />
                <h3 className="font-bold text-lg text-black  dark:text-white ">Free Shipping</h3>
                <p className="text-sm text-gray-500  dark:text-gray-400">Free Shipping On All Orders</p>
            </div>
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <FaCheckCircle className="text-red-500 text-5xl mb-2" />
                <h3 className="font-bold text-lg text-black  dark:text-white">Safe Money</h3>
                <p className="text-sm text-gray-500  dark:text-gray-400">30 Days Money Back</p>
            </div>
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <FaLock className="text-red-500 text-5xl mb-2" />
                <h3 className="font-bold text-lg text-black  dark:text-white">Secure Payment</h3>
                <p className="text-sm text-gray-500  dark:text-gray-400">All Payments Secure</p>
            </div>
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <FaHeadphones className="text-red-500 text-5xl mb-2" />
                <h3 className="font-bold text-lg text-black  dark:text-white">Online Support 24/7</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Technical Support 24/7</p>
            </div>
        </div>
    </>
    
  )
}

export default CustomerServices