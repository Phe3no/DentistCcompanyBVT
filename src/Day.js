import { useSelector } from "react-redux";
import { getAllAppointments } from "./features/appointments/appointmentsSlice";
import { getAllDentists } from "./features/dentists/dentistsSlice";
import { getAllAssistants } from "./features/assistants/assistantsSlice";
import AppointmentInDay from "./AppointmentInDay";
import "./Day.css";

const Day = () => {
  const appointments = useSelector(getAllAppointments);
  const dentists = useSelector(getAllDentists);
  const assistants = useSelector(getAllAssistants);

  const getAppointmentData = (person, email) => {
    let result = { name: "not needed..." };
    if (person === "dentist" && email) {
      const dentist = dentists.find((dentist) => dentist.email === email);
      result = Object.assign(
        {},
        { name: `${dentist.firstName} ${dentist.lastName}` }
      );
    } else if (person === "assistant" && email) {
      const assistant = assistants.find(
        (assistant) => assistant.email === email
      );
      result = Object.assign(
        {},
        { name: `${assistant.firstName} ${assistant.lastName}` }
      );
    }
    return result;
  };

  let appointmentsJSX;
  const appointmentsThisDay = appointments
    .filter((app) => app.day === "1")
    .sort((a, b) => (a.time > b.time ? 1 : a.time < b.time ? -1 : 0));
  appointmentsJSX = appointmentsThisDay.map((app, index) => {
    const dentistData = getAppointmentData("dentist", app.dentist);
    const assistantData = getAppointmentData("assistant", app.assistant);
    const clientData = getAppointmentData("client", app.client);
    return (
      <AppointmentInDay
        time={app.time}
        patient={clientData.name}
        dentist={dentistData.name}
        assistant={assistantData.name}
        key={index}
      />
    );
  });
  return <ul className="dayview">{appointmentsJSX}</ul>;
};

export default Day;
