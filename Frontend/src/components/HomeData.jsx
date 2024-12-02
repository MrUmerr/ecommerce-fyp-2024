import React, { useState, useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Shopcards from './Shopcards';
import AutoPlayMethods from './AutoPlayMethods';
import axios from 'axios';
import CustomerServices from './CustomerServices';
import { Link } from 'react-router-dom';

const HomeData = () => {
  const [filterData, setFilterData] = useState([]);
  const [jfuData, setJfuData] = useState([]);
  const [testData, setTestData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getShop = async () => {
      try {
        const res = await axios.get("http://localhost:4001/Shop");

        const filterData = res.data.filter((data) => data.Category === "onsalenow");
        const jfuData = res.data.filter((dataa) => dataa.Category === "justforyou");
        const testData = res.data.filter((dta) => dta.Category === "Trending");

        setFilterData(filterData);
        setJfuData(jfuData);
        setTestData(testData);
        setLoading(false); // Set loading to false after data is fetched

        console.log(res.data);
      } catch (error) {
        console.log(error);
        setLoading(false); // Stop loading if there's an error
      }
    };
    getShop();
  }, []);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: true, 
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          arrows: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          arrows: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false
        }
      }
    ]
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading while data is fetching
  }

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-16 px-4">
      <h1 className="font-semibold text-xl mb-2 mt-8">On Sale Now</h1>
      <div className='max-w-screen-2xl container mx-auto'>
        <Slider {...settings}>
          {filterData.map((item) => (
            <Shopcards item={item} key={item._id} /> // Use item._id for the key
          ))}
        </Slider>
        <br />
        <br />
      </div>

      <h1 className="font-semibold text-xl mb-2 mt-2">Just For You</h1>
      <Slider {...settings}>
        {jfuData.map((item) => (
          <Shopcards item={item} key={item._id} /> // Use item._id for the key
        ))}
      </Slider>

      <AutoPlayMethods />
      
      <h1 className="font-semibold text-xl mb-2 mt-4 ">Trending</h1>
      <Slider {...settings}>
        {testData.map((item) => (
          <Shopcards item={item} key={item._id} /> // Use item._id for the key
        ))}
      </Slider>
      <br />
      <br />
      <CustomerServices />
    </div>
  );
}

export default HomeData;
