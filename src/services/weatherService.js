import { DateTime, Settings } from "luxon";

const API_KEY = "bb9b06d3af4b4f6c90364715240908";
const BASE_URL = "https://api.weatherapi.com/v1";

const getWeatherData = (infoType, searchParams, numberDays, lang) => {
  const url = new URL(BASE_URL + "/" + infoType + ".json");
  url.search = new URLSearchParams({
    key: API_KEY,
    ...searchParams,
    ...numberDays,
    ...lang,
  });

  let promise = fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(`Error status: ${res.status}`);
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return promise;
};

const formatCurentWeather = (data) => {
  const {
    location: { name, country, tz_id, localtime_epoch, localtime },
    current: {
      temp_c: temp_day,
      condition: { text, icon },
      wind_kph,
      humidity,
      feelslike_c,
    },
    forecast: { forecastday },
  } = data;

  const {
    day: {
      maxtemp_c,
      mintemp_c,
      daily_chance_of_rain,
      condition: { icon: iconDay },
    },
    astro: { sunrise, sunset },
  } = forecastday[0];

  return {
    name,
    country,
    tz_id,
    localtime_epoch,
    localtime,
    temp_day,
    text,
    icon,
    wind_kph,
    humidity,
    feelslike_c,
    maxtemp_c,
    mintemp_c,
    iconDay,
    daily_chance_of_rain,
    sunrise,
    sunset,
  };
};

const formatForecastWeather = (data) => {
  let {
    location: { tz_id, localtime_epoch },
    forecast: { forecastday },
  } = data;

  let {
    date_epoch,
    day: {
      maxtemp_c,
      condition: { icon: iconDay },
    },
    hour
  } = forecastday[0];

  let { time_epoch,
    temp_c,
    condition: { icon: iconHour }
  } = hour[0]

  hour = hour.filter((h) => {
    return h.time_epoch > localtime_epoch;
  }).slice(0, 5).map((h) => {
    return {
      title: formatToLocalTime(h.time_epoch, tz_id, "T"),
      icon: h.condition.icon,
      temp: h.temp_c
    };
  });

  forecastday = forecastday.map((d) => {
    return {
      weekday: formatDate(d.date_epoch, tz_id, "EEE"),
      date: formatDate(d.date_epoch, tz_id, "d MMMM"),
      minTemp: d.day.mintemp_c,
      maxTemp: d.day.maxtemp_c,
      icon: d.day.condition.icon,
      temp: d.day.maxtemp_c
    };
  });

  return {
    localtime_epoch,
    tz_id,
    forecastday,
    date_epoch,
    maxtemp_c,
    iconDay,
    hour,
    time_epoch,
    temp_c,
    iconHour,
  };
};

const getFormattedWeatherData = async (searchParams, numberDays, lang) => {
  const formattedCurentWeather = await getWeatherData(
    "forecast",
    searchParams,
    numberDays,
    lang
  ).then(formatCurentWeather);

  const formattedForecastWeather = await getWeatherData(
    "forecast",
    searchParams,
    numberDays,
    lang
  ).then(formatForecastWeather);

  return { ...formattedCurentWeather, ...formattedForecastWeather };
};

const formatToLocalTime = (sec, zone, formatTime = "T") => (
  (Settings.defaultLocale = "ru"),
  DateTime.fromSeconds(sec).setZone(zone).toFormat(formatTime)
);
const formatDate = (sec, zone, formatDate = "DDD, EEE") => (
  (Settings.defaultLocale = "ru"),
  DateTime.fromSeconds(sec).setZone(zone).toFormat(formatDate)
);

export { formatToLocalTime, formatDate, getFormattedWeatherData };
