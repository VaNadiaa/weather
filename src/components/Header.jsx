import React, { useState } from "react";
import "../fontello/css/fontello.css";
import img from "../img/logo.png";
import { citiesList } from "../services/citiesList";
import { getLocation } from "../App";
import { toast } from "react-toastify";

function Header({ setQuery }) {
  const [city, setCity] = useState("");
  const [hidden, setHidden] = useState(true);

  const handleSearchClick = () => {
    if (city !== "") {
      setQuery({ q: city, days: 3, lang: "ru" });
      setCity("");
      setHidden(true);
    }
  };

  const handleLocationClick = () => {
    getLocation()
      .then((locationQuery) => {
        setQuery(locationQuery);
      })
      .catch((error) => toast.error(error.message));
  };

  const getCityName = () => {
    let filtered = [];

    citiesList.forEach((countryObj) => {
      Object.entries(countryObj).forEach(([countryName, citiesName]) => {
        citiesName.forEach((cityName) => {
          if (cityName.startsWith(city)) {
            filtered.push({ city: cityName, country: countryName });
          }
        });
      });
    });

    const listItems = filtered.slice(0, 5).map(({ city, country }) => (
      <li
        onClick={() => {
          setQuery({ q: `${city}, ${country}`, days: 3, lang: "ru" });
          setCity("");
          setHidden((prev) => !prev);
        }}
        className="gray-300 px-2 py-2 cursor-pointer hover:bg-black hover:rounded-md"
        key={`${city}, ${country}`}
      >
        {`${city}, ${country}`}
      </li>
    ));
    return listItems;
  };

  return (
    <div className="bg-black/40 backdrop-blur md:py-1 py-2 mb-8">
      <div className="flex flex-row justify-center md:justify-between mx-auto max-w-screen-xl px-4">
        <div className="hidden md:flex flex-row items-center space-x-2">
          <img className="size-16" src={img} alt="" />
          <p className="font-medium text-2xl">Прогноз погоды</p>
        </div>
        <div className="flex flex-row justify-items-center space-x-2 sm:space-x-3">
          <div className="relative my-3">
            <input
              className="text-lg font-light placeholder-gray-300 capitalize rounded-md bg-black/40 p-2 focus:outline-none"
              type="text"
              value={city}
              onChange={(event) => {
                setCity(event.target.value);
                setHidden(event.target.value !== "");
              }}
              placeholder="Поиск..."
              onKeyDown={(event) => {
                if (event.keyCode === 13) {
                  handleSearchClick();
                }
              }}
            />
            {city && hidden && (
              <ul className="absolute rounded-md bg-black/70 z-50 w-full">
                {getCityName()}
              </ul>
            )}
          </div>
          <button
            onClick={handleSearchClick}
            className="icon-search text-2xl cursor-pointer transition ease-out hover:scale-125"
          ></button>
          <button
            onClick={handleLocationClick}
            className="icon-location text-2xl cursor-pointer transition ease-out hover:scale-125"
          ></button>
        </div>
      </div>
    </div>
  );
}

export default Header;
