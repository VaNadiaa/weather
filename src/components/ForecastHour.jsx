import React from "react";

function ForecastHour({ items }) {
  return (
    <div className="flex flex-col justify-center font-medium uppercase rounded-md bg-black/40 backdrop-blur p-4">
      <div className="flex flex-row space-x-4 sm:space-x-6">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col items-center rounded-md">
            <p className="font-light text-base">{item.title}</p>
            <img src={item.icon} alt="" />
            <p className="font-medium">{`${item.temp.toFixed()}°`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastHour;
