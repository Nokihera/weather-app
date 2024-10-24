import React, { useEffect, useState } from "react";
import weatherIcon from '../assets/weather-icon.svg'
const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [error, setError] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
//   `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`

  useEffect(() => {
    const fetchData = async (lat, lon) => {
      try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,rain,snowfall,wind_speed_10m`
        ).then((res) => res.json());
        console.log(response);
        setData(response);

        // Extract date and time
        const dateTime = response.current.time;
        const [fetchedDate, fetchedTime] = dateTime.split("T");
        setDate(fetchedDate);
        setTime(fetchedTime);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLatitude(lat);
          setLongitude(lon);
          fetchData(lat, lon); // Fetch weather data using coordinates
        },
        (err) => {
          setError("Unable to retrieve your location");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gradient-to-b min-h-screen from-blue-400 to-blue-600 text-white p-6">
      {/* Header */}
      <div className="flex  justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Current Location</h1>
          <p className="text-lg">{date}</p>
        </div>
        <p className="text-lg">{time}</p>
      </div>

      {/* Main Weather Info */}
      <div className="text-center mb-6">
        <img src={weatherIcon} alt="weather-icon" className="w-24 mx-auto mb-4" />
        <h2 className="text-6xl font-bold">{data.current.temperature_2m}°C</h2>
        <p className="text-lg">{data.current.wind_speed_10m} km/h Winds</p>
      </div>

      {/* Hourly Forecast
      <div className="flex space-x-4 overflow-x-auto mb-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="flex flex-col items-center bg-white bg-opacity-10 rounded-lg p-4 min-w-[80px]">
            <p>12:00</p>
            <img src="https://example.com/hourly-icon.png" alt="hour-weather" className="w-10 h-10" />
            <p>22°C</p>
          </div>
        ))}
      </div> */}

      {/* Additional Weather Details */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white bg-opacity-10 p-4 rounded-lg text-center">
          <p>Humidity</p>
          <p>{data.current.relative_humidity_2m}%</p>
        </div>
        <div className="bg-white bg-opacity-10 p-4 rounded-lg text-center">
          <p>Wind Speed</p>
          <p>{data.current.wind_speed_10m} km/h</p>
        </div>
        <div className="bg-white bg-opacity-10 p-4 rounded-lg text-center">
          <p>Rain</p>
          <p>{data.current.rain}</p>
        </div>
        <div className="bg-white bg-opacity-10 p-4 rounded-lg text-center">
          <p>Snowfall</p>
          <p>{data.current.snowfall}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
