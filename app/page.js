"use client";

import { useState, useEffect } from "react";

import Image from "next/image";
import ButtonDemo from "../components/ButtonDemo";
import ColorPicker from "../components/ColorPicker";
import PeoplePicker from "../components/PeoplePicker";
import Tabs from "../components/Tabs";

import {
  getPeople,
  getWeatherData,
  getGeoLocation,
  getWeatherDataByLatLon,
} from "../lib/api";

const Homepage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [daysOfWeek, setDaysOfWeek] = useState(null);
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  const peopleArr = getPeople();

  useEffect(() => {
    getGeoLocation()
      .then((position) => {
        //console.log(position);
        setLocation(position);
      })
      .catch((error) => {
        setErrorMsg(error);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getWeatherDataByLatLon(location);
      setWeatherData(response);
    };
    location ? fetchData() : null;
  }, [location]);

  useEffect(() => {
    //filter out days of the week
    const tempWeek = [];

    weatherData &&
      weatherData.list.filter((block) => {
        const date = new Date(block.dt * 1000);
        const options = { weekday: "short" };
        const day = date.toLocaleDateString("en-US", options);
        if (!tempWeek.includes(day)) {
          tempWeek.push(day);
        }
      });
    setDaysOfWeek(tempWeek);
  }, [weatherData]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await getWeatherData();
  //     setWeatherData(response);
  //   };
  //   fetchData();
  // }, []);

  return (
    <div>
      <h1>Weather App</h1>
      {errorMsg && <div>{errorMsg}</div>}
      {weatherData && (
        <div>
          <h2>{weatherData.city.name}</h2>
          <p>Current temp: {weatherData.list[0].main.temp}&deg;F</p>
          <p>{weatherData.list[0].weather[0].description}</p>
          <Image
            src={`https://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@2x.png`}
            alt={`Weather Icon`}
            width={100}
            height={100}
          />
          {daysOfWeek && (
            <section>
              <Tabs
                activeIndex={activeDayIndex}
                items={daysOfWeek}
                clickHandler={setActiveDayIndex}
              />
              <div>
                {weatherData?.list
                  .filter((block) => {
                    const date = new Date(block.dt * 1000);
                    const options = { weekday: "short" };
                    const day = date.toLocaleDateString("en-US", options);
                    return day === daysOfWeek[activeDayIndex];
                  })
                  .map((block, index) => {
                    return <p key={index}>{block.main.temp}</p>;
                  })}
              </div>
            </section>
          )}
        </div>
      )}

      {/*<PeoplePicker people={peopleArr} />
      <ButtonDemo />
  <ColorPicker />*/}
    </div>
  );
};

export default Homepage;
