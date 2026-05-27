const WeatherCard = ({ weather }) => {
  return (
    <div className="weather-card">
      <h2>{weather.name}</h2>

      <h1>{Math.round(weather.main.temp)}°C</h1>

      <p>{weather.weather[0].main}</p>

      <div className="weather-info">
        <span>💧 Humidity: {weather.main.humidity}%</span>
        <span>🌬 Wind: {weather.wind.speed} km/h</span>
      </div>
    </div>
  );
};

export default WeatherCard;