import React from 'react';

const Loading = ({ color }) => {
  return (
    <div
      className={`border-2 w-full h-full rounded-full border-t-transparent text-grey-800 animate-spin ${
        color ? `border-${color}` : 'border-black'
      } `}
    ></div>
  );
};

export default Loading;
