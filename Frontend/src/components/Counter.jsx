import React, { useState } from 'react';

const Counter = ({ productPrice }) => {
  const [count, setCount] = useState(0);
  const [bill, setBill] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
    setBill((prevBill) => prevBill + productPrice);
    
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
      setBill((prevBill) => prevBill - productPrice);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={handleDecrement}
        className="text-black text-lg  bg-slate-200 px-4 py-2 rounded"
        disabled={count === 0}
      >
        -
      </button>
      <p className="text-lg font-bold">{count}</p>
      <button
        onClick={handleIncrement}
        className=" text-black text-lg bg-slate-200 px-4 py-2 rounded"
         disabled={count === 5}
      >
        +
      </button>
      <p className="text-lg font-semibold">Total.<span className='font-medium ml-2'>{bill.toFixed(0)}</span></p>
    </div>
  );
};

export default Counter;

