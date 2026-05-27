const API_KEY = "488549d2799fdbda5bbb7249043999cb";

export const fetchWeather = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );

  const data = await response.json();

  if (data.cod !== 200) {
    throw new Error(data.message);
  }

  return data;
};