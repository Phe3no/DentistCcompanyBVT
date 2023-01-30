import { useSelector } from "react-redux";
import { getAllAppointments } from "./features/appointments/appointmentsSlice";
import { getAllAssistants } from "./features/assistants/assistantsSlice";
import { getAllClients } from "./features/clients/clientsSlice";
import { getAllDentists } from "./features/dentists/dentistsSlice";
import AppointmentInDay from "./AppointmentInDay";
import "./Day.css";

const Day = () => {
  const appointments = useSelector(getAllAppointments);
  const assistants = useSelector(getAllAssistants);
  const clients = useSelector(getAllClients);
  const dentists = useSelector(getAllDentists);

  const getAppointmentData = (person, value) => {
    let result = { name: "not needed..." };
    if (person === "dentist" && value) {
      const dentistRes = dentists.find((dentist) => dentist.email === value);
      result = Object.assign(
        {},
        { name: `${dentistRes.firstName} ${dentistRes.lastName}` },
        { sick: dentistRes.sick }
      );
    } else if (person === "assistant" && value) {
      const assistant = assistants.find(
        (assistant) => assistant.email === value
      );
      result = Object.assign(
        {},
        { name: `${assistant.firstName} ${assistant.lastName}` }
      );
    } else if (person === "client" && value) {
      const client = clients.find((client) => client.id === value);
      result = Object.assign(
        {},
        { name: `${client.firstName} ${client.lastName}` },
        { sick: client.sick }
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
        patientSick={clientData.sick}
        dentist={dentistData.name}
        dentistSick={dentistData.sick}
        assistant={assistantData.name}
        key={index}
      />
    );
  });
  return <ul className="dayview">{appointmentsJSX}</ul>;
};

export default Day;
