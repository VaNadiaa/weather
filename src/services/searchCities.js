const USER_NAME = "gliv.piv";
const BASE_URL = "http://api.geonames.org/searchJSON";

const getCityName = (searchCity, rowCount, lang) => {
  const url = new URL(BASE_URL);
  url.search = new URLSearchParams({
    ...searchCity,
    ...rowCount,
    username: USER_NAME,
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
      console.error(error)
    });
  return promise;
};

const formatCityName = (data) => {
  let { name, countryName } = data.geonames[0];
  return { name, countryName };
}

const getFormattedCityNameData = async (searchCity, rowCount, lang) => {
  const formattedCityName = await getCityName(
    searchCity, rowCount, lang
  ).then(formatCityName);
  return {...formattedCityName}
}

export { getFormattedCityNameData }