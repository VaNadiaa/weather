import React from "react";

function Footer() {
  return (
    <div className="bg-black/40 backdrop-blur py-5 bottom-0 absolute w-full">
      <div className="mx-auto max-w-screen-xl px-8">
        <p className="font-light text-sm">
          Исходные данные:{" "}
          <a
            className="text-yellow-400 underline underline-offset-4 decoration-1 hover:text-yellow-200"
            href="https://www.weatherapi.com/"
            target="_blank"
          >
            WeatherAPI.com
          </a>
        </p>
        <p className="font-light text-sm">Надежда Василевская © 2024</p>
      </div>
    </div>
  );
}

export default Footer;
