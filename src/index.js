import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import { fetchAppointments } from "./features/appointments/appointmentsSlice";
import { fetchAssistants } from "./features/assistants/assistantsSlice";
import "./index.css";

store.dispatch(fetchAppointments());
store.dispatch(fetchAssistants());

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
