import React, { useState } from 'react';

function ReviewStars() {
  const [selectedStars, setSelectedStars] = useState(0);

  const handleStarClick = (index) => {
    setSelectedStars(index + 1);
  };

  const stars = [];
  for (let i = 0; i < 5; i++) {
    const starClass = `${i < selectedStars ? 'bg-yellow-500' : 'star-outline'} rounded-full cursor-pointer`;
    stars.push(
      <span key={i} className={starClass} onClick={() => handleStarClick(i)}>
        ★
      </span>
    );
  }

  return (
    <div className="review-stars flex items-center">
      {stars}
      <span className="review-count ml-2 text-sm">(5)</span>
    </div>
  );
}

export default ReviewStars;