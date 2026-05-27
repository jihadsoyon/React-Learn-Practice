import { useState } from "react";
import SearchBox from "./components/SearchBox";
import WeatherCard from "./components/WeatherCard";
import Loader from "./components/Loader";
import { fetchWeather } from "./api";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!city) return;

    try {
      setLoading(true);
      setError("");

      const data = await fetchWeather(city);

      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>🌦 Weather Dashboard</h1>

      <SearchBox
        city={city}
        setCity={setCity}
        handleSearch={handleSearch}
      />

      {loading && <Loader />}

      {error && <p className="error">{error}</p>}

      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}

export default App;