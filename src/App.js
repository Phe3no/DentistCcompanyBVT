import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Calendar from "./Calendar";
import Day from "./Day";
import Home from "./components/home/Home";
import "./App.css";
import {
  getAppointmentsError,
  getAppointmentsStatus,
  fetchAppointments,
} from "./features/appointments/appointmentsSlice";

import {
  getAssistantsError,
  getAssistantsStatus,
  fetchAssistants,
} from "./features/assistants/assistantsSlice";
import {
  fetchClients,
  getClientsStatus,
  getClientsError,
} from "./features/clients/clientsSlice";
import {
  getDentistsStatus,
  getDentistsError,
  fetchDentists,
} from "./features/dentists/dentistsSlice";

const App = () => {
  const dispatch = useDispatch();
  const appointmentsError = useSelector(getAppointmentsError);
  const appointmentsStatus = useSelector(getAppointmentsStatus);

  const assistantsError = useSelector(getAssistantsError);
  const assistantsStatus = useSelector(getAssistantsStatus);

  const clientsError = useSelector(getClientsError);
  const clientsStatus = useSelector(getClientsStatus);

  const dentistsError = useSelector(getDentistsError);
  const dentistsStatus = useSelector(getDentistsStatus);

  useEffect(() => {
    if (appointmentsStatus === "idle") {
      dispatch(fetchAppointments());
    }
    if (assistantsStatus === "idle") {
      dispatch(fetchAssistants());
    }
    if (clientsStatus === "idle") {
      dispatch(fetchClients());
    }
    if (dentistsStatus === "idle") {
      dispatch(fetchDentists());
    }
  }, []);

  let content;
  if (appointmentsStatus === "loading") {
    content = (
      <p>
        "Loading appoinments...
        <br />"
      </p>
    );
  } else if (assistantsStatus === "loading") {
    content = (
      <p>
        "Loading assistants...
        <br />"
      </p>
    );
  } else if (clientsStatus === "loading") {
    content =
      content +
      (
        <p>
          "Loading clients... <br />"
        </p>
      );
  } else if (dentistsStatus === "loading") {
    content = (
      <p>
        "Loading dentists...
        <br />"
      </p>
    );
  } else if (
    appointmentsStatus === "succeeded" &&
    assistantsStatus === "succeeded" &&
    clientsStatus === "succeeded" &&
    dentistsStatus === "succeeded"
  ) {
    content = (
      <main>
        <Routes>
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/day" element={<Day />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    );
  } else if (appointmentsStatus === "failed") {
    content = <p>{appointmentsError}</p>;
  } else if (assistantsStatus === "failed") {
    content = <p>{assistantsError}</p>;
  } else if (clientsStatus === "failed") {
    content = <p>{clientsError}</p>;
  } else if (dentistsStatus === "failed") {
    content = <p>{dentistsError}</p>;
  }

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/calendar">Calendar view</Link>
            </li>
            <li>
              <Link to="/day">Day view</Link>
            </li>
          </ul>
        </nav>
        {content}
      </div>
    </Router>
  );
};
export default App;
