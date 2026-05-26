import React, { useState } from 'react';
import './country.css'
const Country = ({country, handleVisitedCountries, handleVisitedFlags}) => {
  // console.log(country)
 const [visited, setVisited] = useState(false);

  const handleVisited = () => {

    //basic System
    // if(visited){
    //   setVisited(false)
    // }
    // else{
    //   setVisited(true)
    // }
   
    //ternary sytem
  //  setVisited(visited ? false : true);

  //thrid system
    
    setVisited(!visited);

    handleVisitedCountries(country);



  }

  return (
    <div className={`country ${visited && 'country-visited'}`}>
      <img src={country?.flags?.flags?.png} alt= {country.flags.flags.alt} />
      <h3>Name: {country.name.common}</h3>
      <p>Population: {country.population.population}</p>
      <p>Area: {country.area.area} {country.area.area > 300000 ? "Big Country" : "Small Country"}</p>
      <p>Capital: {country.capital.capital}</p>
      <p>Region: {country.region.region}</p>
      <p>Continent: {country.continents.continents}</p>
      <button onClick={handleVisited}>
        {visited ? 'visited' : 'not visited'}
        </button>
        <button onClick={() => {handleVisitedFlags(country?.flags?.flags?.png)}}>Add visited flag: </button>
    </div>
  );
};

export default Country;

/**
 * 1. inline css (style object)
 * 2. 
 */







