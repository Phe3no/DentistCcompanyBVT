import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const DENTISTS_URL = "http://localhost:5000/dentists";

const formActive = false;
const initialState = { formActive, status: "idle", error: null };

export const fetchDentists = createAsyncThunk(
  "dentists/fetchDentists",
  async () => {
    try {
      const response = await axios.get(DENTISTS_URL);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

const dentistsSlice = createSlice({
  name: "dentists",
  initialState,
  reducers: {
    addDentist: {
      reducer(state, action) {
        state.dentists.push(action.payload);
        state.formActive = !state.formActive;
      },
      prepare(firstName, lastName, phone, email) {
        return {
          payload: {
            firstName,
            lastName,
            phone,
            email,
          },
        };
      },
    },
    isSick(state, action) {
      state.dentists.map((dentist) =>
        dentist.email === action.payload
          ? (dentist.sick = !dentist.sick)
          : dentist.sick
      );
    },
    deleteDentist(state, action) {
      state.dentists = state.dentists.filter(
        (dentist) => dentist.email !== action.payload
      );
      console.log("Delete Dentist" + action.payload);
    },
    activateAddDentistForm(state) {
      state.formActive = !state.formActive;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchDentists.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchDentists.fulfilled, (state, action) => {
        state.status = "succeeded";
        const loadedDentists = action.payload;
        state.dentists = loadedDentists;
      })
      .addCase(fetchDentists.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addDentist, isSick, deleteDentist, activateAddDentistForm } =
  dentistsSlice.actions;

export const getAllDentists = (state) => state.dentists.dentists;
export const getDentistsStatus = (state) => state.dentists.status;
export const getDentistsError = (state) => state.dentists.error;

export const isAddDentistFormActive = (state) => state.dentists.formActive;

export default dentistsSlice.reducer;
