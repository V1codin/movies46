const fillRatingCirles = (index, rating) => {
  const fillIndex =
    parseFloat((rating - index).toFixed(2)) >= 1
      ? 1
      : parseFloat((rating - index).toFixed(2));

  if (rating >= 6) {
    return {
      backgroundImage: `linear-gradient(to right, #76db5d ${
        fillIndex * 100
      }%, #fff)`,
    };
  } else if (rating < 6 && rating >= 4) {
    return {
      backgroundImage: `linear-gradient(to right, #cbce34 ${
        fillIndex * 100
      }%, #fff)`,
    };
  } else if (rating < 4) {
    return {
      backgroundImage: `linear-gradient(to right, #c01111 ${
        fillIndex * 100
      }%, #fff)`,
    };
  }

  return {
    backgroundImage: `linear-gradient(to right, #fff ${
      fillIndex * 100
    }%, #fff)`,
  };
};

export default (rating) => {
  const circles = Array.from({ length: Math.ceil(rating) }, (_, index) => {
    return fillRatingCirles(index, rating);
  });

  return circles;
};
