import React, { useState } from "react";
import Bnr2 from "../assets/Images/Bnr2.png";
import toast from "react-hot-toast";
import Filter from "./Filter";

function Banner() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email) {
      toast.error("Email required");
    } else {
      toast.success("Subscribed successfully");
      // Clear the email input after successful subscription, if needed
      setEmail("");
    }
  };
  

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-16 px-4 flex flex-col md:flex-row">
        <div className="order-2 md:order-1 w-full md:w-1/2 mt-4 p-1 md:mt-28">
          <h1 className="text-3xl md:text-5xl font-bold mt-0 md:mt-20">
            Hello Welcomes, Discover Your Perfect{" "}
            <br />
            <span className="text-pink-500">Look Today!!!</span>
          </h1>
          <p className="text-xl font-semibold mt-8">
            Discover premium products at unbeatable prices. Shop now for
            exclusive deals, fast shipping, and exceptional customer service.
          </p>

          <br />
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70 dark:text-black">
              <path
                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path
                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow dark:text-black"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <button
            className="mt-4 mb-4 btn btn-secondary"
            onClick={handleSubscribe}
          >
            Subscribe
          </button>

        </div>

        <div className="order-1 w-full md:w-1/2 mt-32 md:mt-20">
          <img src={Bnr2} className="w-92 h-92" alt="Background banner" />
        </div>
      </div>
      
    </>
  );
}


export default Banner;
