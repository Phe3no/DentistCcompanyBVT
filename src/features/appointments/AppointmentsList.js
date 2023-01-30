import { useSelector } from "react-redux";
import { getAllAppointments } from "./appointmentsSlice";
import AppointmentsOverview from "./AppointmentsOverview";

const AppointmentsList = () => {
  const appointments = useSelector(getAllAppointments);

  let content = appointments.map((appointment, index) => (
    <AppointmentsOverview key={index} appointment={appointment} />
  ));

  return <div>{content}</div>;
};

export default AppointmentsList;
