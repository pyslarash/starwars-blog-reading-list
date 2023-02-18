import React from "react";
import "../../styles/home.css";
import CardGroup from "../component/card-group.jsx";

const Home = () => {
  // need to import userContext
  return (
    <div className="text-center m-5">
      <CardGroup apiType="people" />
      <CardGroup apiType="vehicles" />
      <CardGroup apiType="planets" />
    </div>
  );
};

export default Home;