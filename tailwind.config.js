/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "my-text-color": "#4C1238",
      },
      backgroundImage: {
        'sunny': "url('../src/img/sunny.jpg')",
        'cloudy': "url('../src/img/cloudy.jpg')",
        "fog": "url('../src/img/fog.jpg')",
        "rain": "url('../src/img/rain.jpg')",
        "thunderstorm": "url('../src/img/thunderstorm.jpg')",
        "snow": "url('../src/img/snow.jpg')",
        "night": "url('../src/img/night.jpg')"
      },
    },
  },
  plugins: [],
};
