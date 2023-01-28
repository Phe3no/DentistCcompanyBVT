import React from "react";

export default ({ time, patient, dentist, assistant }) => {
  return (
    <li className="appointment">
      <div className="time">{time}</div>
      <div className="patient">Patiënt: {patient}</div>
      <div className="dentist">Tandarts: {dentist}</div>
      <div className="assistant">Assistent: {assistant}</div>
    </li>
  );
};
