import React from 'react'
import Shopcards from './Shopcards'
import { useState, useEffect } from 'react';

import axios from 'axios';

const Kid = () => {

const [shop, setShop] = useState([]);
useEffect(() => {
  const getShop = async () => {
    try {
      const res = await axios.get("http://localhost:4001/Shop");
      const filterData = res.data.filter((data) => data.Category === "Kids")
      console.log(filterData)
      setShop(filterData)

    } catch (error) {
      console.log("Error= ", error);
    }
  };
  getShop();
}, []);


  return (
    <>
      <div className='max-w-screen-2xl container mx-auto md:px-16 px-2'>
        <div className='mt-28'>
          <h1 className='text-3xl items-center justify-center font-bold'>Kids</h1>
        </div>

        <div className='mt-4 pt-2 grid grid-cols-2 md:grid-cols-5'>
          {shop.map((item) => (
            <Shopcards key={item.Id} item={item} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Kid
