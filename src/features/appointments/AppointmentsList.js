import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getAllAppointments,
  getAppointmentsStatus,
  getAppointmentsError,
  fetchAppointments,
} from "./appointmentsSlice";
import AppointmentsOverview from "./AppointmentsOverview";

const AppointmentsList = () => {
  const dispatch = useDispatch();

  const appointments = useSelector(getAllAppointments);
  const appointmentsStatus = useSelector(getAppointmentsStatus);
  const appointmentsError = useSelector(getAppointmentsError);

  useEffect(() => {
    if (appointmentsStatus === "idle") {
      dispatch(fetchAppointments());
    }
  }, [appointmentsStatus, dispatch]);

  let content;
  if (appointmentsStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (appointmentsStatus === "succeeded") {
    content = appointments.map((appointment, index) => (
      <AppointmentsOverview key={index} appointment={appointment} />
    ));
  } else if (appointmentsStatus === "failed") {
    content = <p>{appointmentsError}</p>;
  }

  return <div>{content}</div>;
};

export default AppointmentsList;
