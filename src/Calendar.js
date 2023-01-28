import { useSelector } from "react-redux";
import { getAllAppointments } from "./features/appointments/appointmentsSlice";
import { getAllDentists } from "./features/dentists/dentistsSlice";
import { selectAllAssistants } from "./features/assistants/assistantsSlice";
import DayInMonth from "./DayInMonth";
import "./Calendar.css";

const Calendar = () => {
  const appointments = useSelector(getAllAppointments);

  const divideByDay = (appointments) => {
    const appointmentsByDay = {};
    appointments.forEach((appointment) => {
      const day = appointment.day;
      if (!appointmentsByDay.hasOwnProperty(day)) {
        appointmentsByDay[day] = [];
      }
      appointmentsByDay[day].push(appointment);
      appointmentsByDay[day].sort((a, b) =>
        a.time > b.time ? 1 : a.time < b.time ? -1 : 0
      );
    });
    return appointmentsByDay;
  };

  const appointmentsByDay = divideByDay(appointments);

  const daysInMonthJSX = Object.values(appointmentsByDay).map(
    (appointmentsInDay, index) => (
      <DayInMonth appointments={appointmentsInDay} key={index} />
    )
  );

  return (
    <div className="calendarview">
      <div className="header">
        <div>Maandag</div>
        <div>Dinsdag</div>
        <div>Woensdag</div>
        <div>Donderdag</div>
        <div>Vrijdag</div>
      </div>
      <div className="table">{daysInMonthJSX}</div>
    </div>
  );
};

export default Calendar;
