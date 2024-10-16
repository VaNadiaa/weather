import React from "react";
import ForecastHour from "./ForecastHour";
import ForecastDay from "./ForecastDay";

function TemperatureAndDetails({
  weather: {
    temp_day,
    text,
    icon,
    wind_kph,
    humidity,
    feelslike_c,
    maxtemp_c,
    mintemp_c,
    sunrise,
    sunset,
    daily_chance_of_rain,
    hour,
    forecastday,
  },
}) {
  return (
    <div>
      <div className="flex justify-center flex-wrap gap-8 mb-16">
        {/* Иконка с данными*/}
        <div className="bg-black/40 backdrop-blur sm:basis-1/3 rounded-md p-4">
          <div className="flex justify-items-center">
            {/* Иконка */}
            <img className="size-24 lg:size-28 mr-5" src={icon} alt="" />
            {/* Блок температура и погода */}
            <div className="mb-5 sm:w-80">
              <p className="text-4xl lg:text-5xl mb-1">{`${temp_day.toFixed()}°`}</p>
              <p className="text-balance text-2xl lg:text-2xl font-light">{text}</p>
            </div>
          </div>
          <div className="flex">
            {/* Восход, закат */}
            <div>
              <div className="flex flex-row items-center">
                <div className="icon-sun text-2xl lg:text-3xl"></div>
                <p className="text-base lg:text-lg">
                  Восход <span className="font-light ml-1">{sunrise}</span>
                </p>
              </div>
              <div className="flex flex-row items-center ">
                <div className="icon-sunrise text-2xl lg:text-3xl"></div>
                <p className="text-base lg:text-lg">
                  Закат <span className="font-light ml-1">{sunset}</span>
                </p>
              </div>
            </div>
            {/* Макс., мин. */}
            <div>
              <div className="flex flex-row items-center">
                <div className="icon-up-small text-2xl lg:text-3xl"></div>
                <p className="text-base lg:text-lg">
                  Макс.
                  <span className="font-light ml-1">{`${maxtemp_c.toFixed()}°`}</span>
                </p>
              </div>
              <div className="flex flex-row items-center">
                <div className="icon-down-small text-2xl lg:text-3xl"></div>
                <p className="text-base lg:text-lg">
                  Мин.
                  <span className="font-light ml-1">{`${mintemp_c.toFixed()}°`}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Подробнее */}
        <div className="flex flex-col justify-center bg-black/40 backdrop-blur rounded-md space-y-5 p-4">
          <div className="icon-temperature font-light text-lg">
            Ощущается{" "}
            <span className="font-medium ml-1">{`${feelslike_c.toFixed()}°`}</span>
          </div>
          <div className="icon-droplet font-light text-lg">
            Влажность{" "}
            <span className="font-medium ml-1">{`${humidity.toFixed()}%`}</span>
          </div>
          <div className="icon-wind font-light text-lg">
            Ветер{" "}
            <span className="font-medium ml-1">{`${wind_kph.toFixed()} км/ч`}</span>
          </div>
          <div className="icon-water font-light text-lg">
            Осадки{" "}
            <span className="font-medium ml-1">{`${daily_chance_of_rain.toFixed()}%`}</span>
          </div>
        </div>
        {/* Прогноз */}
        <ForecastHour items={hour} />
        <ForecastDay items={forecastday} />
      </div>
    </div>
  );
}

export default TemperatureAndDetails;
