import React from "react";

const AppointmentsOverview = ({ appointment }) => {
  return (
    <article>
      <h3>{appointment.id}</h3>
    </article>
  );
};

export default AppointmentsOverview;
