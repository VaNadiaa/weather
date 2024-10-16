import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import TimeAndLocation from "./components/TimeAndLocation";
import { getFormattedWeatherData } from "./services/weatherService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { weatherTypes } from "./services/weatherTypes";

export const getLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        resolve({
          q: `${latitude}, ${longitude}`,
          days: 3,
          lang: "ru",
        });
      }, (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          reject(new Error("Вы запретили отслеживание геолокации"))
        }
        else if (error.code === error.POSITION_UNAVAILABLE) {
          reject(new Error("Получить местоположение не удалось"))
        }
        else if (error.code === error.TIMEOUT) {
          reject(new Error("Время получения геолокации истекло"))
        } else {
          reject(new Error("Произошла неизвестная ошибка"));
        }
      });
    } else {
      reject(new Error("Геолокация не поддерживается"))
    }
  })
};

function App() {
  const [query, setQuery] = useState({ q: "Минск", days: 3, lang: "ru" });
  const [weather, setWeather] = useState(null);
  const [locationFetched, setLocationFetched] = useState(false);

  useEffect(() => {
    const fetchWeather = () => {
      getFormattedWeatherData({ ...query })
        .then((data) => {
          if (data) {
            return setWeather(data);
          } else {
            throw new Error(`Error status: ${data.status}`);
          }
        }).catch(error => {
          toast.error(`Введите корректное название города`);
        })
    };
    fetchWeather();
  }, [query]);

  useEffect(() => {
    if (!locationFetched) {
      getLocation()
        .then((locationQuery) => {
          setQuery(locationQuery);
          setLocationFetched(true);
        })
        .catch((error) => {
          const errorShow = localStorage.getItem("locationErrorShown");
          if (!errorShow) {
            toast.error(error.message);
            localStorage.setItem("locationErrorShown", true);
          }
        })
    }
  }, [locationFetched]);

  const getWeatherType = (weatherName) => {
    for (const weatherType in weatherTypes[0]) {
      if (weatherTypes[0][weatherType].name.includes(weatherName)) {
        return weatherType;
      }
    }
    return null;
  }

  const formatBackground = () => {
    if (!weather) return "bg-gray-400";
    const weatherType = getWeatherType(weather.text);
    if (weatherType === 'sunny') return "bg-sunny";
    if (weatherType === 'cloudy') return "bg-cloudy";
    if (weatherType === 'fog') return "bg-fog";
    if (weatherType === 'rain') return "bg-rain";
    if (weatherType === 'thunderstorm') return "bg-thunderstorm";
    if (weatherType === 'snow') return "bg-snow";
    if (weatherType === 'night') return "bg-night";
    return "bg-gray-400";
  };

  return (
    <>
      <div className={`bg-no-repeat bg-cover bg-center bg-fixed h-full pb-10 ${formatBackground()} relative`}>
        <Header setQuery={setQuery} />
        <div className="mx-auto max-w-screen-xl px-5">
          {weather && (
            <>
              <TimeAndLocation weather={weather} />
              <TemperatureAndDetails weather={weather} />
            </>
          )}
        </div>
        <Footer />
        <ToastContainer autoClose={5000} theme="colored" />
      </div>
    </>
  );
}

export default App;
