import { coreValues } from '@/data/data';
import React from 'react';

const CoreValues = () => {
  return (
    <div className="w-full min-h-[20rem] mt-10 flex flex-col gap-8 ">
      <div>
        <h1 className="text-6xl font-semibold text-primary-400  ">
          Our Values
        </h1>
      </div>
      <div className="w-full grid grid-cols-4 gap-8 ">
        {coreValues?.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-4 bg-secondary-600 p-8 rounded-xl select-none shadow-2xl shadow-[10,10,2,#000000] "
          >
            <h1 className="text-center text-2xl font-bold font-serif text-white ">
              {item.title}
            </h1>
            <p className="font-sans text-neutral-100  ">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoreValues;
