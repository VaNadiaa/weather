import React from "react";

function ForecastDay({ items }) {
  return (
    <div className="flex flex-col justify-center font-medium rounded-md bg-black/40 backdrop-blur px-3">
      <div className="flex flex-row space-x-1 sm:space-x-8">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex-grow:1 flex flex-col items-start rounded-md p-2 sm:p-3"
          >
            <p className="font-semibold text-lg uppercase">{item.weekday}</p>
            <p className="font-light text-base text-white/60 mb-3">
              {item.date}
            </p>
            <div className="font-light text-base">
              мин.{" "}
              <span className="font-medium">{`${item.minTemp.toFixed()}°`}</span>
            </div>
            <div className="font-light text-base">
              макс.{" "}
              <span className="font-medium">{`${item.maxTemp.toFixed()}°`}</span>
            </div>
            <img src={item.icon} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastDay;
