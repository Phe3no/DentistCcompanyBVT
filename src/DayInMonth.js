import React from "react";
import { useSelector } from "react-redux";
import AppointmentInMonth from "./AppointmentInMonth";
import { getAllClients } from "./features/clients/clientsSlice";

const DayInMonth = ({ appointments }) => {
  const clients = useSelector(getAllClients);

  const getAppointmentData = (patient) => {
    const client = clients.filter((client) => client.id == patient);
    let result = {};
    if (client) {
      client.map((item) => {
        result.name = `${item.firstName}, ${item.lastName}`;
      });
    }
    return result;
  };

  const appointmentsJSX = appointments.map((app, index) => {
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
