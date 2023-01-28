import React, { useState } from "react";
import "./home.css";
import Assistants from "./assistants/Assistants";
import Clients from "./clients/Clients";
import Dentists from "./dentists/Dentists";

import AppointmentsList from "../../features/appointments/AppointmentsList";

const Home = () => {
  const [dentistsActive, setDentistsActive] = useState(false);
  const [assistantsActive, setAssistantsActive] = useState(false);
  const [clientsActive, setClientsActive] = useState(false);

  const onDentistsClicked = () => setDentistsActive(!dentistsActive);
  const onAssistantsClicked = () => setAssistantsActive(!assistantsActive);
  const onClientsClicked = () => setClientsActive(!clientsActive);

  const activeButtonStyle = {
    backgroundColor: "#fe2121",
    color: "#f0f0f0",
  };

  return (
    <>
      <div className="home-menu">
        <button
          onClick={() => onDentistsClicked()}
          style={dentistsActive ? activeButtonStyle : {}}
        >
          Dentists
        </button>
        <button
          onClick={() => onAssistantsClicked()}
          style={assistantsActive ? activeButtonStyle : {}}
        >
          Assistants
        </button>
        <button
          onClick={() => onClientsClicked()}
          style={clientsActive ? activeButtonStyle : {}}
        >
          Clients
        </button>
      </div>
      <Dentists isActive={dentistsActive} />
      <Assistants isActive={assistantsActive} />
      <Clients isActive={clientsActive} />

      <AppointmentsList />
    </>
  );
};

export default Home;
