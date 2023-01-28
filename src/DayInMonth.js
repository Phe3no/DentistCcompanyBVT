import React from "react";
import AppointmentInMonth from "./AppointmentInMonth";

const DayInMonth = ({ appointments }) => {
  const getAppointmentData = (patient) => {
    console.log(patient);
    let result = {};
    if (patient) {
      result = Object.assign(
        {},
        { name: `${patient.firstName} ${patient.lastName}` }
      );
    }
    console.log(result);
    return result;
  };

  console.log(appointments);

  const appointmentsJSX = appointments.map((app, index) => {
    console.log(app);
    const patientData = getAppointmentData(app.client);
    return (
      <AppointmentInMonth
        time={app.time}
        patient={patientData.name}
        key={index}
      />
    );
  });
  return <div className="day">{appointmentsJSX}</div>;
};

export default DayInMonth;
