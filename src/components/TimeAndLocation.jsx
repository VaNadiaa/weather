import React from "react";
import { formatToLocalTime, formatDate } from "../services/weatherService";

function TimeAndLocation({ weather: { name, country, tz_id, localtime_epoch } }) {
  return (
    <div className="flex flex-col text-white items-center text-xl font-light bg-black/40 rounded-md mb-8 p-4">
      <p>{formatDate(localtime_epoch, tz_id)}</p>
      <p>
        <span className="font-medium">Сейчас: </span>
        {formatToLocalTime(localtime_epoch, tz_id)}
      </p>
      <p className="text-center text-4xl sm:text-5xl font-medium">{name}, {country}</p>
    </div>
  );
}

export default TimeAndLocation;
