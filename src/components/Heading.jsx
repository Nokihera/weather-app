import React from 'react';
import weatherIcon from '../assets/weather-icon.svg'
const Heading = () => {
  return (
    <div className='flex items-center justify-between bg-blue-600 p-4 rounded-b-lg shadow-lg'>
      <div className='flex items-center'>
        <img 
          src={weatherIcon} // Replace with a suitable weather icon URL
          alt="Weather Icon"
          className='w-10 h-10 mr-2' 
        />
        <h1 className='text-lg md:text-2xl font-bold text-white'>Weather App</h1>
      </div>
      <button className='bg-white text-blue-600 rounded-full px-4 py-2 font-semibold hover:bg-blue-100 transition'>
        Settings
      </button>
    </div>
  );
}

export default Heading;
