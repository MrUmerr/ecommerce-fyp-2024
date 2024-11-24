import React, { useRef } from "react";
import Slider from "react-slick";

function AutoPlayMethods() {
  let sliderRef = useRef(null);
  const play = () => {
    sliderRef.slickPlay();
  };
  const pause = () => {
    sliderRef.slickPause();
  };

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 768, // Adjust the breakpoint as needed
        settings: {
          arrows: false
        }
      }
    ]
  };

  return (

    <div className="max-w-screen-2xl container mx-auto md:px-16 px-2 mt-12 mb-4">
    <div className="slider-container">

      <Slider ref={slider => (sliderRef = slider)} {...settings}>
        <div>
          <img src="https://img.lazcdn.com/us/domino/f5dca00c-eeaf-464d-ae5f-bdef37a2ca9f_PK-1976-688.jpg_2200x2200q80.jpg_.webp" alt="" />
        </div>
        <div>
         <img src="https://img.lazcdn.com/us/domino/f7f8fd62-9d22-4f46-876b-e001134b4e50_PK-1976-688.jpg_2200x2200q80.jpg_.webp" alt="" />
        </div>
        <div>
          <img src="https://img.lazcdn.com/us/domino/835e340e-549b-4eb5-bb83-e640f2311aad_PK-1976-688.jpg_2200x2200q80.jpg_.webp" alt="" />
        </div>
      </Slider>
    </div>
    </div>
  );
}
export default AutoPlayMethods;