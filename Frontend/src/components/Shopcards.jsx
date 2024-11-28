import React from 'react';
import { Link } from 'react-router-dom';

const Shopcards = ({ item }) => {

  console.log("Item Of Card: ",item);

  return (
    <Link to={`/product/${item._id}`}>
      <div className=' pl-4 md:mt-2 py-3 px-2'>
        <div className="card rounded-none hover:shadow-2xl cursor-pointer px-1 md:w-52 h-auto hover:scale-100 duration-200 md:scale-90 ">

          <figure>
            <img className='object-cover md:w-full h-60 hover:shadow-md'
              src={item.Img}
              alt="Bkg Img" />

          </figure>
          <div className=" mt-1 pl-2 pb-4">
            <h3 className="font-extralight pr-1 truncate">
              {item.Name}
            </h3>
            <div className="">
              <div className="text-pink-500">Rs.{item.Price}</div>
            </div>
            <div>
              <span className="line-through text-slate-400 text-sm">Rs.{item.Oldprice}</span> <span className="text-sm">{item.Percentoff}</span>
              <div className="badge font-light rounded-md border-pink-500 text-pink-500 dark:bg-slate-900 dark:text-white dark:hover:text-pink-500 hover:bg-pink-500 hover:text-white duration-200 cursor-pointer md:ml-6">Buy now</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Shopcards

