import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

const APPOINTMENTS_URL = "http://localhost:5000/appointments";

let dayValues = [];
for (let i = 1; i <= 28; i++) dayValues.push(i);

let timeValues = [];
for (let i = 7; i <= 17; i++) {
  i < 10 ? timeValues.push("0" + i + ":00") : timeValues.push(i + ":00");
}

let availableTimeValues = [];
const appointments = [];

const formActive = false;
const initialState = {
  appointments,
  dayValues,
  availableTimeValues,
  client: {},
  filteredAssistantEmail: "",
  filteredDentistEmail: "",
  formActive,
  status: "idle",
  error: null,
};

export const fetchAppointments = createAsyncThunk(
  "appointments/fetchAppointments",
  async () => {
    try {
      const response = await axios.get(APPOINTMENTS_URL);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const addNewAppointment = createAsyncThunk(
  "appointments/addNewAppointment",
  async (initialAppointment) => {
    try {
      const response = await axios.post(APPOINTMENTS_URL, initialAppointment);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const appointmentsSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    dentistBecomesSick: (state) => {
      console.log("A dentist becomes sick.");
    },
    addAppointmentWithoutAssistant: (state, action) => {
      const thisDentistAppointments = state.appointments.filter(
        (appointment) => appointment.dentist === state.filteredDentistEmail
      );
      const notAvailableTime = [];
      thisDentistAppointments.forEach((appointment) => {
        if (appointment.day === action.payload) {
          notAvailableTime.push(appointment.time);
        }
      });
      state.availableTimeValues = [];
      timeValues.forEach((time) => {
        if (!notAvailableTime.find((item) => item === time))
          state.availableTimeValues.push(time);
      });
    },
    addAppointmentWithAssistant: (state, action) => {
      console.log(current(state.appointments));
      const currentAppointments = current(state.appointments);
      const thisAssistantAppointments = currentAppointments.filter(
        (appointment) => appointment.assistant === state.filteredAssistantEmail
      );
      console.log(thisAssistantAppointments);
      const notAvailableTime = [];
      thisAssistantAppointments.forEach((appointment) => {
        if (appointment.day === action.payload) {
          notAvailableTime.push(appointment.time);
        }
      });
      console.log(notAvailableTime);
      notAvailableTime.map((item) => {
        state.availableTimeValues = state.availableTimeValues.filter(
          (time) => time != item
        );
      });

      /*state.availableTimeValues.forEach((time) => {
        if (!notAvailableTime.find((item) => item === time))
          state.availableTimeValues.push(time);
      });*/

      console.log("Add an appointment with an assistant");
    },
    deleteAppointment: (state) => {
      console.log("Delete an appointment");
    },
    deleteAppointmentsClientSick: (state) => {
      console.log("A client becomes sick, delete his-her appointments");
    },
    filterAssistant: (state, action) => {
      state.filteredAssistantEmail = action.payload;
    },
    filterDentist: (state, action) => {
      state.filteredDentistEmail = action.payload;
    },
    moveAppointment: (state) => {
      console.log("Move an appointment");
    },
    generateRandomAppointments: (state) => {
      console.log("Not needed");
    },
    activateAddAppointmentForm(state, action) {
      state.formActive = !state.formActive;
      state.client.id = action.payload.id;
    },
    deactivateAddAppointmentForm(state) {
      state.formActive = !state.formActive;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAppointments.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.status = "succeeded";
        const loadedAppointments = action.payload;
        state.appointments = loadedAppointments;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewAppointment.fulfilled, (state, action) => {
        console.log(action.payload);
        //action.payload.client = { ...state.client };
        state.appointments.push(action.payload);
      });
  },
});

export const {
  dentistBecomesSick,
  addAppointmentWithoutAssistant,
  addAppointmentWithAssistant,
  deleteAppointment,
  deleteAppointmentsClientSick,
  filterAssistant,
  filterDentist,
  moveAppointment,
  generateRandomAppointments,
  activateAddAppointmentForm,
  deactivateAddAppointmentForm,
} = appointmentsSlice.actions;

export const selectAllAppointments = (state) => state.appointments;

export const allDayValues = (state) => state.appointments.dayValues;
export const allTimeValues = (state) => state.appointments.availableTimeValues;
export const getAllAppointments = (state) => state.appointments.appointments;
export const getAppointmentsStatus = (state) => state.appointments.status;
export const getAppointmentsError = (state) => state.appointments.error;
export const getClient = (state) => state.appointments.client;
export const isAddAppointmentFormActive = (state) =>
  state.appointments.formActive;

export default appointmentsSlice.reducer;
