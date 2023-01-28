import React from "react";

export default ({ time, patient }) => (
  <div className="appointment">
    <span className="time">{time}</span>
    <span className="patient">{patient}</span>
  </div>
);
