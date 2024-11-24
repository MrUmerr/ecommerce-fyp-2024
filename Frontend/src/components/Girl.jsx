import React, { useState, useEffect } from 'react';
import Shopcards from './Shopcards';
import axios from 'axios';

const Girls = () => {
  const [shop, setShop] = useState([]);

  useEffect(() => {
    const getShop = async () => {
      try {
        const res = await axios.get("http://localhost:4001/Shop");
        const filteredData = res.data.filter((data) => data.Category === "Girls");
        console.log(filteredData); // Logs only the "Girl" category data
        setShop(filteredData); // Sets only the filtered data to state
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    getShop();
  }, []);

  return (
    <>
      <div className='max-w-screen-2xl container mx-auto md:px-16 px-2'>
        <div className='mt-28'>
          <h1 className='text-3xl items-center justify-center font-bold'>Girl's</h1>
        </div>

        <div className='mt-4 pt-2 grid grid-cols-2 md:grid-cols-5'>
          {shop.length > 0 ? (
            shop.map((item) => (
              <Shopcards item={item} key={item.Id} />
            ))
          ) : (
            <p>No items found in the "Girl" category.</p> // Fallback message
          )}
        </div>
      </div>
    </>
  );
};

export default Girls;
