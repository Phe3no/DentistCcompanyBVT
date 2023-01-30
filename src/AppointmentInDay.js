import React from "react";

export default ({
  time,
  patient,
  patientSick,
  dentist,
  dentistSick,
  assistant,
}) => {
  const sickStyle = {
    backgroundColor: "#fe2121",
    color: "#f0f0f0",
  };

  return (
    <li className="appointment">
      <div className="time">{time}</div>
      <div className="patient" style={patientSick ? sickStyle : null}>
        {patient}
      </div>
      <div className="dentist" style={dentistSick ? sickStyle : null}>
        {dentist}
      </div>
      <div className="assistant">Assistent: {assistant}</div>
    </li>
  );
};
