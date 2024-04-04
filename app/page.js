"use client";

import ButtonDemo from "../components/ButtonDemo";
import ColorPicker from "../components/ColorPicker";
import PeoplePicker from "../components/PeoplePicker";
import { getPeople } from "../lib/api";

const Homepage = () => {
  const peopleArr = getPeople();
  return (
    <div>
      <h1>Weather App</h1>
      <PeoplePicker people={peopleArr} />
      <ButtonDemo />
      <ColorPicker />
    </div>
  );
};

export default Homepage;
