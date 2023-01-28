import { configureStore } from "@reduxjs/toolkit";
import appointmentsReducer from "../features/appointments/appointmentsSlice";
import assistantsReducer from "../features/assistants/assistantsSlice";
import dentistsReducer from "../features/dentists/dentistsSlice";
import clientsReducer from "../features/clients/clientsSlice";

export const store = configureStore({
  reducer: {
    appointments: appointmentsReducer,
    assistants: assistantsReducer,
    dentists: dentistsReducer,
    clients: clientsReducer,
  },
});
